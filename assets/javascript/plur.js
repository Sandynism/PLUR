var access = "&api_key=Bearer%20hiW4XNb5cHEefcQY0jBx9ryKezdFrJDbjEa_QlkjotoTdY_Vdwjm5EHLk14U6WLItQfNHBifAcGCEqwImzw7Wl0SBIaL-d5JfBI-2Dl_4IyCNkTBn40fKxjgTiZZW3Yx/"

var originalURL = "https://api.yelp.com/v3/businesses/search?term=restaurants&location="

var zipcode = "11365" //change to userinput 

let queryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=11365'

let businesses = {}

const API_KEY = 'hiW4XNb5cHEefcQY0jBx9ryKezdFrJDbjEa_QlkjotoTdY_Vdwjm5EHLk14U6WLItQfNHBifAcGCEqwImzw7Wl0SBIaL-d5JfBI-2Dl_4IyCNkTBn40fKxjgTiZZW3Yx'
$.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    },

    success: function(data) {
        console.log(data)
        businesses = data.businesses
    },
    error: function(data) {
        console.log('Error')
    }
    // this headers section is necessary for CORS-anywhere

  })