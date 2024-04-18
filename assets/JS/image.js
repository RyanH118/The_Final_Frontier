var apiKey = 'gL5Az0Z7i2Yvl2kLUQ9azhjjV2iGWkX5TOr7Zjp6';

function searchNasaImages() {
    const keyword = document.getElementById("searchInput").value;
    const url = `https://images-api.nasa.gov/search?q=${keyword}&media_type=image&page=1&page_size=12&`;

    // Make a GET request to the API
    fetch(url)
        // Check if the response is successful
        .then(function (response) {
            return response.json();
            // Parse the JSON response
        })
        .then(function (data) {
            const imageContainer = document.getElementById("imageContainer");
            imageContainer.innerHTML = ""; // clear existing images

            data.collection.items.forEach(item => {
                // Work with the JSON data
                const title = item.data[0].title;
                const image = item.links[0].href;
                const description = item.data[0].description;

                const imageDiv = document.createElement("div");
                imageDiv.classList.add("image-container");
                imageDiv.innerHTML = `
                <div class="row">
                    <div class="col s12 m6" id="imagesCard">
                        <div class="card">
                            <div class="card-image">
                                <img src= "${image}"></img>
                                <span class="card-title">${title}</span>
                                    <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">+</i></a>
                                </div>
                                <div class="card-content">
                                    <p>${description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                                

                imageContainer.appendChild(imageDiv);
            });
        })
        .catch(error => console.error(error));
    // Handle any errors that occurred during the fetch
}
// when we search for an item take the key word and put it into a string.
// fetch image api and put it into query parameters
// append image and desc from api
// add button to favorite that image and save to localStorage.
// be able to search for another image.