import { render } from 'react-dom'

import ExportButton from './export-button'
import QlikTable from './qlik-table'
import React from 'react'

const extract = (col) => col.text

export default (data, element) => {
  const headers = data.HeaderRows[0].map(extract)
  const rows = data.Rows.map((row) => row.map(extract))

  render(
    <div>
      <QlikTable headers={headers} rows={rows} />
      <ExportButton data={[headers].concat(rows)} />
    </div>,
    element
  )
}
