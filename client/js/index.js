const form = document.getElementById('submitForm')

submitForm.addEventListener('submit', async (e) => {
    try{
        e.preventDefault()
        console.log(e.target.title.value)
        const submitObject = { 
            title: e.target.title.value,
            name: e.target.name.value,
            story: e.target.story.value
        }
          //  console.log(submitObject)

            const options = {
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(submitObject),           
            }
            
        await fetch('http://localhost:3000/api/', options )

        const data = await fetch('http://localhost:3000/api/posts/');
        const postData = await data.json();

        console.log(postData);
        console.log("###########################",postData[postData.length-1]._id);
        const id = postData[postData.length-1]._id;
        const dataFromID = await fetch(`http://localhost:3000/api/posts/${id}`)
        const dataFromIDJsonified = await dataFromID.json();
        console.log(dataFromIDJsonified);

        location.href = "post.html";
        // window.location.hash = `${id}`
        // let windowLocation = window.location.href

        // let url = `http://127.0.0.1:5500/client/index.html?#${id}`;

        // console.log("split", window.location.href.split("#")[1])

        //     console.log("id:", id)
        //     console.log(window.location.href)
            // console.log("id from url:", windowID)
            // let title = document.getElementById('titlePost')
            // title.textContent = `${dataFromIDJsonified.title}`

            // let name = document.getElementById('namePost')
            // name.textContent = `${dataFromIDJsonified.name}`

            // let story = document.getElementById('storyPost')
            // story.textContent = `${dataFromIDJsonified.story}`

    } catch (err) {
        console.log(err)
    }
})
