import createHttpError from "http-errors";

export default function inputCheck(inputs, next) {
  let inputDataType = [];
  for (let i = 0; i < inputs.length; i++) {
    if (typeof inputs[i] === "undefined") {
      inputDataType.push(undefined);
    }
  }
  if (inputDataType.includes(undefined)) {
    next(createHttpError(400, "Invalid input data"));
    return false;
  }
  return true;
}
