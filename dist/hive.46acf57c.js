(function() {
    "use strict";
    var d, e = "function" == typeof Object.create ? Object.create : function(a) {
        function b() {}
        b.prototype = a;
        return new b;
    };
    function h(a) {
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
    var k = h(this), n;
    if ("function" == typeof Object.setPrototypeOf) n = Object.setPrototypeOf;
    else {
        var p;
        a: {
            var q = {
                a: !0
            }, r = {};
            try {
                r.__proto__ = q;
                p = r.a;
                break a;
            } catch (a) {}
            p = !1;
        }
        n = p ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a;
        } : null;
    }
    var u = n;
    var v = /^\d*\.?\d+\s\d*\.?\d+$/;
    function w(a) {
        var b = !1, c = a.getAttribute("focalpoint"), g = a.getAttribute("scaling");
        "cover" !== g && "none" !== g || a.hasAttribute("disablefocalpoint") || !c || !v.test(c) || (b = !0);
        return b;
    }
    function x(a) {
        return "gwd-page" == a.tagName.toLowerCase() || "gwd-page" == a.getAttribute("is");
    }
    function y(a) {
        if (x(a)) return a;
        for(; a && 9 != a.nodeType;)if ((a = a.parentElement) && x(a)) return a;
        return null;
    }
    function z(a) {
        var b = !1, c = null;
        return function() {
            b = !0;
            c || (b && (a(), b = !1), c = window.setTimeout(function() {
                c = null;
                b && (a(), b = !1);
            }, 250));
        };
    }
    var A = [
        "alignment",
        "alt",
        "focalpoint",
        "scaling",
        "source"
    ];
    function B() {
        var a = HTMLElement.call(this) || this;
        a.g = document.createElement("img");
        a.l = a.s.bind(a);
        a.o = z(a.u.bind(a));
        a.h = 0;
        a.i = -1;
        a.j = -1;
        a.m = !1;
        a.g.addEventListener("load", a.l, !1);
        a.g.addEventListener("error", a.l, !1);
        return a;
    }
    var C = HTMLElement;
    B.prototype = e(C.prototype);
    B.prototype.constructor = B;
    if (u) u(B, C);
    else for(var D in C)if ("prototype" != D) {
        if (Object.defineProperties) {
            var E = Object.getOwnPropertyDescriptor(C, D);
            E && Object.defineProperty(B, D, E);
        } else B[D] = C[D];
    }
    d = B.prototype;
    d.connectedCallback = function() {
        if (!this.m) {
            for(; this.firstChild;)this.removeChild(this.firstChild);
            var a = this.getAttribute("src");
            a && (this.setAttribute("source", a), this.removeAttribute("src"));
            a = this.ownerDocument.createElement("div");
            a.classList.add("intermediate-element");
            a.appendChild(this.g);
            this.appendChild(a);
            this.m = !0;
        }
        this.gwdIsLoaded() || ((a = y(this)) ? a.gwdIsLoaded() && this.gwdLoad() : this.gwdLoad());
        w(this) && window.addEventListener("resize", this.o, !1);
    };
    d.disconnectedCallback = function() {
        window.removeEventListener("resize", this.o, !1);
    };
    d.attributeChangedCallback = function(a) {
        if ("source" == a) 0 !== this.h && this.gwdLoad();
        else if ("scaling" == a) F(this);
        else if ("alignment" == a) G(this);
        else if ("focalpoint" == a) H(this);
        else if ("alt" == a) {
            var b = this.g;
            if (this.hasAttribute(a)) {
                var c = this.getAttribute(a);
                b.setAttribute(a, c);
            } else b.removeAttribute(a);
        }
    };
    d.s = function(a) {
        if (2 != this.h) {
            a && "error" == a.type ? (this.h = 3, this.i = this.j = -1, this.g.style.backgroundImage = "") : (-1 != this.j && -1 != this.i || !this.getAttribute("source") || (this.j = this.naturalWidth, this.i = this.naturalHeight), this.h = 2);
            F(this);
            w(this) ? H(this) : G(this);
            var b = void 0 === b ? null : b;
            a = document.createEvent("CustomEvent");
            a.initCustomEvent("ready", !0, !0, b);
            this.dispatchEvent(a);
        }
    };
    d.u = function() {
        w(this) && H(this);
    };
    d.gwdLoad = function() {
        this.h = 1;
        this.i = this.j = -1;
        var a = this.getAttribute("source") || "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        this.g.setAttribute("src", a);
    };
    d.gwdIsLoaded = function() {
        return 2 == this.h || 3 == this.h;
    };
    function F(a) {
        if (2 == a.h) {
            var b = a.getAttribute("source"), c = a.getAttribute("scaling") || "stretch";
            "stretch" == c ? (a.classList.remove("scaled-proportionally"), a.g.style.backgroundImage = "", a = a.g, b = b || "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", b != a.getAttribute("src") && a.setAttribute("src", b)) : (a.classList.add("scaled-proportionally"), a.g.style.backgroundImage = b ? "url(" + JSON.stringify(b) + ")" : "", a.g.style.backgroundSize = "none" != c ? c : "auto", b = a.g, "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" != b.getAttribute("src") && b.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="));
        }
    }
    function G(a) {
        var b = a.getAttribute("alignment") || "center";
        a.g.style.backgroundPosition = b;
    }
    function H(a) {
        var b = a.width, c = a.height, g = a.j, t = a.i, l = 1;
        "cover" == a.getAttribute("scaling") && (l = c / b > t / g ? c / t : b / g);
        var f = a.getAttribute("focalpoint").split(" "), m = parseFloat(f[0]) * l - b / 2;
        f = parseFloat(f[1]) * l - c / 2;
        m = 0 < m ? Math.min(m, g * l - b) : 0;
        f = 0 < f ? Math.min(f, t * l - c) : 0;
        a.g.style.backgroundPositionX = -m + "px";
        a.g.style.backgroundPositionY = -f + "px";
    }
    k.Object.defineProperties(B.prototype, {
        nativeElement: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.g;
            }
        },
        assetHeight: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.i;
            }
        },
        assetWidth: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.j;
            }
        },
        naturalHeight: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.g.naturalHeight;
            }
        },
        naturalWidth: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.g.naturalWidth;
            }
        },
        height: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.g.height;
            },
            set: function(a) {
                this.g.height = a;
            }
        },
        width: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.g.width;
            },
            set: function(a) {
                this.g.width = a;
            }
        },
        alt: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.g.alt;
            },
            set: function(a) {
                this.g.alt = a;
            }
        },
        src: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.g.src;
            }
        }
    });
    k.Object.defineProperties(B, {
        observedAttributes: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return A;
            }
        }
    });
    customElements.define("gwd-image", B);
}).call(this);

//# sourceMappingURL=hive.46acf57c.js.map
