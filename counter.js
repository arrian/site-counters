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

function toTitleCase(str)
{
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var colourCountry = function (code, colour) {
	var selection = svgDocument.getElementById(code);
	selection.style.fill = colour;	
	//var country = svgDocument.querySelectorAll('.' + code.toLowerCase());
	//for(var i = 0; i < country.length; i++) {
	//	country[i].style.fill = colour;	
	//}
};

var setCountryLabel = function (code) {
	var label = document.getElementById("country");
	label.innerHTML = toTitleCase(code);
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


	var paths = svgDocument.getElementsByTagName('path');
	console.log(paths);
	for(var i = 0; i < paths.length; i++) {
		var path = paths[i];
		console.log(path.id);
		var id = path.id;
		//var code = key.toLowerCase();
		//var country = svgDocument.getElementById(code);
		

		var on = (function(id) { 
			return function() {
				colourCountry(id, '#99CC99');
				setCountryLabel(id);
				//svgDocument.getElementById(id).transform.baseVal.getItem(0).setScale(2,2);
		};})(id);

		var off = (function(id) { 
			return function() {
				colourCountry(id, 'green');
		};})(id);

		path.addEventListener('mouseenter', on);
		path.addEventListener('mouseleave', off);

		colourCountry(id, 'green');
	}

}, false);


