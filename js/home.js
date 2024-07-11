var jsonFiles = ['https://lindsaykb.github.io/sports-data-analysis.github.io/nfl-2543477.json','https://lindsaykb.github.io/sports-data-analysis.github.ionfl-2543499.json','https://lindsaykb.github.io/sports-data-analysis.github.io/nfl-2560800.json'];
for (var i = 0; i < jsonFiles.length; i++)
{
  var fileName = jsonFiles[i];
  $.getJSON(fileName, function(data) { 
    scene = data;
    rowsValues = scene.rows;
    headerValues = scene.header;
    console.log(rowsValues);
    console.log(headerValues);
    var output = "<div class='col-md-4'>";
    output += "<img src='" + rowsValues[0][2] + "'><br>";
    output += "<h2><a href='player.html?playerid=nfl-" + rowsValues[0][0] + "'>" + rowsValues[0][1] + "</a></h2>";
    output += "</div>";
    $("#all-players").append(output);
    console.log("Current output: " + output);
  });
}