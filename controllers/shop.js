const Product = require('../models/product');
 exports.getProducts = (req, res,next)=>{
    Product.fetchAll().then(products=>{
        res.render('shop/product-list', {prods:products, pageTitle:'All Products', path: '/product',});

    }).catch(err=>{
        console.log(err);
    });
 
}

exports.getProduct = (req, res,next)=>{
  const prodId = req.params.productId;
//   Product.findAll({where:{id:prodId}}).then(
//     products=>{
//         res.render('shop/product-detail',{product: products[0],pageTitle: products[0].title, path:'/products'});

//     }
//   ).catch(err=>{
//     console.log(err);
//   });
 Product.findById(prodId).then(
     product => {
         
        const selectedProduct = Array.isArray(product) ? product[0] : product;
        res.render('shop/product-detail',{product: selectedProduct,pageTitle:  selectedProduct.title, path:'/products'});
       
         }
 ).catch(err=> console.log(err));

 

}


exports.getIndex =(req, res, next) =>{
    Product.fetchAll().then(products=>{
        res.render('shop/index', {prods:products, pageTitle:'Shop', path: '/'});

    }).catch(err=>{
        console.log(err);
    });
        
  
};



exports.getCart =(req, res, next) =>{
   req.user.getCart().then(
    products => {
    
        res.render('shop/cart', {prods:products, pageTitle:'Your Cart', path: '/cart',products:products});       
     
    }
   ).catch(err => console.log(err));
    
};

exports.postCartDeleteProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    req.user.getCart().then(cart=>{
        return cart.getProducts({where:{id:prodId}}).then(products=>{
            const product = products[0];
            return product.cartItem.destroy();

        }).then(result =>{
            res.redirect('/cart');

        })
    }).catch(err=>console.log(err));
    // Product.findById(prodId, product =>{
    //     Cart.deleteProduct(prodId, product.price);
       
    // });


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
    req.user.getOrders({include: ['products']}).then(orders=>{
        res.render('shop/orders', {
            pageTitle: 'Your Orders',
            path: '/order',
            orders: orders
          });
        
    }).catch(err=>console.log(err));
    Product.findAll()
//   .then(products => {
//     res.render('shop/orders', {
//       prods: products,
//       pageTitle: 'Your Orders',
//       path: '/order'
//     });
//   })
  .catch(error => {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }); 
};



exports.postOrder = (req, res, next) =>{
    let fetchedCart;
    req.user.getCart().then(cart=>{
        fetchedCart = cart;
        return cart.getProducts();
    }).then(
        products=>{
           return req.user.createOrder().then(order =>{
            return order.addProducts(products.map(product =>{
                product.orderItem = {quantity: product.cartItem.quantity};
                return product;
            }));
           }).catch(err=>console.log(err));
        }
    ).then(result=>{
        return fetchedCart.setProducts(null);


       
    }).then(result =>{
        res.redirect('/orders');

    }).catch(err=>console.log(err))
}
