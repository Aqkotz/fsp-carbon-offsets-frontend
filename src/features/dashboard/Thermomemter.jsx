import React from 'react';
import FusionCharts from 'fusioncharts';
import ReactFC from 'react-fusioncharts';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, PowerCharts, FusionTheme);

export default function Thermometer(props) {
  const { points } = props;
  console.log('points', points);
  // const dataSource = {
  //   chart: {
  //     caption: 'Team Goal Carbon Meter',
  //     lowerlimit: '0',
  //     upperlimit: '200',
  //     numbersuffix: 'kg CO2e',
  //     thmfillcolor: '#008ee4',
  //     showgaugeborder: '1',
  //     gaugebordercolor: '#008ee4',
  //     gaugeborderthickness: '2',
  //     theme: 'candy',
  //     showvalue: '1',
  //   },
  //   value: '140',
  // };
  const dataSource = {
    chart: {
      caption: 'Car Engine Temperature',
      subcaption: '(Per Quarter minute)',
      lowerlimit: '120',
      upperlimit: '200',
      numbersuffix: '°F',
      thmfillcolor: '#008ee4',
      showgaugeborder: '1',
      gaugebordercolor: '#008ee4',
      gaugeborderthickness: '2',
      plottooltext: 'Temperature: <b>$datavalue</b> ',
      theme: 'candy',
      showvalue: '1',
    },
    value: '140',
  };
  console.log('dataSource', dataSource);

  return (
    <ReactFC
      type="thermometer"
      width="100%"
      height="100%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}
