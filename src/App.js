import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PlayerCard from "./components/playerCard";
import CircularProgress from '@material-ui/core/CircularProgress';
const API = "https://swapi.co/api/people/";

function fetchAPI(param) {
  return fetch(API + param.toString(), {
    method: "GET",
    headers: new Headers({})
  }).then(response => response.json());
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people_max: null,
      user: {'name' : '', mass: null},
      user_2: {'name' : '', mass: null},
      user1_points: 0,
      user2_points: 0,
      message: "",
      loading: 0
    };
  }
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ people_max: data.count }));
  }

  compareMass = (mass_1, mass_2) => {
    if (mass_1 > mass_2) {
      this.setState({ user1_points: this.state.user1_points + 1 });
      this.setState({ message: "Player 1 wins" });
    } else if (mass_2 > mass_1) {
      this.setState({ user2_points: this.state.user2_points + 1 });
      this.setState({ message: "Player 2 wins" });
    } else if (mass_2 === mass_1) {
      this.setState({ message: "Draw" });
    }
  };

  toggleButtonState = () => {
    let min = 1;
    let max = this.state.people_max + 1;
    let random = Math.round(min + Math.random() * (max - min));
    let random_2 = Math.round(min + Math.random() * (max - min));

    let mass_1 = 0;
    let mass_2 = 0;

    this.setState({ loading: 1 });

    fetchAPI(random)
      .then(data => {
        this.setState({ user: data }, () => {
          if (this.state.user.mass && this.state.user.mass !== "unknown") {
            mass_1 = parseFloat(this.state.user.mass);
          } else {
            mass_1 = 0;
          }
        });
      })
      .then(() =>
        fetchAPI(random_2).then(data => {
          this.setState({ user_2: data }, () => {
            if (
              this.state.user_2.mass &&
              this.state.user_2.mass !== "unknown"
            ) {
              mass_2 = parseFloat(this.state.user_2.mass);
            } else {
              mass_2 = 0;
            }

            this.compareMass(mass_1, mass_2);
          });
        })
      ).then(() => 
        this.setState({ loading: 0 })
      );

  };

  render() {
    const { user, user_2, user1_points, user2_points, message, loading } = this.state;
    return (
      <div>
        <PlayerCard player="1" name={user.name} mass={user.mass} points={user1_points} />
        <PlayerCard player="2" name={user_2.name} mass={user_2.mass} points={user2_points} />

        
        
        <div style={{margin: 10}}>
        { ( loading == 1 ) ? 
        <CircularProgress /> :
        <Button
          variant="contained"
          color="primary"
          onClick={this.toggleButtonState}
        >
          Play
        </Button>
        
        }
        <p>{message}</p>
        </div>

        
        
      </div>
    );
  }
}

export default App;
