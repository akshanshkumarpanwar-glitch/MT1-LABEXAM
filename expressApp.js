import express from 'express';

const app = express();

app.use(express.json());

let cart = [
    {
        id: 1,
        productName: "Wireless Mouse",
        price: 799,
        quantity: 2,
        category: "Electronics"
    },

    {
        id: 2,
        productName: "Running Shoes",
        price: 2499,
        quantity: 1,
        category: "Footwear"
    },

    {
        id: 3,
        productName: "Smartwatch",
        price: 3999,
        quantity: 1,
        category: "Gadgets"
    }
];

// GET ALL PRODUCTS
app.get('/cart', (req, res) => {
    res.json(cart);
});

// GET PRODUCT BY ID
app.get('/cart/:id', (req, res) => {

    const product = cart.find(p => p.id === Number(req.params.id));

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
        ...product,
        totalPrice: product.price * product.quantity
    });

});

// ADD PRODUCT
app.post('/cart', (req, res) => {

    const { id, productName, price, quantity, category } = req.body;

    if (id == null || !productName ||
        typeof price !== 'number' || typeof quantity !== 'number') {

        return res.status(400).json({ message: 'Invalid product details' });
    }

    if (cart.some(p => p.id === id)) {
        return res.status(400).json({ message: 'Product ID already exists' });
    }

    const product = { id, productName, price, quantity, category };

    cart.push(product);

    res.status(201).json({
        message: 'Product added successfully',
        product
    });

});

// UPDATE PRODUCT
app.put('/cart/:id', (req, res) => {

    const id = Number(req.params.id);

    const product = cart.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    Object.assign(product, req.body);

    res.json({
        message: 'Product updated successfully',
        product
    });

});

// DELETE PRODUCT
app.delete('/cart/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = cart.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    cart.splice(index, 1);

    res.json({ message: 'Product deleted successfully' });

});

// SERVER
app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});