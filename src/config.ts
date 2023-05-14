import * as path from "path";
import { Options } from "./options";

export enum Operation {
  Print,
  Add,
  Remove,
}

export type Config = {
  args: string[];
  operation: Operation;
  configPath: string;
  pwd: string;
};

export const getConfig = (options: Options): Config => {
  return {
    pwd: getPwd(options),
    configPath: getCfg(options),
    args: getArgs(options),
    operation: getOperation(options),
  };
};

function getPwd(options: Options): string {
  if (options.pwd) {
    return options.pwd;
  }
  return process.cwd();
}

function getCfg(options: Options): string {
  if (options.config) {
    return options.config;
  }
  const home = process.env["HOME"];
  const location = process.env["XDG_CONFIG_HOME"] || home;
  if (!location) {
    throw new Error("Couldn't determine config location");
  }
  if (location === home) {
    return path.join(location, ".projector.json");
  }
  return path.join(location, "projector", ".projector");
}

function getOperation(options: Options): Operation {
  if (!options.args || options?.args?.length === 0) {
    return Operation.Print;
  }

  switch (options.args[0]) {
    case "add":
      return Operation.Add;
    case "rm":
      return Operation.Remove;
    default:
      return Operation.Print;
  }
}

function getArgs(options: Options): string[] {
  if (!options.args || options.args.length === 0) {
    return [];
  }

  const operation = getOperation(options);
  const numberOfArgsReceivedToDisplay = options.args.length - 1;
  if (operation === Operation.Print) {
    if (options.args.length > 1)
      throw new Error(
        `expected 0 or 1 arguments but got ${options.args.length}`
      );
    return options.args;
  }
  if (operation === Operation.Add) {
    if (options.args.length !== 3) {
      throw new Error(
        `expected 2 arguments but got ${numberOfArgsReceivedToDisplay}`
      );
    }
    return options.args.slice(1);
  }
  if (operation === Operation.Remove) {
    if (options.args.length !== 2) {
      throw new Error(
        `expected 1 argument but got ${numberOfArgsReceivedToDisplay}`
      );
    }
    return options.args.slice(1);
  }
  return [];
}
