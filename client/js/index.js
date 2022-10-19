const submitForm = document.getElementById('submitForm')

submitForm.addEventListener('submit', async (e) => {
    try{
        e.preventDefault()
        console.log(e.target.title.value)
        const submitObject = { 
            title: e.target.title.value,
            name: e.target.name.value,
            story: e.target.story.value}
            console.log(submitObject)
            
        await fetch('https://localhost:3000/api/post', {
            method: "POST",

            body: JSON.stringify(submitObject),

            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(r => r.json())
    } catch (err) {
        console.log(err)
    }
})
