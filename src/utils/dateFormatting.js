import PropTypes from "prop-types";

export const GetYearMonthDateFormat = (date) => {
    return new Date(date).toISOString().split('T')[0];
}

export const GetYearMonthFormat = (date) => {
    return new Date(date).toISOString().slice(0, 7);
}

export const GetYearFullMonthFormat = (date) => {
    let val = new Date(date);
    return val.toLocaleString('default', { month: "long" }) + ' ' + val.getFullYear();
}

GetYearMonthDateFormat.propTypes = {
    date: PropTypes.string.isRequired
};

GetYearMonthFormat.propTypes = {
    date: PropTypes.string.isRequired
};

GetYearFullMonthFormat.propTypes = {
    date: PropTypes.string.isRequired
};