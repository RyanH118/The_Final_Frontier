// Have picture of the day on the main page.
// make calendar widget where each click of the previous day shows that days image with the api.
// make an error show up when they click a future date saying "This picture hasn't been posted yet." maybe a 404 picture.
// When a new picture is added the desc is changed reflecting the image that is being shown.

document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch NASA's APOD
    function fetchAPOD() {
      const apiKey = 'gL5Az0Z7i2Yvl2kLUQ9azhjjV2iGWkX5TOr7Zjp6';
      const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  
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
            const contentBox = document.querySelector('.content')
  
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
          } else {
            console.error('Media type is not an image.');
          }
        })
        .catch(error => {
          console.error('Error fetching APOD:', error);
        });
    }
  
    // Call the fetchAPOD function when the DOM content is loaded
    fetchAPOD();
  });

  