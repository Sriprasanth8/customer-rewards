const RenderSortingIcon = ({columnName, sortConfig, setSortConfig}) => {
    return (
        <div>
            <span className={`btn ${sortConfig.key === columnName && sortConfig.direction === "asc" ? "text-success" : "text-white"}`}
                onClick={() => setSortConfig({ direction: "asc", key: columnName })}>↑</span>
            <span className={`btn ${sortConfig.key === columnName && sortConfig.direction === "desc" ? "text-success" : "text-white"}`}
                onClick={() => setSortConfig({ direction: "desc", key: columnName })}>↓</span>
        </div>
    )
}

export default RenderSortingIcon;

