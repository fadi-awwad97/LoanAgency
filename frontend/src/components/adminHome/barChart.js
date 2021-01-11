// import * as React from 'react';
// import Paper from '@material-ui/core/Paper';
// import {
//   Chart,
//   PieSeries,
//   Title,
// } from '@devexpress/dx-react-chart-material-ui';

// import { Animation } from '@devexpress/dx-react-chart';

// const data = [
//   { country: 'Russia', area: 12 },
//   { country: 'Canada', area: 7 },
//   { country: 'USA', area: 7 },
//   { country: 'China', area: 7 },
//   { country: 'Brazil', area: 6 },
//   { country: 'Australia', area: 5 },
//   { country: 'India', area: 2 },
//   { country: 'Others', area: 55 },
// ];
// export default class Demo extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data,
//     };
//   }

//   render() {
//     const { data: chartData } = this.state;

//     return (
//     <div style={{border:'1px solid red',height:'200px'}}>
//       <Paper >
//         <Chart
//           data={chartData}
//           style={{border:'1px solid red',height:'100px'}}
//         >
//           <PieSeries
//             valueField="area"
//             argumentField="country"
//           />
//           <Title
//             text="Area of Countries"
//           />
//           <Animation />
//         </Chart>
//       </Paper>
//       </div>
//     );
//   }
// }
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Chart, Series } from 'devextreme-react/chart';
// import { dataSource } from './data.js';
import Paper from '@material-ui/core/Paper';
export default function BarChart() {
  const [data, setData] = useState([]);
  const [longTerm,setLongTerm]=useState(0);
  const [wedding,setWedding]=useState(0);
  const [shortTerm,setShortTerm]=useState(0);
  const [studentLoan,setStudentLoan]=useState(0);


  useEffect(async () => {
    const result = await axios(
      'http://localhost:5000/user/getUserData',
    );
    const result2 = await axios(
      'http://localhost:5000/user/getStudentData',
    );
    setStudentLoan(result2.data.length)
    // setData(result.data);
    var long=0;
    var wedding=0;
    var short=0;
    result.data.forEach(function (dataArray) {
      
      if(dataArray.loanOption==="LONG TERM LOAN"){
       long +=1;
       setLongTerm(long);
      }

      if(dataArray.loanOption==="Wedding LOAN"){
        wedding +=1;
        setWedding( wedding );
      }
     
      if(dataArray.loanOption==="SHORT TERM LOAN"){
        short +=1
        setShortTerm( short );
      }
      
      
      
  })
  

  },[]);
 



  const dataSource = [{
    type: 'Long Term Loans',
    number: longTerm
  }, {
    type: 'Short Term Loans',
    number: shortTerm
  }, {
    type: 'Wedding Loans',
    number: wedding
  }, {
    type: 'Student Loans',
    number: studentLoan

  }];
  
 
    return (
      // <Chart id="chart" dataSource={dataSource}>
      <Paper>
     <Chart id="chart" dataSource={dataSource} style={{width:'80%',marginLeft:'10%',height:'10%'}}>
        <Series
          valueField="number"
          argumentField="type"
          name="My Stats"
          type="bar"
          color="#ffaa66" />
      </Chart>
      </Paper>
    );
  }


