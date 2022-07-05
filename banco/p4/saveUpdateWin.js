const blazeSchema = require("../blazeSchema")
const mongoose = require("mongoose")

const saveUpdateWinDb = async (_id) => {
  const createModel = mongoose.model('result4', blazeSchema)
 
  const result = await createModel.findOne({_id}).exec()
  const green = result.green + 1

  await createModel.updateOne({_id}, { green })

}

module.exports = saveUpdateWinDb;