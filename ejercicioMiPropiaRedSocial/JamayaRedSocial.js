class Users {
    async buscarUsuarios() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        console.log(users);
        let copyOfUsers = [...users];
        return copyOfUsers;
    }
}

class Posts {
    constructor() {
    }

    async postsByUserId(id) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        const posts = await response.json();
        const postss = [];
        for (const post of posts) {
            postss.push({title: post.title, body: post.body});
        }
        return postss;
    }

    async photosById(id) {
        try {
            const imagen = `https://picsum.photos/600/300?random=${id}`;
            return imagen
        } catch (error) {
            console.error('Something went wrong fetching photos:', error);
        }
    }
}

export {Users, Posts};

