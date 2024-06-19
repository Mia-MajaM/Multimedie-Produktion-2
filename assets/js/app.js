const baseUrl = "https://wp1.natma.dk/wp-json";
const tokenEndpoint = "/jwt-auth/v1/token";
const loginDetails = {
    username: "Natasha Madsen",
    password: "N$wvMsbKWziw",
};

const escapeGamesId = 21; // id'erne som man henter kategorierne (escape games) fra 
const escapeRoomsId = 20; // id'erne som man henter kategorierne (escape rooms) fra 
const allPrivatePosts = 18; // dette id henter alle posts

const escapeRoomOneId = 26;
const escapeRoomTwoId = 27;
const escapeRoomThreeId = 25;

const escapeGamesOneId = 23;
const escapeGamesTwoId = 22;
const escapeGamesThreeId = 24;
 

function getToken (){
  return fetch(baseUrl + tokenEndpoint, { // Vi beder om et respons fra API'et // return returnerer asynkront
        method: "POST", // Vi vil sende og se dataen 
        headers: { // Hvilken type data vi modtager 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails) // Dataen vi sender ud 
    })
    .then((res) => res.json()) // Vi omskriver responsen til JSON
    .then((adminData) => { // Her gør vi brug af dataen og navngiver det
        const token = adminData.data.token; // Laver en ny variabel som indeholder token dataene 
            sessionStorage.setItem("adminToken", token) // Gemmer variablen vi har hentet i sessionStorage
    })
    .catch((err) => console.log(err)); // Man får besked i consolen, hvis der er en error
}
getToken() // Vi kalder funktionen
.then(() => getPrivatePosts()) // Kalder først funktionen getPrivatePosts efter funktionen getToken er kørt


// Denne funktion henter alle vores posts
function getPrivatePosts(categoryId = 18){
   return fetch(baseUrl + `/wp/v2/posts?status=private&categories=${categoryId}`, { // Vi beder om et respons fra API'et og sætter vores query parameter for kategori
        headers: { // Hvilken type data vi modtager 
            Authorization: "Bearer" + sessionStorage.getItem("adminToken"), // Vi sender vores token af sted for at få adgang til vores private posts
        },
})
.then((res) => res.json()) // Vi omskriver responsen til JSON
.then((postData) => postData) // her gør vi brug af post dataen
.catch((err) => console.log("Dette er en fejl i at hente posts", err));
}

function renderPosts(posts, targetEl = ".escapeGames-Mindfall"){ // Vi laver en funktion til at printe vores data og definerer hvor det skal sidde
    const targetElement = document.querySelector(targetEl); // vi laver en ny variabel på det fangne element

    if(posts.length == 0){ // Hvis ikke elementerne kan fanges, skal der laves en error og returnere det
        indexEscapeRoomsEl.textContent = "ERROR";
        return;
    }


    posts.forEach((post) => { // denne funktion kører én gang for hvert post

        const escapeImg = document.createElement("img") //skaber et nyt element 
        escapeImg.src = post.acf.images.sizes.medium // giver elementet indhold fra vores api
        targetElement.append(escapeImg) // placere elementet i html 
        escapeImg.setAttribute("class", "escapeRoomsAndGames-Img")

        const escapeArticle = document.createElement("article")
        targetElement.append(escapeArticle)
        escapeArticle.setAttribute("class", "escapeArticle-Js")

        const escapeTitle = document.createElement("h1")
        escapeTitle.textContent = post.acf.title // giver elementet indhold fra vores api med text.content (SOM MAN SKAL)
        escapeArticle.append(escapeTitle)
        escapeTitle.setAttribute("class", "escapeTitle-Js")

        const escapeInfoBox = document.createElement("article")
        escapeArticle.append(escapeInfoBox)
        escapeInfoBox.setAttribute("class", "escapeInfoBox-Grid")

        const escapeDificulty = document.createElement("p")
        escapeDificulty.textContent = "Sværhedsgrad: " + post.acf.svaerhedsgrad + "/6"
        escapeInfoBox.append(escapeDificulty)
        escapeDificulty.setAttribute("class", "escapeDificulty-Js")

        const escapePeople = document.createElement("p")
        escapePeople.innerHTML = `<i class="fa-solid fa-person"></i> ` + post.acf.antal_personer + ` personer` // giver elementet indhold fra vores api med inner.html ,da vi ville tilføje et ikon
        escapeInfoBox.append(escapePeople)
        escapePeople.setAttribute("class", "escapePeople-Js")

        const escapeTime = document.createElement("p")
        escapeTime.innerHTML = `<i class="fa-regular fa-clock"></i>` + ` ` + post.acf.tid + " Min"
        escapeInfoBox.append(escapeTime)
        escapeTime.setAttribute("class", "escapeTime-Js")

        const escapeExplanation = document.createElement("p")
        escapeExplanation.textContent = post.acf.beskrivelse
        escapeArticle.append(escapeExplanation)    
    })
}

const mobileNavToggle = document.querySelector(".mobileNavToggle") //vi laver en ny variabel på det fangne element
const mobileNavMenuOptions = document.querySelector(".mobileNavMenuOptions") // vi laver en ny variabel på det fangne element

mobileNavToggle.addEventListener("click", function (){ // Vi tilføjer et click event til variablen, så når den clicks på køre function 
    mobileNavMenuOptions.classList.toggle("mobileHidden") // function toggler imellem om den valgt class er aktiv, hver gang den køre
})



