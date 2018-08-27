function compositionTable() {

    var portfolio = compositionData;

    console.log("Table :");
    console.log(portfolio);
    $('#results > tr').remove();

    if(portfolio.length>0){
      var rowData='<tr class="bx--table-row">';
      var tableCols=['name','value ($USD)','Portfolio Contribution (%)','Industry Sector','Asset Class','Geography']; //Hardcoded to GUI order. Otherwise would iterate through key,value.
      $.each(tableCols, function(c) {
            if(capitalize(tableCols[c]).trim()!="Asset"){
              rowData+='<th tabindex="0" class="bx--table-header bx--table-sort" data-event="sort" data-active><span>'+capitalize(tableCols[c])+'</span><svg class="bx--table-sort__svg" width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd"><path d="M10 0L5 5 0 0z"></path></svg></th>'
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


}
