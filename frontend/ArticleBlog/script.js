async function SendRequest(url,search = null){
    if(search == null){
        let request = await fetch(url);
        let response = await request.json();
        if(request.ok){
        document.querySelector(".animation").style.display = "none";
        CreateArticleElement(response);
      }
    }
    else{
        
        let request = await fetch(url);
        let response = await request.json();
        if(request.ok){
        document.querySelector(".animation").style.display = "none";
        CreateArticleElement(response);
      }
    }
}
SendRequest("https://localhost:5001/api/article/search").catch(error => console.log("Something went wrong"));

function CreateArticleElement(response){
    let documentelement = document.querySelector(".article");
    response.forEach(element => {
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
        documentelement.appendChild(baseelement);
    });
}
document.querySelector(".btn_search").addEventListener("click",function() {
    let value = document.querySelector(".input_search").value;
    let items = document.querySelector(".article").children;
    let iterator = 1;
    while(iterator < items.length){
        document.querySelector(".article").removeChild(items[iterator]);
    }
    SendRequest(`https://localhost:5001/api/article/search/${value}`);
});
document.querySelector(".input_search").addEventListener("keydown",function(event) {
    if(event.key == "Enter"){
        let value = document.querySelector(".input_search").value;
        let items = document.querySelector(".article").children;
        let iterator = 1;
        while(iterator < items.length){
            document.querySelector(".article").removeChild(items[iterator]);
        }
        SendRequest(`https://localhost:5001/api/article/search/${value}`);
    }
});