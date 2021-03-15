import React,{ useReducer,useState } from 'react';
import { emailContactForm } from '../../actions/form';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'amount':
      return {
        ...state,
        error: false,
        amount: action.payload,
        success: false,
        buttonText: 'Save',
      };
    case 'name':
      return {
        ...state,
        error: false,
        name: action.payload,
        success: false,
        buttonText: 'Save',
      };
    case 'bill':
      return {
        ...state,
        error: false,
        bill: action.payload,
        success: false,
        buttonText: 'Save',
      };
    case 'type':
      return {
        ...state,
        error: false,
        type: action.payload,
        success: false,
        buttonText: 'Save',
      };
    case 'submitStart':
      return { ...state, buttonText: 'Sending...' };
    case 'error':
      return { ...state, buttonText: 'Error', error: action.payload };
    case 'success':
      return {
        ...state,
        sent: true,
        name: '',
        amount: '',
        bill: '',
        type:'',
        buttonText: 'Sent',
        success: true,
      };
    default:
      return state;
  }
};

const ContactForm =() => {
  const [formState, dispatch] = useReducer(reducer, {
    amount: '',
    name: '',
    bill: '',
    type:'',
    sent: false,
    buttonText: 'Save',
    success: false,
    error: false,
  });


  const { amount, name, bill,type, buttonText, success, error } = formState;

  const clickSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'submitStart' });
    emailContactForm({ amount, name, bill,type }).then(data => {
      if (data.error) {
        dispatch({ type: 'error', payload: data.error });
      } else {
        
    fetch('http://localhost:3000/api/product')
      .then((resp) => resp.json())
      .then((data) =>  setRowData(data));
        dispatch({ type: 'success' });
      }
    });
  };

  const handleChange = (e, name) => {
    dispatch({ type: name, payload: e.target.value });
  };

  const showSuccess = () => {
    return (
      success && (
        <div className="alert alert-info">Successfully Save.</div>
      )
    );
  };

  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const contactForm = () => {
    return (
      <form className="pb-5" onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="lead">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => handleChange(e, 'name')}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="lead">Bill No</label>
          <input
            type="text"
            value={bill}
            onChange={e => handleChange(e, 'bill')}
            className="form-control"
          />
        </div>
         <div className="form-group">
          <label className="lead">Type</label>
         
          <select name="type" className="form-control" value={type} onChange={e => handleChange(e, 'type')}>
             <option value="">Select</option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </div>
        <div className="form-group">
          <label className="lead">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={e => handleChange(e, 'amount')}
            className="form-control"
          />
        </div>

        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </form>
    );
  };


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

  var checkboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0;
};

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {contactForm()}

   <h4 className="text-center p-3 mb-5 display-4 jumbotron">Transation</h4>
    <div style={{ paddingBottom:"10px" }}></div>
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
     <div style={{ paddingBottom:"50px" }}></div>
    </React.Fragment>
  );
};

export default ContactForm;