const getInput = () =>
  `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

type Point = {
  x: number;
  y: number;
};

type Line = {
  p1: Point;
  p2: Point;
};

function isHorizontal(line: Line) {
  return line.p1.y === line.p2.y;
}

function isVertical(line: Line) {
  return line.p1.x === line.p2.x;
}

function isHOrV(line: Line) {
  return isHorizontal(line) || isVertical(line);
}

function parsePoint(p: string) {
  const [x, y] = p.split(",").map((coord) => parseInt(coord, 10));
  return { x, y };
}

function parseLine(line: string) {
  const [p1, p2] = line.split("->").map((point) => point.trim());
  return {
    p1: parsePoint(p1),
    p2: parsePoint(p2),
  };
}

console.log(getInput().split("\n").map(parseLine).filter(isHOrV));

function parseInput(input: string) {
  return input
    .split("->")
    .map((line) => line.trim())
    .map((line) => {
      const [p1, p2] = line.split("->").map((point) => point.trim());

      const [x1, y1] = p1.split(",").map((coord) => parseInt(coord, 10));
      const [x2, y2] = p2.split(",").map((coord) => parseInt(coord, 10));

      return {
        p1: { x: x1, y: y1 },
        p2: { x: x2, y: y2 },
      };
    });
}
