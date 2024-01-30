const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

// CRUD operations

// Get all items
app.get('/api/items', (req, res) => {
    res.json(data);
});

// Get a single item by ID
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find((item) => item.id === id);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Create a new item
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    newItem.id = data.length + 1;
    data.push(newItem);
    res.json(newItem);
});

// Update an existing item
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;

    data = data.map((item) => (item.id === id ? { ...item, ...updatedItem } : item));

    res.json(updatedItem);
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    data = data.filter((item) => item.id !== id);
    res.json({ message: 'Item deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
