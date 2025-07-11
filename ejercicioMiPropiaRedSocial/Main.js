import { Users, Posts } from "./JamayaRedSocial.js";

let users = new Users();
let posts = new Posts();
document.addEventListener("DOMContentLoaded", async () => {
    const aa = document.createElement("h1");
    aa.textContent = "Mi Red Social";
    document.body.appendChild(aa);

    const divUsers = document.createElement("div");
    divUsers.id = "users";
    document.body.appendChild(divUsers);
    const titulo2 = document.createElement("h2");
    titulo2.textContent = "Users";
    divUsers.appendChild(titulo2);

    const userData = await users.buscarUsuarios();

    for(const user of userData) {
        const userCard = document.createElement("div");
        userCard.innerHTML = `
      <strong>${user.name}</strong> (${user.username})<br> ${user.email}<br> ${user.address.city}
    `;
        divUsers.appendChild(userCard);
    }

    const divPost = document.createElement("div");
    divPost.id = "users";
    document.body.appendChild(divPost);
    const titulo3 = document.createElement("h2");
    titulo3.textContent = "Posts by User Id";
    divPost.appendChild(titulo3);
    const postsUser = await posts.postsByUserId(1)
    postsUser.forEach((post) => {
        const ch = document.createElement("div")
        ch.innerHTML = `
      <strong>${post.title}</strong><br>
      <p>${post.body}</p>
    `;
        divPost.appendChild(ch);
    })
    console.log(posts.photosById(1));


    const divPhoto = document.createElement("div");
    divPhoto.id = "photo";
    document.body.appendChild(divPhoto);

    const tituloPhoto = document.createElement("h2");
    tituloPhoto.textContent = "Photo by ID";
    divPhoto.appendChild(tituloPhoto);

    const imageUrl = await posts.photosById(1);
    const img = document.createElement("img");
    img.src = imageUrl;
    divPhoto.appendChild(img);
});
