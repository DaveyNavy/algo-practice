import { PriorityQueue } from "./priority-queue.mjs";
function knightMoves(start, end) {
  // Implementaion of Dijkstra's
  const graph = [];
  for (let i = 0; i < 8; i++) {
    graph[i] = [];
    for (let j = 0; j < 8; j++) {
      graph[i][j] = { length: Number.MAX_SAFE_INTEGER, path: [] };
    }
  }
  graph[start[0]][start[1]] = { length: 0, path: [start] };

  const jumps = [
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
  ];
  const q = new PriorityQueue((a, b) => a.length < b.length);
  q.push({ length: 0, coord: start });
  while (!q.isEmpty()) {
    const currValue = q.pop();
    if (currValue.coord[0] == end[0] && currValue.coord[1] == end[1]) {
      return graph[end[0]][end[1]];
    }
    for (const jump of jumps) {
      const x = currValue.coord[0] + jump[0];
      const y = currValue.coord[1] + jump[1];
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (graph[x][y].length > currValue.length + 1) {
          graph[x][y] = {
            length: currValue.length + 1,
            path: graph[currValue.coord[0]][currValue.coord[1]].path.concat([
              [x, y],
            ]),
          };
          q.push({ length: currValue.length + 1, coord: [x, y] });
        }
      }
    }
  }
  return null;
}

function printKnightMoves(start, end) {
  const res = knightMoves(start, end);
  let ret = `You made it in ${res.length} moves! Here's your path: `;
  res.path.forEach((element) => {
    ret += "\n" + "[ " + element[0] + ", " + element[1] + " ]";
  });
  return ret;
}

console.log(printKnightMoves([3, 3], [4, 3]));
