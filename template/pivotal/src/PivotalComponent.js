import React, {Component} from 'react';
import {SortableFlexTable} from 'pivotal-ui/react/table';
import './PivotalComponent.css';

import columns from './columnDefs'
import data from './rowData'

export default class PivotalComponent extends Component {
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
        <SortableFlexTable 
          columns={this.state.columnDefs} 
          data={this.state.rowData} 
        defaultSort="instances"/>
      </div>
    );
  }
}
