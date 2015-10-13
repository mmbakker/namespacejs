/**
 * namespacejs
 *
 * A tiny library for creating JavaScript namespaces on the fly.
 *
 * @see    https://github.com/jaffog/namespacejs
 * @author Michiel Bakker (https://nl.linkedin.com/in/mmbakker)
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
var Namespace = (function(window){

    "use strict";

    /**
     * Regex for testing a namespace string.
     *
     * @private
     *
     * @type {RegExp}
     */
    var _namespacePattern = /^[a-z](?:\w*)?(\.[a-z](?:\w*)?)*$/i;

    /**
     * Test if a given string can be converted to a namespace.
     *
     * @private
     *
     * @param  {string}  namespaceString The namespace to check.
     * @return {boolean}                 True if the namespace string is valid,
     *                                   false otherwise.
     */
    function _isValidNamespaceString(namespaceString)
    {
        return _namespacePattern.test(namespaceString);
    }

    /**
     * Tests whether a variable contains a simple object.
     *
     * @private
     *
     * @param  {Object}   object A value to test.
     * @return {boolean}         Returns if the value given is a simple object or not.
     */
    function _isSimpleObject(object)
    {
        return object instanceof Object && object.constructor === Object;
    }

    /**
     * Creates a new namespace.
     *
     * @private
     *
     * @param  {string} namespaceString The new namespace to create.
     * @param  {Object} object          The new namespace to create.
     */
    function _createNamespace(namespaceString, object)
    {
        var parts, n, name,
            i = 0,
            target = window;

        if (!_isValidNamespaceString(namespaceString)) {
            throw new Error('Invalid namespace.');
        }

        parts = namespaceString.split('.');
        for (n = parts.length; i < n; i++) {
            name = parts[i];

            if (!(name in target)) {
                target[name] = {};

            } else if (!_isSimpleObject(target[name])) {
                throw new Error('Can only create namespaces on simple objects.');

            }

            target = target[name];
        }

        // If object specified, register its contents to the namespace.
        if (object) {
            for (name in object) {
                target[name] = object[name];
            }
        }
    }

    /**
     * Returns a reference to the namespace.
     *
     * @private
     *
     * @param  {string} namespaceString The namespace.
     * @return {Object|undefined}       A reference to the namespace, or undefined if the
     *                                  namespace doesn't exist.
     */
    function _getReference(namespaceString)
    {
        var namespace = window,
            parts = namespaceString.split('.'),
            i = 0,
            n = parts.length;

        for (; i < n; i++) {
            if (!(parts[i] in namespace)) {
                return undefined;
            }

            namespace = namespace[parts[i]];
        }

        return namespace;
    }

    /**
     * Create a namespace.
     *
     * @public
     *
     * @param {string} namespaceString The namespace to create.
     * @param {Object} object          If specified, register this object to the namespace
     *                                 (key/value).
     */
    function Namespace(namespaceString, object)
    {
        _createNamespace(namespaceString, object);
    }

    /**
     * Tells whether a namespace exists or not.
     *
     * @public
     *
     * @param  {string}  namespaceString The namespace to check.
     * @return {boolean}                 True if the namespace exists, false otherwise.
     */
    Namespace.exists = function(namespaceString)
    {
        return _getReference(namespaceString) !== undefined;
    };

    return Namespace;

}(window));
