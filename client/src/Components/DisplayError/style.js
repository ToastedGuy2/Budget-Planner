import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { color: red[700], fontSize: "150px" },
  title: { margin: theme.spacing(1, 0) },
}));
export default useStyles;
