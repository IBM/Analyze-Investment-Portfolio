
function searchField(portfolio, portfolioName) {

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

      var portfolioNameSplit = suggestion.value.split("(");
      var tickerSplit = portfolioNameSplit[1].split(")");
      var ticker = tickerSplit[0];

      console.log('ticker');
      console.log(ticker);

      $.ajax({
        type: 'GET',
        url: apiUrl + 'search/' + portfolioName + "/" + ticker,
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
          console.log('searchReturn');
          console.log(data);

          document.getElementById('outputbox').style.display = "block";

          var portfolioTitle = '<b>' + suggestion.value + ' </b>';
          $('#portfolioName').html(portfolioTitle);

          var portfolioPrice = '<b class="price-color">$' + data.price + '</b>';
          $('#portfolioPrice').html(portfolioPrice);

          directPart = ((data.direct / data.NAV) * 100).toFixed(2);
          var portfolioDirect = 'Your portfolio is comprised of <div class="text-percent-color"><b>' + directPart + '%</b></div> of this instrument';
          $('#portfolioDirect').html(portfolioDirect);

          indirectPart = ((data.indirect / data.NAV) * 100).toFixed(2);
          var portfolioIndirect = 'Did you know that <div class="text-percent-color"><b>' + indirectPart + '%</b></div> of this coverage is owned in either ETF’s or Mutual Funds in your portfolio?';
          $('#portfolioIndirect').html(portfolioIndirect);

          var esgData = [
            {esg:"Sustainability",value:data.esg.esg_Controversy},
            {esg:"Controversy",value:data.esg.esg_Environmental},
            {esg:"Environmental",value:data.esg.esg_Governance},
            {esg:"Social",value:data.esg.esg_Social},
            {esg:"Governance",value:data.esg.esg_Sustainability}
          ]

          portfolioEsgChart(esgData);

        }
      });

    }
  });

}


function portfolioEsgChart(portfolioEsgData) {

  var data = portfolioEsgData;

  // what are these and are they things that someone should edit
  var margin = { top: 30, right: 20, bottom: 60, left: 65 };
  var width = 400 - (margin.left + margin.right);
  var height = 200 - (margin.top + margin.bottom);
  var labelOffset = 50;
  var axisOffset = 16;

  // Set Time Format (JAN, FEB, etc..)
  var formatPercent = d3.format(".0%");
  var formatPercent_four = d3.format(",.4%");

  // Set the scales
  var x = d3.scaleBand().rangeRound([0, width]).domain(data.map(function (d) {
      return d.esg;
  })).padding(0.5);


  var y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(data, function (d) {
      return d.value;
  })]);

  // // Set the axes
  var xAxis = d3.axisBottom().scale(x).tickSize(0);


  var yAxis = d3.axisLeft().ticks(4).tickSize(-width).scale(y.nice()); //.tickFormat(formatPercent);


  // // Set up SVG with initial transform to avoid repeat positioning
  var svg = d3.select('#portfolio-esg-chart').attr('class', 'graph').attr('width', width + (margin.left + margin.right)).attr('height', height + (margin.top + margin.bottom)).append('g').attr('class', 'group-container').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').attr('font-family', 'ibm-plex-sans');

  // // Add Y axis
  svg.append('g')
  .attr('class', 'axis y')
  .attr('stroke-dasharray', '4')
  .call(yAxis)
  .selectAll('text')
  .attr("x", -axisOffset)
  .attr('font-family', 'ibm-plex-sans');

  // // Add X axis
  svg.append('g')
  .attr('class', 'axis x')
  .attr('transform', 'translate(0, ' + height + ')')
  .call(xAxis)
  .selectAll('text')
  .attr("y", axisOffset)
  .attr('font-family', 'ibm-plex-sans');

  svg.append('g')
  .attr('class', 'bar-container')
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', function (d) {
      return x(d.esg);
  })
  .attr('y', function (d) {
      return height;
  })
  .attr('height', 0)
  .attr('width', x.bandwidth())
  .attr('fill', '#93C4FB')
  .transition()
  .duration(500)
  .delay((d, i) => i * 50)
  .attr('height', (d) => height - y(d.value))
  .attr('y', (d) => y(d.value));

}
