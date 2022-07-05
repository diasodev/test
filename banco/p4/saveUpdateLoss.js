const blazeSchema = require("../blazeSchema")
const mongoose = require("mongoose")

const saveUpdateLoss = async (_id) => {
  const createModel = mongoose.model('result4', blazeSchema)
 
  const result = await createModel.findOne({_id}).exec()
  const loss = result.loss + 1
  const ativo = 0

  await createModel.updateOne({_id}, { loss, ativo })

}

module.exports = saveUpdateLoss;