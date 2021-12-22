const path = window.location.pathname;
if (path.match('/order/checkout')) {
    $('#submitOrder').on('click', async e => {
        e.preventDefault();
        let cartId = $('input[name=cart_id]').val();
        let totalPrice = parseInt($('input[name=totalPrice]').val());
        let shippingAddress;
        const targetCart = await getCartById();
        console.log(targetCart);

        if ($('#c_ship_different_address').prop('checked') == true)
            shippingAddress = $('input[name=diff_shippingAddress]').val();
        else
            shippingAddress = $('#shippingAddressSelect').val();

        $.ajax({
            url: '/order/checkout',
            method: 'POST',
            data: {
                cartId,
                shippingAddress,
                totalPrice,
            },
            success: function(data) {
                console.log(data);
                location.replace('/order/thankyou');
            },
            error: function(data) {
                console.log(data);
            }
        });
    });

    async function getCartById() {
        let cart;
        await $.ajax({
            url: `/cart/getSingle/${$('input[name=cart_id]').val()}`,
            method: 'GET',
            success: function (data) {
                cart = data;
            },
            error: function (data) {
                console.log(data);
            }
        });
        return cart;
    }
}