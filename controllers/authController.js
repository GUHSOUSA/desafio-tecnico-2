// Importando módulos e modelos
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Função assíncrona para criar um usuário
const createUser = asyncHandler(async (req, res) => {
     // Desestruturando dados da requisição
        const { 
            nome, 
            email, 
            password,
            telefone
         } = req.body;

           const {
             ddd, 
             numero 
            } = telefone; 
         
         
        // Validação dos campos de entrada
        if (!nome) return res.status(400).json({ 
            mensagem: 'Por favor, forneça o nome de usuarios'
        });
        if (!email) return res.status(400).json({ 
            mensagem: 'Por favor, forneça o email' 
        });
        if (!password) return res.status(400).json({ 
            mensagem: 'Por favor, forneça a senha' 
        });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ mensagem: 'Formato de email inválido' });
  }
        const existinguserEmail = await User.findOne({ 
            email
        });


        if (existinguserEmail) {
            return res.status(400).json({ 
                mensagem: 'E-mail já existente' 
            });
        }
        const hashedPassword = await bcrypt.hash(
            password, 10
            );
            const newUser = await User.create({ 
                nome,
                email,
                telefone: { ddd, numero },
                password: hashedPassword,
            });
            const responseData = {
                _id: newUser._id,
                data_criacao: newUser.data_criacao,
                data_atualizacao: newUser.data_atualizacao, // Supondo que você tenha esse campo
                ultimo_login: newUser.ultimo_login,
            };
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

            // Respondendo com sucesso e enviando os dados criados
            res.status(200).json({ 
                ...responseData,
                "token": token 
             });

    });
const loginUser = asyncHandler(async (req, res) => {
    const { 
        password, 
        email 
    } = req.body;
    
    if (!email) {
        return res.status(400).json({ mensagem: 'Por favor, forneça o email' });
      }

      if (!password) {
        return res.status(400).json({ mensagem: 'Por favor, forneça a senha' });
      }
      const user = await User.findOne({
        email: email
      });

      if (!user) {
        return res.status(400).json({ 
            mensagem: 'O email Não corresponde a nenhuma Usuario' 
        });
      }
      const isPasswordCorrect = await bcrypt.compare(
        password, 
        user.password
        );

      if (!isPasswordCorrect) return res.status(401).json({ 
        message: 'Senha incorreta' 
    });
    
    const token = jwt.sign({
         id: user._id 
        }, process.env.JWT_SECRET, { 
            expiresIn: '30m' 
        });

    user.ultimo_login = Date.now();
    await user.save();
    const responseData = {
        _id: user._id,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao, // Supondo que você tenha esse campo
        ultimo_login: user.ultimo_login,
    };
    res.status(200).json({ 
        ...responseData,
        "token": token 
     });
});
// Função assíncrona para obter um usuário e suas informações adicionais (empresa ou funcionário)
const getUser = asyncHandler(async (req, res) => {
   
        // Supomos que req.user contém o ID do usuário logado
        const user = await User.findById(req.user)
        // Verificando se o usuário foi encontrado
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        
        // Enviando a resposta com informações do usuário e suas informações adicionais
        res.json({ user});
});



module.exports = { createUser, loginUser, getUser };