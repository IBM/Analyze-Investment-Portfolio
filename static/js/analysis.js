var apiUrl = location.protocol + '//' + location.host + location.pathname + "api/";

//declare global variables
var NAV = 0;
var assetData = {};
var sectorData = {};
var geographyData = {};
var compositionTable = {};
var sinData = {};
var searchData = {};
var searchPortfolio = "";

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

        portfolioName = String(Portfolio.replace(/"/g, ""));

        //capture esg data
        NAV = data.NAV;
        assetData = data.composition["Asset Class"];
        sectorData = data.composition.sector;
        geographyData = data.composition.geography;
        compositionData = data.portfolio;
        sinData = data.sin;
        searchData = data.search;
        searchPortfolio = portfolioName;

        esgData = data.esg;
        esgPortfolio = portfolioSelected;

        assetAllocationChart();
        compositionTable();

    }
  });
});


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
