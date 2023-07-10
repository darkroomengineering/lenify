// this code will be executed when the extension's button is clicked

;(function () {
  !(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : ((t || self).Lenis = e())
  })(this, function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var o = e[i]
        ;(o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(
            t,
            "symbol" ==
              typeof (n = (function (t, e) {
                if ("object" != typeof t || null === t) return t
                var i = t[Symbol.toPrimitive]
                if (void 0 !== i) {
                  var o = i.call(t, "string")
                  if ("object" != typeof o) return o
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  )
                }
                return String(t)
              })(o.key))
              ? n
              : String(n),
            o
          )
      }
      var n
    }
    function e(e, i, o) {
      return (
        i && t(e.prototype, i),
        o && t(e, o),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        e
      )
    }
    function i() {
      return (
        (i = Object.assign
          ? Object.assign.bind()
          : function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e]
                for (var o in i)
                  Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
              }
              return t
            }),
        i.apply(this, arguments)
      )
    }
    function o(t, e, i) {
      return Math.max(t, Math.min(e, i))
    }
    var n = /*#__PURE__*/ (function () {
        function t() {}
        var e = t.prototype
        return (
          (e.advance = function (t) {
            var e, i, n, s
            if (this.isRunning) {
              var r = !1
              if (this.lerp)
                (this.value =
                  ((i = this.value),
                  (n = this.to),
                  (1 - (s = 1 - Math.exp(-60 * this.lerp * t))) * i + s * n)),
                  Math.round(this.value) === this.to &&
                    ((this.value = this.to), (r = !0))
              else {
                this.currentTime += t
                var l = o(0, this.currentTime / this.duration, 1),
                  h = (r = l >= 1) ? 1 : this.easing(l)
                this.value = this.from + (this.to - this.from) * h
              }
              null == (e = this.onUpdate) ||
                e.call(this, this.value, { completed: r }),
                r && this.stop()
            }
          }),
          (e.stop = function () {
            this.isRunning = !1
          }),
          (e.fromTo = function (t, e, i) {
            var o = i.lerp,
              n = void 0 === o ? 0.1 : o,
              s = i.duration,
              r = void 0 === s ? 1 : s,
              l = i.easing,
              h =
                void 0 === l
                  ? function (t) {
                      return t
                    }
                  : l,
              a = i.onUpdate
            ;(this.from = this.value = t),
              (this.to = e),
              (this.lerp = n),
              (this.duration = r),
              (this.easing = h),
              (this.currentTime = 0),
              (this.isRunning = !0),
              (this.onUpdate = a)
          }),
          t
        )
      })(),
      s = /*#__PURE__*/ (function () {
        function t(t) {
          var e,
            i,
            o = this,
            n = void 0 === t ? {} : t,
            s = n.wrapper,
            r = n.content,
            l = n.autoResize,
            h = void 0 === l || l
          if (
            ((this.resize = function () {
              o.onWrapperResize(), o.onContentResize()
            }),
            (this.onWrapperResize = function () {
              o.wrapper === window
                ? ((o.width = window.innerWidth),
                  (o.height = window.innerHeight))
                : ((o.width = o.wrapper.clientWidth),
                  (o.height = o.wrapper.clientHeight))
            }),
            (this.onContentResize = function () {
              ;(o.scrollHeight = o.content.scrollHeight),
                (o.scrollWidth = o.content.scrollWidth)
            }),
            (this.wrapper = s),
            (this.content = r),
            h)
          ) {
            var a =
              ((e = this.resize),
              function () {
                var t = arguments,
                  o = this
                clearTimeout(i),
                  (i = setTimeout(function () {
                    e.apply(o, t)
                  }, 250))
              })
            this.wrapper !== window &&
              ((this.wrapperResizeObserver = new ResizeObserver(a)),
              this.wrapperResizeObserver.observe(this.wrapper)),
              (this.contentResizeObserver = new ResizeObserver(a)),
              this.contentResizeObserver.observe(this.content)
          }
          this.resize()
        }
        return (
          (t.prototype.destroy = function () {
            var t, e
            null == (t = this.wrapperResizeObserver) || t.disconnect(),
              null == (e = this.contentResizeObserver) || e.disconnect()
          }),
          e(t, [
            {
              key: "limit",
              get: function () {
                return {
                  x: this.scrollWidth - this.width,
                  y: this.scrollHeight - this.height,
                }
              },
            },
          ]),
          t
        )
      })(),
      r = /*#__PURE__*/ (function () {
        function t(t, e) {
          var i = this,
            n = e.wheelMultiplier,
            s = void 0 === n ? 1 : n,
            r = e.touchMultiplier,
            l = void 0 === r ? 2 : r,
            h = e.normalizeWheel,
            a = void 0 !== h && h
          ;(this.onTouchStart = function (t) {
            var e = t.targetTouches ? t.targetTouches[0] : t,
              o = e.clientY
            ;(i.touchStart.x = e.clientX),
              (i.touchStart.y = o),
              (i.lastDelta = { x: 0, y: 0 })
          }),
            (this.onTouchMove = function (t) {
              var e = t.targetTouches ? t.targetTouches[0] : t,
                o = e.clientX,
                n = e.clientY,
                s = -(o - i.touchStart.x) * i.touchMultiplier,
                r = -(n - i.touchStart.y) * i.touchMultiplier
              ;(i.touchStart.x = o),
                (i.touchStart.y = n),
                (i.lastDelta = { x: s, y: r }),
                i.emitter.emit("scroll", {
                  type: "touch",
                  deltaX: s,
                  deltaY: r,
                  event: t,
                })
            }),
            (this.onTouchEnd = function (t) {
              i.emitter.emit("scroll", {
                type: "touch",
                inertia: !0,
                deltaX: i.lastDelta.x,
                deltaY: i.lastDelta.y,
                event: t,
              })
            }),
            (this.onWheel = function (t) {
              var e = t.deltaX,
                n = t.deltaY
              i.normalizeWheel &&
                ((e = o(-100, e, 100)), (n = o(-100, n, 100))),
                i.emitter.emit("scroll", {
                  type: "wheel",
                  deltaX: (e *= i.wheelMultiplier),
                  deltaY: (n *= i.wheelMultiplier),
                  event: t,
                })
            }),
            (this.element = t),
            (this.wheelMultiplier = s),
            (this.touchMultiplier = l),
            (this.normalizeWheel = a),
            (this.touchStart = { x: null, y: null }),
            (this.emitter = {
              events: {},
              emit: function (t) {
                for (
                  var e = this.events[t] || [], i = 0, o = e.length;
                  i < o;
                  i++
                )
                  e[i].apply(e, [].slice.call(arguments, 1))
              },
              on: function (t, e) {
                var i,
                  o = this
                return (
                  (null == (i = this.events[t]) ? void 0 : i.push(e)) ||
                    (this.events[t] = [e]),
                  function () {
                    var i
                    o.events[t] =
                      null == (i = o.events[t])
                        ? void 0
                        : i.filter(function (t) {
                            return e !== t
                          })
                  }
                )
              },
            }),
            this.element.addEventListener("wheel", this.onWheel, {
              passive: !1,
            }),
            this.element.addEventListener("touchstart", this.onTouchStart, {
              passive: !1,
            }),
            this.element.addEventListener("touchmove", this.onTouchMove, {
              passive: !1,
            }),
            this.element.addEventListener("touchend", this.onTouchEnd, {
              passive: !1,
            })
        }
        var e = t.prototype
        return (
          (e.on = function (t, e) {
            return this.emitter.on(t, e)
          }),
          (e.destroy = function () {
            ;(this.emitter.events = {}),
              this.element.removeEventListener("wheel", this.onWheel, {
                passive: !1,
              }),
              this.element.removeEventListener(
                "touchstart",
                this.onTouchStart,
                { passive: !1 }
              ),
              this.element.removeEventListener("touchmove", this.onTouchMove, {
                passive: !1,
              }),
              this.element.removeEventListener("touchend", this.onTouchEnd, {
                passive: !1,
              })
          }),
          t
        )
      })(),
      l = /*#__PURE__*/ (function () {
        function t(t) {
          var e = this,
            o = void 0 === t ? {} : t,
            l = o.direction,
            h = o.gestureDirection,
            a = o.mouseMultiplier,
            c = o.smooth,
            u = o.wrapper,
            p = void 0 === u ? window : u,
            d = o.content,
            v = void 0 === d ? document.documentElement : d,
            m = o.wheelEventsTarget,
            f = void 0 === m ? p : m,
            g = o.smoothWheel,
            S = void 0 === g ? null == c || c : g,
            y = o.smoothTouch,
            w = void 0 !== y && y,
            b = o.syncTouch,
            T = void 0 !== b && b,
            z = o.syncTouchLerp,
            M = void 0 === z ? 0.1 : z,
            L = o.touchInertiaMultiplier,
            E = void 0 === L ? 35 : L,
            O = o.duration,
            R = o.easing,
            W =
              void 0 === R
                ? function (t) {
                    return Math.min(1, 1.001 - Math.pow(2, -10 * t))
                  }
                : R,
            _ = o.lerp,
            k = void 0 === _ ? (O ? null : 0.1) : _,
            x = o.infinite,
            H = void 0 !== x && x,
            j = o.orientation,
            D = void 0 === j ? (null != l ? l : "vertical") : j,
            A = o.gestureOrientation,
            X = void 0 === A ? (null != h ? h : "vertical") : A,
            Y = o.touchMultiplier,
            P = void 0 === Y ? 1 : Y,
            C = o.wheelMultiplier,
            U = void 0 === C ? (null != a ? a : 1) : C,
            I = o.normalizeWheel,
            V = void 0 !== I && I,
            q = o.autoResize,
            B = void 0 === q || q
          ;(this.onVirtualScroll = function (t) {
            var o = t.type,
              n = t.inertia,
              s = t.deltaX,
              r = t.deltaY,
              l = t.event
            if (!l.ctrlKey) {
              var h = "touch" === o,
                a = "wheel" === o
              if (
                !(
                  ("vertical" === e.options.gestureOrientation && 0 === r) ||
                  ("horizontal" === e.options.gestureOrientation && 0 === s) ||
                  (h &&
                    "vertical" === e.options.gestureOrientation &&
                    0 === e.scroll &&
                    !e.options.infinite &&
                    r <= 0) ||
                  l.composedPath().find(function (t) {
                    return (
                      (null == t || null == t.hasAttribute
                        ? void 0
                        : t.hasAttribute("data-lenis-prevent")) ||
                      (h &&
                        (null == t || null == t.hasAttribute
                          ? void 0
                          : t.hasAttribute("data-lenis-prevent-touch"))) ||
                      (a &&
                        (null == t || null == t.hasAttribute
                          ? void 0
                          : t.hasAttribute("data-lenis-prevent-wheel")))
                    )
                  })
                )
              )
                if (e.isStopped || e.isLocked) l.preventDefault()
                else {
                  if (
                    ((e.isSmooth =
                      ((e.options.smoothTouch || e.options.syncTouch) && h) ||
                      (e.options.smoothWheel && a)),
                    !e.isSmooth)
                  )
                    return (e.isScrolling = !1), void e.animate.stop()
                  l.preventDefault()
                  var c = r
                  "both" === e.options.gestureOrientation
                    ? (c = Math.abs(r) > Math.abs(s) ? r : s)
                    : "horizontal" === e.options.gestureOrientation && (c = s)
                  var u = h && e.options.syncTouch,
                    p = h && n && Math.abs(c) > 1
                  p && (c = e.velocity * e.options.touchInertiaMultiplier),
                    e.scrollTo(
                      e.targetScroll + c,
                      i(
                        { programmatic: !1 },
                        u && { lerp: p ? e.syncTouchLerp : 0.4 }
                      )
                    )
                }
            }
          }),
            (this.onScroll = function () {
              if (!e.isScrolling) {
                var t = e.animatedScroll
                ;(e.animatedScroll = e.targetScroll = e.actualScroll),
                  (e.velocity = 0),
                  (e.direction = Math.sign(e.animatedScroll - t)),
                  e.emit()
              }
            }),
            l &&
              console.warn(
                "Lenis: `direction` option is deprecated, use `orientation` instead"
              ),
            h &&
              console.warn(
                "Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead"
              ),
            a &&
              console.warn(
                "Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead"
              ),
            c &&
              console.warn(
                "Lenis: `smooth` option is deprecated, use `smoothWheel` instead"
              ),
            (window.lenisVersion = "1.0.16"),
            (p !== document.documentElement && p !== document.body) ||
              (p = window),
            (this.options = {
              wrapper: p,
              content: v,
              wheelEventsTarget: f,
              smoothWheel: S,
              smoothTouch: w,
              syncTouch: T,
              syncTouchLerp: M,
              touchInertiaMultiplier: E,
              duration: O,
              easing: W,
              lerp: k,
              infinite: H,
              gestureOrientation: X,
              orientation: D,
              touchMultiplier: P,
              wheelMultiplier: U,
              normalizeWheel: V,
              autoResize: B,
            }),
            (this.dimensions = new s({
              wrapper: p,
              content: v,
              autoResize: B,
            })),
            this.rootElement.classList.add("lenis"),
            (this.velocity = 0),
            (this.isStopped = !1),
            (this.isSmooth = S || w),
            (this.isScrolling = !1),
            (this.targetScroll = this.animatedScroll = this.actualScroll),
            (this.animate = new n()),
            (this.emitter = {
              events: {},
              emit: function (t) {
                for (
                  var e = this.events[t] || [], i = 0, o = e.length;
                  i < o;
                  i++
                )
                  e[i].apply(e, [].slice.call(arguments, 1))
              },
              on: function (t, e) {
                var i,
                  o = this
                return (
                  (null == (i = this.events[t]) ? void 0 : i.push(e)) ||
                    (this.events[t] = [e]),
                  function () {
                    var i
                    o.events[t] =
                      null == (i = o.events[t])
                        ? void 0
                        : i.filter(function (t) {
                            return e !== t
                          })
                  }
                )
              },
            }),
            this.options.wrapper.addEventListener("scroll", this.onScroll, {
              passive: !1,
            }),
            (this.virtualScroll = new r(f, {
              touchMultiplier: P,
              wheelMultiplier: U,
              normalizeWheel: V,
            })),
            this.virtualScroll.on("scroll", this.onVirtualScroll)
        }
        var l = t.prototype
        return (
          (l.destroy = function () {
            ;(this.emitter.events = {}),
              this.options.wrapper.removeEventListener(
                "scroll",
                this.onScroll,
                { passive: !1 }
              ),
              this.virtualScroll.destroy(),
              this.dimensions.destroy(),
              this.rootElement.classList.remove("lenis"),
              this.rootElement.classList.remove("lenis-smooth"),
              this.rootElement.classList.remove("lenis-scrolling"),
              this.rootElement.classList.remove("lenis-stopped")
          }),
          (l.on = function (t, e) {
            return this.emitter.on(t, e)
          }),
          (l.off = function (t, e) {
            var i
            this.emitter.events[t] =
              null == (i = this.emitter.events[t])
                ? void 0
                : i.filter(function (t) {
                    return e !== t
                  })
          }),
          (l.setScroll = function (t) {
            this.isHorizontal
              ? (this.rootElement.scrollLeft = t)
              : (this.rootElement.scrollTop = t)
          }),
          (l.resize = function () {
            this.dimensions.resize()
          }),
          (l.emit = function () {
            this.emitter.emit("scroll", this)
          }),
          (l.reset = function () {
            ;(this.isLocked = !1),
              (this.isScrolling = !1),
              (this.velocity = 0),
              this.animate.stop()
          }),
          (l.start = function () {
            ;(this.isStopped = !1), this.reset()
          }),
          (l.stop = function () {
            ;(this.isStopped = !0), this.animate.stop(), this.reset()
          }),
          (l.raf = function (t) {
            var e = t - (this.time || t)
            ;(this.time = t), this.animate.advance(0.001 * e)
          }),
          (l.scrollTo = function (t, e) {
            var i = this,
              n = void 0 === e ? {} : e,
              s = n.offset,
              r = void 0 === s ? 0 : s,
              l = n.immediate,
              h = void 0 !== l && l,
              a = n.lock,
              c = void 0 !== a && a,
              u = n.duration,
              p = void 0 === u ? this.options.duration : u,
              d = n.easing,
              v = void 0 === d ? this.options.easing : d,
              m = n.lerp,
              f = void 0 === m ? !p && this.options.lerp : m,
              g = n.onComplete,
              S = void 0 === g ? null : g,
              y = n.force,
              w = n.programmatic,
              b = void 0 === w || w
            if (!this.isStopped || (void 0 !== y && y)) {
              if (["top", "left", "start"].includes(t)) t = 0
              else if (["bottom", "right", "end"].includes(t)) t = this.limit
              else {
                var T, z
                if (
                  ("string" == typeof t
                    ? (z = document.querySelector(t))
                    : null != (T = t) && T.nodeType && (z = t),
                  z)
                ) {
                  if (this.options.wrapper !== window) {
                    var M = this.options.wrapper.getBoundingClientRect()
                    r -= this.isHorizontal ? M.left : M.top
                  }
                  var L = z.getBoundingClientRect()
                  t = (this.isHorizontal ? L.left : L.top) + this.animatedScroll
                }
              }
              if ("number" == typeof t) {
                if (
                  ((t += r),
                  (t = Math.round(t)),
                  this.options.infinite
                    ? b &&
                      (this.targetScroll = this.animatedScroll = this.scroll)
                    : (t = o(0, t, this.limit)),
                  h)
                )
                  return (
                    (this.animatedScroll = this.targetScroll = t),
                    this.setScroll(this.scroll),
                    this.reset(),
                    this.emit(),
                    void (null == S || S())
                  )
                if (!b) {
                  if (t === this.targetScroll) return
                  this.targetScroll = t
                }
                this.animate.fromTo(this.animatedScroll, t, {
                  duration: p,
                  easing: v,
                  lerp: f,
                  onUpdate: function (t, e) {
                    var o = e.completed
                    c && (i.isLocked = !0),
                      (i.isScrolling = !0),
                      (i.velocity = t - i.animatedScroll),
                      (i.direction = Math.sign(i.velocity)),
                      (i.animatedScroll = t),
                      i.setScroll(i.scroll),
                      b && (i.targetScroll = t),
                      o &&
                        (c && (i.isLocked = !1),
                        requestAnimationFrame(function () {
                          i.isScrolling = !1
                        }),
                        (i.velocity = 0),
                        null == S || S()),
                      i.emit()
                  },
                })
              }
            }
          }),
          e(t, [
            {
              key: "rootElement",
              get: function () {
                return this.options.wrapper === window
                  ? this.options.content
                  : this.options.wrapper
              },
            },
            {
              key: "limit",
              get: function () {
                return this.isHorizontal
                  ? this.dimensions.limit.x
                  : this.dimensions.limit.y
              },
            },
            {
              key: "isHorizontal",
              get: function () {
                return "horizontal" === this.options.orientation
              },
            },
            {
              key: "actualScroll",
              get: function () {
                return this.isHorizontal
                  ? this.rootElement.scrollLeft
                  : this.rootElement.scrollTop
              },
            },
            {
              key: "scroll",
              get: function () {
                return this.options.infinite
                  ? ((this.animatedScroll % (t = this.limit)) + t) % t
                  : this.animatedScroll
                var t
              },
            },
            {
              key: "progress",
              get: function () {
                return 0 === this.limit ? 1 : this.scroll / this.limit
              },
            },
            {
              key: "isSmooth",
              get: function () {
                return this.__isSmooth
              },
              set: function (t) {
                this.__isSmooth !== t &&
                  (this.rootElement.classList.toggle("lenis-smooth", t),
                  (this.__isSmooth = t))
              },
            },
            {
              key: "isScrolling",
              get: function () {
                return this.__isScrolling
              },
              set: function (t) {
                this.__isScrolling !== t &&
                  (this.rootElement.classList.toggle("lenis-scrolling", t),
                  (this.__isScrolling = t))
              },
            },
            {
              key: "isStopped",
              get: function () {
                return this.__isStopped
              },
              set: function (t) {
                this.__isStopped !== t &&
                  (this.rootElement.classList.toggle("lenis-stopped", t),
                  (this.__isStopped = t))
              },
            },
          ]),
          t
        )
      })()
    return l
  })

  const lenis = new Lenis()

  chrome.storage.local.get(["smooth"], function (result) {
    if (result.smooth) {
      chrome.storage.local.set({ smooth: false })
      location.reload()
    } else {
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
      chrome.storage.local.set({ smooth: true })
      console.log("Smooth scrolling enabled", true)
    }
  })
})()
