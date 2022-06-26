var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2MmI3YmRhYjRjMWRhN2RkYzE4NjY4MTEiLCJVc2VyUGFzcyI6IjkxZTkyNDBmNDE1MjIzOTgyZWRjMzQ1NTMyNjMwNzEwZTk0YTdmNTJjZDVmNDhmNWVlMWFmYzU1NTA3OGYwYWIiLCJGaXJzdE5hbWUiOiJoZWxsbyIsIkxhc3ROYW1lIjoiaGVsbG8iLCJuYmYiOjE2NTYyMDg4MTEsImV4cCI6MTY1NjI0NDgxMSwiaWF0IjoxNjU2MjA4ODExLCJpc3MiOiJ0ZXN0In0.n5ykdjspaRtKBn78zfTj5vPHFOfnWCeLs8clPXi0LmI"
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
console.log(jwt)
      
    function getInfo(_callback){

        $.ajax({
            url:"http://localhost:7235/Account/Info",
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





