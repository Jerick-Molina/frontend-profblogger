var jwt = localStorage.getItem("jwtKey")

var author = $('.author')
var profile = $('.profile')
var home = $('#home')
var jwt = localStorage.getItem("jwtKey")
var post = $('.post-list .post')
var copiedPost = post.clone();
post.remove();
var list = $('.post-list')
var subcribed = $('.mini-posts .mini-post')
var copySubcribed = subcribed.clone(true,true);
copySubcribed.addClass(".mini-post")
subcribed.remove()
var userId;
var FirstName;
var LastName;

var host = location.origin
const options = {month: 'long', year: 'numeric', day: 'numeric'}
const params = new URLSearchParams(window.location.search)
const numberOfPostToShow = 3
const clonedPost = []
var currentPage = 1
getInfo(() =>{
  $( document ).ready(function() {


    var createBlog  = $('.blog')
    
		
			 
		

      if(jwt != null){
      
       
       //If jwt exist
    
       //Check if its profile page if so ignore home function
       if(params.has("userId") != false){
       
        getProfile(params.get('userId'))
       }else{
        getHomePage()
       }
       //check if its a blog page if so ignore home function
        //This is home page
        //if user wants to see profile by subcribed
        
    
      //if user wants to see own profile
        $('.profile').click(function(){
          $(location).attr('href',`/profile.html?userId=${jwtUser.userId}`);
        })
    
       //if user wants to see a profile by post
    
       $('.meta .author').click(function(){
    
          var profile = $(this).siblings(".userId").html()
          
          console.log(profile)
        })
        //User wants to create a blog
    
        createBlog.click(function(){
        
       
          $(location).attr('href','/blog.html');
         })
         //User deletes blog
         $(document).on('click', "#delete", function (event) {
          var h = event.currentTarget.parentNode.parentNode.parentNode.firstElementChild
          var blog = h.lastElementChild.lastElementChild
  
          if(confirm("Are you sure you want to delete post?")){

            $.ajax({
              url:"https://profbloggerv1.proudsand-9bc83248.eastus.azurecontainerapps.io/Blog/Delete",
              type:"POST",
              headers: {"Authorization":'Bearer ' + jwt ,
              blogId : blog.innerHTML},
              contentType:"application/json; charset=utf-8",
              dataType:"json",
              success: function(data){
                location.reload();
              }
            }) 
            event.currentTarget.parentNode.parentNode.parentNode.remove()
          }
         
         })
         //User return to home page 
         home.click(function(){
         
          $(location).attr('href', host);
         })
        
         //User liked post
    
         
         $(document).on('click', "#postLikes", function (event) {
          
          var likedTime = setTimeout(likes,3000)
         
          if((event.currentTarget).classList.contains('liked') == true){
            event.currentTarget.innerHTML = parseInt(event.currentTarget.innerHTML) - 1
            $(event.currentTarget).removeClass("liked")
            setTimeout(likedTime)
          }else{
            event.currentTarget.innerHTML = parseInt(event.currentTarget.innerHTML) + 1
            $(event.currentTarget).addClass("liked")
            setTimeout(likedTime)
          }
          
          function likes(){
            if((event.currentTarget).classList.contains('liked') == true){
            
             
            }else{
              
             
            }
          }
          });
        
      }else if(jwt == null){
        //if jwt doesnt exist
    
        
       profile.hide();
    
        // if user tries to create post without being signed in
        createBlog.click(function(){
    
        $(location).attr('href','/login.html');
       })
      }   
    });
    
    function dataPost(){
     
      var pageNumber =  params.get("page") 
      var postNumber
      var pageForward  = $("#page-forward").children("a")
      var pageBackward = $("#page-backward").children("a")
      if(pageNumber > 0){
        currentPage = pageNumber
       postNumber  = pageNumber * numberOfPostToShow
      
      }else{
        postNumber  = currentPage * numberOfPostToShow
      }
      //Check if page number is available
      //Check if page number isnt under one & string
    
      if(currentPage == 1 && numberOfPostToShow < clonedPost.length){
        for(var i = 0; i < numberOfPostToShow; i++){
          clonedPost[i].appendTo('.post-list')
        }
        pageForward.removeClass("disabled")
        pageForward.addClass("enabled")
        pageForward.click(function(){
          currentPage++;
          $(location).attr('href', host + `?page=${currentPage}`);
         })
      }else if(currentPage != 1 && postNumber > clonedPost.length){
        
        for(var i = postNumber-numberOfPostToShow; i < clonedPost.length; i++){
         
          clonedPost[i].appendTo('.post-list')
        }
        pageBackward.removeClass("disabled")
        pageBackward.addClass("enabled")
        pageBackward.click(function(){
          currentPage--;
          $(location).attr('href', host + `?page=${currentPage}`);
        })
      }else if(currentPage != 1 && postNumber < clonedPost.length){
        for(var i = postNumber-numberOfPostToShow; i < postNumber; i++){
          
          clonedPost[i].appendTo('.post-list')
        }
        pageForward.removeClass("disabled")
        pageForward.addClass("enabled")
        pageForward.click(function(){
          currentPage++;
          $(location).attr('href', host + `?page=${currentPage}`);
         })
        pageBackward.removeClass("disabled")
        pageBackward.addClass("enabled")
        pageBackward.click(function(){
          currentPage--;
          $(location).attr('href',`?page=${currentPage}`);
         })
      }else if(currentPage != 1 && postNumber == clonedPost.length){
        
        for(var i = postNumber-numberOfPostToShow; i < postNumber; i++){
          
          clonedPost[i].appendTo('.post-list')
        }
        pageBackward.removeClass("disabled")
        pageBackward.addClass("enabled")
        pageBackward.click(function(){
          currentPage--;
          $(location).attr('href', host + `?page=${currentPage}`);
         })
      }else{
        for(var i =0; i < clonedPost.length;i++){
          clonedPost[i].appendTo('.post-list')
          
        }
      }
    
    
     
    }
    
    function getHomePage(){
      
     
      $.ajax({
        url:"https://profbloggerv1.proudsand-9bc83248.eastus.azurecontainerapps.io/Account/Home",
        type:"GET",
        headers: {"Authorization":'Bearer ' + jwt},
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
           
          //Subcribers
          if(data[0] != null){
            
            for(var i =0 ; i < data[0].length ;i++){
              $('.mini-posts').siblings("p").css("display","none")
            var aLink =  copySubcribed.children("header").children("h3").children("a")
              aLink.html(`${data[0][i].firstName}  ${data[0][i].lastName}`)
              aLink.attr("href",`/profile.html?userId=${data[0][i].userId}`)
              copySubcribed.clone().appendTo('.mini-posts');
              copySubcribed.css('display',"block")
             
            }
    
          }
          
          //Blogs
          if(data[1] != null){
            addPost(data)
          }
    
          dataPost()
        }
      }) 
    
    
      //Get Subcribers
    
    
      //Get Post
    }
    
    function addPost(data){
      
      for(var i =0; i < data[1].length ;i++){
       
        $('.post-list').siblings('p').css("display","none");
        var title = copiedPost.children("header").children(".title")
        var meta = copiedPost.children("header").children(".meta")
        var footer = copiedPost.children("footer")
       
        //Title
        title.children("h2").children("a").html(data[1][i].title)
        title.children("p").html(data[1][i].subTitle)
        
        if(data[2].userId == data[1][i].authorId){
         //Author
          meta.children("a").attr("href",`/profile.html?userId=${data[1][i].authorId}`)
          meta.children("a").children("span").html(`${data[2].firstName} ${data[2].lastName}`)
          meta.children("#meta-blogId").html(data[1][i].blogId)
          meta.children("#meta-authorId").html(data[1][i].authorId)
        }else{
        
          for(var j =0; j<data[0].length; j++){
            if(data[0][j].userId == data[1][i].authorId){
              meta.children("a").attr("href",`/profile.html?userId=${data[0][j].userId}`)
              meta.children("a").children("span").html(`${data[0][j].firstName}  ${data[0][j].lastName}`)
              meta.children("#meta-blogId").html(data[1][i].blogId)
              meta.children("#meta-authorId").html(data[1][i].authorId)
            }
          }
        }
       
        //Date
        const newDate = Date.parse(data[1][i].date)
        var value = new Intl.DateTimeFormat('en-Us', options).format(newDate)
        meta.children("time").html(value)
    
        //Body
        const arr = data[1][i].body.split(' ');
        
        var string = data[1][i].body.slice(0 ,arr.length * 2.5)
        
        
        copiedPost.children("p").html(string+"...");
    
        //Edit | Delete

     
        //Button
    
        footer.children("ul").children("li").children("#readPost").attr("href",`/single.html?blogId=${data[1][i].blogId}`)
    
        //Append
        copiedPost.css('display',"block")
      
       
        var clone = copiedPost.clone()
    
        clonedPost.push(clone)

      
      }
    }
    
    
    function getProfile(_userId){
      
      //Get Name
      $.ajax({
        url:"https://profbloggerv1.proudsand-9bc83248.eastus.azurecontainerapps.io/Account/Profile",
        type:"GET",
        headers: { 'userId': _userId },
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
        
            if(data[2] != null){
             
              $('#intro').children("header").children("h2").html(`${data[2].firstName} ${data[2].lastName}`)
            }
      
            //Blogs
            if(data[1] != null){
              for(var i=0; i < data[1].length; i++){
                if(data[2].userId == data[1][i].authorId){
                  $('.post-list').siblings('p').css("display","none");
                  var title = copiedPost.children("header").children(".title")
                  var meta = copiedPost.children("header").children(".meta")
                  var footer = copiedPost.children("footer")
                 
                  //Title
                  title.children("h2").children("a").html(data[1][i].title)
                  title.children("p").html(data[1][i].subTitle)
                  
                  if(data[2].userId == data[1][i].authorId){
                   //Author
                    meta.children("a").attr("href",`/profile.html?userId=${data[1][i].authorId}`)
                    meta.children("a").children("span").html(`${data[2].firstName} ${data[2].lastName}`)
                    meta.children("#blogId").html(data[1][i].blogId)
                    meta.children("#userId").html(data[1][i].authorId)
                  }else{
                    for(var j =0; j<data[0].length; j++){
                      if(data[0][j].userId == data[1][i].authorId){
                      
                        meta.children("a").attr("href",`/profile.html?userId=${data[0][i].userId}`)
                        meta.children("a").children("span").html(`${data[0][i].firstName} ss ${data[0][i].lastName}`)
                        meta.children("#blogId").html(data[1][i].blogId)
                        meta.children("#userId").html(data[1][i].authorId)
                      }
                    }
                  }
                 
                  //Date
                  const newDate = new Date(data[1][i].date)
               
                  
               
                  var value = new Intl.DateTimeFormat('en-Us', options).format(newDate)
                  
                  meta.children("time").html(value)
                  
                  //Body
                  const arr = data[1][i].body.split(' ');
                  
                  var string = data[1][i].body.slice(0 ,arr.length * 2.5)
                  
                  copiedPost.children("p").html(string+"...");
                  //Edit and Delete 
                  if(jwtUser.userId == data[1][i].authorId){
                    footer.children("div").children("#edit").css("visibility","visible")
                    footer.children("div").children("#edit").attr("href",`blog.html?blogId=${data[1][i].blogId}`)
                    footer.children("div").children("#delete").css("visibility","visible")
                  }
                
                  //Append
                  copiedPost.css('display',"block")
    
                  copiedPost.clone().appendTo('.post-list');
                  
                }
              }
             
            }
             
        }
      }) 
      //Get Subcribers
    
    
      //Get Post
    }
})
