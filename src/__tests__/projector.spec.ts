import { Projector } from "../projector";

describe("Projector", () => {
  test("getValueAll", () => {
    const projector = getProjector("/foo/bar");
    expect(projector.getValueAll()).toEqual({
      key1: "value3",
      key2: "topValue",
      key3: "isGreat",
    });
  });
  test("getValue", () => {
    let projector = getProjector("/foo/bar");
    expect(projector.getValue("key1")).toEqual("value3");
    projector = getProjector("/foo");
    expect(projector.getValue("key1")).toEqual("value2");
    projector = getProjector("/");
    expect(projector.getValue("key1")).toEqual("value1");
  });
  test("setValue", () => {
    let data = getData();
    let projector = getProjector("/foo/bar", data);
    projector.setValue("key1", "newValue");
    expect(projector.getValue("key1")).toEqual("newValue");

    projector.setValue("key3", "newValueForKey2");
    expect(projector.getValue("key3")).toEqual("newValueForKey2");

    projector = getProjector("/", data);
    expect(projector.getValue("key3")).toEqual("isGreat");
  });
  test("removeValue", () => {
    let projector = getProjector("/foo/bar");
    projector.removeValue("key3");
    expect(projector.getValue("key3")).toEqual("isGreat");

    projector.removeValue("key1");
    expect(projector.getValue("key1")).toEqual("value2");
  });
});

function getData() {
  return {
    projector: {
      "/": {
        key1: "value1",
        key3: "isGreat",
      },
      "/foo": {
        key1: "value2",
      },
      "/foo/bar": {
        key1: "value3",
        key2: "topValue",
      },
    },
  };
}

function getProjector(pwd: string, data = getData()): Projector {
  return new Projector(
    {
      args: [],
      operation: 0,
      pwd,
      configPath: "",
    },
    data
  );
}
