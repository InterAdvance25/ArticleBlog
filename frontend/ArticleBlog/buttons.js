document.querySelector(".author").addEventListener("click",function() {
   
    sessionStorage.setItem("users","https://localhost:5001/api/users");
    document.location.href = "Users.html"; 
 });
 document.querySelector(".blog").addEventListener("click",function() {
    document.location.href = "webapi.html";
 });


 document.querySelector(".add_article").addEventListener("click",function() {
    document.location.href = "article.html";
 });




 document.querySelector(".my_profile").addEventListener("click",function() {
    document.location.href = "myprofile.html";
 });

 document.querySelector(".authorization").addEventListener("click",function() {
   document.location.href = "authorization.html";
});
 document.querySelector(".registration").addEventListener("click",function() {
   document.location.href = "form.html";
});

document.querySelector(".exit").style.display = "none";
const token = sessionStorage.getItem("token");
if(token != null){
   document.querySelector(".exit").style.display = "block";
   document.querySelector(".exit").addEventListener("click",function() { sessionStorage.clear(); document.location.href = "webapi.html"});
   document.querySelector(".authorization").style.display = "none";
   document.querySelector(".registration").style.display = "none";
}

