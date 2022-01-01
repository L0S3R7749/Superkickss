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

//validator for confirm password
if (window.location.pathname.match('/auth/reset-password')){
    $('#submit-reset-password').on('click', e=>{
        e.preventDefault();
        const password=$('input[name=password]').val();
        const confirmPassword=$('input[name=confirmPassword]').val();
        if(password===confirmPassword){
            $('#submit-password').submit();
        }else{
            $('.error').empty();
                let html= `<div class="error">
                            <i class="fas fa-times-circle me-2"></i>
                            <span>Not correct password</span>
                        </div>`
            $('.error').append(html);
        }
    })
}