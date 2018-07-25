
$( ".dropdown" )
  .change(function () {
    var str = "";
    var selected = $('.bx--graph-header select').find(":selected").text();

    if(selected == "Asset Allocation") {
      document.getElementById('by-asset').style.display = "block";
      document.getElementById('by-industry').style.display = "none";
      document.getElementById('by-geography').style.display = "none";

    } else if (selected == "Industry") {
      document.getElementById('by-asset').style.display = "none";
      document.getElementById('by-industry').style.display = "block";
      document.getElementById('by-geography').style.display = "none";

    } else if (selected == "Geography") {
      document.getElementById('by-asset').style.display = "none";
      document.getElementById('by-industry').style.display = "none";
      document.getElementById('by-geography').style.display = "block";
    }

  })
  .change();

function displayCompositionTable() {
  console.log('displayCompositionTable')
    document.getElementById('portfolio-table').style.display = "block";
    document.getElementById('composition-chart').style.display = "none";
}

function displayCompositionChart() {
    console.log('displayCompositionChart')
    document.getElementById('portfolio-table').style.display = "none";
    document.getElementById('composition-chart').style.display = "block";
}


function displayComposition() {
  document.getElementById('composition').style.display = "block";
  document.getElementById('esg-categories').style.display = "none";
  document.getElementById('search').style.display = "none";
  document.getElementById('benchmarks').style.display = "none";
  document.getElementById('non-esg').style.display = "none";
  document.getElementById('improve').style.display = "none";
}



function displayEsgCategories() {
  document.getElementById('composition').style.display = "none";
  document.getElementById('esg-categories').style.display = "block";
  document.getElementById('search').style.display = "none";
  document.getElementById('benchmarks').style.display = "none";
  document.getElementById('non-esg').style.display = "none";
  document.getElementById('improve').style.display = "none";
  esgGaugeCharts();
}

function displaySearch() {
  document.getElementById('composition').style.display = "none";
  document.getElementById('esg-categories').style.display = "none";
  document.getElementById('search').style.display = "block";
  document.getElementById('benchmarks').style.display = "none";
  document.getElementById('non-esg').style.display = "none";
  document.getElementById('improve').style.display = "none";
}

function displayBenchmarks() {
  document.getElementById('composition').style.display = "none";
  document.getElementById('esg-categories').style.display = "none";
  document.getElementById('search').style.display = "none";
  document.getElementById('benchmarks').style.display = "block";
  document.getElementById('non-esg').style.display = "none";
  document.getElementById('improve').style.display = "none";
}

function displayNonEsg() {
  document.getElementById('composition').style.display = "none";
  document.getElementById('esg-categories').style.display = "none";
  document.getElementById('search').style.display = "none";
  document.getElementById('benchmarks').style.display = "none";
  document.getElementById('non-esg').style.display = "block";
  document.getElementById('improve').style.display = "none";
}

function displayImprove() {
  document.getElementById('composition').style.display = "none";
  document.getElementById('esg-categories').style.display = "none";
  document.getElementById('search').style.display = "none";
  document.getElementById('benchmarks').style.display = "none";
  document.getElementById('non-esg').style.display = "none";
  document.getElementById('improve').style.display = "block";
}
