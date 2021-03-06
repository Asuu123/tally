import React, { useEffect, useState } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
const AllBlog = ()=>  {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
      params.api.paginationGoToPage(4);
    };

    fetch('http://localhost:3000/api/product')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  const onPageSizeChanged = (newPageSize) => {
    var value = document.getElementById('page-size').value;
    gridApi.paginationSetPageSize(Number(value));
  };

  return (
    <div class="container"style={{ width: '100%', height: '550px' }}>
      <div className="example-wrapper">
        <div className="example-header">
          Page Size:
          <select onChange={() => onPageSizeChanged()} id="page-size">
            <option value="10" selected={true}>
              10
            </option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </div>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
           
            autoGroupColumnDef={{
              headerName: 'Group',
              minWidth: 170,
              field: 'name',
              valueGetter: function (params) {
                if (params.node.group) {
                  return params.node.key;
                } else {
                  return params.data[params.colDef.field];
                }
              },
              headerCheckboxSelection: true,
              cellRenderer: 'agGroupCellRenderer',
              cellRendererParams: { checkbox: true },
            }}
            defaultColDef={{
              editable: true,
              enableRowGroup: true,
              enablePivot: true,
              enableValue: true,
              sortable: true,
              resizable: true,
              filter: true,
              flex: 1,
              minWidth: 100,
            }}
            suppressRowClickSelection={true}
            groupSelectsChildren={true}
            debug={true}
            rowSelection={'multiple'}
            rowGroupPanelShow={'always'}
            pivotPanelShow={'always'}
            enableRangeSelection={true}
            pagination={true}
            paginationPageSize={10}
            paginationNumberFormatter={function (params) {
              return '[' + params.value.toLocaleString() + ']';
            }}
            onGridReady={onGridReady}
            rowData={rowData}
          >
            <AgGridColumn
              headerName="Name"
              field="name"
              minWidth={170}
              checkboxSelection={checkboxSelection}
              headerCheckboxSelection={headerCheckboxSelection}
            />
            <AgGridColumn headerName="Bill No" field="bill" />
            <AgGridColumn headerName="Amount" field="amount" />
             <AgGridColumn headerName="Credit" field="credit" />
              <AgGridColumn headerName="Debit" field="debit" />
            <AgGridColumn headerName="Created At" field="createdAt" />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

var checkboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0;
};

export default AllBlog;














