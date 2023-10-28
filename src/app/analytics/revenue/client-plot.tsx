"use client"

import React, { FunctionComponent } from 'react'
import Plot from 'react-plotly.js'

interface ClientPlot {
    data: any[]
    title: string
    barmode?: string
}

const ClientPlot: FunctionComponent<ClientPlot> = ({ data, title, barmode}) => {
  return (
    <Plot
        // @ts-ignore
          data={data}
          layout={{
            width: 900,
            height: 700,
            title: title,
            // @ts-ignore
            barmode: barmode,
          }}
    />
  )
}

export default ClientPlot