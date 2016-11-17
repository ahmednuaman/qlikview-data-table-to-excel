import React from 'react'
import xlsx from 'xlsx'

const startExport = (event) => {

}

export default ({ headers, rows }) => (
  <a className='export-button' onClick={startExport}>
    Export data to Excel
  </a>
)
