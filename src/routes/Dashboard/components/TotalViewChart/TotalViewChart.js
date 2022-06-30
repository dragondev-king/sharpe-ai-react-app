import { useRef } from "react";
import { Box } from "@material-ui/core";
import { VictoryLine, VictoryChart } from "victory";

import { useClientSize } from "../../../../hooks/victory";
import './style.scss'

const TotalViewChart = ({title}) => {
  
  const data=[
    {x: '', y: 0},
    { x: 'JAN', y: 0 },
    { x: 'FEB', y: 0},
    { x: 'MAR', y: title*0.005},
    { x: 'APR', y: title*0.01 },
    { x: '', y: title*1.5},
    { x: 'JUNE', y: title },
    { x: 'JUL', y: 0 },
    { x: 'AUG', y: 0 },
    { x: 'SEP', y: 0 },
    { x: 'OCT', y: 0 },
    { x: 'NOV', y: 0 },
    { x: 'DEC', y: 0 },
  ]
  const chartTheme = {
    axis: {
      style: {
        axis: {
          stroke: 'white',  //CHANGE COLOR OF X-AXIS
          strokeOpacity: "0.1",
        },
        tickLabels: {
          fill: 'rgba(255, 255, 255, 0.6)',
          padding: 10
        },
        grid: {
          stroke: 'white', //CHANGE COLOR OF X-AXIS GRID LINES
          strokeOpacity: "0.1",
        }
      },
    },
  };
  const ref = useRef()
  const size = useClientSize(ref, undefined, 400)
  return (
    <div className="chart-wrapper">
      <Box itemRef={ref}>
        <div className="title-wrapper">
          <p>Total Value Locked</p>
          <div className="date-wrapper">
            <label>1M</label>
            <label>1Y</label>
          </div>
        </div>
        <VictoryChart {...size} theme={chartTheme}>
          <VictoryLine
            style={{
              data: { stroke: '#00FF57'},
              labels: {fill: '#000'},
              parent: { border: "10px solid #fff" },
            }}
            data={data}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
          />
        </VictoryChart>
      </Box>
    </div>
  );
};

export default TotalViewChart;
