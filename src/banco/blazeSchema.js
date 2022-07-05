const mongoose = require('mongoose')

const blazeSchema = mongoose.Schema({
  resultado: {
    padrao1: [],    
  },
  horas: { type: String, default: '' },
  dayName: { type: String, default: '' },
  dateOut:{ type: String, default: '' },
  cor: { type: String, default: '' },
  corWhite: { type: Number, default: 0 },
  green: { type: Number, default: 0 },
  loss: { type: Number, default:  0},
  gale1: { type: Number, default: 0 },
  gale2: { type: Number, default: 0 },
  ativo: { type: Number, default: 1 },
},{
  timestamps: true,
})

module.exports = blazeSchema