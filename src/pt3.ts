function getInput(): string {
  return `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;
}

enum Thing {
  Tree = "#",
  Snow = ".",
}

const things = getInput()
  .split("\n")
  .map((x) => x.split("").map((x) => (x === "." ? Thing.Snow : Thing.Tree)));

const collen = things[0].length;
let treeCount = 0;
things.forEach((row, i) => {
  if (row[(i * 3) % collen] === Thing.Tree) {
    treeCount++;
  }
});

console.log(treeCount);
