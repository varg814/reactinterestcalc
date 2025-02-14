import { useState } from "react";
import "./App.css";

function App() {
  const [mortgage, setMortgage] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [monthly, setMonthly] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [mode, setMode] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);
  const interest = 5.25;

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const calculate = () => {
    const monthlyRate = interest / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;

    const monthlyPayment =
      (mortgage * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    const totalPaid = monthlyPayment * numberOfPayments;
    const totalInterestPaid = totalPaid - mortgage;

    setMonthly(monthlyPayment.toFixed(0));
    setTotal(totalPaid.toFixed(0));
    setTotalInterest(totalInterestPaid.toFixed(0));
    setIsCalculated(true);
  };

  return (
    <div className="app">
      <div className="content">
        <div className="main_wrapper">
          <div className="input_container">
            <div className="input_wrapper">
              <label>Mortgage Amount</label>
              <input
                required
                className="input_a"
                onChange={handleInputChange(setMortgage)}
                value={mortgage}
              />
            </div>

            <div className="lower_inputs">
              <div className="input_wrapper width_input">
                <label>Mortgage Term</label>
                <input
                  required
                  className=" input_years"
                  onChange={handleInputChange(setMortgageTerm)}
                  value={mortgageTerm}
                />
              </div>

              <div className="input_wrapper width_input">
                <label>Interest Rate</label>
                <input
                  className=" input_rate"
                  type="text"
                  value={interest}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="mode_buttons">
            <h1>Mortgage Type</h1>
            <button
              onClick={() => setMode(mode === "repayment" ? null : "repayment")}
              className={`mode_button ${
                mode === "repayment" ? "active" : "inactive"
              }`}
            >
              Repayment
            </button>
            <button
              onClick={() =>
                setMode(mode === "interestOnly" ? null : "interestOnly")
              }
              className={`mode_button ${
                mode === "interestOnly" ? "active" : "inactive"
              }`}
            >
              Interest Only
            </button>
          </div>
        </div>
        <button onClick={calculate} className="calculate_button">
          Calculate Repayments
        </button>
      </div>

      <div className="answer">
        <div className="text">
          <h1>Your results</h1>
          <p>
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
        </div>
        {isCalculated && mode !== null && (
          <div className="card">
            {mode === "repayment" && (
              <>
                <div className="card_text">
                  <p>Your monthly repayments</p>
                  <h1>{monthly}</h1>
                </div>
                <div className="line"></div>
                <div className="card_text">
                  <p>Total you'll repay over the term</p>
                  <h1>{total}</h1>
                </div>
              </>
            )}
            {mode === "interestOnly" && (
              <>
                <div className="card_text">
                  <p>Your total interest</p>
                  <h1>{totalInterest}</h1>
                </div>
              </>
            )}
          </div>
        )}

        {(!isCalculated || mode === null) && <>oebicho</>}
      </div>
    </div>
  );
}

export default App;
