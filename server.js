const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer();


const serveFile = (res, filePath) => {
    fs.readFile(path.resolve(__dirname, filePath), (err, file) => {
        if(err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });

            res.end('500 interval error');

            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(file.toString());
    });
};


server.on('request', (req, res) => {
    const url = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch(url) {
        case '': {
            serveFile(res, 'public/home.html');
            break;
        };

        case '/about': {
            serveFile(res, 'public/about.html');
            break;
        };

        default: {
            serveFile(res, 'public/404.html');
        };
    }
});

server.listen(3000, 'localhost', () => {
    const ip = server.address().address;
    const port = server.address().port;

    console.log(`App is running at http://${ ip }:${ port }`);
});