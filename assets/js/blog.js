
var author = $('.name')

let date = new Date();
const options = {month: 'long', year: 'numeric', day: 'numeric'}
let value = new Intl.DateTimeFormat('en-Us', options).format(date);

var postButton = $('.buttonPost')


var title = $('.mTitle')
var sTitle = $('.sTitle')
var body = $('.blogBody')

var host = location.origin

$(document).ready(function(){
    $('.published').text(value)
    $.ajax({
        url:"https://localhost:7235/Account/Info",
        type:"GET",
        headers: {"Authorization":'Bearer ' + jwt},
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
         
           if(data != null){
              author.text(data.firstName + " "+ data.lastName)
           }else{
  
           }
          
           
        }
      })
      postButton.click(function(){
        var isNil = false;
        var error = {"border": "solid 2px red"}
            
        if(title.val() == ""){
            title.css(error);
            title.attr("placeholder", "Value is empty");
            isNil = true;
        }else{
            title.css("border", "none");
            title.attr("placeholder", "");
        }
        if(sTitle.val() == ""){
            sTitle.css(error);
            sTitle.attr("placeholder", "Value is empty");
            isNil = true;
            
        }else{
            sTitle.css("border", "none");
            sTitle.attr("placeholder", "");
        }
        if(body.val() == ""){
            body.css(error);
        
            body.attr("placeholder", "Value is empty");
            isNil = true;
            
        }else{
            body.css("border", "none");
            body.attr("placeholder", "");
        }

        if(isNil == false){
            console.log("hello")
            var blog = {
                Title: title.val(),
                Date : date,
                SubTitle: sTitle.val(),
                Body: body.val()
            }

            $.ajax({
                url:"https://localhost:7235/Blog/Add",
                type:"POST",
                headers: {"Authorization":'Bearer ' + jwt},
                data:JSON.stringify(blog),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(data){
                    console.log(data)
                    switch(data.statusCode){
                      
                        case 200:
                        
                        $(location).attr('href', host);
                        break;
                    }
                   
                }
              })
        }
      })


})