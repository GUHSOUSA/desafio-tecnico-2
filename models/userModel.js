const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    telefone: {
        ddd: {
            type: String,
            default: ""
        },
        numero: { 
            type: String,
            default: ""
        }
    },
    data_criacao: {
        type: Date,
        default: Date.now
    },
    data_atualizacao: {
        type: Date,
        default: Date.now
    },
    ultimo_login: {
        type: Date,
        default: Date.now
    }
}, );
userModel.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('User', userModel);

module.exports = User;