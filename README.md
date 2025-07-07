# React + Vite
A single-page React application that simulates a customer rewards program for a retailer.

# Feature
Calculate reward points<br/>
    2 points for every $1 spent over $100<br/>
    1 point for every $1 spent between $50 and $100<br/>
Monthly reward points breakdown<br/>
Transactions list with rewards per transaction<br/>
Custom pagination for transactions list<br/>
Total rewards per customer<br/>
Implemented a loading spinner for a smoother and more seamless user experienceon API calls(Promises)<br/>
Searching and sorting (asc|desc) on transaction records<br/>
Error boundaries for UI fallback<br/>

# Installation
git clone https://github.com/Sriprasanth8/customer-rewards.git<br/>
cd customer-rewards<br/>
npm i<br/>
npm run dev<br/>

# UI
Build - React version(16+)<br/>
Style - Bootstrap, CSS-module<br/>
API - Axios (with Promise-based simulation)<br/>
Testing - Manual Testing<br/>

# Sample dataset
I'm using Promises to simulate API calls.<br/>
I have create a two sample JSON dataset for API response simulation.<br/>

Transaction API response<br/>
[<br/>
    transactionID : String,<br/>
    customerId: String,<br/>
    customerName: String,<br/>
    purchaseDate: "yyyy-mm-dd",<br/>
    product : String,<br/>
    totalPrice : Number<br/>
]<br/>
<br/>
Customer API response<br/>
[<br/>
  {<br/>
    "customerId": Number,<br/>
    "customerName": String,<br/>
    "transactions": Array[<br/>
      {<br/>
        "transactionId": String,<br/>
        "purchaseDate": "yyyy-mm-dd",<br/>
        "products": Array[String],<br/>
        "totalPrice": Number<br/>
      }<br/>
    ]<br/>
  }<br/>
]<br/>

# Author
Prasanth Alagesan
