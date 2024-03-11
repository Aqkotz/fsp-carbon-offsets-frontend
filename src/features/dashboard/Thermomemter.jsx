import React from 'react';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);

export default function Thermometer(props) {
  const { points } = props;
  console.log('points', points);
  const dataSource = {
    chart: {
      caption: 'Team Goal Carbon Meter',
      lowerlimit: '0',
      upperlimit: `${points.CarbonReduction}`,
      numbersuffix: 'kg CO2e',
      thmfillcolor: '#008ee4',
      showgaugeborder: '1',
      gaugebordercolor: '#008ee4',
      gaugeborderthickness: '2',
      theme: 'candy',
      showvalue: '1',
    },
    value: points.actualCarbonReduction,
  };

  return (
    <ReactFusioncharts
      type="thermometer"
      width="100%"
      height="100%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}
