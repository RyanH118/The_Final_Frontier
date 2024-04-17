// Have picture of the day on the main page.
// make calendar widget where each click of the previous day shows that days image with the api.
// make an error show up when they click a future date saying "This picture hasn't been posted yet." maybe a 404 picture.
// When a new picture is added the desc is changed reflecting the image that is being shown.

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
          const contentBox = document.querySelector('.content');

          // Clear previous content
          contentBox.innerHTML = '';

          // Create image element
          const imageElement = document.createElement('img');
          imageElement.src = data.url;
          imageElement.alt = data.title;

          // Create title element
          const titleElement = document.createElement('h2');
          titleElement.textContent = data.title;

          // Create explanation element
          const explanationElement = document.createElement('p');
          explanationElement.textContent = data.explanation;

          // Append elements to content box
          contentBox.appendChild(imageElement);
          contentBox.appendChild(titleElement);
          contentBox.appendChild(explanationElement);

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

  // Call the fetchAPOD function when the DOM content is loaded
  fetchAPOD(today);

  // Listen for change on datepicker input
  document.getElementById('datePicker').addEventListener('change', function (event) {
    const selectedDate = event.target.value;
    fetchAPOD(selectedDate);
  });
});
