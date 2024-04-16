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

  // Have picture of the day on the main page.
  // make calendar widget where each click of the previous day shows that days image with the api.
  // make an error show up when they click a future date saying "This picture hasn't been posted yet." maybe a 404 picture.
  // When a new picture is added the desc is changed reflecting the image that is being shown.