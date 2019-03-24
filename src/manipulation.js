
const manipulation = {
    after: function (referenceNode, newNode) {
        return this.before(referenceNode.nextSibling, newNode);
    },
    before: function (referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode);
        return this;
    },
    append: function (parentNode, newNode) {
        parentNode.appendChild(newNode);
        return this;
    },
    prepend: function (parentNode, newNode) {
        parentNode.insertBefore(newNode, parentNode.firstChild);
        return this;
    },
    remove: function (node) {
        node.parentNode.removeChild(node);
        return this;
    },
    empty: function (node) {
        while(node.firstChild){
            node.removeChild(node.firstChild);
        }
        return this;
    }
};

module.exports = manipulation;