(function(window, undefined){

"use strict";

function Namespace()
{}

Namespace.VALIDATOR = /^[a-z](?:\w*)?(\.[a-z](?:\w*)?)*$/i;
Namespace.RESERVED_WORDS = 'instanceof this window function undefined true false null prototype constructor';

Namespace.create = function(namespace, root)
{
    var parts, n, name, tree,
        i = 0;

    if (!Namespace.VALIDATOR.test(namespace)) {
        throw new Error('Invalid namespace.');
    }

    if (root === undefined) {
        root = window;
    }

    parts = namespace.split('.');
    for (n = parts.length; i < n; i++) {
        name = parts[i];

        if (Namespace.isReservedWord(name)) {
            throw new Error('Cannot create namespace: "' + name + '" is a reserved word.');
        }

        if (!(name in root)) {
            root[name] = {};

        } else if (!Namespace.isValid(root[name])) {
            throw new Error('Can only create namespaces on simple objects.');

        }

        root = root[name];
    }
};

Namespace.isReservedWord = function(word)
{
    Namespace.RESERVED_WORDS.split(' ').indexOf(word) !== -1;
};

Namespace.isValid = function(namespace)
{
    return namespace instanceof Object && namespace.constructor === Object;
};

window.Namespace = Namespace;

}(window));