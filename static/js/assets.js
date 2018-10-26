function assetAllocationChartData() {

  //use global variable declared in analysis.js
  var portfolioData = assetData;

  var pieData = [];
  var count = 0;

  for (var key in portfolioData) {
    var entry = [key, portfolioData[key] / NAV]
    pieData.push(entry);
  }

  return pieData
}


function assetAllocationChart() {

  var data = assetAllocationChartData();

  //assets pie chart
  //source pie chart: http://www.carbondesignsystem.com/data-vis/pie-chart/code
  var radius = 96;
  var width = radius * 2;
  var height = radius * 2;

  var svg = d3.select('#allocation-chart').attr('width', width).attr('height', height).append('g').attr('class', 'group-container').attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')');

  var colors = ['#0C35AA', '#4F2794', '#054548', '#1D6CF7', '#6E3AC6', "#179E99", "#71A8FC", "#A875FC", "#31D5D1","#CADFFE","#D0B2FD","#DBFBFB"]
  var color = d3.scaleOrdinal(colors);

  var pie = d3.pie().sort(null).value(function(d) {
    return d[1];
  });

  var path = d3.arc().outerRadius(radius - 10).innerRadius(radius - 40);

  var pathTwo = d3.arc().outerRadius(radius).innerRadius(radius - 40);

  var arc = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

  arc.append('path').attr('d', path).attr('fill', function(d, i) {
    return color(i);
  }).attr('stroke-width', 2).attr('stroke', '#FFFFFF').on('mouseover', function(d) {
    d3.select(this).transition().style('cursor', 'pointer').attr('d', pathTwo);

    var tooltip = d3.select('.tooltip').style('display', 'inherit');
    var amount = d3.select('.amount')
    var item = d3.select('.item');

    amount.text('' + Number(d.data[1] * 100).toFixed(2) + '%');

    item.text('' + d.data[0]);
  }).on('mouseout', function(d) {
    var tooltip = d3.select('.tooltip').style('display', 'none');

    d3.select(this).transition().attr('d', path);
  });

  // add key
  $('.key').html(function() {
    var str = ''
    for (var i = 0; i < data.length; i++) {
      str = str + '<div> <p class="key-value"><span class="key-dot" style="background: ' + colors[i] + ';"></span>' + data[i][0] + '</p> </div>';
    }
    return str;
  });

}
