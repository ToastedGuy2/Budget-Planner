import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.success.main,
    color: "#fff",
  },
  link: {
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      color: "#EBEBEB",
    },
  },
}));
// const useStyles = makeStyles((theme) => ({
//   box: {
//     margin: theme.spacing(2, 0),
//     textAlign: "center",
//     backgroundColor: "#F5F5F5",
//     padding: theme.spacing(3, 0),
//     borderRadius: theme.spacing(1),
//     boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
//   },
//   link: {
//     fontWeight: "bold",
//     "&:hover": {
//       color: theme.palette.primary.dark,
//     },
//   },
// }));
export default useStyles;
