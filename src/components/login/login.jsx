import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Header } from "../Header/Header";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 600,
    marginTop: "10%",
    margin: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const onClickLogin = useCallback(() => history.push("/"), []);

  return (
    <>
      <Header />
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Login画面
          </Typography>
          <Typography gutterBottom variant="h5" component="p">
            パスワードを入力してください！
          </Typography>
          <TextField id="outlined-basic" label="Enter Password" variant="outlined" />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={onClickLogin}>
            ログインする
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
