function compositionTable(portfolio) {
    console.log("Table :");
    console.log(portfolio);
    $('#results > tr').remove();

    if(portfolio.length>0){
      var rowData="<tr>";
      var tableCols=['name','value ($USD)','Portfolio Contribution (%)','Industry Sector','Asset Class','Geography']; //Hardcoded to GUI order. Otherwise would iterate through key,value.
      $.each(tableCols, function(c) {
            if(capitalize(tableCols[c]).trim()!="Asset"){
              //rowData+="<td><b>"++"</b></td>";
              rowData+='<th><button class="bx--table-sort-v2" data-event="sort"><span class="bx--table-header-label">'+capitalize(tableCols[c])+'</span><svg class="bx--table-sort-v2__icon" width="10" height="5" viewBox="0 0 10 5"><path d="M0 0l5 4.998L10 0z" fill-rule="evenodd" /></svg></button></th>'
              //tableCols.push(key);
            }
      });
      $("#results > thead").append(rowData+"</tr>");
      for (var i = 0; i < portfolio.length; i++) {
        rowData="<tr>";
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
    }

}

function capitalize(s) {
    return s[0].toUpperCase() + s.substr(1);
}


//Table Sorting from here: https://codepen.io/tjegan/pen/PjjyVN
const table = document.querySelector('[data-table]');
const tableContainer = document.querySelector('.bx--responsive-table-container');
const columns = document.querySelectorAll('[data-event=sort]');

function sortTable(table, col, direction) {
  // Get Table Ref for Refreshing Rows 
  const tableRef = CarbonComponents.DataTable.components.get(tableContainer);
  // Get Table Body
  let tb = table.querySelector('tbody');
  let tr = Array.from(tb.querySelectorAll('tr'));
  // Sort Rows
  tr = tr.sort(function(a, b) {
    let one = a.cells[col].textContent.trim();
    let two = b.cells[col].textContent.trim();
    if (direction === undefined || direction === 'descending') {
      return one > two;
    } else {
      return two > one;
    }
  })
  // Reappend rows
  tr.forEach(item => {
    tb.appendChild(item);
  })
  // Refresh stripes
  tableRef.refreshRows();
}

function clearIcons(i) {
  Array.from(columns).forEach((column, key) => {
    if (!(i === key)) {
      delete column.dataset.active;
    } 
  });
}

let prevNode = 0;
Array.from(columns).forEach((column, key) => {
  column.addEventListener('click', evt => {
    if (!(key === prevNode)) {
      clearIcons(key);
      column.dataset.active = true;
      prevNode = key;
    } 
    
    let direction = column.dataset.previousValue;
    sortTable(table, key, direction);
  });
});
