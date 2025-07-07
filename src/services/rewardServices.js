import Axios from "./axiosInstance";
import { customerData, sampleTransactions } from "../json/sampleData";

export const getCustomer = (customerID) => {
    // return Axios.get("/endpoint/"+customerID);
    return new Promise((resolve, rejcet) => {
      let response = customerData.find(user => user.customerId == customerID);
      if(response)
        resolve(response);
      else
        rejcet("Internal server error");
    });
}

export const getTransactions = (timePeriod) => {
    // return Axios.get("/transaction/"+timePeriod);
    return new Promise((resolve, rejcet) => {
      let response = sampleTransactions;
      if(response)
        resolve(response);
      else
        rejcet("400:bad request");
    });
}