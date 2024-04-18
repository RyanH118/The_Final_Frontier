const cardContainer = $('.cardContainer');

const roverAPI = function () {
    const apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=gRg84HZYCwV9IlNQ3K81q8e8Ctu2Cym974PwErqa';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    //generate random number
                    let numElements = 6;
                    for (let i = 0; i < numElements; i++) {
                        let randomNum = Math.floor(Math.random() * data.latest_photos.length);
                        console.log(randomNum);
                        // create cards and append to page
                        roverImg = `${data.latest_photos[randomNum].img_src}`;
                        pictureDate = `${data.latest_photos[randomNum].earth_date}`;
                        camera = `${data.latest_photos[randomNum].camera.full_name}`;

                        const roverCard = $(`
                             <div class='col card s12 l5 medium' id='roverCard'>
                                 <div class= card-image>
                                     <img src='${roverImg}'>
                                 </div>  
                                 <div class= card-content>
                                     <p>Date Image was taken: ${pictureDate}<br />Camera used to capture image: ${camera}</p>
                                 </div> 
                                 <div class= card-action>
                                 <a class="btn-floating halfway-fab waves-effect waves-light red addToFavoritesButton"><i class="material-icons">+</i></a>
                                 </div>
                             </div>
                         </div>`);

                        cardContainer.append(roverCard);

                        // Add event listener to "Add to Favorites" button
                        const addToFavoritesButton = roverCard.find('.addToFavoritesButton');
                        addToFavoritesButton.on('click', function () {
                            // Store image data in local storage
                            const favoriteRover = JSON.parse(localStorage.getItem('favoriteRover')) || [];
                            // Check if the image is already in favorites
                            const isDuplicate = favoriteRover.some(img => img.url === roverImg && img.title === pictureDate);
                            if (!isDuplicate) {
                                favoriteRover.push({
                                    title: pictureDate,
                                    url: roverImg,
                                    explanation: camera
                                });
                                localStorage.setItem('favoriteRover', JSON.stringify(favoriteRover));
                                console.log('Added to favorites:', pictureDate);
                            } else {
                                console.log('Rover photo is already in favorites.');
                            }
                        });
                    }
                });
            }
        })
        .catch(error => console.error(error));
};

const newImage = function () {
    cardContainer.html('');
    roverAPI();
};

$('#refreshButton').click(newImage);
roverAPI();
