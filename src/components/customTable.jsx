import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const CustomTable = ({ tableHeader, tableData, sortConfig, setSortConfig}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(()=> {
        setCurrentPage(1);
    },[tableData])

    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirst, indexOfLast);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (<>
        <div className="tableResponsive">
            <table className="table w-100">
                <thead className="thead-dark">
                    <tr>
                        {tableHeader.map((val) =>
                            <th key={val.name}>
                                {val.name}
                                {(val.sorting && currentItems.length > 0) && 
                                    <div>
                                        <span className={`btn ${sortConfig.key === val.dataField && sortConfig.direction === "asc" ? "text-success" : "text-white"}`}
                                            onClick={() => setSortConfig({ direction: "asc", key: val.dataField })}>↑</span>
                                        <span className={`btn ${sortConfig.key === val.dataField && sortConfig.direction === "desc" ? "text-success" : "text-white"}`}
                                            onClick={() => setSortConfig({ direction: "desc", key: val.dataField })}>↓</span>
                                    </div>
                                }
                                {val.filtering && 
                                    <input
                                        type="text"
                                        className="form-control w-50 mx-auto mt-2 text-success"
                                        name={val.filtering.name}
                                        placeholder=""
                                        value={val.filtering.value}
                                        onChange={val.filtering.handleValue}
                                    />
                                }
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row,index) => (
                        <tr key={index}>
                            {tableHeader.map((col) => (
                                <td key={col.dataField} style={col.style}>
                                    {col.formatter ? col.formatter(row[col.dataField]) : row[col.dataField]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/* Custom Pagination */}
        {currentItems.length != 0 ?
            <div className="d-flex">
                {/* Page Range */}
                <p className="my-auto">{indexOfFirst + 1} - {indexOfFirst + currentItems.length} of {tableData.length}</p>
                <div className=" ml-auto my-auto">
                    <button className="btn"
                        onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <button className="text-primary bg-transparent p-2 border-0">{currentPage}</button>
                    <button className="btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
            : 
            <p className="text-center h5 my-5 text-danger">
                No data found
            </p>
        }
    </>);
}

export default CustomTable;

CustomTable.propTypes = {
    tableHeader: PropTypes.object,
    tableData: PropTypes.object,
    sortConfig: PropTypes.shape({
        key : PropTypes.string,
        direction : PropTypes.string
    }),
    setSortConfig: PropTypes.func,
}