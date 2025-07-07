export const sampleTransactions = [
  { transactionId: "TXN0001", customerId: 1001, customerName: "Alice Johnson", purchaseDate: "2025-07-01", product: "Laptop, Keyboard", totalPrice: 899.99 },
  { transactionId: "TXN0002", customerId: 1002, customerName: "Bob Smith", purchaseDate: "2025-07-02", product: "Mouse", totalPrice: 24.99 },
  { transactionId: "TXN0026", customerId: 1002, customerName: "Bob Smith", purchaseDate: "2025-07-07", product: "Keyboard, Monitor", totalPrice: 59.99 },
  { transactionId: "TXN0003", customerId: 1003, customerName: "Charlie Lee", purchaseDate: "2025-07-03", product: "Keyboard", totalPrice: 59.99 },
  { transactionId: "TXN0004", customerId: 1004, customerName: "Diana Clark", purchaseDate: "2025-07-04", product: "Monitor", totalPrice: 179.99 },
  { transactionId: "TXN0005", customerId: 1005, customerName: "Ethan White", purchaseDate: "2025-07-05", product: "Webcam, Mouse", totalPrice: 89.99 },

  { transactionId: "TXN0006", customerId: 1006, customerName: "Fiona Martin", purchaseDate: "2025-06-01", product: "Tablet, USB Hub", totalPrice: 329.99 },
  { transactionId: "TXN0007", customerId: 1007, customerName: "George Hall", purchaseDate: "2025-06-03", product: "Smartwatch", totalPrice: 199.99 },
  { transactionId: "TXN0008", customerId: 1008, customerName: "Hannah Adams", purchaseDate: "2025-06-10", product: "USB Hub", totalPrice: 39.99 },
  { transactionId: "TXN0027", customerId: 1008, customerName: "Hannah Adams", purchaseDate: "2025-05-26", product: "Laptop Stand, Mouse, Keyboard", totalPrice: 49.99 },
  { transactionId: "TXN0009", customerId: 1009, customerName: "Ian Wright", purchaseDate: "2025-06-15", product: "Bluetooth Speaker", totalPrice: 99.99 },
  { transactionId: "TXN0010", customerId: 1010, customerName: "Julia Baker", purchaseDate: "2025-06-20", product: "Laptop Stand", totalPrice: 49.99 },

  { transactionId: "TXN0011", customerId: 1011, customerName: "Kevin Davis", purchaseDate: "2025-05-02", product: "Camera", totalPrice: 399.99 },
  { transactionId: "TXN0012", customerId: 1012, customerName: "Laura Scott", purchaseDate: "2025-05-06", product: "Desk Lamp, Camera", totalPrice: 29.99 },
  { transactionId: "TXN0013", customerId: 1013, customerName: "Michael Young", purchaseDate: "2025-05-10", product: "Mechanical Keyboard", totalPrice: 109.99 },
  { transactionId: "TXN0014", customerId: 1014, customerName: "Nina Evans", purchaseDate: "2025-05-15", product: "Power Bank, Mobile, Charger", totalPrice: 39.99 },
  { transactionId: "TXN0015", customerId: 1015, customerName: "Oscar Turner", purchaseDate: "2025-05-25", product: "Wi-Fi Router", totalPrice: 89.99 },

  { transactionId: "TXN0016", customerId: 1016, customerName: "Paula Carter", purchaseDate: "2025-05-01", product: "Gaming Mouse", totalPrice: 59.99 },
  { transactionId: "TXN0017", customerId: 1017, customerName: "Quincy Foster", purchaseDate: "2025-05-05", product: "Charger, Headphones", totalPrice: 129.99 },
  { transactionId: "TXN0018", customerId: 1018, customerName: "Rachel Morgan", purchaseDate: "2025-05-12", product: "VR Headset", totalPrice: 499.99 },
  { transactionId: "TXN0019", customerId: 1019, customerName: "Steven Price", purchaseDate: "2025-06-18", product: "Flash Drive, Pendrive", totalPrice: 19.99 },
  { transactionId: "TXN0020", customerId: 1020, customerName: "Tina Brooks", purchaseDate: "2025-06-25", product: "Tripod", totalPrice: 44.99 },

  { transactionId: "TXN0021", customerId: 1021, customerName: "Umar Bennett", purchaseDate: "2025-06-03", product: "Smartphone, Charger, Headphones", totalPrice: 699.99 },
  { transactionId: "TXN0022", customerId: 1022, customerName: "Victoria Hughes", purchaseDate: "2025-05-08", product: "Smart Bulb", totalPrice: 29.99 },
  { transactionId: "TXN0023", customerId: 1023, customerName: "William Perry", purchaseDate: "2025-05-14", product: "Microphone, Camera", totalPrice: 129.99 },
  { transactionId: "TXN0024", customerId: 1024, customerName: "Xena Nichols", purchaseDate: "2025-07-01", product: "Extension Cable", totalPrice: 19.99 },
  { transactionId: "TXN0025", customerId: 1025, customerName: "Yusuf Sanders", purchaseDate: "2025-07-02", product: "Ring Light, Pendrive", totalPrice: 39.99 }
];

export const customerData = [
  {
    customerId: 1001,
    customerName: "Alice Johnson",
    transactions: [
      {
        transactionId: "TXN1001",
        purchaseDate: "2025-07-01",
        products: ["Laptop"],
        totalPrice: 899.99
      },
      {
        transactionId: "TXN1002",
        purchaseDate: "2025-06-15",
        products: ["Mouse", "Mouse Pad"],
        totalPrice: 44.98
      },
      {
        transactionId: "TXN1003",
        purchaseDate: "2025-06-28",
        products: ["HDMI Cable"],
        totalPrice: 14.99
      },
      {
        transactionId: "TXN1004",
        purchaseDate: "2025-05-12",
        products: ["Laptop Stand", "Cooling Pad"],
        totalPrice: 89.99
      },
      {
        transactionId: "TXN1005",
        purchaseDate: "2025-06-25",
        products: ["USB Hub"],
        totalPrice: 29.99
      }
    ]
  },
  {
    customerId: 1002,
    customerName: "Bob Smith",
    transactions: [
      {
        transactionId: "TXN1006",
        purchaseDate: "2025-07-02",
        products: ["Mouse"],
        totalPrice: 24.99
      },
      {
        transactionId: "TXN1007",
        purchaseDate: "2025-06-10",
        products: ["Keyboard", "Keycap Set"],
        totalPrice: 89.99
      },
      {
        transactionId: "TXN1008",
        purchaseDate: "2025-05-18",
        products: ["Bluetooth Adapter"],
        totalPrice: 19.99
      },
      {
        transactionId: "TXN1009",
        purchaseDate: "2025-05-30",
        products: ["Wireless Charger"],
        totalPrice: 29.99
      },
      {
        transactionId: "TXN1010",
        purchaseDate: "2025-05-08",
        products: ["USB-C Cable"],
        totalPrice: 12.99
      }
    ]
  },
  {
    customerId: 1003,
    customerName: "Charlie Lee",
    transactions: [
      {
        transactionId: "TXN1011",
        purchaseDate: "2025-07-03",
        products: ["Keyboard"],
        totalPrice: 59.99
      },
      {
        transactionId: "TXN1012",
        purchaseDate: "2025-06-01",
        products: ["Desk Mat", "Monitor Riser"],
        totalPrice: 49.99
      },
      {
        transactionId: "TXN1013",
        purchaseDate: "2025-06-20",
        products: ["Gaming Mouse"],
        totalPrice: 64.99
      },
      {
        transactionId: "TXN1014",
        purchaseDate: "2025-05-05",
        products: ["Keycaps"],
        totalPrice: 24.99
      },
      {
        transactionId: "TXN1015",
        purchaseDate: "2025-05-18",
        products: ["Power Bank"],
        totalPrice: 39.99
      }
    ]
  },
  {
    customerId: 1004,
    customerName: "Diana Clark",
    transactions: [
      {
        transactionId: "TXN1016",
        purchaseDate: "2025-07-04",
        products: ["Monitor"],
        totalPrice: 179.99
      },
      {
        transactionId: "TXN1017",
        purchaseDate: "2025-06-09",
        products: ["Monitor Arm"],
        totalPrice: 59.99
      },
      {
        transactionId: "TXN1018",
        purchaseDate: "2025-05-01",
        products: ["HDMI Switch", "HDMI Cable"],
        totalPrice: 34.99
      },
      {
        transactionId: "TXN1019",
        purchaseDate: "2025-05-22",
        products: ["Anti-glare Screen"],
        totalPrice: 19.99
      },
      {
        transactionId: "TXN1020",
        purchaseDate: "2025-06-15",
        products: ["Desk Lamp"],
        totalPrice: 27.99
      }
    ]
  },
  {
    customerId: 1005,
    customerName: "Ethan White",
    transactions: [
      {
        transactionId: "TXN1021",
        purchaseDate: "2025-07-05",
        products: ["Webcam"],
        totalPrice: 89.99
      },
      {
        transactionId: "TXN1022",
        purchaseDate: "2025-06-12",
        products: ["Tripod", "Ring Light"],
        totalPrice: 74.99
      },
      {
        transactionId: "TXN1023",
        purchaseDate: "2025-06-28",
        products: ["Webcam Cover"],
        totalPrice: 9.99
      },
      {
        transactionId: "TXN1024",
        purchaseDate: "2025-05-07",
        products: ["Microphone"],
        totalPrice: 129.99
      },
      {
        transactionId: "TXN1025",
        purchaseDate: "2025-06-22",
        products: ["USB Cable"],
        totalPrice: 14.99
      }
    ]
  },
  {
    customerId: 1006,
    customerName: "Fiona Martin",
    transactions: [
      {
        transactionId: "TXN1026",
        purchaseDate: "2025-07-01",
        products: ["Tablet"],
        totalPrice: 329.99
      },
      {
        transactionId: "TXN1027",
        purchaseDate: "2025-06-05",
        products: ["Tablet Cover", "Stylus Pen"],
        totalPrice: 59.99
      },
      {
        transactionId: "TXN1028",
        purchaseDate: "2025-06-20",
        products: ["Wireless Charger"],
        totalPrice: 24.99
      },
      {
        transactionId: "TXN1029",
        purchaseDate: "2025-05-15",
        products: ["USB-C Cable"],
        totalPrice: 14.99
      },
      {
        transactionId: "TXN1030",
        purchaseDate: "2025-04-25",
        products: ["Portable SSD"],
        totalPrice: 129.99
      }
    ]
  },
  {
    customerId: 1007,
    customerName: "George Hall",
    transactions: [
      {
        transactionId: "TXN1031",
        purchaseDate: "2025-07-03",
        products: ["Smartwatch"],
        totalPrice: 199.99
      },
      {
        transactionId: "TXN1032",
        purchaseDate: "2025-06-11",
        products: ["Watch Strap", "Smartwatch Case"],
        totalPrice: 39.99
      },
      {
        transactionId: "TXN1033",
        purchaseDate: "2025-06-25",
        products: ["Charging Dock"],
        totalPrice: 29.99
      },
      {
        transactionId: "TXN1034",
        purchaseDate: "2025-05-04",
        products: ["Fitness Band"],
        totalPrice: 89.99
      },
      {
        transactionId: "TXN1035",
        purchaseDate: "2025-04-15",
        products: ["Bluetooth Earbuds"],
        totalPrice: 59.99
      }
    ]
  },
  {
    customerId: 1008,
    customerName: "Hannah Adams",
    transactions: [
      {
        transactionId: "TXN1036",
        purchaseDate: "2025-07-04",
        products: ["USB Hub"],
        totalPrice: 39.99
      },
      {
        transactionId: "TXN1037",
        purchaseDate: "2025-06-06",
        products: ["Cable Organizer", "USB Cable"],
        totalPrice: 19.99
      },
      {
        transactionId: "TXN1038",
        purchaseDate: "2025-06-18",
        products: ["Power Extension"],
        totalPrice: 24.99
      },
      {
        transactionId: "TXN1039",
        purchaseDate: "2025-05-10",
        products: ["Surge Protector"],
        totalPrice: 34.99
      },
      {
        transactionId: "TXN1040",
        purchaseDate: "2025-04-28",
        products: ["Wireless Adapter"],
        totalPrice: 29.99
      }
    ]
  },
  {
    customerId: 1009,
    customerName: "Ian Wright",
    transactions: [
      {
        transactionId: "TXN1041",
        purchaseDate: "2025-07-02",
        products: ["Bluetooth Speaker"],
        totalPrice: 99.99
      },
      {
        transactionId: "TXN1042",
        purchaseDate: "2025-06-12",
        products: ["Aux Cable"],
        totalPrice: 9.99
      },
      {
        transactionId: "TXN1043",
        purchaseDate: "2025-06-23",
        products: ["Car Charger"],
        totalPrice: 19.99
      },
      {
        transactionId: "TXN1044",
        purchaseDate: "2025-05-09",
        products: ["Power Bank"],
        totalPrice: 39.99
      },
      {
        transactionId: "TXN1045",
        purchaseDate: "2025-04-17",
        products: ["Headphones"],
        totalPrice: 89.99
      }
    ]
  },
  {
    customerId: 1010,
    customerName: "Julia Baker",
    transactions: [
      {
        transactionId: "TXN1046",
        purchaseDate: "2025-07-05",
        products: ["Laptop Stand"],
        totalPrice: 49.99
      },
      {
        transactionId: "TXN1047",
        purchaseDate: "2025-06-07",
        products: ["Cooling Pad"],
        totalPrice: 34.99
      },
      {
        transactionId: "TXN1048",
        purchaseDate: "2025-06-19",
        products: ["Desk Organizer"],
        totalPrice: 24.99
      },
      {
        transactionId: "TXN1049",
        purchaseDate: "2025-05-11",
        products: ["LED Desk Lamp"],
        totalPrice: 39.99
      },
      {
        transactionId: "TXN1050",
        purchaseDate: "2025-04-24",
        products: ["Cable Ties", "Mini USB Hub"],
        totalPrice: 17.99
      }
    ]
  }
];
