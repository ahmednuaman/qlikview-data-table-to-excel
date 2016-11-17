import { Cell, Column, Table } from 'fixed-data-table'

import React from 'react'

class QlikTable extends React.Component {
  maxRows = 10
  state = {
    rowHeight: 50,
    tableHeight: 50,
    tableWidth: 1000
  }
  timeout = 16

  resize () {
    window.clearTimeout(this.updateTimeout)
    this.updateTimeout = window.setTimeout(this.update.bind(this), this.timeout)
  }

  update () {
    const rows = this.props.rows.length > this.maxRows ? this.maxRows : this.props.rows.length

    this.setState({
      tableHeight: rows * this.state.rowHeight,
      tableWidth: window.innerWidth
    })
  }

  componentDidMount () {
    this.update()
    window.addEventListener('resize', this.resize.bind(this), false)
  }

  render () {
    return (
      <Table
        rowHeight={this.state.rowHeight}
        rowsCount={this.props.rows.length}
        width={this.state.tableWidth}
        height={this.state.tableHeight}
        headerHeight={this.state.rowHeight}>
        {
          this.props.headers.map((col, colIndex) =>
            <Column
              key={colIndex}
              header={<Cell>{col}</Cell>}
              cell={({ rowIndex }) => (
                <Cell>
                  {this.props.rows[rowIndex][colIndex]}
                </Cell>
              )}
              flexGrow={1}
              width={100}
            />
          )
        }
      </Table>
    )
  }
}

export default QlikTable
