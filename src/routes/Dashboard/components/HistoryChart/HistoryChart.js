import { useRef } from "react";
import { Box } from "@material-ui/core";
import { VictoryLine } from "victory";
import CountUp  from 'react-countup';

import { useClientSize } from "../../../../hooks/victory";
import "./style.scss";


const HistoryChart = ({value, text, graphColor}) => {
  const data=[
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 2 },
  { x: 4, y: 2.3},
  { x: 5, y: 4 },
  { x: 6, y: 7 },
  { x: 7, y: 5 },
  { x: 8, y: 4 },
  { x: 9, y: 7 },
]

  const ref = useRef()
  const size = useClientSize(ref, undefined, 150)
  return (
    <div className="history-chart">
      <Box itemRef={ref}>
        <VictoryLine
          {...size}
          style={{
            data: { stroke: graphColor },
            parent: { border: "1px solid #eee" },
          }}
          data={data}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        />
        <div className="data-wrapper">
          <p>$<CountUp end={value} duration={1} /></p>
          <h4>{text}</h4>
        </div>
      </Box>
    </div>
  );
};

export default HistoryChart;
