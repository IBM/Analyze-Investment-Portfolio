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


//declare global variables
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
