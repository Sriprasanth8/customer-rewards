import { calculateRewardPoints } from "./rewardCalculation";
import { CustomSorting } from "./customSorting";
import {
  GetYearMonthDateFormat,
  GetYearMonthFormat,
  GetYearFullMonthFormat,
} from "./dateFormatting";

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
