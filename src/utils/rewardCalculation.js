import PropTypes from "prop-types";

/**
 *
 * @param {string} price
 * @returns {number}
 */
export const calculateRewardPoints = (price) => {
  price = Math.round(price);
  if (price <= 50) return 0;
  if (price <= 100) return price - 50;
  return 50 + 2 * (price - 100);
};

calculateRewardPoints.propTypes = {
  price: PropTypes.number.isRequired,
};
