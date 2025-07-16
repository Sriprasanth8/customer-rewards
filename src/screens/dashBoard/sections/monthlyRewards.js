import { useMemo } from "react";
import CustomTable from "../../../components/customTable";
import {
  GetYearMonthFormat,
  GetYearFullMonthFormat,
} from "../../../utils/dateFormatting";
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
 * @param {string} props.from
 * @param {string} props.to
 * @returns {JSX.Element}
 */
const MonthlyRewards = ({ transactionInfo, from, to }) => {
  let fromDate = new Date(from);
  let toDate = new Date(to);
  let groupByMonthKey = {};

  groupByMonthKey = useMemo(() => {
    for (let i = fromDate; i <= toDate; i.setMonth(i.getMonth() + 1)) {
      const key = GetYearMonthFormat(new Date(i));
      if (!groupByMonthKey[key]) {
        groupByMonthKey[key] = {
          totalPrice: 0,
          totalRewards: 0,
        };
      }
    }
    return groupByMonthKey;
  }, [transactionInfo]);

  const deepClone = (obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, { ...value }])
    );

  let data = useMemo(() => {
    let result = {};

    for (let i = 0; i < transactionInfo.length; i++) {
      const curr = transactionInfo[i];
      const id = curr.customerId;
      if (!result[id]) {
        result[id] = {
          customerId: id,
          customerName: curr.customerName,
          groupByMonth: deepClone(groupByMonthKey),
        };
      }
      const key = GetYearMonthFormat(new Date(curr.purchaseDate));
      result[id].groupByMonth[key].totalPrice += curr.totalPrice;
      result[id].groupByMonth[key].totalRewards += curr.rewardPoints;
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
      name: (
        <div className="row">
          <div className="col-4">Months</div>
          <div className="col-4">Total Purchase</div>
          <div className="col-4">Total Rewards</div>
        </div>
      ),
      dataField: "groupByMonth",
      formatter: (val) =>
        Object.entries(val).map(([key, value]) => (
          <div className="row" key={key}>
            <div className="col-4">{GetYearFullMonthFormat(key)}</div>
            <div className="col-4 text-right">
              {parseFloat(value.totalPrice).toFixed(2)}
            </div>
            <div className="col-4 text-right">{value.totalRewards}</div>
          </div>
        )),
    },
  ];

  const monthlyTableTeader = [
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
      name: "Total Price",
      dataField: "totalPrice",
      sorting: true,
    },
    {
      name: "Total Rewards",
      dataField: "totalRewards",
      sorting: true,
    },
  ];

  return (
    <>
      <h2 className="my-4">Monthly Rewards</h2>
      <CustomTable tableHeader={tableHeader} tableData={data} />
      <>
        {Object.keys(groupByMonthKey).map((key) => {
          let monthlyData = data.reduce((acc, cusInfo) => {
            let cusData = { ...cusInfo, purchaseMonth: key };
            cusData.totalPrice = cusData.groupByMonth[key].totalPrice;
            cusData.totalRewards = cusData.groupByMonth[key].totalRewards;
            acc.push(cusData);

            return acc;
          }, []);

          return (
            <>
              <hr />
              <h2 className="my-4">
                {`${GetYearFullMonthFormat(key).split(" ")[0]} ${
                  GetYearFullMonthFormat(key).split(" ")[1]
                }`}
              </h2>
              <CustomTable
                tableHeader={monthlyTableTeader}
                tableData={monthlyData}
              />
            </>
          );
        })}
      </>
    </>
  );
};

export default MonthlyRewards;

MonthlyRewards.propTypes = {
  transactionInfo: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
