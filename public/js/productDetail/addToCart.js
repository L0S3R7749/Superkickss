
//add to cart
$('#submit-add-to-cart').on('click',e=>{
    e.preventDefault();
    console.log('add product to cart');
    let userId=$('input[name=userId').val();
    let itemId=$('input[name=productId').val();
    let itemSize=parseInt($('select[id=product-size').val());
    let itemQuantity=parseInt($('input[id=product-quantity').val());
    let product={
        itemId,
        itemSize,
        itemQuantity,
    };
    let cart={
        userId,
        product,
    }
    console.log(cart);

})

