var jwt = localStorage.getItem("jwtKey")
var jwtUser;

    //Use web api to check if its valid
if(jwt == null){
    var profile = $('.profile')
    profile.hide();
    $(location).attr('href','/login.html');
}else{
    var logOut = $('.logout')

    logOut.text("log out")
    logOut.click(function(){
        localStorage.removeItem("jwtKey")
       })

      
    function getInfo(_callback){

        $.ajax({
            url:"http://76.186.152.164:8080/Account/Info",
            type:"GET",
            headers: {"Authorization":'Bearer ' + jwt ,
            userId : "empty"},
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data){
                  
                jwtUser = data;
                $('#intro').children("header").children("h5").html(`${jwtUser.firstName} ${jwtUser.lastName}`)
                _callback()
            }
          }) 
    }
       // if user tries to create post without being signed in
      
}





