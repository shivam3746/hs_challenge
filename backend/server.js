const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// In-memory data store
let transactions = [];
let accounts = {
    "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2": { account_id: "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2", balance: 10 },
    "5ae0ef78-e902-4c40-9f53-8cf910587312": { account_id: "5ae0ef78-e902-4c40-9f53-8cf910587312", balance: -7 }
};

// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Routes
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'The service is up and running.' });
});

app.post('/transactions', (req, res) => {
    const { account_id, amount } = req.body;

    if (!account_id || !amount || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Mandatory body parameters missing or have incorrect type.' });
    }

    const transaction = {
        transaction_id: generateUUID(),
        account_id,
        amount,
        created_at: new Date().toISOString()
    };

    transactions.unshift(transaction);

    if (!accounts[account_id]) {
        accounts[account_id] = { account_id, balance: 0 };
    }
    accounts[account_id].balance += amount;

    dummyTransactions.unshift(transaction);

    res.status(201).json(transaction);
});



app.get('/transactions', (req, res) => {
    res.status(200).json(transactions);
});

app.get('/transactions/:transaction_id', (req, res) => {
    const transaction_id = req.params.transaction_id;
    const transaction = transactions.find(trx => trx.transaction_id === transaction_id);

    if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found.' });
    }

    res.status(200).json(transaction);
});

app.get('/accounts/:account_id', (req, res) => {
    const account_id = req.params.account_id;

    if (!account_id || typeof account_id !== 'string' || !isValidUUID(account_id)) {
        return res.status(400).json({ error: 'account_id missing or has incorrect type.' });
    }

    const account = accounts[account_id];

    if (!account) {
        return res.status(404).json({ error: 'Account not found.' });
    }

    res.status(200).json(account);
});


app.get('/positiveAccounts', (req, res) => {
    const positiveAccounts = Object.values(accounts).filter(account => account.balance > 0);
    res.status(200).json(positiveAccounts);
});


app.get('/negativeAccounts', (req, res) => {
    const negativeAccounts = Object.values(accounts).filter(account => account.balance < 0);
    res.status(200).json(negativeAccounts);
});

app.get('/allAccounts', (req, res) => {
    const allAccounts = Object.values(accounts);
    res.status(200).json(allAccounts);
});


function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}


function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}



//Dummy data
const dummyTransactions = [
    {
        transaction_id: '4bcc3959-6fe1-406e-9f04-cad2637b47d5',
        account_id: '0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2',
        amount: 7,
        created_at: '2021-05-12T18:29:40.206924+00:00'
    },
    {
        transaction_id: '050a75f6-8df1-4ad1-8f5b-54e821e98581',
        account_id: '5ae0ef78-e902-4c40-9f53-8cf910587312',
        amount: -4,
        created_at: '2021-05-18T21:33:47.203136+00:00'
    }
];


transactions = [...dummyTransactions];


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
