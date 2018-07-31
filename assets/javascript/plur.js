var events = {}

var eventParameters = {
    client: "d5cf6acf-f0c3-408b-9a6c-31d016f980aa",
    locationIds: "38"
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
            createRow(events[i])
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
    // var yelpLink = getYelpLink(address)
    $("tbody").append(row)
}

$(function(){
    $(":submit").click(function(){
        event.preventDefault()
        var state = $("input[type = search]").val()
        locationParameters.state = state
        getStateId()
    })
})