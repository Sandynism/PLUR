var events = []
var pages = []
var activePage = 1

var eventParameters = {
    client: "d5cf6acf-f0c3-408b-9a6c-31d016f980aa",
    locationIds: "38",
    startDate: "",
    endDate: ""
}

function getEvents() {
    pages = []
    events = []
    $(".cardDisplay").empty()
    var query = $.param(eventParameters);
    $.ajax({
        url: "https://edmtrain.com/api/events?" + query,
        method: "GET",
    }).done(function (response) {
        var dataList = response.data
        for (var i in dataList) {
            events[i] = dataList[i]
            if (i % 6 == 0) {
                pages.push(events)
                events = []
            }
        }
        console.log(pages)
        $("tbody").empty()
        displayPage()
        if (pages.length > 10) {
            createPageButtons("<")
        }
        for (var i in pages) {
            createPageButtons(Number(i) + Number(1))
            if (i > 8) {
                createPageButtons(">")
                break
            }
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
        for (var i in response.data) {
            var location = response.data[i]
            locations += location.id + ","
        }
        console.log(locations)
        eventParameters.locationIds = locations
        getEvents()
    }).fail(function () {
        alert("Bad Location")
    })
}

$(function () {
    $(":submit").click(function () {
        event.preventDefault()
        var state = $("input[type = search]").val()
        locationParameters.state = state

        var startD = (moment(moment($(".start-date").val(), "MM-DD-YYYY")).format("YYYY-MM-DD"))
        if (startD == 'Invalid date') {
            startD = ""
        }

        var endD = (moment(moment($(".end-date").val(), "MM-DD-YYYY")).format("YYYY-MM-DD"))
        if (endD == 'Invalid date') {
            endD = ""
        }
        eventParameters.startDate = startD
        eventParameters.endDate = endD
        getStateId()
    })
    $(".buttonBar").on("click", ".pageButton", function () {
        var page = $(this).text()
        if (page != ">" && page != "<") {
            activePage = page
            displayPage()
        } else if (page == ">") {
            for (var i = 0; i < 10; i++) {
                var current = $($(".buttonBar").children()[i + 1]).text()
                var last = $(".buttonBar").children().last().prev().text()
                if (last == pages.length) { return }
                console.log(current)
                if (current == ">" || current == "<") { continue }
                $(".buttonBar").children()[i + 1].firstChild.innerText = Number(1) + Number(current)
            }
        } else if (page == "<") {
            var first = $(".buttonBar").children().first().next().text()
            if (first != "1") {
                for (var i = 0; i < 10; i++) {
                    var current = $($(".buttonBar").children()[i+1]).text()
                    if (current == ">" || current == "<") { continue }
                    $(".buttonBar").children()[i+1].firstChild.innerText = Number(current) - Number(1)
                }
            }
        }
    })
})


function createPageButtons(pageNum) {
    var col = $("<div>").addClass("col mx-0 px-0 ")
    var butt = $("<button>").addClass("d-inline pageButton")
    butt.text(pageNum)
    col.append(butt)
    $(".buttonBar").append(col)
}

function displayPage() {
    $(".cardDisplay").empty()
    for (var i in pages[activePage]) {
        createCard(pages[activePage][i])
    }
}