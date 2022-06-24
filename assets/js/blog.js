
var author = $('.name')

let date = new Date();
const options = {month: 'long', year: 'numeric', day: 'numeric'}
let value = new Intl.DateTimeFormat('en-Us', options).format(date);
const para = new URLSearchParams(window.location.search)
var postButton = $('.buttonPost')


var title = $('.mTitle')
var sTitle = $('.sTitle')
var body = $('.blogBody')

var host = location.origin
var parm = para.get('blogId')

$(document).ready(function(){
   
    $('.blog').click(function(){
    
   
        $(location).attr('href','/blog.html');
       })
  
    
        getInfo(() =>editPage() )
     
    
        function editPage(){
            author.text(jwtUser.firstName + " "+ jwtUser.lastName)
            $('.published').text(value)
           
            
            $.ajax({
                url:"https://localhost:7235/Blog/Read",
                type:"GET",
                headers: { 'blogId': parm },
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(data){
                    var value = data.value
                    console.log(data)
                    title.val(value.title)
                    sTitle.val(value.subTitle)
                       
                   body.val(value.body);
                   var newDate = new Date(value.date)
                   let sameVal = new Intl.DateTimeFormat('en-Us', options).format(newDate);
                   $('.published').text(sameVal)
           
                    if(value.authorId != jwtUser.userId){
                        $(location).attr('href',"/");
                    }
                }
              }) 
        }



      if(para.has('blogId')){
        $('.form').children("h2").html("Edit Blog Post")
        $('.buttonPost').text("Edit Post")
      }
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
            

            if(para.has('blogId') ==true){
                var blog = {
                    blogId : para.get('blogId'),
                    authorId : jwtUser.userId,
                    Title: title.val(),
                    Date : date,
                    SubTitle: sTitle.val(),
                    Body: body.val()
                }
                $.ajax({
                    url:"https://localhost:7235/Blog/Edit",
                    type:"POST",
                    headers: {"Authorization":'Bearer ' + jwt},
                    data:JSON.stringify(blog),
                    contentType:"application/json; charset=utf-8",
                    dataType:"json",
                    success: function(data){
                        console.log(data)
                        console.log
                        switch(data.statusCode){
                         
                        }
                       
                    }
                  })
            }else{
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
           
        }
      })


})