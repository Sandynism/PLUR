//method POST
let tokenAccessURL = "https://accounts.spotify.com/api/token"
let grant_type = "authorization_code"
let client_id = "c9b491e9d7b943dcbc6a3709f7203a8c"
let client_secret = "eff362d2997540559c1f9ff6ee5e6b2a"
let id = "0OdUWJ0sBjDrqHygGUXeCF"
let oauth_token = "BQCKLh8DZbvvoZYoUR3SHJZ-7wMylPAJkLeksVChb2OFo8TPRtGVd92rr1ROV8SQkrTGaDz6YAGmEMISGKEcjerDj_u-0LFCi3gX4pPBWkelIG1NUhgOReeimncSCSHFRQYpbGVYIp4"

//authorization GET
let response_type = "code"
let redirect_uri = "https://sandynism.github.io/PLUR/"

let queryURL = "https://accounts.spotify.com/authorize" + "?client_id=" + client_id 

$.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      'Authorization': `Bearer ${oauth_token}`
    },
    success: function(data) {
        console.log(data)
    },
    error: function(data) {
        console.log('Error')
    }

  })

  function getTrack() {
    var query = $('#artistName').val() //from edm train artist object?
    console.log(query)
    $.ajax({
      url: 'https://api.spotify.com/v1/artists/' + query + '/top-tracks?country=US',
      success: function(response) {
        console.log(response)
      }
    })
  }
  
  getTrack()

// postman version
// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF/top-tracks?=&country=US",
//     "method": "GET",
//     "headers": {
//       "authorization": "Bearer BQCKLh8DZbvvoZYoUR3SHJZ-7wMylPAJkLeksVChb2OFo8TPRtGVd92rr1ROV8SQkrTGaDz6YAGmEMISGKEcjerDj_u-0LFCi3gX4pPBWkelIG1NUhgOReeimncSCSHFRQYpbGVYIp4",
//       "cache-control": "no-cache",
//       "postman-token": "6b726c0d-a404-20b3-35b6-ed60e14da619"
//     }
//   }
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//   });