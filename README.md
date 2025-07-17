# React + CRA
A **single-page** React application that simulates a **Customer Rewards** program for a retailer.

# Feature
- Calculate reward points<br/>
    - 2 points for every $1 spent over $100<br/>
    - 1 point for every $1 spent between $50 and $100<br/>
- Monthly reward points breakdown<br/>
- Transactions list with rewards per transaction<br/>
- Implemented filter to retrieve timeline-based transaction data.<br/>
- Custom pagination for tables<br/>
- Total rewards per customer<br/>
- Implemented a loading spinner for a smoother and more seamless user experience on API calls(Promises)<br/>
- Searching and sorting (asc|desc) on transaction records<br/>
- Error boundaries for UI fallback<br/>
- Optimized view for all screen sizes (responsive design)<br/>

# Installation
git clone https://github.com/Sriprasanth8/customer-rewards.git<br/>
cd customer-rewards<br/>
npm start<br/>

# UI
Build - React version(16+)<br/>
Style - Bootstrap, CSS<br/>
API - Axios<br/>
Testing - Manual Testing, Jest<br/>

# Sample dataset
I'm using Axios and josn file to simulate real world API calls.<br/>
I have create a sample JSON dataset for API response simulation.<br/>

Transaction API response<br/>
```json
[
  {
    "transactionID" : "string",
    "customerId": "string",
    "customerName": "string",
    "purchaseDate": "yyyy-mm-dd",
    "product" : "string",
    "totalPrice" : "number"
  }
]
```

# Directory structure
```bash
customer-rewards/
├── public/
│   ├── index.html
│   └── json/
├── src/
│   ├── assets/
│   ├── components/
│   ├── errorHandler/
│   ├── screens/
│   │   └── dashBoard/sections/
│   ├── services/
│   ├── utils/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── index.js
├── package.json
├── README.md
└── Unit_Test_Script.txt
```

# Test Script
Test script to validate the reward calculation, sorting, date format functionality
```js
describe("Testing reward calculation functionality", () => {
  const testData = [142.01, 23, 56.49, 89.9876, 4567];
  const expectedData = [134, 0, 6, 40, 8984];
  test("Testing with decimal & whole numbers", () => {
    for (let i = 0; i < testData.length; i++) {
      expect(calculateRewardPoints(testData[i])).toBe(expectedData[i]);
    }
  });
});

describe("Sorting", () => {
  const testData = [
    {
      transactionId: "TXN0009",
      customerId: 1003,
      customerName: "Charlie Davis",
      purchaseDate: "2025-02-16",
      products: "Monitor, Phone, Mouse",
      totalPrice: "152.13",
    },
    {
      transactionId: "TXN0001",
      customerId: 1001,
      customerName: "Alice Johnson",
      purchaseDate: "2025-01-04",
      products: null,
      totalPrice: "849.81",
    },
    {
      transactionId: "TXN0003",
      customerId: 1002,
      customerName: "Bob Smith",
      purchaseDate: "2025-02-04",
      products: "Headphones, Tablet",
      totalPrice: "546.33",
    },
  ];
  const expectedData = [
    {
      transactionId: "TXN0001",
      customerId: 1001,
      customerName: "Alice Johnson",
      purchaseDate: "2025-01-04",
      products: null,
      totalPrice: "849.81",
    },
    {
      transactionId: "TXN0003",
      customerId: 1002,
      customerName: "Bob Smith",
      purchaseDate: "2025-02-04",
      products: "Headphones, Tablet",
      totalPrice: "546.33",
    },
    {
      transactionId: "TXN0009",
      customerId: 1003,
      customerName: "Charlie Davis",
      purchaseDate: "2025-02-16",
      products: "Monitor, Phone, Mouse",
      totalPrice: "152.13",
    },
  ];
  describe("Testing Sort functionality", () => {
    const dataField = ["transactionId", "customerName", "purchaseDate"];
    dataField.forEach((key) => {
      test("Ascending order of " + key, () => {
        expect(
          CustomSorting(testData, { key: key, direction: "asc" })
        ).toEqual(expectedData);
      });
    });
  });
});

describe("Date formatting", () => {
  test("Testing yyyy/mm/dd format", () => {
    expect(GetYearMonthDateFormat(new Date())).toBe("2025-07-16");
    expect(GetYearMonthDateFormat("2025-07-15")).toBe("2025-07-15");
  });
  test("Testing yyyy/mm format", () => {
    expect(GetYearMonthFormat(new Date())).toBe("2025-07");
    expect(GetYearMonthFormat("2025-07-15")).toBe("2025-07");
  });
  test("Testing MM yyyy format", () => {
    expect(GetYearFullMonthFormat(new Date())).toBe("July 2025");
    expect(GetYearFullMonthFormat("2025-07-15")).toBe("July 2025");
  });
});
```

# Author
> Prasanth Alagesan

# UI
Retailer dashboard
<img src="./src/assets/uiImages/Landing-page.png" alt="Retailer-dashboard" />

Date validation
<img src="./src/assets/uiImages/Date-validation.png"  alt="Date-validation" />

Transaction table with sorting options
<img src="./src/assets/uiImages/Datas-for-specific-timeline.png" alt="Transaction table with sorting options" />

Fallback UI for Error
<img src="./src/assets/uiImages/Fallback-ui.png"  alt="Fallback UI for Error" />

No data with the specific timeline
<img src="./src/assets/uiImages/No-data.png"  alt="No-data" />