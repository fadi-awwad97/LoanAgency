
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Chart, Series } from 'devextreme-react/chart';
import Paper from '@material-ui/core/Paper';
import './barChart.css';


export default function BarChart(data0) {
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
  
  },[data0]);
 
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
      <Paper>
     <Chart id="chart" dataSource={dataSource} >
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


