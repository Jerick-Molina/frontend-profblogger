var jwt = localStorage.getItem("jwtKey")
var jwtUser;
var profile = $('.profile')
//Use web api to check if its valid
if(jwt == null){
    var host = location.origin
    profile.hide();
    $(location).attr('href', host + '/login.html');
}else{
    var logOut = $('.logout')
    logOut.text("log out")
    logOut.click(function(){
        localStorage.removeItem("jwtKey")
       })
    
       $.ajax({
        url:"https://localhost:7235/Account/Info",
        type:"GET",
        headers: {"Authorization":'Bearer ' + jwt ,
        userId : "empty"},
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
          
         
            jwtUser = data;
            $('#intro').children("header").children("h5").html(`${jwtUser.firstName} ${jwtUser.lastName}`)
        }
      }) 

      
       // if user tries to create post without being signed in
      
}

