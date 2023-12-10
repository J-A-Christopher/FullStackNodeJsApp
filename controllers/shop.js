const Product = require('../models/product')
const Cart = require('../models/cart')
 exports.getProducts = (req, res,next)=>{
    Product.findAll().then(products=>{
        res.render('shop/product-list', {prods:products, pageTitle:'All Products', path: '/product',});

    }).catch(err=>{
        console.log(err);
    });
 
}

exports.getProduct = (req, res,next)=>{
  const prodId = req.params.productId;
  Product.findAll({where:{id:prodId}}).then(
    products=>{
        res.render('shop/product-detail',{product: products[0],pageTitle: products[0].title, path:'/products'});

    }
  ).catch(err=>{
    console.log(err);
  });
//  Product.findById(prodId).then(
//     product=>{
       
//          }
//  ).catch(err=> console.log(err));

 

}


exports.getIndex =(req, res, next) =>{
    Product.findAll().then(products=>{
        res.render('shop/index', {prods:products, pageTitle:'Shop', path: '/'});

    }).catch(err=>{
        console.log(err);
    });
        
  
};



exports.getCart =(req, res, next) =>{
    const cartProducts = [];
    Cart.getCart(cart=>{
        Product.fetchAll(products=>{
           
            for(product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData){
                    cartProducts.push({productData: product, qty:cartProductData.qty});

                }
            }

        });
        Product.fetchAll(products =>{
            res.render('shop/cart', {prods:products, pageTitle:'Your Cart', path: '/cart',products:cartProducts});
        });

    });
    
};

exports.postCartDeleteProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    Product.findById(prodId, product =>{
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });


}

exports.postCart = (req, res, next) =>{
    const prodId = req.body.productId;
   Product.findById(prodId, (product) => {
    Cart.addProduct(prodId,product.price );

   });
    res.redirect('/cart');
}

exports.getOrders =(req, res, next) =>{
    Product.fetchAll(products =>{
        res.render('shop/orders', {prods:products, pageTitle:'Your Orders', path: '/order',});
    }); 
};

exports.getCheckout =(req, res, next) =>{
    Product.fetchAll(products =>{
        res.render('shop/checkout', {prods:products, pageTitle:'Checkout', path: '/checkout',});
    }); 
};
