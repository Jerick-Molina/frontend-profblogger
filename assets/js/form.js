$( document ).ready(function() {

    var host = location.origin
    if(localStorage.getItem("jwtKey") != null){
    
    
       $(location).attr('href', host );
 
    }
    $('.message a').click(function(){
        if(!$('.register-form').is(":hidden")){
            $('.login-title').text("login")
        }else{
            $('.login-title').text("sign up")
        }
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('.error').hide();
    
      
     });
    
     $('.login-form :button').click(function(){
    
        $('.login-form :button').prop("disabled",false);
        var isFormFilled = false
       
        $('.login-form :input').each(function (index){
          if(index < 2){
           if($(this).val() == ""){
            $('.error').text("Error: one or more forms are empty");
            $('.error').show();
            isFormFilled = false;
              return false;
           }else{
            $('.error').hide();
            isFormFilled = true;
           }
          }
        })
        if(isFormFilled == true){
           
                $('.register-form :button').prop("disabled",true);
                $('.register-form :button').text("Loging In...");
                var json = {
                    Email : $('.login-form :input:eq(0)').val(),
                    Password :  $('.login-form :input:eq(1)').val(),
                }
    
                $.ajax({
                    url:"http://76.186.152.164:80/Account/SignIn",
                    type:"POST",
                    data:JSON.stringify(json),
                    contentType:"application/json; charset=utf-8",
                    dataType:"json",
                    success: function(data){
                        console.log("hello!!")
                        switch(data.statusCode){
                            case 401: 
                            $('.error').text(data.value);
                            $('.error').show();
                            $('.login-form :button').prop("disabled",false);
                            $('.login-form :button').text("Login");
                            break
    
                            case 200:
                        
                            localStorage.setItem("jwtKey",data.value)
                            $(location).attr('href', host);
                            break;
                        }
                       
                    }
                  })
                //Everything seems fine here send to DB
            
        }
      
    });
    
    
    $('.register-form :button').click(function(){
        var pass = $('.register-form :input:eq(3)')
        var passConf = $('.register-form :input:eq(4)')
        
        var isFormFilled = false;
    
        $('.register-form :input').each(function (index){
            if(index <= 4){
             if($(this).val() == ""){
            $('.error').text("Error: one or more forms are empty");
              $('.error').show();
              isFormFilled = false;
              return false;
             }else{
                $('.error').hide();
                isFormFilled = true;
             }
            }
        })
        if(isFormFilled == true){
            if(pass.val().length < 5 ) {
                $('.error').text("Password must be at least 5 characters long");
                $('.error').show();
            }else if(pass.val() != passConf.val()){
                $('.error').text("Passwords do not match");
                $('.error').show();
            }else{
                $('.register-form :button').prop("disabled",true);
                $('.register-form :button').text("Creating...");
                var json = {
                    Email : $('.register-form :input:eq(0)').val(),
                    FirstName :  $('.register-form :input:eq(1)').val(),
                    LastName :  $('.register-form :input:eq(2)').val(),
                    Password :  $('.register-form :input:eq(3)').val(),
                }
    
                $.ajax({
                    url:"http://76.186.152.164:80/Account/Create",
                    type:"POST",
                    data:JSON.stringify(json),
                    contentType:"application/json; charset=utf-8",
                    dataType:"json",

                    success: function(data){
                        switch(data.statusCode){
                            case 401: 
                            $('.error').text(data.value);
                            $('.error').show();
                            $('.register-form :button').prop("disabled",false);
                            $('.register-form :button').text("Create");
                            break
    
                            case 200:
                                localStorage.setItem("jwtKey",data.value)
                              
                                $(location).attr('href', host);
                            break;
                        }
                       
                    }
                  })
                //Everything seems fine here send to DB
            }
        }
    
    });
    
    
     

       
});

