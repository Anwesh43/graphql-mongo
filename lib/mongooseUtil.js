const q = require('q')
const mongoose = require('mongoose')
const modelDao = require('./modelDao')
mc = {
    connect(dbName,url='localhost',port=27017){
        var defer = q.defer()
        var dbUrl = `mongodb://${url}:${port}/${dbName}`
        console.log(`connecting to ${dbUrl}`)
        mongoose.connect(dbUrl,(err)=>{
            if(err == null) {
                defer.resolve({status:'ok'})
            }
            else {
                defer.reject(err)
            }
        })
        return defer.promise
      },
      createModel(modelName,schemaObj) {
          const Model = modelDao.createModel(modelName,schemaObj)
          return Model
      },
      fetch(Model,queryObj) {
          var defer = q.defer()
          modelDao.fetch(Model,queryObj).then((data)=>{
              defer.resolve(data)
          }).catch((err)=>{
              defer.reject(err)
          })
          return defer.promise
      },
      insert(Model,obj) {
          var defer = q.defer()
          modelDao.createDocument(Model,obj).then((msg)=>{
              defer.resolve(msg)
          }).catch((err)=>{
              defer.reject(err)
          })
          return defer.promise
      }
}
module.exports = mc
