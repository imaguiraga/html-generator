import React, {Component} from 'react';
import { DataTable } from 'carbon-components-react';
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

import './CarbonComponent.css';

import columns from './columnDefs'
import data from './rowData'

export default class CarbonComponent extends Component {
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
        <DataTable
          rows={this.state.rowData}
          headers={this.state.columnDefs}
          useZebraStyles={false}
          isSortable={true}
          size={null}
          render={({ rows, headers, getHeaderProps }) => (
            <TableContainer title="DataTable">
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

