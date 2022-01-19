const path = window.location.pathname;
if (path.match('/order/checkout')) {

    $('#submitOrder').on('click', async e => {
        e.preventDefault();
        let cartId = $('input[name=cart_id]').val();
        let totalPrice = parseInt($('input[name=totalPrice]').val());
        let shippingAddress = $('input[name=shippingAddress]').val();;

        $.ajax({
            url: '/order/checkout',
            method: 'POST',
            data: {
                cartId,
                shippingAddress,
                totalPrice,
            },
            success: function (data) {
                console.log(data);
                location.replace('/order/thankyou');
            },
            error: function (data) {
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

if (path.match('/order')) {

    $('tr.order-data').on('click', e => {
        let orderId=($(e.target).closest('.order-data').data('id'));
        location.assign('/order/detail/'+orderId);
    })
}