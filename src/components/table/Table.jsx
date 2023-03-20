import React from "react";
import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { tableRows, tableColumns } from "./tablesource";

const listTable = () => {
  return (
    <div className="table">
      <DataGrid
        rows={tableRows}
        columns={tableColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default listTable;
