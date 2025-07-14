import PropTypes from "prop-types";

/**
 * @typedef {Object} SortObj
 * @property {string}  key
 * @property {string} direction
 */

/**
 *
 * @param {Object} data
 * @param {SortObj} sortingConfig
 * @returns {Object}
 */
export const CustomSorting = (data, sortingConfig) => {
  return [...data].sort((a, b) => {
    if (!sortingConfig.key) return 0;

    let aVal = a[sortingConfig.key] ?? "";
    let bVal = b[sortingConfig.key] ?? "";

    if (sortingConfig.key == "purchaseDate") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    if (
      sortingConfig.key == "customerName" ||
      sortingConfig.key == "products" ||
      sortingConfig.key == "transactionId"
    ) {
      return sortingConfig.direction == "asc"
        ? (aVal ?? "")
            .toString()
            .toLowerCase()
            .localeCompare(bVal.toLowerCase())
        : bVal.toString().toLowerCase().localeCompare(aVal.toLowerCase());
    }

    if (sortingConfig.direction === "asc") return aVal - bVal;
    else return bVal - aVal;
  });
};

/**
 * @param {Object} props
 * @param {Object} props.data
 * @param {string} props.dataField
 * @param {string} props.key
 * @return {Object}
 */

export const CustomFiltering = (data, dataField, key) => {
  return [...data].filter((txn) =>
    (txn[dataField] ?? "").toLowerCase().includes(key.toLowerCase())
  );
};

CustomSorting.propTypes = {
  data: PropTypes.object,
  sortingConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
  }),
};

CustomFiltering.propTypes = {
  data: PropTypes.object,
  dataField: PropTypes.string,
  key: PropTypes.string,
};
