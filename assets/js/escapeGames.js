getToken() // vi kalder funktionen for at få token 
.then(() => getPrivatePosts(escapeGamesOneId)) // vi fortæller hvilke posts vi ønsker ud fra deres id
.then(posts => renderPosts(posts, ".escapeGames-One")) // der fortælles hvordan og hvor vi vil have dem renderet henne

getToken() // vi kalder funktionen for at få token 
.then(() => getPrivatePosts(escapeGamesTwoId)) // vi fortæller hvilke posts vi ønsker ud fra deres id
.then(posts => renderPosts(posts, ".escapeGames-Two")) // der fortælles hvordan og hvor vi vil have dem renderet henne

getToken() // vi kalder funktionen for at få token 
.then(() => getPrivatePosts(escapeGamesThreeId)) // vi fortæller hvilke posts vi ønsker ud fra deres id
.then(posts => renderPosts(posts, ".escapeGames-Three")) // der fortælles hvordan og hvor vi vil have dem renderet henne