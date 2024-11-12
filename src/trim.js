"use strict";

const pregQuote = require("./pregQuote");

/*!
 * @doc https://github.com/stopsopa/nlab#trim
 * @version 1.0 - 2013-05-21
 * @author Szymon Działowski
 * direction : 'rl'|'r'|'l'   -->   (undefined => 'rl')
 * charlist  : (undefined => " \n")
 */
/**
 *
 * @param {string} string
 * @param {string} charlist
 * @param {"r" | "l" | "rl"} direction
 * @returns {string}
 */
module.exports = function trim(string, charlist, direction) {
  if (typeof string !== "string") {
    return "";
  }

  direction = direction || "rl";
  charlist = pregQuote(charlist || "") || " \\n";
  direction.indexOf("r") + 1 && (string = string.replace(new RegExp("^(.*?)[" + charlist + "]*$", "gm"), "$1"));
  direction.indexOf("l") + 1 && (string = string.replace(new RegExp("^[" + charlist + "]*(.*)$", "gm"), "$1"));
  return string;
};

/*!
 * @version 1.0 - 2013-05-21
 * @author Szymon Działowski
 * direction : 'rl'|'r'|'l'   -->   (undefined => 'rl')
 * charlist  : (undefined => " \n")
 */

/*

function trim(string, charlist, direction) {
  direction = direction || 'rl';
  charlist  = (charlist || '').replace(/[|\\{}()[\]^$+*?.-]/g,'\\$&');
  charlist  = charlist || " \\n";
  (direction.indexOf('r')+1) && (string = string.replace(new RegExp('^(.*?)['+charlist+']*$','gm'),'$1'));
  (direction.indexOf('l')+1) && (string = string.replace(new RegExp('^['+charlist+']*(.*)$','gm'),'$1'));  
  return string;  
}   

*/
