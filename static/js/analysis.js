var apiUrl = location.protocol + '//' + location.host + location.pathname + "api/";
var AjaxResponse = {};
$('#show_analytics').click(function() {
  $("#analytics").toggle();
});

//Populate Analytics Selector
$("#analytics").hide();

$("#portfolio_file").change(function(e) {
  // The event listener for the file upload
  var ext = $("input#portfolio_file").val().split(".").pop().toLowerCase();

  document.getElementById('loader').style.display = "flex";
  if ($.inArray(ext, ["csv"]) == -1) {
    alert('Upload CSV');
    return false;
  }
  if (e.target.files != undefined) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var csvval = e.target.result.split("\n");
      var json_file = JSON.stringify(csvval);
      $.ajax({
        type: 'POST',
        url: apiUrl + 'upload',
        data: json_file,
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
          console.log(data);
          alert("Portfolio uploaded successfully.");
          window.location = window.location;
        }
      });
    };
    reader.readAsText(e.target.files.item(0));
  }
  return false;
});


//declare global constants
var esgData = {};
var esgPortfolio = "";

//check user input and process, generate result in tables
$('.run-analysis').click(function() {
  var portfolioSelected = $('.enter-portfolio select').find(":selected").text();
  var Portfolio = JSON.stringify(portfolioSelected);


  if (Portfolio.includes('Loading...')) {
    alert("Load a portfolio first using Investment Portfolio service");
    return;
  } else if (Portfolio.includes('[pick portfolio]')) {
    alert("Select a portfolio");
    return;
  }

  document.getElementById('loader').style.display = "flex";


  $.ajax({
    type: 'GET',
    url: apiUrl + 'portfolio-analyze/' + String(Portfolio.replace(/"/g, "")),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data, input_parameters) {
      console.log(data);

        document.getElementById('analysis-input').style.display = "none";
        document.getElementById('started-button').style.display = "none";
        document.getElementById('loader').style.display = "none";
        document.getElementById('analysis').style.display = "block";

        assetAllocationChart(data.composition["Asset Class"],data.NAV);
        industryChart(data.composition.sector,data.NAV);
        geographyChart(data.composition.geography);

        compositionTable(data.portfolio);

        //capture esg data
        esgData = data.esg;
        esgPortfolio = portfolioSelected;


    }
  });
});



function compositionTable(portfolio) {
    console.log("Table :");
    console.log(portfolio);
    $('#results > tr').remove();
    //$('#results').append('<caption> An optimal portfolio was constructed with a volatility that differs from the benchmark by only '+ formatNumber(results.Metadata.ObjectiveValue,10)+'. The following are the trades required to arrive at this optimized portfolio and the resulting allocation.<caption>');
    if(portfolio.length>0){
      var rowData="<tr>";
      var tableCols=[];
      $.each(portfolio[0], function(key, value) {
            //console.log(key, value);
            if(capitalize(key).trim()!="Asset"){
              rowData+="<td><b>"+capitalize(key)+"</b></td>";
              tableCols.push(key);
            }
      });
      $("#results > thead").append(rowData+"</tr>");
      for (var i = 0; i < portfolio.length; i++) {
        rowData="<tr>";
        for(var j=0;j<tableCols.length;j++){

          var value = portfolio[i][tableCols[j]];
          if(typeof value == 'number'){
          	if (value % 1 != 0) {
              value = value.toFixed(2);
            }
          }
          //value = isNaN(value)?value:formatNumber(value,5);
          rowData+="<td>"+value+"</td>";
        }
        $("#results > tbody").append(rowData+"</tr>");
      }
    }

}

function capitalize(s) {
    return s[0].toUpperCase() + s.substr(1);
}
