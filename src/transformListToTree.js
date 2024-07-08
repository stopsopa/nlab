// transforms structure:
// {
//   "abc": "abc error",
//   "orange": "", // Falsy value as a value will be skipped
//   "productType.description": "size must be between 1 and 50",
//   "productType.description2": "description2 size must be between 1 and 50",
//   "test": "test error",
// }
//
// to:
//   {
//     transformed: {
//       abc: 'abc error',
//       productType: {
//         description: 'size must be between 1 and 50',
//         description2: 'description2 size must be between 1 and 50'
//       },
//       test: 'test error'
//     }
//   }
//
// it's better to have those errors in the form of the tree because
// this way error informations can be more easily split and pass down to react children components

// WARNING:
// WARNING: if that should be ever used with lodash then usage of _.setWith is needed instead of _.set
// WARNING: and replacing set(obj, key, value); with set(obj, String(key), value, Object);
// WARNING: otherwise last test "object not array" will fail returning array instead of object
// WARNING:
const set = require("./set");

const isObject = require("./isObject");

function transformListToTree(list) {
  if (!isObject(list)) {
    throw new Error(`transformListToTree error: list should be an object, it is >${typeof list}<`);
  }

  const obj = {};

  for (const [key, value] of Object.entries(list)) {
    if (typeof key === "string" && key.trim()) {
      if (typeof value === "string") {
        if (value.trim()) {
          set(obj, key, value);
        }
      } else if (value) {
        set(obj, key, value);
      }
    }
  }

  return obj;
}

module.exports = transformListToTree;
