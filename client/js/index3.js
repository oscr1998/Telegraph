const form = document.getElementById('submitForm')
const allPosts = document.getElementById('all-post');

submitForm.addEventListener('submit', submitPost)

async function submitPost(e){
    e.preventDefault();

    const postData = { 
            title: e.target.title.value,
            name: e.target.name.value,
            story: e.target.story.value
        }
        console.log("postData:", postData)
        const newPost = await sendToServer(postData);
        console.log("newpost", newPost)
        hideForm()
        console.log(newPost._id)
        window.location.hash = `${newPost._id}`
        console.log("hash", window.location.hash)
}

async function sendToServer(postData) {
    try {
        const newPostData = await fetch("http://localhost:3000/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        newPost = await newPostData.json()
        console.log("fetch result", newPost);
        return newPost
    } catch (error) {
        console.log(error);
    }
};

async function fetchAll() {
    try {
        const data = await fetch("http://localhost:3000/api/posts");
        const res = await data.json();
        res.forEach((data) => appendOne(data))
    } catch (error) {
        console.log(error)
    }
};

async function fetchOne(id) {
    try {
        const data = await fetch(`http://localhost:3000/api/posts/${id}`);
        const res = await data.json();
        console.log("res", res)
        console.log("error", res.err)
        if(res.err == "Post not found") {
            const postToRemove = document.querySelector(".post");
            postToRemove.style.display = "none";
            revealForm()
            console.log("reveal")
        }
        appendOne(res)
    } catch (error) {
        console.log(error)
    }
};

async function appendOne(post) {
    //create h1 tag for title
    console.log(post)
    const div = document.createElement('div');
    div.setAttribute('id', post.id);
    div.setAttribute('class', "post")
    allPosts.insertBefore(div,allPosts.children[0])
    const title = document.createElement('h1');
    title.textContent = post.title;
    div.appendChild(title);
    const story = document.createElement('h3');
    story.textContent = post.story;
    div.appendChild(story);
    const name = document.createElement('p');
    name.textContent = post.name;
    div.appendChild(name);
}
async function hideForm() {
    const container = document.getElementById("container");
    container.style.display = "none";
}
async function redirect(id) {
    window.location.href = `http://127.0.0.1:5500/client/index.html/${id}`;
}
async function revealForm() {
    const container = document.getElementById("container");
    container.style.display = "block";
}
// ***************
window.addEventListener('hashchange', updateContent);
function updateContent(){
    let hash = window.location.hash.substring(1);
    console.log("hash2", hash)
    // updateNav(hash);
    updateMain(hash);
}

function updateMain(hash) {
    if (hash) {
        let id = hash;
        const container = document.getElementById("container");
        container.style.display = "none"
        fetchOne(id);

    } else {
        const container = document.getElementById("container");
        container.style.display = "block"
        console.log("didn't work");
        const posts = document.querySelector(".post")
        posts.style.display = "none"
    }
}

