import http from 'http';
import fs from 'fs';

// http.createServer((request, response) => {
// 	response.setHeader('Cache-Control', 'no-cache');
// 	response.statusCode = 200;
// 	response.write('hello world');
// 	response.end();
// }).listen(3000);

// http.createServer((request, response) => {
// 	response.setHeader('Content-Type', 'text/html');
// 	response.statusCode = 200;
// 	response.write('<b>'+new Date+'</b>');
// 	response.end();
// }).listen(3000);

// http.createServer((request, response) => {
// 	response.writeHead(404, {'Content-Type': 'text/plain'});
// 	response.write('page not found');
// 	response.end();
// }).listen(3000);

// http.createServer((request, response) => {
// 	response.writeHead(200, {'Content-Type': 'text/html', 'Content-Language': 'ru'});
// 	response.write('{}');
// 	response.end();
// }).listen(3000);

// let i = 100;
// http.createServer((request, response) => {
// 	response.setHeader('Content-Type', 'text/html');
// 	response.statusCode = 200;
// 	response.write(i==0 ? 'asd' : String(--i));
// 	response.end();
// }).listen(3000);

// http.createServer((request, response) => {
// 	console.log(request.url);
// 	console.log(request.method);
// 	console.log(request.headers);
	
// 	response.writeHead(200, {'Content-Type': 'text/html'});
// 	response.write('text');
// 	response.end();
// }).listen(3000);

// http.createServer((request, response) => {
// 	if (request.url != '/favicon.ico'){
// 		console.log(request.url);
		
// 		response.writeHead(200, {'Content-Type': 'text/html'});
// 		response.write('text');
// 		response.end();
// 	}
// }).listen(3000);


// http.createServer((request, response) => {
// 	if (request.url != '/favicon.ico') {
// 		let text;
// 		let status = 200;
// 		switch(request.url) {
// 			case '/page1':
// 				text = '1';
// 				break;
// 			case '/page2':
// 				text = '2';
// 				break;
// 			case '/page3':
// 				text = '3';
// 				break;
// 			default:
// 				text = 'page not found';
// 				status = 404;
// 		}
// 		response.writeHead(status, {'Content-Type': 'text/html'});
// 		response.end();
// 	}

// }).listen(3000);

// let obj = {
// 	'/page1': '1',
// 	'/page2': '2',
// 	'/page3': '3',
// }
// http.createServer((request, response) => {
// 	if (request.url != '/favicon.ico') {
// 		let text;
// 		let status = 200;
		
// 		for (const key in obj) {
// 			if (request.url === key) {
// 				text = obj[key];
// 			}
// 		}
// 		if (text === '') {
// 			text = 'page not found';
// 			status = 404;
// 		}
		
// 		response.writeHead(status, {'Content-Type': 'text/html'});
// 		response.end();
// 	}
// }).listen(3000);

// let obj = {
// 	'/page1': 'file1.html',
// 	'/page2': 'file2.html',
// 	'/page3': 'file3.html',
// }
// http.createServer(async (request, response) => {
// 	if (request.url != '/favicon.ico') {
// 		let status = 200;
// 		let text;
// 		for (const key in obj) {
// 						if (request.url === key) {
// 							text = await fs.promises.readFile(obj[key], 'utf8'); 
// 						}
// 					}
// 					if (text === '') {
// 						text = 'page not found';
// 						status = 404;
// 					}
// 		response.writeHead(200, {'Content-Type': 'text/html'});
// 		response.write(text);
// 		response.end();
// 	}
// }).listen(3000);

// http.createServer(async (request, response) => {
// 	if (request.url != '/favicon.ico') {
// 		let data;
// 		let type;
		
// 		if (request.url === '/styles.css') {
// 			data = await fs.promises.readFile('styles.css', 'utf8');
// 			type = 'style/css';
// 		}
		
// 		response.writeHead(200, {'Content-Type': type});
// 		response.write(data);
// 		response.end();
// 	}
// }).listen(3000);

// http.createServer(async (request, response) => {
// 	if (request.url != '/favicon.ico') {
// 		let text;
// 		let status;
// 		let path = 'root' + request.url;
		
// 		try {
// 			if ((await fs.promises.stat(path)).isDirectory()) {
// 				path += '/index.html';
// 			}
			
// 			status = 200;
			
// 		} catch (err) {
// 			status = 404;
//             path = 'root/404.html'
// 			text = 'page not found';
// 		}
// 		text = await fs.promises.readFile(path, 'utf8');
// 		response.writeHead(status, {'Content-Type': 'text/html'});
// 		response.write(text);
// 		response.end();
// 	}
// }).listen(3000);

http.createServer(async (request, response) => {
    if (request.url != '/favicon.ico') {
	let lpath = 'layout.html';
    let cpath = 'page';
    let tpath = 'page';
    
    
        cpath += request.url + 'content.html';
	    tpath += request.url + 'title.html'; 
        

        // cpath += '/404/' + 'content.html';
	    // tpath += '/404/' + 'title.html';
	
	
	let layout  = await fs.promises.readFile(lpath, 'utf8');
	let content = await fs.promises.readFile(cpath, 'utf8');
	let title   = await fs.promises.readFile(tpath, 'utf8');
	
	layout = layout.replace(/\{% get content %\}/, content);
	layout = layout.replace(/\{% get title %\}/,   title);
	
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(layout);
	response.end();
    }
}).listen(3000);