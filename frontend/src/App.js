import React, { Component } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField, { classes } from "./query";
import Card from "./card";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: ""
    };
  }

  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <div className="header">Bad Yelp Reviews!</div>
        <Grid container direction="row" justify="center" alignItems="center">
          <div>
            <TextField />
          </div>
          <Button size="large">GENERATE</Button>
        </Grid>
        <Card />
      </Grid>
    );
  }
}

export default App;
