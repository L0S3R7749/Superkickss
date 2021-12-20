//add to cart
$('#submit-add-to-cart').on('click', e => {
    e.preventDefault();
    console.log('add product to cart');
    let userId = $('input[name=userId').val();
    let itemId = $('input[name=productId').val();
    let itemSize = parseInt($('select[id=product-size').val());
    let itemQuantity = parseInt($('input[id=product-quantity').val());
    $.ajax({
        url: '/cart/add',
        method: 'POST',
        data: {
            userId,
            itemId,
            itemSize,
            itemQuantity,
        },
        success: function (data) {
            
        },
        error: function (data) {
            if (data.responseJSON.message === `Can't add to cart`) {
                jQuery.noConflict();
                $('#addCartFailModal').modal('show');
            }
        }
    })
})