let url


  function restaurants(address) {
    //grab zipcode from event.venue.address
    // let event = document.querySelector(`${'event.venue.address'}`);
    // console.log(event)
    let zipcode = address.match(/\b\d{5}\b/g)
    if (!zipcode) return
    zipcode = zipcode[zipcode.length-1]
    let queryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=' + zipcode
    const API_KEY = 'hiW4XNb5cHEefcQY0jBx9ryKezdFrJDbjEa_QlkjotoTdY_Vdwjm5EHLk14U6WLItQfNHBifAcGCEqwImzw7Wl0SBIaL-d5JfBI-2Dl_4IyCNkTBn40fKxjgTiZZW3Yx'    

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        },
        success: function(data) {
            url = data.businesses[0].url
            return url
        },
        error: function(data) {
            console.log('Error')
        }

      })
      
    } 

  

// var events = {}

// var eventParameters = {
//     client: "d5cf6acf-f0c3-408b-9a6c-31d016f980aa",
//     locationIds: "38"
// }

// function getEvents() {
//     events = {}
//     var query = $.param(eventParameters);
//     console.log(query)
//     $.ajax({
//         url: "https://edmtrain.com/api/events?" + query,
//         method: "GET",
//     }).done(function (response) {
//         var dataList = response.data
//         for (var i in dataList) {
//             events[dataList[i].id] = dataList[i]
//         }
//         console.log(events)
//         $("tbody").empty()
//         for (var i in events){
//             createRow(events[i])
//         }
//     }).fail(function () {
//         var response = eventsData
//         var dataList = response.data
//         for (var i in dataList) {
//             events[dataList[i].id] = dataList[i]
//         }
//     });
// }

// var locationParameters = {
//     client: "d5cf6acf-f0c3-408b-9a6c-31d016f980aa",
//     state: "New York"
// }

// function getStateId() {
//     var query = $.param(locationParameters)
//     $.ajax({
//         url: "https://edmtrain.com/api/locations?" + query,
//         method: "GET"
//     }).done(function (response) {
//         var locations = ""
//         for (var i in response.data){
//             var location = response.data[i]
//             locations+=location.id+","
//         }
//         console.log(locations)
//         eventParameters.locationIds = locations
//         getEvents()
//     }).fail(function () {
//         alert("Bad Location")
//     })
// }

// let url

//   function getRestaurants() {
//     var zipcode = $("input[type = search]").val()
//     //grab user input
   
//     // let queryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=' + zipcode
//     const API_KEY = 'hiW4XNb5cHEefcQY0jBx9ryKezdFrJDbjEa_QlkjotoTdY_Vdwjm5EHLk14U6WLItQfNHBifAcGCEqwImzw7Wl0SBIaL-d5JfBI-2Dl_4IyCNkTBn40fKxjgTiZZW3Yx'    

//     $.ajax({
//         url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=' + zipcode,
//         method: "GET",
//         headers: {
//           'Authorization': `Bearer ${API_KEY}`
//         },
//         success: function(data) {
//             console.log(data)
//             // console.log(data.businesses[0].url)
//             let url = data.businesses[0].url
//             console.log(url)
//         },
//         error: function(data) {
//             console.log('Error')
//         }

//       })
      
//     } 

  

// function createRow(event){
//     var row = $("<tr href = '"+event.link+"'>")
//     var eventName = event.name
//     if (eventName == null){
//         eventName = "Artists: "
//         for (var i in event.artistList){
//             if (i==0){
//                 eventName += event.artistList[i].name
//                 continue
//             }
//             eventName += ", "+event.artistList[i].name
//         }
//     }
//     var name = $("<td>").text(eventName)
//     row.append(name)
//     var date = $("<td>").text(event.date)
//     row.append(date)
//     var address = $("<td>").text(event.venue.address)
//     row.append(address)
//     var restaurant = $("<td>").html(url)
//     row.append(restaurant)
//     $("tbody").append(row)
// }

// $(function(){
//     $(":submit").click(function(){
//         event.preventDefault()
//         var state = $("input[type = search]").val()
//         locationParameters.state = state
//         getStateId()
//         getRestaurants()
//     })
// })