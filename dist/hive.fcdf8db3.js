(function() {
    "use strict";
    var f;
    function l(a) {
        a = [
            "object" == typeof globalThis && globalThis,
            a,
            "object" == typeof window && window,
            "object" == typeof self && self,
            "object" == typeof global && global
        ];
        for(var b = 0; b < a.length; ++b){
            var c = a[b];
            if (c && c.Math == Math) return c;
        }
        throw Error("Cannot find global object");
    }
    var m = l(this), n = "function" == typeof Object.create ? Object.create : function(a) {
        function b() {}
        b.prototype = a;
        return new b;
    }, p;
    if ("function" == typeof Object.setPrototypeOf) p = Object.setPrototypeOf;
    else {
        var q;
        a: {
            var r = {
                a: !0
            }, t = {};
            try {
                t.__proto__ = r;
                q = t.a;
                break a;
            } catch (a) {}
            q = !1;
        }
        p = q ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a;
        } : null;
    }
    var u = p, v = this || self;
    function w(a, b) {
        a = a.split(".");
        var c = v;
        a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for(var d; a.length && (d = a.shift());)a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b;
    }
    var x = "center top bottom left right transparent".split(" ");
    var y = [
        "-ms-",
        "-moz-",
        "-webkit-",
        ""
    ];
    function z(a, b) {
        var c = void 0 === c ? !1 : c;
        for(var d, e, g = 0; g < y.length; g++)d = y[g] + "transition-duration", e = (c ? y[g] : "") + b, a.style.setProperty(d, e);
    }
    function A(a) {
        var b = document, c = b.getElementsByTagName("head")[0];
        if (!c) {
            var d = b.getElementsByTagName("body")[0];
            c = b.createElement("head");
            d.parentNode.insertBefore(c, d);
        }
        b = b.createElement("style");
        b.textContent = a;
        c.appendChild(b);
        return b;
    }
    function B(a, b, c) {
        c = void 0 === c ? null : c;
        var d = document.createEvent("CustomEvent");
        d.initCustomEvent(a, !0, !0, c);
        b.dispatchEvent(d);
    }
    function C(a, b, c) {
        function d(e) {
            a.removeEventListener(b, d);
            c(e);
        }
        a.addEventListener(b, d);
    }
    function D(a) {
        for(var b = 0; b < x.length; b++)a.classList.remove(x[b]);
    }
    function E(a, b) {
        function c() {
            a.removeEventListener("webkitTransitionEnd", c);
            a.removeEventListener("transitionend", c);
            b();
        }
        a.addEventListener("webkitTransitionEnd", c);
        a.addEventListener("transitionend", c);
    }
    function F(a, b, c, d) {
        c = "transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + c + "," + d + ",0,1);";
        return a + "." + b + "{-webkit-" + c + "-moz-" + c + "-ms-" + c + c + "}";
    }
    function G(a, b, c) {
        a = (a && "#") + a + ".gwd-pagedeck > .gwd-page";
        return F(a, "center", 0, 0) + F(a, "top", 0, c) + F(a, "bottom", 0, -c) + F(a, "left", b, 0) + F(a, "right", -b, 0);
    }
    function H(a, b, c, d, e, g, h) {
        d = void 0 === d ? "none" : d;
        this.g = a;
        this.h = b;
        this.m = c;
        this.i = "none" == d ? 0 : void 0 === e ? 1E3 : e;
        this.j = void 0 === g ? "linear" : g;
        this.l = [];
        if (this.i) {
            a = d;
            h = void 0 === h ? "top" : h;
            if (this.g) {
                this.g.classList.add("gwd-page");
                this.g.classList.add("center");
                b = "center";
                if ("push" == a) switch(h){
                    case "top":
                        b = "top";
                        break;
                    case "bottom":
                        b = "bottom";
                        break;
                    case "left":
                        b = "left";
                        break;
                    case "right":
                        b = "right";
                }
                this.l.push(b);
                "fade" == a && this.l.push("transparent");
            }
            b = "center";
            if ("none" != a && "fade" != a) switch(h){
                case "top":
                    b = "bottom";
                    break;
                case "bottom":
                    b = "top";
                    break;
                case "left":
                    b = "right";
                    break;
                case "right":
                    b = "left";
            }
            this.h.classList.add(b);
            this.h.classList.add("gwd-page");
            "fade" == a && this.h.classList.add("transparent");
        }
    }
    H.prototype.start = function() {
        if (this.i) {
            E(this.h, this.s.bind(this));
            this.g && (z(this.g, this.i + "ms"), this.g.classList.add(this.j));
            z(this.h, this.i + "ms");
            this.h.classList.add(this.j);
            var a = this.h;
            a.setAttribute("gwd-reflow", a.offsetWidth);
            if (this.g) for(a = 0; a < this.l.length; a++)this.g.classList.add(this.l[a]);
            D(this.h);
        } else this.m();
    };
    H.prototype.s = function() {
        this.g && (D(this.g), z(this.g, 0), this.g.classList.remove(this.j));
        z(this.h, 0);
        this.h.classList.remove(this.j);
        this.m();
    }; /*

 SPDX-License-Identifier: Apache-2.0
*/ 
    function I(a, b) {
        var c = void 0 === c ? v : c;
        c = c.performance;
        a = {
            label: a,
            type: 9,
            value: c && c.now && c.timing ? Math.floor(c.now() + c.timing.navigationStart) : Date.now()
        };
        b = b.google_js_reporting_queue = b.google_js_reporting_queue || [];
        2048 > b.length && b.push(a);
    }
    var J = {}, L = !1, M = !1;
    J.I = function(a) {
        L || (L = !0, I("11", a));
    };
    J.v = function(a) {
        M || (M = !0, I("12", a));
    };
    J.J = function(a, b, c) {
        var d = b;
        d = void 0 === d ? v : d;
        if (d = (d = d.performance) && d.now ? d.now() : null) a = {
            label: a,
            type: void 0 === c ? 0 : c,
            value: d
        }, b = b.google_js_reporting_queue = b.google_js_reporting_queue || [], 2048 > b.length && b.push(a);
    };
    J.reset = function(a) {
        M = L = !1;
        (a.google_js_reporting_queue = a.google_js_reporting_queue || []).length = 0;
    };
    w("gwd.rumUtil", J);
    w("gwd.rumUtil.logContentLoading", J.I);
    w("gwd.rumUtil.logContentRendered", J.v);
    w("gwd.rumUtil.logTimingEvent", J.J);
    w("gwd.rumUtil.reset", J.reset);
    function N() {
        var a = HTMLElement.call(this) || this;
        C(window, "WebComponentsReady", a.H.bind(a));
        a.s = a.o.bind(a, "shake");
        a.A = a.o.bind(a, "tilt");
        a.m = a.o.bind(a, "rotatetoportrait");
        a.l = a.o.bind(a, "rotatetolandscape");
        a.g = [];
        a.B = a.G.bind(a);
        a.D = a.F.bind(a);
        a.C = null;
        a.i = null;
        a.h = -1;
        a.j = !1;
        return a;
    }
    var O = HTMLElement;
    N.prototype = n(O.prototype);
    N.prototype.constructor = N;
    if (u) u(N, O);
    else for(var P in O)if ("prototype" != P) {
        if (Object.defineProperties) {
            var Q = Object.getOwnPropertyDescriptor(O, P);
            Q && Object.defineProperty(N, P, Q);
        } else N[P] = O[P];
    }
    f = N.prototype;
    f.connectedCallback = function() {
        this.addEventListener("pageload", this.B, !1);
        document.body.addEventListener("shake", this.s, !0);
        document.body.addEventListener("tilt", this.A, !0);
        document.body.addEventListener("rotatetoportrait", this.m, !0);
        document.body.addEventListener("rotatetolandscape", this.l, !0);
    };
    f.disconnectedCallback = function() {
        this.removeEventListener("pageload", this.B, !1);
        document.body && (document.body.removeEventListener("shake", this.s, !0), document.body.removeEventListener("tilt", this.A, !0), document.body.removeEventListener("rotatetoportrait", this.m, !0), document.body.removeEventListener("rotatetolandscape", this.l, !0));
    };
    f.H = function() {
        this.classList.add("gwd-pagedeck");
        this.C || (this.C = A(G(this.id, this.offsetWidth, this.offsetHeight)));
        this.g = Array.prototype.slice.call(this.querySelectorAll("gwd-page"));
        this.g.forEach(function(a) {
            a.classList.add("gwd-page");
        });
        for(B("pagesregistered", this, {
            pages: this.g.slice()
        }); this.firstChild;)this.removeChild(this.firstChild);
        -1 == this.h && void 0 !== this.u && this.goToPage(this.u);
    };
    function R(a, b, c, d, e, g) {
        if (!(a.h == b || 0 > b || b > a.g.length - 1 || a.i)) {
            var h = a.g[a.h], k = a.g[b];
            a.h = b;
            a.i = new H(h, k, a.D, c, d, e, g);
            var K = k.gwdLoad && !k.gwdIsLoaded();
            a.j = K;
            C(k, "attached", function() {
                k.gwdActivate();
                K ? k.gwdLoad() : S(a);
            });
            a.appendChild(k);
        }
    }
    f.G = function(a) {
        this.j && a.target.parentNode == this && (S(this), this.j = !1);
    };
    function S(a) {
        (0, J.v)(window);
        B("pagetransitionstart", a);
        a.i.start();
    }
    f.F = function() {
        if (this.i) {
            var a = this.i.g, b = this.i.h;
            this.i = null;
            B("pagetransitionend", this, {
                outgoingPage: a ? a : null,
                incomingPage: b
            });
            a && a.gwdDeactivate();
            b.gwdPresent();
        }
    };
    f.findPageIndexByAttributeValue = function(a, b) {
        for(var c = this.g.length, d, e = 0; e < c; e++)if (d = this.g[e], "boolean" == typeof b) {
            if (d.hasAttribute(a)) return e;
        } else if (d.getAttribute(a) == b) return e;
        return -1;
    };
    f.goToNextPage = function(a, b, c, d, e) {
        var g = this.h, h = g + 1;
        h >= this.g.length && (h = a ? 0 : g);
        R(this, h, b, c, d, e);
    };
    f.goToPreviousPage = function(a, b, c, d, e) {
        var g = this.h, h = this.g.length, k = g - 1;
        0 > k && (k = a ? h - 1 : g);
        R(this, k, b, c, d, e);
    };
    f.goToPage = function(a, b, c, d, e) {
        this.g.length ? (a = "number" == typeof a ? a : this.findPageIndexByAttributeValue("id", a), 0 <= a && R(this, a, b, c, d, e)) : this.u = a;
    };
    f.getPages = function() {
        return this.g;
    };
    f.getPage = function(a) {
        if ("number" != typeof a) {
            if (!a) return null;
            a = this.findPageIndexByAttributeValue("id", a);
        }
        return 0 > a || a > this.g.length - 1 ? null : this.g[a];
    };
    f.getCurrentPage = function() {
        return this.getPage(this.h);
    };
    f.getDefaultPage = function() {
        var a = this.getAttribute("default-page");
        return a ? this.getPage(this.findPageIndexByAttributeValue("id", a)) : this.getPage(0);
    };
    f.getOrientationSpecificPage = function(a, b) {
        b = this.getPage(b);
        var c = b.getAttribute("alt-orientation-page");
        if (!c) return b;
        var d = b.isPortrait();
        a = 1 == a;
        c = this.getPage(c);
        return a == d ? b : c;
    };
    f.o = function(a, b) {
        if (b.target == document.body) {
            var c = this.getPage(this.h);
            B(a, c, b.detail);
        }
    };
    f.getElementById = function(a) {
        for(var b = this.g.length, c = 0; c < b; c++){
            var d = this.g[c].querySelector("#" + a);
            if (d) return d;
        }
        return null;
    };
    f.getElementsBySelector = function(a) {
        for(var b = this.g.length, c = [], d = 0; d < b; d++){
            var e = this.g[d].querySelectorAll(a);
            e && (c = c.concat(Array.prototype.slice.call(e)));
        }
        return c;
    };
    m.Object.defineProperties(N.prototype, {
        currentIndex: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return 0 <= this.h ? this.h : void 0;
            }
        }
    });
    customElements.define("gwd-pagedeck", N);
}).call(this);

//# sourceMappingURL=hive.fcdf8db3.js.map
