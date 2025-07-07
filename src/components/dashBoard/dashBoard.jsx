import React, { useEffect, useState } from "react";
import { CustomSorting } from "../../utils/customSorting";
import CustomerRewards from "../customerRewardsUI/customerRewards";
import { sampleTransactions } from "../../json/sampleData";
import * as Services from "../../services/rewardServices";

const DashBoard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [alltxn, setAlltxn] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [selectedCustomerId, setSelectedCustomerId] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [searchProduct, setSearchProduct] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
    const [toogle, setToogle] = useState(false);
    const itemsPerPage = 5;

    useEffect(() => {
        setLoading(true);
        // setTimeout(() => 
            Services.getTransactions()
            .then((res) => {
                setAlltxn(res);
            })
            .catch((err) => {
                // console.error(err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            })
        // ,5000);
        return () => {
            setAlltxn([]);
            setLoading(true);
        };
    }, [])

    let data = alltxn;

    const totalRevenue = data.reduce((acc, val) => val.totalPrice + acc, 0);

    data = data?.filter(txn => {
        return txn.customerName.toLowerCase().includes(searchName.toLowerCase()) &&
            txn.product.toLowerCase().includes(searchProduct.toLowerCase())
    }
    );

    data = CustomSorting(data, sortConfig);

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
                                <h2 className="text-primary">${totalRevenue.toFixed(2)}</h2>
                                <small>*based on 3 month transactions.</small>
                            </div>
                            <div className="col-6 col-md-4 py-3 text-center">
                                <h3>Total Transaction</h3>
                                <h2 className="text-primary">{sampleTransactions.length}</h2>
                                <small>*based on 3 month records.</small>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="container-fluid">
                        <h2>Transaction Info</h2>
                        <table className="table text-center w-100">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>
                                        Customer Name
                                        <input
                                            type="text"
                                            className="form-control w-50 mx-auto mt-2"
                                            placeholder="Customer name"
                                            value={searchName}
                                            onChange={handleSearch}
                                        />
                                    </th>
                                    <th >
                                        Purchase Date
                                        <br></br>
                                        <span className={`btn ${sortConfig.key === "purchaseDate" && sortConfig.direction === "asc" ? "text-success" : "text-white"}`}
                                            onClick={() => setSortConfig({ direction: "asc", key: "purchaseDate" })}>↑</span>
                                        <span className={`btn ${sortConfig.key === "purchaseDate" && sortConfig.direction === "desc" ? "text-success" : "text-white"}`}
                                            onClick={() => setSortConfig({ direction: "desc", key: "purchaseDate" })}>↓</span>
                                    </th>
                                    <th>Product
                                        <input
                                            type="text"
                                            className="form-control w-50 mx-auto mt-2"
                                            placeholder="Product"
                                            value={searchProduct}
                                            onChange={handleProductSearch}
                                        />
                                    </th>
                                    <th >
                                        Total Price
                                        <br></br>
                                        <span className={`btn ${sortConfig.key === "totalPrice" && sortConfig.direction === "asc" ? "text-success" : "text-white"}`}
                                            onClick={() => setSortConfig({ direction: "asc", key: "totalPrice" })}>↑</span>
                                        <span className={`btn ${sortConfig.key === "totalPrice" && sortConfig.direction === "desc" ? "text-success" : "text-white"}`} onClick={() => setSortConfig({ direction: "desc", key: "totalPrice" })}>↓</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((txn) => (
                                    <tr key={txn.transactionId} onClick={() => toogleModal(txn.customerId)}>
                                        <td>{txn.transactionId}</td>
                                        <td data-id="1">{txn.customerName}</td>
                                        <td>{txn.purchaseDate}</td>
                                        <td>{txn.product}</td>
                                        <td>${txn.totalPrice.toFixed(2)}</td>
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
                            : <p className="text-center text-danger h5">No data found</p>}
                    </div>
                    {toogle &&
                        <CustomerRewards toogleModal={toogleModal} selectedCustomerId={selectedCustomerId} />
                    }
                </>
            }
        </>
    );
};

export default DashBoard;
