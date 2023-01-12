
async function loadData(e){
    try{ 
        // e.preventDefault()
        const data = await fetch('http://localhost:3000/api/posts/');
        const postData = await data.json();

        console.log(postData);
        console.log("###########################",postData[postData.length-1]._id);
        const id = postData[postData.length-1]._id;
        const dataFromID = await fetch(`http://localhost:3000/api/posts/${id}`)
        const dataFromIDJsonified = await dataFromID.json();
        console.log(dataFromIDJsonified);

        let title = document.getElementById('titlePost')
        title.textContent = `${dataFromIDJsonified.title}`

        let name = document.getElementById('namePost')
        name.textContent = `${dataFromIDJsonified.name}`

        let story = document.getElementById('storyPost')
        story.textContent = `${dataFromIDJsonified.story}`

    } catch (err) {
        console.log(err)
    }
}


