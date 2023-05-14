import * as cli from "command-line-args";

export type Options = {
  args?: string[];
  pwd?: string;
  config?: string;
};

export function getOptions(): Options {
  return cli([
    {
      name: "args",
      multiple: true,
      defaultOption: true,
      type: String,
    },
    {
      name: "pwd",
      alias: "p",
      type: String,
    },
    {
      name: "config",
      alias: "c",
      type: String,
    },
  ]) as Options;
}
