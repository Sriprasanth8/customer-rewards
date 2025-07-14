import { useState, useMemo } from "react";
import { CustomSorting } from "../../../utils/customSorting";
import CustomTable from "../../../components/customTable";
import PropTypes from "prop-types";

/**
 * 
 * @param {Object} props
 * @param {Array<import("../screens/dashBoard/sections/monthlyRewards").Transaction>} props.transactionInfo 
 * @returns {JSX.Element}
 */
const TotalRewards = ({ transactionInfo }) => {
    const [searchName, setSearchName] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "customerId", direction: "asc" });

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
                    totalRewards: 0
                };
            }
            result[id].totalPrice += curr.totalPrice;
            result[id].totalRewards += curr.rewardPoints;
        }

        return Object.values(result);
    }, [transactionInfo]);

    data = useMemo(() => data.filter(txn =>
        (txn.customerName ?? "").toLowerCase().includes(searchName.toLowerCase())
    ), [data, searchName]);

    data = useMemo(() => CustomSorting(data, sortConfig), [data, sortConfig]);

    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
    }

    const tableHeader = [
        {
            name: "Customer Id",
            dataField: "customerId",
            sorting: true
        },
        {
            name: "Customer Name",
            dataField: "customerName",
            sorting: true,
            filtering: {
                name: "searchByName",
                value: searchName,
                handleValue: handleSearchChange
            }
        },
        {
            name: "Total Purchase",
            dataField: "totalPrice",
            sorting: true,
            formatter: (val) => `$ ${val.toFixed(2)}`
        },
        {
            name: "Total Rewards",
            dataField: "totalRewards",
            sorting: true
        }
    ]

    return (
        <>
            <h2 className="my-4">Total Rewards</h2>
            <CustomTable
                tableHeader={tableHeader}
                tableData={data}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
            />
        </>
    )
}

export default TotalRewards;

TotalRewards.propTypes = {
    transactionInfo : PropTypes.object.isRequired
}