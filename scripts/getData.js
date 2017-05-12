var getLocation = function(){
    return new Promise(function(resolve,reject){

        var findLocation = function(position){
            var lat = position.coords.latitude.toFixed(2);
            var lon = position.coords.longitude.toFixed(2);
            var location = {lat:lat,lon:lon};
            resolve(location);
        };
        navigator.geolocation.getCurrentPosition(findLocation);
    });
};


var reqData = function(location){
    return new Promise(function(resolve,reject){
        //var lat = location.lat;
        //var lon = location.lon;

        var lat = 35;
        var lon = 137;

        var httpRequest = new XMLHttpRequest();

        var method = "GET";
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=2048abd4ff09cb4eaa1f62dc9a077ba6";


        httpRequest.open(method, url, true);
        httpRequest.send();
        httpRequest.onreadystatechange = function ()
        {
            if(httpRequest.readyState === 4 && httpRequest.status === 200)
            {
                var jsonRes = JSON.parse(httpRequest.responseText);
                resolve(jsonRes);
            }
        };//end of callback function
    });
};


var drawData = function(data){
  return new Promise(function(resolve,reject){

      var name = document.createTextNode(data.name+",");
      document.getElementById('heading').appendChild(name);

      var country = document.createTextNode(data.sys.country);
      document.getElementById('heading').appendChild(country);

      var temp = data.main.temp;
      var temperature = document.createTextNode(temp+" ℃");
      document.getElementById('temp').appendChild(temperature);


      var description;

      if(data.weather[1])
      {
          description = data.weather[0].description+" and "+data.weather[1].description;
      }

      else
      {
           description = data.weather[0].description;
      }

      var des = document.createTextNode(description);
      document.getElementById('description').appendChild(des);

      //resolve(data);

      var w_img = data.weather[0].main;
      console.log(w_img);



  });
};

var showMore_visibility = function(){
  document.getElementById("showMore").style.visibility = "visible" ;
};

var setBackground = function(){

};



/*XMLHttpRequest states
* 1:open()
* 2:header received
* 3:Loading,send has been called
* 4:Done
*
* */

//weather underground api key : 24ed7cb8f10bb712