var countries = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'iso3166.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
            console.log(data);
        }
    });

    dictionary = {}
	json.forEach(function(x) {
	    dictionary[x['alpha-2']] = x.name
	})
    return dictionary;
})();

console.log(countries);


 var svgElement = document.getElementById("world");
 var svgDocument;
 var australia;
 var colour = "#00000";


var randomColour = function () {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

var randomKey = function (obj) {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};

var colourCountry = function (code, colour) {
	var country = svgDocument.querySelectorAll('.' + code.toLowerCase());
	for(var i = 0; i < country.length; i++) {
		country[i].style.fill = colour;	
	}
};

var changeColour = function () {
	colourCountry(randomKey(countries), randomColour());
};


svgElement.addEventListener("load", function() {
	svgDocument = svgElement.contentDocument;

	//window.setInterval(changeColour, 1);
	for(var key in countries) {
		console.log('test' + key);
		var code = key.toLowerCase();
		var country = svgDocument.getElementById(code);
		var on = (function(code) { 
			return function() {
				colourCountry(code, 'red');
		};})(code);

		var off = (function(code) { 
			return function() {
				colourCountry(code, 'gray');
		};})(code);
		
		if(!country) {
			console.log('Failed to find element for ' + code);
			continue;
		}

		country.addEventListener('mouseenter', on);
		country.addEventListener('mouseleave', off);

		colourCountry(code, 'gray');
	}

 }, false);


for (var key in countries){
	console.log(key)
}


