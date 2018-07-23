var apiUrl = location.protocol + '//' + location.host + location.pathname + "api/";

$(document).ready(function() {
  updateText();
});

$('.new-analysis').click(function() {
  location.reload();
});

//update interface with portfolios and risk factors
function updateText() {

    console.log("apiUrl: " + apiUrl)
    //update portfolio lists
    var portfolioLists;
    $.get(apiUrl + 'look_through_portfolios', function(data) {
        console.log(data);
        $('.enter-portfolio select').html(function() {
            if(data == "No portfolios found."){
                return "Please load a portfolio below.";
            }else{
            var str = '<option value="" disabled="" selected="">   Select your portfolio</option>';
            //var parsed = JSON.parse(data)
            /*
            console.log("data in get portfolionames" + data);
            for (var i = 0; i < parsed.length; i++) {
                str = str + '<option>' + parsed[i] + '</option>';
            }
            portfolioLists = parsed;
            */
            for (var i = 0; i < data.length; i++) {
                str = str + '<option>' + data[i] + '</option>';
            }
            console.log("str: " + str)
            return str;
        }
        });
    });
}
