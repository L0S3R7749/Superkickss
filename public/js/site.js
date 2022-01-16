if (window.location.pathname.match('/site/contact')) {
    $('#submit-contact').on('click', e => {
        e.preventDefault();
        const email = $('input[name=c_email]').val();
        const fname = $('input[name=c_fname]').val();
        const lname = $('input[name=c_lname]').val();
        const title = $('input[name=c_title]').val();
        const message = $('textarea[name=c_message]').val();
        if (email === '' || fname === '' || lname === '' || title === '' || message === '') {
            $('.forgot-password-message').empty();
            let html = `<div class="error">
                            <i class="fas fa-times-circle me-2"></i>
                            <span>Please fill all field</span>
                        </div>`
            $('.forgot-password-message').append(html);
            return;
        }
        $.ajax({
            url: `/site/contact`,
            method: `POST`,
            data: {
                fname,
                lname,
                email,
                title,
                message,
            },
            success: function (data) {
                $('.forgot-password-message').empty();
                let html = `<div class="success">
                            <i class="fas fa-check-circle me-2"></i>
                            <span>${data.message}</span>
                        </div>`
                $('.forgot-password-message').append(html);
            },
            error: function (data) {
                $('.forgot-password-message').empty();
                let html = `<div class="error">
                            <i class="fas fa-times-circle me-2"></i>
                            <span>${data.responseJSON.message}</span>
                        </div>`
                $('.forgot-password-message').append(html);
            }
        })
        // $.ajax({
        //     url: `/auth/forgot-password`,
        //     method: `POST`,
        //     data: {
        //         email,
        //     },
        //     success: function(data){
        //         $('.forgot-password-message').empty();
        //         let html= `<div class="success">
        //                     <i class="fas fa-check-circle me-2"></i>
        //                     <span>${data.message}</span>
        //                 </div>`
        //         $('.forgot-password-message').append(html);
        //     },
        //     error: function(data){
        //         $('.forgot-password-message').empty();
        //         let html= `<div class="error">
        //                     <i class="fas fa-times-circle me-2"></i>
        //                     <span>${data.responseJSON.message}</span>
        //                 </div>`
        //         $('.forgot-password-message').append(html);
        //     }
        // })
    })
}