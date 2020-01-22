//Core module requiring
const fs = require('fs');
const http = require('http');
const url = require('url');

//3rd Party module requiring
const slugify = require('slugify');

//Our own Module Requiring
const replaceTemplate = require('./modules/replaceTemplate.js');

////////////////////////////////////
//FILE SYSTEM

/* Lecture 1st
const hello='Hello World';
console.log(hello);
*/

//2nd Lecture
/*const fs=require('fs'); //creating object of file system(fs) which will provide functions of file system module in our fs
const textIn =fs.readFileSync('./txt/input.txt','utf-8');//reads the text from file input.txt and stores in the variable textIn
console.log(textIn);
const textOt=`This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`//Can write Js codes in ${}
fs.writeFileSync('./txt/output.txt',textOt);//Helps to insert the text in textOt to output.txt 
console.log("File has been written");
*/

/*
//3rd Lecture
//Synchronous Code or Blocking Code. Each line executes after another. Above example of reading and writing the file is Synchronous
//Asynchronous code is achieved by the use of call back function and does not need to go line by line. Process can happen in background and the code can move forwards
const fs=require('fs');
fs.readFile('./txt/input.txt','utf-8',(err,data)=>{
    console.log(data);
});
console.log('Reading file....')
*/

/*
//4th Lecture
//Asyncronous in practice and Callback Hell
const fs=require('fs');
fs.readFile('./txt/start.txt','utf-8',(err, data1)=>{
    if (err) return console.log('ERROR!! :p');
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err, data2)=>{
        console.log(data2);
        fs.readFile('./txt/append.txt','utf-8',(err, data3)=>{
            console.log(data3);

            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8', err=>{
                console.log('Your files have been written');
            });
        });
    });
});
console.log('Will read the file!');
*/

//////////////////////////////////////
///SERVER
//Syncronous reading because only read once the app is started so no worry abou blocking
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

console.log(
  slugify('Fresh Avacados', {
    replacement: '@',
    lower: true
  })
);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));

//Creating very first web server to accept request and send response

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //Overview Page

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);
  }

  //Product Page
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  //API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }
  //Not Found
  else {
    //Send error type ERROR 404 not found
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page Not found!!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening request on port 8000');
});
