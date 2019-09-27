import React from "react";
import PlayButton from "../components/playButton";
import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer
        .create(<PlayButton loading={1} message="Test" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("renders as a progress spinner when loading is 1", () => {
    const tree = renderer
        .create(<PlayButton loading={1} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("renders as a button when loading is 0", () => {
    const tree = renderer
      .create(<PlayButton loading={0} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
});
