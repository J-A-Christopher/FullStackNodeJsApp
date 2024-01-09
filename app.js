
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');

//const User = require('./models/users');




const app = express();
app.locals.layout = false;


app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next)=>{
//   User.findById('659c5bbf86a8e66878f87f36').then(user => {
//     //Here
//     req.user = new User(user.name, user.email, user.cart, user._id)
    
//     next();
//   }).catch(err=>console.log(err));


// });

app.use('/admin',adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404); 

mongoose.connect('mongodb+srv://christopher:cjambetsa@cluster0.gxedhff.mongodb.net/shop?retryWrites=true&w=majority').then(result => {
  app.listen(3000);
}).catch(err => {
  console.log(err);
})