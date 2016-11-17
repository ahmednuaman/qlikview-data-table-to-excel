import { Cell, Column, Table } from 'fixed-data-table'
import { render } from 'react-dom'

import _ from 'lodash'
import React from 'react'

class QlikTable extends React.Component {
  state = {
    tableWidth: 1000
  }
  timeout = 16

  resize () {
    window.clearTimeout(this.updateTimeout)
    this.updateTimeout = window.setTimeout(this.update.bind(this), this.timeout)
  }

  update () {
    this.setState({
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
        rowHeight={50}
        rowsCount={this.props.rows.length}
        width={this.state.tableWidth}
        height={500}
        headerHeight={50}>
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
              width={100}
              flexGrow={1}
            />
          )
        }
      </Table>
    )
  }
}

const extract = (col) => col.text

export default (data, element) => {
  const headers = data.HeaderRows[0].map(extract)
  const rows = data.Rows.map((row) => row.map(extract))

  render(<QlikTable headers={headers} rows={rows} />, element)
}
