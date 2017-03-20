const mongooseUtil = require('./mongooseUtil')
mongooseUtil.connect('dummyP').then(()=>{
    const Item = mongooseUtil.createModel('items',{count:Number,name:String,cost:Number})
    mongooseUtil.insert(Item,{count:2,name:'handkerchief',cost:2000}).then((msg)=>{
        console.log(msg.status)
        mongooseUtil.fetch(Item,{}).then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
}).catch((err)=>{

})
