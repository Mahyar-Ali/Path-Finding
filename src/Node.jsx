import { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      row,
      column,
      isStart,
      isEnd,
      isWall,
      onMouseDown,
      onMouseHover,
      onMouseUp,
    } = this.props;
    const type = isStart
      ? "Node_Start"
      : isEnd
      ? "Node_End"
      : isWall
      ? "Wall"
      : "";
    return (
      <div
        id={`node-${row}-${column}`}
        className={`Node ${type}`}
        onMouseDown={() => onMouseDown(row, column)}
        onMouseEnter={() => onMouseHover(row, column)}
        onMouseUp={onMouseUp}
      ></div>
    );
  }
}
