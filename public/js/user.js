if (window.location.pathname.match('/auth/forgot-password')){
    $('#submit-email').on('click',e=>{
        e.preventDefault();
        const email=$('input[name=email]').val();
        $.ajax({
            url: `/auth/forgot-password`,
            method: `POST`,
            data: {
                email,
            },
            success: function(data){
                $('.error').empty();
            },
            error: function(data){
                $('.error').empty();
                let html= `<div class="error">
                            <i class="fas fa-times-circle me-2"></i>
                            <span>${data.responseJSON.message}</span>
                        </div>`
                $('.error').append(html);
            }
        })
    })
}

if (window.location.pathname.match('/auth/signup')){
    $(document).ready(async () => {
        const url=`/auth/signup`;
        let response= await fetch(url);
        if(response.ok){
            let json=await response.json();
            console.log(json);
        }else{
            console.log('bac');
        }
    });
}
