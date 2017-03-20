const graphql = require('graphql').graphql
const mongooseUtil = require('./mongooseUtil')
module.exports = (typeName,schema)=>{
  const graphqlApiCreator = {
      createMutationQuery() {
          const createMutationString = `create${typeName}(${typeName.toLowerCase()}){
              mongooseUtil.insert(Model,${typeName.toLowerCase()}).then((msg)=>{
                  if(msg.status == "ok") {
                      return model
                  }
              }).catch((err)=>{
                  return {msg:err.toString()}
              })
          }`
          return createMutationString
      },
      createFetchQuery() {
          const fetchQueryString = `${typeName.toLowerCase().concat("s")}(){
              mongooseUtil.fetch(Model,{}).then((data)=>{
                  return data
              }).catch((err)=>{
                  return {msg:err.toString()}
              })
          }`
          return fetchQueryString
      },
      buildRoot(){
          const Model = mongooseUtil.createModel(typeName.toLowerCase().concat("s"),schema)
          const rootString = `var rootApi = {\n${this.createMutationQuery(Model)},\n${this.createFetchQuery(Model)}}`
          eval(rootString)
          try {
              return rootApi
          }
          catch(e) {
              return null
          }

      }
  }
  return graphqlApiCreator
}
