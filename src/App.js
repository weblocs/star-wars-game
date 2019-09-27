import React, { Component } from "react";

import PlayerCard from "./components/playerCard";
import PlayButton from "./components/playButton";
import fetchRandomPerson from "./api"

const API = "https://swapi.co/api/people/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people_max: null,
      user: { name: "", mass: null },
      user2: { name: "", mass: null },
      user1Points: 0,
      user2Points: 0,
      message: "",
      loading: 0
    };
  }
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ people_max: data.count }));
  }

  compareMass = (mass1, mass2) => {
    if (mass1 > mass2) {
      this.setState({ user1Points: this.state.user1Points + 1, message: "Player 1 wins" });
    } else if (mass2 > mass1) {
      this.setState({ user2Points: this.state.user2Points + 1, message: "Player 2 wins" });
    } else if (mass2 === mass1) {
      this.setState({ message: "Draw" });
    }
  };

  toggleButtonState = () => {
    let max = this.state.people_max + 1;
    let mass1 = 0;
    let mass2 = 0;

    this.setState({ loading: 1 });

    fetchRandomPerson(max)
      .then(data => {
        this.setState({ user: data }, () => {
          if (this.state.user.mass && this.state.user.mass !== "unknown") {
            mass1 = parseFloat(this.state.user.mass);
          } else {
            mass1 = 0;
          }
        });
      })
      .then(() =>
      fetchRandomPerson(max)
        .then(data => {
          this.setState({ user2: data }, () => {
            if (this.state.user2.mass && this.state.user2.mass !== "unknown") {
              mass2 = parseFloat(this.state.user2.mass);
            } else {
              mass2 = 0;
            }
          });
        })
      )
      .then(() => {
        this.compareMass(mass1, mass2);
        this.setState({ loading: 0 });
      });
  };

  render() {
    const {
      user,
      user2,
      user1Points,
      user2Points,
      message,
      loading
    } = this.state;
    return (
      <div>
        <PlayerCard
          player="1"
          name={user.name}
          mass={user.mass}
          points={user1Points}
        />
        <PlayerCard
          player="2"
          name={user2.name}
          mass={user2.mass}
          points={user2Points}
        />
        <PlayButton
          loading={loading}
          message={message}
          toggleButtonState={this.toggleButtonState}
        />
      </div>
    );
  }
}

export default App;