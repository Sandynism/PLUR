Holder.addTheme('thumb', {
  bg: '#55595c',
  fg: '#eceeef',
  text: 'Thumbnail'
});

function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(51.5, -0.2), zoom: 10
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
}

$("#favoritesButton").click(function () {
  event.preventDefault()
  $(".favoriteModal").modal('toggle')
});
$(".displayGif").on("click", ".card-img-top", function () {
  var id = $(this).parent().attr('id')
  console.log(id)
  if ($(this).attr('src') == gifList[id].static) {
    $(this).attr('src', gifList[id].url)
  } else {
    $(this).attr('src', gifList[id].static)
  }
});

function heartButtonClick(that) {
  var id = $(that).parent().parent().attr('id')
  console.log(gifList[id].liked)
  console.log
  if (gifList[id].liked != true) {
    console.log('liking')
    gifList[id].liked = true
    $(".faves").empty()
    likedGifs[id] = gifList[id]
    for (var i in likedGifs) {
      console.log("dumping")
      dumpGif(likedGifs[i], $(".faves"))
    }
    changeLikedButton('full', id)
  } else {
    console.log('disliking')
    gifList[id].liked = false
    delete likedGifs[id]
    console.log('test')
    $(".faves").empty()
    for (var i in likedGifs) {
      console.log("dumping")
      dumpGif(likedGifs[i], $(".faves"))
    }
    changeLikedButton('empty', id)
  }
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
  var card = $("<div>").addClass("card eventCard bg-light p-3 w-75 my-3 shadow-sm")
  card.attr('data', JSON.stringify(event))

  var topRow = $("<div>").addClass("row")

  var nameCol = $("<div>").addClass("col-8")
  var nameElem = $("<h5>").addClass("card-title")
  var eventName = createEventName(event)
  nameElem.text(eventName)
  nameCol.append(nameElem)
  topRow.append(nameCol)

  var dateCol = $("<div>").addClass("col-4 text-right")
  dateCol.text(event.date)
  topRow.append(dateCol)
  card.append(topRow)

  var bottomRow = $("<div>").addClass('row')
  var locationCol = $("<div>").addClass("col")
  locationCol.text(event.venue.address)
  bottomRow.append(locationCol)

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
  $(".cardDisplay").on("click", "eventCard", function () {
    var event = JSON.stringify($(this).attr('data'))
    lightbox(event)
  })
})