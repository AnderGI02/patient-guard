import { LineChart, Line, ResponsiveContainer,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';
import { dataArray } from '../utils/readReport.mjs';

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, 
{name: '2009', uv: 400, pv: 2200, amt: 2000},
{name: 'Page C', uv: 500, pv: 1400, amt: 1800},
{name: 'Page D', uv: 700, pv: 2600, amt: 1300},
{name: 'Page E', uv: 400, pv: 1800, amt: 2400},
{name: 'Page F', uv: 600, pv: 2400, amt: 2300}];



export function Chart(){
    return (
        
        <LineChart
          width={500}
          height={300}
          data={dataArray}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
         
          <Line type="monotone" dataKey="individuals" stroke="#82ca9d" />
          
        </LineChart>
          )
}



