import createHttpError from "http-errors";

export default async function serverHelper(inputFunction, next) {
  try {
    await inputFunction();
  } catch (err) {
    console.error(err);
    return next(createHttpError(500, "server error from serverHelper"));
  }
}
