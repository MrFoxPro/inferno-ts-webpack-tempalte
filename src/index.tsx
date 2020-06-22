import { Component, render, version } from "inferno";
import "./main.css";
import { initDevTools } from "inferno-devtools";
class MyComponent extends Component {
  public render() {
    return (
      <div>
        <h1>{`Welcome to Inferno ${version}`}</h1>
      </div>
    );
  }
}
initDevTools();
render(<MyComponent />, document.getElementById("app"));
