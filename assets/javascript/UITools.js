// Holder.addTheme('thumb', {
//   bg: '#55595c',
//   fg: '#eceeef',
//   text: 'Thumbnail'
// });
var likedEvents = JSON.parse(localStorage.getItem('likedEvents')) || {}

function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(51.5, -0.2), zoom: 10
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
}


function createEventName(event){
  var eventName = event.name
  if (eventName == null) {
    eventName = "Artists: "
    for (var i in event.artistList) {
      if (i == 0) {
        eventName += event.artistList[i].name
        continue
      }
      eventName += ", " + event.artistList[i].name
    }
  }
  return eventName
}


function createCard(event) {
  var card = $("<div>").addClass("card eventCard bg-light p-3 w-100 my-3 ml-3 shadow-sm")
  card.attr('data', JSON.stringify(event))

  var topRow = $("<div>").addClass("row")

  var nameCol = $("<div>").addClass("col-8")
  var nameElem = $("<h5>").addClass("card-title")
  var eventName = createEventName(event)

  var heartFull = $("<img>").attr('src', 'assets/images/like-full.png')
  var heartEmpty = $("<img>").attr('src', 'assets/images/like-empty.png')



  heartFull.css({
    'width': '20px',
    'height': '20px'
  })

  heartEmpty.css({
    'width': '20px',
    'height': '20px'
  })


  nameElem.text(eventName)
  nameCol.append(nameElem)
  topRow.append(nameCol)
  topRow.append(heartEmpty)

  $(function() {
    heartEmpty.click(function(){
      if (heartEmpty=$("<img>").attr('src', 'assets/images/like-empty.png')){
      heartEmpty.attr('src',"assets/images/like-full.png");
      return false;
    }
    });
  });



  var dateCol = $("<div>").addClass("col-4 text-right")
  var convertedDate = moment(event.date, "YYYY-MM-DD");
  dateCol.text(moment(convertedDate).format("MM/DD/YY"))
  topRow.append(dateCol)
  card.append(topRow)

  var bottomRow = $("<div>").addClass('row')
  var locationCol = $("<div>").addClass("col")
  locationCol.text(event.venue.address)
  bottomRow.append(locationCol)

  // YELP STUFF
  // let yelpRestaurant = $("<div>").addClass("col")
  // restaurants(event.venue.address)

  if (event.festivalInd == true) {
    locationCol.addClass('col-10')
    var badgeCol = $("<div>").addClass('col-2 text-right')
    var badgeText = $("<p>").addClass("badge-warning text-black text-center")
    badgeText.text('Electronic Festival')
    badgeCol.append(badgeText)
    bottomRow.append(badgeCol)
  }

  card.append(bottomRow)
  $(".cardDisplay").append(card)
}

function lightbox(event) {
  $(".lightbox").show()
  var eventName = createEventName(event)
  $(".lightbox-title").text(eventName)
  $(".lightbox-date").text(event.date)
  $(".lightbox-address").text(event.venue.address)
  $(".lightbox-venue").text(event.venue.name)
  $(".lightbox-ticketURL").attr('href',event.ticketLink)
  $(".lightbox-infoURL").attr('href',event.link)
}

$(function () {
  console.log('running')
  $(".cardDisplay").on("click", ".eventCard", function () {
    console.log('clicked')
    var event = JSON.stringify($(this).attr('data'))
    lightbox(event)
  })
})

