const blazeSchema = require("../blazeSchema")
const mongoose = require("mongoose")

const saveUpdateGale2Db = async (_id) => {
  const createModel = mongoose.model('result4', blazeSchema)
 
  const result = await createModel.findOne({_id}).exec()
  const gale2 = result.gale2 + 1

  await createModel.updateOne({_id}, { gale2 })

}

module.exports = saveUpdateGale2Db;