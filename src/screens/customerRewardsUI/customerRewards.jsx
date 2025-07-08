import { useEffect, useState } from "react";
import * as Services from "../../services/rewardServices";
import MonthlyRewardTable from "../../components/monthlyRewardTable";
import { calculateRewardPoints } from "../../utils/rewardCalculation";
import TransactionTable from "../../components/transactionTable";
import styles from "./customerReward.module.css";

const CustomerRewards = (prop) => {

    const [cusInfo, setCusInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const { toogleModal, selectedCustomerId } = prop;

    useEffect(() => {
        setLoading(true);
        Services.getCustomer(selectedCustomerId)
            .then(res => {
                res.transactions.map(txn => txn.rewardPoints = calculateRewardPoints(txn.totalPrice))
                res.totalRewardPoints = res.transactions.reduce((acc, txn) => { acc.totalReward += txn.rewardPoints; acc.totalPurchase += parseFloat(txn.totalPrice); return acc }, { totalReward: 0, totalPurchase: 0 });
                setCusInfo(res);
            })
            .catch(error =>
                // console.error(error);
                setError(error)
            )
            .finally(() => {
                setLoading(false);
            })

        return () => {
            setCusInfo({});
        }
    }, []);

    return (
        <div id="customerInfo">
            {loading ?
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3">Loading customer details...</p>
                </div>
                : error ?
                    <div className="text-center my-5">
                        <p className="mt-3 text-danger h3">{error}!</p>
                        <button className="btn mt-3 border border-dark" onClick={() => toogleModal()}>Close</button>
                    </div>
                    :
                    <>
                        <button className="btn float-right pr-4" style={{ fontSize: "200%" }} onClick={() => toogleModal()}><b>x</b></button>
                        {cusInfo.customerId == undefined ?
                            <h3 className="text-center text-danger mt-5">Customer with customer ID <span className="text-primary">{selectedCustomerId}</span> not found</h3>
                            :
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 pt-3">
                                        <div className="">
                                            <span className="mb-1">Customer ID : <span className="text-success h3">{cusInfo.customerId}</span></span>
                                            <p>Customer Name : <b className="text-success h3">{cusInfo.customerName}</b></p>
                                        </div>
                                    </div>
                                    <div className="col-6 py-3 text-center border-right">
                                        <h3>Total Purchase</h3>
                                        <h2 className="text-primary">${parseFloat(cusInfo.totalRewardPoints.totalPurchase).toFixed(2)}</h2>
                                    </div>
                                    <div className="col-6 py-3 text-center">
                                        <h3>Total Rewards</h3>
                                        <h2 className="text-primary">{cusInfo.totalRewardPoints.totalReward}</h2>
                                    </div>
                                </div>
                                <MonthlyRewardTable cusInfo={cusInfo} />
                                <TransactionTable cusInfo={cusInfo} styles={styles} />
                            </div>
                        }
                    </>
            }
        </div>
    )
}

export default CustomerRewards;