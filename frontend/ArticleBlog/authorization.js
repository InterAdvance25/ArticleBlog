async function SendRequest(url,data){
    document.querySelector(".btn_authorization").disabled = true;
    let result = JSON.stringify(data);
    const request = await fetch(url,{method:"POST",body:result,headers:{"Content-Type":"application/json"}});
    const response = await request.json();
   if(request.ok){
       sessionStorage.setItem("id",response.id);
       sessionStorage.setItem("token",response.token.value);
       document.location.href = "myprofile.html";
   }  
}
document.querySelector(".btn_authorization").addEventListener("click",function() {
    let result = {
        email:document.querySelector("#Email").value,
        password:document.querySelector("#Password").value
    };
    console.log(result);
    SendRequest("https://localhost:5001/api/account/token",result).catch(error => console.log("something went wrong"));});

document.querySelector(".goToForm").addEventListener("click",function() { document.location.href = "form.html" })
