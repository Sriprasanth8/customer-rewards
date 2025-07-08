
import PropTypes from "prop-types";
import { useState } from "react";
import { CustomSorting } from "../utils/customSorting";
import { useDebounce } from "../utils/debounce";
import RenderSortingIcon from "./rederSortingIcon";


const TransactionTable = (prop) => {
    const [sortConfig, setSortConfig] = useState({ key: "purchaseDate", direction: "desc" });
    const [searchProduct, setSearchProduct] = useState("");
    const debounceValue = useDebounce(searchProduct, 500);

    var txn = prop.cusInfo.transactions;

    txn = txn?.filter(txn =>
        txn.products.toString().toLowerCase().includes((debounceValue).toLowerCase())
    );

    txn = CustomSorting(txn, sortConfig);

    const handleProductSearch = (e) => {
        setSearchProduct(e.target.value);
    };

    return (
        <>
            <h3 className="text-center mt-4">Transactions</h3>
            <div id={prop.styles.cusTxnTableContainer}>
                <table className="table table-dark text-center mt-3">
                    <thead className="thead-dark">
                        <tr>
                            <td >Transaction ID
                                <RenderSortingIcon columnName="transactionId" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
                            </td>
                            <td>Purchase Date
                                <RenderSortingIcon columnName="purchaseDate" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
                            </td>
                            <td>Product
                                <input
                                    type="text"
                                    className="form-control w-50 mx-auto mt-2"
                                    placeholder="Product"
                                    value={searchProduct}
                                    onChange={handleProductSearch}
                                />
                                <RenderSortingIcon columnName="products" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
                            </td>
                            <td>Total Price
                                <RenderSortingIcon columnName="totalPrice" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
                            </td>
                            <td>Rewards Point
                                <RenderSortingIcon columnName="rewardPoints" setSortConfig={setSortConfig} sortConfig={sortConfig}/>
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

TransactionTable.propTypes = {
    transactionId: PropTypes.string.isRequired,
    purchaseDate: PropTypes.string.isRequired,
    products: PropTypes.arrayOf[PropTypes.string],
    totalPrice: PropTypes.number
}

export default TransactionTable;