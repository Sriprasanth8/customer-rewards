import { useEffect, useState, useMemo, useRef } from "react";
import * as Services from "../../services/rewardServices";
import { calculateRewardPoints } from "../../utils/rewardCalculation";
import TotalRewards from "./sections/totalRewards";
import MonthlyRewards from "./sections/monthlyRewards";
import Transactions from "./sections/transactions";
import { GetYearMonthDateFormat } from "../../utils/dateFormatting";

const DashBoard = () => {
  const [fromDate, setFromDate] = useState(
    GetYearMonthDateFormat(new Date().setMonth(new Date().getMonth() - 3))
  );
  const [toDate, setToDate] = useState(GetYearMonthDateFormat(new Date()));
  const [timePeriodErr, setTimePeriodErr] = useState(undefined);
  const [transactionInfo, setTransactionInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  let apiCallLog = useRef(0);

  useEffect(() => {
    makeAPIcall();
  }, []);

  const dateValidationtion = () => {
    console.info("Approaching Date Validation");
    if (new Date(fromDate) <= (toDate == "" ? new Date() : new Date(toDate))) {
      setTimePeriodErr(undefined);
      console.info("Date Validate Successfully");
      return true;
    }
    setTimePeriodErr("From date should not be greater than To date.");
    apiCallLog.current = 0;
    setTransactionInfo([]);
    console.warn("Date Validation Failed");
    return false;
  };

  const NumberValidation = (num) => {
    if (isNaN(num) || num < 0) return 0;
    return num;
  };

  //Api call
  const makeAPIcall = () => {
    if (dateValidationtion()) {
      console.info("API call starts");
      setLoading(true);
      // setTimeout(() =>
      let obj = {
        from: fromDate,
        to: toDate,
      };
      Services.getTransactions(obj)
        .then((res) => {
          console.info("API call success");
          res.map((val) => {
            //Validating totalPrice<string> is number or not
            val.totalPrice = parseFloat(NumberValidation(val.totalPrice));
            //Calculating reward points for each transaction
            val.rewardPoints = calculateRewardPoints(val.totalPrice);
            return val;
          });
          setTransactionInfo(res);
        })
        .catch((err) => {
          console.info("Api call failed");
          setError(err);
        })
        .finally(() => {
          apiCallLog.current += 1;
          setLoading(false);
          console.info("API call ends");
        });
      if (toDate == "") {
        setToDate(GetYearMonthDateFormat(new Date()));
      }
      // ,5000);
    }
  };

  const totalRevenue = useMemo(
    () => transactionInfo.reduce((acc, val) => val.totalPrice + acc, 0.0),
    [transactionInfo]
  );

  const setDate = (e) => {
    if (e.target.name == "reset") {
      setFromDate("");
      setToDate("");
      setTransactionInfo([]);
      setTimePeriodErr(undefined);
      apiCallLog.current = 0;
    } else if (e.target.name == "fromDate") setFromDate(e.target.value);
    else setToDate(e.target.value);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <h1>Sea Store</h1>
      </nav>
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center my-5">
          <h3 className="text-danger mt-3">ERROR!</h3>
          <p className="mt-1">{error}</p>
          <button
            className="btn mt-3 border border-dark"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      ) : (
        <>
          <div className="container-fluid my-3">
            <div className="row">
              <div className="col-12 col-md-4 py-3 d-flex border-right">
                <div className="my-auto mx-auto">
                  <small>Welcome back</small>
                  <h2 className="text-primary h1">Ortho!</h2>
                </div>
              </div>
              <div className="col-6 col-md-4 py-3 text-center border-right">
                <h3>Revenue</h3>
                <h2 className="text-primary">${totalRevenue.toFixed(2)}</h2>
                <small>*based on selected transaction period.</small>
              </div>
              <div className="col-6 col-md-4 py-3 text-center">
                <h3>Total Transaction</h3>
                <h2 className="text-primary">{transactionInfo.length}</h2>
                <small>*based on selected transaction period.</small>
              </div>
            </div>
            <hr />
          </div>
          <div className="container-fluid">
            <h2>Filter</h2>
            <div className="row">
              <div className="col-12 col-md-2">
                <div className="form-group">
                  <label htmlFor="fromDate">From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    max={GetYearMonthDateFormat(new Date())}
                    value={fromDate}
                    onChange={(e) => setDate(e)}
                    className="form-control border-dark"
                  />
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div className="form-group">
                  <label htmlFor="toData">To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    max={GetYearMonthDateFormat(new Date())}
                    value={toDate}
                    onChange={(e) => setDate(e)}
                    className="form-control border-dark"
                  />
                </div>
              </div>
              <div className="col-12 col-md-2 d-flex">
                <button
                  className="mt-auto mb-3 border-light bg-primary btn text-white w-100"
                  onClick={() => makeAPIcall()}
                  disabled={fromDate == ""}
                >
                  Filter
                </button>
              </div>
              <div className="col-12 col-md-2 d-flex">
                <button
                  className="mt-auto mb-3 border-primary btn w-100"
                  name="reset"
                  onClick={(e) => setDate(e)}
                  disabled={fromDate == "" && toDate == ""}
                >
                  Reset
                </button>
              </div>
            </div>
            {timePeriodErr && <p className="text-danger">{timePeriodErr}</p>}
            <hr />
          </div>
          {transactionInfo.length != 0 ? (
            <div className="container-fluid text-center">
              <Transactions transactionInfo={transactionInfo} />
              <hr />
              <TotalRewards transactionInfo={transactionInfo} />
              <hr />
              <MonthlyRewards
                transactionInfo={transactionInfo}
                from={fromDate}
                to={toDate}
              />
            </div>
          ) : (
            <p
              className={`text-center h5 my-5 ${
                apiCallLog.current != 0 ? "text-danger" : "text-success"
              }`}
            >
              {apiCallLog.current != 0
                ? "No data found"
                : "Select the time period to get data"}
            </p>
          )}
        </>
      )}
      <footer className="text-center bg-light p-4 mt-4">
        &copy; Prasanth Alagesan
      </footer>
    </>
  );
};

export default DashBoard;
