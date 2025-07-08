# React + Vite
A **single-page** React application that simulates a **Customer Rewards** program for a retailer.

# Feature
- Calculate reward points<br/>
    - 2 points for every $1 spent over $100<br/>
    - 1 point for every $1 spent between $50 and $100<br/>
- Monthly reward points breakdown<br/>
- Transactions list with rewards per transaction<br/>
- Implemented filter to retrieve timeline-based transaction data.<br/>
- Custom pagination for transactions list<br/>
- Total rewards per customer<br/>
- Implemented a loading spinner for a smoother and more seamless user experience on API calls(Promises)<br/>
- Searching and sorting (asc|desc) on transaction records<br/>
- Error boundaries for UI fallback<br/>
- Optimized view for all screen sizes (responsive design)<br/>

# Installation
git clone https://github.com/Sriprasanth8/customer-rewards.git<br/>
cd customer-rewards<br/>
npm i<br/>
npm run dev<br/>

# UI
Build - React version(16+)<br/>
Style - Bootstrap, CSS-module<br/>
API - Axios<br/>
Testing - Manual Testing<br/>

# Sample dataset
I'm using Axios and josn file to simulate real world API calls.<br/>
I have create a two sample JSON dataset for API response simulation.<br/>

Transaction API response<br/>
```json
[
  {
    "transactionID" : "String",
    "customerId": "String",
    "customerName": "String",
    "purchaseDate": "yyyy-mm-dd",
    "product" : "String",
    "totalPrice" : "Number"
  }
]
```

Customer API response
```json
[
  {
    "customerId": "Number",
    "customerName": "String",
    "transactions": [
      {
        "transactionId": "String",
        "purchaseDate": "yyyy-mm-dd",
        "products": ["String"],
        "totalPrice": "Number"
      }
    ]
  }
]
```

# Author
> Prasanth Alagesan

# UI
Retailer dashboard
<img src="./src/assets/uiImages/Retailer-dashboard.png" alt="Retailer-dashboard" />

Date validation
<img src="./src/assets/uiImages/From-to-date-validation.png"  alt="Date-validation" />

Transaction table with filtering & sorting options
<img src="./src/assets/uiImages/Transaction-data-for-specific-timeline.png" alt="Transaction table with filtering & sorting options" />

Specific side tab for each customer information
<img src="./src/assets/uiImages/Customer-Info-tab.png"  alt="Specific side tab for each customer information" />

Fallback UI with Error Boundaries
<img src="./src/assets/uiImages/Fallback-ui-for-ui-errors.png"  alt="Fallback UI with Error Boundaries" />

API Error Handling
<img src="./src/assets/uiImages/Error-screen-for-api-failed.png"  alt="API Error Handling" />

Mobile Views
<img src="./src/assets/uiImages/mobile-view-1.png"  alt="API Error Handling" />
<img src="./src/assets/uiImages/mobile-view-2.png"  alt="API Error Handling" />
