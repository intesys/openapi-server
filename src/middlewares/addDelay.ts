import { RequestHandler } from "express";
import { DELAY, DELAY_RANGE_START, DELAY_RANGE_END } from "../lib/globals";

export const getDelayMinMaxValues = () => {
  const delayRangeStart = DELAY_RANGE_START || 0;
  let delayRangeEnd = DELAY_RANGE_END || 0;

  if (delayRangeEnd < delayRangeStart) {
    delayRangeEnd = delayRangeStart;
  }

  return {
    delayRangeStart,
    delayRangeEnd,
  };
};

export default (): RequestHandler => async (req, res, next) => {
  if (DELAY) {
    const delayMinMaxValues = getDelayMinMaxValues();

    const delayTime =
      Math.floor(Math.random() * (delayMinMaxValues.delayRangeEnd - delayMinMaxValues.delayRangeStart)) +
      delayMinMaxValues.delayRangeStart;

    await new Promise(r => setTimeout(r, delayTime));
    console.log("Request delayed by " + delayTime + "ms");
    res.set("Delay", "Request delayed by " + delayTime + "ms");
    return next();
  } else {
    return next();
  }
};
