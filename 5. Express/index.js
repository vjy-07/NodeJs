const express=require('express');

const app=express();

app.get('/',(req,res)=>{
    res.send('hello from home page');
});

app.get('/about',(req,res)=>{
    res.send(`hello ${req.query.username}`);
});

app.listen(8000,()=> console.log('server started'))