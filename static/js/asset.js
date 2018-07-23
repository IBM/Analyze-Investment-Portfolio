

function assetAllocationChartData(portfolioData) {

  //pieData = [['US Equity', 23], ['Domestic Equity', 12], ['Fixed Income', 19], ['International Equity', 15], ['Alternatives', 5], ['Other', 5]];
  var pieData = [];
  var count = 0;

  for (var key in portfolioData) {
      var entry = [key, portfolioData[key]]
      pieData.push(entry);
  }

  console.log(pieData);

  return pieData
}


function assetAllocationChart(portfolioData) {

  var data = assetAllocationChartData(portfolioData)

  //pie chart carbon design

  //var data = [['Gryffindor', 23], ['Slytherin', 12], ['Ravenclaw', 19], ['Hufflepuff', 15], ['Teachers', 5]];

  var radius = 96;
  var width = radius * 2;
  var height = radius * 2;

  var svg = d3.select('#allocation-chart').attr('width', width).attr('height', height).append('g').attr('class', 'group-container').attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')');

  //var colors = ['#3b1a40', '#473793', '#3c6df0', '#00a68f', '#56D2BB']
  var colors = ['#3b1a40', '#473793', '#3c6df0', '#00a68f', '#56D2BB', "green", "yellow", "red", "brown"]
  var color = d3.scaleOrdinal(colors);
  //var color = d3.scaleOrdinal(['#3b1a40', '#473793', '#3c6df0', '#00a68f', '#56D2BB']);

  var pie = d3.pie().sort(null).value(function (d) {
    return d[1];
  });

  var path = d3.arc().outerRadius(radius - 10).innerRadius(radius - 40);

  var pathTwo = d3.arc().outerRadius(radius).innerRadius(radius - 40);

  var arc = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

  arc.append('path').attr('d', path).attr('fill', function (d, i) {
    return color(i);
  }).attr('stroke-width', 2).attr('stroke', '#FFFFFF').on('mouseover', function (d) {
    d3.select(this).transition().style('cursor', 'pointer').attr('d', pathTwo);

    var tooltip = d3.select('.tooltip').style('display', 'inherit');

    var amount = d3.select('.amount');
    var item = d3.select('.item');

    amount.text('' + d.data[1]);

    item.text('' + d.data[0]);
  }).on('mouseout', function (d) {
    var tooltip = d3.select('.tooltip').style('display', 'none');

    d3.select(this).transition().attr('d', path);
  });

  /////////////////////////////////////// add  key ///////////////
  $('.key').html(function() {
    var str = ''
    for (var i = 0; i < data.length; i++) {
       str = str + '<div> <p class="key-value"><span class="key-dot" style="background: ' + colors[i] + ';"></span>' + data[i][0] + '</p> </div>';
    }
    return str;
  });

}
