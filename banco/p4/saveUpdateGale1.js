const blazeSchema = require("../blazeSchema")
const mongoose = require("mongoose")

const saveUpdateGale1Db = async (_id) => {
  const createModel = mongoose.model('result4', blazeSchema)
 
  const result = await createModel.findOne({_id}).exec()
  const gale1 = result.gale1 + 1

  await createModel.updateOne({_id}, { gale1 })

}

module.exports = saveUpdateGale1Db;