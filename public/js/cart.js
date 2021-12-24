if (window.location.pathname.match('/product/detail')) {
    //add to cart
    $('#submit-add-to-cart').on('click', e => {
        e.preventDefault();
        let userId = $('input[name=userId]').val();
        let itemId = $('input[name=productId]').val();
        let itemSize = parseInt($('select[id=product-size]').val());
        let itemQuantity = parseInt($('input[id=product-quantity]').val());
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
                $('#addToCartToast').toast('show');
            },
            error: function (data) {
                if (data.responseJSON.message === `Can't add to cart`) {
                    jQuery.noConflict();
                    $('#addCartFailModal').modal('show');
                }
            }
        })
    })
}

if (window.location.pathname.match('/cart')) {

    //remove from cart
    $('.remove-item').on('click', e => {
        e.preventDefault();
        let userId = $('input[name=userId').val();
        let productId = $(e.target).closest('.item-cart').data('id');
        let productSize = $(e.target).closest('.item-size').data('id');
        $.ajax({
            url: '/cart/remove',
            method: 'POST',
            data: {
                userId,
                productId,
                productSize,
            },
            success: function(data){
                console.log(data);
                location.reload();
                //TODO: render ajax sau
            },
            error: function(data){
                console.log(data);
            }
        })
    })

    //update cart
    $('.update-cart').on('click', e=>{
        e.preventDefault();
        let userId = $('input[name=userId').val();
        let itemsId= document.querySelectorAll('input.id-items');
        let itemsSize= document.querySelectorAll('.size-items');
        let itemsQuantity= document.querySelectorAll('.quantity-items');
        let id=[],size=[],quantity=[];
        for(let i=0;i<itemsId.length;i++){
            id.push(itemsId[i].value);
            size.push(itemsSize[i].innerText);
            quantity.push(itemsQuantity[i].value);
        }
        $.ajax({
            url: '/cart/update',
            method: 'POST',
            data:{
                userId,
                id: id,
                size: size,
                quantity: quantity,
            },
            success: function(data){
                location.reload();
            },
            error: function(data){

            }
        })
    })
}

