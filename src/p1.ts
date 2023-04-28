const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

const getInput = () => input;

function parseLine(line: string): [number, number] {
  const [direction, distance] = line.split(" ");
  const amount = +distance;
  if (direction === "forward") {
    return [amount, 0];
  }
  if (direction === "up") {
    return [0, -amount];
  }
  if (direction === "down") {
    return [0, amount];
  } else {
    console.log(direction);
    console.log(line);
    throw new Error("Invalid direction");
  }
}

const items = getInput()
  .split("\n")
  .map(parseLine)
  .reduce(
    (acc, val) => {
      return [acc[0] + val[0], acc[1] + val[1]];
    },
    [0, 0]
  );

console.log(items, items[0] * items[1]);
