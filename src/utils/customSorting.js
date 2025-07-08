export const CustomSorting = (record, sortingConfig) => {
    return ([...record].sort((a, b) => {
        if (!sortingConfig.key) return 0;

        let aVal = a[sortingConfig.key];
        let bVal = b[sortingConfig.key];

        if (sortingConfig.key == "purchaseDate") {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
        }

        if(sortingConfig.key == "customerName" || sortingConfig.key == "product" ||sortingConfig.key == "products" || sortingConfig.key == "transactionId") {
            return sortingConfig.direction == "asc" ? aVal.toString().localeCompare(bVal, undefined, { sensitivity: 'base' })
            : bVal.toString().localeCompare(aVal, undefined, { sensitivity: 'base' })
        }

        if (sortingConfig.direction === "asc") return aVal - bVal;
        else return bVal - aVal;
    }));

}