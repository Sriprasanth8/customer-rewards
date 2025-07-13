import PropTypes from "prop-types";

export const CustomSorting = (data, sortingConfig) => {
    return ([...data].sort((a, b) => {
        if (!sortingConfig.key) return 0;

        let aVal = a[sortingConfig.key] ?? "";
        let bVal = b[sortingConfig.key] ?? "";

        if (sortingConfig.key == "purchaseDate") {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
        }

        if(sortingConfig.key == "customerName" || sortingConfig.key == "products" || sortingConfig.key == "transactionId") {
            return sortingConfig.direction == "asc" ? (aVal ?? "").toString().toLowerCase().localeCompare(bVal.toLowerCase())
            : bVal.toString().toLowerCase().localeCompare(aVal.toLowerCase())
        }

        if (sortingConfig.direction === "asc") return aVal - bVal;
        else return bVal - aVal;
    }));
}

CustomSorting.propTypes = {
    data : PropTypes.object,
    sortingConfig : PropTypes.shape({
        key : PropTypes.string.isRequired,
        direction : PropTypes.string.isRequired
    })
}