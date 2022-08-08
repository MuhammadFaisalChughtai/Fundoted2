import { Container, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    width: "70%",
    marginLeft: "100px",
    justifyContent: "space-between",
    background: "#F5F5F5",
    marginTop: "20px",
  },
  title: {
    letterSpacing: "6px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  container: {
    display: "flex",
    margin: "20px",
  },

  left: {
    flex: 1,
  },

  right: {
    flex: 2,
  },
  image: {
    width: "100%",
    height: "60%",
  },
}));

export default useStyle;
