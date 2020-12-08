async function SendRequest(url,data = null){
    
    if(String(url).indexOf("null") != -1){
        document.querySelector(".animation").style.display = "none";
        CreateProfileContent(null);
    }
    else if(String(url).indexOf("deletecurrentuser") != -1){
        const token =  sessionStorage.getItem("token");
        const request = await fetch(url,{method:"POST",body:JSON.stringify(data),headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        }});
        if(request.ok){
           document.location.href = "webapi.html";
           sessionStorage.clear();
        }
    }
    else if(String(url).indexOf("deletearticle") != -1){
       console.log(url);
        const token =  sessionStorage.getItem("token");
        const request = await fetch(url,{method:"POST",body:JSON.stringify(data),headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        }});
        if(request.ok){
           document.location.href = "myprofile.html";
        }
    }
    else {
        const token =  sessionStorage.getItem("token");
        const request = await fetch(url,{method:"GET",headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        }});
        const response = await request.json();
        if(request.ok){
           document.querySelector(".animation").style.display = "none";
           CreateProfileContent(response);
        }
    }
}
SendRequest(`https://localhost:5001/api/users/${sessionStorage.getItem("id") != null ? sessionStorage.getItem("id") : null }`)
.catch(error => console.log("Something went wrong"));

function CreateProfileContent(response){
    let base = document.querySelector(".profile_Content");
    if(response == null){
        let header = document.createElement("h2");
        header.classList.add("unauthorized");
        header.innerText = "Вы не авторизованы".toLocaleUpperCase();
        base.appendChild(header);
    }
    else {
        let headerContent = document.createElement("div");
        let header = document.createElement("h1");
        header.innerText = "Имя: " + response.name;
        headerContent.appendChild(header);

        let companyContent = document.createElement("div");
        let companyName = document.createElement("h2");
        companyName.innerText = "Компания: " + response.company;
        companyContent.appendChild(companyName);

        let positionContent = document.createElement("div");
        let position = document.createElement("h2");
        position.innerText = "Должность: " + response.position
        positionContent.appendChild(position);

        base.appendChild(headerContent);
        base.appendChild(companyContent);
        base.appendChild(positionContent);

        let btnDelete = document.createElement("button");
        btnDelete.innerText = "Удалить Профиль";
        btnDelete.classList.add("btn_delete");
        btnDelete.addEventListener("click",function(){
            SendRequest(`https://localhost:5001/api/users/deletecurrentuser/${response.id}`,response);
        });
        base.append(btnDelete);

        console.log(response.articles);
        CreateArticleElement(response.articles);
    }
}
function CreateArticleElement(response){
    let documentelement = document.querySelector(".blogs");
    response.forEach(element => {
        let baseelement = document.createElement("div");
        baseelement.classList.add("article_container");
        let header = document.createElement("h1");
        let text = document.createElement("h4");
        let desc = document.createElement("p");
        let details = document.createElement("a");
        details.addEventListener("click",function() {
            document.location.href = "blogdetail.html";
            sessionStorage.setItem("connectionstring",`https://localhost:5001/api/article/${element.id}`,response);
        });
        details.innerText = "Подробнее";
        details.classList.add("detail");
        details.setAttribute("href","#");
        let theme = document.createElement("h3");
        header.innerText = element.header;
        desc.innerHTML =  element.description.substr(0,90)+"..." ;
        theme.innerText = element.theme;  
        text.innerText = "Описание:";
        baseelement.appendChild(header);
        baseelement.appendChild(theme)
        baseelement.appendChild(text);
        baseelement.appendChild(desc);
      //  baseelement.appendChild(details);
        let buttons = document.createElement("div");
        buttons.classList.add("btns");
        let btnDeleteArticle = document.createElement("button");
        btnDeleteArticle.innerText = "Удалить Cтатью";
        btnDeleteArticle.classList.add("btn_delete");
        btnDeleteArticle.addEventListener("click",function(){
            SendRequest(`https://localhost:5001/api/article/deletearticle/${element.id}`);
        });
        buttons.appendChild(details);
        buttons.appendChild(btnDeleteArticle);
        baseelement.appendChild(buttons);
        documentelement.appendChild(baseelement);
    });
}

