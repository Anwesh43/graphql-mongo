const graphqlApiCreator = require('./graphql-api-creator')('Item',{count:Number,name:String,cost:Number})
const root = graphqlApiCreator.buildRoot()
