
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/users');


const app = express();
app.locals.layout = false;


app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);  

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

  sequelize.sync().then((result) =>{
    return User.findByPk(1);
   
    
  }).then(user =>{
    if(!user){
     return  User.create({name: 'Cj', email: 'test@gmail.com'});
    }
    return user;
  }).then(user =>{
    console.log(user);
    app.listen(3000);
  }

  )
  .catch(err=>console.log(err));

