var apiKey = 'gL5Az0Z7i2Yvl2kLUQ9azhjjV2iGWkX5TOr7Zjp6';
const keywords = "star"
const apiUrl = `https://images-api.nasa.gov/search?q=${keywords}&media_type=image`;


// Make a GET request to the API
fetch(apiUrl)
  .then(response => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('no worky try again');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(imageInfo => {
    // Work with the JSON data
    console.log(imageInfo);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching data:', error);
  });
  
// when we search for an item take the key word and put it into a string.
// fetch image api and put it into query parameters
// append image and desc from api
// add button to favorite that image and save to localStorage.
// be able to search for another image.