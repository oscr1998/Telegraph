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
        const newPostData = await fetch("https://colorful-telegraph.onrender.com/api/", {
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
        const data = await fetch("https://colorful-telegraph.onrender.com/api/posts");
        const res = await data.json();
        res.forEach((data) => appendOne(data))
    } catch (error) {
        console.log(error)
    }
};

async function fetchOne(id) {
    try {
        const data = await fetch(`https://colorful-telegraph.onrender.com/api/posts/${id}`);
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
    div.setAttribute('id', "postContent");
    div.setAttribute('class', "post")
    allPosts.insertBefore(div,allPosts.children[0])
    const title = document.createElement('h1');
    title.textContent = `Title: ${post.title}`;
    div.appendChild(title);
    const name = document.createElement('p');
    name.textContent = `Name: ${post.name}`;
    div.appendChild(name);
    const story = document.createElement('h3');
    story.textContent = `Story: ${post.story}`;
    div.appendChild(story);
}
async function hideForm() {
    const container = document.getElementById("container");
    container.style.display = "none";
}
async function redirect(id) {
    window.location.href = `https://colorful-telegraph.onrender.com/client/index.html/${id}`;
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
        const posts = document.querySelector(".post")
        posts.style.display = "block"

    } else {
        const container = document.getElementById("container");
        container.style.display = "block"
        console.log("didn't work");
        const posts = document.querySelector(".post")
        posts.style.display = "none"
    }
}


const wrapper = document.getElementById("tiles");
let columns = 0
    rows= 0

    const colors = [
        "rgb(299, 57, 53)",
        "rgb(253, 216, 53)",
        "rgb(244, 81, 30)",
        "rgb(76, 175, 80)",
        "rgb(33, 150, 243)",
        "rgb(156, 39, 176)"
    ];

    let count = -1;
    
    const handleOnClick = (index) => {
        count = count + 1
        
        anime({
            targets:".tile",
            backgroundColor: colors[count % (colors.length -1)],
            delay: anime.stagger(50, {
                grid: [columns, rows],
                from: index
            })
        })
        
    }

const createTile = index => {
    const tile = document.createElement("div")

    tile.classList.add("tile")
    tile.onclick = e => handleOnClick(index);
    return tile;
}

const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    })
}

const createGrid = () => {
    wrapper.innerHTML = "";

    columns= Math.floor(document.body.clientWidth / 50),
    rows = Math.floor(document.body.clientHeight / 50);
    
    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows)

    createTiles(columns*rows)
}
createGrid()
window.onresize = () => createGrid();

