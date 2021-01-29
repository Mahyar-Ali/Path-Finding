export default function aStar(grid, startNode, endNode) {
  const NodesInOrder = [];
  startNode.g = startNode.h = startNode.f = 0;
  const unVisitedNodes = getNodes(grid);

  while (unVisitedNodes.length !== 0) {
    unVisitedNodes.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
    const closestNode = unVisitedNodes.shift();
    if (closestNode.isWall) {
      continue;
    }
    if (closestNode.g === Infinity) return NodesInOrder;
    closestNode.isVisted = true;
    NodesInOrder.push(closestNode);
    if (closestNode === endNode) return NodesInOrder;
    updateNeighbours(closestNode, grid, endNode);
  }
}

function updateNeighbours(closestNode, grid, endNode) {
  const Neighbours = getNeighbours(closestNode, grid);
  Neighbours.forEach((node) => {
    node.g = closestNode.g + 1;
    node.h =
      (node.row - endNode.row) ** 2 + (node.column - endNode.column) ** 2;
    console.log(node.row, node.column);
    node.f = node.g + node.h;
    console.log(node.f);
    node.previousNode = closestNode;
  });
}
function getNeighbours(node, grid) {
  const neighbours = [];
  const { column, row } = node;
  if (row > 0) neighbours.push(grid[row - 1][column]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][column]);
  if (column > 0) neighbours.push(grid[row][column - 1]);
  if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1]);
  return neighbours.filter((neighbour) => !neighbour.isVisted);
}

function getNodes(grid) {
  const nodes = [];
  grid.forEach((row) => {
    row.forEach((node) => {
      nodes.push(node);
    });
  });
  return nodes;
}
