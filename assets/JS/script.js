document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {
    format: 'yyyy-mm-dd'
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('datePicker').value = today;

  // Function to fetch NASA's APOD for a specific date
  function fetchAPOD(date) {
    const apiKey = 'gL5Az0Z7i2Yvl2kLUQ9azhjjV2iGWkX5TOr7Zjp6';
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Check if the media type is an image
        if (data.media_type === 'image') {
          const cardContainer = document.querySelector('.cardContainer');
          const card = createCard(data);
          cardContainer.innerHTML = '';
          cardContainer.appendChild(card);

          // Add event listener to "Add to Favorites" button
          const addToFavoritesButton = document.getElementById('addToFavoritesButton');
          addToFavoritesButton.addEventListener('click', function () {
            // Store image data in local storage
            const favoriteAPOD = JSON.parse(localStorage.getItem('favoriteAPOD')) || [];
            // Check if the image is already in favorites
            const isDuplicate = favoriteAPOD.some(apod => apod.title === data.title);
            if (!isDuplicate) {
              favoriteAPOD.push({
                title: data.title,
                url: data.url,
                explanation: data.explanation
              });
              localStorage.setItem('favoriteAPOD', JSON.stringify(favoriteAPOD));
              console.log('Added to favorites:', data.title);
            } else {
              console.log('APOD is already in favorites.');
            }
          });
        } else {
          console.error('Media type is not an image.');
        }
      })
      .catch(error => {
        console.error('Error fetching APOD:', error);
      });
  }

  // Create card container
  const cardContainer = document.querySelector('.cardContainer');

  // Function to create a card element
  function createCard(data) {
    // Create card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Create image element
    const image = document.createElement('img');
    image.src = data.url;
    image.alt = data.title;
    image.classList.add('card-image');

    // Create button element
    const button = document.createElement('a');
    button.classList.add('btn-floating', 'halfway-fab', 'waves-effect', 'waves-light', 'red', 'addToFavoritesButton');
    button.innerHTML = '<i class="material-icons">+</i>';

    // Append image and button to card
    card.appendChild(image);
    card.appendChild(button);

    // Create content element
    const content = document.createElement('div');
    content.classList.add('card-content');

    // Create title element
    const titleElement = document.createElement('h2');
    titleElement.textContent = data.title;

    // Create explanation element
    const explanationElement = document.createElement('p');
    explanationElement.textContent = data.explanation;

    // Append title and explanation to content
    content.appendChild(titleElement);
    content.appendChild(explanationElement);

    // Append content to card
    card.appendChild(content);

    // Append card to card container
    cardContainer.appendChild(card);
  }

  // Function to fetch NASA's APOD for a specific date
  function fetchAPOD(date) {
    const apiKey = 'gL5Az0Z7i2Yvl2kLUQ9azhjjV2iGWkX5TOr7Zjp6';
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        createCard(data);
      })
      .catch(error => {
        console.error('Error fetching APOD:', error);
      });
  }

  // Call the fetchAPOD function when the DOM content is loaded
  fetchAPOD(today);

  // Listen for change on datepicker input
  document.getElementById('datePicker').addEventListener('change', function (event) {
    const selectedDate = event.target.value;
    // Call the fetchAPOD function to fetch APOD for the selected date
    fetchAPOD(selectedDate);
  });
});
