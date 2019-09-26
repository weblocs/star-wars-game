import React, { Component } from "react";

import PlayerCard from './components/playerCard'
const API = "https://swapi.co/api/people/";




function fetchAPI(param) {
  return fetch(API + param.toString(), {
    method: "GET",
    headers: new Headers({  })
  }).then(response => response.json());
}





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people_max: null,
      user: Object,
      user_2: Object,
      user1_points: 0,
      user2_points: 0,
      message: ""
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
      this.setState({ message: "Wygrywa gracz 1" });
    } else if (mass_2 > mass_1) {
      this.setState({ user2_points: this.state.user2_points + 1 });
      this.setState({ message: "Wygrywa gracz 2" });
    } else if (mass_2 === mass_1) {
      this.setState({ message: "Remis" });
    }
  }

  toggleButtonState = () => {
    let min = 1;
    let max = this.state.people_max + 1;
    let random = Math.round(min + Math.random() * (max - min));
    let random_2 = Math.round(min + Math.random() * (max - min));

    let mass_1 = 0;
    let mass_2 = 0;

    this.setState({ message: "Loading..." });

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
      );
  };

  render() {
    const { user, user_2, user1_points, user2_points, message } = this.state;
    return (
      <div>
        <PlayerCard player="1" name={user.name} mass={user.mass} />
        <PlayerCard player="2" name={user_2.name} mass={user_2.mass} />
        
        <button onClick={this.toggleButtonState}> Click me </button>
        <p>{message}</p>
      </div>
    );
  }
}

export default App;
