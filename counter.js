var countries = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'iso3166.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });

    dictionary = {}
	json.forEach(function(x) {
	    dictionary[x['alpha-2'].toLowerCase()] = x.name
	})
    return dictionary;
})();


var svgElement = document.getElementById("world");
var svgDocument;


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

var setCountryLabel = function (code) {
	var label = document.getElementById("country");
	label.innerHTML = countries[code];
};

var changeColour = function () {
	colourCountry(randomKey(countries), randomColour());
};

var fade = function (code) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}


svgElement.addEventListener("load", function() {
	svgDocument = svgElement.contentDocument;

	//window.setInterval(changeColour, 1);
	for(var key in countries) {
		var code = key.toLowerCase();
		var country = svgDocument.getElementById(code);
		var on = (function(code) { 
			return function() {
				colourCountry(code, 'red');
				setCountryLabel(code);
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


