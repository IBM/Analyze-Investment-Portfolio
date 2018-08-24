
$( ".dropdown" )
  .change(function () {
    var str = "";
    var selected = $('.bx--graph-header select').find(":selected").text();

    if(selected == "Asset Allocation") {
      document.getElementById('by-asset').style.display = "block";
      document.getElementById('by-industry').style.display = "none";
      document.getElementById('by-geography').style.display = "none";
      assetAllocationChart();

    } else if (selected == "Industry") {
      document.getElementById('by-asset').style.display = "none";
      document.getElementById('by-industry').style.display = "block";
      document.getElementById('by-geography').style.display = "none";
      industryChart();

    } else if (selected == "Geography") {
      document.getElementById('by-asset').style.display = "none";
      document.getElementById('by-industry').style.display = "none";
      document.getElementById('by-geography').style.display = "block";
      geographyChart();
    }

  })
  .change();

function displayCompositionTable() {
    document.getElementById('portfolio-table').style.display = "block";
    document.getElementById('composition-chart').style.display = "none";
    
}

function displayCompositionChart() {
    document.getElementById('portfolio-table').style.display = "none";
    document.getElementById('composition-chart').style.display = "block";
}


function displayComposition() {
  //show the selected layout
  document.getElementById('composition').style.display = "block";
  document.getElementById('esg-categories').style.display = "none";
  document.getElementById('search').style.display = "none";
  document.getElementById('benchmarks').style.display = "none";
  document.getElementById('non-esg').style.display = "none";
  document.getElementById('improve').style.display = "none";

  //highlight on filmstrip
  document.getElementById('Tile-1').style.stroke = "#5596e6";
  document.getElementById('Tile-2').style.stroke = "#DCDCDC";
  document.getElementById('Tile-3').style.stroke = "#DCDCDC";
  document.getElementById('Tile-4').style.stroke = "#DCDCDC";
  document.getElementById('Tile-5').style.stroke = "#DCDCDC";
  document.getElementById('Tile-6').style.stroke = "#DCDCDC";

  document.getElementById('Tile-1').style.strokeWidth = "3";
  document.getElementById('Tile-2').style.strokeWidth = "1";
  document.getElementById('Tile-3').style.strokeWidth = "1";
  document.getElementById('Tile-4').style.strokeWidth = "1";
  document.getElementById('Tile-5').style.strokeWidth = "1";
  document.getElementById('Tile-6').style.strokeWidth = "1";
}



function displayEsgCategories() {
  //show the selected layout
  document.getElementById('composition').style.display = "none";
  document.getElementById('esg-categories').style.display = "block";
  document.getElementById('search').style.display = "none";
  document.getElementById('benchmarks').style.display = "none";
  document.getElementById('non-esg').style.display = "none";
  document.getElementById('improve').style.display = "none";

  //update chart
  esgGaugeCharts();

  //highlight on filmstrip
  document.getElementById('Tile-1').style.stroke = "#DCDCDC";
  document.getElementById('Tile-2').style.stroke = "#5596e6";
  document.getElementById('Tile-3').style.stroke = "#DCDCDC";
  document.getElementById('Tile-4').style.stroke = "#DCDCDC";
  document.getElementById('Tile-5').style.stroke = "#DCDCDC";
  document.getElementById('Tile-6').style.stroke = "#DCDCDC";

  document.getElementById('Tile-1').style.strokeWidth = "1";
  document.getElementById('Tile-2').style.strokeWidth = "3";
  document.getElementById('Tile-3').style.strokeWidth = "1";
  document.getElementById('Tile-4').style.strokeWidth = "1";
  document.getElementById('Tile-5').style.strokeWidth = "1";
  document.getElementById('Tile-6').style.strokeWidth = "1";
}

function displaySearch() {
  //show the selected layout
  document.getElementById('composition').style.display = "none";
  document.getElementById('esg-categories').style.display = "none";
  document.getElementById('search').style.display = "block";
  document.getElementById('benchmarks').style.display = "none";
  document.getElementById('non-esg').style.display = "none";
  document.getElementById('improve').style.display = "none";

  clearSearch();
  searchField();

  //highlight on filmstrip
  document.getElementById('Tile-1').style.stroke = "#DCDCDC";
  document.getElementById('Tile-2').style.stroke = "#DCDCDC";
  document.getElementById('Tile-3').style.stroke = "#5596e6";
  document.getElementById('Tile-4').style.stroke = "#DCDCDC";
  document.getElementById('Tile-5').style.stroke = "#DCDCDC";
  document.getElementById('Tile-6').style.stroke = "#DCDCDC";

  document.getElementById('Tile-1').style.strokeWidth = "1";
  document.getElementById('Tile-2').style.strokeWidth = "1";
  document.getElementById('Tile-3').style.strokeWidth = "3";
  document.getElementById('Tile-4').style.strokeWidth = "1";
  document.getElementById('Tile-5').style.strokeWidth = "1";
  document.getElementById('Tile-6').style.strokeWidth = "1";
}

function displayBenchmarks() {
  //show the selected layout
  document.getElementById('composition').style.display = "none";
  document.getElementById('esg-categories').style.display = "none";
  document.getElementById('search').style.display = "none";
  document.getElementById('benchmarks').style.display = "block";
  document.getElementById('non-esg').style.display = "none";
  document.getElementById('improve').style.display = "none";

  benchmarksChart();

  //highlight on filmstrip
  document.getElementById('Tile-1').style.stroke = "#DCDCDC";
  document.getElementById('Tile-2').style.stroke = "#DCDCDC";
  document.getElementById('Tile-3').style.stroke = "#DCDCDC";
  document.getElementById('Tile-4').style.stroke = "#5596e6";
  document.getElementById('Tile-5').style.stroke = "#DCDCDC";
  document.getElementById('Tile-6').style.stroke = "#DCDCDC";

  document.getElementById('Tile-1').style.strokeWidth = "1";
  document.getElementById('Tile-2').style.strokeWidth = "1";
  document.getElementById('Tile-3').style.strokeWidth = "1";
  document.getElementById('Tile-4').style.strokeWidth = "3";
  document.getElementById('Tile-5').style.strokeWidth = "1";
  document.getElementById('Tile-6').style.strokeWidth = "1";
}

function displayNonEsg() {
  //show the selected layout
  document.getElementById('composition').style.display = "none";
  document.getElementById('esg-categories').style.display = "none";
  document.getElementById('search').style.display = "none";
  document.getElementById('benchmarks').style.display = "none";
  document.getElementById('non-esg').style.display = "block";
  document.getElementById('improve').style.display = "none";

  //display charts
  sinCharts();

  //highlight on filmstrip
  document.getElementById('Tile-1').style.stroke = "#DCDCDC";
  document.getElementById('Tile-2').style.stroke = "#DCDCDC";
  document.getElementById('Tile-3').style.stroke = "#DCDCDC";
  document.getElementById('Tile-4').style.stroke = "#DCDCDC";
  document.getElementById('Tile-5').style.stroke = "#5596e6";
  document.getElementById('Tile-6').style.stroke = "#DCDCDC";

  document.getElementById('Tile-1').style.strokeWidth = "1";
  document.getElementById('Tile-2').style.strokeWidth = "1";
  document.getElementById('Tile-3').style.strokeWidth = "1";
  document.getElementById('Tile-4').style.strokeWidth = "1";
  document.getElementById('Tile-5').style.strokeWidth = "3";
  document.getElementById('Tile-6').style.strokeWidth = "1";

}

function displayImprove() {
  //show the selected layout
  document.getElementById('composition').style.display = "none";
  document.getElementById('esg-categories').style.display = "none";
  document.getElementById('search').style.display = "none";
  document.getElementById('benchmarks').style.display = "none";
  document.getElementById('non-esg').style.display = "none";
  document.getElementById('improve').style.display = "block";

  //highlight on filmstrip
  document.getElementById('Tile-1').style.stroke = "#DCDCDC";
  document.getElementById('Tile-2').style.stroke = "#DCDCDC";
  document.getElementById('Tile-3').style.stroke = "#DCDCDC";
  document.getElementById('Tile-4').style.stroke = "#DCDCDC";
  document.getElementById('Tile-5').style.stroke = "#DCDCDC";
  document.getElementById('Tile-6').style.stroke = "#5596e6";

  document.getElementById('Tile-1').style.strokeWidth = "1";
  document.getElementById('Tile-2').style.strokeWidth = "1";
  document.getElementById('Tile-3').style.strokeWidth = "1";
  document.getElementById('Tile-4').style.strokeWidth = "1";
  document.getElementById('Tile-5').style.strokeWidth = "1";
  document.getElementById('Tile-6').style.strokeWidth = "3";

}
