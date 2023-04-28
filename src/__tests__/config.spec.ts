import { Operation, getConfig } from "../config";

test("print all", () => {
  const configObtained = getConfig({});
  expect(configObtained.operation).toEqual(Operation.Print);
  expect(configObtained.args).toEqual([]);
});

test("print key", () => {
  const configObtained = getConfig({
    args: ["foo"],
  });
  expect(configObtained.operation).toEqual(Operation.Print);
  expect(configObtained.args).toEqual(["foo"]);
});

test("print add", () => {
  const configObtained = getConfig({
    args: ["add", "foo", "bar"],
  });
  expect(configObtained.operation).toEqual(Operation.Add);
  expect(configObtained.args).toEqual(["foo", "bar"]);
});

test("print rm", () => {
  const configObtained = getConfig({
    args: ["rm", "bar"],
  });
  expect(configObtained.operation).toEqual(Operation.Remove);
  expect(configObtained.args).toEqual(["bar"]);
});

test("print should throw error", () => {
  expect(() =>
    getConfig({
      args: ["print", "bar", "foo"],
    })
  ).toThrowError();
});

test("add should throw error", () => {
  expect(() =>
    getConfig({
      args: ["add", "bar", "foo", "asd"],
    })
  ).toThrowError();
  expect(() =>
    getConfig({
      args: ["add", "bar"],
    })
  ).toThrowError();
});

test("rm should throw error", () => {
  expect(() =>
    getConfig({
      args: ["rm", "bar", "foo"],
    })
  ).toThrow();
  expect(() =>
    getConfig({
      args: ["rm"],
    })
  ).toThrow();
});
