
/*!
 * @version 1.0 - 2013-05-21
 * @author Szymon Działowski
 * direction : 'rl'|'r'|'l'   -->   (undefined => 'rl')
 * charlist  : (undefined => " \n")
 */
module.exports = function trim(string, charlist, direction) {
    direction = direction || 'rl';
    charlist  = (charlist || '').replace(/([.?*+^$[\]\\(){}|-])/g,'\\$1');
    charlist  = charlist || " \\n";
    (direction.indexOf('r')+1) && (string = string.replace(new RegExp('^(.*?)['+charlist+']*$','gm'),'$1'));
    (direction.indexOf('l')+1) && (string = string.replace(new RegExp('^['+charlist+']*(.*)$','gm'),'$1'));
    return string;
}