async function getWeather(address){
	let zipcode = address.match(/\b\d{5}\b/g)
  if (!zipcode) return
  zipcode = zipcode[zipcode.length - 1]
  console.log(zipcode) 
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if (this.status==200 && this.readyState==4) {
			var formattedData=formatWeather(JSON.parse(xhr.responseText));
			document.getElementById("weather-data").innerHTML=formattedData;
		}
	};
	xhr.open("GET","http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=dd3814244eb85cf1819f30b318aa5fe2");
	xhr.send();
  }


function formatWeather(data){
	return  data.weather[0].main+ 
			"<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'/>"  + 
			"<p>Temperature: " + data.main.temp + "&deg;C"+"</P>";
}

$('.cardDisplay').click(function() {
  formatWeather();
  $('result_lb').fadeIn(1000);

});










