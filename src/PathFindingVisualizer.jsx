import { Component } from "react";
import "./PathFindingVisualizer.css";
import Node from "./Node";
import { dijkstra, shortestPath } from "./PathFindingAlgorithms/Dijkstra";
import aStar from "./PathFindingAlgorithms/AStar";

const START_NODE = [10, 10];
const END_NODE = [40, 10];

class SpeedButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { paddingLeft, content, setSpeed } = this.props;
    return (
      <button
        className="button"
        style={{ marginLeft: "1px", paddingLeft: { paddingLeft } }}
        onClick={() => setSpeed(content)}
      >
        <span>{content}</span>
      </button>
    );
  }
}

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = { GRID: [], isMousePressed: false, speed: 10 };
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseHover = this._onMouseHover.bind(this);
    this.buttons = {};
  }

  setSpeed(button) {
    if (button === "Fast") {
      this.setState({ speed: 10 });
    } else if (button === "Medium") {
      this.setState({ speed: 40 });
    } else if (button === "Slow") {
      this.setState({ speed: 80 });
    }
  }
  componentDidMount() {
    const GRID = createGrid();
    this.setState({ GRID });
    this.buttons["fast"] = (
      <SpeedButtons
        paddingLeft="8px"
        content="Fast"
        setSpeed={(content) => this.setSpeed(content)}
      ></SpeedButtons>
    );
    this.buttons["medium"] = (
      <SpeedButtons
        paddingLeft="6px"
        content="Medium"
        setSpeed={(content) => this.setSpeed(content)}
      ></SpeedButtons>
    );
    this.buttons["slow"] = (
      <SpeedButtons
        paddingLeft="6px"
        content="Slow"
        setSpeed={(content) => this.setSpeed(content)}
      ></SpeedButtons>
    );
  }
  animate(VisitedNodesInOrder, inOrderShortest) {
    for (let i = 1; i < VisitedNodesInOrder.length; i++) {
      if (i === VisitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(inOrderShortest);
        }, this.state.speed * i);
        return;
      }
      setTimeout(() => {
        const node = VisitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.column}`).className =
          "Node IsVisited";
      }, this.state.speed * i);
    }
  }
  animateShortestPath(inOrderShortest) {
    const { GRID } = this.state;
    const start_node = GRID[START_NODE[1]][START_NODE[0]];
    const end_node = GRID[END_NODE[1]][END_NODE[0]];
    for (let i = 0; i < inOrderShortest.length; i++) {
      let special = "";
      setTimeout(() => {
        const node = inOrderShortest[i];
        if (node === start_node) special = "Node_Start_F";
        if (node === end_node) special = "Node_End";
        document.getElementById(`node-${node.row}-${node.column}`).className =
          "Node shortest-path-nodes " + special;
      }, this.state.speed * 5 * i);
    }
  }
  runDijikstra() {
    const { GRID } = this.state;
    const start_node = GRID[START_NODE[1]][START_NODE[0]];
    const end_node = GRID[END_NODE[1]][END_NODE[0]];
    const VisitedNodesInOrder = dijkstra(GRID, start_node, end_node);
    const inOrderShortest = shortestPath(end_node);
    this.animate(VisitedNodesInOrder, inOrderShortest);
  }
  runAstar() {
    const { GRID } = this.state;
    const start_node = GRID[START_NODE[1]][START_NODE[0]];
    const end_node = GRID[END_NODE[1]][END_NODE[0]];
    const VisitedNodesInOrder = aStar(GRID, start_node, end_node);
    const inOrderShortest = shortestPath(end_node);
    this.animate(VisitedNodesInOrder, inOrderShortest);
  }

  _onMouseDown(row, column) {
    const { GRID } = this.state;
    GRID[row][column].isWall = !GRID[row][column].isWall;
    this.setState((state) => ({
      GRID,
      isMousePressed: true,
    }));
  }
  _onMouseHover(row, column) {
    if (!this.state.isMousePressed) return;
    const { GRID } = this.state;
    GRID[row][column].isWall = !GRID[row][column].isWall;
    this.setState((state) => ({
      GRID,
    }));
  }
  _onMouseUp() {
    this.setState((state) => ({
      isMousePressed: false,
    }));
  }

  clearBoard() {
    let GRID = createGrid();
    for (let row = 0; row < 25; row++) {
      for (let column = 0; column < 58; column++) {
        if (
          (row === START_NODE[1] && column === START_NODE[0]) ||
          (row === END_NODE[1] && column === END_NODE[0])
        )
          continue;
        document.getElementById(`node-${row}-${column}`).className = "Node";
      }
    }
    this.setState({ GRID });
  }

  render() {
    const { GRID, isMousePressed } = this.state;
    return (
      <>
        <nav className="navbar1">
          <div className="NavHeader">
            <p>Path Finding Visualizer</p>
          </div>
          <div className="seperator"></div>
          <button className="button" onClick={() => this.clearBoard()}>
            <span>Clear Board</span>
          </button>
          <div style={{ marginLeft: "18px" }} className="seperator"></div>
          <button className="button" onClick={() => this.runDijikstra()}>
            <span>Dijkstra's Algorithm</span>
          </button>
          <div style={{ marginLeft: "18px" }} className="seperator"></div>
          <button className="button" onClick={() => this.runAstar()}>
            <span>A* Algorithm</span>
          </button>
          <div style={{ marginLeft: "16px" }} className="seperator"></div>
          <div className="V_Speed">
            <p>Visualization Speed : </p>
            {this.buttons["fast"]}
            {this.buttons["medium"]}
            {this.buttons["slow"]}
          </div>
        </nav>

        <nav className="navbar2">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="_Node_H">
              <p>Wall Node</p>
            </div>
            <div className="_Node"></div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "30px",
            }}
          >
            <div className="_Node_H">
              <p>Visited Node</p>
            </div>
            <div className="_Node" style={{ background: " #eb5e0b" }}></div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "30px",
            }}
          >
            <div className="_Node_H">
              <p>Shortest Path Node</p>
            </div>
            <div className="_Node" style={{ background: "#0a7eac" }}></div>
          </div>
        </nav>
        <div className="Grid">
          {GRID.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, NodeIdx) => {
                  const { row, column, isStart, isEnd, isWall } = node;
                  return (
                    <Node
                      row={row}
                      column={column}
                      isStart={isStart}
                      isEnd={isEnd}
                      isWall={isWall}
                      isMousePressed={isMousePressed}
                      onMouseDown={(row, column) =>
                        this._onMouseDown(row, column)
                      }
                      onMouseHover={(row, column) =>
                        this._onMouseHover(row, column)
                      }
                      onMouseUp={() => this._onMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const createGrid = () => {
  const nodes = [];
  for (let row = 0; row < 25; row++) {
    const _row = [];
    for (let column = 0; column < 58; column++) {
      _row.push(createNode(row, column));
    }
    nodes.push(_row);
  }
  return nodes;
};

function createNode(ro, col) {
  const dict = {
    column: col,
    row: ro,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    isStart: col === START_NODE[0] && ro === START_NODE[1],
    isEnd: col === END_NODE[0] && ro === END_NODE[1],
    g: Infinity,
    h: Infinity,
    f: Infinity,
  };

  return dict;
}
