import React, {Component} from 'react';
import { DataTable, Button } from 'carbon-components-react';

import {
  Download16 as DownloadIcon,
  Edit16 as EditIcon,
  Delete16 as DeleteIcon,
  Save16 as SaveIcon,
  Settings16 as SettingsIcon 
} from '@carbon/icons-react';

import 'carbon-components/css/carbon-components.css';
import './CarbonComponent.css';

import columns from './columnDefs'
import data from './rowData'

const {
  Table,
  TableActionList,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu
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
    this.batchActionClick = this.batchActionClick.bind(this);
  }

  onInputChange(e){

  }

  action(e){
    console.log(e);
  }

  batchActionClick(selectedRows){
    console.log('selected');
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
          {...this.props}
          render={({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getSelectionProps,
              getBatchActionProps,
              onInputChange,
              selectedRows,
              getTableProps,
            }) => (
            <TableContainer title="DataTable">
              <TableToolbar>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    renderIcon={DeleteIcon}
                    icondescription="Delete the selected rows"
                    onClick={this.batchActionClick(selectedRows)}>
                    Delete
                  </TableBatchAction>
                  <TableBatchAction
                    renderIcon={SaveIcon}
                    icondescription="Save the selected rows"
                    onClick={this.batchActionClick(selectedRows)}>
                    Save
                  </TableBatchAction>
                  <TableBatchAction
                    renderIcon={DownloadIcon}
                    icondescription="Download the selected rows"
                    onClick={this.batchActionClick(selectedRows)}>
                    Download
                  </TableBatchAction>
                </TableBatchActions>

                <TableToolbarContent>
                  <TableToolbarSearch persistent={true} onChange={this.onInputChange} /> 
  
                  <TableToolbarContent>               
                    <TableToolbarAction 
                      icondescription="Download"
                      onClick={(e)=> {this.action('TableToolbarAction - Download')}}>
                      <DownloadIcon />
                    </TableToolbarAction>
                    
                    <TableToolbarAction
                      icondescription="Edit"
                      onClick={(e)=> {this.action('TableToolbarAction - Edit')}}>
                      <EditIcon />
                    </TableToolbarAction>
              
                    <TableToolbarAction
                      icondescription="Settings"
                      onClick={(e)=> {this.action('TableToolbarAction - Settings')}}>
                      <SettingsIcon />
                    </TableToolbarAction> 
                  </TableToolbarContent>
                  <TableToolbarMenu>
                    <TableToolbarAction primaryFocus onClick={() => alert('Alert 1')}>
                      Action 1
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 2')}>
                      Action 2
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 3')}>
                      Action 3
                    </TableToolbarAction>
                  </TableToolbarMenu>
                  <Button onClick={this.action('Add new row')} size="small" kind="primary">
                    Add new
                  </Button>               
                </TableToolbarContent>

              </TableToolbar>

              <section className="bx--data-table_inner-container"> 
              <Table shouldShowBorder={true} className="bx--data-table--sticky-header" >
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
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
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
              </section>
            </TableContainer>
          )}
        />
      </div>
    );
  }
}

