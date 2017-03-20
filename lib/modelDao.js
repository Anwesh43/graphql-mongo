const mongoose = require('mongoose')
const q = require('q')
const daoObj = {
  createModel(modelName,schemaObj){
      const schema = mongoose.Schema(schemaObj)
      const Model = mongoose.model(modelName,schema)
      return Model
  },
  createDocument(Model,data) {
      var model = new Model(data)
      var defer = q.defer()
      model.save((err)=>{
          if(err == null) {
              defer.resolve({status:'ok'})
          }
          else {
              defer.reject(err)
          }
      })
      return defer.promise
    },
    fetch(Model,queryObj){
        var defer = q.defer()
        Model.find(queryObj).then((data,err)=>{
            if(err == null) {
                defer.resolve(data)
            }
            else {
                defer.reject(err)
            }
          })
        return defer.promise
    }
}
module.exports = daoObj
