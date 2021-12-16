$('#post-rating').on('click', e => {
    e.preventDefault();
    let productId = $('input[name=productId]').val();
    let userId = $('input[name=userId]').val();
    let fullname = $('input[name=fullname]').val();
    let content = $('textarea[name=content]').val();
    console.log(fullname);
    $.ajax({
        url: '/product/rate',
        method: 'POST',
        data: {
            productId,
            userId,
            fullname,
            content,
        },
        success: function (data) {
            console.log(data);
            loadRatings();
        }
    })
});

function loadRatings() {
    $.getJSON(`/product/${$('input[name=productId]').val()}/ratings`, function (data) {
        let username = data.fullname;
        let content = data.content;
        let html = '';
        for (const rating of data) {
            html += `<div class="col-md-4">
                    <div class="comment__user mb-4">
                    <div class="comment__user-avatar"></div>
                    <div class="comment__user-name"><h5>${rating.fullname}</h5></div>
                </div>
                </div>
                <div class="col-md-8">
                    <h5>${rating.createdTime}</h5>
                    <div class="comment__content mb-4">${rating.content}</div>
                </div>`;
                
        }
        $('#ratings').html(html);
    });
}

loadRatings();