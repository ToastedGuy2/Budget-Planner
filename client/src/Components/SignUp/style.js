import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submitBtn: {
    margin: theme.spacing(2, 0),
  },
  wrapper: {
    position: "relative",
  },
  progressClass: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
export default useStyles;
