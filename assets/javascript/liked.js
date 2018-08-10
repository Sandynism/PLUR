
$(function () {
    $('.closeLiked').on('click', function () {
        closeLightbox($(".likedLightbox"))
        makeSearch() // --> this makes sure that if an event is unliked the page will display the heart as full...
    })

    $(".myFaves").click(function () {
        openLightbox($(".likedLightbox"))
        refreshLikedLightbox()
    })
})


function refreshLikedLightbox() {
    $(".likedDump").empty()
    for (var i in liked) {
        createCard(liked[i], $(".likedDump"))
    }
}