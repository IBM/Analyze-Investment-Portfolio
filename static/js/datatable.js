function compositionTable(portfolio) {
    console.log("Table :");
    console.log(portfolio);
    $('#results > tr').remove();

    if(portfolio.length>0){
      var rowData='<tr class="bx--table-row">';
      var tableCols=['name','value ($USD)','Portfolio Contribution (%)','Industry Sector','Asset Class','Geography']; //Hardcoded to GUI order. Otherwise would iterate through key,value.
      $.each(tableCols, function(c) {
            if(capitalize(tableCols[c]).trim()!="Asset"){
              //rowData+="<td><b>"++"</b></td>";
              //rowData+='<th tabindex="0" class="bx--table-header bx--table-sort" onclick="sortTable(' + c + ')" data-event="sort" data-active><span>'+capitalize(tableCols[c])+'</span><svg class="bx--table-sort__svg" width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd"><path d="M10 0L5 5 0 0z"></path></svg></th>'
              rowData+='<th tabindex="0" class="bx--table-header bx--table-sort" data-event="sort" data-active><span>'+capitalize(tableCols[c])+'</span><svg class="bx--table-sort__svg" width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd"><path d="M10 0L5 5 0 0z"></path></svg></th>'
              //tableCols.push(key);
            }
      });
      $("#results > thead").append(rowData+"</tr>");
      for (var i = 0; i < portfolio.length; i++) {
      //for (var i = 0; i < 30; i++) {
        rowData='<tr tabindex="0" class="bx--table-row bx--parent-row" data-parent-row>';
        for(var j=0;j<tableCols.length;j++){

          var value = portfolio[i][tableCols[j]];
          if(typeof value == 'number'){
              value = value.toFixed(2).toLocaleString();
          }
          //value = isNaN(value)?value:formatNumber(value,5);
          rowData+="<td>"+String(value)+"</td>";
        }
        $("#results > tbody").append(rowData+"</tr>");

      }

      $('#results').DataTable( {
          columnDefs: [ {
              targets: [ 0 ],
              orderData: [ 0, 1 ]
          }, {
              targets: [ 1 ],
              orderData: [ 1, 0 ]
          }, {
              targets: [ 4 ],
              orderData: [ 4, 0 ]
          } ]
      } );
    }

function capitalize(s) {
    return s[0].toUpperCase() + s.substr(1);
}

var columns = document.querySelectorAll('[data-event=sort]');
var tableContainer = document.querySelector('.bx--responsive-table-container');
function clearIcons(i) {
  Array.from(columns).forEach(function (column, key) {
    if (!(i === key)) {
      delete column.dataset.active;
    }
  });
}

var prevNode = 0;
Array.from(columns).forEach(function (column, key) {
  column.addEventListener('click', function (evt) {
    if (!(key === prevNode)) {
      clearIcons(key);
      column.dataset.active = true;
      prevNode = key;
    }

    var direction = column.dataset.previousValue;
    var tableRef = CarbonComponents.DataTable.components.get(tableContainer);

    // Refresh stripes
    tableRef.refreshRows();
    //sortTable(table, key, direction);
  });
});


}


function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("results");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }


  var columns = document.querySelectorAll('[data-event=sort]');
  var tableContainer = document.querySelector('.bx--responsive-table-container');
  function clearIcons(i) {
    Array.from(columns).forEach(function (column, key) {
      if (!(i === key)) {
        delete column.dataset.active;
      }
    });
  }

  var prevNode = 0;
  Array.from(columns).forEach(function (column, key) {
    column.addEventListener('click', function (evt) {
      if (!(key === prevNode)) {
        clearIcons(key);
        column.dataset.active = true;
        prevNode = key;
      }

      var direction = column.dataset.previousValue;
      var tableRef = CarbonComponents.DataTable.components.get(tableContainer);

      // Refresh stripes
      tableRef.refreshRows();
      //sortTable(table, key, direction);
    });
  });




}
