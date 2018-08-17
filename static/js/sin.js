
function sinCharts() {

  sinGaugeChart();
  var getTreeMapData = sinTreeMapData();
  sinTreeMap(getTreeMapData);

}


function sinTreeMapData() {

  var data = {
    "name": "SinInvestments",
    "children": [
          {
            "name": "Alcohol",
            "value": sinData.has_Alcohol
          },
          {
            "name": "Fossil Fuels",
            "value": sinData["has_Fossil Fuels"]
          },
          {
            "name": "Gambling",
            "value": sinData.has_Gambling
          },
          {
            "name": "Military",
            "value": sinData.has_Military
          },
          {
            "name": "Tobacco",
            "value": sinData.has_Tobacco
          }
        ]
  };

  return data;


}


function sinTreeMap(sinTreeMapData) {

  var data = sinTreeMapData;

  var colors = ['#3b1a40', '#473793', '#3c6df0', '#00a68f', '#56D2BB']
  var color = d3.scaleOrdinal(colors);

  var keys = ['Alcohol', 'Fossil Fuels', 'Gambling', 'Military', 'Tobacco']

  var mousemove = function(d) {
    var xPosition = d3.event.pageX + 5;
    var yPosition = d3.event.pageY + 5;

    d3.select("#tooltip-treemap")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px");
    d3.select("#tooltip-treemap #heading-treemap")
      .text(d["data"]["name"]);
    d3.select("#tooltip-treemap #percentage-treemap")
      .text(((d["value"]/NAV) * 100).toFixed(2) + "%");
    d3.select("#tooltip-treemap").classed("hidden", false);
  };

  var mouseout = function() {
    console.log("mouseout")
    d3.select("#tooltip-treemap").classed("hidden", true);
  };


  var treemapLayout = d3.treemap()
    .size([400, 200])
    .paddingTop(10)
    .paddingInner(1);

  var rootNode = d3.hierarchy(data)

  rootNode.sum(function(d) {
    return d.value;
  });

  treemapLayout(rootNode);

  var nodes = d3.select('#sin-treemap')
    .selectAll('g')
    .data(rootNode.leaves())
    .enter()
    .append('g')
    .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})
    .on("mousemove", mousemove)
    .on("mouseout", mouseout);


  nodes
    .append('rect')
    .attr('class', 'treemap-rect')
    .attr('width', function(d) { return d.x1 - d.x0; })
    .attr('height', function(d) { return d.y1 - d.y0; })
    .attr('fill', function (d, i) {
      return color(i);
    })
    .on('mouseover', function (d) {
      d3.select(this).transition().style('cursor', 'pointer');
    }).on('mouseout', function (d) {
      // Remove the info text on mouse out.
      d3.select(this).select('text').remove();
    });


    /////////////////////////////////////// add  key ///////////////
    $('.sin-treemap-key').html(function() {
      var str = ''
      for (var i = 0; i < keys.length; i++) {
         str = str + '<div> <p class="key-value"><span class="key-dot" style="background: ' + colors[i] + ';"></span>' + keys[i] + '</p> </div>';
      }
      return str;
    });

}


function sinGaugeChart() {

  // Based on this great Demo: http://bl.ocks.org/mbostock/5100636
  var tau = 2 * Math.PI;
  var radius = 65;
  var padding = 30;
  var boxSize = (radius + padding) * 2;

  var ratio = (sinData.has_Alcohol + sinData["has_Fossil Fuels"] + sinData.has_Gambling + sinData.has_Military + sinData.has_Tobacco) / NAV;
  var percent = Math.round(ratio * 100);

  var arc = d3.arc().innerRadius(radius).outerRadius(radius - 15).startAngle(0);

  var svg = d3.select('#sin-chart').attr('width', boxSize).attr('height', boxSize);

  var g = svg.append('g').attr('transform', 'translate(' + boxSize / 2 + ', ' + boxSize / 2 + ')');

  // Background Arc
  var background = g.append('path').datum({ endAngle: tau }).style('fill', '#dfe3e6').attr('d', arc);

  // Foreground Arc
  var foreground = g.append('path').datum({ endAngle: 0 }).style('fill', '#473793').transition().duration(1000).delay(1000).attrTween('d', arcTween(ratio * tau));

  // Animation function
  function arcTween(newAngle) {
      return function (d) {
          var interpolate = d3.interpolate(d.endAngle, newAngle);
          return function (t) {
              d.endAngle = interpolate(t);

              return arc(d);
          };
      };
  }

  $('.sin-text').html(function() {
    return '<div class="sin-text">Your portfolio is comprised of <br><div class="text-percent-color"><b>' + percent + '%</b></div> "sin" investments".</div>';
  });


}
