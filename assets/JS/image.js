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
                                <div class="card small">
                                <a class="btn-floating halfway-fab waves-effect waves-light red addToFavoritesButton front"><i class="material-icons front">+</i></a>
                                    <div class="card-image">
                                        <img src="${image}"></img>
                                        <span class="card-title">${title}</span>
                                        </div>
                                        <div class="card-content">
                                            <a class="modal-trigger" href="#imageModal">View details</a>
                                            <p>${description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                imageContainer.appendChild(imageDiv);

                // Add event listener to the modal trigger
                const modalTrigger = imageDiv.querySelector('.modal-trigger');
                modalTrigger.addEventListener('click', function () {
                    // Get the title, description, and image from the card
                    const title = imageDiv.querySelector('.card-title').textContent;
                    const description = imageDiv.querySelector('.card-content p').textContent;
                    const image = imageDiv.querySelector('img').src;

                    // Update the modal content
                    document.getElementById('modalTitle').textContent = title;
                    document.getElementById('modalDescription').textContent = description;

                    // Create an <img> element and set its source to the image from the card
                    const modalImage = document.createElement('img');
                    modalImage.src = image;

                    // Get the modal content element
                    const modalContent = document.querySelector('#imageModal .modal-content');

                    // Remove any existing images from the modal content
                    modalContent.querySelectorAll('img').forEach(img => img.remove());

                    // Append the new <img> element to the modal content
                    modalContent.appendChild(modalImage);

                    // Initialize the modal
                    const modal = document.getElementById('imageModal');
                    M.Modal.init(modal, {});

                    // Open the modal
                    M.Modal.getInstance(modal).open();
                });

                // Add event listener to "Add to Favorites" button
                const addToFavoritesButton = imageDiv.querySelector('.addToFavoritesButton');
                addToFavoritesButton.addEventListener('click', function () {
                    // Store image data in local storage
                    const favoriteImages = JSON.parse(localStorage.getItem('favoriteImages')) || [];
                    // Check if the image is already in favorites
                    const isDuplicate = favoriteImages.some(img => img.title === title);
                    if (!isDuplicate) {
                        favoriteImages.push({
                            title: title,
                            url: image,
                            explanation: description
                        });
                        console.log(favoriteImages)
                        localStorage.setItem('favoriteImages', JSON.stringify(favoriteImages));
                        console.log('Added to favorites:', title);
                    } else {
                        console.log('Image is already in favorites.');
                    }
                });
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