

 var svgElement = document.getElementById("world");
 var svgDocument;
 svgElement.addEventListener("load", function() {
      svgDocument = svgElement.contentDocument;
      console.log(svgDocument.getElementById("au"));
      console.log(svgDocument.getElementById("au").style.fill);
      svgDocument.getElementById("au").style.fill = "red";
 }, false);
