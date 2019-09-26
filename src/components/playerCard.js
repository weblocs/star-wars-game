import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function PlayerCard(props) {
  return (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Player {props.player}
      </Typography>
      <Typography variant="h5" component="h2">
        {props.name}
      </Typography>
      <Typography color="textSecondary">Mass: {props.mass}</Typography>
    </CardContent>
  </Card> );
}

export default PlayerCard;
