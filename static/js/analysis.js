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
//check user input and process, generate result in tables
$('.run-analysis').click(function() {
  var Portfolio = $('.enter-portfolio select').find(":selected").text();
  var Portfolio = JSON.stringify(Portfolio);


  //input_parameters = {};
  //input_parameters["portfolio"] = Portfolio.replace(/"/g, "");
  //input_parameters["aggregations"] = ["geography", "Asset Class", "sector", "has_Tobacco", "has_Alcohol", "has_Gambling", "has_Military", "has_Fossil Fuels", "esg_Controversy", "esg_Environmental", "esg_Governance", "esg_Social", "esg_Sustainability"];
  //input_parameters = JSON.stringify(input_parameters);
  //console.log(Portfolio)
  //verify input otherwise display an informative message

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

        assetAllocationChart(data.composition["Asset Class"]);
        industryChart(data.composition.sector);
        geographyChart(data.composition.geography);
    }
  });
});
