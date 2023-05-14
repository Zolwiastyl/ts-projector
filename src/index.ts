import { Operation, getConfig } from "./config";
import { getOptions } from "./options";
import { Projector } from "./projector";

const options = getOptions();
const config = getConfig(options);

const projector = Projector.fromConfig(config);
switch (config.operation) {
  case Operation.Print:
    if (!options.args || options.args.length === 0) {
      console.log(projector.getValueAll());
      break;
    }

    console.log(projector.getValue(options.args[0]));
    break;
  case Operation.Add:
    projector.setValue(options.args[1], options.args[2]);
    projector.save();
    break;
  case Operation.Remove:
    projector.removeValue(options.args[1]);
    projector.save();
    break;
  default:
    throw new Error("Invalid operation");
}
