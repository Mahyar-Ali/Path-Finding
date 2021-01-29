export function dijkstra(grid, startNode, endNode) {
  const NodesInOrder = [];
  startNode.distance = 0;
  const unVisitedNodes = getNodes(grid);

  while (unVisitedNodes.length !== 0) {
    unVisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    const closestNode = unVisitedNodes.shift();
    if (closestNode.isWall) {
      continue;
    }
    if (closestNode.distance === Infinity) return NodesInOrder;
    closestNode.isVisted = true;
    NodesInOrder.push(closestNode);
    if (closestNode === endNode) return NodesInOrder;
    updateNeighbours(closestNode, grid);
  }
}

function updateNeighbours(closestNode, grid) {
  const Neighbours = getNeighbours(closestNode, grid);
  Neighbours.forEach((node) => {
    node.distance = closestNode.distance + 1;
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

export function shortestPath(endNode) {
  const _path = [];
  let currentNode = endNode;
  while (currentNode) {
    _path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return _path;
}
