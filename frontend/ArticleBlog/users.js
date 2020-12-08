async function SendRequest(url){
    const request = await fetch(url);
    const response = await request.json();
    if(request.ok){
        document.querySelector(".animation").style.display = "none";
        CreateUserContent(response);
    }
}
SendRequest(sessionStorage.getItem("users")).catch(error => console.log("Something went wrong"));

function CreateUserContent(response){
    console.log(response);
    response.forEach(element => {
        let users = document.querySelector(".user_list");
        let userContent = document.createElement("div");
        userContent.classList.add("usercontent");
        let header = document.createElement("h1");
        header.innerText = "Имя: "+element.name;
        userContent.appendChild(header);
        let nameOfCompany = document.createElement("div");
        header = document.createElement("h2");
        header.innerText = "Компания: "+element.company;
        nameOfCompany.appendChild(header);
        userContent.appendChild(nameOfCompany);
        let position = document.createElement("div");
        header = document.createElement("h2");
        header.innerText = "Должность: "+element.position;
        position.appendChild(header);
        userContent.appendChild(position);
        let hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.value = element.id;
        let btn = document.createElement("button");
        btn.innerText = "Статьи Автора";
        btn.classList.add("btn_article");
        btn.addEventListener("click",function() {
         
           sessionStorage.setItem("userId",hidden.value);
           document.location.href = "userarticle.html";
        });
        userContent.appendChild(btn);
        users.appendChild(userContent); 
        
    });
 
}