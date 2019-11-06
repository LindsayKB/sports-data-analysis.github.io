var pageUrl = window.location.href;
var scene={};
  var headerValues = {};
  var rowsValues = {};
  var output;
  var playerIdFromUrl = pageUrl.split('playerid=').pop();
  var fileName = playerIdFromUrl + '.json';
  $.getJSON(fileName, function(data) { 
    scene = data;
    rowsValues = scene.rows;
    headerValues = scene.header;
    console.log(rowsValues);
    console.log(headerValues);
    
    $("#playerName").append(rowsValues[0][1]);
    $("#playerId").append(rowsValues[0][0]);
    $("#seasonYear").append(rowsValues[0][3]);
    $("#playerImage").html("<img src='" + rowsValues[0][2] + "'>");

    for (var i = 0; i < rowsValues.length; i++) {
        output += "<tr>";
        //Game Number
        output += "<td>" + rowsValues[i][4] + "</td>";
        //Game Date
             var date = new Date(rowsValues[i][5]);
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  rowsValues[i][5] = month + '/' + day;
        output += "<td>" + rowsValues[i][5] + "</td>";
        //Teams
        output += "<td><div class='row'><div class='col-md-6'><img src='" + rowsValues[i][7] + "'><br><h6>" + rowsValues[i][6] + "</h6></div><div class='col-md-6'><img src='" + rowsValues[i][9] + "'><br><h6>" + rowsValues[i][8] + "</h6></div></td>";
        //All other data
        for (var j = 10; j < rowsValues[i].length; j++) {
          output += "<td>" + rowsValues[i][j] + "</td>";
        }
 

        output += "</tr>";
    }

$("#player-data").append(output);

//Organize table back into JSON data
var table = document.getElementById('player-data');
var json = [];  
var headers =[];

//Create chart for Pass Attempts

function BuildChart(labels, values, chartTitle) {
  var ctx = document.getElementById("passAttempts").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Our labels
      datasets: [{
        label: chartTitle, // Name the series
        data: values, // Our values
        backgroundColor: [ // Specify custom colors
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
           'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [ // Add custom color borders
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
           'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1 // Specify bar border width
      }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
    }
  });
  return myChart;
}
for (var i = 0; i < table.rows[0].cells.length; i++) {
  headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
}
// Go through cells 
for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 1; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }
  json.push(rowData);
}
console.log(json);
//Remove empty first row
json.shift();
var labels = json.map(function (e) {
  return e.gamedate;
});

console.log(labels); 

// Map JSON values back to values array
var values = json.map(function (e) {
  return e.passattempts;
});
console.log(values); 

var chart = BuildChart(labels, values, "Pass Attempts");


//Create chart for Pass Completions
json = [];
function BuildCompletionsChart(labels, values, chartTitle) {
 
  var ctx = document.getElementById("passCompletions").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Our labels
      datasets: [{
        label: chartTitle, // Name the series
        data: values, // Our values
        backgroundColor: [ // Specify custom colors
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
           'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [ // Add custom color borders
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
           'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1 // Specify bar border width
      }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
    }
  });
  return myChart;
}


// Go through cells 
for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 0; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }

  json.push(rowData);
}

console.log(json);
//Remove empty first row
json.shift();
var labels = json.map(function (e) {
  return e.gamedate;
});
console.log(labels); 

// Map JSON values back to values array
var values = json.map(function (e) {
  return e.passcompletions;
});
console.log(values); 

var chart = BuildCompletionsChart(labels, values, "Pass Completions");


//Create chart for QB Sacks
json = [];
function BuildQBSacksChart(labels, values, chartTitle) {
 
  var ctx = document.getElementById("qbSacks").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Our labels
      datasets: [{
        label: chartTitle, // Name the series
        data: values, // Our values
        backgroundColor: [ // Specify custom colors
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
           'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [ // Add custom color borders
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
           'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1 // Specify bar border width
      }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
    }
  });
  return myChart;
}


// Go through cells 
for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 0; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }

  json.push(rowData);
}

console.log(json);
//Remove empty first row
json.shift()
var labels = json.map(function (e) {
  return e.gamedate;
});
console.log(labels); 

// Map JSON values back to values array
var values = json.map(function (e) {
  return e.qbsacks;
});
console.log(values); 

var chart = BuildQBSacksChart(labels, values, "QB Sacks");

//Create chart for Pass Interceptions
json = [];
function BuildPassInterceptionsChart(labels, values, chartTitle) {
 
  var ctx = document.getElementById("passInterceptions").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Our labels
      datasets: [{
        label: chartTitle, // Name the series
        data: values, // Our values
        backgroundColor: [ // Specify custom colors
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
           'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [ // Add custom color borders
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
           'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1 // Specify bar border width
      }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
    }
  });
  return myChart;
}


// Go through cells 
for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 0; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }

  json.push(rowData);
}

console.log(json);
//Remove empty first row
json.shift();
var labels = json.map(function (e) {
  return e.gamedate;
});
console.log(labels); 

// Map JSON values back to values array
var values = json.map(function (e) {
  return e.passinterceptions;
});
console.log(values); 

var chart = BuildPassInterceptionsChart(labels, values, "Pass Interceptions");

//Create chart for Passing Yards
json = [];
function BuildPassingYardsChart(labels, values, chartTitle) {
 
  var ctx = document.getElementById("passingYards").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Our labels
      datasets: [{
        label: chartTitle, // Name the series
        data: values, // Our values
        backgroundColor: [ // Specify custom colors
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
           'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [ // Add custom color borders
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
           'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1 // Specify bar border width
      }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
    }
  });
  return myChart;
}


// Go through cells 
for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 0; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }

  json.push(rowData);
}

console.log(json);
//Remove empty first row
json.shift();
var labels = json.map(function (e) {
  return e.gamedate;
});
console.log(labels); 

// Map JSON values back to values array
var values = json.map(function (e) {
  return e.passingyards;
});
console.log(values); 

var chart = BuildPassingYardsChart(labels, values, "Passing Yards");

//Create chart for Pass Touchdowns
json = [];
function BuildPassTouchdownsChart(labels, values, chartTitle) {
 
  var ctx = document.getElementById("passTouchdowns").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Our labels
      datasets: [{
        label: chartTitle, // Name the series
        data: values, // Our values
        backgroundColor: [ // Specify custom colors
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
           'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [ // Add custom color borders
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
           'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1 // Specify bar border width
      }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
    }
  });
  return myChart;
}


// Go through cells 
for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 0; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }

  json.push(rowData);
}

console.log(json);
//Remove empty first row
json.shift();
var labels = json.map(function (e) {
  return e.gamedate;
});
console.log(labels); 

// Map JSON values back to values array
var values = json.map(function (e) {
  return e.passtouchdowns;
});
console.log(values); 

var chart = BuildPassTouchdownsChart(labels, values, "Pass Touchdowns");

//Create chart for Rushes
json = [];
function BuildRushesChart(labels, values, chartTitle) {
 
  var ctx = document.getElementById("rushes").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Our labels
      datasets: [{
        label: chartTitle, // Name the series
        data: values, // Our values
        backgroundColor: [ // Specify custom colors
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
           'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [ // Add custom color borders
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
           'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1 // Specify bar border width
      }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
    }
  });
  return myChart;
}


// Go through cells 
for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 0; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }

  json.push(rowData);
}

console.log(json);
//Remove empty first row
json.shift();
var labels = json.map(function (e) {
  return e.gamedate;
});
console.log(labels); 

// Map JSON values back to values array
var values = json.map(function (e) {
  return e.rushes;
});
console.log(values); 

var chart = BuildRushesChart(labels, values, "Rushes");

//Create chart for Rushes
json = [];
function BuildRushingYardsChart(labels, values, chartTitle) {
 
  var ctx = document.getElementById("rushingYards").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Our labels
      datasets: [{
        label: chartTitle, // Name the series
        data: values, // Our values
        backgroundColor: [ // Specify custom colors
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
           'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [ // Add custom color borders
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
           'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1 // Specify bar border width
      }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
    }
  });
  return myChart;
}


// Go through cells 
for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 0; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }

  json.push(rowData);
}

console.log(json);
//Remove empty first row
json.shift();
var labels = json.map(function (e) {
  return e.gamedate;
});
console.log(labels); 

// Map JSON values back to values array
var values = json.map(function (e) {
  return e.rushingyards;
});
console.log(values); 

var chart = BuildRushingYardsChart(labels, values, "Rushing Yards");

//Create chart for Rushes
json = [];
function BuildRushingTouchdownsChart(labels, values, chartTitle) {
 
  var ctx = document.getElementById("rushingTouchdowns").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Our labels
      datasets: [{
        label: chartTitle, // Name the series
        data: values, // Our values
        backgroundColor: [ // Specify custom colors
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
           'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [ // Add custom color borders
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
           'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1 // Specify bar border width
      }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
    }
  });
  return myChart;
}


// Go through cells 
for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 0; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }

  json.push(rowData);
}

console.log(json);
//Remove empty first row
json.shift();
var labels = json.map(function (e) {
  return e.gamedate;
});
console.log(labels); 

// Map JSON values back to values array
var values = json.map(function (e) {
  return e.rushingtouchdowns;
});
console.log(values); 

var chart = BuildRushingTouchdownsChart(labels, values, "Rushing Touchdowns");

  });
  
  //Scroll to Top
  
  window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("backToTopBtn").style.display = "block";
  } else {
    document.getElementById("backToTopBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Sort Table On Click
function sortTable(tableClass, n) {
var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

table = document.getElementById(tableClass);
switching = true;
dir = "asc";
while (switching) {
    switching = false;
    rows = table.getElementsByTagName("tr");
    for (i = 2; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
                var cmpX=isNaN(parseInt(x.innerHTML))?x.innerHTML.toLowerCase():parseInt(x.innerHTML);
                var cmpY=isNaN(parseInt(y.innerHTML))?y.innerHTML.toLowerCase():parseInt(y.innerHTML);
cmpX=(cmpX=='-')?0:cmpX;
cmpY=(cmpY=='-')?0:cmpY;
        if (dir == "asc") {
            if (cmpX > cmpY) {
                shouldSwitch= true;
                break;
            }
        } else if (dir == "desc") {
            if (cmpX < cmpY) {
                shouldSwitch= true;
                break;
            }
        }
    }
    if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;      
    } else {
        if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
        }
    }
}
}