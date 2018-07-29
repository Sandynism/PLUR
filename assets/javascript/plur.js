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

