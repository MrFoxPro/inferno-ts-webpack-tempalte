import { Component, render, version } from "inferno";
import "./main.css";
import { initDevTools } from "inferno-devtools";

import Test from "./test";
class MyComponent extends Component {
  public render() {
    return (
      <div>
        <h1>{`Welcome ${version}`}</h1>
        <Test />
      </div>
    );
  }
}
render(<MyComponent />, document.getElementById("app"));
initDevTools();
