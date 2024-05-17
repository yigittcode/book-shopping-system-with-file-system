const path = require('path');
const errorController = require('./controllers/error');
const db = require('./util/database');

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

async function a(){
    const [results, fields] = await db.query('SELECT * from products');
    console.log(results);
    console.log( fields);
}
a();


app.listen(3000);
