var mongoose = require('mongoose')
var daoObj = {}
var q = require('q')
daoObj.createModel = (modelName,schemaObj)=>{
    var schema = mongoose.Schema(schemaObj)
    var Model = mongoose.model(modelName,schema)
    return Model
}
daoObj.createDocument = (Model,data) => {
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
}
daoObj.fetch = (Model,queryObj)=>{
    var defer = q.defer()
    Model.find(queryObj).then((err,data)=>{
        if(err == null) {
            defer.resolve(data)
        }
        else {
            defer.reject(err)
        }
    })
    return defer.promise
}
module.exports = daoObj
