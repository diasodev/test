const blazeSchema = require("../blazeSchema")
const mongoose = require("mongoose")
const moment  = require('moment')
require('moment/locale/pt-br') 
moment.locale("pt-br")

const saveDb = async (padrao2, dayNameCurrent, horaAtual) => {
  const createModel = mongoose.model('result4', blazeSchema)

  const result = await createModel.find({}).exec()
  var newDados = []

  function checkIgual(){
    var found = false
    result.forEach(async(element) => {
    const { padrao1 } = element.resultado  
    for (let i = 0; i < padrao1.length; i++) {
     
      if(padrao1[0].number === padrao2[0].number){
           if(padrao1[1].number === padrao2[1].number){
            if(element.horas === horaAtual){             
              if(element.dayName === dayNameCurrent){    
                  console.log("Jogo repetido..")         
                  found = true               
              }
            }
                       
          }
       }
     }  
  })
    return found
  }
  
  if(checkIgual() ===  false){
      console.log("Jogo salvo..")
      const teste = new createModel({resultado:{ padrao1: padrao2}, dayName: dayNameCurrent})

      const dados = await teste.save()
      newDados.push(dados)  
  }
  
  return newDados
}

module.exports = saveDb;