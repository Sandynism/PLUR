// Weather API1  

async function getWeather(address){
	let zipcode = address.match(/\b\d{5}\b/g)
  if (!zipcode) return
  zipcode = zipcode[zipcode.length - 1]
  // console.log(zipcode) 
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if (this.status==200 && this.readyState==4) {
			var formattedData=formatWeather(JSON.parse(xhr.responseText));
			document.getElementById("weather-data").innerHTML=formattedData;
		}
	};
	xhr.open("GET","https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&&units=Imperial&appid=dd3814244eb85cf1819f30b318aa5fe2");
	xhr.send();
  }


function formatWeather(data){
  return  "<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'/>" + "<p>" + data.weather[0].main + "</p>" + "<p>Temperature: " + data.main.temp + "&deg;F"+"</P>";
}

$('.cardDisplay').click(function() {
  formatWeather();
  $('result_lb').fadeIn(1000);

});




/*   Weather API2 (in case Weather API1 stops working) DO NOT REMOVE !!!

  // lightbox weather
  
  async function getWeather(address){
    let zipcode = address.match(/\b\d{5}\b/g)
    if (!zipcode) return
    zipcode = zipcode[zipcode.length - 1]
    console.log(zipcode) 
      $.ajax('http://api.wunderground.com/api/c6dc8e785d943109/conditions/q/' + zipcode + '.json', {
        dataType: 'jsonp',
        success: function(json) {
          $('div#city strong').text(json.current_observation.display_location.full)
          $('div#icon').html('<img src=' + json.current_observation.icon_url + '>')
          $('div#weather').text(json.current_observation.temperature_string + " " + json.current_observation.weather);
          $('div#time').text(json.current_observation.observation_time_rfc822);
        }
      });
    }
    $('.cardDisplay').click(function() {
      getWeather();
      $('#result_lb').fadeIn(1000);
  
    });
  
*/
  
  
  
  
  
  
  
  
  
  
  