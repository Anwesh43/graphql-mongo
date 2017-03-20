const buildSchema = require('graphql').buildSchema
const mongooseUtil = require('./mongooseUtil')
const typeMap = {Number:'Int',String:'String'}
module.exports = (typeName,schema) => {
  const graphqlSchemaBuilder = {
      createType() {
          var typeSchema = `type ${typeName}{\n\t`
          var index = 0
          for(let key in schema) {
              if(index != 0) {
                  typeSchema+=",\n\t"
              }
              typeSchema+= `${key}:${typeMap[schema[key].name]}`
              index++
          }
          typeSchema+="\n}"
          return typeSchema
      },
      createMutation() {
          var mutationTypeString = "type Mutation{\n\t"
          var paramsForCreate = ""
          var index = 0
          for(let key in schema) {
              if(index!=0) {
                  paramsForCreate+=","
              }
              paramsForCreate+=`${key}:${typeMap[schema[key].name]}!`
              index++
          }
          const createString = `create${typeName}(${paramsForCreate}):${typeName}`
          mutationTypeString+=`${createString}\n}`
          return mutationTypeString
      },
      createQuery() {
          var queryString = `type Query{\n\t${typeName.toLowerCase().concat("s")}:[${typeName}]\n}`
          return queryString
      },
      buildSchema() {
          const schemaString = `${this.createType()}\n${this.createMutation()}\n${this.createQuery()}`
          return buildSchema(schemaString)
      }
  }
  return graphqlSchemaBuilder
}
