const express =require ('express');
const connectToMongoose=require('./db');
const app=express();
const port =3000;

// app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.post('/seller/signup',require('./routes/auth'));
app.post('/seller/login',require('./routes/auth'));
app.post('/seller/getseller',require('./routes/auth'));
app.post('/inventory/add',require('./routes/store'))
app.put('/inventory/update/:id',require('./routes/store'));
app.delete('/inventory/delete/:id',require('./routes/store'));
app.get('/inventory/getinventory',require('./routes/store'));
app.get('/inventory/search',require('./routes/store'));
app.get('/inventory',require('./routes/store'));
app.get('/inventory/analytics',require('./routes/store'));

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
    
})
// const silent=new kitten({name:'Silence'});
// console.log(silent.name);

// const fluffy = new kitten({ name: 'fluffy' });
// fluffy.speak();

// fluffy.save();
// fluffy.speak();

// const kittens = kitten.find();
// console.log(kittens);

// console.log(kitten.find({ name: /^fluff/ }));



// app.post ('/',(req,res)=>{
//     res.send('Got a POST request');
// })

// app.put('/user',(req,res)=>{
//     res.send('Got a put request at /user');
// })

// app.delete('/user',(req,res)=>{
//     res.send('Got a DELETE request at /user');
// })
// app.use('/static',express.static(__dirname,'public'))