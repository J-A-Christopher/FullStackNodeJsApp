const Product = require('../models/product');
 exports.getProducts = (req, res,next)=>{
     Product.find().then(products => {
         console.log(products);
        res.render('shop/product-list', {prods:products, pageTitle:'All Products', path: '/product',});

    }).catch(err=>{
        console.log(err);
    });
 
}

exports.getProduct = (req, res,next)=>{
  const prodId = req.params.productId;
 Product.findById(prodId).then(
     product => {
         
        const selectedProduct = Array.isArray(product) ? product[0] : product;
        res.render('shop/product-detail',{product: selectedProduct,pageTitle:  selectedProduct.title, path:'/products'});
       
         }
 ).catch(err=> console.log(err));

 

}


exports.getIndex =(req, res, next) =>{
    Product.find().then(products=>{
        res.render('shop/index', {prods:products, pageTitle:'Shop', path: '/'});

    }).catch(err=>{
        console.log(err);
    });
        
  
};



exports.getCart =(req, res, next) =>{
   req.user.populate('cart.items.productId').then(
       user => {
           const products = user.cart.items
    
        res.render('shop/cart', {prods:products, pageTitle:'Your Cart', path: '/cart',products:products});       
     
    }
   ).catch(err => console.log(err));
    
};

exports.postCartDeleteProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId).then(result =>{
            res.redirect('/cart');

        })


}

exports.postCart = (req, res, next) =>{
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => {
        return req.user.addToCart(product)
    }).then(result => {
        console.log(result);
        res.redirect('/cart');
    })
   
}

exports.getOrders =(req, res, next) =>{
    req.user.getOrders().then(orders=>{
        res.render('shop/orders', {
            pageTitle: 'Your Orders',
            path: '/order',
            orders: orders
          });
        
    }).catch(err=>console.log(err));
    
};



exports.postOrder = (req, res, next) =>{
    let fetchedCart;
    req.user.addOrder().then(result =>{
        res.redirect('/orders');

    }).catch(err=>console.log(err))
}
