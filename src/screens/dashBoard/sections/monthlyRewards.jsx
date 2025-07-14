import { useState, useMemo } from "react";
import { CustomSorting } from "../../../utils/customSorting";
import CustomTable from "../../../components/customTable";
import {
  GetYearMonthFormat,
  GetYearFullMonthFormat,
} from "../../../utils/dateFormatting";
import PropTypes from "prop-types";

const customTdStyle = {
  maxHeight: "100px",
  overflowX: "hidden",
  overflowY: "auto",
  display: "block",
  whiteSpace: "normal",
  margin: "0 0 .5rem 0",
};

/**
 *
 * @param {Object} props
 * @param {Array<import("../screens/dashBoard/sections/monthlyRewards").Transaction>} props.transactionInfo
 * @param {string} props.from
 * @param {string} props.to
 * @returns {JSX.Element}
 */
const MonthlyRewards = ({ transactionInfo, from, to }) => {
  const [searchName, setSearchName] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "customerId",
    direction: "asc",
  });

  let fromDate = new Date(from);
  let toDate = new Date(to);

  const groupByMonthKey = {};

  for (let i = fromDate; i <= toDate; i.setMonth(i.getMonth() + 1)) {
    const key = GetYearMonthFormat(new Date(i));
    if (!groupByMonthKey[key]) {
      groupByMonthKey[key] = {
        totalPrice: 0,
        totalRewards: 0,
      };
    }
  }

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
  }, [transactionInfo, groupByMonthKey]);

  data = useMemo(
    () =>
      data.filter((txn) =>
        (txn.customerName ?? "")
          .toLowerCase()
          .includes(searchName.toLowerCase())
      ),
    [data, searchName]
  );

  data = useMemo(() => CustomSorting(data, sortConfig), [data, sortConfig]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

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
      filtering: {
        name: "searchByName",
        value: searchName,
        handleValue: handleSearchChange,
      },
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
      style: Object.entries(groupByMonthKey).length > 3 ? customTdStyle : null,
      formatter: (val) =>
        Object.entries(val).map(([key, value]) => (
          <div className="row">
            <div className="col-4">{GetYearFullMonthFormat(key)}</div>
            <div className="col-4 text-right">{value.totalPrice}</div>
            <div className="col-4 text-right">{value.totalRewards}</div>
          </div>
        )),
    },
  ];

  return (
    <>
      <h2 className="my-4">Monthly Rewards</h2>
      <CustomTable
        tableHeader={tableHeader}
        tableData={data}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    </>
  );
};

export default MonthlyRewards;

MonthlyRewards.propTypes = {
  transactionInfo: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
