const testBody = $('body')
//fetch rover api
const roverAPI = function () {
    const apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY'

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    for (let i = 0; i < data.photos.length; i++) {
                        const roverImg = testBody.append(`<img src= ${data.photos[i].img_src}></img>`)
                        //$(roverImg).attr(`src','${data.photos[i].img_src}`)
                        //$(testBody).append(roverImg)
                    }
                })
            }
        })
}
roverAPI()