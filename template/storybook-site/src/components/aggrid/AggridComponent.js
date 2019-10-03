import React, { Component } from 'react';
import logo from './logo.svg';
import './AggridComponent.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import columns from './columnDefs'
import rows from './rowData'

class AggridComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: columns,
      rowData: rows
    }
  }

  render() {
    return (
      <div 
        className="ag-theme-balham"
        style={{ height: '800px', width: '100%' }}  
      >
        <AgGridReact style={{ height: '100%', width: '100%' }} 
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}>
        </AgGridReact>
      </div>
    );
  }
}

export default AggridComponent;