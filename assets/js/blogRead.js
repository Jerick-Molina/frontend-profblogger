var jwt = localStorage.getItem("jwtKey")
var jwtUser;
var profile = $('.profile')
 const param = new URLSearchParams(window.location.search)
const option = {month: 'long', year: 'numeric', day: 'numeric'}


var post = $('.post')
var header = post.children("header")
var title = header.children(".title")
var meta = header.children(".meta")
var footer = post.children("footer")
//Use web api to check if its valid
if(jwt == null){
 
    profile.hide();
 
}else{
    var logOut = $('.logout')
    logOut.text("log out")
  var parm = param.get('blogId')
    logOut.click(function(){
        localStorage.removeItem("jwtKey")
       })
       
       $.ajax({
        url:"http://76.186.152.164:8080/Blog/Read",
        type:"GET",
        headers: { 'blogId': parm },
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
            var value = data.value
            
            title.children("h2").children("a").html(value.title)
            title.children("p").html(value.subTitle)
            
            $('.post').children('#body').html(value.body);
            $.ajax({
                url:"https://localhost:7235/Account/Info",
                type:"GET",
                headers: {   "Authorization":'Bearer ' + jwt,
                'userId': value.authorId },
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(data){

                    
                    
                    meta.children("a").attr("href",`/profile.html?userId=${value.authorId}`)
                    meta.children("a").children("span").html(`${data[2].firstName} ${data[2].lastName}`)
                    meta.children("#meta-blogId").html(value.blogId)
                    meta.children("#meta-authorId").html(value.authorId)
                }
                }) 
                const newDate = Date.parse(value.date)
                var valueData = new Intl.DateTimeFormat('en-Us', option).format(newDate)
                meta.children("time").html(valueData)
              
            
        }
      }) 
  
}

