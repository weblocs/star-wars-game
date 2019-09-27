import React from "react";
import PlayerCard from "../components/playerCard";
import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer
        .create(<PlayerCard player={1} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
