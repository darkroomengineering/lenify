// this code will be executed when the extension's button is clicked
(function () {
  !(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e || self).Lenis = t());
  })(this, function () {
    function e(t, o) {
      return (
        (e = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (e, t) {
              return (e.__proto__ = t), e;
            }),
        e(t, o)
      );
    }
    function t() {}
    t.prototype = {
      on: function (e, t, o) {
        var i = this.e || (this.e = {});
        return (i[e] || (i[e] = [])).push({ fn: t, ctx: o }), this;
      },
      once: function (e, t, o) {
        var i = this;
        function n() {
          i.off(e, n), t.apply(o, arguments);
        }
        return (n._ = t), this.on(e, n, o);
      },
      emit: function (e) {
        for (
          var t = [].slice.call(arguments, 1),
            o = ((this.e || (this.e = {}))[e] || []).slice(),
            i = 0,
            n = o.length;
          i < n;
          i++
        )
          o[i].fn.apply(o[i].ctx, t);
        return this;
      },
      off: function (e, t) {
        var o = this.e || (this.e = {}),
          i = o[e],
          n = [];
        if (i && t)
          for (var r = 0, s = i.length; r < s; r++)
            i[r].fn !== t && i[r].fn._ !== t && n.push(i[r]);
        return n.length ? (o[e] = n) : delete o[e], this;
      },
    };
    var o = t;
    (o.TinyEmitter = t),
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self && self;
    var i = (function (e) {
      var t = { exports: {} };
      return (
        (function (e, t) {
          e.exports = (function () {
            var e = 0;
            function t(t) {
              return "__private_" + e++ + "_" + t;
            }
            function o(e, t) {
              if (!Object.prototype.hasOwnProperty.call(e, t))
                throw new TypeError(
                  "attempted to use private field on non-instance"
                );
              return e;
            }
            function i() {}
            i.prototype = {
              on: function (e, t, o) {
                var i = this.e || (this.e = {});
                return (i[e] || (i[e] = [])).push({ fn: t, ctx: o }), this;
              },
              once: function (e, t, o) {
                var i = this;
                function n() {
                  i.off(e, n), t.apply(o, arguments);
                }
                return (n._ = t), this.on(e, n, o);
              },
              emit: function (e) {
                for (
                  var t = [].slice.call(arguments, 1),
                    o = ((this.e || (this.e = {}))[e] || []).slice(),
                    i = 0,
                    n = o.length;
                  i < n;
                  i++
                )
                  o[i].fn.apply(o[i].ctx, t);
                return this;
              },
              off: function (e, t) {
                var o = this.e || (this.e = {}),
                  i = o[e],
                  n = [];
                if (i && t)
                  for (var r = 0, s = i.length; r < s; r++)
                    i[r].fn !== t && i[r].fn._ !== t && n.push(i[r]);
                return n.length ? (o[e] = n) : delete o[e], this;
              },
            };
            var n = i;
            n.TinyEmitter = i;
            var r,
              s = "virtualscroll",
              l = t("options"),
              h = t("el"),
              a = t("emitter"),
              c = t("event"),
              u = t("touchStart"),
              d = t("bodyTouchAction");
            return (function () {
              function e(e) {
                var t = this;
                Object.defineProperty(this, l, {
                  writable: !0,
                  value: void 0,
                }),
                  Object.defineProperty(this, h, {
                    writable: !0,
                    value: void 0,
                  }),
                  Object.defineProperty(this, a, {
                    writable: !0,
                    value: void 0,
                  }),
                  Object.defineProperty(this, c, {
                    writable: !0,
                    value: void 0,
                  }),
                  Object.defineProperty(this, u, {
                    writable: !0,
                    value: void 0,
                  }),
                  Object.defineProperty(this, d, {
                    writable: !0,
                    value: void 0,
                  }),
                  (this._onWheel = function (e) {
                    var i = o(t, l)[l],
                      n = o(t, c)[c];
                    (n.deltaX = e.wheelDeltaX || -1 * e.deltaX),
                      (n.deltaY = e.wheelDeltaY || -1 * e.deltaY),
                      r.isFirefox &&
                        1 === e.deltaMode &&
                        ((n.deltaX *= i.firefoxMultiplier),
                        (n.deltaY *= i.firefoxMultiplier)),
                      (n.deltaX *= i.mouseMultiplier),
                      (n.deltaY *= i.mouseMultiplier),
                      t._notify(e);
                  }),
                  (this._onMouseWheel = function (e) {
                    var i = o(t, c)[c];
                    (i.deltaX = e.wheelDeltaX ? e.wheelDeltaX : 0),
                      (i.deltaY = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta),
                      t._notify(e);
                  }),
                  (this._onTouchStart = function (e) {
                    var i = e.targetTouches ? e.targetTouches[0] : e;
                    (o(t, u)[u].x = i.pageX), (o(t, u)[u].y = i.pageY);
                  }),
                  (this._onTouchMove = function (e) {
                    var i = o(t, l)[l];
                    i.preventTouch &&
                      !e.target.classList.contains(i.unpreventTouchClass) &&
                      e.preventDefault();
                    var n = o(t, c)[c],
                      r = e.targetTouches ? e.targetTouches[0] : e;
                    (n.deltaX = (r.pageX - o(t, u)[u].x) * i.touchMultiplier),
                      (n.deltaY = (r.pageY - o(t, u)[u].y) * i.touchMultiplier),
                      (o(t, u)[u].x = r.pageX),
                      (o(t, u)[u].y = r.pageY),
                      t._notify(e);
                  }),
                  (this._onKeyDown = function (e) {
                    var i = o(t, c)[c];
                    i.deltaX = i.deltaY = 0;
                    var n = window.innerHeight - 40;
                    switch (e.keyCode) {
                      case 37:
                      case 38:
                        i.deltaY = o(t, l)[l].keyStep;
                        break;
                      case 39:
                      case 40:
                        i.deltaY = -o(t, l)[l].keyStep;
                        break;
                      case 32:
                        i.deltaY = n * (e.shiftKey ? 1 : -1);
                        break;
                      default:
                        return;
                    }
                    t._notify(e);
                  }),
                  (o(this, h)[h] = window),
                  e && e.el && ((o(this, h)[h] = e.el), delete e.el),
                  r ||
                    (r = {
                      hasWheelEvent: "onwheel" in document,
                      hasMouseWheelEvent: "onmousewheel" in document,
                      hasTouch: "ontouchstart" in document,
                      hasTouchWin:
                        navigator.msMaxTouchPoints &&
                        navigator.msMaxTouchPoints > 1,
                      hasPointer: !!window.navigator.msPointerEnabled,
                      hasKeyDown: "onkeydown" in document,
                      isFirefox: navigator.userAgent.indexOf("Firefox") > -1,
                    }),
                  (o(this, l)[l] = Object.assign(
                    {
                      mouseMultiplier: 1,
                      touchMultiplier: 2,
                      firefoxMultiplier: 15,
                      keyStep: 120,
                      preventTouch: !1,
                      unpreventTouchClass: "vs-touchmove-allowed",
                      useKeyboard: !0,
                      useTouch: !0,
                    },
                    e
                  )),
                  (o(this, a)[a] = new n()),
                  (o(this, c)[c] = { y: 0, x: 0, deltaX: 0, deltaY: 0 }),
                  (o(this, u)[u] = { x: null, y: null }),
                  (o(this, d)[d] = null),
                  void 0 !== o(this, l)[l].passive &&
                    (this.listenerOptions = {
                      passive: o(this, l)[l].passive,
                    });
              }
              var t = e.prototype;
              return (
                (t._notify = function (e) {
                  var t = o(this, c)[c];
                  (t.x += t.deltaX),
                    (t.y += t.deltaY),
                    o(this, a)[a].emit(s, {
                      x: t.x,
                      y: t.y,
                      deltaX: t.deltaX,
                      deltaY: t.deltaY,
                      originalEvent: e,
                    });
                }),
                (t._bind = function () {
                  r.hasWheelEvent &&
                    o(this, h)[h].addEventListener(
                      "wheel",
                      this._onWheel,
                      this.listenerOptions
                    ),
                    r.hasMouseWheelEvent &&
                      o(this, h)[h].addEventListener(
                        "mousewheel",
                        this._onMouseWheel,
                        this.listenerOptions
                      ),
                    r.hasTouch &&
                      o(this, l)[l].useTouch &&
                      (o(this, h)[h].addEventListener(
                        "touchstart",
                        this._onTouchStart,
                        this.listenerOptions
                      ),
                      o(this, h)[h].addEventListener(
                        "touchmove",
                        this._onTouchMove,
                        this.listenerOptions
                      )),
                    r.hasPointer &&
                      r.hasTouchWin &&
                      ((o(this, d)[d] = document.body.style.msTouchAction),
                      (document.body.style.msTouchAction = "none"),
                      o(this, h)[h].addEventListener(
                        "MSPointerDown",
                        this._onTouchStart,
                        !0
                      ),
                      o(this, h)[h].addEventListener(
                        "MSPointerMove",
                        this._onTouchMove,
                        !0
                      )),
                    r.hasKeyDown &&
                      o(this, l)[l].useKeyboard &&
                      document.addEventListener("keydown", this._onKeyDown);
                }),
                (t._unbind = function () {
                  r.hasWheelEvent &&
                    o(this, h)[h].removeEventListener("wheel", this._onWheel),
                    r.hasMouseWheelEvent &&
                      o(this, h)[h].removeEventListener(
                        "mousewheel",
                        this._onMouseWheel
                      ),
                    r.hasTouch &&
                      (o(this, h)[h].removeEventListener(
                        "touchstart",
                        this._onTouchStart
                      ),
                      o(this, h)[h].removeEventListener(
                        "touchmove",
                        this._onTouchMove
                      )),
                    r.hasPointer &&
                      r.hasTouchWin &&
                      ((document.body.style.msTouchAction = o(this, d)[d]),
                      o(this, h)[h].removeEventListener(
                        "MSPointerDown",
                        this._onTouchStart,
                        !0
                      ),
                      o(this, h)[h].removeEventListener(
                        "MSPointerMove",
                        this._onTouchMove,
                        !0
                      )),
                    r.hasKeyDown &&
                      o(this, l)[l].useKeyboard &&
                      document.removeEventListener("keydown", this._onKeyDown);
                }),
                (t.on = function (e, t) {
                  o(this, a)[a].on(s, e, t);
                  var i = o(this, a)[a].e;
                  i && i[s] && 1 === i[s].length && this._bind();
                }),
                (t.off = function (e, t) {
                  o(this, a)[a].off(s, e, t);
                  var i = o(this, a)[a].e;
                  (!i[s] || i[s].length <= 0) && this._unbind();
                }),
                (t.destroy = function () {
                  o(this, a)[a].off(), this._unbind();
                }),
                e
              );
            })();
          })();
        })(t),
        t.exports
      );
    })(); /*#__PURE__*/
    return (function (t) {
      var o, n;
      function r(e) {
        var o,
          n,
          r,
          s,
          l = void 0 === e ? {} : e,
          h = l.lerp,
          a = void 0 === h ? 0.1 : h,
          c = l.smooth,
          u = void 0 === c || c,
          d = l.direction,
          p = void 0 === d ? "vertical" : d,
          f = l.wrapper,
          v = void 0 === f ? window : f,
          w = l.content,
          y = void 0 === w ? document.body : w;
        ((s = t.call(this) || this).onWindowResize = function () {
          (s.wrapperWidth = window.innerWidth),
            (s.wrapperHeight = window.innerHeight);
        }),
          (s.onWrapperResize = function (e) {
            var t = e[0];
            if (t) {
              var o = t.contentRect;
              (s.wrapperWidth = o.width), (s.wrapperHeight = o.height);
            }
          }),
          (s.onContentResize = function (e) {
            var t = e[0];
            if (t) {
              var o = t.contentRect;
              (s.contentWidth = o.width), (s.contentHeight = o.height);
            }
          }),
          (s.onVirtualScroll = function (e) {
            var t = e.deltaY,
              o = e.originalEvent;
            s.stopped
              ? o.preventDefault()
              : (s.smooth && !o.ctrlKey && o.preventDefault(),
                (s.targetScroll -= t),
                (s.targetScroll = Math.max(
                  0,
                  Math.min(s.targetScroll, s.limit)
                )));
          }),
          (s.onScroll = function (e) {
            if (!(s.stopped || (s.scrolling && s.smooth))) {
              var t = s.scroll;
              (s.targetScroll = s.scroll = s.wrapperNode[s.scrollProperty]),
                (s.velocity = s.scroll - t),
                s.notify();
            }
          }),
          (s.wrapperNode = v),
          (s.contentNode = y),
          (s.lerp = a),
          (s.smooth = u),
          (s.direction = p),
          s.wrapperNode.addEventListener("scroll", s.onScroll, !1);
        var g =
          (null == (o = navigator) || null == (n = o.userAgentData)
            ? void 0
            : n.platform) ||
          (null == (r = navigator) ? void 0 : r.platform) ||
          "unknown";
        return (
          (s.virtualScroll = new i({
            el: s.wrapperNode,
            firefoxMultiplier: 50,
            mouseMultiplier: g.indexOf("Win") > -1 ? 1 : 0.4,
            useKeyboard: !1,
            useTouch: !1,
            passive: !1,
          })),
          s.virtualScroll.on(s.onVirtualScroll),
          s.wrapperNode === window
            ? (s.wrapperNode.addEventListener("resize", s.onWindowResize, !1),
              s.onWindowResize())
            : ((s.wrapperHeight = s.wrapperNode.offsetHeight),
              (s.wrapperWidth = s.wrapperNode.offsetWidth),
              (s.wrapperObserver = new ResizeObserver(s.onWrapperResize)),
              s.wrapperObserver.observe(s.wrapperNode)),
          (s.contentHeight = s.contentNode.offsetHeight),
          (s.contentWidth = s.contentNode.offsetWidth),
          (s.contentObserver = new ResizeObserver(s.onContentResize)),
          s.contentObserver.observe(s.contentNode),
          (s.targetScroll = s.scroll = s.wrapperNode[s.scrollProperty]),
          (s.velocity = 0),
          s
        );
      }
      (n = t),
        ((o = r).prototype = Object.create(n.prototype)),
        (o.prototype.constructor = o),
        e(o, n);
      var s,
        l,
        h = r.prototype;
      return (
        (h.start = function () {
          this.stopped = !1;
        }),
        (h.stop = function () {
          this.stopped = !0;
        }),
        (h.destroy = function () {
          var e;
          this.wrapperNode === window &&
            this.wrapperNode.removeEventListener(
              "resize",
              this.onWindowResize,
              !1
            ),
            this.wrapperNode.removeEventListener("scroll", this.onScroll, !1),
            this.virtualScroll.destroy(),
            null == (e = this.wrapperObserver) || e.disconnect(),
            this.contentObserver.disconnect();
        }),
        (h.raf = function () {
          if (!this.stopped && this.smooth) {
            var e,
              t = this.scroll;
            (this.scroll =
              (1 - (e = this.lerp)) * this.scroll + e * this.targetScroll),
              Math.round(this.scroll) === Math.round(this.targetScroll) &&
                (this.scroll = t = this.targetScroll),
              (this.velocity = this.scroll - t),
              this.scrolling && (this._scrollTo(this.scroll), this.notify()),
              (this.scrolling = this.scroll !== this.targetScroll);
          }
        }),
        (h._scrollTo = function (e) {
          "horizontal" === this.direction
            ? this.wrapperNode.scrollTo(e, 0)
            : this.wrapperNode.scrollTo(0, e);
        }),
        (h.notify = function () {
          this.emit("scroll", {
            scroll: this.scroll,
            limit: this.limit,
            velocity: this.velocity,
            direction: this.direction,
            progress: this.scroll / this.limit,
          });
        }),
        (h.scrollTo = function (e, t) {
          var o,
            i = void 0 === t ? {} : t,
            n = i.offset,
            r = void 0 === n ? 0 : n,
            s = i.immediate,
            l = void 0 !== s && s;
          if ("number" == typeof e) o = e;
          else if ("top" === e) o = 0;
          else if ("bottom" === e) o = this.limit;
          else {
            var h;
            if ("string" == typeof e) h = document.querySelector(e);
            else {
              if (null == e || !e.nodeType) return;
              h = e;
            }
            if (!e) return;
            var a = 0;
            if (this.wrapperNode !== window) {
              var c = this.wrapperNode.getBoundingClientRect();
              a = "horizontal" === this.direction ? c.left : c.top;
            }
            var u = h.getBoundingClientRect();
            o =
              ("horizontal" === this.direction ? u.left : u.top) +
              this.scroll -
              a;
          }
          (this.targetScroll = o += r),
            (this.scrolling = !0),
            (this.smooth && !l) ||
              ((this.scroll = o), this._scrollTo(this.scroll));
        }),
        (s = r),
        (l = [
          {
            key: "scrollProperty",
            get: function () {
              return this.wrapperNode === window
                ? "horizontal" === this.direction
                  ? "scrollX"
                  : "scrollY"
                : "horizontal" === this.direction
                ? "scrollLeft"
                : "scrollTop";
            },
          },
          {
            key: "limit",
            get: function () {
              return "horizontal" === this.direction
                ? this.contentWidth - this.wrapperWidth
                : this.contentHeight - this.wrapperHeight;
            },
          },
        ]) &&
          (function (e, t) {
            for (var o = 0; o < t.length; o++) {
              var i = t[o];
              (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i);
            }
          })(s.prototype, l),
        Object.defineProperty(s, "prototype", { writable: !1 }),
        r
      );
    })(o);
  });

  const _lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
    direction: "vertical",
  });

  function raf() {
    _lenis.raf();
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
})();