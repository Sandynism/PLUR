var events = {}

var eventParameters = {
    client: "d5cf6acf-f0c3-408b-9a6c-31d016f980aa",
    locationIds: "38",
    startDate: "",
    endDate: ""      
}

function getEvents() {
    events = {}
    var query = $.param(eventParameters);
    console.log(query)
    $.ajax({
        url: "https://edmtrain.com/api/events?" + query,
        method: "GET",
    }).done(function (response) {
        var dataList = response.data
        for (var i in dataList) {
            events[dataList[i].id] = dataList[i]
        }
        console.log(events)
        $("tbody").empty()
        for (var i in events){
            createCard(events[i])
            // lightbox(events[i])
        }
    }).fail(function () {
        var response = eventsData
        var dataList = response.data
        for (var i in dataList) {
            events[dataList[i].id] = dataList[i]
        }
    });
}

var locationParameters = {
    client: "d5cf6acf-f0c3-408b-9a6c-31d016f980aa",
    state: "New York"
}

function getStateId() {
    var query = $.param(locationParameters)
    $.ajax({
        url: "https://edmtrain.com/api/locations?" + query,
        method: "GET"
    }).done(function (response) {
        var locations = ""
        for (var i in response.data){
            var location = response.data[i]
            locations+=location.id+","
        }
        console.log(locations)
        eventParameters.locationIds = locations
        getEvents()
    }).fail(function () {
        alert("Bad Location")
    })
}

function createRow(event){
    var row = $("<tr href = '"+event.link+"'>")
    var eventName = event.name
    if (eventName == null){
        eventName = "Artists: "
        for (var i in event.artistList){
            if (i==0){
                eventName += event.artistList[i].name
                continue
            }
            eventName += ", "+event.artistList[i].name
        }
    }
    var name = $("<td>").text(eventName)
    row.append(name)
    var date = $("<td>").text(event.date)
    row.append(date)
    var address = $("<td>").text(event.venue.address)
    row.append(address)
    // var yelpLink = getYelpLink(address)
    $("tbody").append(row)
}

$(function(){
    $(":submit").click(function(){
        event.preventDefault()
        $('.carouselHeader').addClass('hide')
        $('.festivalCard').addClass('hide')
        $('.mapEvents').removeClass('hide')

        var state = $("input[type = search]").val()
        locationParameters.state = state
   
        var startD = (moment(moment($(".start-date").val(), "MM-DD-YYYY")).format("YYYY-MM-DD"))
        if (startD == 'Invalid date'){
            startD =""
        }
        
        var endD = (moment(moment($(".end-date").val(), "MM-DD-YYYY")).format("YYYY-MM-DD"))
        if (endD == 'Invalid date'){
            endD =""
        }
        eventParameters.startDate = startD
        eventParameters.endDate = endD
        getStateId()
    })
})

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
    nameElem.text(eventName)
    nameCol.append(nameElem)
    topRow.append(nameCol)
  
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
    let ticketURL = ("<a href="+event.ticketLink+" target='_blank' +>Ticket Purchase</a>")
    $(".lightbox-ticketURL").html(ticketURL)
    let ticketInfo = ("<a href="+event.link+" target='_blank' +>Event Information</a>")
    $(".lightbox-infoURL").text(ticketInfo)
  }
  
  $(function () {
    console.log('running')
    $(".cardDisplay").on("click", ".eventCard", function () {
      var event = JSON.parse($(this).attr('data'))
      lightbox(event)
    })
  })