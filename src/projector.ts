import * as fs from "fs";
import * as path from "path";

import { Config } from "./config";

export type Data = {
  projector: {
    // pwd
    [key: string]: {
      // key      -> value
      [key: string]: string;
    };
  };
};

const defaultData = {
  projector: {},
};
export class Projector {
  constructor(private config: Config, private data: Data) {}
  static fromConfig(config: Config): Projector {
    let data: Data = defaultData;
    if (fs.existsSync(config.configPath)) {
      try {
        data = JSON.parse(fs.readFileSync(config.configPath).toString());
      } catch (error) {
        console.error("Error reading config file", error);
      }
    }
    return new Projector(config, data);
  }

  getValueAll(): { [key: string]: string } {
    let out = {};
    let curr = this.config.pwd;
    let prev = "";
    const paths = [];

    do {
      paths.push(curr);
      prev = curr;
      curr = path.dirname(curr);
    } while (curr !== prev);

    return paths.reverse().reduce((acc, path) => {
      const value = this.data.projector[path];
      if (value) {
        Object.assign(acc, value);
      }
      return acc;
    }, out);
  }

  getValue(key: string): string | undefined {
    let curr = this.config.pwd;
    let prev = "";
    let out: string | undefined = undefined;

    do {
      const value = this.data.projector[curr]?.[key];
      if (value) {
        out = value;
        break;
      }
      prev = curr;
      curr = path.dirname(curr);
    } while (curr !== prev);

    return out;
  }

  setValue(key: string, value: string) {
    let dir = this.data.projector[this.config.pwd];
    if (!dir) {
      dir = this.data.projector[this.config.pwd] = {};
    }
    dir[key] = value;
  }

  removeValue(key: string) {
    let dir = this.data.projector[this.config.pwd];
    if (dir) {
      delete dir[key];
    }
  }
  save() {
    fs.writeFileSync(this.config.configPath, JSON.stringify(this.data));
  }
}
