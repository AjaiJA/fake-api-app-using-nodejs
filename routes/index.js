var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */

router.get('/',async function(req, res, next) {
  await axios.get('https://fakestoreapi.com/products')
  .then(response => {
    res.render('pages/index', { products: response.data });
  })
  .catch(error => {
    console.log(error);
  });
});

router.get('/products/:id',async(req,res)=>{
  await axios.get(`https://fakestoreapi.com/products/${req.params.id}`)
  .then(response => {
    res.render('pages/product', { products: response.data });
  })
  .catch(error => {
    console.log(error);
  });  
});

router.get('/cart/:id',function(req, res, next) {
  axios.get(`https://fakestoreapi.com/products`)
  .then(response => {
    let productData=response.data
     axios.get(`https://fakestoreapi.com/carts/user/${req.params.id || 1}`)
    .then(response2 => {
      let products=response2.data[0].products
      let carts=[]
      for(let i=0; i<products.length; i++){
        let productId=products[i].productId
        let Index=productData.filter((list)=>{
          return list.id===productId
        })
        carts.push(Index[0])
      }
      res.render('pages/cart', { carts:carts });
    })
    .catch(error => {
      console.log(error);
    });
  })
  .catch(error => {
    console.log(error);
  });  
})

module.exports = router;
