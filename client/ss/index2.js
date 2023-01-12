const form = document.getElementById("submitForm");
const allPosts = document.getElementById('all-post');
// fetchAll()
updateContent()
form.addEventListener('submit',submitPost)
async function submitPost(e) {
    // Prevent Refresh
    e.preventDefault();
    // Store input in variable
    const postData = { 
            title: e.target.title.value,
            name: e.target.name.value,
            story: e.target.story.value
        }
    const newPost = await sendToServer(postData);
    console.log(newPost);
    hideForm()

    window.location.hash = `${newPost.id}`

};
async function sendToServer(postData) {
    try {
        const newPostData = await fetch("http://localhost:3000/api/posts/", {
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
    const pseudonym = document.createElement('h3');
    story.textContent = post.story;
    div.appendChild(pseudonym);
    const body = document.createElement('p');
    name.textContent = post.name;
    div.appendChild(body);
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
    // updateNav(hash);
    updateMain(hash);
}
// function updateNav(hash) {
//     const updateLink = link => {
//         link.classList = (link.textContent == '+' && hash.includes('new') || hash.includes(link.textContent)) ? ['navlink', 'current'] : ['navlink']
//     };
//     navLinks.forEach(updateLink)
// }
function updateMain(hash) {
    // main.innerHTML = '';
    if (hash) {
        let id = hash;
        const container = document.getElementById("container");
        container.style.display = "none"
        fetchOne(id);
        // id ? loadModalFor(category, id) : loadIndexFor(category)
    } else {
        const container = document.getElementById("container");
        container.style.display = "block"
        // const header = document.createElement('h1');
        // header.className = 'title';
        // header.textContent = "Welcome to the Reading Room";
        // main.appendChild(header);
        console.log("didn't work");
    }
}
