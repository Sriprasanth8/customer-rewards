import Axios from "./axiosInstance";

export const getTransactions = async (obj) => {
  return await Axios.get("json/sampleTransactions.json")
    .then((res) => {
      const fromDate = new Date(obj.from);
      const toDate = obj.to == "" ? new Date() : new Date(obj.to);
      return res.data.filter((val) => {
        const purchaseDate = new Date(val.purchaseDate)
        return (purchaseDate >= fromDate && purchaseDate <=toDate);
      })
    })
    .catch((err) => err);
    
}

export const getCustomer = async (customerId) => {
  return await Axios.get("json/customerData.json")
    .then((res) => res.data.find((val) => val.customerId == customerId))
    .catch((err) => err);
 
}