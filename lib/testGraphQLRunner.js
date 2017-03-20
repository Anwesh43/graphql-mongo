const graphqlRunnerUtil = require('./graphql-runner-util')('Person',{name:String,age:Number})
graphqlRunnerUtil.connectToMongoDb('dummyP').then(()=>{
  graphqlRunnerUtil.runQuery('{persons {name,age}}').then((data)=>{
      console.log(data)
      var persons = data.data.persons
      for(let i in persons) {
          console.log(persons[i].name+","+persons[i].age)
      }

  }).catch((err)=>{
      console.log(err)
  })
}).catch((err)=>{
    console.log(err)
})
