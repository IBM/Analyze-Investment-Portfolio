
function esgGaugeCharts() {

  console.log('esg data');
  console.log(esgData);
  var total = 0;

  var portfolioEsg = esgData[esgPortfolio];


  console.log('portfolio');
  console.log(esgPortfolio);
  console.log('portfolio_esg');
  console.log(portfolioEsg);

  for (var key in portfolioEsg) {
      total += portfolioEsg[key];
  }

  esgChart(portfolioEsg.esg_Sustainability, total, "sustainability", '#3b1a40');
  esgChart(portfolioEsg.esg_Controversy, total, "controversy", '#473793');
  esgChart(portfolioEsg.esg_Environmental, total, "environmental", '#3c6df0');
  esgChart(portfolioEsg.esg_Social, total, "social", '#00a68f');
  esgChart(portfolioEsg.esg_Governance, total, "governance", '#56D2BB');

}

function esgChart(amount, total, esgType, color) {

  // Based on this great Demo: http://bl.ocks.org/mbostock/5100636
  var tau = 2 * Math.PI;
  var radius = 80;
  var padding = 30;
  var boxSize = (radius + padding) * 2;
  var ratio = amount / total;
  var percent = Math.round(ratio * 100);

  var arc = d3.arc().innerRadius(radius).outerRadius(radius - 10).startAngle(0);

  var svg = d3.select('#esg-' + esgType + '-chart').attr('width', boxSize).attr('height', boxSize);

  var g = svg.append('g').attr('transform', 'translate(' + boxSize / 2 + ', ' + boxSize / 2 + ')');

  // Background Arc
  var background = g.append('path').datum({ endAngle: tau }).style('fill', '#dfe3e6').attr('d', arc);

  // Foreground Arc
  var foreground = g.append('path').datum({ endAngle: 0 }).style('fill', color).transition().duration(1000).delay(1000).attrTween('d', arcTween(ratio * tau));

  // Text Labels
  var amountText = d3.select('.esg-' + esgType + '-amount');
  amountText.style('opacity', 0).transition().duration(1000).delay(1500).style('opacity', 1).text(percent + '%');

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

}
