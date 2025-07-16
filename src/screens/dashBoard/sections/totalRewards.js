import { useMemo } from "react";
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
const TotalRewards = ({ transactionInfo }) => {
  let data = useMemo(() => {
    let result = {};

    for (let i = 0; i < transactionInfo.length; i++) {
      const curr = transactionInfo[i];
      const id = curr.customerId;
      if (!result[id]) {
        result[id] = {
          customerId: id,
          customerName: curr.customerName,
          totalPrice: 0,
          totalRewards: 0,
        };
      }
      result[id].totalPrice += curr.totalPrice;
      result[id].totalRewards += curr.rewardPoints;
    }

    return Object.values(result);
  }, [transactionInfo]);

  const tableHeader = [
    {
      name: "Customer Id",
      dataField: "customerId",
      sorting: true,
    },
    {
      name: "Customer Name",
      dataField: "customerName",
      sorting: true,
    },
    {
      name: "Total Purchase",
      dataField: "totalPrice",
      sorting: true,
      formatter: (val) => `$ ${val.toFixed(2)}`,
    },
    {
      name: "Total Rewards",
      dataField: "totalRewards",
      sorting: true,
    },
  ];

  return (
    <>
      <h2 className="my-4">Total Rewards</h2>
      <CustomTable tableHeader={tableHeader} tableData={data} />
    </>
  );
};

export default TotalRewards;

TotalRewards.propTypes = {
  transactionInfo: PropTypes.object.isRequired,
};
