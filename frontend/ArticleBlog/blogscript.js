async function SendRequest(method,url){
    const request = await fetch(url);
    const response = await request.json();
    if(request.ok){
        CreateProfileContentElement(response);
        CreateProfileElement(response);    
    }
}
SendRequest("GET",sessionStorage.getItem("connectionstring")).catch(error => console.log("Something went wrong"));


function CreateProfileElement(response){
    let profile = document.querySelector(".profile");
    let NameBlock = document.createElement("div");
    let category = document.createElement("h2");
    category.innerText = response.theme+":";

    let HeaderBlock = document.createElement("div");
    let header = document.createElement("h1");
    header.innerText = response.header;
    

   let description = document.createElement("div");
   let desc = document.createElement("p");
   desc.classList.add("blog");
   desc.innerText = "Статья:"+response.description;
   description.appendChild(desc);

    NameBlock.appendChild(category);
    HeaderBlock.appendChild(header);
    profile.appendChild(HeaderBlock);
    profile.appendChild(NameBlock);
    profile.appendChild(description);
}
function CreateProfileContentElement(response){
    let profileContent = document.querySelector(".ProfileContent");
    let NameBlock = document.createElement("div");
    let userName = document.createElement("h1");
    userName.innerText = "Written By:"+response.user.name;
    NameBlock.appendChild(userName);

    let companyContent = document.createElement("div");
    let companyName = document.createElement("h2");
    companyName.innerText = "Company:"+response.user.company;
    companyContent.appendChild(companyName);

    let positionContent = document.createElement("div");
    let positionName = document.createElement("h2");
    positionName.innerText = "Position:"+ response.user.position;
    positionContent.appendChild(positionName);

    profileContent.appendChild(NameBlock);
    profileContent.appendChild(companyContent);
    profileContent.appendChild(positionContent);
}

