$(document).ready(function () { 

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBaQcT1xxN2rvNs56VpHGQ3rYU9MJQh5ag",
    authDomain: "plur-9d2d6.firebaseapp.com",
    databaseURL: "https://plur-9d2d6.firebaseio.com",
    projectId: "plur-9d2d6",
    storageBucket: "plur-9d2d6.appspot.com",
    messagingSenderId: "236610079904"
};
firebase.initializeApp(config);



var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            return true;
        },
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID],
    privacyPolicyUrl: 'privacy.html'
};

    ui.start('#firebaseui-auth-container', uiConfig);


$('.login').on('click', function () {
    console.log('clicked logged in')
    $('.logout').removeClass('hide')
})

$('.logout').on('click', function (event) {
    event.preventDefault()
    console.log('clicked logged out')
    firebase.auth().signOut().then(function () {
        console.log('logged out')
        // Sign-out successful.
        $('.login').removeClass('hide')
        $('.logout').addClass('hide')
    }).catch(function (error) {
        console.log(error)
        // An error happened.
    });

})

//firebase authentication logout
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.displayName)
        $('.login').addClass('hide')
        $('.logout').removeClass('hide')
        let dropdown = $('.fa-user-circle')
        let initials = user.displayName.split(' ')[0][0] +  user.displayName.split(' ')[1][0]
        dropdown.text(initials)

    } else {
        console.log('not logged in')
    }
});


window.fbAsyncInit = function () {
    FB.init({
        appId: '{646616099046762}',
        cookie: true,
        xfbml: true,
        version: '{v3.1}'
    });

    FB.AppEvents.logPageView();

};

FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
});



(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}



})
