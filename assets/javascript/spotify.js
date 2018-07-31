let client_id = "c9b491e9d7b943dcbc6a3709f7203a8c"
let client_secret = "eff362d2997540559c1f9ff6ee5e6b2a"

let queryURL = "https://accounts.spotify.com/authorize" + "?client_id=" + client_id 

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