import React, {Component} from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  sortable,
  SortByDirection,
  headerCol,
  TableVariant,
  expandable,
  cellWidth
} from '@patternfly/react-table';

import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/patternfly/patternfly.css';
import './PatternFlyComponent.css';

import columns from './columnDefs'
import data from './rowData'


export default class PatternFlyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: columns,
      rows: data,
      sortBy: {}
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort(_event, index, direction) {
    const sortedRows = this.state.rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
    this.setState({
      sortBy: {
        index,
        direction
      },
      rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
    });
  }

  render() {
    const { columnDefs, rows, sortBy } = this.state;

    return (
      <Table caption="Sortable Table" variant={TableVariant.compact} sortBy={sortBy} onSort={this.onSort} cells={columnDefs} rows={rows}>
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}
