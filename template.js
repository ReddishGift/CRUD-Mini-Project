module.exports = {
    // 홈페이지 템플릿
    homePage: function (productListHtml, cartHtml, addProductLink) {
      return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>상점</title>
        </head>
        <body>
          <h1>상품 목록</h1>
          ${productListHtml}
          <h2>장바구니</h2>
          <ul>
            ${cartHtml}
          </ul>
          <a href="/checkout">결제하기</a>
          ${addProductLink}
        </body>
        </html>
      `;
    },
    updateProductPage: function (product, addProductLink) {
        return `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>상품 정보 수정</title>
            </head>
            <body>
                <h1>상품 정보 수정</h1>
                <form action="/updateProduct/${product.id}" method="post">
                    <p><input type="text" name="productName" placeholder="상품명" value="${product.name}"></p>
                    <p><input type="number" name="productPrice" placeholder="가격" value="${product.price}"></p>
                    <p><button type="submit">수정</button></p>
                </form>
                ${addProductLink}
            </body>
            </html>
        `;
    },
    deleteProductPage: function (product, addProductLink) {
        return `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>상품 삭제</title>
            </head>
            <body>
                <h1>상품 삭제</h1>
                <p>다음 상품을 삭제하시겠습니까?</p>
                <p>${product.name} - 가격: $${product.price}</p>
                <form action="/deleteProduct/${product.id}" method="post">
                    <p><button type="submit">삭제</button></p>
                </form>
                ${addProductLink}
            </body>
            </html>
        `;
    },
    // 템플릿 파일에 추가
    addProductPage: function (addProductLink) {
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>상품 등록</title>
        </head>
        <body>
            <h1>상품 등록</h1>
            <form action="/addProduct" method="post">
            <p><input type="text" name="productName" placeholder="상품명"></p>
            <p><input type="number" name="productPrice" placeholder="가격"></p>
            <p><button type="submit">등록</button></p>
            </form>
            <a href="/">홈으로 돌아가기</a>
        </body>
        </html>
        `;
    },
    
    checkoutPage: function (cartHtml, totalPrice) {
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>장바구니</title>
        </head>
        <body>
            <h1>장바구니</h1>
            <ul>
            ${cartHtml}
            </ul>
            <p>총 금액: $${totalPrice}</p>
            <a href="/">상점으로 돌아가기</a>
        </body>
        </html>
        `;
    },
  
  };
