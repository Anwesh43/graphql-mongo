const mongooseUtil = require('./mongooseUtil')
var q = require('q')
module.exports = (typeName,schema)=>{
  const graphqlApiCreator = {
      createMutationQuery() {
          const createMutationString = `create${typeName}(${typeName.toLowerCase()}){
              const defer = q.defer()
              mongooseUtil.insert(Model,${typeName.toLowerCase()}).then((msg)=>{
                  if(msg.status == "ok") {
                      defer.resolve(${typeName.toLowerCase()})
                  }
              }).catch((err)=>{
                  defer.reject({msg:err.toString()})
              })
              return defer.promise
          }`
          return createMutationString
      },
      createFetchQuery() {
          const fetchQueryString = `${typeName.toLowerCase().concat("s")}(){
              const defer = q.defer()
              mongooseUtil.fetch(Model,{}).then((data)=>{
                  defer.resolve(data)
              }).catch((err)=>{
                  defer.reject({msg:err.toString()})
              })
              return defer.promise
          }`
          console.log(fetchQueryString)
          return fetchQueryString
      },
      buildRoot(){
          const Model = mongooseUtil.createModel(typeName.toLowerCase().concat("s"),schema)
          const rootString = `var rootApi = {\n${this.createMutationQuery()},\n${this.createFetchQuery()}}`
          eval(rootString)
          try {
              console.log(rootApi)
              return rootApi
          }
          catch(e) {
              return null
          }

      }
  }
  return graphqlApiCreator
}
