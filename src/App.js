import React, { Component } from "react";

import PlayerCard from "./components/playerCard";
import PlayButton from "./components/playButton";
import fetchRandomPerson from "./api"

const API = "https://swapi.co/api/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people_max: null,
      starships_max: null,
      user: { name: "", mass: null },
      user2: { name: "", mass: null },
      user1Points: 0,
      user2Points: 0,
      compare1: 0,
      compare2: 0,
      message: "",
      loading: 0,
      compareData: 'starships'
    };
  }
  componentDidMount() {
    fetch(API + 'people/')
      .then(response => response.json())
      .then(data => this.setState({ people_max: data.count }));
    fetch(API + 'starships/')
      .then(response => response.json())
      .then(data => this.setState({ starships_max: data.count }));
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
    let max = 0;
    let compareData = this.state.compareData;
    if(compareData === 'people') {
      max = this.state.people_max;
    } else if(compareData === 'starships') {
      max = this.state.starships_max;
    }
    let compare1 = 0;
    let compare2 = 0;

    this.setState({ loading: 1 });

    fetchRandomPerson(max, compareData)
      .then(data => {
        this.setState({ user: data }, () => {
          if (this.state.user.mass && this.state.user.mass !== "unknown" && this.state.user.mass !== null) {
            compare1 = parseFloat(this.state.user.mass);
          } else if (this.state.user.crew && this.state.user.crew !== null) {
            compare1 = parseFloat(this.state.user.crew);
          } else {
            compare1 = 0;
          }
        });
      })
      .then(() =>
      fetchRandomPerson(max, compareData)
        .then(data => {
          this.setState({ user2: data }, () => {
            if (this.state.user2.mass && this.state.user2.mass !== "unknown" && this.state.user2.mass !== null) {
              compare2 = parseFloat(this.state.user2.mass);
            } else if (this.state.user.crew  && this.state.user.crew !== null) {
              compare2 = parseFloat(this.state.user2.crew);
            } else {
              compare2 = 0;
            }
          });
        })
      )
      .then(() => {
        this.compareMass(compare1, compare2);
        this.setState({ compare1: compare1, compare2: compare2 });
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
      loading,
      compare1,
      compare2
    } = this.state;
    return (
      <div>
        <PlayerCard
          player="1"
          name={user.name}
          mass={compare1}
          points={user1Points}
        />
        <PlayerCard
          player="2"
          name={user2.name}
          mass={compare2}
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