
function benchmarksChartData() {

  console.log('esg data');
  console.log(esgData);

  var chartData = [];
  var esgControversyScores = [];
  var esgEnvironmentalScores = [];
  var esgGovernanceScores = [];
  var esgSocialScores = [];
  var esgSustainabilityScores = [];
  var keys = [];

  for (var key in esgData) {

      var benchmarksObj = esgData[key];
      var scoresList = [];

      var esgControversyScore = benchmarksObj["esg_Controversy"] / 10;
      esgControversyScores.push(esgControversyScore);

      var esgEnvironmentalScore = benchmarksObj["esg_Environmental"] / 10;
      esgEnvironmentalScores.push(esgEnvironmentalScore);

      var esgGovernanceScore = benchmarksObj["esg_Governance"] / 10;
      esgGovernanceScores.push(esgGovernanceScore);

      var esgSocialScore = benchmarksObj["esg_Social"] / 10;
      esgSocialScores.push(esgSocialScore);

      var esgSustainabilityScore = benchmarksObj["esg_Sustainability"] / 10;
      esgSustainabilityScores.push(esgSustainabilityScore);

      keys.push(key);

  }

  var esgControversyEntry = [esgControversyScores, "Controversy"];
  var esgEnvironmentalEntry = [esgEnvironmentalScores, "Environmental"];
  var esgGovernanceEntry = [esgGovernanceScores, "Governance"];
  var esgSocialEntry = [esgSocialScores, "Social"];
  var esgSustainabilityEntry = [esgSustainabilityScores, "Sustainability"];
  chartData.push(esgSustainabilityEntry, esgControversyEntry, esgEnvironmentalEntry, esgSocialEntry, esgGovernanceEntry );

  return [chartData, keys];

}


function benchmarksChart() {

  var benchmarksData = benchmarksChartData();
  var data = benchmarksData[0];
  var keys = benchmarksData[1];
  console.log('barchart data');
  console.log(data);
  console.log('keys');
  console.log(keys);

  var formatPercent = d3.format(".0%");

  var colors = d3.scaleOrdinal().
  range(['#00A78F', '#3b1a40', '#473793', '#3c6df0', '#56D2BB']);

  var keyColors = ['#00A78F', '#3b1a40', '#473793', '#3c6df0', '#56D2BB'];


  // what are these and are they things that someone should edit
  var margin = { top: 30, right: 20, bottom: 60, left: 65 };
  var width = 800 - (margin.left + margin.right);
  var height = 300 - (margin.top + margin.bottom);
  var labelOffset = 50;
  var axisOffset = 16;

  // Set the scales
  // Groups scale, x axis

  // Group Scale
  var x0 = d3.scaleBand().
  rangeRound([0, width]).
  domain(data.map(function (d) {return d[1];})).
  paddingInner(0.3);

  // const numGroups = data
  var x1 = d3.scaleBand().
  rangeRound([0, x0.bandwidth()]).
  domain(d3.range(data[0][0].length)).
  padding(0.05);

  var y = d3.scaleLinear().
  range([height, 0]).
  domain([0, d3.max(data, function (d) {
      return d3.max(d[0], function (i) {
          return i;
      });
  })]);

  // // Set the axes
  var xAxis = d3.axisBottom().
  scale(x0).
  tickSize(0);

  var yAxis = d3.axisLeft().
  ticks(5).
  tickSize(-width).
  scale(y.nice()).
  tickFormat(formatPercent);

  // // Set up SVG with initial transform to avoid repeat positioning
  var svg = d3.select('#benchmarks-chart').
  attr('class', 'graph-groupedbar').
  attr('width', width + (margin.left + margin.right)).
  attr('height', height + (margin.top + margin.bottom)).
  append('g').
  attr('class', 'group-container-groupedbar').
  attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').
  attr('font-family', 'ibm-plex-sans');

  // // Add Y axis
  svg.append('g').
  attr('class', 'axis-groupedbar y-groupedbar').
  attr('stroke-dasharray', '4').
  call(yAxis).
  selectAll('text').
  attr("x", -axisOffset).
  attr('font-family', 'ibm-plex-sans');

  // // Add X axis
  svg.append('g').
  attr('class', 'axis-groupedbar x-groupedbar').
  attr('transform', 'translate(0, ' + height + ')').
  call(xAxis).
  selectAll('text').
  attr("y", axisOffset).
  attr('font-family', 'ibm-plex-sans');

  var count = 0;
  svg.append('g').
  selectAll('g').
  data(data).
  enter().append('g').
  attr('transform', function (d) {
      return 'translate(' + x0(d[1]) + ', 0)';
  }).
  selectAll('rect').
  data(function (d) {
      count++;
      return d[0].map(function (key, index) {
          return {
              key: key,
              index: index,
              series: count };

      });
  }).
  enter().append('rect').
  attr('class', 'bar').
  attr('x', function (d) {return x1(d.index);}).
  attr('width', x1.bandwidth()).
  attr('fill', function (d) {return colors(d.index);}).
  //transition().
  //duration(500).
  attr('y', function (d) {return y(d.key);}).
  attr('height', function (d) {return height - y(d.key);});


  /////////////////////////////////////// add  key ///////////////
  $('.benchmarks-key').html(function() {
    var str = ''
    for (var i = 0; i < keys.length; i++) {
       str = str + '<div> <p class="key-value"><span class="key-dot" style="background: ' + keyColors[i] + ';"></span>' + keys[i] + '</p> </div>';
    }
    return str;
  });

}
