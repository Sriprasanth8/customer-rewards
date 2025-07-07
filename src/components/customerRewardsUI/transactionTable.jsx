
import PropTypes, { string } from "prop-types";
import { useEffect, useState } from "react";
import { CustomSorting } from "../../utils/customSorting";
import styles from "./customerReward.module.css";


const TransactionTable = (prop) => {
    const [sortConfig, setSortConfig] = useState({ key: "purchaseDate", direction: "desc" });
    const [searchProduct, setSearchProduct] = useState("");

    var txn = prop.cusInfo.transactions;

    txn = txn?.filter(txn =>
        txn.products.toString().toLowerCase().includes(searchProduct.toLowerCase())
    );

    txn = CustomSorting(txn, sortConfig);

    const handleProductSearch = (e) => {
        setSearchProduct(e.target.value);
    };

    return (
        <>
            <h3 className="text-center mt-4">Transactions</h3>
            <div id={styles.cusTxnTableContainer}>
                <table className="table table-dark text-center mt-3">
                    <thead className="thead-dark">
                        <tr>
                            <td >Transaction ID</td>
                            <td>Purchase Date
                                <br></br>
                                <span className={`btn ${sortConfig.key === "purchaseDate" && sortConfig.direction === "asc" ? "text-success" : "text-white"}`}
                                    onClick={() => setSortConfig({ direction: "asc", key: "purchaseDate" })}>↑</span>
                                <span className={`btn ${sortConfig.key === "purchaseDate" && sortConfig.direction === "desc" ? "text-success" : "text-white"}`}
                                    onClick={() => setSortConfig({ direction: "desc", key: "purchaseDate" })}>↓</span>
                            </td>
                            <td>Product
                                <input
                                    type="text"
                                    className="form-control w-50 mx-auto mt-2"
                                    placeholder="Product"
                                    value={searchProduct}
                                    onChange={handleProductSearch}
                                />
                            </td>
                            <td>Total Price</td>
                            <td>Rewards Point
                                <br></br>
                                <span className={`btn ${sortConfig.key === "rewardPoints" && sortConfig.direction === "asc" ? "text-success" : "text-white"}`}
                                    onClick={() => setSortConfig({ direction: "asc", key: "rewardPoints" })}>↑</span>
                                <span className={`btn ${sortConfig.key === "rewardPoints" && sortConfig.direction === "desc" ? "text-success" : "text-white"}`}
                                    onClick={() => setSortConfig({ direction: "desc", key: "rewardPoints" })}>↓</span>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {txn?.map(info =>
                            <tr key={info.transactionId}>
                                <td>{info.transactionId}</td>
                                <td>{info.purchaseDate}</td>
                                <td>{info.products?.toString()}</td>
                                <td>{info.totalPrice}</td>
                                <td>{info.rewardPoints}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

TransactionTable.prototype = {
    transactionId: PropTypes.string.isRequired,
    purchaseDate: PropTypes.string.isRequired,
    products: PropTypes.arrayOf[PropTypes.string],
    totalPrice: PropTypes.number
}

export default TransactionTable;