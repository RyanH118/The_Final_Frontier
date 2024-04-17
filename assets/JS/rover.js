const testBody = $('body')
//fetch rover api
const roverAPI = function () {
    const apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=DEMO_KEY'

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    
                    for (let i = 0; i < data.latest_photos.length; i++) {
                        const roverImg = testBody.append(`<img src= ${data.latest_photos[i].img_src}></img>`)
                        $(roverImg).attr(`src','${data.latest_photos[i].img_src}`)
                        $(testBody).append(roverImg)
                    }
                })
            }
        })
}
roverAPI()
// Shuffle array
const shuffled = array.sort(() => 0.5 - Math.random());

// Get sub-array of first n elements after shuffled
let selected = shuffled.slice(0, n);