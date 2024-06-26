/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 Google as part of the polymer project is also subject to an additional IP
 rights grant found at http://polymer.github.io/PATENTS.txt
*/ (function() {
    if (void 0 !== window.Reflect && void 0 !== window.customElements && !window.customElements.polyfillWrapFlushCallback) {
        var BuiltInHTMLElement = HTMLElement;
        window.HTMLElement = function() {
            return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
        };
        HTMLElement.prototype = BuiltInHTMLElement.prototype;
        HTMLElement.prototype.constructor = HTMLElement;
        Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
    }
})();
(function() {
    var m;
    function n() {
        for(var a = Number(this), b = [], c = a; c < arguments.length; c++)b[c - a] = arguments[c];
        return b;
    }
    var p = window.Document.prototype.createElement, q = window.Document.prototype.createElementNS, aa = window.Document.prototype.importNode, ba = window.Document.prototype.prepend, ca = window.Document.prototype.append, da = window.DocumentFragment.prototype.prepend, ea = window.DocumentFragment.prototype.append, t = window.Node.prototype.cloneNode, u = window.Node.prototype.appendChild, v = window.Node.prototype.insertBefore, w = window.Node.prototype.removeChild, x = window.Node.prototype.replaceChild, z = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"), A = window.Element.prototype.attachShadow, B = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"), C = window.Element.prototype.getAttribute, D = window.Element.prototype.setAttribute, E = window.Element.prototype.removeAttribute, F = window.Element.prototype.getAttributeNS, G = window.Element.prototype.setAttributeNS, H = window.Element.prototype.removeAttributeNS, fa = window.Element.prototype.insertAdjacentElement, ha = window.Element.prototype.insertAdjacentHTML, ia = window.Element.prototype.prepend, ja = window.Element.prototype.append, ka = window.Element.prototype.before, la = window.Element.prototype.after, ma = window.Element.prototype.replaceWith, na = window.Element.prototype.remove, oa = window.HTMLElement, I = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"), pa = window.HTMLElement.prototype.insertAdjacentElement, qa = window.HTMLElement.prototype.insertAdjacentHTML;
    var ra = function() {
        var a = new Set;
        "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(b) {
            return a.add(b);
        });
        return a;
    }();
    function sa(a) {
        var b = ra.has(a);
        a = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);
        return !b && a;
    }
    var ta = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
    function J(a) {
        var b = a.isConnected;
        if (void 0 !== b) return b;
        if (ta(a)) return !0;
        for(; a && !(a.__CE_isImportDocument || a instanceof Document);)a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
        return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }
    function K(a) {
        var b = a.children;
        if (b) return Array.prototype.slice.call(b);
        b = [];
        for(a = a.firstChild; a; a = a.nextSibling)a.nodeType === Node.ELEMENT_NODE && b.push(a);
        return b;
    }
    function L(a, b) {
        for(; b && b !== a && !b.nextSibling;)b = b.parentNode;
        return b && b !== a ? b.nextSibling : null;
    }
    function M(a, b, c) {
        for(var e = a; e;){
            if (e.nodeType === Node.ELEMENT_NODE) {
                var d = e;
                b(d);
                var f = d.localName;
                if ("link" === f && "import" === d.getAttribute("rel")) {
                    e = d.import;
                    void 0 === c && (c = new Set);
                    if (e instanceof Node && !c.has(e)) for(c.add(e), e = e.firstChild; e; e = e.nextSibling)M(e, b, c);
                    e = L(a, d);
                    continue;
                } else if ("template" === f) {
                    e = L(a, d);
                    continue;
                }
                if (d = d.__CE_shadowRoot) for(d = d.firstChild; d; d = d.nextSibling)M(d, b, c);
            }
            e = e.firstChild ? e.firstChild : L(a, e);
        }
    }
    function ua() {
        var a = !(null == N || !N.noDocumentConstructionObserver), b = !(null == N || !N.shadyDomFastWalk);
        this.j = [];
        this.B = [];
        this.i = !1;
        this.shadyDomFastWalk = b;
        this.O = !a;
    }
    function O(a, b, c, e) {
        var d = window.ShadyDOM;
        if (a.shadyDomFastWalk && d && d.inUse) {
            if (b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll) for(a = d.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++)c(a[b]);
        } else M(b, c, e);
    }
    function va(a, b) {
        a.i = !0;
        a.j.push(b);
    }
    function wa(a, b) {
        a.i = !0;
        a.B.push(b);
    }
    function P(a, b) {
        a.i && O(a, b, function(c) {
            return Q(a, c);
        });
    }
    function Q(a, b) {
        if (a.i && !b.__CE_patched) {
            b.__CE_patched = !0;
            for(var c = 0; c < a.j.length; c++)a.j[c](b);
            for(c = 0; c < a.B.length; c++)a.B[c](b);
        }
    }
    function R(a, b) {
        var c = [];
        O(a, b, function(d) {
            return c.push(d);
        });
        for(b = 0; b < c.length; b++){
            var e = c[b];
            1 === e.__CE_state ? a.connectedCallback(e) : S(a, e);
        }
    }
    function T(a, b) {
        var c = [];
        O(a, b, function(d) {
            return c.push(d);
        });
        for(b = 0; b < c.length; b++){
            var e = c[b];
            1 === e.__CE_state && a.disconnectedCallback(e);
        }
    }
    function U(a, b, c) {
        c = void 0 === c ? {} : c;
        var e = c.P, d = c.upgrade || function(g) {
            return S(a, g);
        }, f = [];
        O(a, b, function(g) {
            a.i && Q(a, g);
            if ("link" === g.localName && "import" === g.getAttribute("rel")) {
                var h = g.import;
                h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry);
                h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : g.addEventListener("load", function() {
                    var k = g.import;
                    if (!k.__CE_documentLoadHandled) {
                        k.__CE_documentLoadHandled = !0;
                        var l = new Set;
                        e && (e.forEach(function(r) {
                            return l.add(r);
                        }), l.delete(k));
                        U(a, k, {
                            P: l,
                            upgrade: d
                        });
                    }
                });
            } else f.push(g);
        }, e);
        for(b = 0; b < f.length; b++)d(f[b]);
    }
    function S(a, b) {
        try {
            var c = a.K(b.ownerDocument, b.localName);
            c && a.M(b, c);
        } catch (e) {
            V(e);
        }
    }
    m = ua.prototype;
    m.M = function(a, b) {
        if (void 0 === a.__CE_state) {
            b.constructionStack.push(a);
            try {
                try {
                    if (new b.constructorFunction !== a) throw Error("The custom element constructor did not produce the element being upgraded.");
                } finally{
                    b.constructionStack.pop();
                }
            } catch (f) {
                throw a.__CE_state = 2, f;
            }
            a.__CE_state = 1;
            a.__CE_definition = b;
            if (b.attributeChangedCallback && a.hasAttributes()) {
                b = b.observedAttributes;
                for(var c = 0; c < b.length; c++){
                    var e = b[c], d = a.getAttribute(e);
                    null !== d && this.attributeChangedCallback(a, e, null, d, null);
                }
            }
            J(a) && this.connectedCallback(a);
        }
    };
    m.connectedCallback = function(a) {
        var b = a.__CE_definition;
        if (b.connectedCallback) try {
            b.connectedCallback.call(a);
        } catch (c) {
            V(c);
        }
    };
    m.disconnectedCallback = function(a) {
        var b = a.__CE_definition;
        if (b.disconnectedCallback) try {
            b.disconnectedCallback.call(a);
        } catch (c) {
            V(c);
        }
    };
    m.attributeChangedCallback = function(a, b, c, e, d) {
        var f = a.__CE_definition;
        if (f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b)) try {
            f.attributeChangedCallback.call(a, b, c, e, d);
        } catch (g) {
            V(g);
        }
    };
    m.K = function(a, b) {
        var c = a.__CE_registry;
        if (c && (a.defaultView || a.__CE_isImportDocument)) return W(c, b);
    };
    function xa(a, b, c, e) {
        var d = b.__CE_registry;
        if (d && (null === e || "http://www.w3.org/1999/xhtml" === e) && (d = W(d, c))) try {
            var f = new d.constructorFunction;
            if (void 0 === f.__CE_state || void 0 === f.__CE_definition) throw Error("Failed to construct '" + c + "': The returned value was not constructed with the HTMLElement constructor.");
            if ("http://www.w3.org/1999/xhtml" !== f.namespaceURI) throw Error("Failed to construct '" + c + "': The constructed element's namespace must be the HTML namespace.");
            if (f.hasAttributes()) throw Error("Failed to construct '" + c + "': The constructed element must not have any attributes.");
            if (null !== f.firstChild) throw Error("Failed to construct '" + c + "': The constructed element must not have any children.");
            if (null !== f.parentNode) throw Error("Failed to construct '" + c + "': The constructed element must not have a parent node.");
            if (f.ownerDocument !== b) throw Error("Failed to construct '" + c + "': The constructed element's owner document is incorrect.");
            if (f.localName !== c) throw Error("Failed to construct '" + c + "': The constructed element's local name is incorrect.");
            return f;
        } catch (g) {
            return V(g), b = null === e ? p.call(b, c) : q.call(b, e, c), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, Q(a, b), b;
        }
        b = null === e ? p.call(b, c) : q.call(b, e, c);
        Q(a, b);
        return b;
    }
    function V(a) {
        var b = "", c = "", e = 0, d = 0;
        a instanceof Error ? (b = a.message, c = a.sourceURL || a.fileName || "", e = a.line || a.lineNumber || 0, d = a.column || a.columnNumber || 0) : b = "Uncaught " + String(a);
        var f = void 0;
        void 0 === ErrorEvent.prototype.initErrorEvent ? f = new ErrorEvent("error", {
            cancelable: !0,
            message: b,
            filename: c,
            lineno: e,
            colno: d,
            error: a
        }) : (f = document.createEvent("ErrorEvent"), f.initErrorEvent("error", !1, !0, b, c, e), f.preventDefault = function() {
            Object.defineProperty(this, "defaultPrevented", {
                configurable: !0,
                get: function() {
                    return !0;
                }
            });
        });
        void 0 === f.error && Object.defineProperty(f, "error", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return a;
            }
        });
        window.dispatchEvent(f);
        f.defaultPrevented || console.error(a);
    }
    function ya() {
        var a = this;
        this.I = void 0;
        this.H = new Promise(function(b) {
            a.L = b;
        });
    }
    ya.prototype.resolve = function(a) {
        if (this.I) throw Error("Already resolved.");
        this.I = a;
        this.L(a);
    };
    function X(a) {
        var b = document;
        this.u = void 0;
        this.g = a;
        this.l = b;
        U(this.g, this.l);
        "loading" === this.l.readyState && (this.u = new MutationObserver(this.J.bind(this)), this.u.observe(this.l, {
            childList: !0,
            subtree: !0
        }));
    }
    X.prototype.disconnect = function() {
        this.u && this.u.disconnect();
    };
    X.prototype.J = function(a) {
        var b = this.l.readyState;
        "interactive" !== b && "complete" !== b || this.disconnect();
        for(b = 0; b < a.length; b++)for(var c = a[b].addedNodes, e = 0; e < c.length; e++)U(this.g, c[e]);
    };
    function Y(a) {
        this.o = new Map;
        this.s = new Map;
        this.D = new Map;
        this.A = !1;
        this.C = new Map;
        this.m = function(b) {
            return b();
        };
        this.h = !1;
        this.v = [];
        this.g = a;
        this.F = a.O ? new X(a) : void 0;
    }
    m = Y.prototype;
    m.N = function(a, b) {
        var c = this;
        if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");
        za(this, a);
        this.o.set(a, b);
        this.v.push(a);
        this.h || (this.h = !0, this.m(function() {
            return c.G();
        }));
    };
    m.define = function(a, b) {
        var c = this;
        if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
        za(this, a);
        Aa(this, a, b);
        this.v.push(a);
        this.h || (this.h = !0, this.m(function() {
            return c.G();
        }));
    };
    function za(a, b) {
        if (!sa(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
        if (W(a, b) && !window.enableHotReplacement) throw Error("A custom element with name '" + (b + "' has already been defined."));
        if (a.A) throw Error("A custom element is already being defined.");
    }
    function Aa(a, b, c) {
        a.A = !0;
        var e;
        try {
            var d = c.prototype;
            if (!(d instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
            var f = function(r) {
                var y = d[r];
                if (void 0 !== y && !(y instanceof Function)) throw Error("The '" + r + "' callback must be a function.");
                return y;
            };
            var g = f("connectedCallback");
            var h = f("disconnectedCallback");
            var k = f("adoptedCallback");
            var l = (e = f("attributeChangedCallback")) && c.observedAttributes || [];
        } catch (r) {
            throw r;
        } finally{
            a.A = !1;
        }
        c = {
            localName: b,
            constructorFunction: c,
            connectedCallback: g,
            disconnectedCallback: h,
            adoptedCallback: k,
            attributeChangedCallback: e,
            observedAttributes: l,
            constructionStack: []
        };
        a.s.set(b, c);
        a.D.set(c.constructorFunction, c);
        return c;
    }
    m.upgrade = function(a) {
        U(this.g, a);
    };
    m.G = function() {
        var a = this;
        if (!1 !== this.h) {
            this.h = !1;
            for(var b = [], c = this.v, e = new Map, d = 0; d < c.length; d++)e.set(c[d], []);
            U(this.g, document, {
                upgrade: function(k) {
                    if (void 0 === k.__CE_state) {
                        var l = k.localName, r = e.get(l);
                        r ? r.push(k) : a.s.has(l) && b.push(k);
                    }
                }
            });
            for(d = 0; d < b.length; d++)S(this.g, b[d]);
            for(d = 0; d < c.length; d++){
                for(var f = c[d], g = e.get(f), h = 0; h < g.length; h++)S(this.g, g[h]);
                (f = this.C.get(f)) && f.resolve(void 0);
            }
            c.length = 0;
        }
    };
    m.get = function(a) {
        if (a = W(this, a)) return a.constructorFunction;
    };
    m.whenDefined = function(a) {
        if (!sa(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
        var b = this.C.get(a);
        if (b) return b.H;
        b = new ya;
        this.C.set(a, b);
        var c = this.s.has(a) || this.o.has(a);
        a = -1 === this.v.indexOf(a);
        c && a && b.resolve(void 0);
        return b.H;
    };
    m.polyfillWrapFlushCallback = function(a) {
        this.F && this.F.disconnect();
        var b = this.m;
        this.m = function(c) {
            return a(function() {
                return b(c);
            });
        };
    };
    function W(a, b) {
        var c = a.s.get(b);
        if (c) return c;
        if (c = a.o.get(b)) {
            a.o.delete(b);
            try {
                return Aa(a, b, c());
            } catch (e) {
                V(e);
            }
        }
    }
    Y.prototype.define = Y.prototype.define;
    Y.prototype.upgrade = Y.prototype.upgrade;
    Y.prototype.get = Y.prototype.get;
    Y.prototype.whenDefined = Y.prototype.whenDefined;
    Y.prototype.polyfillDefineLazy = Y.prototype.N;
    Y.prototype.polyfillWrapFlushCallback = Y.prototype.polyfillWrapFlushCallback;
    function Z(a, b, c) {
        function e(d) {
            return function() {
                for(var f = n.apply(0, arguments), g = [], h = [], k = 0; k < f.length; k++){
                    var l = f[k];
                    l instanceof Element && J(l) && h.push(l);
                    if (l instanceof DocumentFragment) for(l = l.firstChild; l; l = l.nextSibling)g.push(l);
                    else g.push(l);
                }
                d.apply(this, f);
                for(f = 0; f < h.length; f++)T(a, h[f]);
                if (J(this)) for(h = 0; h < g.length; h++)f = g[h], f instanceof Element && R(a, f);
            };
        }
        void 0 !== c.prepend && (b.prepend = e(c.prepend));
        void 0 !== c.append && (b.append = e(c.append));
    }
    function Ba(a) {
        Document.prototype.createElement = function(b) {
            return xa(a, this, b, null);
        };
        Document.prototype.importNode = function(b, c) {
            b = aa.call(this, b, !!c);
            this.__CE_registry ? U(a, b) : P(a, b);
            return b;
        };
        Document.prototype.createElementNS = function(b, c) {
            return xa(a, this, c, b);
        };
        Z(a, Document.prototype, {
            prepend: ba,
            append: ca
        });
    }
    function Ca(a) {
        function b(e) {
            return function() {
                for(var d = n.apply(0, arguments), f = [], g = [], h = 0; h < d.length; h++){
                    var k = d[h];
                    k instanceof Element && J(k) && g.push(k);
                    if (k instanceof DocumentFragment) for(k = k.firstChild; k; k = k.nextSibling)f.push(k);
                    else f.push(k);
                }
                e.apply(this, d);
                for(d = 0; d < g.length; d++)T(a, g[d]);
                if (J(this)) for(g = 0; g < f.length; g++)d = f[g], d instanceof Element && R(a, d);
            };
        }
        var c = Element.prototype;
        void 0 !== ka && (c.before = b(ka));
        void 0 !== la && (c.after = b(la));
        void 0 !== ma && (c.replaceWith = function() {
            for(var e = n.apply(0, arguments), d = [], f = [], g = 0; g < e.length; g++){
                var h = e[g];
                h instanceof Element && J(h) && f.push(h);
                if (h instanceof DocumentFragment) for(h = h.firstChild; h; h = h.nextSibling)d.push(h);
                else d.push(h);
            }
            g = J(this);
            ma.apply(this, e);
            for(e = 0; e < f.length; e++)T(a, f[e]);
            if (g) for(T(a, this), f = 0; f < d.length; f++)e = d[f], e instanceof Element && R(a, e);
        });
        void 0 !== na && (c.remove = function() {
            var e = J(this);
            na.call(this);
            e && T(a, this);
        });
    }
    function Da(a) {
        function b(d, f) {
            Object.defineProperty(d, "innerHTML", {
                enumerable: f.enumerable,
                configurable: !0,
                get: f.get,
                set: function(g) {
                    var h = this, k = void 0;
                    J(this) && (k = [], O(a, this, function(y) {
                        y !== h && k.push(y);
                    }));
                    f.set.call(this, g);
                    if (k) for(var l = 0; l < k.length; l++){
                        var r = k[l];
                        1 === r.__CE_state && a.disconnectedCallback(r);
                    }
                    this.ownerDocument.__CE_registry ? U(a, this) : P(a, this);
                    return g;
                }
            });
        }
        function c(d, f) {
            d.insertAdjacentElement = function(g, h) {
                var k = J(h);
                g = f.call(this, g, h);
                k && T(a, h);
                J(g) && R(a, h);
                return g;
            };
        }
        function e(d, f) {
            function g(h, k) {
                for(var l = []; h !== k; h = h.nextSibling)l.push(h);
                for(k = 0; k < l.length; k++)U(a, l[k]);
            }
            d.insertAdjacentHTML = function(h, k) {
                h = h.toLowerCase();
                if ("beforebegin" === h) {
                    var l = this.previousSibling;
                    f.call(this, h, k);
                    g(l || this.parentNode.firstChild, this);
                } else if ("afterbegin" === h) l = this.firstChild, f.call(this, h, k), g(this.firstChild, l);
                else if ("beforeend" === h) l = this.lastChild, f.call(this, h, k), g(l || this.firstChild, null);
                else if ("afterend" === h) l = this.nextSibling, f.call(this, h, k), g(this.nextSibling, l);
                else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
            };
        }
        A && (Element.prototype.attachShadow = function(d) {
            d = A.call(this, d);
            if (a.i && !d.__CE_patched) {
                d.__CE_patched = !0;
                for(var f = 0; f < a.j.length; f++)a.j[f](d);
            }
            return this.__CE_shadowRoot = d;
        });
        B && B.get ? b(Element.prototype, B) : I && I.get ? b(HTMLElement.prototype, I) : wa(a, function(d) {
            b(d, {
                enumerable: !0,
                configurable: !0,
                get: function() {
                    return t.call(this, !0).innerHTML;
                },
                set: function(f) {
                    var g = "template" === this.localName, h = g ? this.content : this, k = q.call(document, this.namespaceURI, this.localName);
                    for(k.innerHTML = f; 0 < h.childNodes.length;)w.call(h, h.childNodes[0]);
                    for(f = g ? k.content : k; 0 < f.childNodes.length;)u.call(h, f.childNodes[0]);
                }
            });
        });
        Element.prototype.setAttribute = function(d, f) {
            if (1 !== this.__CE_state) return D.call(this, d, f);
            var g = C.call(this, d);
            D.call(this, d, f);
            f = C.call(this, d);
            a.attributeChangedCallback(this, d, g, f, null);
        };
        Element.prototype.setAttributeNS = function(d, f, g) {
            if (1 !== this.__CE_state) return G.call(this, d, f, g);
            var h = F.call(this, d, f);
            G.call(this, d, f, g);
            g = F.call(this, d, f);
            a.attributeChangedCallback(this, f, h, g, d);
        };
        Element.prototype.removeAttribute = function(d) {
            if (1 !== this.__CE_state) return E.call(this, d);
            var f = C.call(this, d);
            E.call(this, d);
            null !== f && a.attributeChangedCallback(this, d, f, null, null);
        };
        Element.prototype.removeAttributeNS = function(d, f) {
            if (1 !== this.__CE_state) return H.call(this, d, f);
            var g = F.call(this, d, f);
            H.call(this, d, f);
            var h = F.call(this, d, f);
            g !== h && a.attributeChangedCallback(this, f, g, h, d);
        };
        pa ? c(HTMLElement.prototype, pa) : fa && c(Element.prototype, fa);
        qa ? e(HTMLElement.prototype, qa) : ha && e(Element.prototype, ha);
        Z(a, Element.prototype, {
            prepend: ia,
            append: ja
        });
        Ca(a);
    }
    var Ea = {};
    function Fa(a) {
        function b() {
            var c = this.constructor;
            var e = document.__CE_registry.D.get(c);
            if (!e) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
            var d = e.constructionStack;
            if (0 === d.length) return d = p.call(document, e.localName), Object.setPrototypeOf(d, c.prototype), d.__CE_state = 1, d.__CE_definition = e, Q(a, d), d;
            var f = d.length - 1, g = d[f];
            if (g === Ea) throw Error("Failed to construct '" + e.localName + "': This element was already constructed.");
            d[f] = Ea;
            Object.setPrototypeOf(g, c.prototype);
            Q(a, g);
            return g;
        }
        b.prototype = oa.prototype;
        Object.defineProperty(HTMLElement.prototype, "constructor", {
            writable: !0,
            configurable: !0,
            enumerable: !1,
            value: b
        });
        window.HTMLElement = b;
    }
    function Ga(a) {
        function b(c, e) {
            Object.defineProperty(c, "textContent", {
                enumerable: e.enumerable,
                configurable: !0,
                get: e.get,
                set: function(d) {
                    if (this.nodeType === Node.TEXT_NODE) e.set.call(this, d);
                    else {
                        var f = void 0;
                        if (this.firstChild) {
                            var g = this.childNodes, h = g.length;
                            if (0 < h && J(this)) {
                                f = Array(h);
                                for(var k = 0; k < h; k++)f[k] = g[k];
                            }
                        }
                        e.set.call(this, d);
                        if (f) for(d = 0; d < f.length; d++)T(a, f[d]);
                    }
                }
            });
        }
        Node.prototype.insertBefore = function(c, e) {
            if (c instanceof DocumentFragment) {
                var d = K(c);
                c = v.call(this, c, e);
                if (J(this)) for(e = 0; e < d.length; e++)R(a, d[e]);
                return c;
            }
            d = c instanceof Element && J(c);
            e = v.call(this, c, e);
            d && T(a, c);
            J(this) && R(a, c);
            return e;
        };
        Node.prototype.appendChild = function(c) {
            if (c instanceof DocumentFragment) {
                var e = K(c);
                c = u.call(this, c);
                if (J(this)) for(var d = 0; d < e.length; d++)R(a, e[d]);
                return c;
            }
            e = c instanceof Element && J(c);
            d = u.call(this, c);
            e && T(a, c);
            J(this) && R(a, c);
            return d;
        };
        Node.prototype.cloneNode = function(c) {
            c = t.call(this, !!c);
            this.ownerDocument.__CE_registry ? U(a, c) : P(a, c);
            return c;
        };
        Node.prototype.removeChild = function(c) {
            var e = c instanceof Element && J(c), d = w.call(this, c);
            e && T(a, c);
            return d;
        };
        Node.prototype.replaceChild = function(c, e) {
            if (c instanceof DocumentFragment) {
                var d = K(c);
                c = x.call(this, c, e);
                if (J(this)) for(T(a, e), e = 0; e < d.length; e++)R(a, d[e]);
                return c;
            }
            d = c instanceof Element && J(c);
            var f = x.call(this, c, e), g = J(this);
            g && T(a, e);
            d && T(a, c);
            g && R(a, c);
            return f;
        };
        z && z.get ? b(Node.prototype, z) : va(a, function(c) {
            b(c, {
                enumerable: !0,
                configurable: !0,
                get: function() {
                    for(var e = [], d = this.firstChild; d; d = d.nextSibling)d.nodeType !== Node.COMMENT_NODE && e.push(d.textContent);
                    return e.join("");
                },
                set: function(e) {
                    for(; this.firstChild;)w.call(this, this.firstChild);
                    null != e && "" !== e && u.call(this, document.createTextNode(e));
                }
            });
        });
    }
    var N = window.customElements;
    function Ha() {
        var a = new ua;
        Fa(a);
        Ba(a);
        Z(a, DocumentFragment.prototype, {
            prepend: da,
            append: ea
        });
        Ga(a);
        Da(a);
        window.CustomElementRegistry = Y;
        a = new Y(a);
        document.__CE_registry = a;
        Object.defineProperty(window, "customElements", {
            configurable: !0,
            enumerable: !0,
            value: a
        });
    }
    N && !N.forcePolyfill && "function" == typeof N.define && "function" == typeof N.get || Ha();
    window.__CE_installPolyfill = Ha;
})();
(function() {
    var b = window.document;
    window.WebComponents = window.WebComponents || {};
    var a = function() {
        window.removeEventListener("DOMContentLoaded", a);
        window.WebComponents.ready = !0;
        var c = b.createEvent("CustomEvent");
        c.initEvent("WebComponentsReady", !0, !0);
        setTimeout(function() {
            window.document.dispatchEvent(c);
        }, 0);
    };
    "complete" === b.readyState ? a() : window.addEventListener("DOMContentLoaded", a);
})();

//# sourceMappingURL=hive.cd449fd5.js.map
