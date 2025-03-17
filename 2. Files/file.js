const fs=require('fs')

// file writing


// fs.writeFileSync('./testsync.txt',"this is using sync");

// fs.writeFile('./testasync.txt',"this is using async",(error)=>{});

// file reading
// let output= fs.readFileSync('./testsync.txt', 'utf-8');
// console.log(output);

// fs.readFile('./testasync.txt','utf-8',(err,res)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(res);
//     }
// })

//async function requires a callback function to execute , it doesn't return;

// fs.appendFileSync('./testsync.txt','this is appended using sync');
// fs.appendFile('./testasync.txt',"this is appended using async",(error)=>{});

// fs.cpSync('./testsync.txt', './copy.txt');    copies the content to another file

//fs.unlinkSync('./testsync.txt');     deletes the file

// console.log(fs.statSync('./testsync.txt')); to get the stats of the file