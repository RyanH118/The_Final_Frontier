const cardContainer = $('.cardContainer')
//fetch rover api
const roverAPI = function () {
    const apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=DEMO_KEY'

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    
                    //generate random number
                    let numElements = 6
                    for (let i = 0; i < numElements; i++) {
                        let randomNum = Math.floor(Math.random() * data.latest_photos.length)
                        
                         // create cards and append to page
                        roverImg = `${data.latest_photos[randomNum].img_src}`
                        pictureDate = `${data.latest_photos[randomNum].earth_date}`
                        camera = `${data.latest_photos[randomNum].camera.full_name}`
                        
                         const roverCard = cardContainer.append(`
                         
                             <div class=' col card s1 m4 medium'>
                                 <div class= card-image>
                                     <img src='${roverImg}'>
                                 </div>  
                                 <div class= card-content>
                                     <p>Date Image was taken: ${pictureDate}<br />Camera used to capture image: ${camera}</p>
                                 </div> 
                                 <div class= card-action>
                                     <a href= #>placeholder</a>
                                 </div>
                             </div>
                         </div>`)
                       
                        
                    }
                })
            }
        })
}
roverAPI()
//<div class= 'col s2 m7'>