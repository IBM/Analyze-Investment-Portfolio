
function clearSearch() {
  document.getElementById('autocomplete').value = '';
  document.getElementById('search-description').style.display = "block";
  document.getElementById('outputbox').style.display = "none";
}


function searchField() {

  var portfolio = searchData;
  var portfolioName = searchPortfolio;
  var data = [];

  for(var i=0; i<portfolio.length; i++) {
      var obj = { value: portfolio[i], data: portfolio[i] };
      data.push(obj);
  }

  console.log('search data');
  console.log(data);

  $("#searchform").submit(function(e) {
      e.preventDefault();
  });


  // setup autocomplete function pulling from portfolio[] array
  $('#autocomplete').autocomplete({

    lookup: data,
    onSelect: function (suggestion) {
      document.getElementById('search-description').style.display = "none";
      document.getElementById('search-loader').style.display = "flex";

      var portfolioNameSplit = suggestion.value.split("(");
      var tickerSplit = portfolioNameSplit[1].split(")");
      var ticker = tickerSplit[0];


      $.ajax({
        type: 'GET',
        url: apiUrl + 'search/' + portfolioName + "/" + ticker,
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
          console.log('searchReturn');
          console.log(data);

          document.getElementById('outputbox').style.display = "flex";
          document.getElementById('search-loader').style.display = "none";

          var portfolioTitle = '<b>' + suggestion.value + ' </b>';
          $('#portfolioName').html(portfolioTitle);

          var portfolioPrice = '<b class="price-color">$' + Number(data.indirect + data.direct).toFixed(2) + '</b>';
          $('#portfolioPrice').html(portfolioPrice);

          total_exposure = Number(((data.direct + data.indirect) / data.NAV) * 100).toFixed(2);

          var portfolioDirect = 'Your portfolio is comprised of <br><div class="text-percent-color"><b>' + total_exposure + '%</b></div> of this instrument';
          $('#portfolioDirect').html(portfolioDirect);

          indirectPart = Number((data.indirect / data.NAV) * 100).toFixed(2);
          var portfolioIndirect = 'Did you know that <div class="text-percent-color"><b>' + indirectPart + '%</b></div> of this<br> coverage is owned in either ETF’s <br>or Mutual Funds in your portfolio?';
          $('#portfolioIndirect').html(portfolioIndirect);

          var portfolioEsgData = [
            {esg:"Sustainability",value:data.esg.esg_Controversy},
            {esg:"Controversy",value:data.esg.esg_Environmental},
            {esg:"Environmental",value:data.esg.esg_Governance},
            {esg:"Social",value:data.esg.esg_Social},
            {esg:"Governance",value:data.esg.esg_Sustainability}
          ]

          portfolioEsgChart(portfolioEsgData);

        }
      });

    }
  });

}

function portfolioEsgChart(portfolioEsgData) {

  var data = portfolioEsgData;

  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 60, left: 85 };
  var width = 300 - (margin.left + margin.right);
  var height = 220 - (margin.top + margin.bottom);


  // set the ranges
  var y = d3.scaleBand()
            .range([height, 0])
            .padding(0.1);

  var x = d3.scaleLinear()
            .range([0, width]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#portfolio-esg-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // format the data
  data.forEach(function(d) {
    d.value = +d.value;
  });

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.value; })])
  y.domain(data.map(function(d) { return d.esg; }));

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { return y(d.esg); })
      .attr("height", y.bandwidth())
      .transition()
      .duration(500)
      .attr("width", function(d) {return x(d.value); } )
      .attr('fill', '#93C4FB')

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(4));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
}
