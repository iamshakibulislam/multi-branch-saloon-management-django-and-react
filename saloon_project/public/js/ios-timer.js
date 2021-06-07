(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) && ! function(a) {
    function h(b, c, d) {
        'use strict'; 
		function i() {
            g && (g.apply(a, arguments), h || (delete c[f], g = null))
        }
        var f, g = d[0],
            h = b === e;
        return d[0] = i, f = b.apply(a, d), c[f] = {
            args: d,
            created: Date.now(),
            cb: g,
            id: f
        }, f
    }

    function i(b, c, d, f) {
       'use strict';
	    function l() {
            h.cb && (h.cb.apply(a, arguments), i || (delete d[f], h.cb = null))
        }
        var h = d[f];
        if (h) {
            var i = b === e;
            if (c(h.id), !i) {
                var j = h.args[1],
                    k = Date.now() - h.created;
                k < 0 && (k = 0), j -= k, j < 0 && (j = 0), h.args[1] = j
            }
            h.args[0] = l, h.created = Date.now(), h.id = b.apply(a, h.args)
        }
    }
    var b = {}, c = {}, d = a.setTimeout,
        e = a.setInterval,
        f = a.clearTimeout,
        g = a.clearInterval;
    a.setTimeout = function() {
        return h(d, b, arguments)
    }, a.setInterval = function() {
        return h(e, c, arguments)
    }, a.clearTimeout = function(a) {
        var c = b[a];
        c && (delete b[a], f(c.id))
    }, a.clearInterval = function(a) {
        var b = c[a];
        b && (delete c[a], g(b.id))
    }, a.addEventListener("scroll", function() {
        var a;
        for (a in b) i(d, f, b, a);
        for (a in c) i(e, g, c, a)
    })
}(window);
