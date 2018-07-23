
function industryChartData(portfolioData) {

  var chartData = [];
  var total = 0;

  for (var key in portfolioData) {
      var obj = {
        value: portfolioData[key],
        industry: key
      }
      chartData.push(obj);
      total += portfolioData[key];
  }

  for (var j =0; j<chartData.length; j++) {
    chartData[j]["percent"] = chartData[j]["value"] / total;
  }

  console.log(chartData);

  return chartData
}


function industryChart(portfolioData) {

  var data = industryChartData(portfolioData);

  // what are these and are they things that someone should edit
  var margin = { top: 30, right: 20, bottom: 60, left: 65 };
  var width = 800 - (margin.left + margin.right);
  var height = 300 - (margin.top + margin.bottom);
  var labelOffset = 50;
  var axisOffset = 16;

  // Set Time Format (JAN, FEB, etc..)
  var timeFormat = d3.timeFormat('%b');
  var formatPercent = d3.format(".0%");

  // Set the scales
  var x = d3.scaleBand().rangeRound([0, width]).domain(data.map(function (d) {
      return d.industry;
  })).padding(0.5);


  var y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(data, function (d) {
      return d.percent;
  })]);

  // // Set the axes
  //var xAxis = d3.axisBottom().scale(x).tickSize(0).tickFormat(timeFormat);
  var xAxis = d3.axisBottom().scale(x).tickSize(0)


  var yAxis = d3.axisLeft().ticks(4).scale(y.nice()).tickFormat(formatPercent);;


  // // Set up SVG with initial transform to avoid repeat positioning
  var svg = d3.select('#industry-chart').attr('class', 'graph').attr('width', width + (margin.left + margin.right)).attr('height', height + (margin.top + margin.bottom)).append('g').attr('class', 'group-container').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').attr('font-family', 'ibm-plex-sans');

  // // Add Y axis
  svg.append('g').attr('class', 'axis y').attr('stroke-dasharray', '4').call(yAxis).selectAll('text').attr("x", -axisOffset).attr('font-family', 'ibm-plex-sans');

  // // Add Y axis label
  //var yLabel = svg.select('.y').append('text').text('USAGE ($)').attr('class', 'label').attr('transform', 'translate(' + -labelOffset + ', ' + height / 2 + ') rotate(-90)').attr('font-family', 'ibm-plex-sans');

  // // Add X axis
  svg.append('g').attr('class', 'axis x').attr('transform', 'translate(0, ' + height + ')').call(xAxis).selectAll('text').attr("y", axisOffset).attr('font-family', 'ibm-plex-sans');

  // // Add X axis label
  //var xLabel = svg.select('.x').append('text').text('MONTH').attr('class', 'label').attr('transform', 'translate(' + width / 2 + ', ' + labelOffset + ')').attr('font-family', 'ibm-plex-sans');

  svg.append('g').attr('class', 'bar-container').selectAll('rect').data(data).enter().append('rect').attr('class', 'bar').attr('x', function (d) {
      return x(d.industry);
  }).attr('y', function (d) {
      return height;
  }).attr('height', 0).attr('width', x.bandwidth()).attr('fill', '#00A78F').transition().duration(500).delay(function (d, i) {
      return i * 50;
  }).attr('height', function (d) {
      return height - y(d.percent);
  }).attr('y', function (d) {
      return y(d.percent);
  });

  // Select Tooltip
  var tooltip = d3.select('.tooltip-bar');

  var bars = svg.selectAll('.bar').on('mouseover', function (d) {
      var color = d3.color('#00A78F').darker();
      d3.select(this).attr('fill', color);
      tooltip.style('display', 'inherit').text((d.percent * 100) + '%').style('top', y(d.percent) - axisOffset + 'px');

      var bandwidth = x.bandwidth();
      var tooltipWidth = tooltip.nodes()[0].getBoundingClientRect().width;
      var offset = (tooltipWidth - bandwidth) / 2;

      tooltip.style('left', x(d.industry) + margin.left - offset + 'px');
  }).on('mouseout', function (d) {
      d3.select(this).transition().duration(250).attr('fill', '#00A78F');
      tooltip.style('display', 'none');
  });


}

/*
function industryChartData(portfolioData) {

  var chartData = [];
  var totalCount = 0;

  for (var i = 0; i < portfolioData.length; i++) {

    //console.log(portfolioData[i]["Asset Class"])
    var sector = portfolioData[i]["sector"];
    var existSector = false;

    for (var j =0; j<chartData.length; j++) {

      if (chartData[j]["industry"] == sector) {
        var existSector = true;

        chartData[j]["count"] = chartData[j]["count"] + 1;
      }
    }

    if (existSector == false) {
      var obj = {
        count: 1,
        industry: sector
      }
      chartData.push(obj);
    }

    totalCount += 1;
  }

  for (var j =0; j<chartData.length; j++) {
    chartData[j]["percent"] = chartData[j]["count"] / totalCount;
  }


  console.log(chartData);

  return chartData
}
*/
