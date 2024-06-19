getToken() // vi kalder funktionen for at få token 
.then(() => getPrivatePosts(escapeRoomOneId)) // vi fortæller hvilke posts vi ønsker ud fra deres id
.then(posts => renderPosts(posts, ".escapeRooms-One")) // der fortælles hvordan og hvor vi vil have dem renderet henne

getToken() // vi kalder funktionen for at få token 
.then(() => getPrivatePosts(escapeRoomTwoId)) // vi fortæller hvilke posts vi ønsker ud fra deres id
.then(posts => renderPosts(posts, ".escapeRooms-Two")) // der fortælles hvordan og hvor vi vil have dem renderet henne

getToken() // vi kalder funktionen for at få token 
.then(() => getPrivatePosts(escapeRoomThreeId)) // vi fortæller hvilke posts vi ønsker ud fra deres id
.then(posts => renderPosts(posts, ".escapeRooms-Three")) // der fortælles hvordan og hvor vi vil have dem renderet henne