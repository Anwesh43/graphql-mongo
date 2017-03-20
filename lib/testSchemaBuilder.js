const graphqlSchemaBuilder = require('./graphql-schema-builder')('Person',{name:String,age:Number})
graphqlSchemaBuilder.buildSchema()
