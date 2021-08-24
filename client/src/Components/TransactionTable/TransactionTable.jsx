import React from "react";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import { DataGrid } from "@material-ui/data-grid";
import Formatter from "../../helper/currencyFormatter";
import { Box, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from "./style";

export default function TransactionTable() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.subContainer}>
        <Box className={classes.subContainerItem}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </Box>
      </Box>
    </Box>
  );
}

const columns = [
  { field: "nRow", headerName: "#", width: 100 },
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
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    valueFormatter: (params) => {
      return params.value.toLocaleString(DateTime.DATE_MED);
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 160,
    renderCell: () => (
      <>
        <Tooltip title="See more details">
          <IconButton color="primary">
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Transaction">
          <IconButton color="secondary">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Transaction">
          <IconButton style={{ color: "#ff1744" }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];
const createRowData = (nRow, type, name, amount, category, date) => ({
  id: uuidv4(),
  nRow,
  type,
  name,
  amount,
  category,
  date,
  actions: <Button variant="contained">Hello World</Button>,
});

const rows = [
  createRowData(1, "Income", "Raise", 125, "Job", DateTime.now()),
  createRowData(
    2,
    "Expense",
    "Netflix",
    250,
    "Entertainment",
    DateTime.now().plus({ days: 1 })
  ),
  createRowData(
    3,
    "Income",
    "Month Salary",
    3500,
    "Job",
    DateTime.now().plus({ days: 2 })
  ),
  createRowData(
    5,
    "Income",
    "Lottery",
    800,
    "Luck",
    DateTime.now().minus({ days: 2 })
  ),
  createRowData(
    4,
    "Expense",
    "Youtube Premium",
    400,
    "Entertainment",
    DateTime.now().minus({ days: 1 })
  ),
];
