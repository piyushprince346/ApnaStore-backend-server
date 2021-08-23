const express = require('express');
const env = require('dotenv').config(); // dotenv helps in loading environment variables from a .env file into process.env
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// routes
const userRoutes = require('../src/routes/user');
const adminRoutes = require('../src/routes/admin');
const categoryRoutes = require('../src/routes/category')
const productRoutes = require('../src/routes/product');
const cartRoutes = require('../src/routes/cart');
const initialDataRoutes = require('../src/routes/initialData');
const pageRoutes = require('../src/routes/page');
const addressRoutes = require('../src/routes/address');
const orderRoutes = require('../src/routes/order');
const adminOrderRoutes = require('../src/routes/admin.order');

// mongo db connection
const dbURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kmwnp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
mongoose.connect(
    dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database is connected...!');
})

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/user', cartRoutes);
app.use('/admin', initialDataRoutes);
app.use('/page', pageRoutes);
app.use('/user', addressRoutes);
app.use('/order', orderRoutes);
app.use('/order', adminOrderRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

