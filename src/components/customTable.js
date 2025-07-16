import PropTypes from "prop-types";
import { useEffect, useState, useMemo } from "react";
import { CustomSorting } from "../utils/customSorting";

/**
 *
 * @param {Object} props
 * @param {
 * Array<{
 *  name: string | JSX.Element,
 *  dataField: string,
 *  sorting: boolean
 *  formatter: () => JSX.Element
 * }>
 * } props.tableHeader
 * @param {
 *  Array<{
 *    transactionId: string,
 *    customerId : string,
 *    customerName : string,
 *    products : string,
 *    totalPrice : string | null
 *  }>
 * } props.tableData
 * @returns {JSX.Element}
 */
const CustomTable = ({ tableHeader, tableData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "customerId",
    direction: "asc",
  });

  const itemsPerPage = 5;
  let data = tableData;

  useEffect(() => {
    setCurrentPage(1);
  }, [data, sortConfig]);

  data = useMemo(() => CustomSorting(data, sortConfig), [data, sortConfig]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <div className="tableResponsive">
        <table className="table w-100">
          <thead className="thead-dark">
            <tr>
              {tableHeader.map((val) => (
                <th key={val.name}>
                  {val.name}
                  {val.sorting && currentItems.length > 0 && (
                    <div>
                      <span
                        className={`btn ${
                          sortConfig.key === val.dataField &&
                          sortConfig.direction === "asc"
                            ? "text-success"
                            : "text-white"
                        }`}
                        onClick={() =>
                          setSortConfig({
                            direction: "asc",
                            key: val.dataField,
                          })
                        }
                      >
                        ↑
                      </span>
                      <span
                        className={`btn ${
                          sortConfig.key === val.dataField &&
                          sortConfig.direction === "desc"
                            ? "text-success"
                            : "text-white"
                        }`}
                        onClick={() =>
                          setSortConfig({
                            direction: "desc",
                            key: val.dataField,
                          })
                        }
                      >
                        ↓
                      </span>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, index) => (
              <tr key={index}>
                {tableHeader.map((col) => (
                  <td key={col.dataField}>
                    {col.formatter
                      ? col.formatter(row[col.dataField])
                      : row[col.dataField]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Custom Pagination */}
      {currentItems.length !== 0 ? (
        <div className="d-flex">
          {/* Page Range */}
          <p className="my-auto">
            {indexOfFirst + 1} - {indexOfFirst + currentItems.length} of{" "}
            {data.length}
          </p>
          <div className=" ml-auto my-auto">
            <button
              className="btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button className="text-primary bg-transparent p-2 border-0">
              {currentPage}
            </button>
            <button
              className="btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center h5 my-5 text-danger">No data found</p>
      )}
    </>
  );
};

export default CustomTable;

CustomTable.propTypes = {
  tableHeader: PropTypes.object,
  tableData: PropTypes.object,
};
