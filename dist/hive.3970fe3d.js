(function() {
    "use strict";
    var d, e = "function" == typeof Object.create ? Object.create : function(a) {
        function c() {}
        c.prototype = a;
        return new c;
    }, f;
    if ("function" == typeof Object.setPrototypeOf) f = Object.setPrototypeOf;
    else {
        var g;
        a: {
            var h = {
                a: !0
            }, l = {};
            try {
                l.__proto__ = h;
                g = l.a;
                break a;
            } catch (a) {}
            g = !1;
        }
        f = g ? function(a, c) {
            a.__proto__ = c;
            if (a.__proto__ !== c) throw new TypeError(a + " is not extensible");
            return a;
        } : null;
    }
    var m = f;
    function n(a, c) {
        var b = void 0 === b ? null : b;
        var k = document.createEvent("CustomEvent");
        k.initCustomEvent(a, !0, !0, b);
        c.dispatchEvent(k);
    }
    function p() {
        var a = HTMLElement.call(this) || this;
        a.s = a.u.bind(a);
        a.g = [];
        a.l = !1;
        a.j = !1;
        a.h = !1;
        a.o = -1;
        a.m = -1;
        a.i = !1;
        return a;
    }
    var q = HTMLElement;
    p.prototype = e(q.prototype);
    p.prototype.constructor = p;
    if (m) m(p, q);
    else for(var r in q)if ("prototype" != r) {
        if (Object.defineProperties) {
            var t = Object.getOwnPropertyDescriptor(q, r);
            t && Object.defineProperty(p, r, t);
        } else p[r] = q[r];
    }
    d = p.prototype;
    d.connectedCallback = function() {
        var a = this;
        this.o = parseInt(this.getAttribute("data-gwd-width"), 10) || this.clientWidth;
        this.m = parseInt(this.getAttribute("data-gwd-height"), 10) || this.clientHeight;
        this.addEventListener("ready", this.s, !1);
        this.style.visibility = "hidden";
        setTimeout(function() {
            a.g = Array.prototype.slice.call(a.querySelectorAll("*")).filter(function(c) {
                return "function" != typeof c.gwdLoad || "function" != typeof c.gwdIsLoaded || c.gwdIsLoaded() ? !1 : !0;
            }, a);
            a.l = !0;
            0 < a.g.length ? a.j = !1 : u(a);
            a.h = !0;
            n("attached", a);
        }, 1);
    };
    d.disconnectedCallback = function() {
        this.removeEventListener("ready", this.s, !1);
        this.classList.remove("gwd-play-animation");
        n("detached", this);
    };
    d.gwdActivate = function() {
        this.classList.remove("gwd-inactive");
        Array.prototype.slice.call(this.querySelectorAll("*")).forEach(function(a) {
            "function" == typeof a.gwdActivate && "function" == typeof a.gwdIsActive && 0 == a.gwdIsActive() && a.gwdActivate();
        });
        this.i = !0;
        this.h ? this.h = !1 : n("attached", this);
        n("pageactivated", this);
    };
    d.gwdDeactivate = function() {
        this.classList.add("gwd-inactive");
        this.classList.remove("gwd-play-animation");
        var a = Array.prototype.slice.call(this.querySelectorAll("*"));
        a.push(this);
        for(var c = 0; c < a.length; c++){
            var b = a[c];
            if (b.classList && (b.classList.remove("gwd-pause-animation"), b.hasAttribute("data-gwd-current-label"))) {
                var k = b.getAttribute("data-gwd-current-label");
                b.classList.remove(k);
                b.removeAttribute("data-gwd-current-label");
            }
            delete b.gwdGotoCounters;
            b != this && "function" == typeof b.gwdDeactivate && "function" == typeof b.gwdIsActive && 1 == b.gwdIsActive() && b.gwdDeactivate();
        }
        this.i = !1;
        n("pagedeactivated", this);
        n("detached", this);
    };
    d.gwdIsActive = function() {
        return this.i;
    };
    d.gwdIsLoaded = function() {
        return this.l && 0 == this.g.length;
    };
    d.gwdLoad = function() {
        if (this.gwdIsLoaded()) u(this);
        else for(var a = this.g.length - 1; 0 <= a; a--)this.g[a].gwdLoad();
    };
    d.u = function(a) {
        a = this.g.indexOf(a.target);
        -1 < a && (this.g.splice(a, 1), 0 == this.g.length && u(this));
    };
    function u(a) {
        a.style.visibility = "";
        a.j || (n("ready", a), n("pageload", a));
        a.j = !0;
    }
    d.gwdPresent = function() {
        n("pagepresenting", this);
        this.classList.add("gwd-play-animation");
    };
    d.isPortrait = function() {
        return this.m >= this.o;
    };
    customElements.define("gwd-page", p);
}).call(this);

//# sourceMappingURL=hive.3970fe3d.js.map
