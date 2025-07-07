# React + Vite
A single-page React application that simulates a customer rewards program for a retailer.

# Feature
Calculate reward points:
    2 points for every $1 spent over $100
    1 point for every $1 spent between $50 and $100
Monthly reward points breakdown
Transactions list with rewards per transaction
Custom pagination for transactions list
Total rewards per customer
Implemented a loading spinner for a smoother and more seamless user experienceon API calls(Promises)
Searching and sorting (asc|desc) on transaction records.
Error boundaries for UI fallback

# Installation
git clone https://github.com/Sriprasanth8/customer-rewards.git
cd customer-rewards
npm i
npm run dev

# UI
Build - React version(16+)
Style - Bootstrap, CSS-module
API - Axios (with Promise-based simulation)
Testing - Manual Testing

# Sample dataset
I'm using Promises to simulate API calls.
I have create a two sample JSON dataset for API response simulation.

Transaction API response
[
    transactionID : String,
    customerId: String,
    customerName: String,
    purchaseDate: "yyyy-mm-dd",
    product : String,
    totalPrice : Number
]

Customer API response
[
  {
    "customerId": Number,
    "customerName": String,
    "transactions": Array[
      {
        "transactionId": String,
        "purchaseDate": "yyyy-mm-dd",
        "products": Array[String],
        "totalPrice": Number
      }
    ]
  }
]

# Author
Prasanth Alagesan
