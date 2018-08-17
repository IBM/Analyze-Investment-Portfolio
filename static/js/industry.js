
function industryChartData() {

  var portfolioData = sectorData;

  var chartData = [];
  var industryData = [];
  var other = 0;
  var other_pct = 0;
  var total = 0;

  for (var key in portfolioData) {
      var obj = {
        value: portfolioData[key],
        industry: key
      }
      chartData.push(obj);
  }

  for (var j =0; j<chartData.length; j++) {
    pct = chartData[j]["value"] / NAV;
    if(pct<.01){
      other += chartData[j]["value"];
      other_pct += pct;
    }else{
      industryData.push({value:chartData[j]["value"],industry:chartData[j]["industry"],percent:pct})
    }
  }
  industryData.push({value:other,industry:"Other",percent:other_pct})

  console.log(industryData);
  return industryData
}

function industryChart() {

  var data = industryChartData();

  // what are these and are they things that someone should edit
  var margin = { top: 30, right: 20, bottom: 60, left: 65 };
  var width = 1200 - (margin.left + margin.right);
  var height = 300 - (margin.top + margin.bottom);
  var labelOffset = 50;
  var axisOffset = 16;

  // Set Time Format (JAN, FEB, etc..)
  var timeFormat = d3.timeFormat('%b');
  var formatPercent = d3.format(".0%");
  var formatPercent_four = d3.format(",.4%");

  // Set the scales
  var x = d3.scaleBand().rangeRound([0, width]).domain(data.map(function (d) {
      return d.industry;
  })).padding(0.5);


  var y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(data, function (d) {
      return d.percent;
  })]);

  // // Set the axes
  //var xAxis = d3.axisBottom().scale(x).tickSize(0).tickFormat(timeFormat);
  var xAxis = d3.axisBottom().scale(x).tickSize(0);


  var yAxis = d3.axisLeft().ticks(4).tickSize(-width).scale(y.nice()).tickFormat(formatPercent);


  // // Set up SVG with initial transform to avoid repeat positioning
  var svg = d3.select('#industry-chart').attr('class', 'graph').attr('width', width + (margin.left + margin.right)).attr('height', height + (margin.top + margin.bottom)).append('g').attr('class', 'group-container').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').attr('font-family', 'ibm-plex-sans');

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
  .call(wrap, 60);
  //.attr("y", axisOffset)
  //.attr('font-family', 'ibm-plex-sans');

  svg.append('g')
  .attr('class', 'bar-container')
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', function (d) {
      return x(d.industry);
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
  .attr('height', (d) => height - y(d.percent))
  .attr('y', (d) => y(d.percent));

  // Select Tooltip
  var tooltip = d3.select('.tooltip-bar');

  var bars = svg.selectAll('.bar').on('mouseover', function (d) {
      var color = d3.color('#93C4FB').darker();
      d3.select(this).attr('fill', color);
      tooltip.style('display', 'inherit').text((d.percent * 100).toFixed(2) + '%').style('top', y(d.percent) - axisOffset + 'px');

      var bandwidth = x.bandwidth();
      var tooltipWidth = tooltip.nodes()[0].getBoundingClientRect().width;
      var offset = (tooltipWidth - bandwidth) / 2;

      tooltip.style('left', x(d.industry) + margin.left - offset + 'px');
  }).on('mouseout', function (d) {
      d3.select(this).transition().duration(250).attr('fill', '#93C4FB');
      tooltip.style('display', 'none');
  });

  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")) + 1,
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }


}
