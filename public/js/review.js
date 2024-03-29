if (window.location.pathname.match('/product/detail')) {
    $(document).ready(() => {
        loadRatings();
    });
    //add comment
    $('#post-rating').on('click', e => {
        e.preventDefault();
        let productId = $('input[name=productId]').val();
        let userId = $('input[name=userId]').val();
        let rating = parseInt($("input[type=radio][name=rating]:checked").val());
        let content = $('textarea[name=content]').val();
        if (isNaN(rating)) {
            jQuery.noConflict();
            $('#reivewNotiModal').modal('show');
            return;
        }
        $.ajax({
            url: '/product/rate',
            method: 'POST',
            data: {
                productId,
                userId,
                rating,
                content,
            },
            success: function (data) {
                $('.product-rate').empty();
                let html = `Rate: ${data.rate}/5.0`;
                $('.product-rate').append(html);
                loadRatings();
            }
        })
        $('textarea[name=content]').val('');
    });

    //load comments
    function loadRatings(page, size) {
        $.ajax({
            url: `/product/${$('input[name=productId]').val()}/ratings?page=${page}&size=${size}`,
            method: 'GET',
            success: function (data) {
                $('#ratings').empty();
                $.each(data.rates, function (index, item) {
                    appendRate(item);
                })
                if ($('ul.pagination li').length - 2 != data.totalPage) {
                    $('ul.pagination').empty();
                    buildPagination(data.totalPage);
                }
            }
        })
    }

    function appendRate(rate) {
        let date = new Date(rate.createdTime);
        let dateStr = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        let html = `<div class="col-md-4 mb-4">
                <div class="comment__user mb-4">
                    <div class="comment__user-avatar">
                    <img src="${rate.userId.avatar}" alt="">
                    </div>
                    <div class="comment__user-name">
                        <h5 class="mb-0">${rate.userId.fullname}</h5>
                        <p class="mb-0">Đánh giá: ${rate.rating} sao</p>
                    </div>
                </div>
            </div>
            <div class="col-md-8 mb-4">
                <h5>${dateStr}</h5>
                <div class="comment__content mb-4">${rate.content}</div>
            </div>`
        $('#ratings').append(html);
    }

    function buildPagination(totalPage) {
        let page = '<li class="page-item"><a class="page-link left">&lt</a></li>';
        $('ul.pagination').append(page);

        for (let i = 1; i <= totalPage; i++) {
            if (i == 1) {
                page = `<li class="page-item active"><a class="page-link">${i}</a></li>`;
            } else {
                page = `<li class="page-item"><a class="page-link">${i}</a></li>`;
            }
            $('ul.pagination').append(page);
        }

        page = '<li class="page-item"><a class="page-link right">&gt</a></li>';
        $('ul.pagination').append(page);

        //event click
        $(document).on('click', 'ul.pagination li', e => {
            let value = e.target.text;
            if (value == '<') {
                const curentPage = $("li.active");
                const page = Number.parseInt(curentPage.text());
                if (page > 1) {
                    loadRatings(page - 1);
                    $("li.active").removeClass("active");
                    curentPage.prev().addClass('active');
                }
            } else if (value == '>') {
                const totalPages = $("ul.pagination li").length - 2;
                const curentPage = $("li.active");
                const page = Number.parseInt(curentPage.text());
                if (page < totalPages) {
                    loadRatings(page + 1);
                    $("li.active").removeClass("active");
                    curentPage.next().addClass('active');
                }
            } else {
                loadRatings(value);
                $("li.active").removeClass("active");
                e.target.parentElement.classList.add('active');
            }
        })
    }
}