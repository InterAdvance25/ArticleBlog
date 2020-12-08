async function SendRequest(url,data){
    let result = JSON.stringify(data);
    const request = await fetch(url,{method:"POST",body:result,headers:{"Content-Type":"application/json"}});
    const response = await request.json();
    if(request.ok){
        sessionStorage.setItem("id",response.id);
        sessionStorage.setItem("token",response.token.value);
        console.log(sessionStorage.getItem("id"));
        console.log(sessionStorage.getItem("token"));
        
    }
}
function Send(){
    SendRequest("https://localhost:5001/api/account/registration",GetData()).catch(error => console.log("Something went wrong"));
}



function GetData(){
    return {
        email:document.querySelector("#Email").value,
        password:document.querySelector("#Password").value,
        name:document.querySelector("#Name").value,
        position:document.querySelector("#Position").value,
        company:document.querySelector("#Company").value
    }
}
