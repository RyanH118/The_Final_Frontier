document.addEventListener("DOMContentLoaded", function () {
    // Initialize Materialize components
    M.AutoInit();

    // Function to create a card element
    function createCard(title, url, explanation) {
        // Create card element
        const card = document.createElement('div');
        card.classList.add('card');

        // Create image element
        const image = document.createElement('img');
        image.src = url;
        image.alt = title;
        image.classList.add('card-image');

        // Create content element
        const content = document.createElement('div');
        content.classList.add('card-content');

        // Create title element
        const titleElement = document.createElement('span');
        titleElement.classList.add('card-title');
        titleElement.textContent = title;


        // Append elements to card
        content.appendChild(titleElement);
        card.appendChild(image);
        card.appendChild(content);

        return card;
    }

    // Function to render cards from local storage data
    function renderCards() {
        const apodData = JSON.parse(localStorage.getItem('favoriteAPOD')) || [];
        const roverData = JSON.parse(localStorage.getItem('favoriteRover')) || [];
        const imageData = JSON.parse(localStorage.getItem('favoriteImages')) || [];
        const content = document.querySelector('.content');
        console.log(apodData);
        console.log(imageData);
        console.log(roverData);

        // Clear existing content
        content.innerHTML = '';

        // Render cards for APOD data if not empty
        if (apodData.length > 0) {
            apodData.forEach(data => {
                const card = createCard(data.title, data.url, data.explanation);
                content.appendChild(card);
            });
        } else {
            content.innerHTML += "<p>No APOD data available.</p>";
        }

        // Render cards for Rover data if not empty
        if (roverData.length > 0) {
            roverData.forEach(data => {
                const card = createCard(data.title, data.url, data.explanation);
                content.appendChild(card);
            });
        } else {
            content.innerHTML += "<p>No Rover data available.</p>";
        }

        // Render cards for Image data if not empty
        if (imageData.length > 0) {
            imageData.forEach(data => {
                const card = createCard(data.title, data.url, data.explanation);
                content.appendChild(card);
            });
        } else {
            content.innerHTML += "<p>No Image data available.</p>";
        }
    }
    
    // Call renderCards function to render cards on page load
    renderCards();
});
