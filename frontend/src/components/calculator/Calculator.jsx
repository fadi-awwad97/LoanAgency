import React, { useState } from 'react';
import './calculator.css'

function Calculator() {
  // state to storage the values given by the user when filling the input fields
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  // state to storage the results of the calculation
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });

  // state to storage error message
  const [error, setError] = useState('');

  // event handler to update state when the user enters values

  const handleInputChange = (event) =>
    setUserValues({ ...userValues, [event.target.name]: event.target.value });

    
  const isValid = () => {
    const { amount, interest, years } = userValues;
    let actualError = '';
   
    if (!amount || !interest || !years) {
      actualError = 'All the values are required';
    }
    
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      actualError = 'All the values must be a valid number';
    }
    
    if (Number(amount) <= 0 || Number(interest) <= 0 || Number(years) <= 0) {
      actualError = 'All the values must be a positive number';
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

  // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError('');
      calculateResults(userValues);
    }
  };

  // Calculation
  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

     
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

  // Clear input fields
  const clearFields = () => {
    setUserValues({
      amount: '',
      interest: '',
      years: '',
    });

    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  };

  return (
    <div className='calculator'>
      <div className='form'>
        {/* <h1>Loan Calculator</h1> */}
        {/* Display the error when it exists */}
        <p className='error'>{error}</p>
        <form onSubmit={handleSubmitValues}>
          {/* ternary operator manages when the calculator and results will be displayed to the user */}
          {!results.isResult ? (
            //   Form to collect data from the user
            <div className='form-items'>
              <div className="items">
                <label id='label'>Amount:</label>
                <input
                  type='text'
                  name='amount'
                  placeholder='Loan Amount'
                  value={userValues.amount}
                  // onChange method sets the values given by the user as input to the userValues state
                  onChange={handleInputChange}
                />
              </div>
              <div className="items">
                <label id='label'>Interest:</label>
                <input
                  type='text'
                  name='interest'
                  placeholder='Interest'
                  value={userValues.interest}
                  onChange={handleInputChange}
                />
              </div>
              <div className="items">
                <label id='label'>Years:</label>
                <input
                  type='text'
                  name='years'
                  placeholder='Years To Repay'
                  value={userValues.years}
                  onChange={handleInputChange}
                />
              </div>
              <input type='submit' className='button' />
            </div>
          ) : (
            //   Form to display the results to the user
            <div className='form-items'>
              <h4>
                Loan Amount: ${userValues.amount} <br /> Interest:{' '}
                {userValues.interest}% <br /> Years To Repay: {userValues.years}
              </h4>
              <div className="items">
                <label id='label'>Monthly Payment:</label>
                <div className="result"><span className="s">{results.monthlyPayment}</span></div>
              </div>
              <div className="items">
                <label id='label'>Total Payment: </label>
                <div className="result"><span className="s">{results.totalPayment}</span></div>
              </div>
              <div className="items">
                <label id='label'>Total Interest:</label>
                <div className="result"><span className="s">{results.totalInterest}</span></div>
              </div>
              {/* Button to clear fields */}
              <input
                className='button'
                value='Calculate again'
                type='button'
                onClick={clearFields}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Calculator;