import PropTypes from "prop-types";

/**
 * 
 * @param {string} date 
 * @returns {string}
 */
export const GetYearMonthDateFormat = (date) => {
    return new Date(date).toISOString().split('T')[0];
}

/**
 * 
 * @param {string} date 
 * @returns {string}
 */
export const GetYearMonthFormat = (date) => {
    return new Date(date).toISOString().slice(0, 7);
}

/**
 * 
 * @param {string} date 
 * @returns {String}
 */
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