import React, {Component} from 'react';
import {SortableFlexTable} from 'pivotal-ui/react/table';
import logo from './logo.svg';
import './PatternFlyComponent.css';

import columns from './columnDefs'
import data from './rowData'

export default class PatternFlyComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columnDefs: columns,
        rowData: data
      }
    }
  
  render() {
    return (
      <div className="App">
        <TablePfProvider
            striped
            bordered
            hover
            columns={this.state.columnDefs}
          >
          <Header/>
          <Body rows={this.state.rowData} rowKey="id" />
        </TablePfProvider>
      </div>
    );
  }
}
