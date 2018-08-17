

function geographyChart() {

  var portfolioData = geographyData;

  var format = d3.format(",");

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              //.offset([-10, 0])
              .direction('e')
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Investments: </strong><span class='details'>" + format(d.investments) +"</span>";
              })

  var margin = {top: 0, right: 0, bottom: 0, left: 0},
              width = 576 - margin.left - margin.right,
              height = 300 - margin.top - margin.bottom;


  var color = d3.scaleThreshold()
      .domain([0,1,5,10,50,100,500,1000])
      .range(["rgb(200,200,200)", "rgb(200,200,200)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);


  var path = d3.geoPath();

  var svg = d3.select('#geography-chart')
              .attr("width", width)
              .attr("height", height)
              .append('g')
              .attr('class', 'map');

  var projection = d3.geoMercator()
                     //.scale(130)
                     .scale(90)
                    .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath().projection(projection);

  svg.call(tip);

  queue()
      .defer(d3.json, "/static/js/geography/world_countries.json")
      .defer(d3.json, "/static/js/geography/world_investment.json")
      .await(ready);

  function ready(error, data, investments) {
    var investmentsById = {};

    investments.forEach(function(d) { investmentsById[d.id] = +d.investments; });
    data.features.forEach(function(d) { d.investments = investmentsById[d.id] });

    svg.append("g")
        .attr("class", "countries")
      .selectAll("path")
        .data(data.features)
      .enter().append("path")
        .attr("d", path)
        .style("fill", function(d) { return color(investmentsById[d.id]); })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity",0.8)
        // tooltips
          .style("stroke","white")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            tip.show(d);

            d3.select(this)
              .style("opacity", 1)
              .style("stroke","white")
              .style("stroke-width",3);
          })
          .on('mouseout', function(d){
            tip.hide(d);

            d3.select(this)
              .style("opacity", 0.8)
              .style("stroke","white")
              .style("stroke-width",0.3);
          });

    svg.append("path")
        .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
         // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
        .attr("class", "names")
        .attr("d", path);
  }

}
