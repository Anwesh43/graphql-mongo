var {graphql} = require('graphql')
var mongooseUtil = require('./mongooseUtil')
var q = require('q')
module.exports = (typeName,schema)=>{
    const grahqlRunnerUtil = {
        connectToMongoDb(dbName) {
            return mongooseUtil.connect(dbName)
        },
        createRoot() {
            const graphqlApiCreator = require('./graphql-api-creator')(typeName,schema)
            return graphqlApiCreator.buildRoot()
        },
        createSchema() {
            const graphqlSchemaBuilder = require('./graphql-schema-builder')(typeName,schema)
            return graphqlSchemaBuilder.buildSchema()
        },
        runQuery(queryString) {
            return graphql(this.createSchema(),queryString,this.createRoot())
        },
        createExpressApiObject(graphiql) {
            return {schema:this.createSchema(),root:this.createRoot(),graphiql}
        }
    }
    return grahqlRunnerUtil
}
