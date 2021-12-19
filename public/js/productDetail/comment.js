$(document).ready(()=>{
    loadRatings();
});

//comment
$('#post-rating').on('click', e => {
    e.preventDefault();
    let productId = $('input[name=productId]').val();
    let userId = $('input[name=userId]').val();
    let fullname = $('input[name=fullname]').val();
    let content = $('textarea[name=content]').val();
    if(content==''){
        console.log(`can't comment with empty string`);
        return;
    }
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
    $('textarea[name=content]').val('');
});

function loadRatings(page,size) {
    $.ajax({
        url: `/product/${$('input[name=productId]').val()}/ratings?page=${page}&size=${size}`,
        method: 'GET',
        success: function (data) {
            
            $('#ratings').empty();
            $.each(data.rates,function(index,item){
                appendRate(item);
            })
            if ($('ul.pagination li').length - 2 != data.totalPage) {
                $('ul.pagination').empty();
                buildPagination(data.totalPage);
            }
        }
    })
}

function appendRate(rate){
    let date=new Date(rate.createdTime);
    let dateStr=date.getDate()+ '/'+(date.getMonth()+1)+'/'+date.getFullYear();
    let html=`<div class="col-md-4 mb-4">
                <div class="comment__user mb-4">
                    <div class="comment__user-avatar"></div>
                    <div class="comment__user-name"><h5>${rate.fullname}</h5></div>
                </div>
            </div>
            <div class="col-md-8 mb-4">
                <h5>${dateStr}</h5>
                <div class="comment__content mb-4">${rate.content}</div>
            </div>`
    $('#ratings').append(html);
}

function buildPagination(totalPage){
    let page='<li class="page-item"><a class="page-link left">&lt</a></li>';
    $('ul.pagination').append(page);

    for( let i=1;i<=totalPage;i++){
        if(i==1){
            page=`<li class="page-item active"><a class="page-link">${i}</a></li>`;
        }else{
            page=`<li class="page-item"><a class="page-link">${i}</a></li>`;
        }
        $('ul.pagination').append(page);
    }
    
    page='<li class="page-item"><a class="page-link right">&gt</a></li>';
    $('ul.pagination').append(page);

    //event click
    $(document).on('click','ul.pagination li',e=>{
        let value=e.target.text;
        if (!value) {
            if (value.includes('left')) {
                const curentPage = $("li.active");
                const page = Number.parseInt(curentPage.text());
                if (page > 1) {
                    loadRatings(page - 1);
                    $("li.active").removeClass("active");
                    curentPage.prev().addClass('active');
                }
            }
            else {
                const totalPages = $("ul.pagination li").length - 2;
                const curentPage = $("li.active");
                const page = Number.parseInt(curentPage.text());
                if (page < totalPages) {
                    loadRatings(page + 1);
                    $("li.active").removeClass("active");
                    curentPage.next().addClass('active');
                }
            }
        } else {
            loadRatings(value);
            $("li.active").removeClass("active");
            e.target.parentElement.classList.add('active');
        }
    })
}
