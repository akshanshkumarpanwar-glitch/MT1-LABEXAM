import http from 'http';
import fs from 'fs';

let cart = [
    {
        id: 1,
        productName: "Mouse",
        price: 799,
        quantity: 2
    },
    {
        id: 2,
        productName: "Keyboard",
        price: 999,
        quantity: 1
    }
];

const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to Shopping Cart</h1>');

    }

    else if (req.url === '/cart' && req.method === 'GET') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cart));

    }

    else if (req.url === '/about' && req.method === 'GET') {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Shopping Cart Management Application</h1>');

    }

    else if (req.url === '/home' && req.method === 'GET') {

        fs.readFile('./public/index.html', (err, data) => {

            if (err) {
                res.writeHead(500);
                res.end('File Reading Error');
            }

            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }

        });

    }

    else if (req.url === '/add-to-cart' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            try {
                const product = JSON.parse(body);

                if (!product.id || !product.productName ||
                    product.price == null || product.quantity == null) {

                    res.writeHead(400);
                    res.end('Missing product details');
                    return;
                }

                cart.push(product);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Product added successfully',
                    product
                }));

            } catch (error) {
                res.writeHead(400);
                res.end('Invalid JSON');
            }

        });

    }

    else {

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page Not Found');

    }

});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});