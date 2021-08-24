import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "380px",
    marginTop: 16,
  },
  subContainer: {
    display: "flex",
    height: "100%",
  },
  subContainerItem: {
    flexGrow: 1,
  },
}));
export default useStyles;
