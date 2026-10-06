/**
 * Names of the properties holding each date component in a parsed/spec object, shared by parsers and data classes
 * (so that the latter do not have to import the former).
 */
export const componentGroups = Object.freeze({
  year: "year",
  month: "month",
  day: "day",
  hour: "hour",
  minute: "minute",
  second: "second",
  timeshift: "timeshift",
  uncertain: "uncertain",
  approximate: "approx"
})
