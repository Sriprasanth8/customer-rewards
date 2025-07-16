import Axios from "axios";
import PropTypes from 'prop-types';

/**
 * 
 * @param {{from: string, to: string}} obj
 * @returns {Promise<Object>}
 */
export const getTransactions = async (obj) => {
  return await Axios.get("json/transactions.json")
    .then((res) => {
      const fromDate = new Date(obj.from);
      const toDate = obj.to === "" ? new Date() : new Date(obj.to);
      return res.data.filter((val) => {
        const purchaseDate = new Date(val.purchaseDate)
        return (purchaseDate >= fromDate && purchaseDate <=toDate);
      })
    })
    .catch((err) => err);
}

getTransactions.propTypes = {
  obj : PropTypes.shape({
    from : PropTypes.string.isRequired,
    to : PropTypes.string
  })
}