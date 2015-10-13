/**
 * namespacejs
 *
 * A tiny library for creating JavaScript namespaces on the fly.
 *
 * @see    https://github.com/jaffog/namespacejs
 * @author Michiel Bakker (https)
 *
 * @license MIT
 *
 * ------------------------------------------------------------------------------
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Michiel Bakker (jaffog@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
    return Namespace.RESERVED_WORDS.split(' ').indexOf(word) !== -1;
};

Namespace.isValid = function(namespace)
{
    return namespace instanceof Object && namespace.constructor === Object;
};

window.Namespace = Namespace;

}(window));