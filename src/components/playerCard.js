import React from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function PlayerCard(props) {
  return (
  <Card style={{width : 300, margin: 10}}>
    <CardContent>
      <Typography variant="h5">
        Player {props.player}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Points: {props.points}
      </Typography>
      <Typography variant="h6">
        {props.name}
      </Typography>
      <Typography color="textSecondary">
        { props.mass && 'Mass: ' } {props.mass}
        </Typography>
    </CardContent>
  </Card> );
}

PlayerCard.defaultProps = {
  name: '1',
  mass: '',
  points: 0
};

PlayerCard.propTypes = {
  player: PropTypes.string.isRequired,
  name: PropTypes.string,
  mass: PropTypes.string,
  points: PropTypes.number
};

export default PlayerCard;
