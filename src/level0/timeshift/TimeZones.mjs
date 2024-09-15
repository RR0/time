const PST = { name: "PST", timeshift: "-08", title: "Pacific Standard Time (US)" }
const PDT = { name: "PDT", timeshift: "-07", title: "Pacific Daylight Time (US)" }
const MDT = { name: "MDT", timeshift: "-06", title: "Mountain Standard Time (US)" }
const MST = { name: "MST", timeshift: "-07", title: "Mountain Daylight Time (US)" }
const Rio = { name: "Rio", timeshift: "-04", title: "Rio de Janeiro (Brazil)" }
const CWT = { name: "CWT", timeshift: "-05", title: "Central War Time (US)" }
const CDT = { name: "CDT", timeshift: "-05", title: "Central Daylight Time" }
const EST = { name: "EST", timeshift: "-05", title: "Eastern Standard Time (US)" }
const EDT = { name: "EDT", timeshift: "-04", title: "Eastern Time (US)" }
const AST = { name: "AST", timeshift: "-04", title: "Atlantic Standard Time (US)" }
const ADT = { name: "ADT", timeshift: "-03", title: "Atlantic Daylight Time (US)" }

const UTC = { name: "UTC", timeshift: "Z", title: "Coordinated Universal Time" }
const Z = { name: "Z", timeshift: "Z", title: "UTC" }

const BST = { name: "BST", timeshift: "+01", title: "British Summer Time" }

const CEST = { name: "CEST", timeshift: "+02", title: "Central European Summer Time" }
const CET = { name: "CET", timeshift: "+01", title: "Central European Time" }

const MSK = { name: "MSK", timeshift: "+03", title: "Moscow Time (RU)" }

/**
 * Mumbai (India)
 */
const IST = { name: "IST", timeshift: "+05:30", title: "Indian Standard Time" }

const Singapore = { name: "Singapore", timeshift: "+08", title: "Singapore (Singapore)" }

const China = { name: "CST", timeshift: "+08", title: "China Standard Time" }
const BJT = { name: "BJT", timeshift: "+08", title: "Beijing Time" }
const CST = { name: "CST", timeshift: "-06", title: "Central Standard Time" }
const JST = { name: "JST", timeshift: "+09", title: "Japan Standard Time" }
const AEST = { name: "AEST", timeshift: "+10", title: "Australian Eastern Standard Time" }
const NZST = { name: "NZST", timeshift: "+12", title: "New Zealand Standard Time" }

const LST = { name: "LST", timeshift: "?", title: "Local Sideral Time" }

export const timeZones = [ADT, AEST, AST, BJT, BST, CST, CDT, CET, CEST, CWT, EDT, EST, IST, JST, LST, MDT, MSK, MST, NZST, PDT, PST, UTC, Z]
