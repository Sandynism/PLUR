jQuery(function($){
    function getWeather(){
        var zipcode = $("input[type = search-weather]").val()
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
    $('a.get_weather').click(function(e) {
      e.preventDefault();
      getWeather();
      $('#result').fadeIn(1000);
    });
  })