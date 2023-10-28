"use client";

import React, { type FunctionComponent } from "react";
import Plot from "react-plotly.js";

interface ClientPlot {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  title: string;
  barmode?: string;
  width: number;
  height: number;
}

const ClientPlot: FunctionComponent<ClientPlot> = ({
  data,
  title,
  barmode,
  height,
  width,
}) => {
  return (
    <Plot
      data={data}
      layout={{
        width: width,
        height: height,
        title: title,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        barmode: barmode,
      }}
    />
  );
};

export default ClientPlot;
