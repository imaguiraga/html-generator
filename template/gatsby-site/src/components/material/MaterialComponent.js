import React, {Component} from 'react';
import {MDCDataTable} from '@material/data-table';
import '@material/data-table/dist/mdc.data-table.css';
import '@material/checkbox/dist/mdc.checkbox.css';
import './MaterialComponent.css';

import columns from './columnDefs'
import data from './rowData'

export default class MaterialComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: columns,
      rowData: data
    }
    this.decorateElement = this.decorateElement.bind(this);
  }
  
  decorateElement(/** @type {string} */tableId){
    // Decorate HTMLElement
    this.datatable = new MDCDataTable(document.querySelector(tableId));

  }

  componentDidMount(){
    this.decorateElement('#table');
  }

  render() {
    const {columnDefs,rowData} = this.state;

    return (
      <div className="App">
        <div className="mdc-data-table" id="table">
          <table className="mdc-data-table__table table-fixedx" aria-label="Dessert calories">
            <thead>
              <tr className="mdc-data-table__header-row">
                <th className="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" role="columnheader" scope="col">
                  <div className="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected">
                    <input type="checkbox" className="mdc-checkbox__native-control" aria-label="Checkbox for header row selection"/>
                    <div className="mdc-checkbox__background">
                      <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                        <path className="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                      </svg>
                      <div className="mdc-checkbox__mixedmark"></div>
                    </div>
                  </div>
                </th>
                {// Render Header Cells
                  columnDefs.map((column,index,arr) => (
                    <th key={index} className="mdc-data-table__header-cell" 
                      role="columnheader" scope="col">{column.headerName}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody className="mdc-data-table__content">
            {// Render rows
              rowData.map((row,index,arr) => (
                <tr key={row.id} data-row-id={row.id} className="mdc-data-table__row">
                  <td className="mdc-data-table__cell mdc-data-table__cell--checkbox">
                    <div className="mdc-checkbox mdc-data-table__row-checkbox">
                      <input type="checkbox" className="mdc-checkbox__native-control" aria-labelledby="u0"/>
                      <div className="mdc-checkbox__background">
                        <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                          <path className="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                        </svg>
                        <div className="mdc-checkbox__mixedmark"></div>
                      </div>
                    </div>
                  </td>
                  {// Render Row Cells
                    columnDefs.map((column,index,arr) => (
                      <td key={index} className="mdc-data-table__cell">{row[column.field]}</td>
                    ))
                  }
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
