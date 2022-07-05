const blazeSchema = require("../blazeSchema")
const mongoose = require("mongoose")

const saveUpdateDb = async (cor, arrayUltimo, id) => {
  const createModel = mongoose.model('result4', blazeSchema)

  if(id.length > 0){
    await createModel.updateOne({_id: id[0]._id}, { cor, horas: arrayUltimo[2].horaAtual1})  
  } 
 
}

module.exports = saveUpdateDb;