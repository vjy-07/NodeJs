const http = require("http");
const fs=require("fs");
const url=require('url');

const server=http.createServer((req,res)=>{
    if(req.url==='/favicon.ico') return res.end(); 
    const log=`${Date.now()}: ${req.url} new request received\n`;
    const myUrl=url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile('log.txt',log, (error,data)=>{
        
        switch (myUrl.pathname){
            case '/':
                res.end("hello from home page");
                break;
            case '/about': 
                const username=myUrl.query.username;
                res.end(`Hi, ${username}`);
                break;
            default: res.end("not found");
        }
    })
    
})
server.listen(8000,()=>console.log('server started'));

//http module does not paser the url(query parameters) so we use url package

//http methods
//GET,POST,PUT,DELETE,PATCH
//GET: used to get data from server
//POST: used to send data to server
//PUT: used to update data on server
//DELETE: used to delete data from server
//PATCH: used to update partial data on server
