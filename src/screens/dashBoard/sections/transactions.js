import CustomTable from "../../../components/customTable";
import PropTypes from "prop-types";

/**
 *
 * @param {Object} props
 * @param {
 *  Array<{
 *    transactionId: string,
 *    customerId : string,
 *    customerName : string,
 *    products : string,
 *    totalPrice : string | null
 *  }>
 * } props.transactionInfo
 * @returns {JSX.Element}
 */
const Transactions = ({ transactionInfo }) => {
  let data = transactionInfo;

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
    },
    {
      name: "Total Price",
      dataField: "totalPrice",
      sorting: true,
      formatter: (val) => `$ ${val?.toFixed(2)}`,
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
      <CustomTable tableHeader={tableHeader} tableData={data} />
    </>
  );
};

export default Transactions;

Transactions.propTypes = {
  transactionInfo: PropTypes.object.isRequired,
};
