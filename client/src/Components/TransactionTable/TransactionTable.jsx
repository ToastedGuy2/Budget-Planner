import React, { useState } from "react";
import { DateTime } from "luxon";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import Formatter from "../../helper/currencyFormatter";
import { Box, Button, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from "./style";

function Demo({ isEditDisable, isDeleteDisable }) {
  const classes = useStyles();
  return (
    <Box className={classes.toolbar}>
      {/* <Typography variant="h4" className={classes.title}> */}
      <Typography variant="h5" className={classes.title}>
        Transactions
      </Typography>
      <Box>
        <Button
          startIcon={<AddCircleIcon />}
          variant="contained"
          color="primary"
          className={classes.toolbar_button}
        >
          Add
        </Button>
        <Button
          startIcon={<EditIcon />}
          variant="contained"
          color="secondary"
          className={classes.toolbar_button}
          disabled={isEditDisable}
        >
          Edit
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          className={`${classes.toolbar_button} ${classes.danger_btn}`}
          disabled={isDeleteDisable}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default function TransactionTable({ transactions }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const classes = useStyles();
  const rows = transactions.map((transaction) => {
    const { id, type, name, amount, category, date } = transaction;
    return createRowData(id, type, name, amount, category, date);
  });
  return (
    <Box className={classes.container}>
      <Box className={classes.subContainer}>
        <Box className={classes.subContainerItem}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            components={{
              Toolbar: Demo,
            }}
            onSelectionModelChange={(obj) => {
              setSelectedRows(obj);
            }}
            componentsProps={{
              toolbar: {
                isEditDisable:
                  selectedRows.length < 1 || selectedRows.length > 1,
                isDeleteDisable: selectedRows.length <= 0,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

const columns = [
  {
    field: "type",
    headerName: "Type",
    width: 125,
    description: "Income or Expense",
    renderCell: (params) =>
      params.value === "Income" ? (
        <Tooltip title="Income">
          <AddCircleIcon style={{ color: "#4caf50" }} />
        </Tooltip>
      ) : (
        <Tooltip title="Expense">
          <RemoveCircleIcon style={{ color: "#ff1744" }} />
        </Tooltip>
      ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    valueFormatter: (params) => {
      return Formatter.format(params.value);
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 250,
    valueFormatter: (params) => params.value.name,
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    valueFormatter: (params) => {
      return DateTime.fromJSDate(params.value).toLocaleString(
        DateTime.DATETIME_MED
      );
    },
  },
];
const createRowData = (id, type, name, amount, category, date) => ({
  id,
  type,
  name,
  amount,
  category,
  date: new Date(date),
});
