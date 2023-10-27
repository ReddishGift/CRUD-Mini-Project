const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const template = require('./template.js')

const products = [
  { id: 1, name: '상품 1', price: 10 },
  { id: 2, name: '상품 2', price: 20 },
  { id: 3, name: '상품 3', price: 30 }
];

const cart = []; // 장바구니 데이터
  
// 상점 페이지
app.get('/', (req, res) => {
    const productListHtml = products.map(product => {
      return `<div>
                <p>${product.name} - 가격: $${product.price}</p>
                <a href="/addToCart/${product.id}">장바구니에 추가</a>
                <a href="/updateProduct/${product.id}">상품 정보 수정</a>
                <a href="/deleteProduct/${product.id}">상품 정보 삭제</a>
              </div>`;
    });
    const cartHtml = cart.map(item => `<li>${item.name} - 가격: $${item.price}</li>`).join('');
    
    const addProductLink = '<a href="/addProduct">상품 등록</a>';
  
    const html = template.homePage(productListHtml.join(''), cartHtml, addProductLink);
    res.send(html);
  });
  
  app.get('/addProduct', (req, res) => {
    const addProductLink = '<a href="/addProduct">상품 등록</a>';
    const html = template.addProductPage(addProductLink);
    res.send(html);
  });
  
  
  // 상품 등록 라우트
  app.post('/addProduct', (req, res) => {
    const { productName, productPrice } = req.body;
    const id = products.length + 1; // 간단한 ID 생성 방식
    const newProduct = { id, name: productName, price: parseFloat(productPrice) };
    products.push(newProduct);
    res.redirect('/');
  });

// 제품을 장바구니에 추가
app.get('/addToCart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const selectedProduct = products.find(product => product.id === productId);
  
    if (selectedProduct) {
      cart.push(selectedProduct);
    }
  
    res.redirect('/');
});
  

// 장바구니 페이지
app.get('/checkout', (req, res) => {
    const cartHtml = cart.map(item => `<li>${item.name} - 가격: $${item.price}</li>`).join('');
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);
    const html = template.checkoutPage(cartHtml, totalPrice);
    res.send(html);
    cart.length = 0; // 장바구니 비우기
  });
  
// 상품 수정 폼을 표시
app.get('/updateProduct/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const selectedProduct = products.find(product => product.id === productId);

    if (selectedProduct) {
        const html = template.updateProductPage(selectedProduct);
        res.send(html);
    } else {
        res.send('상품을 찾을 수 없습니다.');
    }
});
// 상품 정보 업데이트
app.post('/updateProduct/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const selectedProduct = products.find(product => product.id === productId);

    if (selectedProduct) {
        const { productName, productPrice } = req.body;
        // 선택한 제품의 정보를 업데이트
        selectedProduct.name = productName;
        selectedProduct.price = parseFloat(productPrice);
        res.redirect('/');
    } else {
        res.send('상품을 찾을 수 없습니다.');
    }
});

// 상품 삭제 기능
app.get('/deleteProduct/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const selectedProductIndex = products.findIndex(product => product.id === productId);

    if (selectedProductIndex !== -1) {
        // 선택한 제품을 목록에서 삭제
        products.splice(selectedProductIndex, 1);
        res.redirect('/');
    } else {
        res.send('상품을 찾을 수 없습니다.');
    }
});


app.listen(port, () => {
  console.log('서버가 http://localhost:' + port + '에서 실행 중입니다.');
});
