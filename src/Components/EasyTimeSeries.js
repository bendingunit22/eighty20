import React from 'react';
import { ResponsiveContainer, CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis, Tooltip } from 'recharts';
import {Container} from 'reactstrap';


export default function EasyTimeSeries({data}){
    const foo = JSON.parse({data}.data)
    const processed = foo.map((rec) => ({x: Date.parse(rec[1].stringValue), y: rec[5].longValue}));
    const minX = Math.min(...processed.map((d) => d.x));
    const minY = Math.min(...processed.map((d) => d.y));
    const maxY = Math.max(...processed.map((d) => d.y));
    const domain = Math.floor(Math.max(Math.abs(minY), Math.abs(maxY))/50)*50 + 50;

    const dateFormatter = (date_num) => {
        return new Date(date_num).toLocaleDateString('en-US')
    }

    const gradientOffset = () => {
        const dataMax = Math.max(...processed.map((i) => i.y));
        const dataMin = Math.min(...processed.map((i) => i.y));
      
        if (dataMax <= 0){
            return 0
        }
        else if (dataMin >= 0){
            return 1
        }
        else{
            return dataMax / (dataMax - dataMin);
        }
      }
      
    const off = gradientOffset();
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`Needed: ${payload[0].value}`}<br></br>{`${dateFormatter(label)}`}</p>
            </div>
          );
        }
    }

    return (
        <Container className="responsiveWrapper">
        <ResponsiveContainer 
            className="easyChart"
            width = {600}
            height = "100%"
            style={{paddingLeft: "5px"}}
            >
            <LineChart
                width={550}
                height={300}
                minWidth={500}
                minHeight={300}
                margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />

            <YAxis
                dataKey="y"
                domain={[-domain, domain]}
                type="number"
                label={{
                    value: `Easy minutes needed`,
                    style: { textAnchor: 'middle' },
                    angle: -90,
                    position: 'left',
                    offset: 0,
                }}
                allowDataOverflow={true}
                strokeWidth={minX < 0 ? 0 : 1}
                tickMargin={5}
            />

            <XAxis
                dataKey="x"
                domain={['auto', 'auto']}
                type="number"
                tickFormatter={dateFormatter}
                allowDataOverflow={true}
                strokeWidth={minY < 0 ? 0 : 1}
                tickMargin={15}
            />
            {minY < 0 && (
                <ReferenceLine
                y={0}
                stroke="black"
                strokeWidth={1.5}
                strokeOpacity={0.65}
                />
            )}

            <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={off} stopColor="#76e8a6" stopOpacity={1}/>
                    <stop offset={off} stopColor="#e85168" stopOpacity={1}/>
                </linearGradient>
            </defs>
            <Line
                strokeWidth={2}
                data={processed}
                dot={{stroke: "black"}}
                type="monotone"
                dataKey="y"
                stroke="url(#splitColor)" 
            />
            <Tooltip content={<CustomTooltip />}></Tooltip>
            </LineChart>
        </ResponsiveContainer>
        </Container>
        )
}