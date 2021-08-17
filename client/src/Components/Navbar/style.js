import { colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  brand: {
    fontWeight: "bold",
  },
  appBar: {
    // background: "linear-gradient(to left, #373F51, #008DD5) !important",
  },
  profile: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));
export default useStyles;
