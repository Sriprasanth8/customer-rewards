import { useState, useMemo } from "react";
import { CustomSorting } from "../../../utils/customSorting";
import CustomTable from "../../../components/customTable";
import PropTypes from "prop-types";

/**
 * @typedef {Object} Transaction
 * @property {string} transactionId
 * @property {string} customerId
 * @property {string} customerName
 * @property {string | null} products
 * @property {string | null} totalPrice *
 */

/**
 *
 * @param {Object} props
 * @param {Array<Transaction>} transactionInfo
 * @returns {JXS.Element}
 */

const Transactions = ({ transactionInfo }) => {
  const [searchName, setSearchName] = useState("");
  const [searchProducts, setSearchProducts] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "purchaseDate",
    direction: "desc",
  });

  let data = transactionInfo;

  data = useMemo(
    () =>
      data?.filter((txn) => {
        return (
          (txn.customerName ?? "")
            .toLowerCase()
            .includes(searchName.toLowerCase()) &&
          (txn.products ?? "")
            .toLowerCase()
            .includes(searchProducts.toLowerCase())
        );
      }),
    [data, searchName, searchProducts]
  );

  data = useMemo(() => CustomSorting(data, sortConfig), [data, sortConfig]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (e.target.name == "searchByName") setSearchName(value);
    else setSearchProducts(value);
  };

  const tableHeader = [
    {
      name: "Transaction Id",
      dataField: "transactionId",
      sorting: true,
    },
    {
      name: "Customer Name",
      dataField: "customerName",
      sorting: true,
      filtering: {
        name: "searchByName",
        value: searchName,
        handleValue: handleSearchChange,
      },
    },
    {
      name: "Purchase Date",
      dataField: "purchaseDate",
      sorting: true,
    },
    {
      name: "Products",
      dataField: "products",
      sorting: true,
      filtering: {
        name: "searchByProducts",
        value: searchProducts,
        handleValue: handleSearchChange,
      },
    },
    {
      name: "Total Price",
      dataField: "totalPrice",
      sorting: true,
      formatter: (val) => `$ ${val.toFixed(2)}`,
    },
    {
      name: "Reward Points",
      dataField: "rewardPoints",
      sorting: true,
    },
  ];

  return (
    <>
      <h2 className="my-4">Transactions</h2>
      <CustomTable
        tableHeader={tableHeader}
        tableData={data}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    </>
  );
};

export default Transactions;

Transactions.propTypes = {
  transactionInfo: PropTypes.object.isRequired,
};
