const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const app = express();
const PORT = 3000;

app.use(cors());
// Middleware برای پردازش body به فرمت JSON
app.use(bodyParser.json());

// Sample data
const contacts = [
    {
        id: 1,
        name: 'Contact 1',
        email: 'contact1@example.com',
        tel1: '123-456-7890',
        tel2: '098-765-4321',
        address: '123 Main St, City, Country',
        comment: 'First contact comment'
    },
    {
        id: 2,
        name: 'Contact 2',
        email: 'contact2@example.com',
        tel1: '234-567-8901',
        tel2: '987-654-3210',
        address: '456 Elm St, City, Country',
        comment: 'Second contact comment'
    },
    {
        id: 3,
        name: 'Contact 3',
        email: 'contact3@example.com',
        tel1: '345-678-9012',
        tel2: '876-543-2109',
        address: '789 Oak St, City, Country',
        comment: 'Third contact comment'
    }
];

// Middleware to check for Bearer token
const checkAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

app.get('/api/contacts', checkAuth, (req, res) => {
    return res.json({ data: contacts });
});

// API endpoint to create a new contact
app.post('/api/contacts/create', checkAuth, (req, res) => {
    const { name, email, tel1, tel2, address, comment } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Bad Request: Missing parameters' });
    }

    const newContact = {
        id: contacts.length + 1,
        name,
        email,
        tel1,
        tel2,
        address,
        comment,
    };
    contacts.push(newContact);
    res.status(201).json({
        message: 'Contact created successfully',
        data: newContact
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
