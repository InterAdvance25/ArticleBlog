
async function SendRequest(url,body){
    const data = JSON.stringify(body);
    const token = sessionStorage.getItem("token");
    const request = await fetch(url,{method:"POST",body:data,headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + token
    }});
    if(request.ok){
        document.location.href = "myprofile.html";
    }
    else {
        document.querySelector(".mark").style.display = "block";
        window.scrollTo(top);
    }
}



document.querySelector(".btn").addEventListener("click",function() {
    document.querySelector(".btn").disabled = true
    let result = {
        header:document.querySelector(".hd").value,
        thematic:document.querySelector(".thematic").value,
        description:document.querySelector(".desc").value
    }
    SendRequest("https://localhost:5001/api/article",result);
})