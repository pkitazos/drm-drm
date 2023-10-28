"use client";

import React, { type FunctionComponent } from "react";
import Plot from "react-plotly.js";

interface ClientPlot {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  title: string;
  barmode?: string;
}

const ClientPlot: FunctionComponent<ClientPlot> = ({
  data,
  title,
  barmode,
}) => {
  return (
    <Plot
      data={data}
      layout={{
        width: 900,
        height: 700,
        title: title,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        barmode: barmode,
      }}
    />
  );
};

export default ClientPlot;
