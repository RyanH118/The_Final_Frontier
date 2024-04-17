const testBody = $('body')
//fetch rover api
const roverAPI = function () {
    const apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=DEMO_KEY'

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    //generate random number
                    let numElements = 5
                    for (let i = 0; i < numElements; i++) {
                        let randomNum = Math.floor(Math.random() * data.latest_photos.length)
                        console.log(randomNum);
                        // append images to page   
                        const roverImg = testBody.append(`<img src= ${data.latest_photos[randomNum].img_src}></img>`)
                        $(roverImg).attr(`src','${data.latest_photos[randomNum].img_src}`)
                        $(testBody).append(roverImg)
                    }
                })
            }
        })
}
roverAPI()
