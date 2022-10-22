// The entry point to our server
const PORT = '5000';

const express = require('express');
const app = express();
const productRouter = require('./routes/products.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productRouter);
//

app.listen(PORT, () => {
    console.log(`Server running sucessfully on PORT ${PORT}`);
})