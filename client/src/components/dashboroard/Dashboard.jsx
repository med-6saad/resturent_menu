import React from 'react'
import './dashboard.css'

import { PieChart,Pie,BarChart,RadialBar,Legend,Bar,RadialBarChart,Sector, Cell,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  //start 1...

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  //end 111
  //start 2...
  const data22 = [
    {
      name: '18-24',
      uv: 31.47,
      pv: 2400,
      fill: '#8884d8',
    },
    {
      name: '25-29',
      uv: 26.69,
      pv: 4567,
      fill: '#83a6ed',
    },
    {
      name: '30-34',
      uv: 15.69,
      pv: 1398,
      fill: '#8dd1e1',
    },
    {
      name: '35-39',
      uv: 8.22,
      pv: 9800,
      fill: '#82ca9d',
    },
    {
      name: '40-49',
      uv: 8.63,
      pv: 3908,
      fill: '#a4de6c',
    },
    {
      name: '50+',
      uv: 2.63,
      pv: 4800,
      fill: '#d0ed57',
    },
    {
      name: 'unknow',
      uv: 6.67,
      pv: 4800,
      fill: '#ffc658',
    },
  ];
  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };
  //end 222
  const data2 = [
    {
      name: 'January',
      Iphone: 4000
    },
    {
      name: "March",
      Iphone: 1000,
    },
    {
      name: "May",
      Iphone: 4000,
    },
    {
      name: "July",
      Iphone: 800,
    },
    {
      name: "October",
      Iphone: 1500,
    },
  ];

  const data=[
    {name:'Facebook',users:20000000},
    {name:'Instagram',users:12000000},
    {name:'Twiter',users:10000000},
    {name:'Telegram',users:5000000}
  ]
  const dataP = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  return (
    <div className='dashboardContainer'>
      <div className="dashboadWopper">
        <div className="topDashboard">
          <h2>Dashboard</h2>
        </div>
        <div className="centerDashboard1">
          <div className="money">
            <div className="girl">
              <h3>14</h3>
              <h6>test</h6>
            </div>
            <span className="lineBetween"></span>
            <div className="girl">
              <h3>14</h3>
              <h6>test</h6>
            </div>
          </div>
          <div className="money">
              <div className="girl">
                <h3>14</h3>
                <h6>test</h6>
              </div>
              <span className="lineBetween">

              </span>
              <div className="girl">
                <h3>14</h3>
                <h6>test</h6>
              </div>
          </div>
          <div className="money">
              <div className="girl">
                <h3>14</h3>
                <h6>test</h6>
              </div>
              <span className="lineBetween">

              </span>
              <div className="girl">
                <h3>14</h3>
                <h6>test</h6>
              </div>
            </div>
        </div>
        <div className="cetnerDashboard2">
          <div className="dash A">
            <PieChart width={200} height={200}>
              <Pie
                data={dataP}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="dash B">
            <BarChart
              width={400}
              height={200}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 ,top:10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="users" isAnimationActive={true} fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
          </div>
          <div className="dash C">
          <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="40%" cy="50%" innerRadius="15%" outerRadius="60%" barSize={10} data={data22}>
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="uv"
            />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
          </RadialBarChart>
        </ResponsiveContainer>
          </div>
        </div>
        <div className="bottomDashboard">
          <LineChart
              width={850}
              height={300}
              data={data2}
              margin={{
                top: 15,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
            <CartesianGrid  horizontal="true" vertical="" stroke="#243240"/>
            <XAxis dataKey="name" scale={'point'} tick={{fill:"#000"}}/>
            <YAxis tick={{fill:"#fff"}} />
            <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#000" }} itemStyle={{ color: "#000" }} cursor={true}/>
            <Line type="monotone" dataKey="Iphone" stroke="#8884d8" strokeWidth="5" dot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 2,r:5}} activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 5,r:10}} />
            
          </LineChart>
        </div>
      </div>
    </div>
  )
}

export default Dashboard