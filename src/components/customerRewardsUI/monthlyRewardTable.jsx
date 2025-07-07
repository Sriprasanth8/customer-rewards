
import PropTypes from "prop-types";

const MonthlyRewardTable = (prop) => {
    
    let montxn = prop.cusInfo;
    let pastThreeMonthData = {};
    let groupByMonth = {};

    for(let i=0;i<3;i++) {
        const today = new Date();
        const month = today.getMonth()+1-i;
        const year = today.getFullYear();
        pastThreeMonthData[year+'-'+month]=0;
    }

    montxn.transactions.forEach((val) => {
        const now = new Date(val.purchaseDate);
        const month = now.getMonth()+1;
        const year = now.getFullYear();
        const key = year+'-'+month;
        if(!groupByMonth[key])
            groupByMonth[key] = 0;
        groupByMonth[key] += val.rewardPoints;
    })

    Object.keys(pastThreeMonthData).forEach((key) => {
        if(groupByMonth[key]) pastThreeMonthData[key] = groupByMonth[key];
        else pastThreeMonthData[key] = 0;
    })

    return (
        <>
            <h3 className="text-center mt-3">Monthly Rewards</h3>
            <table className="table table-dark mt-3 text-center">
                <thead>
                    <tr>
                        <td>Month</td>
                        <td>Year</td>
                        <td>Rewards Point</td>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(pastThreeMonthData).map((key) => {
                        return (
                        <tr key={key}>
                            <td>{new Date(key).toLocaleString("default", {month : "short"})}</td>
                            <td>{new Date(key).getFullYear()}</td>
                            <td>{pastThreeMonthData[key]}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

MonthlyRewardTable.prototype = {
    transactionId: PropTypes.string,
    purchaseDate: PropTypes.string.isRequired,
    products: PropTypes.arrayOf[PropTypes.string],
    totalPrice: PropTypes.number.isRequired
}

export default MonthlyRewardTable;