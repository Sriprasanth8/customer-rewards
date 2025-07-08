import React, { useEffect, useState, useMemo } from "react";
import { CustomSorting } from "../../utils/customSorting";
import CustomerRewards from "../customerRewardsUI/customerRewards";
import * as Services from "../../services/rewardServices";
import RenderSortingIcon from "../../components/rederSortingIcon";
import { calculateRewardPoints } from "../../utils/rewardCalculation";

const DashBoard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [timePeriodErr, setTimePeriodErr] = useState(undefined);
    const [alltxn, setAlltxn] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [selectedCustomerId, setSelectedCustomerId] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [searchProduct, setSearchProduct] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "purchaseDate", direction: "desc" });
    const [toogle, setToogle] = useState(false);
    const itemsPerPage = 5;

    const dateValication=()=> {
        if(new Date(fromDate) <= (toDate == "" ? new Date() : new Date(toDate)))
            return true;
        setTimePeriodErr("From date should not be greater than To date.")
        return false;
    }

    const makeAPIcall=() => {
        if(dateValication()) {
            setLoading(true);
            // setTimeout(() => 
            let obj = {
                from : fromDate,
                to : toDate
            }
            Services.getTransactions(obj)
                .then((res) => {
                    res.map((val) => val.rewardPoints = calculateRewardPoints(val.totalPrice));
                    setAlltxn(res);
                })
                .catch((err) => {
                    // console.error(err);
                    setError(err);
                })
                .finally(() => {
                    setLoading(false);
                })
            if(toDate == "") {
                setToDate(new Date().toISOString().split("T")[0])
            }
            // ,5000);
        }
    }

    let data = alltxn;

    const totalRevenue = useMemo(() => alltxn.reduce((acc, val) => parseFloat(val.totalPrice) + acc, 0), [alltxn]);

    data = useMemo(() => data?.filter(txn => {
        return txn.customerName.toLowerCase().includes(searchName.toLowerCase()) &&
            txn.product.toLowerCase().includes(searchProduct.toLowerCase())
    }
    ), [data, searchName, searchProduct]);

    data = useMemo(() => CustomSorting(data, sortConfig), [data, sortConfig]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = data.slice(indexOfFirst, indexOfLast);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchName(e.target.value);
        setCurrentPage(1);
    };
    const handleProductSearch = (e) => {
        setSearchProduct(e.target.value);
        setCurrentPage(1);
    };

    const toogleModal = (cusId) => {
        setSelectedCustomerId(cusId);
        setToogle(toogle => !toogle);
    }

    const setDate=(e)=> {
        if(e.target.name == "reset")
        {
            setFromDate("");
            setToDate("");
            setAlltxn([]);
            setTimePeriodErr(undefined);
        }
        else if(e.target.name == "fromDate")
            setFromDate(e.target.value);
        else
            setToDate(e.target.value);
    }

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <h1>Sea Store</h1>
            </nav>
            {loading ?
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3">Loading...</p>
                </div>
                :
                error ?
                    <div className="text-center my-5">
                        <h3 className="text-danger mt-3">ERROR!</h3>
                        <p className="mt-1">{error}</p>
                        <button className="btn mt-3 border border-dark" onClick={() => window.location.reload()}>Reload</button>
                    </div>
                    :
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
                                    <h2 className="text-primary">${parseFloat(totalRevenue).toFixed(2)}</h2>
                                    <small>*based on selected transaction period.</small>
                                </div>
                                <div className="col-6 col-md-4 py-3 text-center">
                                    <h3>Total Transaction</h3>
                                    <h2 className="text-primary">{alltxn.length}</h2>
                                    <small>*based on selected transaction period.</small>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <h2 className="px-3">Filter</h2>
                            <div className="row mx-1">
                                <div className="col-12 col-md-2">
                                    <div className="form-group">
                                    <label htmlFor="fromDate">From Date</label>
                                    <input type="date" name="fromDate" max={new Date().toISOString().split("T")[0]} value={fromDate} onChange={(e) => setDate(e)} className="form-control border-dark"/>
                                </div>
                                </div>
                                <div className="col-12 col-md-2">
                                    <div className="form-group">
                                    <label htmlFor="toData">To Date</label>
                                    <input type="date" name="toDate" max={new Date().toISOString().split("T")[0]} value={toDate} onChange={(e) => setDate(e)} className="form-control border-dark"/>
                                </div>
                                </div>
                                <div className="col-12 col-md-2 d-flex">
                                    <button className="mt-auto mb-3 border-light bg-primary btn text-white w-100" onClick={() => makeAPIcall()} disabled={fromDate == ""}>Filter</button>
                                </div>
                                <div className="col-12 col-md-2 d-flex">
                                    <button className="mt-auto mb-3 border-primary btn w-100" name="reset" onClick={(e) => setDate(e)} disabled={fromDate == "" && toDate == ""}>Reset</button>
                                </div>
                            </div>
                            {timePeriodErr && <p className="text-danger mx-3">{timePeriodErr}</p>}
                        </div>
                        <hr/>
                        <div className="container-fluid">
                            <h2>Transaction Info</h2>
                            <table className="table text-center w-100">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Transaction ID
                                            <RenderSortingIcon columnName="transactionId" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
                                        </th>
                                        <th>
                                            Customer Name
                                            <input
                                                type="text"
                                                className="form-control w-50 mx-auto mt-2 text-success"
                                                placeholder=""
                                                value={searchName}
                                                onChange={handleSearch}
                                            />
                                            <RenderSortingIcon columnName="customerName" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
                                        </th>
                                        <th >
                                            Purchase Date
                                            <RenderSortingIcon columnName="purchaseDate" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
                                        </th>
                                        <th>Product
                                            <input
                                                type="text"
                                                className="form-control w-50 mx-auto mt-2 text-success"
                                                placeholder=""
                                                value={searchProduct}
                                                onChange={handleProductSearch}
                                            />
                                            <RenderSortingIcon columnName="product" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
                                        </th>
                                        <th >
                                            Total Price
                                            <RenderSortingIcon columnName="totalPrice" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
                                        </th>
                                        <th >
                                            Reward Points
                                            <RenderSortingIcon columnName="rewardPoints" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
                                        </th>
                                        <th >
                                            
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((txn) => (
                                        <tr key={txn.transactionId}>
                                            <td>{txn.transactionId}</td>
                                            <td data-id="1">{txn.customerName}</td>
                                            <td>{txn.purchaseDate}</td>
                                            <td>{txn.product}</td>
                                            <td>${parseFloat(txn.totalPrice).toFixed(2)}</td>
                                            <td>{txn.rewardPoints}</td>
                                            <td><button className="btn btn-primary" onClick={() => toogleModal(txn.customerId)}>View</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {currentItems.length != 0 ?
                                <div className="d-flex">
                                    <p className="my-auto">{indexOfFirst + 1} - {indexOfFirst + currentItems.length} of {data.length}</p>
                                    <div className=" ml-auto my-auto">
                                        <button className="btn"
                                            onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                            Prev
                                        </button>
                                        {currentPage != 1 &&
                                            <button onClick={() => handlePageChange(currentPage - 1)} className="bg-transparent p-2 border-0">{currentPage - 1}</button>
                                        }
                                        <button className="text-primary bg-transparent p-2 border-0">{currentPage}</button>
                                        {(data.length > itemsPerPage && currentPage != totalPages) &&
                                            <button onClick={() => handlePageChange(currentPage + 1)} className="bg-transparent p-2 border-0">{currentPage + 1}</button>
                                        }
                                        <button className="btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                                : <p className={`text-center h5 my-5 ${(fromDate !== "" && toDate !=="") ? "text-danger" : "text-success"}`}>
                                    {(fromDate !== "" && toDate !=="")? "No data found" : "Select the time period to get data"}
                                    </p>
                                }
                        </div>
                        {toogle &&
                            <CustomerRewards toogleModal={toogleModal} selectedCustomerId={selectedCustomerId} />
                        }
                    </>
            }
            <footer className="text-center bg-light p-4 mt-4">
                &copy; Prasanth Alagesan
            </footer>
        </>
    );
};

export default DashBoard;
