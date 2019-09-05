import React, {Component} from 'react';
import { DataTable, Button } from 'carbon-components-react';

import {Download24,Edit24,Settings24 } from '@carbon/icons-react';

import 'carbon-components/css/carbon-components.css';
import './CarbonComponent.css';

import columns from './columnDefs'
import data from './rowData'

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableToolbar,
  TableToolbarSearch,
  TableToolbarContent,
  TableToolbarAction
} = DataTable;


export default class CarbonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: columns,
      rowData: data
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.action = this.action.bind(this);
  }

  onInputChange(e){

  }

  action(e){
    console.log(e);
  }

  render() {
    return (
      <div className="App">
        <DataTable
          rows={this.state.rowData}
          headers={this.state.columnDefs}
          useZebraStyles={false}
          isSortable={true}
          size={null}
          render={({ rows, headers, getHeaderProps }) => (
            <TableContainer title="DataTable">
              <TableToolbar>
                {/* pass in `onInputChange` change here to make filtering work */}
                <TableToolbarSearch onChange={this.onInputChange} />
                <TableToolbarContent>
                  <TableToolbarAction
                    icondescription="Download"
                    onClick={(e)=> {this.action('TableToolbarAction - Download')}}
                    ><Download24 /></TableToolbarAction>
                  
                  <TableToolbarAction
                    icondescription="Edit"
                    onClick={(e)=> {this.action('TableToolbarAction - Edit')}}
                    ><Edit24 /></TableToolbarAction>
            
                  <TableToolbarAction
                    icondescription="Settings"
                    onClick={(e)=> {this.action('TableToolbarAction - Settings')}}
                    ><Settings24 /></TableToolbarAction>
                  <Button onClick={this.action('Add new row')} size="small" kind="primary">
                    Add new
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
      </div>
    );
  }
}

