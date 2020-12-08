async function SendRequest(url){
    const request = await fetch(url);
    const response = await request.json();
    if(request.ok){
        console.log(response);
        document.querySelector(".animation").style.display = "none";
        CreateUserArticleContent(response);
    }
}
SendRequest(`https://localhost:5001/api/users/articles/${sessionStorage.getItem("userId")}`);
function CreateUserArticleContent(response){
    let base = document.querySelector(".user_article_content");
    let header = document.createElement("h1");
    header.innerText = "Имя: "+response.name;
    base.appendChild(header);
    let nameOfCompany = document.createElement("div");
    header = document.createElement("h2");
    header.innerText = "Компания: "+response.company;
    nameOfCompany.appendChild(header);
    base.appendChild(nameOfCompany);

    let position = document.createElement("div");
    header = document.createElement("h2");
    header.innerText = "Должность: "+response.position;
    position.appendChild(header);
    base.appendChild(position);

    response.articles.forEach(element => {
            let articles = document.querySelector(".articles");
            let baseelement = document.createElement("div");
            baseelement.classList.add("article_container");
            let header = document.createElement("h1");
            let text = document.createElement("h4");
            let desc = document.createElement("p");
            let details = document.createElement("a");
            details.addEventListener("click",function() {
                document.location.href = "blogdetail.html";
                sessionStorage.setItem("connectionstring",`https://localhost:5001/api/article/${element.id}`);
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
            baseelement.appendChild(details);
            articles.appendChild(baseelement);
    })


}