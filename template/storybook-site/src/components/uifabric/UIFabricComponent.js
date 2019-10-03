import React, {Component} from 'react';

import './UIFabricComponent.css';

import columns from './columnDefs'
import data from './rowData'
//import {Fabric} from 'office-ui-fabric-react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList} from 'office-ui-fabric-react/lib/DetailsList';

export default class UIFabricComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columnDefs: columns,
        rowData: data
      }
    }
  
  render() {
    return (
      <div className="App" style={{ height: '800px', width: '100%' }}>
        <Fabric style={{ height: '800px', width: '100%' }}>
          <DetailsList 
            compact={true}
            items={ this.state.rowData } 
            columns={ this.state.columnDefs }              
          />        
        </Fabric>
      </div>
    );
  }
}
