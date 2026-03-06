import React from 'react'
import { calculateInvestmentResults, formatter } from '../util/investment'

const Result = ({input}) => {
    const resultData = calculateInvestmentResults(input);
    console.log(resultData)
    const initialInvestment =
        resultData[0].valueEndOfYear - 
        resultData[0].interest - 
        resultData[0].annualInvestment;

  return (
    <table id="result">
        <thead>
            <tr>
                <th>Year</th>
                <th>Invertment Value</th>
                <th>Interest (Year)</th>
                <th>Total Interest(총이자)</th>
                <th>Invested Capital(투자자본)</th>
            </tr>
        </thead>
        <tbody>
            {resultData.map(yearData => {
                const totalInterest = 
                    yearData.valueEndOfYear - 
                    yearData.annualInvestment*yearData.year - 
                    initialInvestment;
                const totalAmountInvestment = yearData.valueEndOfYear - totalInterest    
                return <tr key={yearData.year}>
                    <td>{yearData.year}</td>
                    <td>{formatter.format(yearData.valueEndOfYear)}</td>
                    <td>{formatter.format(yearData.interest)}</td>
                    <td>{formatter.format(totalInterest)}</td>
                    <td>{formatter.format(totalAmountInvestment)}</td>
                </tr>
            })}
        </tbody>
    </table>
  )
}

export default Result