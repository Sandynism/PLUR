async function restaurants(address) {
  let zipcode = address.match(/\b\d{5}\b/g)
  if (!zipcode) return
  zipcode = zipcode[zipcode.length - 1]
  let queryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=' + zipcode
  const API_KEY = 'hiW4XNb5cHEefcQY0jBx9ryKezdFrJDbjEa_QlkjotoTdY_Vdwjm5EHLk14U6WLItQfNHBifAcGCEqwImzw7Wl0SBIaL-d5JfBI-2Dl_4IyCNkTBn40fKxjgTiZZW3Yx'

  await $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    },
    success: function (data) {
      $('.lightbox-yelp').empty()
      let url = data.businesses.slice(0, 3)
      // console.log(data.businesses)
      for (let i = 0; i < 3; i++) {
        let yelpLink = (`<div><a href=` + url[i].url + ` target='_blank' +><i class="fab fa-yelp"></i> ${i + 1}. ${url[i].name}</a></div>`)
        $('.lightbox-yelp').append(yelpLink)
      }

    },
    error: function (data) {
      console.log('Error')
    }

  })
}

