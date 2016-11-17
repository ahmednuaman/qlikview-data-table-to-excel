import { render } from 'react-dom'

import _ from 'lodash'
import QlikTable from './qlik-table'
import React from 'react'

const extract = (col) => col.text

export default (data, element) => {
  const headers = data.HeaderRows[0].map(extract)
  const rows = data.Rows.map((row) => row.map(extract))

  render(<QlikTable headers={headers} rows={rows} />, element)
}
