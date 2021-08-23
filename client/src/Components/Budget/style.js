import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  box: {
    color: "#FFf",
  },
  link: {
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      color: "#EBEBEB",
    },
  },
}));
export default useStyles;
