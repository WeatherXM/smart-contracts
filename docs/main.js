/*! For license information please see main.js.LICENSE.txt */
(() => {
	var e = {
			424: (e, t, n) => {
				"use strict";
				n.r(t), n.d(t, { default: () => s });
				var a = n(81),
					r = n.n(a),
					i = n(645),
					o = n.n(i)()(r());
				o.push([
					e.id,
					"@import url(https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700&display=swap);",
				]),
					o.push([
						e.id,
						"\nhtml,\nbody {\n  font-family: 'Source Code Pro', monospace;\n}\n",
						"",
					]);
				const s = o;
			},
			645: (e) => {
				"use strict";
				e.exports = function (e) {
					var t = [];
					return (
						(t.toString = function () {
							return this.map(function (t) {
								var n = "",
									a = void 0 !== t[5];
								return (
									t[4] && (n += "@supports (".concat(t[4], ") {")),
									t[2] && (n += "@media ".concat(t[2], " {")),
									a &&
										(n += "@layer".concat(
											t[5].length > 0 ? " ".concat(t[5]) : "",
											" {"
										)),
									(n += e(t)),
									a && (n += "}"),
									t[2] && (n += "}"),
									t[4] && (n += "}"),
									n
								);
							}).join("");
						}),
						(t.i = function (e, n, a, r, i) {
							"string" == typeof e && (e = [[null, e, void 0]]);
							var o = {};
							if (a)
								for (var s = 0; s < this.length; s++) {
									var u = this[s][0];
									null != u && (o[u] = !0);
								}
							for (var l = 0; l < e.length; l++) {
								var p = [].concat(e[l]);
								(a && o[p[0]]) ||
									(void 0 !== i &&
										(void 0 === p[5] ||
											(p[1] = "@layer"
												.concat(p[5].length > 0 ? " ".concat(p[5]) : "", " {")
												.concat(p[1], "}")),
										(p[5] = i)),
									n &&
										(p[2]
											? ((p[1] = "@media "
													.concat(p[2], " {")
													.concat(p[1], "}")),
											  (p[2] = n))
											: (p[2] = n)),
									r &&
										(p[4]
											? ((p[1] = "@supports ("
													.concat(p[4], ") {")
													.concat(p[1], "}")),
											  (p[4] = r))
											: (p[4] = "".concat(r))),
									t.push(p));
							}
						}),
						t
					);
				};
			},
			81: (e) => {
				"use strict";
				e.exports = function (e) {
					return e[1];
				};
			},
			838: (e, t, n) => {
				var a = n(424);
				a.__esModule && (a = a.default),
					"string" == typeof a && (a = [[e.id, a, ""]]),
					a.locals && (e.exports = a.locals),
					(0, n(346).Z)("20211576", a, !1, {});
			},
			346: (e, t, n) => {
				"use strict";
				function a(e, t) {
					for (var n = [], a = {}, r = 0; r < t.length; r++) {
						var i = t[r],
							o = i[0],
							s = { id: e + ":" + r, css: i[1], media: i[2], sourceMap: i[3] };
						a[o] ? a[o].parts.push(s) : n.push((a[o] = { id: o, parts: [s] }));
					}
					return n;
				}
				n.d(t, { Z: () => m });
				var r = "undefined" != typeof document;
				if ("undefined" != typeof DEBUG && DEBUG && !r)
					throw new Error(
						"vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
					);
				var i = {},
					o = r && (document.head || document.getElementsByTagName("head")[0]),
					s = null,
					u = 0,
					l = !1,
					p = function () {},
					d = null,
					c = "data-vue-ssr-id",
					y =
						"undefined" != typeof navigator &&
						/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
				function m(e, t, n, r) {
					(l = n), (d = r || {});
					var o = a(e, t);
					return (
						f(o),
						function (t) {
							for (var n = [], r = 0; r < o.length; r++) {
								var s = o[r];
								(u = i[s.id]).refs--, n.push(u);
							}
							for (t ? f((o = a(e, t))) : (o = []), r = 0; r < n.length; r++) {
								var u;
								if (0 === (u = n[r]).refs) {
									for (var l = 0; l < u.parts.length; l++) u.parts[l]();
									delete i[u.id];
								}
							}
						}
					);
				}
				function f(e) {
					for (var t = 0; t < e.length; t++) {
						var n = e[t],
							a = i[n.id];
						if (a) {
							a.refs++;
							for (var r = 0; r < a.parts.length; r++) a.parts[r](n.parts[r]);
							for (; r < n.parts.length; r++) a.parts.push(v(n.parts[r]));
							a.parts.length > n.parts.length &&
								(a.parts.length = n.parts.length);
						} else {
							var o = [];
							for (r = 0; r < n.parts.length; r++) o.push(v(n.parts[r]));
							i[n.id] = { id: n.id, refs: 1, parts: o };
						}
					}
				}
				function h() {
					var e = document.createElement("style");
					return (e.type = "text/css"), o.appendChild(e), e;
				}
				function v(e) {
					var t,
						n,
						a = document.querySelector("style[" + c + '~="' + e.id + '"]');
					if (a) {
						if (l) return p;
						a.parentNode.removeChild(a);
					}
					if (y) {
						var r = u++;
						(a = s || (s = h())),
							(t = T.bind(null, a, r, !1)),
							(n = T.bind(null, a, r, !0));
					} else
						(a = h()),
							(t = w.bind(null, a)),
							(n = function () {
								a.parentNode.removeChild(a);
							});
					return (
						t(e),
						function (a) {
							if (a) {
								if (
									a.css === e.css &&
									a.media === e.media &&
									a.sourceMap === e.sourceMap
								)
									return;
								t((e = a));
							} else n();
						}
					);
				}
				var b,
					g =
						((b = []),
						function (e, t) {
							return (b[e] = t), b.filter(Boolean).join("\n");
						});
				function T(e, t, n, a) {
					var r = n ? "" : a.css;
					if (e.styleSheet) e.styleSheet.cssText = g(t, r);
					else {
						var i = document.createTextNode(r),
							o = e.childNodes;
						o[t] && e.removeChild(o[t]),
							o.length ? e.insertBefore(i, o[t]) : e.appendChild(i);
					}
				}
				function w(e, t) {
					var n = t.css,
						a = t.media,
						r = t.sourceMap;
					if (
						(a && e.setAttribute("media", a),
						d.ssrId && e.setAttribute(c, t.id),
						r &&
							((n += "\n/*# sourceURL=" + r.sources[0] + " */"),
							(n +=
								"\n/*# sourceMappingURL=data:application/json;base64," +
								btoa(unescape(encodeURIComponent(JSON.stringify(r)))) +
								" */")),
						e.styleSheet)
					)
						e.styleSheet.cssText = n;
					else {
						for (; e.firstChild; ) e.removeChild(e.firstChild);
						e.appendChild(document.createTextNode(n));
					}
				}
			},
		},
		t = {};
	function n(a) {
		var r = t[a];
		if (void 0 !== r) return r.exports;
		var i = (t[a] = { id: a, exports: {} });
		return e[a](i, i.exports, n), i.exports;
	}
	(n.n = (e) => {
		var t = e && e.__esModule ? () => e.default : () => e;
		return n.d(t, { a: t }), t;
	}),
		(n.d = (e, t) => {
			for (var a in t)
				n.o(t, a) &&
					!n.o(e, a) &&
					Object.defineProperty(e, a, { enumerable: !0, get: t[a] });
		}),
		(n.g = (function () {
			if ("object" == typeof globalThis) return globalThis;
			try {
				return this || new Function("return this")();
			} catch (e) {
				if ("object" == typeof window) return window;
			}
		})()),
		(n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
		(n.r = (e) => {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(e, "__esModule", { value: !0 });
		}),
		(() => {
			"use strict";
			var e = Object.freeze({}),
				t = Array.isArray;
			function a(e) {
				return null == e;
			}
			function r(e) {
				return null != e;
			}
			function i(e) {
				return !0 === e;
			}
			function o(e) {
				return (
					"string" == typeof e ||
					"number" == typeof e ||
					"symbol" == typeof e ||
					"boolean" == typeof e
				);
			}
			function s(e) {
				return "function" == typeof e;
			}
			function u(e) {
				return null !== e && "object" == typeof e;
			}
			var l = Object.prototype.toString;
			function p(e) {
				return "[object Object]" === l.call(e);
			}
			function d(e) {
				var t = parseFloat(String(e));
				return t >= 0 && Math.floor(t) === t && isFinite(e);
			}
			function c(e) {
				return (
					r(e) && "function" == typeof e.then && "function" == typeof e.catch
				);
			}
			function y(e) {
				return null == e
					? ""
					: Array.isArray(e) || (p(e) && e.toString === l)
					? JSON.stringify(e, null, 2)
					: String(e);
			}
			function m(e) {
				var t = parseFloat(e);
				return isNaN(t) ? e : t;
			}
			function f(e, t) {
				for (
					var n = Object.create(null), a = e.split(","), r = 0;
					r < a.length;
					r++
				)
					n[a[r]] = !0;
				return t
					? function (e) {
							return n[e.toLowerCase()];
					  }
					: function (e) {
							return n[e];
					  };
			}
			var h = f("slot,component", !0),
				v = f("key,ref,slot,slot-scope,is");
			function b(e, t) {
				var n = e.length;
				if (n) {
					if (t === e[n - 1]) return void (e.length = n - 1);
					var a = e.indexOf(t);
					if (a > -1) return e.splice(a, 1);
				}
			}
			var g = Object.prototype.hasOwnProperty;
			function T(e, t) {
				return g.call(e, t);
			}
			function w(e) {
				var t = Object.create(null);
				return function (n) {
					return t[n] || (t[n] = e(n));
				};
			}
			var _ = /-(\w)/g,
				R = w(function (e) {
					return e.replace(_, function (e, t) {
						return t ? t.toUpperCase() : "";
					});
				}),
				x = w(function (e) {
					return e.charAt(0).toUpperCase() + e.slice(1);
				}),
				k = /\B([A-Z])/g,
				M = w(function (e) {
					return e.replace(k, "-$1").toLowerCase();
				}),
				C = Function.prototype.bind
					? function (e, t) {
							return e.bind(t);
					  }
					: function (e, t) {
							function n(n) {
								var a = arguments.length;
								return a
									? a > 1
										? e.apply(t, arguments)
										: e.call(t, n)
									: e.call(t);
							}
							return (n._length = e.length), n;
					  };
			function A(e, t) {
				t = t || 0;
				for (var n = e.length - t, a = new Array(n); n--; ) a[n] = e[n + t];
				return a;
			}
			function E(e, t) {
				for (var n in t) e[n] = t[n];
				return e;
			}
			function I(e) {
				for (var t = {}, n = 0; n < e.length; n++) e[n] && E(t, e[n]);
				return t;
			}
			function S(e, t, n) {}
			var O = function (e, t, n) {
					return !1;
				},
				$ = function (e) {
					return e;
				};
			function F(e, t) {
				if (e === t) return !0;
				var n = u(e),
					a = u(t);
				if (!n || !a) return !n && !a && String(e) === String(t);
				try {
					var r = Array.isArray(e),
						i = Array.isArray(t);
					if (r && i)
						return (
							e.length === t.length &&
							e.every(function (e, n) {
								return F(e, t[n]);
							})
						);
					if (e instanceof Date && t instanceof Date)
						return e.getTime() === t.getTime();
					if (r || i) return !1;
					var o = Object.keys(e),
						s = Object.keys(t);
					return (
						o.length === s.length &&
						o.every(function (n) {
							return F(e[n], t[n]);
						})
					);
				} catch (e) {
					return !1;
				}
			}
			function D(e, t) {
				for (var n = 0; n < e.length; n++) if (F(e[n], t)) return n;
				return -1;
			}
			function P(e) {
				var t = !1;
				return function () {
					t || ((t = !0), e.apply(this, arguments));
				};
			}
			var j = "data-server-rendered",
				N = ["component", "directive", "filter"],
				U = [
					"beforeCreate",
					"created",
					"beforeMount",
					"mounted",
					"beforeUpdate",
					"updated",
					"beforeDestroy",
					"destroyed",
					"activated",
					"deactivated",
					"errorCaptured",
					"serverPrefetch",
					"renderTracked",
					"renderTriggered",
				],
				L = {
					optionMergeStrategies: Object.create(null),
					silent: !1,
					productionTip: !1,
					devtools: !1,
					performance: !1,
					errorHandler: null,
					warnHandler: null,
					ignoredElements: [],
					keyCodes: Object.create(null),
					isReservedTag: O,
					isReservedAttr: O,
					isUnknownElement: O,
					getTagNamespace: S,
					parsePlatformTagName: $,
					mustUseProp: O,
					async: !0,
					_lifecycleHooks: U,
				},
				B =
					/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
			function q(e) {
				var t = (e + "").charCodeAt(0);
				return 36 === t || 95 === t;
			}
			function W(e, t, n, a) {
				Object.defineProperty(e, t, {
					value: n,
					enumerable: !!a,
					writable: !0,
					configurable: !0,
				});
			}
			var z = new RegExp("[^".concat(B.source, ".$_\\d]")),
				V = "__proto__" in {},
				G = "undefined" != typeof window,
				H = G && window.navigator.userAgent.toLowerCase(),
				X = H && /msie|trident/.test(H),
				K = H && H.indexOf("msie 9.0") > 0,
				J = H && H.indexOf("edge/") > 0;
			H && H.indexOf("android");
			var Z = H && /iphone|ipad|ipod|ios/.test(H);
			H && /chrome\/\d+/.test(H), H && /phantomjs/.test(H);
			var Y,
				Q = H && H.match(/firefox\/(\d+)/),
				ee = {}.watch,
				te = !1;
			if (G)
				try {
					var ne = {};
					Object.defineProperty(ne, "passive", {
						get: function () {
							te = !0;
						},
					}),
						window.addEventListener("test-passive", null, ne);
				} catch (e) {}
			var ae = function () {
					return (
						void 0 === Y &&
							(Y =
								!G &&
								void 0 !== n.g &&
								n.g.process &&
								"server" === n.g.process.env.VUE_ENV),
						Y
					);
				},
				re = G && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
			function ie(e) {
				return "function" == typeof e && /native code/.test(e.toString());
			}
			var oe,
				se =
					"undefined" != typeof Symbol &&
					ie(Symbol) &&
					"undefined" != typeof Reflect &&
					ie(Reflect.ownKeys);
			oe =
				"undefined" != typeof Set && ie(Set)
					? Set
					: (function () {
							function e() {
								this.set = Object.create(null);
							}
							return (
								(e.prototype.has = function (e) {
									return !0 === this.set[e];
								}),
								(e.prototype.add = function (e) {
									this.set[e] = !0;
								}),
								(e.prototype.clear = function () {
									this.set = Object.create(null);
								}),
								e
							);
					  })();
			var ue = null;
			function le(e) {
				void 0 === e && (e = null),
					e || (ue && ue._scope.off()),
					(ue = e),
					e && e._scope.on();
			}
			var pe = (function () {
					function e(e, t, n, a, r, i, o, s) {
						(this.tag = e),
							(this.data = t),
							(this.children = n),
							(this.text = a),
							(this.elm = r),
							(this.ns = void 0),
							(this.context = i),
							(this.fnContext = void 0),
							(this.fnOptions = void 0),
							(this.fnScopeId = void 0),
							(this.key = t && t.key),
							(this.componentOptions = o),
							(this.componentInstance = void 0),
							(this.parent = void 0),
							(this.raw = !1),
							(this.isStatic = !1),
							(this.isRootInsert = !0),
							(this.isComment = !1),
							(this.isCloned = !1),
							(this.isOnce = !1),
							(this.asyncFactory = s),
							(this.asyncMeta = void 0),
							(this.isAsyncPlaceholder = !1);
					}
					return (
						Object.defineProperty(e.prototype, "child", {
							get: function () {
								return this.componentInstance;
							},
							enumerable: !1,
							configurable: !0,
						}),
						e
					);
				})(),
				de = function (e) {
					void 0 === e && (e = "");
					var t = new pe();
					return (t.text = e), (t.isComment = !0), t;
				};
			function ce(e) {
				return new pe(void 0, void 0, void 0, String(e));
			}
			function ye(e) {
				var t = new pe(
					e.tag,
					e.data,
					e.children && e.children.slice(),
					e.text,
					e.elm,
					e.context,
					e.componentOptions,
					e.asyncFactory
				);
				return (
					(t.ns = e.ns),
					(t.isStatic = e.isStatic),
					(t.key = e.key),
					(t.isComment = e.isComment),
					(t.fnContext = e.fnContext),
					(t.fnOptions = e.fnOptions),
					(t.fnScopeId = e.fnScopeId),
					(t.asyncMeta = e.asyncMeta),
					(t.isCloned = !0),
					t
				);
			}
			var me = 0,
				fe = [],
				he = function () {
					for (var e = 0; e < fe.length; e++) {
						var t = fe[e];
						(t.subs = t.subs.filter(function (e) {
							return e;
						})),
							(t._pending = !1);
					}
					fe.length = 0;
				},
				ve = (function () {
					function e() {
						(this._pending = !1), (this.id = me++), (this.subs = []);
					}
					return (
						(e.prototype.addSub = function (e) {
							this.subs.push(e);
						}),
						(e.prototype.removeSub = function (e) {
							(this.subs[this.subs.indexOf(e)] = null),
								this._pending || ((this._pending = !0), fe.push(this));
						}),
						(e.prototype.depend = function (t) {
							e.target && e.target.addDep(this);
						}),
						(e.prototype.notify = function (e) {
							for (
								var t = this.subs.filter(function (e) {
										return e;
									}),
									n = 0,
									a = t.length;
								n < a;
								n++
							)
								t[n].update();
						}),
						e
					);
				})();
			ve.target = null;
			var be = [];
			function ge(e) {
				be.push(e), (ve.target = e);
			}
			function Te() {
				be.pop(), (ve.target = be[be.length - 1]);
			}
			var we = Array.prototype,
				_e = Object.create(we);
			["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
				function (e) {
					var t = we[e];
					W(_e, e, function () {
						for (var n = [], a = 0; a < arguments.length; a++)
							n[a] = arguments[a];
						var r,
							i = t.apply(this, n),
							o = this.__ob__;
						switch (e) {
							case "push":
							case "unshift":
								r = n;
								break;
							case "splice":
								r = n.slice(2);
						}
						return r && o.observeArray(r), o.dep.notify(), i;
					});
				}
			);
			var Re = Object.getOwnPropertyNames(_e),
				xe = {},
				ke = !0;
			function Me(e) {
				ke = e;
			}
			var Ce = { notify: S, depend: S, addSub: S, removeSub: S },
				Ae = (function () {
					function e(e, n, a) {
						if (
							(void 0 === n && (n = !1),
							void 0 === a && (a = !1),
							(this.value = e),
							(this.shallow = n),
							(this.mock = a),
							(this.dep = a ? Ce : new ve()),
							(this.vmCount = 0),
							W(e, "__ob__", this),
							t(e))
						) {
							if (!a)
								if (V) e.__proto__ = _e;
								else
									for (var r = 0, i = Re.length; r < i; r++)
										W(e, (s = Re[r]), _e[s]);
							n || this.observeArray(e);
						} else {
							var o = Object.keys(e);
							for (r = 0; r < o.length; r++) {
								var s;
								Ie(e, (s = o[r]), xe, void 0, n, a);
							}
						}
					}
					return (
						(e.prototype.observeArray = function (e) {
							for (var t = 0, n = e.length; t < n; t++) Ee(e[t], !1, this.mock);
						}),
						e
					);
				})();
			function Ee(e, n, a) {
				return e && T(e, "__ob__") && e.__ob__ instanceof Ae
					? e.__ob__
					: !ke ||
					  (!a && ae()) ||
					  (!t(e) && !p(e)) ||
					  !Object.isExtensible(e) ||
					  e.__v_skip ||
					  Pe(e) ||
					  e instanceof pe
					? void 0
					: new Ae(e, n, a);
			}
			function Ie(e, n, a, r, i, o) {
				var s = new ve(),
					u = Object.getOwnPropertyDescriptor(e, n);
				if (!u || !1 !== u.configurable) {
					var l = u && u.get,
						p = u && u.set;
					(l && !p) || (a !== xe && 2 !== arguments.length) || (a = e[n]);
					var d = !i && Ee(a, !1, o);
					return (
						Object.defineProperty(e, n, {
							enumerable: !0,
							configurable: !0,
							get: function () {
								var n = l ? l.call(e) : a;
								return (
									ve.target &&
										(s.depend(), d && (d.dep.depend(), t(n) && $e(n))),
									Pe(n) && !i ? n.value : n
								);
							},
							set: function (t) {
								var n,
									r,
									u = l ? l.call(e) : a;
								if (
									(n = u) === (r = t)
										? 0 === n && 1 / n != 1 / r
										: n == n || r == r
								) {
									if (p) p.call(e, t);
									else {
										if (l) return;
										if (!i && Pe(u) && !Pe(t)) return void (u.value = t);
										a = t;
									}
									(d = !i && Ee(t, !1, o)), s.notify();
								}
							},
						}),
						s
					);
				}
			}
			function Se(e, n, a) {
				if (!De(e)) {
					var r = e.__ob__;
					return t(e) && d(n)
						? ((e.length = Math.max(e.length, n)),
						  e.splice(n, 1, a),
						  r && !r.shallow && r.mock && Ee(a, !1, !0),
						  a)
						: n in e && !(n in Object.prototype)
						? ((e[n] = a), a)
						: e._isVue || (r && r.vmCount)
						? a
						: r
						? (Ie(r.value, n, a, void 0, r.shallow, r.mock), r.dep.notify(), a)
						: ((e[n] = a), a);
				}
			}
			function Oe(e, n) {
				if (t(e) && d(n)) e.splice(n, 1);
				else {
					var a = e.__ob__;
					e._isVue ||
						(a && a.vmCount) ||
						De(e) ||
						(T(e, n) && (delete e[n], a && a.dep.notify()));
				}
			}
			function $e(e) {
				for (var n = void 0, a = 0, r = e.length; a < r; a++)
					(n = e[a]) && n.__ob__ && n.__ob__.dep.depend(), t(n) && $e(n);
			}
			function Fe(e) {
				return (
					(function (e, t) {
						De(e) || Ee(e, t, ae());
					})(e, !0),
					W(e, "__v_isShallow", !0),
					e
				);
			}
			function De(e) {
				return !(!e || !e.__v_isReadonly);
			}
			function Pe(e) {
				return !(!e || !0 !== e.__v_isRef);
			}
			function je(e, t, n) {
				Object.defineProperty(e, n, {
					enumerable: !0,
					configurable: !0,
					get: function () {
						var e = t[n];
						if (Pe(e)) return e.value;
						var a = e && e.__ob__;
						return a && a.dep.depend(), e;
					},
					set: function (e) {
						var a = t[n];
						Pe(a) && !Pe(e) ? (a.value = e) : (t[n] = e);
					},
				});
			}
			var Ne = w(function (e) {
				var t = "&" === e.charAt(0),
					n = "~" === (e = t ? e.slice(1) : e).charAt(0),
					a = "!" === (e = n ? e.slice(1) : e).charAt(0);
				return {
					name: (e = a ? e.slice(1) : e),
					once: n,
					capture: a,
					passive: t,
				};
			});
			function Ue(e, n) {
				function a() {
					var e = a.fns;
					if (!t(e)) return Kt(e, null, arguments, n, "v-on handler");
					for (var r = e.slice(), i = 0; i < r.length; i++)
						Kt(r[i], null, arguments, n, "v-on handler");
				}
				return (a.fns = e), a;
			}
			function Le(e, t, n, r, o, s) {
				var u, l, p, d;
				for (u in e)
					(l = e[u]),
						(p = t[u]),
						(d = Ne(u)),
						a(l) ||
							(a(p)
								? (a(l.fns) && (l = e[u] = Ue(l, s)),
								  i(d.once) && (l = e[u] = o(d.name, l, d.capture)),
								  n(d.name, l, d.capture, d.passive, d.params))
								: l !== p && ((p.fns = l), (e[u] = p)));
				for (u in t) a(e[u]) && r((d = Ne(u)).name, t[u], d.capture);
			}
			function Be(e, t, n) {
				var o;
				e instanceof pe && (e = e.data.hook || (e.data.hook = {}));
				var s = e[t];
				function u() {
					n.apply(this, arguments), b(o.fns, u);
				}
				a(s)
					? (o = Ue([u]))
					: r(s.fns) && i(s.merged)
					? (o = s).fns.push(u)
					: (o = Ue([s, u])),
					(o.merged = !0),
					(e[t] = o);
			}
			function qe(e, t, n, a, i) {
				if (r(t)) {
					if (T(t, n)) return (e[n] = t[n]), i || delete t[n], !0;
					if (T(t, a)) return (e[n] = t[a]), i || delete t[a], !0;
				}
				return !1;
			}
			function We(e) {
				return o(e) ? [ce(e)] : t(e) ? Ve(e) : void 0;
			}
			function ze(e) {
				return r(e) && r(e.text) && !1 === e.isComment;
			}
			function Ve(e, n) {
				var s,
					u,
					l,
					p,
					d = [];
				for (s = 0; s < e.length; s++)
					a((u = e[s])) ||
						"boolean" == typeof u ||
						((p = d[(l = d.length - 1)]),
						t(u)
							? u.length > 0 &&
							  (ze((u = Ve(u, "".concat(n || "", "_").concat(s)))[0]) &&
									ze(p) &&
									((d[l] = ce(p.text + u[0].text)), u.shift()),
							  d.push.apply(d, u))
							: o(u)
							? ze(p)
								? (d[l] = ce(p.text + u))
								: "" !== u && d.push(ce(u))
							: ze(u) && ze(p)
							? (d[l] = ce(p.text + u.text))
							: (i(e._isVList) &&
									r(u.tag) &&
									a(u.key) &&
									r(n) &&
									(u.key = "__vlist".concat(n, "_").concat(s, "__")),
							  d.push(u)));
				return d;
			}
			var Ge = 1,
				He = 2;
			function Xe(e, n, a, l, p, d) {
				return (
					(t(a) || o(a)) && ((p = l), (l = a), (a = void 0)),
					i(d) && (p = He),
					(function (e, n, a, i, o) {
						if (r(a) && r(a.__ob__)) return de();
						if ((r(a) && r(a.is) && (n = a.is), !n)) return de();
						var l, p;
						if (
							(t(i) &&
								s(i[0]) &&
								(((a = a || {}).scopedSlots = { default: i[0] }),
								(i.length = 0)),
							o === He
								? (i = We(i))
								: o === Ge &&
								  (i = (function (e) {
										for (var n = 0; n < e.length; n++)
											if (t(e[n])) return Array.prototype.concat.apply([], e);
										return e;
								  })(i)),
							"string" == typeof n)
						) {
							var d = void 0;
							(p = (e.$vnode && e.$vnode.ns) || L.getTagNamespace(n)),
								(l = L.isReservedTag(n)
									? new pe(L.parsePlatformTagName(n), a, i, void 0, void 0, e)
									: (a && a.pre) || !r((d = qn(e.$options, "components", n)))
									? new pe(n, a, i, void 0, void 0, e)
									: On(d, a, e, i, n));
						} else l = On(n, a, e, i);
						return t(l)
							? l
							: r(l)
							? (r(p) && Ke(l, p),
							  r(a) &&
									(function (e) {
										u(e.style) && dn(e.style), u(e.class) && dn(e.class);
									})(a),
							  l)
							: de();
					})(e, n, a, l, p)
				);
			}
			function Ke(e, t, n) {
				if (
					((e.ns = t),
					"foreignObject" === e.tag && ((t = void 0), (n = !0)),
					r(e.children))
				)
					for (var o = 0, s = e.children.length; o < s; o++) {
						var u = e.children[o];
						r(u.tag) && (a(u.ns) || (i(n) && "svg" !== u.tag)) && Ke(u, t, n);
					}
			}
			function Je(e, n) {
				var a,
					i,
					o,
					s,
					l = null;
				if (t(e) || "string" == typeof e)
					for (l = new Array(e.length), a = 0, i = e.length; a < i; a++)
						l[a] = n(e[a], a);
				else if ("number" == typeof e)
					for (l = new Array(e), a = 0; a < e; a++) l[a] = n(a + 1, a);
				else if (u(e))
					if (se && e[Symbol.iterator]) {
						l = [];
						for (var p = e[Symbol.iterator](), d = p.next(); !d.done; )
							l.push(n(d.value, l.length)), (d = p.next());
					} else
						for (
							o = Object.keys(e), l = new Array(o.length), a = 0, i = o.length;
							a < i;
							a++
						)
							(s = o[a]), (l[a] = n(e[s], s, a));
				return r(l) || (l = []), (l._isVList = !0), l;
			}
			function Ze(e, t, n, a) {
				var r,
					i = this.$scopedSlots[e];
				i
					? ((n = n || {}),
					  a && (n = E(E({}, a), n)),
					  (r = i(n) || (s(t) ? t() : t)))
					: (r = this.$slots[e] || (s(t) ? t() : t));
				var o = n && n.slot;
				return o ? this.$createElement("template", { slot: o }, r) : r;
			}
			function Ye(e) {
				return qn(this.$options, "filters", e) || $;
			}
			function Qe(e, n) {
				return t(e) ? -1 === e.indexOf(n) : e !== n;
			}
			function et(e, t, n, a, r) {
				var i = L.keyCodes[t] || n;
				return r && a && !L.keyCodes[t]
					? Qe(r, a)
					: i
					? Qe(i, e)
					: a
					? M(a) !== t
					: void 0 === e;
			}
			function tt(e, n, a, r, i) {
				if (a && u(a)) {
					t(a) && (a = I(a));
					var o = void 0,
						s = function (t) {
							if ("class" === t || "style" === t || v(t)) o = e;
							else {
								var s = e.attrs && e.attrs.type;
								o =
									r || L.mustUseProp(n, s, t)
										? e.domProps || (e.domProps = {})
										: e.attrs || (e.attrs = {});
							}
							var u = R(t),
								l = M(t);
							u in o ||
								l in o ||
								((o[t] = a[t]),
								i &&
									((e.on || (e.on = {}))["update:".concat(t)] = function (e) {
										a[t] = e;
									}));
						};
					for (var l in a) s(l);
				}
				return e;
			}
			function nt(e, t) {
				var n = this._staticTrees || (this._staticTrees = []),
					a = n[e];
				return (
					(a && !t) ||
						rt(
							(a = n[e] =
								this.$options.staticRenderFns[e].call(
									this._renderProxy,
									this._c,
									this
								)),
							"__static__".concat(e),
							!1
						),
					a
				);
			}
			function at(e, t, n) {
				return (
					rt(e, "__once__".concat(t).concat(n ? "_".concat(n) : ""), !0), e
				);
			}
			function rt(e, n, a) {
				if (t(e))
					for (var r = 0; r < e.length; r++)
						e[r] &&
							"string" != typeof e[r] &&
							it(e[r], "".concat(n, "_").concat(r), a);
				else it(e, n, a);
			}
			function it(e, t, n) {
				(e.isStatic = !0), (e.key = t), (e.isOnce = n);
			}
			function ot(e, t) {
				if (t && p(t)) {
					var n = (e.on = e.on ? E({}, e.on) : {});
					for (var a in t) {
						var r = n[a],
							i = t[a];
						n[a] = r ? [].concat(r, i) : i;
					}
				}
				return e;
			}
			function st(e, n, a, r) {
				n = n || { $stable: !a };
				for (var i = 0; i < e.length; i++) {
					var o = e[i];
					t(o)
						? st(o, n, a)
						: o && (o.proxy && (o.fn.proxy = !0), (n[o.key] = o.fn));
				}
				return r && (n.$key = r), n;
			}
			function ut(e, t) {
				for (var n = 0; n < t.length; n += 2) {
					var a = t[n];
					"string" == typeof a && a && (e[t[n]] = t[n + 1]);
				}
				return e;
			}
			function lt(e, t) {
				return "string" == typeof e ? t + e : e;
			}
			function pt(e) {
				(e._o = at),
					(e._n = m),
					(e._s = y),
					(e._l = Je),
					(e._t = Ze),
					(e._q = F),
					(e._i = D),
					(e._m = nt),
					(e._f = Ye),
					(e._k = et),
					(e._b = tt),
					(e._v = ce),
					(e._e = de),
					(e._u = st),
					(e._g = ot),
					(e._d = ut),
					(e._p = lt);
			}
			function dt(e, t) {
				if (!e || !e.length) return {};
				for (var n = {}, a = 0, r = e.length; a < r; a++) {
					var i = e[a],
						o = i.data;
					if (
						(o && o.attrs && o.attrs.slot && delete o.attrs.slot,
						(i.context !== t && i.fnContext !== t) || !o || null == o.slot)
					)
						(n.default || (n.default = [])).push(i);
					else {
						var s = o.slot,
							u = n[s] || (n[s] = []);
						"template" === i.tag
							? u.push.apply(u, i.children || [])
							: u.push(i);
					}
				}
				for (var l in n) n[l].every(ct) && delete n[l];
				return n;
			}
			function ct(e) {
				return (e.isComment && !e.asyncFactory) || " " === e.text;
			}
			function yt(e) {
				return e.isComment && e.asyncFactory;
			}
			function mt(t, n, a, r) {
				var i,
					o = Object.keys(a).length > 0,
					s = n ? !!n.$stable : !o,
					u = n && n.$key;
				if (n) {
					if (n._normalized) return n._normalized;
					if (s && r && r !== e && u === r.$key && !o && !r.$hasNormal)
						return r;
					for (var l in ((i = {}), n))
						n[l] && "$" !== l[0] && (i[l] = ft(t, a, l, n[l]));
				} else i = {};
				for (var p in a) p in i || (i[p] = ht(a, p));
				return (
					n && Object.isExtensible(n) && (n._normalized = i),
					W(i, "$stable", s),
					W(i, "$key", u),
					W(i, "$hasNormal", o),
					i
				);
			}
			function ft(e, n, a, r) {
				var i = function () {
					var n = ue;
					le(e);
					var a = arguments.length ? r.apply(null, arguments) : r({}),
						i = (a = a && "object" == typeof a && !t(a) ? [a] : We(a)) && a[0];
					return (
						le(n),
						a && (!i || (1 === a.length && i.isComment && !yt(i))) ? void 0 : a
					);
				};
				return (
					r.proxy &&
						Object.defineProperty(n, a, {
							get: i,
							enumerable: !0,
							configurable: !0,
						}),
					i
				);
			}
			function ht(e, t) {
				return function () {
					return e[t];
				};
			}
			function vt(e, t, n, a, r) {
				var i = !1;
				for (var o in t)
					o in e ? t[o] !== n[o] && (i = !0) : ((i = !0), bt(e, o, a, r));
				for (var o in e) o in t || ((i = !0), delete e[o]);
				return i;
			}
			function bt(e, t, n, a) {
				Object.defineProperty(e, t, {
					enumerable: !0,
					configurable: !0,
					get: function () {
						return n[a][t];
					},
				});
			}
			function gt(e, t) {
				for (var n in t) e[n] = t[n];
				for (var n in e) n in t || delete e[n];
			}
			var Tt,
				wt = null;
			function _t(e, t) {
				return (
					(e.__esModule || (se && "Module" === e[Symbol.toStringTag])) &&
						(e = e.default),
					u(e) ? t.extend(e) : e
				);
			}
			function Rt(e) {
				if (t(e))
					for (var n = 0; n < e.length; n++) {
						var a = e[n];
						if (r(a) && (r(a.componentOptions) || yt(a))) return a;
					}
			}
			function xt(e, t) {
				Tt.$on(e, t);
			}
			function kt(e, t) {
				Tt.$off(e, t);
			}
			function Mt(e, t) {
				var n = Tt;
				return function a() {
					null !== t.apply(null, arguments) && n.$off(e, a);
				};
			}
			function Ct(e, t, n) {
				(Tt = e), Le(t, n || {}, xt, kt, Mt, e), (Tt = void 0);
			}
			var At = null;
			function Et(e) {
				var t = At;
				return (
					(At = e),
					function () {
						At = t;
					}
				);
			}
			function It(e) {
				for (; e && (e = e.$parent); ) if (e._inactive) return !0;
				return !1;
			}
			function St(e, t) {
				if (t) {
					if (((e._directInactive = !1), It(e))) return;
				} else if (e._directInactive) return;
				if (e._inactive || null === e._inactive) {
					e._inactive = !1;
					for (var n = 0; n < e.$children.length; n++) St(e.$children[n]);
					$t(e, "activated");
				}
			}
			function Ot(e, t) {
				if (!((t && ((e._directInactive = !0), It(e))) || e._inactive)) {
					e._inactive = !0;
					for (var n = 0; n < e.$children.length; n++) Ot(e.$children[n]);
					$t(e, "deactivated");
				}
			}
			function $t(e, t, n, a) {
				void 0 === a && (a = !0), ge();
				var r = ue;
				a && le(e);
				var i = e.$options[t],
					o = "".concat(t, " hook");
				if (i)
					for (var s = 0, u = i.length; s < u; s++)
						Kt(i[s], e, n || null, e, o);
				e._hasHookEvent && e.$emit("hook:" + t), a && le(r), Te();
			}
			var Ft = [],
				Dt = [],
				Pt = {},
				jt = !1,
				Nt = !1,
				Ut = 0,
				Lt = 0,
				Bt = Date.now;
			if (G && !X) {
				var qt = window.performance;
				qt &&
					"function" == typeof qt.now &&
					Bt() > document.createEvent("Event").timeStamp &&
					(Bt = function () {
						return qt.now();
					});
			}
			var Wt = function (e, t) {
				if (e.post) {
					if (!t.post) return 1;
				} else if (t.post) return -1;
				return e.id - t.id;
			};
			function zt() {
				var e, t;
				for (Lt = Bt(), Nt = !0, Ft.sort(Wt), Ut = 0; Ut < Ft.length; Ut++)
					(e = Ft[Ut]).before && e.before(),
						(t = e.id),
						(Pt[t] = null),
						e.run();
				var n = Dt.slice(),
					a = Ft.slice();
				(Ut = Ft.length = Dt.length = 0),
					(Pt = {}),
					(jt = Nt = !1),
					(function (e) {
						for (var t = 0; t < e.length; t++)
							(e[t]._inactive = !0), St(e[t], !0);
					})(n),
					(function (e) {
						for (var t = e.length; t--; ) {
							var n = e[t],
								a = n.vm;
							a &&
								a._watcher === n &&
								a._isMounted &&
								!a._isDestroyed &&
								$t(a, "updated");
						}
					})(a),
					he(),
					re && L.devtools && re.emit("flush");
			}
			var Vt,
				Gt = "watcher";
			"".concat(Gt, " callback"),
				"".concat(Gt, " getter"),
				"".concat(Gt, " cleanup");
			var Ht = (function () {
				function e(e) {
					void 0 === e && (e = !1),
						(this.detached = e),
						(this.active = !0),
						(this.effects = []),
						(this.cleanups = []),
						(this.parent = Vt),
						!e &&
							Vt &&
							(this.index = (Vt.scopes || (Vt.scopes = [])).push(this) - 1);
				}
				return (
					(e.prototype.run = function (e) {
						if (this.active) {
							var t = Vt;
							try {
								return (Vt = this), e();
							} finally {
								Vt = t;
							}
						}
					}),
					(e.prototype.on = function () {
						Vt = this;
					}),
					(e.prototype.off = function () {
						Vt = this.parent;
					}),
					(e.prototype.stop = function (e) {
						if (this.active) {
							var t = void 0,
								n = void 0;
							for (t = 0, n = this.effects.length; t < n; t++)
								this.effects[t].teardown();
							for (t = 0, n = this.cleanups.length; t < n; t++)
								this.cleanups[t]();
							if (this.scopes)
								for (t = 0, n = this.scopes.length; t < n; t++)
									this.scopes[t].stop(!0);
							if (!this.detached && this.parent && !e) {
								var a = this.parent.scopes.pop();
								a &&
									a !== this &&
									((this.parent.scopes[this.index] = a),
									(a.index = this.index));
							}
							(this.parent = void 0), (this.active = !1);
						}
					}),
					e
				);
			})();
			function Xt(e, t, n) {
				ge();
				try {
					if (t)
						for (var a = t; (a = a.$parent); ) {
							var r = a.$options.errorCaptured;
							if (r)
								for (var i = 0; i < r.length; i++)
									try {
										if (!1 === r[i].call(a, e, t, n)) return;
									} catch (e) {
										Jt(e, a, "errorCaptured hook");
									}
						}
					Jt(e, t, n);
				} finally {
					Te();
				}
			}
			function Kt(e, t, n, a, r) {
				var i;
				try {
					(i = n ? e.apply(t, n) : e.call(t)) &&
						!i._isVue &&
						c(i) &&
						!i._handled &&
						(i.catch(function (e) {
							return Xt(e, a, r + " (Promise/async)");
						}),
						(i._handled = !0));
				} catch (e) {
					Xt(e, a, r);
				}
				return i;
			}
			function Jt(e, t, n) {
				if (L.errorHandler)
					try {
						return L.errorHandler.call(null, e, t, n);
					} catch (t) {
						t !== e && Zt(t);
					}
				Zt(e);
			}
			function Zt(e, t, n) {
				if (!G || "undefined" == typeof console) throw e;
				console.error(e);
			}
			var Yt,
				Qt = !1,
				en = [],
				tn = !1;
			function nn() {
				tn = !1;
				var e = en.slice(0);
				en.length = 0;
				for (var t = 0; t < e.length; t++) e[t]();
			}
			if ("undefined" != typeof Promise && ie(Promise)) {
				var an = Promise.resolve();
				(Yt = function () {
					an.then(nn), Z && setTimeout(S);
				}),
					(Qt = !0);
			} else if (
				X ||
				"undefined" == typeof MutationObserver ||
				(!ie(MutationObserver) &&
					"[object MutationObserverConstructor]" !==
						MutationObserver.toString())
			)
				Yt =
					"undefined" != typeof setImmediate && ie(setImmediate)
						? function () {
								setImmediate(nn);
						  }
						: function () {
								setTimeout(nn, 0);
						  };
			else {
				var rn = 1,
					on = new MutationObserver(nn),
					sn = document.createTextNode(String(rn));
				on.observe(sn, { characterData: !0 }),
					(Yt = function () {
						(rn = (rn + 1) % 2), (sn.data = String(rn));
					}),
					(Qt = !0);
			}
			function un(e, t) {
				var n;
				if (
					(en.push(function () {
						if (e)
							try {
								e.call(t);
							} catch (e) {
								Xt(e, t, "nextTick");
							}
						else n && n(t);
					}),
					tn || ((tn = !0), Yt()),
					!e && "undefined" != typeof Promise)
				)
					return new Promise(function (e) {
						n = e;
					});
			}
			function ln(e) {
				return function (t, n) {
					if ((void 0 === n && (n = ue), n))
						return (function (e, t, n) {
							var a = e.$options;
							a[t] = Nn(a[t], n);
						})(n, e, t);
				};
			}
			ln("beforeMount"),
				ln("mounted"),
				ln("beforeUpdate"),
				ln("updated"),
				ln("beforeDestroy"),
				ln("destroyed"),
				ln("activated"),
				ln("deactivated"),
				ln("serverPrefetch"),
				ln("renderTracked"),
				ln("renderTriggered"),
				ln("errorCaptured");
			var pn = new oe();
			function dn(e) {
				return cn(e, pn), pn.clear(), e;
			}
			function cn(e, n) {
				var a,
					r,
					i = t(e);
				if (
					!(
						(!i && !u(e)) ||
						e.__v_skip ||
						Object.isFrozen(e) ||
						e instanceof pe
					)
				) {
					if (e.__ob__) {
						var o = e.__ob__.dep.id;
						if (n.has(o)) return;
						n.add(o);
					}
					if (i) for (a = e.length; a--; ) cn(e[a], n);
					else if (Pe(e)) cn(e.value, n);
					else for (a = (r = Object.keys(e)).length; a--; ) cn(e[r[a]], n);
				}
			}
			var yn = 0,
				mn = (function () {
					function e(e, t, n, a, r) {
						var i;
						void 0 === (i = Vt && !Vt._vm ? Vt : e ? e._scope : void 0) &&
							(i = Vt),
							i && i.active && i.effects.push(this),
							(this.vm = e) && r && (e._watcher = this),
							a
								? ((this.deep = !!a.deep),
								  (this.user = !!a.user),
								  (this.lazy = !!a.lazy),
								  (this.sync = !!a.sync),
								  (this.before = a.before))
								: (this.deep = this.user = this.lazy = this.sync = !1),
							(this.cb = n),
							(this.id = ++yn),
							(this.active = !0),
							(this.post = !1),
							(this.dirty = this.lazy),
							(this.deps = []),
							(this.newDeps = []),
							(this.depIds = new oe()),
							(this.newDepIds = new oe()),
							(this.expression = ""),
							s(t)
								? (this.getter = t)
								: ((this.getter = (function (e) {
										if (!z.test(e)) {
											var t = e.split(".");
											return function (e) {
												for (var n = 0; n < t.length; n++) {
													if (!e) return;
													e = e[t[n]];
												}
												return e;
											};
										}
								  })(t)),
								  this.getter || (this.getter = S)),
							(this.value = this.lazy ? void 0 : this.get());
					}
					return (
						(e.prototype.get = function () {
							var e;
							ge(this);
							var t = this.vm;
							try {
								e = this.getter.call(t, t);
							} catch (e) {
								if (!this.user) throw e;
								Xt(e, t, 'getter for watcher "'.concat(this.expression, '"'));
							} finally {
								this.deep && dn(e), Te(), this.cleanupDeps();
							}
							return e;
						}),
						(e.prototype.addDep = function (e) {
							var t = e.id;
							this.newDepIds.has(t) ||
								(this.newDepIds.add(t),
								this.newDeps.push(e),
								this.depIds.has(t) || e.addSub(this));
						}),
						(e.prototype.cleanupDeps = function () {
							for (var e = this.deps.length; e--; ) {
								var t = this.deps[e];
								this.newDepIds.has(t.id) || t.removeSub(this);
							}
							var n = this.depIds;
							(this.depIds = this.newDepIds),
								(this.newDepIds = n),
								this.newDepIds.clear(),
								(n = this.deps),
								(this.deps = this.newDeps),
								(this.newDeps = n),
								(this.newDeps.length = 0);
						}),
						(e.prototype.update = function () {
							this.lazy
								? (this.dirty = !0)
								: this.sync
								? this.run()
								: (function (e) {
										var t = e.id;
										if (null == Pt[t] && (e !== ve.target || !e.noRecurse)) {
											if (((Pt[t] = !0), Nt)) {
												for (var n = Ft.length - 1; n > Ut && Ft[n].id > e.id; )
													n--;
												Ft.splice(n + 1, 0, e);
											} else Ft.push(e);
											jt || ((jt = !0), un(zt));
										}
								  })(this);
						}),
						(e.prototype.run = function () {
							if (this.active) {
								var e = this.get();
								if (e !== this.value || u(e) || this.deep) {
									var t = this.value;
									if (((this.value = e), this.user)) {
										var n = 'callback for watcher "'.concat(
											this.expression,
											'"'
										);
										Kt(this.cb, this.vm, [e, t], this.vm, n);
									} else this.cb.call(this.vm, e, t);
								}
							}
						}),
						(e.prototype.evaluate = function () {
							(this.value = this.get()), (this.dirty = !1);
						}),
						(e.prototype.depend = function () {
							for (var e = this.deps.length; e--; ) this.deps[e].depend();
						}),
						(e.prototype.teardown = function () {
							if (
								(this.vm &&
									!this.vm._isBeingDestroyed &&
									b(this.vm._scope.effects, this),
								this.active)
							) {
								for (var e = this.deps.length; e--; )
									this.deps[e].removeSub(this);
								(this.active = !1), this.onStop && this.onStop();
							}
						}),
						e
					);
				})(),
				fn = { enumerable: !0, configurable: !0, get: S, set: S };
			function hn(e, t, n) {
				(fn.get = function () {
					return this[t][n];
				}),
					(fn.set = function (e) {
						this[t][n] = e;
					}),
					Object.defineProperty(e, n, fn);
			}
			function vn(n) {
				var a = n.$options;
				if (
					(a.props &&
						(function (e, t) {
							var n = e.$options.propsData || {},
								a = (e._props = Fe({})),
								r = (e.$options._propKeys = []);
							!e.$parent || Me(!1);
							var i = function (i) {
								r.push(i);
								var o = Wn(i, t, n, e);
								Ie(a, i, o), i in e || hn(e, "_props", i);
							};
							for (var o in t) i(o);
							Me(!0);
						})(n, a.props),
					(function (t) {
						var n = t.$options,
							a = n.setup;
						if (a) {
							var r = (t._setupContext = (function (t) {
								return {
									get attrs() {
										if (!t._attrsProxy) {
											var n = (t._attrsProxy = {});
											W(n, "_v_attr_proxy", !0),
												vt(n, t.$attrs, e, t, "$attrs");
										}
										return t._attrsProxy;
									},
									get listeners() {
										return (
											t._listenersProxy ||
												vt(
													(t._listenersProxy = {}),
													t.$listeners,
													e,
													t,
													"$listeners"
												),
											t._listenersProxy
										);
									},
									get slots() {
										return (function (e) {
											return (
												e._slotsProxy ||
													gt((e._slotsProxy = {}), e.$scopedSlots),
												e._slotsProxy
											);
										})(t);
									},
									emit: C(t.$emit, t),
									expose: function (e) {
										e &&
											Object.keys(e).forEach(function (n) {
												return je(t, e, n);
											});
									},
								};
							})(t));
							le(t), ge();
							var i = Kt(a, null, [t._props || Fe({}), r], t, "setup");
							if ((Te(), le(), s(i))) n.render = i;
							else if (u(i))
								if (((t._setupState = i), i.__sfc)) {
									var o = (t._setupProxy = {});
									for (var l in i) "__sfc" !== l && je(o, i, l);
								} else for (var l in i) q(l) || je(t, i, l);
						}
					})(n),
					a.methods &&
						(function (e, t) {
							for (var n in (e.$options.props, t))
								e[n] = "function" != typeof t[n] ? S : C(t[n], e);
						})(n, a.methods),
					a.data)
				)
					!(function (e) {
						var t = e.$options.data;
						p(
							(t = e._data =
								s(t)
									? (function (e, t) {
											ge();
											try {
												return e.call(t, t);
											} catch (e) {
												return Xt(e, t, "data()"), {};
											} finally {
												Te();
											}
									  })(t, e)
									: t || {})
						) || (t = {});
						for (
							var n = Object.keys(t),
								a = e.$options.props,
								r = (e.$options.methods, n.length);
							r--;

						) {
							var i = n[r];
							(a && T(a, i)) || q(i) || hn(e, "_data", i);
						}
						var o = Ee(t);
						o && o.vmCount++;
					})(n);
				else {
					var r = Ee((n._data = {}));
					r && r.vmCount++;
				}
				a.computed &&
					(function (e, t) {
						var n = (e._computedWatchers = Object.create(null)),
							a = ae();
						for (var r in t) {
							var i = t[r],
								o = s(i) ? i : i.get;
							a || (n[r] = new mn(e, o || S, S, bn)), r in e || gn(e, r, i);
						}
					})(n, a.computed),
					a.watch &&
						a.watch !== ee &&
						(function (e, n) {
							for (var a in n) {
								var r = n[a];
								if (t(r)) for (var i = 0; i < r.length; i++) _n(e, a, r[i]);
								else _n(e, a, r);
							}
						})(n, a.watch);
			}
			var bn = { lazy: !0 };
			function gn(e, t, n) {
				var a = !ae();
				s(n)
					? ((fn.get = a ? Tn(t) : wn(n)), (fn.set = S))
					: ((fn.get = n.get ? (a && !1 !== n.cache ? Tn(t) : wn(n.get)) : S),
					  (fn.set = n.set || S)),
					Object.defineProperty(e, t, fn);
			}
			function Tn(e) {
				return function () {
					var t = this._computedWatchers && this._computedWatchers[e];
					if (t)
						return t.dirty && t.evaluate(), ve.target && t.depend(), t.value;
				};
			}
			function wn(e) {
				return function () {
					return e.call(this, this);
				};
			}
			function _n(e, t, n, a) {
				return (
					p(n) && ((a = n), (n = n.handler)),
					"string" == typeof n && (n = e[n]),
					e.$watch(t, n, a)
				);
			}
			function Rn(e, t) {
				if (e) {
					for (
						var n = Object.create(null),
							a = se ? Reflect.ownKeys(e) : Object.keys(e),
							r = 0;
						r < a.length;
						r++
					) {
						var i = a[r];
						if ("__ob__" !== i) {
							var o = e[i].from;
							if (o in t._provided) n[i] = t._provided[o];
							else if ("default" in e[i]) {
								var u = e[i].default;
								n[i] = s(u) ? u.call(t) : u;
							}
						}
					}
					return n;
				}
			}
			var xn = 0;
			function kn(e) {
				var t = e.options;
				if (e.super) {
					var n = kn(e.super);
					if (n !== e.superOptions) {
						e.superOptions = n;
						var a = (function (e) {
							var t,
								n = e.options,
								a = e.sealedOptions;
							for (var r in n) n[r] !== a[r] && (t || (t = {}), (t[r] = n[r]));
							return t;
						})(e);
						a && E(e.extendOptions, a),
							(t = e.options = Bn(n, e.extendOptions)).name &&
								(t.components[t.name] = e);
					}
				}
				return t;
			}
			function Mn(n, a, r, o, s) {
				var u,
					l = this,
					p = s.options;
				T(o, "_uid")
					? ((u = Object.create(o))._original = o)
					: ((u = o), (o = o._original));
				var d = i(p._compiled),
					c = !d;
				(this.data = n),
					(this.props = a),
					(this.children = r),
					(this.parent = o),
					(this.listeners = n.on || e),
					(this.injections = Rn(p.inject, o)),
					(this.slots = function () {
						return (
							l.$slots || mt(o, n.scopedSlots, (l.$slots = dt(r, o))), l.$slots
						);
					}),
					Object.defineProperty(this, "scopedSlots", {
						enumerable: !0,
						get: function () {
							return mt(o, n.scopedSlots, this.slots());
						},
					}),
					d &&
						((this.$options = p),
						(this.$slots = this.slots()),
						(this.$scopedSlots = mt(o, n.scopedSlots, this.$slots))),
					p._scopeId
						? (this._c = function (e, n, a, r) {
								var i = Xe(u, e, n, a, r, c);
								return (
									i && !t(i) && ((i.fnScopeId = p._scopeId), (i.fnContext = o)),
									i
								);
						  })
						: (this._c = function (e, t, n, a) {
								return Xe(u, e, t, n, a, c);
						  });
			}
			function Cn(e, t, n, a, r) {
				var i = ye(e);
				return (
					(i.fnContext = n),
					(i.fnOptions = a),
					t.slot && ((i.data || (i.data = {})).slot = t.slot),
					i
				);
			}
			function An(e, t) {
				for (var n in t) e[R(n)] = t[n];
			}
			function En(e) {
				return e.name || e.__name || e._componentTag;
			}
			pt(Mn.prototype);
			var In = {
					init: function (e, t) {
						if (
							e.componentInstance &&
							!e.componentInstance._isDestroyed &&
							e.data.keepAlive
						) {
							var n = e;
							In.prepatch(n, n);
						} else
							(e.componentInstance = (function (e, t) {
								var n = { _isComponent: !0, _parentVnode: e, parent: t },
									a = e.data.inlineTemplate;
								return (
									r(a) &&
										((n.render = a.render),
										(n.staticRenderFns = a.staticRenderFns)),
									new e.componentOptions.Ctor(n)
								);
							})(e, At)).$mount(t ? e.elm : void 0, t);
					},
					prepatch: function (t, n) {
						var a = n.componentOptions;
						!(function (t, n, a, r, i) {
							var o = r.data.scopedSlots,
								s = t.$scopedSlots,
								u = !!(
									(o && !o.$stable) ||
									(s !== e && !s.$stable) ||
									(o && t.$scopedSlots.$key !== o.$key) ||
									(!o && t.$scopedSlots.$key)
								),
								l = !!(i || t.$options._renderChildren || u),
								p = t.$vnode;
							(t.$options._parentVnode = r),
								(t.$vnode = r),
								t._vnode && (t._vnode.parent = r),
								(t.$options._renderChildren = i);
							var d = r.data.attrs || e;
							t._attrsProxy &&
								vt(
									t._attrsProxy,
									d,
									(p.data && p.data.attrs) || e,
									t,
									"$attrs"
								) &&
								(l = !0),
								(t.$attrs = d),
								(a = a || e);
							var c = t.$options._parentListeners;
							if (
								(t._listenersProxy &&
									vt(t._listenersProxy, a, c || e, t, "$listeners"),
								(t.$listeners = t.$options._parentListeners = a),
								Ct(t, a, c),
								n && t.$options.props)
							) {
								Me(!1);
								for (
									var y = t._props, m = t.$options._propKeys || [], f = 0;
									f < m.length;
									f++
								) {
									var h = m[f],
										v = t.$options.props;
									y[h] = Wn(h, v, n, t);
								}
								Me(!0), (t.$options.propsData = n);
							}
							l && ((t.$slots = dt(i, r.context)), t.$forceUpdate());
						})(
							(n.componentInstance = t.componentInstance),
							a.propsData,
							a.listeners,
							n,
							a.children
						);
					},
					insert: function (e) {
						var t,
							n = e.context,
							a = e.componentInstance;
						a._isMounted || ((a._isMounted = !0), $t(a, "mounted")),
							e.data.keepAlive &&
								(n._isMounted
									? (((t = a)._inactive = !1), Dt.push(t))
									: St(a, !0));
					},
					destroy: function (e) {
						var t = e.componentInstance;
						t._isDestroyed || (e.data.keepAlive ? Ot(t, !0) : t.$destroy());
					},
				},
				Sn = Object.keys(In);
			function On(n, o, s, l, p) {
				if (!a(n)) {
					var d = s.$options._base;
					if ((u(n) && (n = d.extend(n)), "function" == typeof n)) {
						var y;
						if (
							a(n.cid) &&
							((n = (function (e, t) {
								if (i(e.error) && r(e.errorComp)) return e.errorComp;
								if (r(e.resolved)) return e.resolved;
								var n = wt;
								if (
									(n &&
										r(e.owners) &&
										-1 === e.owners.indexOf(n) &&
										e.owners.push(n),
									i(e.loading) && r(e.loadingComp))
								)
									return e.loadingComp;
								if (n && !r(e.owners)) {
									var o = (e.owners = [n]),
										s = !0,
										l = null,
										p = null;
									n.$on("hook:destroyed", function () {
										return b(o, n);
									});
									var d = function (e) {
											for (var t = 0, n = o.length; t < n; t++)
												o[t].$forceUpdate();
											e &&
												((o.length = 0),
												null !== l && (clearTimeout(l), (l = null)),
												null !== p && (clearTimeout(p), (p = null)));
										},
										y = P(function (n) {
											(e.resolved = _t(n, t)), s ? (o.length = 0) : d(!0);
										}),
										m = P(function (t) {
											r(e.errorComp) && ((e.error = !0), d(!0));
										}),
										f = e(y, m);
									return (
										u(f) &&
											(c(f)
												? a(e.resolved) && f.then(y, m)
												: c(f.component) &&
												  (f.component.then(y, m),
												  r(f.error) && (e.errorComp = _t(f.error, t)),
												  r(f.loading) &&
														((e.loadingComp = _t(f.loading, t)),
														0 === f.delay
															? (e.loading = !0)
															: (l = setTimeout(function () {
																	(l = null),
																		a(e.resolved) &&
																			a(e.error) &&
																			((e.loading = !0), d(!1));
															  }, f.delay || 200))),
												  r(f.timeout) &&
														(p = setTimeout(function () {
															(p = null), a(e.resolved) && m(null);
														}, f.timeout)))),
										(s = !1),
										e.loading ? e.loadingComp : e.resolved
									);
								}
							})((y = n), d)),
							void 0 === n)
						)
							return (function (e, t, n, a, r) {
								var i = de();
								return (
									(i.asyncFactory = e),
									(i.asyncMeta = { data: t, context: n, children: a, tag: r }),
									i
								);
							})(y, o, s, l, p);
						(o = o || {}),
							kn(n),
							r(o.model) &&
								(function (e, n) {
									var a = (e.model && e.model.prop) || "value",
										i = (e.model && e.model.event) || "input";
									(n.attrs || (n.attrs = {}))[a] = n.model.value;
									var o = n.on || (n.on = {}),
										s = o[i],
										u = n.model.callback;
									r(s)
										? (t(s) ? -1 === s.indexOf(u) : s !== u) &&
										  (o[i] = [u].concat(s))
										: (o[i] = u);
								})(n.options, o);
						var m = (function (e, t, n) {
							var i = t.options.props;
							if (!a(i)) {
								var o = {},
									s = e.attrs,
									u = e.props;
								if (r(s) || r(u))
									for (var l in i) {
										var p = M(l);
										qe(o, u, l, p, !0) || qe(o, s, l, p, !1);
									}
								return o;
							}
						})(o, n);
						if (i(n.options.functional))
							return (function (n, a, i, o, s) {
								var u = n.options,
									l = {},
									p = u.props;
								if (r(p)) for (var d in p) l[d] = Wn(d, p, a || e);
								else r(i.attrs) && An(l, i.attrs), r(i.props) && An(l, i.props);
								var c = new Mn(i, l, s, o, n),
									y = u.render.call(null, c._c, c);
								if (y instanceof pe) return Cn(y, i, c.parent, u);
								if (t(y)) {
									for (
										var m = We(y) || [], f = new Array(m.length), h = 0;
										h < m.length;
										h++
									)
										f[h] = Cn(m[h], i, c.parent, u);
									return f;
								}
							})(n, m, o, s, l);
						var f = o.on;
						if (((o.on = o.nativeOn), i(n.options.abstract))) {
							var h = o.slot;
							(o = {}), h && (o.slot = h);
						}
						!(function (e) {
							for (var t = e.hook || (e.hook = {}), n = 0; n < Sn.length; n++) {
								var a = Sn[n],
									r = t[a],
									i = In[a];
								r === i || (r && r._merged) || (t[a] = r ? $n(i, r) : i);
							}
						})(o);
						var v = En(n.options) || p;
						return new pe(
							"vue-component-".concat(n.cid).concat(v ? "-".concat(v) : ""),
							o,
							void 0,
							void 0,
							void 0,
							s,
							{ Ctor: n, propsData: m, listeners: f, tag: p, children: l },
							y
						);
					}
				}
			}
			function $n(e, t) {
				var n = function (n, a) {
					e(n, a), t(n, a);
				};
				return (n._merged = !0), n;
			}
			var Fn = S,
				Dn = L.optionMergeStrategies;
			function Pn(e, t, n) {
				if ((void 0 === n && (n = !0), !t)) return e;
				for (
					var a, r, i, o = se ? Reflect.ownKeys(t) : Object.keys(t), s = 0;
					s < o.length;
					s++
				)
					"__ob__" !== (a = o[s]) &&
						((r = e[a]),
						(i = t[a]),
						n && T(e, a) ? r !== i && p(r) && p(i) && Pn(r, i) : Se(e, a, i));
				return e;
			}
			function jn(e, t, n) {
				return n
					? function () {
							var a = s(t) ? t.call(n, n) : t,
								r = s(e) ? e.call(n, n) : e;
							return a ? Pn(a, r) : r;
					  }
					: t
					? e
						? function () {
								return Pn(
									s(t) ? t.call(this, this) : t,
									s(e) ? e.call(this, this) : e
								);
						  }
						: t
					: e;
			}
			function Nn(e, n) {
				var a = n ? (e ? e.concat(n) : t(n) ? n : [n]) : e;
				return a
					? (function (e) {
							for (var t = [], n = 0; n < e.length; n++)
								-1 === t.indexOf(e[n]) && t.push(e[n]);
							return t;
					  })(a)
					: a;
			}
			function Un(e, t, n, a) {
				var r = Object.create(e || null);
				return t ? E(r, t) : r;
			}
			(Dn.data = function (e, t, n) {
				return n ? jn(e, t, n) : t && "function" != typeof t ? e : jn(e, t);
			}),
				U.forEach(function (e) {
					Dn[e] = Nn;
				}),
				N.forEach(function (e) {
					Dn[e + "s"] = Un;
				}),
				(Dn.watch = function (e, n, a, r) {
					if ((e === ee && (e = void 0), n === ee && (n = void 0), !n))
						return Object.create(e || null);
					if (!e) return n;
					var i = {};
					for (var o in (E(i, e), n)) {
						var s = i[o],
							u = n[o];
						s && !t(s) && (s = [s]), (i[o] = s ? s.concat(u) : t(u) ? u : [u]);
					}
					return i;
				}),
				(Dn.props =
					Dn.methods =
					Dn.inject =
					Dn.computed =
						function (e, t, n, a) {
							if (!e) return t;
							var r = Object.create(null);
							return E(r, e), t && E(r, t), r;
						}),
				(Dn.provide = function (e, t) {
					return e
						? function () {
								var n = Object.create(null);
								return (
									Pn(n, s(e) ? e.call(this) : e),
									t && Pn(n, s(t) ? t.call(this) : t, !1),
									n
								);
						  }
						: t;
				});
			var Ln = function (e, t) {
				return void 0 === t ? e : t;
			};
			function Bn(e, n, a) {
				if (
					(s(n) && (n = n.options),
					(function (e, n) {
						var a = e.props;
						if (a) {
							var r,
								i,
								o = {};
							if (t(a))
								for (r = a.length; r--; )
									"string" == typeof (i = a[r]) && (o[R(i)] = { type: null });
							else if (p(a))
								for (var s in a) (i = a[s]), (o[R(s)] = p(i) ? i : { type: i });
							e.props = o;
						}
					})(n),
					(function (e, n) {
						var a = e.inject;
						if (a) {
							var r = (e.inject = {});
							if (t(a))
								for (var i = 0; i < a.length; i++) r[a[i]] = { from: a[i] };
							else if (p(a))
								for (var o in a) {
									var s = a[o];
									r[o] = p(s) ? E({ from: o }, s) : { from: s };
								}
						}
					})(n),
					(function (e) {
						var t = e.directives;
						if (t)
							for (var n in t) {
								var a = t[n];
								s(a) && (t[n] = { bind: a, update: a });
							}
					})(n),
					!n._base && (n.extends && (e = Bn(e, n.extends, a)), n.mixins))
				)
					for (var r = 0, i = n.mixins.length; r < i; r++)
						e = Bn(e, n.mixins[r], a);
				var o,
					u = {};
				for (o in e) l(o);
				for (o in n) T(e, o) || l(o);
				function l(t) {
					var r = Dn[t] || Ln;
					u[t] = r(e[t], n[t], a, t);
				}
				return u;
			}
			function qn(e, t, n, a) {
				if ("string" == typeof n) {
					var r = e[t];
					if (T(r, n)) return r[n];
					var i = R(n);
					if (T(r, i)) return r[i];
					var o = x(i);
					return T(r, o) ? r[o] : r[n] || r[i] || r[o];
				}
			}
			function Wn(e, t, n, a) {
				var r = t[e],
					i = !T(n, e),
					o = n[e],
					u = Hn(Boolean, r.type);
				if (u > -1)
					if (i && !T(r, "default")) o = !1;
					else if ("" === o || o === M(e)) {
						var l = Hn(String, r.type);
						(l < 0 || u < l) && (o = !0);
					}
				if (void 0 === o) {
					o = (function (e, t, n) {
						if (T(t, "default")) {
							var a = t.default;
							return e &&
								e.$options.propsData &&
								void 0 === e.$options.propsData[n] &&
								void 0 !== e._props[n]
								? e._props[n]
								: s(a) && "Function" !== Vn(t.type)
								? a.call(e)
								: a;
						}
					})(a, r, e);
					var p = ke;
					Me(!0), Ee(o), Me(p);
				}
				return o;
			}
			var zn = /^\s*function (\w+)/;
			function Vn(e) {
				var t = e && e.toString().match(zn);
				return t ? t[1] : "";
			}
			function Gn(e, t) {
				return Vn(e) === Vn(t);
			}
			function Hn(e, n) {
				if (!t(n)) return Gn(n, e) ? 0 : -1;
				for (var a = 0, r = n.length; a < r; a++) if (Gn(n[a], e)) return a;
				return -1;
			}
			function Xn(e) {
				this._init(e);
			}
			function Kn(e) {
				return e && (En(e.Ctor.options) || e.tag);
			}
			function Jn(e, n) {
				return t(e)
					? e.indexOf(n) > -1
					: "string" == typeof e
					? e.split(",").indexOf(n) > -1
					: ((a = e), !("[object RegExp]" !== l.call(a)) && e.test(n));
				var a;
			}
			function Zn(e, t) {
				var n = e.cache,
					a = e.keys,
					r = e._vnode;
				for (var i in n) {
					var o = n[i];
					if (o) {
						var s = o.name;
						s && !t(s) && Yn(n, i, a, r);
					}
				}
			}
			function Yn(e, t, n, a) {
				var r = e[t];
				!r || (a && r.tag === a.tag) || r.componentInstance.$destroy(),
					(e[t] = null),
					b(n, t);
			}
			!(function (t) {
				t.prototype._init = function (t) {
					var n = this;
					(n._uid = xn++),
						(n._isVue = !0),
						(n.__v_skip = !0),
						(n._scope = new Ht(!0)),
						(n._scope._vm = !0),
						t && t._isComponent
							? (function (e, t) {
									var n = (e.$options = Object.create(e.constructor.options)),
										a = t._parentVnode;
									(n.parent = t.parent), (n._parentVnode = a);
									var r = a.componentOptions;
									(n.propsData = r.propsData),
										(n._parentListeners = r.listeners),
										(n._renderChildren = r.children),
										(n._componentTag = r.tag),
										t.render &&
											((n.render = t.render),
											(n.staticRenderFns = t.staticRenderFns));
							  })(n, t)
							: (n.$options = Bn(kn(n.constructor), t || {}, n)),
						(n._renderProxy = n),
						(n._self = n),
						(function (e) {
							var t = e.$options,
								n = t.parent;
							if (n && !t.abstract) {
								for (; n.$options.abstract && n.$parent; ) n = n.$parent;
								n.$children.push(e);
							}
							(e.$parent = n),
								(e.$root = n ? n.$root : e),
								(e.$children = []),
								(e.$refs = {}),
								(e._provided = n ? n._provided : Object.create(null)),
								(e._watcher = null),
								(e._inactive = null),
								(e._directInactive = !1),
								(e._isMounted = !1),
								(e._isDestroyed = !1),
								(e._isBeingDestroyed = !1);
						})(n),
						(function (e) {
							(e._events = Object.create(null)), (e._hasHookEvent = !1);
							var t = e.$options._parentListeners;
							t && Ct(e, t);
						})(n),
						(function (t) {
							(t._vnode = null), (t._staticTrees = null);
							var n = t.$options,
								a = (t.$vnode = n._parentVnode),
								r = a && a.context;
							(t.$slots = dt(n._renderChildren, r)),
								(t.$scopedSlots = a
									? mt(t.$parent, a.data.scopedSlots, t.$slots)
									: e),
								(t._c = function (e, n, a, r) {
									return Xe(t, e, n, a, r, !1);
								}),
								(t.$createElement = function (e, n, a, r) {
									return Xe(t, e, n, a, r, !0);
								});
							var i = a && a.data;
							Ie(t, "$attrs", (i && i.attrs) || e, null, !0),
								Ie(t, "$listeners", n._parentListeners || e, null, !0);
						})(n),
						$t(n, "beforeCreate", void 0, !1),
						(function (e) {
							var t = Rn(e.$options.inject, e);
							t &&
								(Me(!1),
								Object.keys(t).forEach(function (n) {
									Ie(e, n, t[n]);
								}),
								Me(!0));
						})(n),
						vn(n),
						(function (e) {
							var t = e.$options.provide;
							if (t) {
								var n = s(t) ? t.call(e) : t;
								if (!u(n)) return;
								for (
									var a = (function (e) {
											var t = e._provided,
												n = e.$parent && e.$parent._provided;
											return n === t ? (e._provided = Object.create(n)) : t;
										})(e),
										r = se ? Reflect.ownKeys(n) : Object.keys(n),
										i = 0;
									i < r.length;
									i++
								) {
									var o = r[i];
									Object.defineProperty(
										a,
										o,
										Object.getOwnPropertyDescriptor(n, o)
									);
								}
							}
						})(n),
						$t(n, "created"),
						n.$options.el && n.$mount(n.$options.el);
				};
			})(Xn),
				(function (e) {
					Object.defineProperty(e.prototype, "$data", {
						get: function () {
							return this._data;
						},
					}),
						Object.defineProperty(e.prototype, "$props", {
							get: function () {
								return this._props;
							},
						}),
						(e.prototype.$set = Se),
						(e.prototype.$delete = Oe),
						(e.prototype.$watch = function (e, t, n) {
							var a = this;
							if (p(t)) return _n(a, e, t, n);
							(n = n || {}).user = !0;
							var r = new mn(a, e, t, n);
							if (n.immediate) {
								var i = 'callback for immediate watcher "'.concat(
									r.expression,
									'"'
								);
								ge(), Kt(t, a, [r.value], a, i), Te();
							}
							return function () {
								r.teardown();
							};
						});
				})(Xn),
				(function (e) {
					var n = /^hook:/;
					(e.prototype.$on = function (e, a) {
						var r = this;
						if (t(e)) for (var i = 0, o = e.length; i < o; i++) r.$on(e[i], a);
						else
							(r._events[e] || (r._events[e] = [])).push(a),
								n.test(e) && (r._hasHookEvent = !0);
						return r;
					}),
						(e.prototype.$once = function (e, t) {
							var n = this;
							function a() {
								n.$off(e, a), t.apply(n, arguments);
							}
							return (a.fn = t), n.$on(e, a), n;
						}),
						(e.prototype.$off = function (e, n) {
							var a = this;
							if (!arguments.length)
								return (a._events = Object.create(null)), a;
							if (t(e)) {
								for (var r = 0, i = e.length; r < i; r++) a.$off(e[r], n);
								return a;
							}
							var o,
								s = a._events[e];
							if (!s) return a;
							if (!n) return (a._events[e] = null), a;
							for (var u = s.length; u--; )
								if ((o = s[u]) === n || o.fn === n) {
									s.splice(u, 1);
									break;
								}
							return a;
						}),
						(e.prototype.$emit = function (e) {
							var t = this,
								n = t._events[e];
							if (n) {
								n = n.length > 1 ? A(n) : n;
								for (
									var a = A(arguments, 1),
										r = 'event handler for "'.concat(e, '"'),
										i = 0,
										o = n.length;
									i < o;
									i++
								)
									Kt(n[i], t, a, t, r);
							}
							return t;
						});
				})(Xn),
				(function (e) {
					(e.prototype._update = function (e, t) {
						var n = this,
							a = n.$el,
							r = n._vnode,
							i = Et(n);
						(n._vnode = e),
							(n.$el = r ? n.__patch__(r, e) : n.__patch__(n.$el, e, t, !1)),
							i(),
							a && (a.__vue__ = null),
							n.$el && (n.$el.__vue__ = n);
						for (
							var o = n;
							o && o.$vnode && o.$parent && o.$vnode === o.$parent._vnode;

						)
							(o.$parent.$el = o.$el), (o = o.$parent);
					}),
						(e.prototype.$forceUpdate = function () {
							this._watcher && this._watcher.update();
						}),
						(e.prototype.$destroy = function () {
							var e = this;
							if (!e._isBeingDestroyed) {
								$t(e, "beforeDestroy"), (e._isBeingDestroyed = !0);
								var t = e.$parent;
								!t ||
									t._isBeingDestroyed ||
									e.$options.abstract ||
									b(t.$children, e),
									e._scope.stop(),
									e._data.__ob__ && e._data.__ob__.vmCount--,
									(e._isDestroyed = !0),
									e.__patch__(e._vnode, null),
									$t(e, "destroyed"),
									e.$off(),
									e.$el && (e.$el.__vue__ = null),
									e.$vnode && (e.$vnode.parent = null);
							}
						});
				})(Xn),
				(function (e) {
					pt(e.prototype),
						(e.prototype.$nextTick = function (e) {
							return un(e, this);
						}),
						(e.prototype._render = function () {
							var e,
								n = this,
								a = n.$options,
								r = a.render,
								i = a._parentVnode;
							i &&
								n._isMounted &&
								((n.$scopedSlots = mt(
									n.$parent,
									i.data.scopedSlots,
									n.$slots,
									n.$scopedSlots
								)),
								n._slotsProxy && gt(n._slotsProxy, n.$scopedSlots)),
								(n.$vnode = i);
							try {
								le(n), (wt = n), (e = r.call(n._renderProxy, n.$createElement));
							} catch (t) {
								Xt(t, n, "render"), (e = n._vnode);
							} finally {
								(wt = null), le();
							}
							return (
								t(e) && 1 === e.length && (e = e[0]),
								e instanceof pe || (e = de()),
								(e.parent = i),
								e
							);
						});
				})(Xn);
			var Qn = [String, RegExp, Array],
				ea = {
					KeepAlive: {
						name: "keep-alive",
						abstract: !0,
						props: { include: Qn, exclude: Qn, max: [String, Number] },
						methods: {
							cacheVNode: function () {
								var e = this,
									t = e.cache,
									n = e.keys,
									a = e.vnodeToCache,
									r = e.keyToCache;
								if (a) {
									var i = a.tag,
										o = a.componentInstance,
										s = a.componentOptions;
									(t[r] = { name: Kn(s), tag: i, componentInstance: o }),
										n.push(r),
										this.max &&
											n.length > parseInt(this.max) &&
											Yn(t, n[0], n, this._vnode),
										(this.vnodeToCache = null);
								}
							},
						},
						created: function () {
							(this.cache = Object.create(null)), (this.keys = []);
						},
						destroyed: function () {
							for (var e in this.cache) Yn(this.cache, e, this.keys);
						},
						mounted: function () {
							var e = this;
							this.cacheVNode(),
								this.$watch("include", function (t) {
									Zn(e, function (e) {
										return Jn(t, e);
									});
								}),
								this.$watch("exclude", function (t) {
									Zn(e, function (e) {
										return !Jn(t, e);
									});
								});
						},
						updated: function () {
							this.cacheVNode();
						},
						render: function () {
							var e = this.$slots.default,
								t = Rt(e),
								n = t && t.componentOptions;
							if (n) {
								var a = Kn(n),
									r = this.include,
									i = this.exclude;
								if ((r && (!a || !Jn(r, a))) || (i && a && Jn(i, a))) return t;
								var o = this.cache,
									s = this.keys,
									u =
										null == t.key
											? n.Ctor.cid + (n.tag ? "::".concat(n.tag) : "")
											: t.key;
								o[u]
									? ((t.componentInstance = o[u].componentInstance),
									  b(s, u),
									  s.push(u))
									: ((this.vnodeToCache = t), (this.keyToCache = u)),
									(t.data.keepAlive = !0);
							}
							return t || (e && e[0]);
						},
					},
				};
			!(function (e) {
				var t = {
					get: function () {
						return L;
					},
				};
				Object.defineProperty(e, "config", t),
					(e.util = {
						warn: Fn,
						extend: E,
						mergeOptions: Bn,
						defineReactive: Ie,
					}),
					(e.set = Se),
					(e.delete = Oe),
					(e.nextTick = un),
					(e.observable = function (e) {
						return Ee(e), e;
					}),
					(e.options = Object.create(null)),
					N.forEach(function (t) {
						e.options[t + "s"] = Object.create(null);
					}),
					(e.options._base = e),
					E(e.options.components, ea),
					(function (e) {
						e.use = function (e) {
							var t = this._installedPlugins || (this._installedPlugins = []);
							if (t.indexOf(e) > -1) return this;
							var n = A(arguments, 1);
							return (
								n.unshift(this),
								s(e.install) ? e.install.apply(e, n) : s(e) && e.apply(null, n),
								t.push(e),
								this
							);
						};
					})(e),
					(function (e) {
						e.mixin = function (e) {
							return (this.options = Bn(this.options, e)), this;
						};
					})(e),
					(function (e) {
						e.cid = 0;
						var t = 1;
						e.extend = function (e) {
							e = e || {};
							var n = this,
								a = n.cid,
								r = e._Ctor || (e._Ctor = {});
							if (r[a]) return r[a];
							var i = En(e) || En(n.options),
								o = function (e) {
									this._init(e);
								};
							return (
								((o.prototype = Object.create(n.prototype)).constructor = o),
								(o.cid = t++),
								(o.options = Bn(n.options, e)),
								(o.super = n),
								o.options.props &&
									(function (e) {
										var t = e.options.props;
										for (var n in t) hn(e.prototype, "_props", n);
									})(o),
								o.options.computed &&
									(function (e) {
										var t = e.options.computed;
										for (var n in t) gn(e.prototype, n, t[n]);
									})(o),
								(o.extend = n.extend),
								(o.mixin = n.mixin),
								(o.use = n.use),
								N.forEach(function (e) {
									o[e] = n[e];
								}),
								i && (o.options.components[i] = o),
								(o.superOptions = n.options),
								(o.extendOptions = e),
								(o.sealedOptions = E({}, o.options)),
								(r[a] = o),
								o
							);
						};
					})(e),
					(function (e) {
						N.forEach(function (t) {
							e[t] = function (e, n) {
								return n
									? ("component" === t &&
											p(n) &&
											((n.name = n.name || e),
											(n = this.options._base.extend(n))),
									  "directive" === t && s(n) && (n = { bind: n, update: n }),
									  (this.options[t + "s"][e] = n),
									  n)
									: this.options[t + "s"][e];
							};
						});
					})(e);
			})(Xn),
				Object.defineProperty(Xn.prototype, "$isServer", { get: ae }),
				Object.defineProperty(Xn.prototype, "$ssrContext", {
					get: function () {
						return this.$vnode && this.$vnode.ssrContext;
					},
				}),
				Object.defineProperty(Xn, "FunctionalRenderContext", { value: Mn }),
				(Xn.version = "2.7.14");
			var ta = f("style,class"),
				na = f("input,textarea,option,select,progress"),
				aa = function (e, t, n) {
					return (
						("value" === n && na(e) && "button" !== t) ||
						("selected" === n && "option" === e) ||
						("checked" === n && "input" === e) ||
						("muted" === n && "video" === e)
					);
				},
				ra = f("contenteditable,draggable,spellcheck"),
				ia = f("events,caret,typing,plaintext-only"),
				oa = function (e, t) {
					return da(t) || "false" === t
						? "false"
						: "contenteditable" === e && ia(t)
						? t
						: "true";
				},
				sa = f(
					"allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"
				),
				ua = "http://www.w3.org/1999/xlink",
				la = function (e) {
					return ":" === e.charAt(5) && "xlink" === e.slice(0, 5);
				},
				pa = function (e) {
					return la(e) ? e.slice(6, e.length) : "";
				},
				da = function (e) {
					return null == e || !1 === e;
				};
			function ca(e, t) {
				return {
					staticClass: ya(e.staticClass, t.staticClass),
					class: r(e.class) ? [e.class, t.class] : t.class,
				};
			}
			function ya(e, t) {
				return e ? (t ? e + " " + t : e) : t || "";
			}
			function ma(e) {
				return Array.isArray(e)
					? (function (e) {
							for (var t, n = "", a = 0, i = e.length; a < i; a++)
								r((t = ma(e[a]))) && "" !== t && (n && (n += " "), (n += t));
							return n;
					  })(e)
					: u(e)
					? (function (e) {
							var t = "";
							for (var n in e) e[n] && (t && (t += " "), (t += n));
							return t;
					  })(e)
					: "string" == typeof e
					? e
					: "";
			}
			var fa = {
					svg: "http://www.w3.org/2000/svg",
					math: "http://www.w3.org/1998/Math/MathML",
				},
				ha = f(
					"html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"
				),
				va = f(
					"svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",
					!0
				),
				ba = function (e) {
					return ha(e) || va(e);
				};
			function ga(e) {
				return va(e) ? "svg" : "math" === e ? "math" : void 0;
			}
			var Ta = Object.create(null),
				wa = f("text,number,password,search,email,tel,url");
			function _a(e) {
				return "string" == typeof e
					? document.querySelector(e) || document.createElement("div")
					: e;
			}
			var Ra = Object.freeze({
					__proto__: null,
					createElement: function (e, t) {
						var n = document.createElement(e);
						return (
							"select" !== e ||
								(t.data &&
									t.data.attrs &&
									void 0 !== t.data.attrs.multiple &&
									n.setAttribute("multiple", "multiple")),
							n
						);
					},
					createElementNS: function (e, t) {
						return document.createElementNS(fa[e], t);
					},
					createTextNode: function (e) {
						return document.createTextNode(e);
					},
					createComment: function (e) {
						return document.createComment(e);
					},
					insertBefore: function (e, t, n) {
						e.insertBefore(t, n);
					},
					removeChild: function (e, t) {
						e.removeChild(t);
					},
					appendChild: function (e, t) {
						e.appendChild(t);
					},
					parentNode: function (e) {
						return e.parentNode;
					},
					nextSibling: function (e) {
						return e.nextSibling;
					},
					tagName: function (e) {
						return e.tagName;
					},
					setTextContent: function (e, t) {
						e.textContent = t;
					},
					setStyleScope: function (e, t) {
						e.setAttribute(t, "");
					},
				}),
				xa = {
					create: function (e, t) {
						ka(t);
					},
					update: function (e, t) {
						e.data.ref !== t.data.ref && (ka(e, !0), ka(t));
					},
					destroy: function (e) {
						ka(e, !0);
					},
				};
			function ka(e, n) {
				var a = e.data.ref;
				if (r(a)) {
					var i = e.context,
						o = e.componentInstance || e.elm,
						u = n ? null : o,
						l = n ? void 0 : o;
					if (s(a)) Kt(a, i, [u], i, "template ref function");
					else {
						var p = e.data.refInFor,
							d = "string" == typeof a || "number" == typeof a,
							c = Pe(a),
							y = i.$refs;
						if (d || c)
							if (p) {
								var m = d ? y[a] : a.value;
								n
									? t(m) && b(m, o)
									: t(m)
									? m.includes(o) || m.push(o)
									: d
									? ((y[a] = [o]), Ma(i, a, y[a]))
									: (a.value = [o]);
							} else if (d) {
								if (n && y[a] !== o) return;
								(y[a] = l), Ma(i, a, u);
							} else if (c) {
								if (n && a.value !== o) return;
								a.value = u;
							}
					}
				}
			}
			function Ma(e, t, n) {
				var a = e._setupState;
				a && T(a, t) && (Pe(a[t]) ? (a[t].value = n) : (a[t] = n));
			}
			var Ca = new pe("", {}, []),
				Aa = ["create", "activate", "update", "remove", "destroy"];
			function Ea(e, t) {
				return (
					e.key === t.key &&
					e.asyncFactory === t.asyncFactory &&
					((e.tag === t.tag &&
						e.isComment === t.isComment &&
						r(e.data) === r(t.data) &&
						(function (e, t) {
							if ("input" !== e.tag) return !0;
							var n,
								a = r((n = e.data)) && r((n = n.attrs)) && n.type,
								i = r((n = t.data)) && r((n = n.attrs)) && n.type;
							return a === i || (wa(a) && wa(i));
						})(e, t)) ||
						(i(e.isAsyncPlaceholder) && a(t.asyncFactory.error)))
				);
			}
			function Ia(e, t, n) {
				var a,
					i,
					o = {};
				for (a = t; a <= n; ++a) r((i = e[a].key)) && (o[i] = a);
				return o;
			}
			var Sa = {
				create: Oa,
				update: Oa,
				destroy: function (e) {
					Oa(e, Ca);
				},
			};
			function Oa(e, t) {
				(e.data.directives || t.data.directives) &&
					(function (e, t) {
						var n,
							a,
							r,
							i = e === Ca,
							o = t === Ca,
							s = Fa(e.data.directives, e.context),
							u = Fa(t.data.directives, t.context),
							l = [],
							p = [];
						for (n in u)
							(a = s[n]),
								(r = u[n]),
								a
									? ((r.oldValue = a.value),
									  (r.oldArg = a.arg),
									  Pa(r, "update", t, e),
									  r.def && r.def.componentUpdated && p.push(r))
									: (Pa(r, "bind", t, e), r.def && r.def.inserted && l.push(r));
						if (l.length) {
							var d = function () {
								for (var n = 0; n < l.length; n++) Pa(l[n], "inserted", t, e);
							};
							i ? Be(t, "insert", d) : d();
						}
						if (
							(p.length &&
								Be(t, "postpatch", function () {
									for (var n = 0; n < p.length; n++)
										Pa(p[n], "componentUpdated", t, e);
								}),
							!i)
						)
							for (n in s) u[n] || Pa(s[n], "unbind", e, e, o);
					})(e, t);
			}
			var $a = Object.create(null);
			function Fa(e, t) {
				var n,
					a,
					r = Object.create(null);
				if (!e) return r;
				for (n = 0; n < e.length; n++) {
					if (
						((a = e[n]).modifiers || (a.modifiers = $a),
						(r[Da(a)] = a),
						t._setupState && t._setupState.__sfc)
					) {
						var i = a.def || qn(t, "_setupState", "v-" + a.name);
						a.def = "function" == typeof i ? { bind: i, update: i } : i;
					}
					a.def = a.def || qn(t.$options, "directives", a.name);
				}
				return r;
			}
			function Da(e) {
				return (
					e.rawName ||
					""
						.concat(e.name, ".")
						.concat(Object.keys(e.modifiers || {}).join("."))
				);
			}
			function Pa(e, t, n, a, r) {
				var i = e.def && e.def[t];
				if (i)
					try {
						i(n.elm, e, n, a, r);
					} catch (a) {
						Xt(
							a,
							n.context,
							"directive ".concat(e.name, " ").concat(t, " hook")
						);
					}
			}
			var ja = [xa, Sa];
			function Na(e, t) {
				var n = t.componentOptions;
				if (
					!(
						(r(n) && !1 === n.Ctor.options.inheritAttrs) ||
						(a(e.data.attrs) && a(t.data.attrs))
					)
				) {
					var o,
						s,
						u = t.elm,
						l = e.data.attrs || {},
						p = t.data.attrs || {};
					for (o in ((r(p.__ob__) || i(p._v_attr_proxy)) &&
						(p = t.data.attrs = E({}, p)),
					p))
						(s = p[o]), l[o] !== s && Ua(u, o, s, t.data.pre);
					for (o in ((X || J) && p.value !== l.value && Ua(u, "value", p.value),
					l))
						a(p[o]) &&
							(la(o)
								? u.removeAttributeNS(ua, pa(o))
								: ra(o) || u.removeAttribute(o));
				}
			}
			function Ua(e, t, n, a) {
				a || e.tagName.indexOf("-") > -1
					? La(e, t, n)
					: sa(t)
					? da(n)
						? e.removeAttribute(t)
						: ((n =
								"allowfullscreen" === t && "EMBED" === e.tagName ? "true" : t),
						  e.setAttribute(t, n))
					: ra(t)
					? e.setAttribute(t, oa(t, n))
					: la(t)
					? da(n)
						? e.removeAttributeNS(ua, pa(t))
						: e.setAttributeNS(ua, t, n)
					: La(e, t, n);
			}
			function La(e, t, n) {
				if (da(n)) e.removeAttribute(t);
				else {
					if (
						X &&
						!K &&
						"TEXTAREA" === e.tagName &&
						"placeholder" === t &&
						"" !== n &&
						!e.__ieph
					) {
						var a = function (t) {
							t.stopImmediatePropagation(), e.removeEventListener("input", a);
						};
						e.addEventListener("input", a), (e.__ieph = !0);
					}
					e.setAttribute(t, n);
				}
			}
			var Ba = { create: Na, update: Na };
			function qa(e, t) {
				var n = t.elm,
					i = t.data,
					o = e.data;
				if (
					!(
						a(i.staticClass) &&
						a(i.class) &&
						(a(o) || (a(o.staticClass) && a(o.class)))
					)
				) {
					var s = (function (e) {
							for (var t = e.data, n = e, a = e; r(a.componentInstance); )
								(a = a.componentInstance._vnode) &&
									a.data &&
									(t = ca(a.data, t));
							for (; r((n = n.parent)); ) n && n.data && (t = ca(t, n.data));
							return (
								(i = t.staticClass),
								(o = t.class),
								r(i) || r(o) ? ya(i, ma(o)) : ""
							);
							var i, o;
						})(t),
						u = n._transitionClasses;
					r(u) && (s = ya(s, ma(u))),
						s !== n._prevClass &&
							(n.setAttribute("class", s), (n._prevClass = s));
				}
			}
			var Wa,
				za,
				Va,
				Ga,
				Ha,
				Xa,
				Ka = { create: qa, update: qa },
				Ja = /[\w).+\-_$\]]/;
			function Za(e) {
				var t,
					n,
					a,
					r,
					i,
					o = !1,
					s = !1,
					u = !1,
					l = !1,
					p = 0,
					d = 0,
					c = 0,
					y = 0;
				for (a = 0; a < e.length; a++)
					if (((n = t), (t = e.charCodeAt(a)), o))
						39 === t && 92 !== n && (o = !1);
					else if (s) 34 === t && 92 !== n && (s = !1);
					else if (u) 96 === t && 92 !== n && (u = !1);
					else if (l) 47 === t && 92 !== n && (l = !1);
					else if (
						124 !== t ||
						124 === e.charCodeAt(a + 1) ||
						124 === e.charCodeAt(a - 1) ||
						p ||
						d ||
						c
					) {
						switch (t) {
							case 34:
								s = !0;
								break;
							case 39:
								o = !0;
								break;
							case 96:
								u = !0;
								break;
							case 40:
								c++;
								break;
							case 41:
								c--;
								break;
							case 91:
								d++;
								break;
							case 93:
								d--;
								break;
							case 123:
								p++;
								break;
							case 125:
								p--;
						}
						if (47 === t) {
							for (
								var m = a - 1, f = void 0;
								m >= 0 && " " === (f = e.charAt(m));
								m--
							);
							(f && Ja.test(f)) || (l = !0);
						}
					} else void 0 === r ? ((y = a + 1), (r = e.slice(0, a).trim())) : h();
				function h() {
					(i || (i = [])).push(e.slice(y, a).trim()), (y = a + 1);
				}
				if ((void 0 === r ? (r = e.slice(0, a).trim()) : 0 !== y && h(), i))
					for (a = 0; a < i.length; a++) r = Ya(r, i[a]);
				return r;
			}
			function Ya(e, t) {
				var n = t.indexOf("(");
				if (n < 0) return '_f("'.concat(t, '")(').concat(e, ")");
				var a = t.slice(0, n),
					r = t.slice(n + 1);
				return '_f("'
					.concat(a, '")(')
					.concat(e)
					.concat(")" !== r ? "," + r : r);
			}
			function Qa(e, t) {
				console.error("[Vue compiler]: ".concat(e));
			}
			function er(e, t) {
				return e
					? e
							.map(function (e) {
								return e[t];
							})
							.filter(function (e) {
								return e;
							})
					: [];
			}
			function tr(e, t, n, a, r) {
				(e.props || (e.props = [])).push(
					pr({ name: t, value: n, dynamic: r }, a)
				),
					(e.plain = !1);
			}
			function nr(e, t, n, a, r) {
				(r
					? e.dynamicAttrs || (e.dynamicAttrs = [])
					: e.attrs || (e.attrs = [])
				).push(pr({ name: t, value: n, dynamic: r }, a)),
					(e.plain = !1);
			}
			function ar(e, t, n, a) {
				(e.attrsMap[t] = n), e.attrsList.push(pr({ name: t, value: n }, a));
			}
			function rr(e, t, n, a, r, i, o, s) {
				(e.directives || (e.directives = [])).push(
					pr(
						{
							name: t,
							rawName: n,
							value: a,
							arg: r,
							isDynamicArg: i,
							modifiers: o,
						},
						s
					)
				),
					(e.plain = !1);
			}
			function ir(e, t, n) {
				return n ? "_p(".concat(t, ',"').concat(e, '")') : e + t;
			}
			function or(t, n, a, r, i, o, s, u) {
				var l;
				(r = r || e).right
					? u
						? (n = "(".concat(n, ")==='click'?'contextmenu':(").concat(n, ")"))
						: "click" === n && ((n = "contextmenu"), delete r.right)
					: r.middle &&
					  (u
							? (n = "(".concat(n, ")==='click'?'mouseup':(").concat(n, ")"))
							: "click" === n && (n = "mouseup")),
					r.capture && (delete r.capture, (n = ir("!", n, u))),
					r.once && (delete r.once, (n = ir("~", n, u))),
					r.passive && (delete r.passive, (n = ir("&", n, u))),
					r.native
						? (delete r.native, (l = t.nativeEvents || (t.nativeEvents = {})))
						: (l = t.events || (t.events = {}));
				var p = pr({ value: a.trim(), dynamic: u }, s);
				r !== e && (p.modifiers = r);
				var d = l[n];
				Array.isArray(d)
					? i
						? d.unshift(p)
						: d.push(p)
					: (l[n] = d ? (i ? [p, d] : [d, p]) : p),
					(t.plain = !1);
			}
			function sr(e, t, n) {
				var a = ur(e, ":" + t) || ur(e, "v-bind:" + t);
				if (null != a) return Za(a);
				if (!1 !== n) {
					var r = ur(e, t);
					if (null != r) return JSON.stringify(r);
				}
			}
			function ur(e, t, n) {
				var a;
				if (null != (a = e.attrsMap[t]))
					for (var r = e.attrsList, i = 0, o = r.length; i < o; i++)
						if (r[i].name === t) {
							r.splice(i, 1);
							break;
						}
				return n && delete e.attrsMap[t], a;
			}
			function lr(e, t) {
				for (var n = e.attrsList, a = 0, r = n.length; a < r; a++) {
					var i = n[a];
					if (t.test(i.name)) return n.splice(a, 1), i;
				}
			}
			function pr(e, t) {
				return (
					t &&
						(null != t.start && (e.start = t.start),
						null != t.end && (e.end = t.end)),
					e
				);
			}
			function dr(e, t, n) {
				var a = n || {},
					r = a.number,
					i = "$$v",
					o = i;
				a.trim &&
					(o =
						"(typeof ".concat(i, " === 'string'") +
						"? ".concat(i, ".trim()") +
						": ".concat(i, ")")),
					r && (o = "_n(".concat(o, ")"));
				var s = cr(t, o);
				e.model = {
					value: "(".concat(t, ")"),
					expression: JSON.stringify(t),
					callback: "function (".concat(i, ") {").concat(s, "}"),
				};
			}
			function cr(e, t) {
				var n = (function (e) {
					if (
						((e = e.trim()),
						(Wa = e.length),
						e.indexOf("[") < 0 || e.lastIndexOf("]") < Wa - 1)
					)
						return (Ga = e.lastIndexOf(".")) > -1
							? { exp: e.slice(0, Ga), key: '"' + e.slice(Ga + 1) + '"' }
							: { exp: e, key: null };
					for (za = e, Ga = Ha = Xa = 0; !mr(); )
						fr((Va = yr())) ? vr(Va) : 91 === Va && hr(Va);
					return { exp: e.slice(0, Ha), key: e.slice(Ha + 1, Xa) };
				})(e);
				return null === n.key
					? "".concat(e, "=").concat(t)
					: "$set(".concat(n.exp, ", ").concat(n.key, ", ").concat(t, ")");
			}
			function yr() {
				return za.charCodeAt(++Ga);
			}
			function mr() {
				return Ga >= Wa;
			}
			function fr(e) {
				return 34 === e || 39 === e;
			}
			function hr(e) {
				var t = 1;
				for (Ha = Ga; !mr(); )
					if (fr((e = yr()))) vr(e);
					else if ((91 === e && t++, 93 === e && t--, 0 === t)) {
						Xa = Ga;
						break;
					}
			}
			function vr(e) {
				for (var t = e; !mr() && (e = yr()) !== t; );
			}
			var br,
				gr = "__r",
				Tr = "__c";
			function wr(e, t, n) {
				var a = br;
				return function r() {
					null !== t.apply(null, arguments) && xr(e, r, n, a);
				};
			}
			var _r = Qt && !(Q && Number(Q[1]) <= 53);
			function Rr(e, t, n, a) {
				if (_r) {
					var r = Lt,
						i = t;
					t = i._wrapper = function (e) {
						if (
							e.target === e.currentTarget ||
							e.timeStamp >= r ||
							e.timeStamp <= 0 ||
							e.target.ownerDocument !== document
						)
							return i.apply(this, arguments);
					};
				}
				br.addEventListener(e, t, te ? { capture: n, passive: a } : n);
			}
			function xr(e, t, n, a) {
				(a || br).removeEventListener(e, t._wrapper || t, n);
			}
			function kr(e, t) {
				if (!a(e.data.on) || !a(t.data.on)) {
					var n = t.data.on || {},
						i = e.data.on || {};
					(br = t.elm || e.elm),
						(function (e) {
							if (r(e[gr])) {
								var t = X ? "change" : "input";
								(e[t] = [].concat(e[gr], e[t] || [])), delete e[gr];
							}
							r(e[Tr]) &&
								((e.change = [].concat(e[Tr], e.change || [])), delete e[Tr]);
						})(n),
						Le(n, i, Rr, xr, wr, t.context),
						(br = void 0);
				}
			}
			var Mr,
				Cr = {
					create: kr,
					update: kr,
					destroy: function (e) {
						return kr(e, Ca);
					},
				};
			function Ar(e, t) {
				if (!a(e.data.domProps) || !a(t.data.domProps)) {
					var n,
						o,
						s = t.elm,
						u = e.data.domProps || {},
						l = t.data.domProps || {};
					for (n in ((r(l.__ob__) || i(l._v_attr_proxy)) &&
						(l = t.data.domProps = E({}, l)),
					u))
						n in l || (s[n] = "");
					for (n in l) {
						if (((o = l[n]), "textContent" === n || "innerHTML" === n)) {
							if ((t.children && (t.children.length = 0), o === u[n])) continue;
							1 === s.childNodes.length && s.removeChild(s.childNodes[0]);
						}
						if ("value" === n && "PROGRESS" !== s.tagName) {
							s._value = o;
							var p = a(o) ? "" : String(o);
							Er(s, p) && (s.value = p);
						} else if ("innerHTML" === n && va(s.tagName) && a(s.innerHTML)) {
							(Mr = Mr || document.createElement("div")).innerHTML =
								"<svg>".concat(o, "</svg>");
							for (var d = Mr.firstChild; s.firstChild; )
								s.removeChild(s.firstChild);
							for (; d.firstChild; ) s.appendChild(d.firstChild);
						} else if (o !== u[n])
							try {
								s[n] = o;
							} catch (e) {}
					}
				}
			}
			function Er(e, t) {
				return (
					!e.composing &&
					("OPTION" === e.tagName ||
						(function (e, t) {
							var n = !0;
							try {
								n = document.activeElement !== e;
							} catch (e) {}
							return n && e.value !== t;
						})(e, t) ||
						(function (e, t) {
							var n = e.value,
								a = e._vModifiers;
							if (r(a)) {
								if (a.number) return m(n) !== m(t);
								if (a.trim) return n.trim() !== t.trim();
							}
							return n !== t;
						})(e, t))
				);
			}
			var Ir = { create: Ar, update: Ar },
				Sr = w(function (e) {
					var t = {},
						n = /:(.+)/;
					return (
						e.split(/;(?![^(]*\))/g).forEach(function (e) {
							if (e) {
								var a = e.split(n);
								a.length > 1 && (t[a[0].trim()] = a[1].trim());
							}
						}),
						t
					);
				});
			function Or(e) {
				var t = $r(e.style);
				return e.staticStyle ? E(e.staticStyle, t) : t;
			}
			function $r(e) {
				return Array.isArray(e) ? I(e) : "string" == typeof e ? Sr(e) : e;
			}
			var Fr,
				Dr = /^--/,
				Pr = /\s*!important$/,
				jr = function (e, t, n) {
					if (Dr.test(t)) e.style.setProperty(t, n);
					else if (Pr.test(n))
						e.style.setProperty(M(t), n.replace(Pr, ""), "important");
					else {
						var a = Ur(t);
						if (Array.isArray(n))
							for (var r = 0, i = n.length; r < i; r++) e.style[a] = n[r];
						else e.style[a] = n;
					}
				},
				Nr = ["Webkit", "Moz", "ms"],
				Ur = w(function (e) {
					if (
						((Fr = Fr || document.createElement("div").style),
						"filter" !== (e = R(e)) && e in Fr)
					)
						return e;
					for (
						var t = e.charAt(0).toUpperCase() + e.slice(1), n = 0;
						n < Nr.length;
						n++
					) {
						var a = Nr[n] + t;
						if (a in Fr) return a;
					}
				});
			function Lr(e, t) {
				var n = t.data,
					i = e.data;
				if (
					!(a(n.staticStyle) && a(n.style) && a(i.staticStyle) && a(i.style))
				) {
					var o,
						s,
						u = t.elm,
						l = i.staticStyle,
						p = i.normalizedStyle || i.style || {},
						d = l || p,
						c = $r(t.data.style) || {};
					t.data.normalizedStyle = r(c.__ob__) ? E({}, c) : c;
					var y = (function (e, t) {
						for (var n, a = {}, r = e; r.componentInstance; )
							(r = r.componentInstance._vnode) &&
								r.data &&
								(n = Or(r.data)) &&
								E(a, n);
						(n = Or(e.data)) && E(a, n);
						for (var i = e; (i = i.parent); )
							i.data && (n = Or(i.data)) && E(a, n);
						return a;
					})(t);
					for (s in d) a(y[s]) && jr(u, s, "");
					for (s in y) (o = y[s]) !== d[s] && jr(u, s, null == o ? "" : o);
				}
			}
			var Br = { create: Lr, update: Lr },
				qr = /\s+/;
			function Wr(e, t) {
				if (t && (t = t.trim()))
					if (e.classList)
						t.indexOf(" ") > -1
							? t.split(qr).forEach(function (t) {
									return e.classList.add(t);
							  })
							: e.classList.add(t);
					else {
						var n = " ".concat(e.getAttribute("class") || "", " ");
						n.indexOf(" " + t + " ") < 0 &&
							e.setAttribute("class", (n + t).trim());
					}
			}
			function zr(e, t) {
				if (t && (t = t.trim()))
					if (e.classList)
						t.indexOf(" ") > -1
							? t.split(qr).forEach(function (t) {
									return e.classList.remove(t);
							  })
							: e.classList.remove(t),
							e.classList.length || e.removeAttribute("class");
					else {
						for (
							var n = " ".concat(e.getAttribute("class") || "", " "),
								a = " " + t + " ";
							n.indexOf(a) >= 0;

						)
							n = n.replace(a, " ");
						(n = n.trim())
							? e.setAttribute("class", n)
							: e.removeAttribute("class");
					}
			}
			function Vr(e) {
				if (e) {
					if ("object" == typeof e) {
						var t = {};
						return !1 !== e.css && E(t, Gr(e.name || "v")), E(t, e), t;
					}
					return "string" == typeof e ? Gr(e) : void 0;
				}
			}
			var Gr = w(function (e) {
					return {
						enterClass: "".concat(e, "-enter"),
						enterToClass: "".concat(e, "-enter-to"),
						enterActiveClass: "".concat(e, "-enter-active"),
						leaveClass: "".concat(e, "-leave"),
						leaveToClass: "".concat(e, "-leave-to"),
						leaveActiveClass: "".concat(e, "-leave-active"),
					};
				}),
				Hr = G && !K,
				Xr = "transition",
				Kr = "animation",
				Jr = "transition",
				Zr = "transitionend",
				Yr = "animation",
				Qr = "animationend";
			Hr &&
				(void 0 === window.ontransitionend &&
					void 0 !== window.onwebkittransitionend &&
					((Jr = "WebkitTransition"), (Zr = "webkitTransitionEnd")),
				void 0 === window.onanimationend &&
					void 0 !== window.onwebkitanimationend &&
					((Yr = "WebkitAnimation"), (Qr = "webkitAnimationEnd")));
			var ei = G
				? window.requestAnimationFrame
					? window.requestAnimationFrame.bind(window)
					: setTimeout
				: function (e) {
						return e();
				  };
			function ti(e) {
				ei(function () {
					ei(e);
				});
			}
			function ni(e, t) {
				var n = e._transitionClasses || (e._transitionClasses = []);
				n.indexOf(t) < 0 && (n.push(t), Wr(e, t));
			}
			function ai(e, t) {
				e._transitionClasses && b(e._transitionClasses, t), zr(e, t);
			}
			function ri(e, t, n) {
				var a = oi(e, t),
					r = a.type,
					i = a.timeout,
					o = a.propCount;
				if (!r) return n();
				var s = r === Xr ? Zr : Qr,
					u = 0,
					l = function () {
						e.removeEventListener(s, p), n();
					},
					p = function (t) {
						t.target === e && ++u >= o && l();
					};
				setTimeout(function () {
					u < o && l();
				}, i + 1),
					e.addEventListener(s, p);
			}
			var ii = /\b(transform|all)(,|$)/;
			function oi(e, t) {
				var n,
					a = window.getComputedStyle(e),
					r = (a[Jr + "Delay"] || "").split(", "),
					i = (a[Jr + "Duration"] || "").split(", "),
					o = si(r, i),
					s = (a[Yr + "Delay"] || "").split(", "),
					u = (a[Yr + "Duration"] || "").split(", "),
					l = si(s, u),
					p = 0,
					d = 0;
				return (
					t === Xr
						? o > 0 && ((n = Xr), (p = o), (d = i.length))
						: t === Kr
						? l > 0 && ((n = Kr), (p = l), (d = u.length))
						: (d = (n = (p = Math.max(o, l)) > 0 ? (o > l ? Xr : Kr) : null)
								? n === Xr
									? i.length
									: u.length
								: 0),
					{
						type: n,
						timeout: p,
						propCount: d,
						hasTransform: n === Xr && ii.test(a[Jr + "Property"]),
					}
				);
			}
			function si(e, t) {
				for (; e.length < t.length; ) e = e.concat(e);
				return Math.max.apply(
					null,
					t.map(function (t, n) {
						return ui(t) + ui(e[n]);
					})
				);
			}
			function ui(e) {
				return 1e3 * Number(e.slice(0, -1).replace(",", "."));
			}
			function li(e, t) {
				var n = e.elm;
				r(n._leaveCb) && ((n._leaveCb.cancelled = !0), n._leaveCb());
				var i = Vr(e.data.transition);
				if (!a(i) && !r(n._enterCb) && 1 === n.nodeType) {
					for (
						var o = i.css,
							l = i.type,
							p = i.enterClass,
							d = i.enterToClass,
							c = i.enterActiveClass,
							y = i.appearClass,
							f = i.appearToClass,
							h = i.appearActiveClass,
							v = i.beforeEnter,
							b = i.enter,
							g = i.afterEnter,
							T = i.enterCancelled,
							w = i.beforeAppear,
							_ = i.appear,
							R = i.afterAppear,
							x = i.appearCancelled,
							k = i.duration,
							M = At,
							C = At.$vnode;
						C && C.parent;

					)
						(M = C.context), (C = C.parent);
					var A = !M._isMounted || !e.isRootInsert;
					if (!A || _ || "" === _) {
						var E = A && y ? y : p,
							I = A && h ? h : c,
							S = A && f ? f : d,
							O = (A && w) || v,
							$ = A && s(_) ? _ : b,
							F = (A && R) || g,
							D = (A && x) || T,
							j = m(u(k) ? k.enter : k),
							N = !1 !== o && !K,
							U = ci($),
							L = (n._enterCb = P(function () {
								N && (ai(n, S), ai(n, I)),
									L.cancelled ? (N && ai(n, E), D && D(n)) : F && F(n),
									(n._enterCb = null);
							}));
						e.data.show ||
							Be(e, "insert", function () {
								var t = n.parentNode,
									a = t && t._pending && t._pending[e.key];
								a && a.tag === e.tag && a.elm._leaveCb && a.elm._leaveCb(),
									$ && $(n, L);
							}),
							O && O(n),
							N &&
								(ni(n, E),
								ni(n, I),
								ti(function () {
									ai(n, E),
										L.cancelled ||
											(ni(n, S), U || (di(j) ? setTimeout(L, j) : ri(n, l, L)));
								})),
							e.data.show && (t && t(), $ && $(n, L)),
							N || U || L();
					}
				}
			}
			function pi(e, t) {
				var n = e.elm;
				r(n._enterCb) && ((n._enterCb.cancelled = !0), n._enterCb());
				var i = Vr(e.data.transition);
				if (a(i) || 1 !== n.nodeType) return t();
				if (!r(n._leaveCb)) {
					var o = i.css,
						s = i.type,
						l = i.leaveClass,
						p = i.leaveToClass,
						d = i.leaveActiveClass,
						c = i.beforeLeave,
						y = i.leave,
						f = i.afterLeave,
						h = i.leaveCancelled,
						v = i.delayLeave,
						b = i.duration,
						g = !1 !== o && !K,
						T = ci(y),
						w = m(u(b) ? b.leave : b),
						_ = (n._leaveCb = P(function () {
							n.parentNode &&
								n.parentNode._pending &&
								(n.parentNode._pending[e.key] = null),
								g && (ai(n, p), ai(n, d)),
								_.cancelled ? (g && ai(n, l), h && h(n)) : (t(), f && f(n)),
								(n._leaveCb = null);
						}));
					v ? v(R) : R();
				}
				function R() {
					_.cancelled ||
						(!e.data.show &&
							n.parentNode &&
							((n.parentNode._pending || (n.parentNode._pending = {}))[e.key] =
								e),
						c && c(n),
						g &&
							(ni(n, l),
							ni(n, d),
							ti(function () {
								ai(n, l),
									_.cancelled ||
										(ni(n, p), T || (di(w) ? setTimeout(_, w) : ri(n, s, _)));
							})),
						y && y(n, _),
						g || T || _());
				}
			}
			function di(e) {
				return "number" == typeof e && !isNaN(e);
			}
			function ci(e) {
				if (a(e)) return !1;
				var t = e.fns;
				return r(t)
					? ci(Array.isArray(t) ? t[0] : t)
					: (e._length || e.length) > 1;
			}
			function yi(e, t) {
				!0 !== t.data.show && li(t);
			}
			var mi = (function (e) {
				var n,
					s,
					u = {},
					l = e.modules,
					p = e.nodeOps;
				for (n = 0; n < Aa.length; ++n)
					for (u[Aa[n]] = [], s = 0; s < l.length; ++s)
						r(l[s][Aa[n]]) && u[Aa[n]].push(l[s][Aa[n]]);
				function d(e) {
					var t = p.parentNode(e);
					r(t) && p.removeChild(t, e);
				}
				function c(e, t, n, a, o, s, l) {
					if (
						(r(e.elm) && r(s) && (e = s[l] = ye(e)),
						(e.isRootInsert = !o),
						!(function (e, t, n, a) {
							var o = e.data;
							if (r(o)) {
								var s = r(e.componentInstance) && o.keepAlive;
								if (
									(r((o = o.hook)) && r((o = o.init)) && o(e, !1),
									r(e.componentInstance))
								)
									return (
										y(e, t),
										m(n, e.elm, a),
										i(s) &&
											(function (e, t, n, a) {
												for (var i, o = e; o.componentInstance; )
													if (
														r((i = (o = o.componentInstance._vnode).data)) &&
														r((i = i.transition))
													) {
														for (i = 0; i < u.activate.length; ++i)
															u.activate[i](Ca, o);
														t.push(o);
														break;
													}
												m(n, e.elm, a);
											})(e, t, n, a),
										!0
									);
							}
						})(e, t, n, a))
					) {
						var d = e.data,
							c = e.children,
							f = e.tag;
						r(f)
							? ((e.elm = e.ns
									? p.createElementNS(e.ns, f)
									: p.createElement(f, e)),
							  g(e),
							  h(e, c, t),
							  r(d) && b(e, t),
							  m(n, e.elm, a))
							: i(e.isComment)
							? ((e.elm = p.createComment(e.text)), m(n, e.elm, a))
							: ((e.elm = p.createTextNode(e.text)), m(n, e.elm, a));
					}
				}
				function y(e, t) {
					r(e.data.pendingInsert) &&
						(t.push.apply(t, e.data.pendingInsert),
						(e.data.pendingInsert = null)),
						(e.elm = e.componentInstance.$el),
						v(e) ? (b(e, t), g(e)) : (ka(e), t.push(e));
				}
				function m(e, t, n) {
					r(e) &&
						(r(n)
							? p.parentNode(n) === e && p.insertBefore(e, t, n)
							: p.appendChild(e, t));
				}
				function h(e, n, a) {
					if (t(n))
						for (var r = 0; r < n.length; ++r)
							c(n[r], a, e.elm, null, !0, n, r);
					else
						o(e.text) && p.appendChild(e.elm, p.createTextNode(String(e.text)));
				}
				function v(e) {
					for (; e.componentInstance; ) e = e.componentInstance._vnode;
					return r(e.tag);
				}
				function b(e, t) {
					for (var a = 0; a < u.create.length; ++a) u.create[a](Ca, e);
					r((n = e.data.hook)) &&
						(r(n.create) && n.create(Ca, e), r(n.insert) && t.push(e));
				}
				function g(e) {
					var t;
					if (r((t = e.fnScopeId))) p.setStyleScope(e.elm, t);
					else
						for (var n = e; n; )
							r((t = n.context)) &&
								r((t = t.$options._scopeId)) &&
								p.setStyleScope(e.elm, t),
								(n = n.parent);
					r((t = At)) &&
						t !== e.context &&
						t !== e.fnContext &&
						r((t = t.$options._scopeId)) &&
						p.setStyleScope(e.elm, t);
				}
				function T(e, t, n, a, r, i) {
					for (; a <= r; ++a) c(n[a], i, e, t, !1, n, a);
				}
				function w(e) {
					var t,
						n,
						a = e.data;
					if (r(a))
						for (
							r((t = a.hook)) && r((t = t.destroy)) && t(e), t = 0;
							t < u.destroy.length;
							++t
						)
							u.destroy[t](e);
					if (r((t = e.children)))
						for (n = 0; n < e.children.length; ++n) w(e.children[n]);
				}
				function _(e, t, n) {
					for (; t <= n; ++t) {
						var a = e[t];
						r(a) && (r(a.tag) ? (R(a), w(a)) : d(a.elm));
					}
				}
				function R(e, t) {
					if (r(t) || r(e.data)) {
						var n,
							a = u.remove.length + 1;
						for (
							r(t)
								? (t.listeners += a)
								: (t = (function (e, t) {
										function n() {
											0 == --n.listeners && d(e);
										}
										return (n.listeners = t), n;
								  })(e.elm, a)),
								r((n = e.componentInstance)) &&
									r((n = n._vnode)) &&
									r(n.data) &&
									R(n, t),
								n = 0;
							n < u.remove.length;
							++n
						)
							u.remove[n](e, t);
						r((n = e.data.hook)) && r((n = n.remove)) ? n(e, t) : t();
					} else d(e.elm);
				}
				function x(e, t, n, a) {
					for (var i = n; i < a; i++) {
						var o = t[i];
						if (r(o) && Ea(e, o)) return i;
					}
				}
				function k(e, t, n, o, s, l) {
					if (e !== t) {
						r(t.elm) && r(o) && (t = o[s] = ye(t));
						var d = (t.elm = e.elm);
						if (i(e.isAsyncPlaceholder))
							r(t.asyncFactory.resolved)
								? A(e.elm, t, n)
								: (t.isAsyncPlaceholder = !0);
						else if (
							i(t.isStatic) &&
							i(e.isStatic) &&
							t.key === e.key &&
							(i(t.isCloned) || i(t.isOnce))
						)
							t.componentInstance = e.componentInstance;
						else {
							var y,
								m = t.data;
							r(m) && r((y = m.hook)) && r((y = y.prepatch)) && y(e, t);
							var f = e.children,
								h = t.children;
							if (r(m) && v(t)) {
								for (y = 0; y < u.update.length; ++y) u.update[y](e, t);
								r((y = m.hook)) && r((y = y.update)) && y(e, t);
							}
							a(t.text)
								? r(f) && r(h)
									? f !== h &&
									  (function (e, t, n, i, o) {
											for (
												var s,
													u,
													l,
													d = 0,
													y = 0,
													m = t.length - 1,
													f = t[0],
													h = t[m],
													v = n.length - 1,
													b = n[0],
													g = n[v],
													w = !o;
												d <= m && y <= v;

											)
												a(f)
													? (f = t[++d])
													: a(h)
													? (h = t[--m])
													: Ea(f, b)
													? (k(f, b, i, n, y), (f = t[++d]), (b = n[++y]))
													: Ea(h, g)
													? (k(h, g, i, n, v), (h = t[--m]), (g = n[--v]))
													: Ea(f, g)
													? (k(f, g, i, n, v),
													  w && p.insertBefore(e, f.elm, p.nextSibling(h.elm)),
													  (f = t[++d]),
													  (g = n[--v]))
													: Ea(h, b)
													? (k(h, b, i, n, y),
													  w && p.insertBefore(e, h.elm, f.elm),
													  (h = t[--m]),
													  (b = n[++y]))
													: (a(s) && (s = Ia(t, d, m)),
													  a((u = r(b.key) ? s[b.key] : x(b, t, d, m)))
															? c(b, i, e, f.elm, !1, n, y)
															: Ea((l = t[u]), b)
															? (k(l, b, i, n, y),
															  (t[u] = void 0),
															  w && p.insertBefore(e, l.elm, f.elm))
															: c(b, i, e, f.elm, !1, n, y),
													  (b = n[++y]));
											d > m
												? T(e, a(n[v + 1]) ? null : n[v + 1].elm, n, y, v, i)
												: y > v && _(t, d, m);
									  })(d, f, h, n, l)
									: r(h)
									? (r(e.text) && p.setTextContent(d, ""),
									  T(d, null, h, 0, h.length - 1, n))
									: r(f)
									? _(f, 0, f.length - 1)
									: r(e.text) && p.setTextContent(d, "")
								: e.text !== t.text && p.setTextContent(d, t.text),
								r(m) && r((y = m.hook)) && r((y = y.postpatch)) && y(e, t);
						}
					}
				}
				function M(e, t, n) {
					if (i(n) && r(e.parent)) e.parent.data.pendingInsert = t;
					else for (var a = 0; a < t.length; ++a) t[a].data.hook.insert(t[a]);
				}
				var C = f("attrs,class,staticClass,staticStyle,key");
				function A(e, t, n, a) {
					var o,
						s = t.tag,
						u = t.data,
						l = t.children;
					if (
						((a = a || (u && u.pre)),
						(t.elm = e),
						i(t.isComment) && r(t.asyncFactory))
					)
						return (t.isAsyncPlaceholder = !0), !0;
					if (
						r(u) &&
						(r((o = u.hook)) && r((o = o.init)) && o(t, !0),
						r((o = t.componentInstance)))
					)
						return y(t, n), !0;
					if (r(s)) {
						if (r(l))
							if (e.hasChildNodes())
								if (r((o = u)) && r((o = o.domProps)) && r((o = o.innerHTML))) {
									if (o !== e.innerHTML) return !1;
								} else {
									for (var p = !0, d = e.firstChild, c = 0; c < l.length; c++) {
										if (!d || !A(d, l[c], n, a)) {
											p = !1;
											break;
										}
										d = d.nextSibling;
									}
									if (!p || d) return !1;
								}
							else h(t, l, n);
						if (r(u)) {
							var m = !1;
							for (var f in u)
								if (!C(f)) {
									(m = !0), b(t, n);
									break;
								}
							!m && u.class && dn(u.class);
						}
					} else e.data !== t.text && (e.data = t.text);
					return !0;
				}
				return function (e, t, n, o) {
					if (!a(t)) {
						var s,
							l = !1,
							d = [];
						if (a(e)) (l = !0), c(t, d);
						else {
							var y = r(e.nodeType);
							if (!y && Ea(e, t)) k(e, t, d, null, null, o);
							else {
								if (y) {
									if (
										(1 === e.nodeType &&
											e.hasAttribute(j) &&
											(e.removeAttribute(j), (n = !0)),
										i(n) && A(e, t, d))
									)
										return M(t, d, !0), e;
									(s = e),
										(e = new pe(p.tagName(s).toLowerCase(), {}, [], void 0, s));
								}
								var m = e.elm,
									f = p.parentNode(m);
								if (
									(c(t, d, m._leaveCb ? null : f, p.nextSibling(m)),
									r(t.parent))
								)
									for (var h = t.parent, b = v(t); h; ) {
										for (var g = 0; g < u.destroy.length; ++g) u.destroy[g](h);
										if (((h.elm = t.elm), b)) {
											for (var T = 0; T < u.create.length; ++T)
												u.create[T](Ca, h);
											var R = h.data.hook.insert;
											if (R.merged)
												for (var x = 1; x < R.fns.length; x++) R.fns[x]();
										} else ka(h);
										h = h.parent;
									}
								r(f) ? _([e], 0, 0) : r(e.tag) && w(e);
							}
						}
						return M(t, d, l), t.elm;
					}
					r(e) && w(e);
				};
			})({
				nodeOps: Ra,
				modules: [
					Ba,
					Ka,
					Cr,
					Ir,
					Br,
					G
						? {
								create: yi,
								activate: yi,
								remove: function (e, t) {
									!0 !== e.data.show ? pi(e, t) : t();
								},
						  }
						: {},
				].concat(ja),
			});
			K &&
				document.addEventListener("selectionchange", function () {
					var e = document.activeElement;
					e && e.vmodel && _i(e, "input");
				});
			var fi = {
				inserted: function (e, t, n, a) {
					"select" === n.tag
						? (a.elm && !a.elm._vOptions
								? Be(n, "postpatch", function () {
										fi.componentUpdated(e, t, n);
								  })
								: hi(e, t, n.context),
						  (e._vOptions = [].map.call(e.options, gi)))
						: ("textarea" === n.tag || wa(e.type)) &&
						  ((e._vModifiers = t.modifiers),
						  t.modifiers.lazy ||
								(e.addEventListener("compositionstart", Ti),
								e.addEventListener("compositionend", wi),
								e.addEventListener("change", wi),
								K && (e.vmodel = !0)));
				},
				componentUpdated: function (e, t, n) {
					if ("select" === n.tag) {
						hi(e, t, n.context);
						var a = e._vOptions,
							r = (e._vOptions = [].map.call(e.options, gi));
						r.some(function (e, t) {
							return !F(e, a[t]);
						}) &&
							(e.multiple
								? t.value.some(function (e) {
										return bi(e, r);
								  })
								: t.value !== t.oldValue && bi(t.value, r)) &&
							_i(e, "change");
					}
				},
			};
			function hi(e, t, n) {
				vi(e, t),
					(X || J) &&
						setTimeout(function () {
							vi(e, t);
						}, 0);
			}
			function vi(e, t, n) {
				var a = t.value,
					r = e.multiple;
				if (!r || Array.isArray(a)) {
					for (var i, o, s = 0, u = e.options.length; s < u; s++)
						if (((o = e.options[s]), r))
							(i = D(a, gi(o)) > -1), o.selected !== i && (o.selected = i);
						else if (F(gi(o), a))
							return void (e.selectedIndex !== s && (e.selectedIndex = s));
					r || (e.selectedIndex = -1);
				}
			}
			function bi(e, t) {
				return t.every(function (t) {
					return !F(t, e);
				});
			}
			function gi(e) {
				return "_value" in e ? e._value : e.value;
			}
			function Ti(e) {
				e.target.composing = !0;
			}
			function wi(e) {
				e.target.composing &&
					((e.target.composing = !1), _i(e.target, "input"));
			}
			function _i(e, t) {
				var n = document.createEvent("HTMLEvents");
				n.initEvent(t, !0, !0), e.dispatchEvent(n);
			}
			function Ri(e) {
				return !e.componentInstance || (e.data && e.data.transition)
					? e
					: Ri(e.componentInstance._vnode);
			}
			var xi = {
					model: fi,
					show: {
						bind: function (e, t, n) {
							var a = t.value,
								r = (n = Ri(n)).data && n.data.transition,
								i = (e.__vOriginalDisplay =
									"none" === e.style.display ? "" : e.style.display);
							a && r
								? ((n.data.show = !0),
								  li(n, function () {
										e.style.display = i;
								  }))
								: (e.style.display = a ? i : "none");
						},
						update: function (e, t, n) {
							var a = t.value;
							!a != !t.oldValue &&
								((n = Ri(n)).data && n.data.transition
									? ((n.data.show = !0),
									  a
											? li(n, function () {
													e.style.display = e.__vOriginalDisplay;
											  })
											: pi(n, function () {
													e.style.display = "none";
											  }))
									: (e.style.display = a ? e.__vOriginalDisplay : "none"));
						},
						unbind: function (e, t, n, a, r) {
							r || (e.style.display = e.__vOriginalDisplay);
						},
					},
				},
				ki = {
					name: String,
					appear: Boolean,
					css: Boolean,
					mode: String,
					type: String,
					enterClass: String,
					leaveClass: String,
					enterToClass: String,
					leaveToClass: String,
					enterActiveClass: String,
					leaveActiveClass: String,
					appearClass: String,
					appearActiveClass: String,
					appearToClass: String,
					duration: [Number, String, Object],
				};
			function Mi(e) {
				var t = e && e.componentOptions;
				return t && t.Ctor.options.abstract ? Mi(Rt(t.children)) : e;
			}
			function Ci(e) {
				var t = {},
					n = e.$options;
				for (var a in n.propsData) t[a] = e[a];
				var r = n._parentListeners;
				for (var a in r) t[R(a)] = r[a];
				return t;
			}
			function Ai(e, t) {
				if (/\d-keep-alive$/.test(t.tag))
					return e("keep-alive", { props: t.componentOptions.propsData });
			}
			var Ei = function (e) {
					return e.tag || yt(e);
				},
				Ii = function (e) {
					return "show" === e.name;
				},
				Si = {
					name: "transition",
					props: ki,
					abstract: !0,
					render: function (e) {
						var t = this,
							n = this.$slots.default;
						if (n && (n = n.filter(Ei)).length) {
							var a = this.mode,
								r = n[0];
							if (
								(function (e) {
									for (; (e = e.parent); ) if (e.data.transition) return !0;
								})(this.$vnode)
							)
								return r;
							var i = Mi(r);
							if (!i) return r;
							if (this._leaving) return Ai(e, r);
							var s = "__transition-".concat(this._uid, "-");
							i.key =
								null == i.key
									? i.isComment
										? s + "comment"
										: s + i.tag
									: o(i.key)
									? 0 === String(i.key).indexOf(s)
										? i.key
										: s + i.key
									: i.key;
							var u = ((i.data || (i.data = {})).transition = Ci(this)),
								l = this._vnode,
								p = Mi(l);
							if (
								(i.data.directives &&
									i.data.directives.some(Ii) &&
									(i.data.show = !0),
								p &&
									p.data &&
									!(function (e, t) {
										return t.key === e.key && t.tag === e.tag;
									})(i, p) &&
									!yt(p) &&
									(!p.componentInstance ||
										!p.componentInstance._vnode.isComment))
							) {
								var d = (p.data.transition = E({}, u));
								if ("out-in" === a)
									return (
										(this._leaving = !0),
										Be(d, "afterLeave", function () {
											(t._leaving = !1), t.$forceUpdate();
										}),
										Ai(e, r)
									);
								if ("in-out" === a) {
									if (yt(i)) return l;
									var c,
										y = function () {
											c();
										};
									Be(u, "afterEnter", y),
										Be(u, "enterCancelled", y),
										Be(d, "delayLeave", function (e) {
											c = e;
										});
								}
							}
							return r;
						}
					},
				},
				Oi = E({ tag: String, moveClass: String }, ki);
			delete Oi.mode;
			var $i = {
				props: Oi,
				beforeMount: function () {
					var e = this,
						t = this._update;
					this._update = function (n, a) {
						var r = Et(e);
						e.__patch__(e._vnode, e.kept, !1, !0),
							(e._vnode = e.kept),
							r(),
							t.call(e, n, a);
					};
				},
				render: function (e) {
					for (
						var t = this.tag || this.$vnode.data.tag || "span",
							n = Object.create(null),
							a = (this.prevChildren = this.children),
							r = this.$slots.default || [],
							i = (this.children = []),
							o = Ci(this),
							s = 0;
						s < r.length;
						s++
					)
						(p = r[s]).tag &&
							null != p.key &&
							0 !== String(p.key).indexOf("__vlist") &&
							(i.push(p),
							(n[p.key] = p),
							((p.data || (p.data = {})).transition = o));
					if (a) {
						var u = [],
							l = [];
						for (s = 0; s < a.length; s++) {
							var p;
							((p = a[s]).data.transition = o),
								(p.data.pos = p.elm.getBoundingClientRect()),
								n[p.key] ? u.push(p) : l.push(p);
						}
						(this.kept = e(t, null, u)), (this.removed = l);
					}
					return e(t, null, i);
				},
				updated: function () {
					var e = this.prevChildren,
						t = this.moveClass || (this.name || "v") + "-move";
					e.length &&
						this.hasMove(e[0].elm, t) &&
						(e.forEach(Fi),
						e.forEach(Di),
						e.forEach(Pi),
						(this._reflow = document.body.offsetHeight),
						e.forEach(function (e) {
							if (e.data.moved) {
								var n = e.elm,
									a = n.style;
								ni(n, t),
									(a.transform = a.WebkitTransform = a.transitionDuration = ""),
									n.addEventListener(
										Zr,
										(n._moveCb = function e(a) {
											(a && a.target !== n) ||
												(a && !/transform$/.test(a.propertyName)) ||
												(n.removeEventListener(Zr, e),
												(n._moveCb = null),
												ai(n, t));
										})
									);
							}
						}));
				},
				methods: {
					hasMove: function (e, t) {
						if (!Hr) return !1;
						if (this._hasMove) return this._hasMove;
						var n = e.cloneNode();
						e._transitionClasses &&
							e._transitionClasses.forEach(function (e) {
								zr(n, e);
							}),
							Wr(n, t),
							(n.style.display = "none"),
							this.$el.appendChild(n);
						var a = oi(n);
						return this.$el.removeChild(n), (this._hasMove = a.hasTransform);
					},
				},
			};
			function Fi(e) {
				e.elm._moveCb && e.elm._moveCb(), e.elm._enterCb && e.elm._enterCb();
			}
			function Di(e) {
				e.data.newPos = e.elm.getBoundingClientRect();
			}
			function Pi(e) {
				var t = e.data.pos,
					n = e.data.newPos,
					a = t.left - n.left,
					r = t.top - n.top;
				if (a || r) {
					e.data.moved = !0;
					var i = e.elm.style;
					(i.transform = i.WebkitTransform =
						"translate(".concat(a, "px,").concat(r, "px)")),
						(i.transitionDuration = "0s");
				}
			}
			var ji = { Transition: Si, TransitionGroup: $i };
			(Xn.config.mustUseProp = aa),
				(Xn.config.isReservedTag = ba),
				(Xn.config.isReservedAttr = ta),
				(Xn.config.getTagNamespace = ga),
				(Xn.config.isUnknownElement = function (e) {
					if (!G) return !0;
					if (ba(e)) return !1;
					if (((e = e.toLowerCase()), null != Ta[e])) return Ta[e];
					var t = document.createElement(e);
					return e.indexOf("-") > -1
						? (Ta[e] =
								t.constructor === window.HTMLUnknownElement ||
								t.constructor === window.HTMLElement)
						: (Ta[e] = /HTMLUnknownElement/.test(t.toString()));
				}),
				E(Xn.options.directives, xi),
				E(Xn.options.components, ji),
				(Xn.prototype.__patch__ = G ? mi : S),
				(Xn.prototype.$mount = function (e, t) {
					return (function (e, t, n) {
						var a;
						(e.$el = t),
							e.$options.render || (e.$options.render = de),
							$t(e, "beforeMount"),
							(a = function () {
								e._update(e._render(), n);
							}),
							new mn(
								e,
								a,
								S,
								{
									before: function () {
										e._isMounted && !e._isDestroyed && $t(e, "beforeUpdate");
									},
								},
								!0
							),
							(n = !1);
						var r = e._preWatchers;
						if (r) for (var i = 0; i < r.length; i++) r[i].run();
						return (
							null == e.$vnode && ((e._isMounted = !0), $t(e, "mounted")), e
						);
					})(this, (e = e && G ? _a(e) : void 0), t);
				}),
				G &&
					setTimeout(function () {
						L.devtools && re && re.emit("init", Xn);
					}, 0);
			var Ni,
				Ui = /\{\{((?:.|\r?\n)+?)\}\}/g,
				Li = /[-.*+?^${}()|[\]\/\\]/g,
				Bi = w(function (e) {
					var t = e[0].replace(Li, "\\$&"),
						n = e[1].replace(Li, "\\$&");
					return new RegExp(t + "((?:.|\\n)+?)" + n, "g");
				}),
				qi = {
					staticKeys: ["staticClass"],
					transformNode: function (e, t) {
						t.warn;
						var n = ur(e, "class");
						n &&
							(e.staticClass = JSON.stringify(n.replace(/\s+/g, " ").trim()));
						var a = sr(e, "class", !1);
						a && (e.classBinding = a);
					},
					genData: function (e) {
						var t = "";
						return (
							e.staticClass && (t += "staticClass:".concat(e.staticClass, ",")),
							e.classBinding && (t += "class:".concat(e.classBinding, ",")),
							t
						);
					},
				},
				Wi = {
					staticKeys: ["staticStyle"],
					transformNode: function (e, t) {
						t.warn;
						var n = ur(e, "style");
						n && (e.staticStyle = JSON.stringify(Sr(n)));
						var a = sr(e, "style", !1);
						a && (e.styleBinding = a);
					},
					genData: function (e) {
						var t = "";
						return (
							e.staticStyle && (t += "staticStyle:".concat(e.staticStyle, ",")),
							e.styleBinding && (t += "style:(".concat(e.styleBinding, "),")),
							t
						);
					},
				},
				zi = f(
					"area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"
				),
				Vi = f("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),
				Gi = f(
					"address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"
				),
				Hi =
					/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
				Xi =
					/^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
				Ki = "[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(B.source, "]*"),
				Ji = "((?:".concat(Ki, "\\:)?").concat(Ki, ")"),
				Zi = new RegExp("^<".concat(Ji)),
				Yi = /^\s*(\/?)>/,
				Qi = new RegExp("^<\\/".concat(Ji, "[^>]*>")),
				eo = /^<!DOCTYPE [^>]+>/i,
				to = /^<!\--/,
				no = /^<!\[/,
				ao = f("script,style,textarea", !0),
				ro = {},
				io = {
					"&lt;": "<",
					"&gt;": ">",
					"&quot;": '"',
					"&amp;": "&",
					"&#10;": "\n",
					"&#9;": "\t",
					"&#39;": "'",
				},
				oo = /&(?:lt|gt|quot|amp|#39);/g,
				so = /&(?:lt|gt|quot|amp|#39|#10|#9);/g,
				uo = f("pre,textarea", !0),
				lo = function (e, t) {
					return e && uo(e) && "\n" === t[0];
				};
			function po(e, t) {
				var n = t ? so : oo;
				return e.replace(n, function (e) {
					return io[e];
				});
			}
			var co,
				yo,
				mo,
				fo,
				ho,
				vo,
				bo,
				go,
				To = /^@|^v-on:/,
				wo = /^v-|^@|^:|^#/,
				_o = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
				Ro = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
				xo = /^\(|\)$/g,
				ko = /^\[.*\]$/,
				Mo = /:(.*)$/,
				Co = /^:|^\.|^v-bind:/,
				Ao = /\.[^.\]]+(?=[^\]]*$)/g,
				Eo = /^v-slot(:|$)|^#/,
				Io = /[\r\n]/,
				So = /[ \f\t\r\n]+/g,
				Oo = w(function (e) {
					return (
						((Ni = Ni || document.createElement("div")).innerHTML = e),
						Ni.textContent
					);
				}),
				$o = "_empty_";
			function Fo(e, t, n) {
				return {
					type: 1,
					tag: e,
					attrsList: t,
					attrsMap: Bo(t),
					rawAttrsMap: {},
					parent: n,
					children: [],
				};
			}
			function Do(e, t) {
				(co = t.warn || Qa),
					(vo = t.isPreTag || O),
					(bo = t.mustUseProp || O),
					(go = t.getTagNamespace || O);
				t.isReservedTag;
				(mo = er(t.modules, "transformNode")),
					(fo = er(t.modules, "preTransformNode")),
					(ho = er(t.modules, "postTransformNode")),
					(yo = t.delimiters);
				var n,
					a,
					r = [],
					i = !1 !== t.preserveWhitespace,
					o = t.whitespace,
					s = !1,
					u = !1;
				function l(e) {
					if (
						(p(e),
						s || e.processed || (e = Po(e, t)),
						r.length ||
							e === n ||
							(n.if &&
								(e.elseif || e.else) &&
								No(n, { exp: e.elseif, block: e })),
						a && !e.forbidden)
					)
						if (e.elseif || e.else)
							(o = e),
								(l = (function (e) {
									for (var t = e.length; t--; ) {
										if (1 === e[t].type) return e[t];
										e.pop();
									}
								})(a.children)),
								l && l.if && No(l, { exp: o.elseif, block: o });
						else {
							if (e.slotScope) {
								var i = e.slotTarget || '"default"';
								(a.scopedSlots || (a.scopedSlots = {}))[i] = e;
							}
							a.children.push(e), (e.parent = a);
						}
					var o, l;
					(e.children = e.children.filter(function (e) {
						return !e.slotScope;
					})),
						p(e),
						e.pre && (s = !1),
						vo(e.tag) && (u = !1);
					for (var d = 0; d < ho.length; d++) ho[d](e, t);
				}
				function p(e) {
					if (!u)
						for (
							var t = void 0;
							(t = e.children[e.children.length - 1]) &&
							3 === t.type &&
							" " === t.text;

						)
							e.children.pop();
				}
				return (
					(function (e, t) {
						for (
							var n,
								a,
								r = [],
								i = t.expectHTML,
								o = t.isUnaryTag || O,
								s = t.canBeLeftOpenTag || O,
								u = 0,
								l = function () {
									if (((n = e), a && ao(a))) {
										var l = 0,
											c = a.toLowerCase(),
											y =
												ro[c] ||
												(ro[c] = new RegExp(
													"([\\s\\S]*?)(</" + c + "[^>]*>)",
													"i"
												));
										(_ = e.replace(y, function (e, n, a) {
											return (
												(l = a.length),
												ao(c) ||
													"noscript" === c ||
													(n = n
														.replace(/<!\--([\s\S]*?)-->/g, "$1")
														.replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")),
												lo(c, n) && (n = n.slice(1)),
												t.chars && t.chars(n),
												""
											);
										})),
											(u += e.length - _.length),
											(e = _),
											d(c, u - l, u);
									} else {
										var m = e.indexOf("<");
										if (0 === m) {
											if (to.test(e)) {
												var f = e.indexOf("--\x3e");
												if (f >= 0)
													return (
														t.shouldKeepComment &&
															t.comment &&
															t.comment(e.substring(4, f), u, u + f + 3),
														p(f + 3),
														"continue"
													);
											}
											if (no.test(e)) {
												var h = e.indexOf("]>");
												if (h >= 0) return p(h + 2), "continue";
											}
											var v = e.match(eo);
											if (v) return p(v[0].length), "continue";
											var b = e.match(Qi);
											if (b) {
												var g = u;
												return p(b[0].length), d(b[1], g, u), "continue";
											}
											var T = (function () {
												var t = e.match(Zi);
												if (t) {
													var n = { tagName: t[1], attrs: [], start: u };
													p(t[0].length);
													for (
														var a = void 0, r = void 0;
														!(a = e.match(Yi)) &&
														(r = e.match(Xi) || e.match(Hi));

													)
														(r.start = u),
															p(r[0].length),
															(r.end = u),
															n.attrs.push(r);
													if (a)
														return (
															(n.unarySlash = a[1]),
															p(a[0].length),
															(n.end = u),
															n
														);
												}
											})();
											if (T)
												return (
													(function (e) {
														var n = e.tagName,
															u = e.unarySlash;
														i &&
															("p" === a && Gi(n) && d(a),
															s(n) && a === n && d(n));
														for (
															var l = o(n) || !!u,
																p = e.attrs.length,
																c = new Array(p),
																y = 0;
															y < p;
															y++
														) {
															var m = e.attrs[y],
																f = m[3] || m[4] || m[5] || "",
																h =
																	"a" === n && "href" === m[1]
																		? t.shouldDecodeNewlinesForHref
																		: t.shouldDecodeNewlines;
															c[y] = { name: m[1], value: po(f, h) };
														}
														l ||
															(r.push({
																tag: n,
																lowerCasedTag: n.toLowerCase(),
																attrs: c,
																start: e.start,
																end: e.end,
															}),
															(a = n)),
															t.start && t.start(n, c, l, e.start, e.end);
													})(T),
													lo(T.tagName, e) && p(1),
													"continue"
												);
										}
										var w = void 0,
											_ = void 0,
											R = void 0;
										if (m >= 0) {
											for (
												_ = e.slice(m);
												!(
													Qi.test(_) ||
													Zi.test(_) ||
													to.test(_) ||
													no.test(_) ||
													(R = _.indexOf("<", 1)) < 0
												);

											)
												(m += R), (_ = e.slice(m));
											w = e.substring(0, m);
										}
										m < 0 && (w = e),
											w && p(w.length),
											t.chars && w && t.chars(w, u - w.length, u);
									}
									if (e === n) return t.chars && t.chars(e), "break";
								};
							e && "break" !== l();

						);
						function p(t) {
							(u += t), (e = e.substring(t));
						}
						function d(e, n, i) {
							var o, s;
							if ((null == n && (n = u), null == i && (i = u), e))
								for (
									s = e.toLowerCase(), o = r.length - 1;
									o >= 0 && r[o].lowerCasedTag !== s;
									o--
								);
							else o = 0;
							if (o >= 0) {
								for (var l = r.length - 1; l >= o; l--)
									t.end && t.end(r[l].tag, n, i);
								(r.length = o), (a = o && r[o - 1].tag);
							} else
								"br" === s
									? t.start && t.start(e, [], !0, n, i)
									: "p" === s &&
									  (t.start && t.start(e, [], !1, n, i),
									  t.end && t.end(e, n, i));
						}
						d();
					})(e, {
						warn: co,
						expectHTML: t.expectHTML,
						isUnaryTag: t.isUnaryTag,
						canBeLeftOpenTag: t.canBeLeftOpenTag,
						shouldDecodeNewlines: t.shouldDecodeNewlines,
						shouldDecodeNewlinesForHref: t.shouldDecodeNewlinesForHref,
						shouldKeepComment: t.comments,
						outputSourceRange: t.outputSourceRange,
						start: function (e, i, o, p, d) {
							var c = (a && a.ns) || go(e);
							X &&
								"svg" === c &&
								(i = (function (e) {
									for (var t = [], n = 0; n < e.length; n++) {
										var a = e[n];
										qo.test(a.name) ||
											((a.name = a.name.replace(Wo, "")), t.push(a));
									}
									return t;
								})(i));
							var y,
								m = Fo(e, i, a);
							c && (m.ns = c),
								("style" !== (y = m).tag &&
									("script" !== y.tag ||
										(y.attrsMap.type &&
											"text/javascript" !== y.attrsMap.type))) ||
									ae() ||
									(m.forbidden = !0);
							for (var f = 0; f < fo.length; f++) m = fo[f](m, t) || m;
							s ||
								((function (e) {
									null != ur(e, "v-pre") && (e.pre = !0);
								})(m),
								m.pre && (s = !0)),
								vo(m.tag) && (u = !0),
								s
									? (function (e) {
											var t = e.attrsList,
												n = t.length;
											if (n)
												for (
													var a = (e.attrs = new Array(n)), r = 0;
													r < n;
													r++
												)
													(a[r] = {
														name: t[r].name,
														value: JSON.stringify(t[r].value),
													}),
														null != t[r].start &&
															((a[r].start = t[r].start),
															(a[r].end = t[r].end));
											else e.pre || (e.plain = !0);
									  })(m)
									: m.processed ||
									  (jo(m),
									  (function (e) {
											var t = ur(e, "v-if");
											if (t) (e.if = t), No(e, { exp: t, block: e });
											else {
												null != ur(e, "v-else") && (e.else = !0);
												var n = ur(e, "v-else-if");
												n && (e.elseif = n);
											}
									  })(m),
									  (function (e) {
											null != ur(e, "v-once") && (e.once = !0);
									  })(m)),
								n || (n = m),
								o ? l(m) : ((a = m), r.push(m));
						},
						end: function (e, t, n) {
							var i = r[r.length - 1];
							(r.length -= 1), (a = r[r.length - 1]), l(i);
						},
						chars: function (e, t, n) {
							if (
								a &&
								(!X || "textarea" !== a.tag || a.attrsMap.placeholder !== e)
							) {
								var r,
									l = a.children;
								if (
									(e =
										u || e.trim()
											? "script" === (r = a).tag || "style" === r.tag
												? e
												: Oo(e)
											: l.length
											? o
												? "condense" === o && Io.test(e)
													? ""
													: " "
												: i
												? " "
												: ""
											: "")
								) {
									u || "condense" !== o || (e = e.replace(So, " "));
									var p = void 0,
										d = void 0;
									!s &&
									" " !== e &&
									(p = (function (e, t) {
										var n = t ? Bi(t) : Ui;
										if (n.test(e)) {
											for (
												var a, r, i, o = [], s = [], u = (n.lastIndex = 0);
												(a = n.exec(e));

											) {
												(r = a.index) > u &&
													(s.push((i = e.slice(u, r))),
													o.push(JSON.stringify(i)));
												var l = Za(a[1].trim());
												o.push("_s(".concat(l, ")")),
													s.push({ "@binding": l }),
													(u = r + a[0].length);
											}
											return (
												u < e.length &&
													(s.push((i = e.slice(u))), o.push(JSON.stringify(i))),
												{ expression: o.join("+"), tokens: s }
											);
										}
									})(e, yo))
										? (d = {
												type: 2,
												expression: p.expression,
												tokens: p.tokens,
												text: e,
										  })
										: (" " === e && l.length && " " === l[l.length - 1].text) ||
										  (d = { type: 3, text: e }),
										d && l.push(d);
								}
							}
						},
						comment: function (e, t, n) {
							if (a) {
								var r = { type: 3, text: e, isComment: !0 };
								a.children.push(r);
							}
						},
					}),
					n
				);
			}
			function Po(e, t) {
				var n;
				!(function (e) {
					var t = sr(e, "key");
					t && (e.key = t);
				})(e),
					(e.plain = !e.key && !e.scopedSlots && !e.attrsList.length),
					(function (e) {
						var t = sr(e, "ref");
						t &&
							((e.ref = t),
							(e.refInFor = (function (e) {
								for (var t = e; t; ) {
									if (void 0 !== t.for) return !0;
									t = t.parent;
								}
								return !1;
							})(e)));
					})(e),
					(function (e) {
						var t;
						"template" === e.tag
							? ((t = ur(e, "scope")), (e.slotScope = t || ur(e, "slot-scope")))
							: (t = ur(e, "slot-scope")) && (e.slotScope = t);
						var n,
							a = sr(e, "slot");
						if (
							(a &&
								((e.slotTarget = '""' === a ? '"default"' : a),
								(e.slotTargetDynamic = !(
									!e.attrsMap[":slot"] && !e.attrsMap["v-bind:slot"]
								)),
								"template" === e.tag ||
									e.slotScope ||
									nr(
										e,
										"slot",
										a,
										(function (e, t) {
											return (
												e.rawAttrsMap[":" + t] ||
												e.rawAttrsMap["v-bind:" + t] ||
												e.rawAttrsMap[t]
											);
										})(e, "slot")
									)),
							"template" === e.tag)
						) {
							if ((n = lr(e, Eo))) {
								var r = Uo(n),
									i = r.name,
									o = r.dynamic;
								(e.slotTarget = i),
									(e.slotTargetDynamic = o),
									(e.slotScope = n.value || $o);
							}
						} else if ((n = lr(e, Eo))) {
							var s = e.scopedSlots || (e.scopedSlots = {}),
								u = Uo(n),
								l = u.name,
								p = ((o = u.dynamic), (s[l] = Fo("template", [], e)));
							(p.slotTarget = l),
								(p.slotTargetDynamic = o),
								(p.children = e.children.filter(function (e) {
									if (!e.slotScope) return (e.parent = p), !0;
								})),
								(p.slotScope = n.value || $o),
								(e.children = []),
								(e.plain = !1);
						}
					})(e),
					"slot" === (n = e).tag && (n.slotName = sr(n, "name")),
					(function (e) {
						var t;
						(t = sr(e, "is")) && (e.component = t),
							null != ur(e, "inline-template") && (e.inlineTemplate = !0);
					})(e);
				for (var a = 0; a < mo.length; a++) e = mo[a](e, t) || e;
				return (
					(function (e) {
						var t,
							n,
							a,
							r,
							i,
							o,
							s,
							u,
							l = e.attrsList;
						for (t = 0, n = l.length; t < n; t++)
							if (((a = r = l[t].name), (i = l[t].value), wo.test(a)))
								if (
									((e.hasBindings = !0),
									(o = Lo(a.replace(wo, ""))) && (a = a.replace(Ao, "")),
									Co.test(a))
								)
									(a = a.replace(Co, "")),
										(i = Za(i)),
										(u = ko.test(a)) && (a = a.slice(1, -1)),
										o &&
											(o.prop &&
												!u &&
												"innerHtml" === (a = R(a)) &&
												(a = "innerHTML"),
											o.camel && !u && (a = R(a)),
											o.sync &&
												((s = cr(i, "$event")),
												u
													? or(
															e,
															'"update:"+('.concat(a, ")"),
															s,
															null,
															!1,
															0,
															l[t],
															!0
													  )
													: (or(
															e,
															"update:".concat(R(a)),
															s,
															null,
															!1,
															0,
															l[t]
													  ),
													  M(a) !== R(a) &&
															or(
																e,
																"update:".concat(M(a)),
																s,
																null,
																!1,
																0,
																l[t]
															)))),
										(o && o.prop) ||
										(!e.component && bo(e.tag, e.attrsMap.type, a))
											? tr(e, a, i, l[t], u)
											: nr(e, a, i, l[t], u);
								else if (To.test(a))
									(a = a.replace(To, "")),
										(u = ko.test(a)) && (a = a.slice(1, -1)),
										or(e, a, i, o, !1, 0, l[t], u);
								else {
									var p = (a = a.replace(wo, "")).match(Mo),
										d = p && p[1];
									(u = !1),
										d &&
											((a = a.slice(0, -(d.length + 1))),
											ko.test(d) && ((d = d.slice(1, -1)), (u = !0))),
										rr(e, a, r, i, d, u, o, l[t]);
								}
							else
								nr(e, a, JSON.stringify(i), l[t]),
									!e.component &&
										"muted" === a &&
										bo(e.tag, e.attrsMap.type, a) &&
										tr(e, a, "true", l[t]);
					})(e),
					e
				);
			}
			function jo(e) {
				var t;
				if ((t = ur(e, "v-for"))) {
					var n = (function (e) {
						var t = e.match(_o);
						if (t) {
							var n = {};
							n.for = t[2].trim();
							var a = t[1].trim().replace(xo, ""),
								r = a.match(Ro);
							return (
								r
									? ((n.alias = a.replace(Ro, "").trim()),
									  (n.iterator1 = r[1].trim()),
									  r[2] && (n.iterator2 = r[2].trim()))
									: (n.alias = a),
								n
							);
						}
					})(t);
					n && E(e, n);
				}
			}
			function No(e, t) {
				e.ifConditions || (e.ifConditions = []), e.ifConditions.push(t);
			}
			function Uo(e) {
				var t = e.name.replace(Eo, "");
				return (
					t || ("#" !== e.name[0] && (t = "default")),
					ko.test(t)
						? { name: t.slice(1, -1), dynamic: !0 }
						: { name: '"'.concat(t, '"'), dynamic: !1 }
				);
			}
			function Lo(e) {
				var t = e.match(Ao);
				if (t) {
					var n = {};
					return (
						t.forEach(function (e) {
							n[e.slice(1)] = !0;
						}),
						n
					);
				}
			}
			function Bo(e) {
				for (var t = {}, n = 0, a = e.length; n < a; n++)
					t[e[n].name] = e[n].value;
				return t;
			}
			var qo = /^xmlns:NS\d+/,
				Wo = /^NS\d+:/;
			function zo(e) {
				return Fo(e.tag, e.attrsList.slice(), e.parent);
			}
			var Vo,
				Go,
				Ho = [
					qi,
					Wi,
					{
						preTransformNode: function (e, t) {
							if ("input" === e.tag) {
								var n = e.attrsMap;
								if (!n["v-model"]) return;
								var a = void 0;
								if (
									((n[":type"] || n["v-bind:type"]) && (a = sr(e, "type")),
									n.type ||
										a ||
										!n["v-bind"] ||
										(a = "(".concat(n["v-bind"], ").type")),
									a)
								) {
									var r = ur(e, "v-if", !0),
										i = r ? "&&(".concat(r, ")") : "",
										o = null != ur(e, "v-else", !0),
										s = ur(e, "v-else-if", !0),
										u = zo(e);
									jo(u),
										ar(u, "type", "checkbox"),
										Po(u, t),
										(u.processed = !0),
										(u.if = "(".concat(a, ")==='checkbox'") + i),
										No(u, { exp: u.if, block: u });
									var l = zo(e);
									ur(l, "v-for", !0),
										ar(l, "type", "radio"),
										Po(l, t),
										No(u, { exp: "(".concat(a, ")==='radio'") + i, block: l });
									var p = zo(e);
									return (
										ur(p, "v-for", !0),
										ar(p, ":type", a),
										Po(p, t),
										No(u, { exp: r, block: p }),
										o ? (u.else = !0) : s && (u.elseif = s),
										u
									);
								}
							}
						},
					},
				],
				Xo = {
					expectHTML: !0,
					modules: Ho,
					directives: {
						model: function (e, t, n) {
							var a = t.value,
								r = t.modifiers,
								i = e.tag,
								o = e.attrsMap.type;
							if (e.component) return dr(e, a, r), !1;
							if ("select" === i)
								!(function (e, t, n) {
									var a = n && n.number,
										r =
											'Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;' +
											"return ".concat(a ? "_n(val)" : "val", "})"),
										i = "var $$selectedVal = ".concat(r, ";");
									or(
										e,
										"change",
										(i = ""
											.concat(i, " ")
											.concat(
												cr(
													t,
													"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"
												)
											)),
										null,
										!0
									);
								})(e, a, r);
							else if ("input" === i && "checkbox" === o)
								!(function (e, t, n) {
									var a = n && n.number,
										r = sr(e, "value") || "null",
										i = sr(e, "true-value") || "true",
										o = sr(e, "false-value") || "false";
									tr(
										e,
										"checked",
										"Array.isArray(".concat(t, ")") +
											"?_i(".concat(t, ",").concat(r, ")>-1") +
											("true" === i
												? ":(".concat(t, ")")
												: ":_q(".concat(t, ",").concat(i, ")"))
									),
										or(
											e,
											"change",
											"var $$a=".concat(t, ",") +
												"$$el=$event.target," +
												"$$c=$$el.checked?(".concat(i, "):(").concat(o, ");") +
												"if(Array.isArray($$a)){" +
												"var $$v=".concat(a ? "_n(" + r + ")" : r, ",") +
												"$$i=_i($$a,$$v);" +
												"if($$el.checked){$$i<0&&(".concat(
													cr(t, "$$a.concat([$$v])"),
													")}"
												) +
												"else{$$i>-1&&(".concat(
													cr(t, "$$a.slice(0,$$i).concat($$a.slice($$i+1))"),
													")}"
												) +
												"}else{".concat(cr(t, "$$c"), "}"),
											null,
											!0
										);
								})(e, a, r);
							else if ("input" === i && "radio" === o)
								!(function (e, t, n) {
									var a = n && n.number,
										r = sr(e, "value") || "null";
									(r = a ? "_n(".concat(r, ")") : r),
										tr(e, "checked", "_q(".concat(t, ",").concat(r, ")")),
										or(e, "change", cr(t, r), null, !0);
								})(e, a, r);
							else if ("input" === i || "textarea" === i)
								!(function (e, t, n) {
									var a = e.attrsMap.type,
										r = n || {},
										i = r.lazy,
										o = r.number,
										s = r.trim,
										u = !i && "range" !== a,
										l = i ? "change" : "range" === a ? gr : "input",
										p = "$event.target.value";
									s && (p = "$event.target.value.trim()"),
										o && (p = "_n(".concat(p, ")"));
									var d = cr(t, p);
									u && (d = "if($event.target.composing)return;".concat(d)),
										tr(e, "value", "(".concat(t, ")")),
										or(e, l, d, null, !0),
										(s || o) && or(e, "blur", "$forceUpdate()");
								})(e, a, r);
							else if (!L.isReservedTag(i)) return dr(e, a, r), !1;
							return !0;
						},
						text: function (e, t) {
							t.value && tr(e, "textContent", "_s(".concat(t.value, ")"), t);
						},
						html: function (e, t) {
							t.value && tr(e, "innerHTML", "_s(".concat(t.value, ")"), t);
						},
					},
					isPreTag: function (e) {
						return "pre" === e;
					},
					isUnaryTag: zi,
					mustUseProp: aa,
					canBeLeftOpenTag: Vi,
					isReservedTag: ba,
					getTagNamespace: ga,
					staticKeys: (function (e) {
						return e
							.reduce(function (e, t) {
								return e.concat(t.staticKeys || []);
							}, [])
							.join(",");
					})(Ho),
				},
				Ko = w(function (e) {
					return f(
						"type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap" +
							(e ? "," + e : "")
					);
				});
			function Jo(e, t) {
				e &&
					((Vo = Ko(t.staticKeys || "")),
					(Go = t.isReservedTag || O),
					Zo(e),
					Yo(e, !1));
			}
			function Zo(e) {
				if (
					((e.static = (function (e) {
						return (
							2 !== e.type &&
							(3 === e.type ||
								!(
									!e.pre &&
									(e.hasBindings ||
										e.if ||
										e.for ||
										h(e.tag) ||
										!Go(e.tag) ||
										(function (e) {
											for (; e.parent; ) {
												if ("template" !== (e = e.parent).tag) return !1;
												if (e.for) return !0;
											}
											return !1;
										})(e) ||
										!Object.keys(e).every(Vo))
								))
						);
					})(e)),
					1 === e.type)
				) {
					if (
						!Go(e.tag) &&
						"slot" !== e.tag &&
						null == e.attrsMap["inline-template"]
					)
						return;
					for (var t = 0, n = e.children.length; t < n; t++) {
						var a = e.children[t];
						Zo(a), a.static || (e.static = !1);
					}
					if (e.ifConditions)
						for (t = 1, n = e.ifConditions.length; t < n; t++) {
							var r = e.ifConditions[t].block;
							Zo(r), r.static || (e.static = !1);
						}
				}
			}
			function Yo(e, t) {
				if (1 === e.type) {
					if (
						((e.static || e.once) && (e.staticInFor = t),
						e.static &&
							e.children.length &&
							(1 !== e.children.length || 3 !== e.children[0].type))
					)
						return void (e.staticRoot = !0);
					if (((e.staticRoot = !1), e.children))
						for (var n = 0, a = e.children.length; n < a; n++)
							Yo(e.children[n], t || !!e.for);
					if (e.ifConditions)
						for (n = 1, a = e.ifConditions.length; n < a; n++)
							Yo(e.ifConditions[n].block, t);
				}
			}
			var Qo = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/,
				es = /\([^)]*?\);*$/,
				ts =
					/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,
				ns = {
					esc: 27,
					tab: 9,
					enter: 13,
					space: 32,
					up: 38,
					left: 37,
					right: 39,
					down: 40,
					delete: [8, 46],
				},
				as = {
					esc: ["Esc", "Escape"],
					tab: "Tab",
					enter: "Enter",
					space: [" ", "Spacebar"],
					up: ["Up", "ArrowUp"],
					left: ["Left", "ArrowLeft"],
					right: ["Right", "ArrowRight"],
					down: ["Down", "ArrowDown"],
					delete: ["Backspace", "Delete", "Del"],
				},
				rs = function (e) {
					return "if(".concat(e, ")return null;");
				},
				is = {
					stop: "$event.stopPropagation();",
					prevent: "$event.preventDefault();",
					self: rs("$event.target !== $event.currentTarget"),
					ctrl: rs("!$event.ctrlKey"),
					shift: rs("!$event.shiftKey"),
					alt: rs("!$event.altKey"),
					meta: rs("!$event.metaKey"),
					left: rs("'button' in $event && $event.button !== 0"),
					middle: rs("'button' in $event && $event.button !== 1"),
					right: rs("'button' in $event && $event.button !== 2"),
				};
			function os(e, t) {
				var n = t ? "nativeOn:" : "on:",
					a = "",
					r = "";
				for (var i in e) {
					var o = ss(e[i]);
					e[i] && e[i].dynamic
						? (r += "".concat(i, ",").concat(o, ","))
						: (a += '"'.concat(i, '":').concat(o, ","));
				}
				return (
					(a = "{".concat(a.slice(0, -1), "}")),
					r ? n + "_d(".concat(a, ",[").concat(r.slice(0, -1), "])") : n + a
				);
			}
			function ss(e) {
				if (!e) return "function(){}";
				if (Array.isArray(e))
					return "[".concat(
						e
							.map(function (e) {
								return ss(e);
							})
							.join(","),
						"]"
					);
				var t = ts.test(e.value),
					n = Qo.test(e.value),
					a = ts.test(e.value.replace(es, ""));
				if (e.modifiers) {
					var r = "",
						i = "",
						o = [],
						s = function (t) {
							if (is[t]) (i += is[t]), ns[t] && o.push(t);
							else if ("exact" === t) {
								var n = e.modifiers;
								i += rs(
									["ctrl", "shift", "alt", "meta"]
										.filter(function (e) {
											return !n[e];
										})
										.map(function (e) {
											return "$event.".concat(e, "Key");
										})
										.join("||")
								);
							} else o.push(t);
						};
					for (var u in e.modifiers) s(u);
					o.length &&
						(r += (function (e) {
							return (
								"if(!$event.type.indexOf('key')&&" +
								"".concat(e.map(us).join("&&"), ")return null;")
							);
						})(o)),
						i && (r += i);
					var l = t
						? "return ".concat(e.value, ".apply(null, arguments)")
						: n
						? "return (".concat(e.value, ").apply(null, arguments)")
						: a
						? "return ".concat(e.value)
						: e.value;
					return "function($event){".concat(r).concat(l, "}");
				}
				return t || n
					? e.value
					: "function($event){".concat(
							a ? "return ".concat(e.value) : e.value,
							"}"
					  );
			}
			function us(e) {
				var t = parseInt(e, 10);
				if (t) return "$event.keyCode!==".concat(t);
				var n = ns[e],
					a = as[e];
				return (
					"_k($event.keyCode," +
					"".concat(JSON.stringify(e), ",") +
					"".concat(JSON.stringify(n), ",") +
					"$event.key," +
					"".concat(JSON.stringify(a)) +
					")"
				);
			}
			var ls = {
					on: function (e, t) {
						e.wrapListeners = function (e) {
							return "_g(".concat(e, ",").concat(t.value, ")");
						};
					},
					bind: function (e, t) {
						e.wrapData = function (n) {
							return "_b("
								.concat(n, ",'")
								.concat(e.tag, "',")
								.concat(t.value, ",")
								.concat(t.modifiers && t.modifiers.prop ? "true" : "false")
								.concat(t.modifiers && t.modifiers.sync ? ",true" : "", ")");
						};
					},
					cloak: S,
				},
				ps = function (e) {
					(this.options = e),
						(this.warn = e.warn || Qa),
						(this.transforms = er(e.modules, "transformCode")),
						(this.dataGenFns = er(e.modules, "genData")),
						(this.directives = E(E({}, ls), e.directives));
					var t = e.isReservedTag || O;
					(this.maybeComponent = function (e) {
						return !!e.component || !t(e.tag);
					}),
						(this.onceId = 0),
						(this.staticRenderFns = []),
						(this.pre = !1);
				};
			function ds(e, t) {
				var n = new ps(t),
					a = e ? ("script" === e.tag ? "null" : cs(e, n)) : '_c("div")';
				return {
					render: "with(this){return ".concat(a, "}"),
					staticRenderFns: n.staticRenderFns,
				};
			}
			function cs(e, t) {
				if (
					(e.parent && (e.pre = e.pre || e.parent.pre),
					e.staticRoot && !e.staticProcessed)
				)
					return ys(e, t);
				if (e.once && !e.onceProcessed) return ms(e, t);
				if (e.for && !e.forProcessed) return vs(e, t);
				if (e.if && !e.ifProcessed) return fs(e, t);
				if ("template" !== e.tag || e.slotTarget || t.pre) {
					if ("slot" === e.tag)
						return (function (e, t) {
							var n = e.slotName || '"default"',
								a = ws(e, t),
								r = "_t("
									.concat(n)
									.concat(a ? ",function(){return ".concat(a, "}") : ""),
								i =
									e.attrs || e.dynamicAttrs
										? xs(
												(e.attrs || [])
													.concat(e.dynamicAttrs || [])
													.map(function (e) {
														return {
															name: R(e.name),
															value: e.value,
															dynamic: e.dynamic,
														};
													})
										  )
										: null,
								o = e.attrsMap["v-bind"];
							return (
								(!i && !o) || a || (r += ",null"),
								i && (r += ",".concat(i)),
								o && (r += "".concat(i ? "" : ",null", ",").concat(o)),
								r + ")"
							);
						})(e, t);
					var n = void 0;
					if (e.component)
						n = (function (e, t, n) {
							var a = t.inlineTemplate ? null : ws(t, n, !0);
							return "_c("
								.concat(e, ",")
								.concat(bs(t, n))
								.concat(a ? ",".concat(a) : "", ")");
						})(e.component, e, t);
					else {
						var a = void 0,
							r = t.maybeComponent(e);
						(!e.plain || (e.pre && r)) && (a = bs(e, t));
						var i = void 0,
							o = t.options.bindings;
						r &&
							o &&
							!1 !== o.__isScriptSetup &&
							(i = (function (e, t) {
								var n = R(t),
									a = x(n),
									r = function (r) {
										return e[t] === r
											? t
											: e[n] === r
											? n
											: e[a] === r
											? a
											: void 0;
									},
									i = r("setup-const") || r("setup-reactive-const");
								if (i) return i;
								var o =
									r("setup-let") || r("setup-ref") || r("setup-maybe-ref");
								return o || void 0;
							})(o, e.tag)),
							i || (i = "'".concat(e.tag, "'"));
						var s = e.inlineTemplate ? null : ws(e, t, !0);
						n = "_c("
							.concat(i)
							.concat(a ? ",".concat(a) : "")
							.concat(s ? ",".concat(s) : "", ")");
					}
					for (var u = 0; u < t.transforms.length; u++)
						n = t.transforms[u](e, n);
					return n;
				}
				return ws(e, t) || "void 0";
			}
			function ys(e, t) {
				e.staticProcessed = !0;
				var n = t.pre;
				return (
					e.pre && (t.pre = e.pre),
					t.staticRenderFns.push("with(this){return ".concat(cs(e, t), "}")),
					(t.pre = n),
					"_m("
						.concat(t.staticRenderFns.length - 1)
						.concat(e.staticInFor ? ",true" : "", ")")
				);
			}
			function ms(e, t) {
				if (((e.onceProcessed = !0), e.if && !e.ifProcessed)) return fs(e, t);
				if (e.staticInFor) {
					for (var n = "", a = e.parent; a; ) {
						if (a.for) {
							n = a.key;
							break;
						}
						a = a.parent;
					}
					return n
						? "_o(".concat(cs(e, t), ",").concat(t.onceId++, ",").concat(n, ")")
						: cs(e, t);
				}
				return ys(e, t);
			}
			function fs(e, t, n, a) {
				return (e.ifProcessed = !0), hs(e.ifConditions.slice(), t, n, a);
			}
			function hs(e, t, n, a) {
				if (!e.length) return a || "_e()";
				var r = e.shift();
				return r.exp
					? "("
							.concat(r.exp, ")?")
							.concat(i(r.block), ":")
							.concat(hs(e, t, n, a))
					: "".concat(i(r.block));
				function i(e) {
					return n ? n(e, t) : e.once ? ms(e, t) : cs(e, t);
				}
			}
			function vs(e, t, n, a) {
				var r = e.for,
					i = e.alias,
					o = e.iterator1 ? ",".concat(e.iterator1) : "",
					s = e.iterator2 ? ",".concat(e.iterator2) : "";
				return (
					(e.forProcessed = !0),
					"".concat(a || "_l", "((").concat(r, "),") +
						"function(".concat(i).concat(o).concat(s, "){") +
						"return ".concat((n || cs)(e, t)) +
						"})"
				);
			}
			function bs(e, t) {
				var n = "{",
					a = (function (e, t) {
						var n = e.directives;
						if (n) {
							var a,
								r,
								i,
								o,
								s = "directives:[",
								u = !1;
							for (a = 0, r = n.length; a < r; a++) {
								(i = n[a]), (o = !0);
								var l = t.directives[i.name];
								l && (o = !!l(e, i, t.warn)),
									o &&
										((u = !0),
										(s += '{name:"'
											.concat(i.name, '",rawName:"')
											.concat(i.rawName, '"')
											.concat(
												i.value
													? ",value:("
															.concat(i.value, "),expression:")
															.concat(JSON.stringify(i.value))
													: ""
											)
											.concat(
												i.arg
													? ",arg:".concat(
															i.isDynamicArg ? i.arg : '"'.concat(i.arg, '"')
													  )
													: ""
											)
											.concat(
												i.modifiers
													? ",modifiers:".concat(JSON.stringify(i.modifiers))
													: "",
												"},"
											)));
							}
							return u ? s.slice(0, -1) + "]" : void 0;
						}
					})(e, t);
				a && (n += a + ","),
					e.key && (n += "key:".concat(e.key, ",")),
					e.ref && (n += "ref:".concat(e.ref, ",")),
					e.refInFor && (n += "refInFor:true,"),
					e.pre && (n += "pre:true,"),
					e.component && (n += 'tag:"'.concat(e.tag, '",'));
				for (var r = 0; r < t.dataGenFns.length; r++) n += t.dataGenFns[r](e);
				if (
					(e.attrs && (n += "attrs:".concat(xs(e.attrs), ",")),
					e.props && (n += "domProps:".concat(xs(e.props), ",")),
					e.events && (n += "".concat(os(e.events, !1), ",")),
					e.nativeEvents && (n += "".concat(os(e.nativeEvents, !0), ",")),
					e.slotTarget &&
						!e.slotScope &&
						(n += "slot:".concat(e.slotTarget, ",")),
					e.scopedSlots &&
						(n += "".concat(
							(function (e, t, n) {
								var a =
										e.for ||
										Object.keys(t).some(function (e) {
											var n = t[e];
											return n.slotTargetDynamic || n.if || n.for || gs(n);
										}),
									r = !!e.if;
								if (!a)
									for (var i = e.parent; i; ) {
										if ((i.slotScope && i.slotScope !== $o) || i.for) {
											a = !0;
											break;
										}
										i.if && (r = !0), (i = i.parent);
									}
								var o = Object.keys(t)
									.map(function (e) {
										return Ts(t[e], n);
									})
									.join(",");
								return "scopedSlots:_u(["
									.concat(o, "]")
									.concat(a ? ",null,true" : "")
									.concat(
										!a && r
											? ",null,false,".concat(
													(function (e) {
														for (var t = 5381, n = e.length; n; )
															t = (33 * t) ^ e.charCodeAt(--n);
														return t >>> 0;
													})(o)
											  )
											: "",
										")"
									);
							})(e, e.scopedSlots, t),
							","
						)),
					e.model &&
						(n += "model:{value:"
							.concat(e.model.value, ",callback:")
							.concat(e.model.callback, ",expression:")
							.concat(e.model.expression, "},")),
					e.inlineTemplate)
				) {
					var i = (function (e, t) {
						var n = e.children[0];
						if (n && 1 === n.type) {
							var a = ds(n, t.options);
							return "inlineTemplate:{render:function(){"
								.concat(a.render, "},staticRenderFns:[")
								.concat(
									a.staticRenderFns
										.map(function (e) {
											return "function(){".concat(e, "}");
										})
										.join(","),
									"]}"
								);
						}
					})(e, t);
					i && (n += "".concat(i, ","));
				}
				return (
					(n = n.replace(/,$/, "") + "}"),
					e.dynamicAttrs &&
						(n = "_b("
							.concat(n, ',"')
							.concat(e.tag, '",')
							.concat(xs(e.dynamicAttrs), ")")),
					e.wrapData && (n = e.wrapData(n)),
					e.wrapListeners && (n = e.wrapListeners(n)),
					n
				);
			}
			function gs(e) {
				return 1 === e.type && ("slot" === e.tag || e.children.some(gs));
			}
			function Ts(e, t) {
				var n = e.attrsMap["slot-scope"];
				if (e.if && !e.ifProcessed && !n) return fs(e, t, Ts, "null");
				if (e.for && !e.forProcessed) return vs(e, t, Ts);
				var a = e.slotScope === $o ? "" : String(e.slotScope),
					r =
						"function(".concat(a, "){") +
						"return ".concat(
							"template" === e.tag
								? e.if && n
									? "("
											.concat(e.if, ")?")
											.concat(ws(e, t) || "undefined", ":undefined")
									: ws(e, t) || "undefined"
								: cs(e, t),
							"}"
						),
					i = a ? "" : ",proxy:true";
				return "{key:"
					.concat(e.slotTarget || '"default"', ",fn:")
					.concat(r)
					.concat(i, "}");
			}
			function ws(e, t, n, a, r) {
				var i = e.children;
				if (i.length) {
					var o = i[0];
					if (
						1 === i.length &&
						o.for &&
						"template" !== o.tag &&
						"slot" !== o.tag
					) {
						var s = n ? (t.maybeComponent(o) ? ",1" : ",0") : "";
						return "".concat((a || cs)(o, t)).concat(s);
					}
					var u = n
							? (function (e, t) {
									for (var n = 0, a = 0; a < e.length; a++) {
										var r = e[a];
										if (1 === r.type) {
											if (
												_s(r) ||
												(r.ifConditions &&
													r.ifConditions.some(function (e) {
														return _s(e.block);
													}))
											) {
												n = 2;
												break;
											}
											(t(r) ||
												(r.ifConditions &&
													r.ifConditions.some(function (e) {
														return t(e.block);
													}))) &&
												(n = 1);
										}
									}
									return n;
							  })(i, t.maybeComponent)
							: 0,
						l = r || Rs;
					return "["
						.concat(
							i
								.map(function (e) {
									return l(e, t);
								})
								.join(","),
							"]"
						)
						.concat(u ? ",".concat(u) : "");
				}
			}
			function _s(e) {
				return void 0 !== e.for || "template" === e.tag || "slot" === e.tag;
			}
			function Rs(e, t) {
				return 1 === e.type
					? cs(e, t)
					: 3 === e.type && e.isComment
					? (function (e) {
							return "_e(".concat(JSON.stringify(e.text), ")");
					  })(e)
					: "_v(".concat(
							2 === (n = e).type ? n.expression : ks(JSON.stringify(n.text)),
							")"
					  );
				var n;
			}
			function xs(e) {
				for (var t = "", n = "", a = 0; a < e.length; a++) {
					var r = e[a],
						i = ks(r.value);
					r.dynamic
						? (n += "".concat(r.name, ",").concat(i, ","))
						: (t += '"'.concat(r.name, '":').concat(i, ","));
				}
				return (
					(t = "{".concat(t.slice(0, -1), "}")),
					n ? "_d(".concat(t, ",[").concat(n.slice(0, -1), "])") : t
				);
			}
			function ks(e) {
				return e.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
			}
			function Ms(e, t) {
				try {
					return new Function(e);
				} catch (n) {
					return t.push({ err: n, code: e }), S;
				}
			}
			function Cs(e) {
				var t = Object.create(null);
				return function (n, a, r) {
					(a = E({}, a)).warn, delete a.warn;
					var i = a.delimiters ? String(a.delimiters) + n : n;
					if (t[i]) return t[i];
					var o = e(n, a),
						s = {},
						u = [];
					return (
						(s.render = Ms(o.render, u)),
						(s.staticRenderFns = o.staticRenderFns.map(function (e) {
							return Ms(e, u);
						})),
						(t[i] = s)
					);
				};
			}
			new RegExp(
				"\\b" +
					"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments"
						.split(",")
						.join("\\b|\\b") +
					"\\b"
			),
				new RegExp(
					"\\b" +
						"delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") +
						"\\s*\\([^\\)]*\\)"
				);
			var As,
				Es,
				Is =
					((As = function (e, t) {
						var n = Do(e.trim(), t);
						!1 !== t.optimize && Jo(n, t);
						var a = ds(n, t);
						return {
							ast: n,
							render: a.render,
							staticRenderFns: a.staticRenderFns,
						};
					}),
					function (e) {
						function t(t, n) {
							var a = Object.create(e),
								r = [],
								i = [];
							if (n)
								for (var o in (n.modules &&
									(a.modules = (e.modules || []).concat(n.modules)),
								n.directives &&
									(a.directives = E(
										Object.create(e.directives || null),
										n.directives
									)),
								n))
									"modules" !== o && "directives" !== o && (a[o] = n[o]);
							a.warn = function (e, t, n) {
								(n ? i : r).push(e);
							};
							var s = As(t.trim(), a);
							return (s.errors = r), (s.tips = i), s;
						}
						return { compile: t, compileToFunctions: Cs(t) };
					}),
				Ss = Is(Xo).compileToFunctions;
			function Os(e) {
				return (
					((Es = Es || document.createElement("div")).innerHTML = e
						? '<a href="\n"/>'
						: '<div a="\n"/>'),
					Es.innerHTML.indexOf("&#10;") > 0
				);
			}
			var $s = !!G && Os(!1),
				Fs = !!G && Os(!0),
				Ds = w(function (e) {
					var t = _a(e);
					return t && t.innerHTML;
				}),
				Ps = Xn.prototype.$mount;
			function js(e, t) {
				for (var n in t) e[n] = t[n];
				return e;
			}
			(Xn.prototype.$mount = function (e, t) {
				if (
					(e = e && _a(e)) === document.body ||
					e === document.documentElement
				)
					return this;
				var n = this.$options;
				if (!n.render) {
					var a = n.template;
					if (a)
						if ("string" == typeof a) "#" === a.charAt(0) && (a = Ds(a));
						else {
							if (!a.nodeType) return this;
							a = a.innerHTML;
						}
					else
						e &&
							(a = (function (e) {
								if (e.outerHTML) return e.outerHTML;
								var t = document.createElement("div");
								return t.appendChild(e.cloneNode(!0)), t.innerHTML;
							})(e));
					if (a) {
						var r = Ss(
								a,
								{
									outputSourceRange: !1,
									shouldDecodeNewlines: $s,
									shouldDecodeNewlinesForHref: Fs,
									delimiters: n.delimiters,
									comments: n.comments,
								},
								this
							),
							i = r.render,
							o = r.staticRenderFns;
						(n.render = i), (n.staticRenderFns = o);
					}
				}
				return Ps.call(this, e, t);
			}),
				(Xn.compile = Ss);
			var Ns = /[!'()*]/g,
				Us = function (e) {
					return "%" + e.charCodeAt(0).toString(16);
				},
				Ls = /%2C/g,
				Bs = function (e) {
					return encodeURIComponent(e).replace(Ns, Us).replace(Ls, ",");
				};
			function qs(e) {
				try {
					return decodeURIComponent(e);
				} catch (e) {}
				return e;
			}
			var Ws = function (e) {
				return null == e || "object" == typeof e ? e : String(e);
			};
			function zs(e) {
				var t = {};
				return (e = e.trim().replace(/^(\?|#|&)/, ""))
					? (e.split("&").forEach(function (e) {
							var n = e.replace(/\+/g, " ").split("="),
								a = qs(n.shift()),
								r = n.length > 0 ? qs(n.join("=")) : null;
							void 0 === t[a]
								? (t[a] = r)
								: Array.isArray(t[a])
								? t[a].push(r)
								: (t[a] = [t[a], r]);
					  }),
					  t)
					: t;
			}
			function Vs(e) {
				var t = e
					? Object.keys(e)
							.map(function (t) {
								var n = e[t];
								if (void 0 === n) return "";
								if (null === n) return Bs(t);
								if (Array.isArray(n)) {
									var a = [];
									return (
										n.forEach(function (e) {
											void 0 !== e &&
												(null === e
													? a.push(Bs(t))
													: a.push(Bs(t) + "=" + Bs(e)));
										}),
										a.join("&")
									);
								}
								return Bs(t) + "=" + Bs(n);
							})
							.filter(function (e) {
								return e.length > 0;
							})
							.join("&")
					: null;
				return t ? "?" + t : "";
			}
			var Gs = /\/?$/;
			function Hs(e, t, n, a) {
				var r = a && a.options.stringifyQuery,
					i = t.query || {};
				try {
					i = Xs(i);
				} catch (e) {}
				var o = {
					name: t.name || (e && e.name),
					meta: (e && e.meta) || {},
					path: t.path || "/",
					hash: t.hash || "",
					query: i,
					params: t.params || {},
					fullPath: Zs(t, r),
					matched: e ? Js(e) : [],
				};
				return n && (o.redirectedFrom = Zs(n, r)), Object.freeze(o);
			}
			function Xs(e) {
				if (Array.isArray(e)) return e.map(Xs);
				if (e && "object" == typeof e) {
					var t = {};
					for (var n in e) t[n] = Xs(e[n]);
					return t;
				}
				return e;
			}
			var Ks = Hs(null, { path: "/" });
			function Js(e) {
				for (var t = []; e; ) t.unshift(e), (e = e.parent);
				return t;
			}
			function Zs(e, t) {
				var n = e.path,
					a = e.query;
				void 0 === a && (a = {});
				var r = e.hash;
				return void 0 === r && (r = ""), (n || "/") + (t || Vs)(a) + r;
			}
			function Ys(e, t, n) {
				return t === Ks
					? e === t
					: !!t &&
							(e.path && t.path
								? e.path.replace(Gs, "") === t.path.replace(Gs, "") &&
								  (n || (e.hash === t.hash && Qs(e.query, t.query)))
								: !(!e.name || !t.name) &&
								  e.name === t.name &&
								  (n ||
										(e.hash === t.hash &&
											Qs(e.query, t.query) &&
											Qs(e.params, t.params))));
			}
			function Qs(e, t) {
				if ((void 0 === e && (e = {}), void 0 === t && (t = {}), !e || !t))
					return e === t;
				var n = Object.keys(e).sort(),
					a = Object.keys(t).sort();
				return (
					n.length === a.length &&
					n.every(function (n, r) {
						var i = e[n];
						if (a[r] !== n) return !1;
						var o = t[n];
						return null == i || null == o
							? i === o
							: "object" == typeof i && "object" == typeof o
							? Qs(i, o)
							: String(i) === String(o);
					})
				);
			}
			function eu(e) {
				for (var t = 0; t < e.matched.length; t++) {
					var n = e.matched[t];
					for (var a in n.instances) {
						var r = n.instances[a],
							i = n.enteredCbs[a];
						if (r && i) {
							delete n.enteredCbs[a];
							for (var o = 0; o < i.length; o++) r._isBeingDestroyed || i[o](r);
						}
					}
				}
			}
			var tu = {
				name: "RouterView",
				functional: !0,
				props: { name: { type: String, default: "default" } },
				render: function (e, t) {
					var n = t.props,
						a = t.children,
						r = t.parent,
						i = t.data;
					i.routerView = !0;
					for (
						var o = r.$createElement,
							s = n.name,
							u = r.$route,
							l = r._routerViewCache || (r._routerViewCache = {}),
							p = 0,
							d = !1;
						r && r._routerRoot !== r;

					) {
						var c = r.$vnode ? r.$vnode.data : {};
						c.routerView && p++,
							c.keepAlive && r._directInactive && r._inactive && (d = !0),
							(r = r.$parent);
					}
					if (((i.routerViewDepth = p), d)) {
						var y = l[s],
							m = y && y.component;
						return m
							? (y.configProps && nu(m, i, y.route, y.configProps), o(m, i, a))
							: o();
					}
					var f = u.matched[p],
						h = f && f.components[s];
					if (!f || !h) return (l[s] = null), o();
					(l[s] = { component: h }),
						(i.registerRouteInstance = function (e, t) {
							var n = f.instances[s];
							((t && n !== e) || (!t && n === e)) && (f.instances[s] = t);
						}),
						((i.hook || (i.hook = {})).prepatch = function (e, t) {
							f.instances[s] = t.componentInstance;
						}),
						(i.hook.init = function (e) {
							e.data.keepAlive &&
								e.componentInstance &&
								e.componentInstance !== f.instances[s] &&
								(f.instances[s] = e.componentInstance),
								eu(u);
						});
					var v = f.props && f.props[s];
					return (
						v && (js(l[s], { route: u, configProps: v }), nu(h, i, u, v)),
						o(h, i, a)
					);
				},
			};
			function nu(e, t, n, a) {
				var r = (t.props = (function (e, t) {
					switch (typeof t) {
						case "undefined":
							return;
						case "object":
							return t;
						case "function":
							return t(e);
						case "boolean":
							return t ? e.params : void 0;
					}
				})(n, a));
				if (r) {
					r = t.props = js({}, r);
					var i = (t.attrs = t.attrs || {});
					for (var o in r)
						(e.props && o in e.props) || ((i[o] = r[o]), delete r[o]);
				}
			}
			function au(e, t, n) {
				var a = e.charAt(0);
				if ("/" === a) return e;
				if ("?" === a || "#" === a) return t + e;
				var r = t.split("/");
				(n && r[r.length - 1]) || r.pop();
				for (
					var i = e.replace(/^\//, "").split("/"), o = 0;
					o < i.length;
					o++
				) {
					var s = i[o];
					".." === s ? r.pop() : "." !== s && r.push(s);
				}
				return "" !== r[0] && r.unshift(""), r.join("/");
			}
			function ru(e) {
				return e.replace(/\/(?:\s*\/)+/g, "/");
			}
			var iu =
					Array.isArray ||
					function (e) {
						return "[object Array]" == Object.prototype.toString.call(e);
					},
				ou = function e(t, n, a) {
					return (
						iu(n) || ((a = n || a), (n = [])),
						(a = a || {}),
						t instanceof RegExp
							? (function (e, t) {
									var n = e.source.match(/\((?!\?)/g);
									if (n)
										for (var a = 0; a < n.length; a++)
											t.push({
												name: a,
												prefix: null,
												delimiter: null,
												optional: !1,
												repeat: !1,
												partial: !1,
												asterisk: !1,
												pattern: null,
											});
									return vu(e, t);
							  })(t, n)
							: iu(t)
							? (function (t, n, a) {
									for (var r = [], i = 0; i < t.length; i++)
										r.push(e(t[i], n, a).source);
									return vu(new RegExp("(?:" + r.join("|") + ")", bu(a)), n);
							  })(t, n, a)
							: (function (e, t, n) {
									return gu(du(e, n), t, n);
							  })(t, n, a)
					);
				},
				su = du,
				uu = mu,
				lu = gu,
				pu = new RegExp(
					[
						"(\\\\.)",
						"([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))",
					].join("|"),
					"g"
				);
			function du(e, t) {
				for (
					var n, a = [], r = 0, i = 0, o = "", s = (t && t.delimiter) || "/";
					null != (n = pu.exec(e));

				) {
					var u = n[0],
						l = n[1],
						p = n.index;
					if (((o += e.slice(i, p)), (i = p + u.length), l)) o += l[1];
					else {
						var d = e[i],
							c = n[2],
							y = n[3],
							m = n[4],
							f = n[5],
							h = n[6],
							v = n[7];
						o && (a.push(o), (o = ""));
						var b = null != c && null != d && d !== c,
							g = "+" === h || "*" === h,
							T = "?" === h || "*" === h,
							w = n[2] || s,
							_ = m || f;
						a.push({
							name: y || r++,
							prefix: c || "",
							delimiter: w,
							optional: T,
							repeat: g,
							partial: b,
							asterisk: !!v,
							pattern: _ ? hu(_) : v ? ".*" : "[^" + fu(w) + "]+?",
						});
					}
				}
				return i < e.length && (o += e.substr(i)), o && a.push(o), a;
			}
			function cu(e) {
				return encodeURI(e).replace(/[\/?#]/g, function (e) {
					return "%" + e.charCodeAt(0).toString(16).toUpperCase();
				});
			}
			function yu(e) {
				return encodeURI(e).replace(/[?#]/g, function (e) {
					return "%" + e.charCodeAt(0).toString(16).toUpperCase();
				});
			}
			function mu(e, t) {
				for (var n = new Array(e.length), a = 0; a < e.length; a++)
					"object" == typeof e[a] &&
						(n[a] = new RegExp("^(?:" + e[a].pattern + ")$", bu(t)));
				return function (t, a) {
					for (
						var r = "",
							i = t || {},
							o = (a || {}).pretty ? cu : encodeURIComponent,
							s = 0;
						s < e.length;
						s++
					) {
						var u = e[s];
						if ("string" != typeof u) {
							var l,
								p = i[u.name];
							if (null == p) {
								if (u.optional) {
									u.partial && (r += u.prefix);
									continue;
								}
								throw new TypeError('Expected "' + u.name + '" to be defined');
							}
							if (iu(p)) {
								if (!u.repeat)
									throw new TypeError(
										'Expected "' +
											u.name +
											'" to not repeat, but received `' +
											JSON.stringify(p) +
											"`"
									);
								if (0 === p.length) {
									if (u.optional) continue;
									throw new TypeError(
										'Expected "' + u.name + '" to not be empty'
									);
								}
								for (var d = 0; d < p.length; d++) {
									if (((l = o(p[d])), !n[s].test(l)))
										throw new TypeError(
											'Expected all "' +
												u.name +
												'" to match "' +
												u.pattern +
												'", but received `' +
												JSON.stringify(l) +
												"`"
										);
									r += (0 === d ? u.prefix : u.delimiter) + l;
								}
							} else {
								if (((l = u.asterisk ? yu(p) : o(p)), !n[s].test(l)))
									throw new TypeError(
										'Expected "' +
											u.name +
											'" to match "' +
											u.pattern +
											'", but received "' +
											l +
											'"'
									);
								r += u.prefix + l;
							}
						} else r += u;
					}
					return r;
				};
			}
			function fu(e) {
				return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
			}
			function hu(e) {
				return e.replace(/([=!:$\/()])/g, "\\$1");
			}
			function vu(e, t) {
				return (e.keys = t), e;
			}
			function bu(e) {
				return e && e.sensitive ? "" : "i";
			}
			function gu(e, t, n) {
				iu(t) || ((n = t || n), (t = []));
				for (
					var a = (n = n || {}).strict, r = !1 !== n.end, i = "", o = 0;
					o < e.length;
					o++
				) {
					var s = e[o];
					if ("string" == typeof s) i += fu(s);
					else {
						var u = fu(s.prefix),
							l = "(?:" + s.pattern + ")";
						t.push(s),
							s.repeat && (l += "(?:" + u + l + ")*"),
							(i += l =
								s.optional
									? s.partial
										? u + "(" + l + ")?"
										: "(?:" + u + "(" + l + "))?"
									: u + "(" + l + ")");
					}
				}
				var p = fu(n.delimiter || "/"),
					d = i.slice(-p.length) === p;
				return (
					a || (i = (d ? i.slice(0, -p.length) : i) + "(?:" + p + "(?=$))?"),
					(i += r ? "$" : a && d ? "" : "(?=" + p + "|$)"),
					vu(new RegExp("^" + i, bu(n)), t)
				);
			}
			(ou.parse = su),
				(ou.compile = function (e, t) {
					return mu(du(e, t), t);
				}),
				(ou.tokensToFunction = uu),
				(ou.tokensToRegExp = lu);
			var Tu = Object.create(null);
			function wu(e, t, n) {
				t = t || {};
				try {
					var a = Tu[e] || (Tu[e] = ou.compile(e));
					return (
						"string" == typeof t.pathMatch && (t[0] = t.pathMatch),
						a(t, { pretty: !0 })
					);
				} catch (e) {
					return "";
				} finally {
					delete t[0];
				}
			}
			function _u(e, t, n, a) {
				var r = "string" == typeof e ? { path: e } : e;
				if (r._normalized) return r;
				if (r.name) {
					var i = (r = js({}, e)).params;
					return i && "object" == typeof i && (r.params = js({}, i)), r;
				}
				if (!r.path && r.params && t) {
					(r = js({}, r))._normalized = !0;
					var o = js(js({}, t.params), r.params);
					if (t.name) (r.name = t.name), (r.params = o);
					else if (t.matched.length) {
						var s = t.matched[t.matched.length - 1].path;
						r.path = wu(s, o, t.path);
					}
					return r;
				}
				var u = (function (e) {
						var t = "",
							n = "",
							a = e.indexOf("#");
						a >= 0 && ((t = e.slice(a)), (e = e.slice(0, a)));
						var r = e.indexOf("?");
						return (
							r >= 0 && ((n = e.slice(r + 1)), (e = e.slice(0, r))),
							{ path: e, query: n, hash: t }
						);
					})(r.path || ""),
					l = (t && t.path) || "/",
					p = u.path ? au(u.path, l, n || r.append) : l,
					d = (function (e, t, n) {
						void 0 === t && (t = {});
						var a,
							r = n || zs;
						try {
							a = r(e || "");
						} catch (e) {
							a = {};
						}
						for (var i in t) {
							var o = t[i];
							a[i] = Array.isArray(o) ? o.map(Ws) : Ws(o);
						}
						return a;
					})(u.query, r.query, a && a.options.parseQuery),
					c = r.hash || u.hash;
				return (
					c && "#" !== c.charAt(0) && (c = "#" + c),
					{ _normalized: !0, path: p, query: d, hash: c }
				);
			}
			var Ru,
				xu = function () {},
				ku = {
					name: "RouterLink",
					props: {
						to: { type: [String, Object], required: !0 },
						tag: { type: String, default: "a" },
						custom: Boolean,
						exact: Boolean,
						exactPath: Boolean,
						append: Boolean,
						replace: Boolean,
						activeClass: String,
						exactActiveClass: String,
						ariaCurrentValue: { type: String, default: "page" },
						event: { type: [String, Array], default: "click" },
					},
					render: function (e) {
						var t = this,
							n = this.$router,
							a = this.$route,
							r = n.resolve(this.to, a, this.append),
							i = r.location,
							o = r.route,
							s = r.href,
							u = {},
							l = n.options.linkActiveClass,
							p = n.options.linkExactActiveClass,
							d = null == l ? "router-link-active" : l,
							c = null == p ? "router-link-exact-active" : p,
							y = null == this.activeClass ? d : this.activeClass,
							m = null == this.exactActiveClass ? c : this.exactActiveClass,
							f = o.redirectedFrom
								? Hs(null, _u(o.redirectedFrom), null, n)
								: o;
						(u[m] = Ys(a, f, this.exactPath)),
							(u[y] =
								this.exact || this.exactPath
									? u[m]
									: (function (e, t) {
											return (
												0 ===
													e.path
														.replace(Gs, "/")
														.indexOf(t.path.replace(Gs, "/")) &&
												(!t.hash || e.hash === t.hash) &&
												(function (e, t) {
													for (var n in t) if (!(n in e)) return !1;
													return !0;
												})(e.query, t.query)
											);
									  })(a, f));
						var h = u[m] ? this.ariaCurrentValue : null,
							v = function (e) {
								Mu(e) && (t.replace ? n.replace(i, xu) : n.push(i, xu));
							},
							b = { click: Mu };
						Array.isArray(this.event)
							? this.event.forEach(function (e) {
									b[e] = v;
							  })
							: (b[this.event] = v);
						var g = { class: u },
							T =
								!this.$scopedSlots.$hasNormal &&
								this.$scopedSlots.default &&
								this.$scopedSlots.default({
									href: s,
									route: o,
									navigate: v,
									isActive: u[y],
									isExactActive: u[m],
								});
						if (T) {
							if (1 === T.length) return T[0];
							if (T.length > 1 || !T.length)
								return 0 === T.length ? e() : e("span", {}, T);
						}
						if ("a" === this.tag)
							(g.on = b), (g.attrs = { href: s, "aria-current": h });
						else {
							var w = Cu(this.$slots.default);
							if (w) {
								w.isStatic = !1;
								var _ = (w.data = js({}, w.data));
								for (var R in ((_.on = _.on || {}), _.on)) {
									var x = _.on[R];
									R in b && (_.on[R] = Array.isArray(x) ? x : [x]);
								}
								for (var k in b) k in _.on ? _.on[k].push(b[k]) : (_.on[k] = v);
								var M = (w.data.attrs = js({}, w.data.attrs));
								(M.href = s), (M["aria-current"] = h);
							} else g.on = b;
						}
						return e(this.tag, g, this.$slots.default);
					},
				};
			function Mu(e) {
				if (
					!(
						e.metaKey ||
						e.altKey ||
						e.ctrlKey ||
						e.shiftKey ||
						e.defaultPrevented ||
						(void 0 !== e.button && 0 !== e.button)
					)
				) {
					if (e.currentTarget && e.currentTarget.getAttribute) {
						var t = e.currentTarget.getAttribute("target");
						if (/\b_blank\b/i.test(t)) return;
					}
					return e.preventDefault && e.preventDefault(), !0;
				}
			}
			function Cu(e) {
				if (e)
					for (var t, n = 0; n < e.length; n++) {
						if ("a" === (t = e[n]).tag) return t;
						if (t.children && (t = Cu(t.children))) return t;
					}
			}
			var Au = "undefined" != typeof window;
			function Eu(e, t, n, a, r) {
				var i = t || [],
					o = n || Object.create(null),
					s = a || Object.create(null);
				e.forEach(function (e) {
					Iu(i, o, s, e, r);
				});
				for (var u = 0, l = i.length; u < l; u++)
					"*" === i[u] && (i.push(i.splice(u, 1)[0]), l--, u--);
				return { pathList: i, pathMap: o, nameMap: s };
			}
			function Iu(e, t, n, a, r, i) {
				var o = a.path,
					s = a.name,
					u = a.pathToRegexpOptions || {},
					l = (function (e, t, n) {
						return (
							n || (e = e.replace(/\/$/, "")),
							"/" === e[0] || null == t ? e : ru(t.path + "/" + e)
						);
					})(o, r, u.strict);
				"boolean" == typeof a.caseSensitive && (u.sensitive = a.caseSensitive);
				var p = {
					path: l,
					regex: Su(l, u),
					components: a.components || { default: a.component },
					alias: a.alias
						? "string" == typeof a.alias
							? [a.alias]
							: a.alias
						: [],
					instances: {},
					enteredCbs: {},
					name: s,
					parent: r,
					matchAs: i,
					redirect: a.redirect,
					beforeEnter: a.beforeEnter,
					meta: a.meta || {},
					props:
						null == a.props
							? {}
							: a.components
							? a.props
							: { default: a.props },
				};
				if (
					(a.children &&
						a.children.forEach(function (a) {
							var r = i ? ru(i + "/" + a.path) : void 0;
							Iu(e, t, n, a, p, r);
						}),
					t[p.path] || (e.push(p.path), (t[p.path] = p)),
					void 0 !== a.alias)
				)
					for (
						var d = Array.isArray(a.alias) ? a.alias : [a.alias], c = 0;
						c < d.length;
						++c
					) {
						var y = { path: d[c], children: a.children };
						Iu(e, t, n, y, r, p.path || "/");
					}
				s && (n[s] || (n[s] = p));
			}
			function Su(e, t) {
				return ou(e, [], t);
			}
			function Ou(e, t) {
				var n = Eu(e),
					a = n.pathList,
					r = n.pathMap,
					i = n.nameMap;
				function o(e, n, o) {
					var u = _u(e, n, !1, t),
						l = u.name;
					if (l) {
						var p = i[l];
						if (!p) return s(null, u);
						var d = p.regex.keys
							.filter(function (e) {
								return !e.optional;
							})
							.map(function (e) {
								return e.name;
							});
						if (
							("object" != typeof u.params && (u.params = {}),
							n && "object" == typeof n.params)
						)
							for (var c in n.params)
								!(c in u.params) &&
									d.indexOf(c) > -1 &&
									(u.params[c] = n.params[c]);
						return (u.path = wu(p.path, u.params)), s(p, u, o);
					}
					if (u.path) {
						u.params = {};
						for (var y = 0; y < a.length; y++) {
							var m = a[y],
								f = r[m];
							if ($u(f.regex, u.path, u.params)) return s(f, u, o);
						}
					}
					return s(null, u);
				}
				function s(e, n, a) {
					return e && e.redirect
						? (function (e, n) {
								var a = e.redirect,
									r = "function" == typeof a ? a(Hs(e, n, null, t)) : a;
								if (
									("string" == typeof r && (r = { path: r }),
									!r || "object" != typeof r)
								)
									return s(null, n);
								var u = r,
									l = u.name,
									p = u.path,
									d = n.query,
									c = n.hash,
									y = n.params;
								if (
									((d = u.hasOwnProperty("query") ? u.query : d),
									(c = u.hasOwnProperty("hash") ? u.hash : c),
									(y = u.hasOwnProperty("params") ? u.params : y),
									l)
								)
									return (
										i[l],
										o(
											{
												_normalized: !0,
												name: l,
												query: d,
												hash: c,
												params: y,
											},
											void 0,
											n
										)
									);
								if (p) {
									var m = (function (e, t) {
										return au(e, t.parent ? t.parent.path : "/", !0);
									})(p, e);
									return o(
										{ _normalized: !0, path: wu(m, y), query: d, hash: c },
										void 0,
										n
									);
								}
								return s(null, n);
						  })(e, a || n)
						: e && e.matchAs
						? (function (e, t, n) {
								var a = o({ _normalized: !0, path: wu(n, t.params) });
								if (a) {
									var r = a.matched,
										i = r[r.length - 1];
									return (t.params = a.params), s(i, t);
								}
								return s(null, t);
						  })(0, n, e.matchAs)
						: Hs(e, n, a, t);
				}
				return {
					match: o,
					addRoute: function (e, t) {
						var n = "object" != typeof e ? i[e] : void 0;
						Eu([t || e], a, r, i, n),
							n &&
								n.alias.length &&
								Eu(
									n.alias.map(function (e) {
										return { path: e, children: [t] };
									}),
									a,
									r,
									i,
									n
								);
					},
					getRoutes: function () {
						return a.map(function (e) {
							return r[e];
						});
					},
					addRoutes: function (e) {
						Eu(e, a, r, i);
					},
				};
			}
			function $u(e, t, n) {
				var a = t.match(e);
				if (!a) return !1;
				if (!n) return !0;
				for (var r = 1, i = a.length; r < i; ++r) {
					var o = e.keys[r - 1];
					o &&
						(n[o.name || "pathMatch"] =
							"string" == typeof a[r] ? qs(a[r]) : a[r]);
				}
				return !0;
			}
			var Fu =
				Au && window.performance && window.performance.now
					? window.performance
					: Date;
			function Du() {
				return Fu.now().toFixed(3);
			}
			var Pu = Du();
			function ju() {
				return Pu;
			}
			function Nu(e) {
				return (Pu = e);
			}
			var Uu = Object.create(null);
			function Lu() {
				"scrollRestoration" in window.history &&
					(window.history.scrollRestoration = "manual");
				var e = window.location.protocol + "//" + window.location.host,
					t = window.location.href.replace(e, ""),
					n = js({}, window.history.state);
				return (
					(n.key = ju()),
					window.history.replaceState(n, "", t),
					window.addEventListener("popstate", Wu),
					function () {
						window.removeEventListener("popstate", Wu);
					}
				);
			}
			function Bu(e, t, n, a) {
				if (e.app) {
					var r = e.options.scrollBehavior;
					r &&
						e.app.$nextTick(function () {
							var i = (function () {
									var e = ju();
									if (e) return Uu[e];
								})(),
								o = r.call(e, t, n, a ? i : null);
							o &&
								("function" == typeof o.then
									? o
											.then(function (e) {
												Xu(e, i);
											})
											.catch(function (e) {})
									: Xu(o, i));
						});
				}
			}
			function qu() {
				var e = ju();
				e && (Uu[e] = { x: window.pageXOffset, y: window.pageYOffset });
			}
			function Wu(e) {
				qu(), e.state && e.state.key && Nu(e.state.key);
			}
			function zu(e) {
				return Gu(e.x) || Gu(e.y);
			}
			function Vu(e) {
				return {
					x: Gu(e.x) ? e.x : window.pageXOffset,
					y: Gu(e.y) ? e.y : window.pageYOffset,
				};
			}
			function Gu(e) {
				return "number" == typeof e;
			}
			var Hu = /^#\d/;
			function Xu(e, t) {
				var n,
					a = "object" == typeof e;
				if (a && "string" == typeof e.selector) {
					var r = Hu.test(e.selector)
						? document.getElementById(e.selector.slice(1))
						: document.querySelector(e.selector);
					if (r) {
						var i = e.offset && "object" == typeof e.offset ? e.offset : {};
						t = (function (e, t) {
							var n = document.documentElement.getBoundingClientRect(),
								a = e.getBoundingClientRect();
							return { x: a.left - n.left - t.x, y: a.top - n.top - t.y };
						})(r, (i = { x: Gu((n = i).x) ? n.x : 0, y: Gu(n.y) ? n.y : 0 }));
					} else zu(e) && (t = Vu(e));
				} else a && zu(e) && (t = Vu(e));
				t &&
					("scrollBehavior" in document.documentElement.style
						? window.scrollTo({ left: t.x, top: t.y, behavior: e.behavior })
						: window.scrollTo(t.x, t.y));
			}
			var Ku,
				Ju =
					Au &&
					((-1 === (Ku = window.navigator.userAgent).indexOf("Android 2.") &&
						-1 === Ku.indexOf("Android 4.0")) ||
						-1 === Ku.indexOf("Mobile Safari") ||
						-1 !== Ku.indexOf("Chrome") ||
						-1 !== Ku.indexOf("Windows Phone")) &&
					window.history &&
					"function" == typeof window.history.pushState;
			function Zu(e, t) {
				qu();
				var n = window.history;
				try {
					if (t) {
						var a = js({}, n.state);
						(a.key = ju()), n.replaceState(a, "", e);
					} else n.pushState({ key: Nu(Du()) }, "", e);
				} catch (n) {
					window.location[t ? "replace" : "assign"](e);
				}
			}
			function Yu(e) {
				Zu(e, !0);
			}
			var Qu = { redirected: 2, aborted: 4, cancelled: 8, duplicated: 16 };
			function el(e, t) {
				return tl(
					e,
					t,
					Qu.cancelled,
					'Navigation cancelled from "' +
						e.fullPath +
						'" to "' +
						t.fullPath +
						'" with a new navigation.'
				);
			}
			function tl(e, t, n, a) {
				var r = new Error(a);
				return (r._isRouter = !0), (r.from = e), (r.to = t), (r.type = n), r;
			}
			var nl = ["params", "query", "hash"];
			function al(e) {
				return Object.prototype.toString.call(e).indexOf("Error") > -1;
			}
			function rl(e, t) {
				return al(e) && e._isRouter && (null == t || e.type === t);
			}
			function il(e, t, n) {
				var a = function (r) {
					r >= e.length
						? n()
						: e[r]
						? t(e[r], function () {
								a(r + 1);
						  })
						: a(r + 1);
				};
				a(0);
			}
			function ol(e, t) {
				return sl(
					e.map(function (e) {
						return Object.keys(e.components).map(function (n) {
							return t(e.components[n], e.instances[n], e, n);
						});
					})
				);
			}
			function sl(e) {
				return Array.prototype.concat.apply([], e);
			}
			var ul =
				"function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag;
			function ll(e) {
				var t = !1;
				return function () {
					for (var n = [], a = arguments.length; a--; ) n[a] = arguments[a];
					if (!t) return (t = !0), e.apply(this, n);
				};
			}
			var pl = function (e, t) {
				(this.router = e),
					(this.base = (function (e) {
						if (!e)
							if (Au) {
								var t = document.querySelector("base");
								e = (e = (t && t.getAttribute("href")) || "/").replace(
									/^https?:\/\/[^\/]+/,
									""
								);
							} else e = "/";
						return "/" !== e.charAt(0) && (e = "/" + e), e.replace(/\/$/, "");
					})(t)),
					(this.current = Ks),
					(this.pending = null),
					(this.ready = !1),
					(this.readyCbs = []),
					(this.readyErrorCbs = []),
					(this.errorCbs = []),
					(this.listeners = []);
			};
			function dl(e, t, n, a) {
				var r = ol(e, function (e, a, r, i) {
					var o = (function (e, t) {
						return "function" != typeof e && (e = Ru.extend(e)), e.options[t];
					})(e, t);
					if (o)
						return Array.isArray(o)
							? o.map(function (e) {
									return n(e, a, r, i);
							  })
							: n(o, a, r, i);
				});
				return sl(a ? r.reverse() : r);
			}
			function cl(e, t) {
				if (t)
					return function () {
						return e.apply(t, arguments);
					};
			}
			(pl.prototype.listen = function (e) {
				this.cb = e;
			}),
				(pl.prototype.onReady = function (e, t) {
					this.ready
						? e()
						: (this.readyCbs.push(e), t && this.readyErrorCbs.push(t));
				}),
				(pl.prototype.onError = function (e) {
					this.errorCbs.push(e);
				}),
				(pl.prototype.transitionTo = function (e, t, n) {
					var a,
						r = this;
					try {
						a = this.router.match(e, this.current);
					} catch (e) {
						throw (
							(this.errorCbs.forEach(function (t) {
								t(e);
							}),
							e)
						);
					}
					var i = this.current;
					this.confirmTransition(
						a,
						function () {
							r.updateRoute(a),
								t && t(a),
								r.ensureURL(),
								r.router.afterHooks.forEach(function (e) {
									e && e(a, i);
								}),
								r.ready ||
									((r.ready = !0),
									r.readyCbs.forEach(function (e) {
										e(a);
									}));
						},
						function (e) {
							n && n(e),
								e &&
									!r.ready &&
									((rl(e, Qu.redirected) && i === Ks) ||
										((r.ready = !0),
										r.readyErrorCbs.forEach(function (t) {
											t(e);
										})));
						}
					);
				}),
				(pl.prototype.confirmTransition = function (e, t, n) {
					var a = this,
						r = this.current;
					this.pending = e;
					var i,
						o,
						s = function (e) {
							!rl(e) &&
								al(e) &&
								(a.errorCbs.length
									? a.errorCbs.forEach(function (t) {
											t(e);
									  })
									: console.error(e)),
								n && n(e);
						},
						u = e.matched.length - 1,
						l = r.matched.length - 1;
					if (Ys(e, r) && u === l && e.matched[u] === r.matched[l])
						return (
							this.ensureURL(),
							e.hash && Bu(this.router, r, e, !1),
							s(
								(((o = tl(
									(i = r),
									e,
									Qu.duplicated,
									'Avoided redundant navigation to current location: "' +
										i.fullPath +
										'".'
								)).name = "NavigationDuplicated"),
								o)
							)
						);
					var p,
						d = (function (e, t) {
							var n,
								a = Math.max(e.length, t.length);
							for (n = 0; n < a && e[n] === t[n]; n++);
							return {
								updated: t.slice(0, n),
								activated: t.slice(n),
								deactivated: e.slice(n),
							};
						})(this.current.matched, e.matched),
						c = d.updated,
						y = d.deactivated,
						m = d.activated,
						f = [].concat(
							(function (e) {
								return dl(e, "beforeRouteLeave", cl, !0);
							})(y),
							this.router.beforeHooks,
							(function (e) {
								return dl(e, "beforeRouteUpdate", cl);
							})(c),
							m.map(function (e) {
								return e.beforeEnter;
							}),
							((p = m),
							function (e, t, n) {
								var a = !1,
									r = 0,
									i = null;
								ol(p, function (e, t, o, s) {
									if ("function" == typeof e && void 0 === e.cid) {
										(a = !0), r++;
										var u,
											l = ll(function (t) {
												var a;
												((a = t).__esModule ||
													(ul && "Module" === a[Symbol.toStringTag])) &&
													(t = t.default),
													(e.resolved =
														"function" == typeof t ? t : Ru.extend(t)),
													(o.components[s] = t),
													--r <= 0 && n();
											}),
											p = ll(function (e) {
												var t =
													"Failed to resolve async component " + s + ": " + e;
												i || ((i = al(e) ? e : new Error(t)), n(i));
											});
										try {
											u = e(l, p);
										} catch (e) {
											p(e);
										}
										if (u)
											if ("function" == typeof u.then) u.then(l, p);
											else {
												var d = u.component;
												d && "function" == typeof d.then && d.then(l, p);
											}
									}
								}),
									a || n();
							})
						),
						h = function (t, n) {
							if (a.pending !== e) return s(el(r, e));
							try {
								t(e, r, function (t) {
									!1 === t
										? (a.ensureURL(!0),
										  s(
												(function (e, t) {
													return tl(
														e,
														t,
														Qu.aborted,
														'Navigation aborted from "' +
															e.fullPath +
															'" to "' +
															t.fullPath +
															'" via a navigation guard.'
													);
												})(r, e)
										  ))
										: al(t)
										? (a.ensureURL(!0), s(t))
										: "string" == typeof t ||
										  ("object" == typeof t &&
												("string" == typeof t.path ||
													"string" == typeof t.name))
										? (s(
												(function (e, t) {
													return tl(
														e,
														t,
														Qu.redirected,
														'Redirected when going from "' +
															e.fullPath +
															'" to "' +
															(function (e) {
																if ("string" == typeof e) return e;
																if ("path" in e) return e.path;
																var t = {};
																return (
																	nl.forEach(function (n) {
																		n in e && (t[n] = e[n]);
																	}),
																	JSON.stringify(t, null, 2)
																);
															})(t) +
															'" via a navigation guard.'
													);
												})(r, e)
										  ),
										  "object" == typeof t && t.replace
												? a.replace(t)
												: a.push(t))
										: n(t);
								});
							} catch (e) {
								s(e);
							}
						};
					il(f, h, function () {
						var n = (function (e) {
							return dl(e, "beforeRouteEnter", function (e, t, n, a) {
								return (function (e, t, n) {
									return function (a, r, i) {
										return e(a, r, function (e) {
											"function" == typeof e &&
												(t.enteredCbs[n] || (t.enteredCbs[n] = []),
												t.enteredCbs[n].push(e)),
												i(e);
										});
									};
								})(e, n, a);
							});
						})(m);
						il(n.concat(a.router.resolveHooks), h, function () {
							if (a.pending !== e) return s(el(r, e));
							(a.pending = null),
								t(e),
								a.router.app &&
									a.router.app.$nextTick(function () {
										eu(e);
									});
						});
					});
				}),
				(pl.prototype.updateRoute = function (e) {
					(this.current = e), this.cb && this.cb(e);
				}),
				(pl.prototype.setupListeners = function () {}),
				(pl.prototype.teardown = function () {
					this.listeners.forEach(function (e) {
						e();
					}),
						(this.listeners = []),
						(this.current = Ks),
						(this.pending = null);
				});
			var yl = (function (e) {
				function t(t, n) {
					e.call(this, t, n), (this._startLocation = ml(this.base));
				}
				return (
					e && (t.__proto__ = e),
					(t.prototype = Object.create(e && e.prototype)),
					(t.prototype.constructor = t),
					(t.prototype.setupListeners = function () {
						var e = this;
						if (!(this.listeners.length > 0)) {
							var t = this.router,
								n = t.options.scrollBehavior,
								a = Ju && n;
							a && this.listeners.push(Lu());
							var r = function () {
								var n = e.current,
									r = ml(e.base);
								(e.current === Ks && r === e._startLocation) ||
									e.transitionTo(r, function (e) {
										a && Bu(t, e, n, !0);
									});
							};
							window.addEventListener("popstate", r),
								this.listeners.push(function () {
									window.removeEventListener("popstate", r);
								});
						}
					}),
					(t.prototype.go = function (e) {
						window.history.go(e);
					}),
					(t.prototype.push = function (e, t, n) {
						var a = this,
							r = this.current;
						this.transitionTo(
							e,
							function (e) {
								Zu(ru(a.base + e.fullPath)), Bu(a.router, e, r, !1), t && t(e);
							},
							n
						);
					}),
					(t.prototype.replace = function (e, t, n) {
						var a = this,
							r = this.current;
						this.transitionTo(
							e,
							function (e) {
								Yu(ru(a.base + e.fullPath)), Bu(a.router, e, r, !1), t && t(e);
							},
							n
						);
					}),
					(t.prototype.ensureURL = function (e) {
						if (ml(this.base) !== this.current.fullPath) {
							var t = ru(this.base + this.current.fullPath);
							e ? Zu(t) : Yu(t);
						}
					}),
					(t.prototype.getCurrentLocation = function () {
						return ml(this.base);
					}),
					t
				);
			})(pl);
			function ml(e) {
				var t = window.location.pathname,
					n = t.toLowerCase(),
					a = e.toLowerCase();
				return (
					!e ||
						(n !== a && 0 !== n.indexOf(ru(a + "/"))) ||
						(t = t.slice(e.length)),
					(t || "/") + window.location.search + window.location.hash
				);
			}
			var fl = (function (e) {
				function t(t, n, a) {
					e.call(this, t, n),
						(a &&
							(function (e) {
								var t = ml(e);
								if (!/^\/#/.test(t))
									return window.location.replace(ru(e + "/#" + t)), !0;
							})(this.base)) ||
							hl();
				}
				return (
					e && (t.__proto__ = e),
					(t.prototype = Object.create(e && e.prototype)),
					(t.prototype.constructor = t),
					(t.prototype.setupListeners = function () {
						var e = this;
						if (!(this.listeners.length > 0)) {
							var t = this.router.options.scrollBehavior,
								n = Ju && t;
							n && this.listeners.push(Lu());
							var a = function () {
									var t = e.current;
									hl() &&
										e.transitionTo(vl(), function (a) {
											n && Bu(e.router, a, t, !0), Ju || Tl(a.fullPath);
										});
								},
								r = Ju ? "popstate" : "hashchange";
							window.addEventListener(r, a),
								this.listeners.push(function () {
									window.removeEventListener(r, a);
								});
						}
					}),
					(t.prototype.push = function (e, t, n) {
						var a = this,
							r = this.current;
						this.transitionTo(
							e,
							function (e) {
								gl(e.fullPath), Bu(a.router, e, r, !1), t && t(e);
							},
							n
						);
					}),
					(t.prototype.replace = function (e, t, n) {
						var a = this,
							r = this.current;
						this.transitionTo(
							e,
							function (e) {
								Tl(e.fullPath), Bu(a.router, e, r, !1), t && t(e);
							},
							n
						);
					}),
					(t.prototype.go = function (e) {
						window.history.go(e);
					}),
					(t.prototype.ensureURL = function (e) {
						var t = this.current.fullPath;
						vl() !== t && (e ? gl(t) : Tl(t));
					}),
					(t.prototype.getCurrentLocation = function () {
						return vl();
					}),
					t
				);
			})(pl);
			function hl() {
				var e = vl();
				return "/" === e.charAt(0) || (Tl("/" + e), !1);
			}
			function vl() {
				var e = window.location.href,
					t = e.indexOf("#");
				return t < 0 ? "" : (e = e.slice(t + 1));
			}
			function bl(e) {
				var t = window.location.href,
					n = t.indexOf("#");
				return (n >= 0 ? t.slice(0, n) : t) + "#" + e;
			}
			function gl(e) {
				Ju ? Zu(bl(e)) : (window.location.hash = e);
			}
			function Tl(e) {
				Ju ? Yu(bl(e)) : window.location.replace(bl(e));
			}
			var wl = (function (e) {
					function t(t, n) {
						e.call(this, t, n), (this.stack = []), (this.index = -1);
					}
					return (
						e && (t.__proto__ = e),
						(t.prototype = Object.create(e && e.prototype)),
						(t.prototype.constructor = t),
						(t.prototype.push = function (e, t, n) {
							var a = this;
							this.transitionTo(
								e,
								function (e) {
									(a.stack = a.stack.slice(0, a.index + 1).concat(e)),
										a.index++,
										t && t(e);
								},
								n
							);
						}),
						(t.prototype.replace = function (e, t, n) {
							var a = this;
							this.transitionTo(
								e,
								function (e) {
									(a.stack = a.stack.slice(0, a.index).concat(e)), t && t(e);
								},
								n
							);
						}),
						(t.prototype.go = function (e) {
							var t = this,
								n = this.index + e;
							if (!(n < 0 || n >= this.stack.length)) {
								var a = this.stack[n];
								this.confirmTransition(
									a,
									function () {
										var e = t.current;
										(t.index = n),
											t.updateRoute(a),
											t.router.afterHooks.forEach(function (t) {
												t && t(a, e);
											});
									},
									function (e) {
										rl(e, Qu.duplicated) && (t.index = n);
									}
								);
							}
						}),
						(t.prototype.getCurrentLocation = function () {
							var e = this.stack[this.stack.length - 1];
							return e ? e.fullPath : "/";
						}),
						(t.prototype.ensureURL = function () {}),
						t
					);
				})(pl),
				_l = function (e) {
					void 0 === e && (e = {}),
						(this.app = null),
						(this.apps = []),
						(this.options = e),
						(this.beforeHooks = []),
						(this.resolveHooks = []),
						(this.afterHooks = []),
						(this.matcher = Ou(e.routes || [], this));
					var t = e.mode || "hash";
					switch (
						((this.fallback = "history" === t && !Ju && !1 !== e.fallback),
						this.fallback && (t = "hash"),
						Au || (t = "abstract"),
						(this.mode = t),
						t)
					) {
						case "history":
							this.history = new yl(this, e.base);
							break;
						case "hash":
							this.history = new fl(this, e.base, this.fallback);
							break;
						case "abstract":
							this.history = new wl(this, e.base);
					}
				},
				Rl = { currentRoute: { configurable: !0 } };
			(_l.prototype.match = function (e, t, n) {
				return this.matcher.match(e, t, n);
			}),
				(Rl.currentRoute.get = function () {
					return this.history && this.history.current;
				}),
				(_l.prototype.init = function (e) {
					var t = this;
					if (
						(this.apps.push(e),
						e.$once("hook:destroyed", function () {
							var n = t.apps.indexOf(e);
							n > -1 && t.apps.splice(n, 1),
								t.app === e && (t.app = t.apps[0] || null),
								t.app || t.history.teardown();
						}),
						!this.app)
					) {
						this.app = e;
						var n = this.history;
						if (n instanceof yl || n instanceof fl) {
							var a = function (e) {
								n.setupListeners(),
									(function (e) {
										var a = n.current,
											r = t.options.scrollBehavior;
										Ju && r && "fullPath" in e && Bu(t, e, a, !1);
									})(e);
							};
							n.transitionTo(n.getCurrentLocation(), a, a);
						}
						n.listen(function (e) {
							t.apps.forEach(function (t) {
								t._route = e;
							});
						});
					}
				}),
				(_l.prototype.beforeEach = function (e) {
					return kl(this.beforeHooks, e);
				}),
				(_l.prototype.beforeResolve = function (e) {
					return kl(this.resolveHooks, e);
				}),
				(_l.prototype.afterEach = function (e) {
					return kl(this.afterHooks, e);
				}),
				(_l.prototype.onReady = function (e, t) {
					this.history.onReady(e, t);
				}),
				(_l.prototype.onError = function (e) {
					this.history.onError(e);
				}),
				(_l.prototype.push = function (e, t, n) {
					var a = this;
					if (!t && !n && "undefined" != typeof Promise)
						return new Promise(function (t, n) {
							a.history.push(e, t, n);
						});
					this.history.push(e, t, n);
				}),
				(_l.prototype.replace = function (e, t, n) {
					var a = this;
					if (!t && !n && "undefined" != typeof Promise)
						return new Promise(function (t, n) {
							a.history.replace(e, t, n);
						});
					this.history.replace(e, t, n);
				}),
				(_l.prototype.go = function (e) {
					this.history.go(e);
				}),
				(_l.prototype.back = function () {
					this.go(-1);
				}),
				(_l.prototype.forward = function () {
					this.go(1);
				}),
				(_l.prototype.getMatchedComponents = function (e) {
					var t = e
						? e.matched
							? e
							: this.resolve(e).route
						: this.currentRoute;
					return t
						? [].concat.apply(
								[],
								t.matched.map(function (e) {
									return Object.keys(e.components).map(function (t) {
										return e.components[t];
									});
								})
						  )
						: [];
				}),
				(_l.prototype.resolve = function (e, t, n) {
					var a = _u(e, (t = t || this.history.current), n, this),
						r = this.match(a, t),
						i = r.redirectedFrom || r.fullPath,
						o = (function (e, t, n) {
							var a = "hash" === n ? "#" + t : t;
							return e ? ru(e + "/" + a) : a;
						})(this.history.base, i, this.mode);
					return {
						location: a,
						route: r,
						href: o,
						normalizedTo: a,
						resolved: r,
					};
				}),
				(_l.prototype.getRoutes = function () {
					return this.matcher.getRoutes();
				}),
				(_l.prototype.addRoute = function (e, t) {
					this.matcher.addRoute(e, t),
						this.history.current !== Ks &&
							this.history.transitionTo(this.history.getCurrentLocation());
				}),
				(_l.prototype.addRoutes = function (e) {
					this.matcher.addRoutes(e),
						this.history.current !== Ks &&
							this.history.transitionTo(this.history.getCurrentLocation());
				}),
				Object.defineProperties(_l.prototype, Rl);
			var xl = _l;
			function kl(e, t) {
				return (
					e.push(t),
					function () {
						var n = e.indexOf(t);
						n > -1 && e.splice(n, 1);
					}
				);
			}
			(_l.install = function e(t) {
				if (!e.installed || Ru !== t) {
					(e.installed = !0), (Ru = t);
					var n = function (e) {
							return void 0 !== e;
						},
						a = function (e, t) {
							var a = e.$options._parentVnode;
							n(a) &&
								n((a = a.data)) &&
								n((a = a.registerRouteInstance)) &&
								a(e, t);
						};
					t.mixin({
						beforeCreate: function () {
							n(this.$options.router)
								? ((this._routerRoot = this),
								  (this._router = this.$options.router),
								  this._router.init(this),
								  t.util.defineReactive(
										this,
										"_route",
										this._router.history.current
								  ))
								: (this._routerRoot =
										(this.$parent && this.$parent._routerRoot) || this),
								a(this, this);
						},
						destroyed: function () {
							a(this);
						},
					}),
						Object.defineProperty(t.prototype, "$router", {
							get: function () {
								return this._routerRoot._router;
							},
						}),
						Object.defineProperty(t.prototype, "$route", {
							get: function () {
								return this._routerRoot._route;
							},
						}),
						t.component("RouterView", tu),
						t.component("RouterLink", ku);
					var r = t.config.optionMergeStrategies;
					r.beforeRouteEnter =
						r.beforeRouteLeave =
						r.beforeRouteUpdate =
							r.created;
				}
			}),
				(_l.version = "3.6.5"),
				(_l.isNavigationFailure = rl),
				(_l.NavigationFailureType = Qu),
				(_l.START_LOCATION = Ks),
				Au && window.Vue && window.Vue.use(_l);
			var Ml = function () {
				var e = this._self._c;
				return e(
					"div",
					{ staticClass: "min-h-screen bg-gray-100 px-4 pt-6" },
					[e("router-view")],
					1
				);
			};
			function Cl(e, t, n, a, r, i, o, s) {
				var u,
					l = "function" == typeof e ? e.options : e;
				if (
					(t && ((l.render = t), (l.staticRenderFns = n), (l._compiled = !0)),
					a && (l.functional = !0),
					i && (l._scopeId = "data-v-" + i),
					o
						? ((u = function (e) {
								(e =
									e ||
									(this.$vnode && this.$vnode.ssrContext) ||
									(this.parent &&
										this.parent.$vnode &&
										this.parent.$vnode.ssrContext)) ||
									"undefined" == typeof __VUE_SSR_CONTEXT__ ||
									(e = __VUE_SSR_CONTEXT__),
									r && r.call(this, e),
									e &&
										e._registeredComponents &&
										e._registeredComponents.add(o);
						  }),
						  (l._ssrRegister = u))
						: r &&
						  (u = s
								? function () {
										r.call(
											this,
											(l.functional ? this.parent : this).$root.$options
												.shadowRoot
										);
								  }
								: r),
					u)
				)
					if (l.functional) {
						l._injectStyles = u;
						var p = l.render;
						l.render = function (e, t) {
							return u.call(t), p(e, t);
						};
					} else {
						var d = l.beforeCreate;
						l.beforeCreate = d ? [].concat(d, u) : [u];
					}
				return { exports: e, options: l };
			}
			(Ml._withStripped = !0), n(838);
			const Al = Cl({}, Ml, [], !1, null, null, null).exports;
			var El = function () {
				var e = this,
					t = e._self._c;
				return t(
					"div",
					{
						staticClass:
							"w-full space-y-10 md:max-w-screen-sm lg:max-w-screen-md mx-auto",
					},
					[
						t("HeaderBar"),
						e._v(" "),
						t(
							"div",
							{ staticClass: "pb-32" },
							[
								t("div", { staticClass: "space-y-4" }, [
									t("span", { staticClass: "text-lg" }, [
										e._v("\n        " + e._s(e.json.source) + "\n      "),
									]),
									e._v(" "),
									t("h1", { staticClass: "text-xl" }, [
										e._v("\n        " + e._s(e.json.name) + "\n      "),
									]),
									e._v(" "),
									t("h2", { staticClass: "text-lg" }, [
										e._v("\n        " + e._s(e.json.title) + "\n      "),
									]),
									e._v(" "),
									t("h2", { staticClass: "text-lg" }, [
										e._v("\n        " + e._s(e.json.author) + "\n      "),
									]),
									e._v(" "),
									t("p", [e._v(e._s(e.json.notice))]),
									e._v(" "),
									t("p", [e._v(e._s(e.json.details))]),
								]),
								e._v(" "),
								t(
									"div",
									{ staticClass: "mt-8" },
									[
										e.json.hasOwnProperty("constructor")
											? t("Member", { attrs: { json: e.json.constructor } })
											: e._e(),
									],
									1
								),
								e._v(" "),
								t(
									"div",
									{ staticClass: "mt-8" },
									[
										e.json.receive
											? t("Member", { attrs: { json: e.json.receive } })
											: e._e(),
									],
									1
								),
								e._v(" "),
								t(
									"div",
									{ staticClass: "mt-8" },
									[
										e.json.fallback
											? t("Member", { attrs: { json: e.json.fallback } })
											: e._e(),
									],
									1
								),
								e._v(" "),
								e.json.events
									? t("MemberSet", {
											attrs: { title: "Events", json: e.json.events },
									  })
									: e._e(),
								e._v(" "),
								e.json.stateVariables
									? t("MemberSet", {
											attrs: {
												title: "State Variables",
												json: e.json.stateVariables,
											},
									  })
									: e._e(),
								e._v(" "),
								e.json.methods
									? t("MemberSet", {
											attrs: { title: "Methods", json: e.json.methods },
									  })
									: e._e(),
							],
							1
						),
						e._v(" "),
						t("FooterBar"),
					],
					1
				);
			};
			El._withStripped = !0;
			var Il = function () {
				var e = this,
					t = e._self._c;
				return t(
					"div",
					{
						staticClass:
							"bg-gray-100 fixed bottom-0 right-0 w-full border-t border-dashed border-gray-300",
					},
					[
						t(
							"div",
							{
								staticClass:
									"w-full text-center py-2 md:max-w-screen-sm lg:max-w-screen-md mx-auto",
							},
							[
								t(
									"button",
									{
										staticClass: "py-1 px-2 text-gray-500",
										on: {
											click: function (t) {
												return e.openLink(e.repository);
											},
										},
									},
									[e._v("\n      built with " + e._s(e.name) + "\n    ")]
								),
							]
						),
					]
				);
			};
			Il._withStripped = !0;
			const Sl = JSON.parse(
					'{"u2":"hardhat-docgen","cj":"https://github.com/ItsNickBarry/hardhat-docgen"}'
				),
				Ol = Cl(
					{
						data: function () {
							return { repository: Sl.cj, name: Sl.u2 };
						},
						methods: {
							openLink(e) {
								window.open(e, "_blank");
							},
						},
					},
					Il,
					[],
					!1,
					null,
					null,
					null
				).exports;
			var $l = function () {
				var e = this._self._c;
				return e(
					"div",
					{ staticClass: "w-full border-b border-dashed py-2 border-gray-300" },
					[
						e(
							"router-link",
							{ staticClass: "py-2 text-gray-500", attrs: { to: "/" } },
							[this._v("\n    <- Go back\n  ")]
						),
					],
					1
				);
			};
			$l._withStripped = !0;
			const Fl = Cl({}, $l, [], !1, null, null, null).exports;
			var Dl = function () {
				var e = this,
					t = e._self._c;
				return t(
					"div",
					{ staticClass: "border-2 border-gray-400 border-dashed w-full p-2" },
					[
						t(
							"h3",
							{
								staticClass:
									"text-lg pb-2 mb-2 border-b-2 border-gray-400 border-dashed",
							},
							[
								e._v(
									"\n    " +
										e._s(e.name) +
										" " +
										e._s(e.keywords) +
										" " +
										e._s(e.inputSignature) +
										"\n  "
								),
							]
						),
						e._v(" "),
						t(
							"div",
							{ staticClass: "space-y-3" },
							[
								t("p", [e._v(e._s(e.json.notice))]),
								e._v(" "),
								t("p", [e._v(e._s(e.json.details))]),
								e._v(" "),
								t("MemberSection", {
									attrs: { name: "Parameters", items: e.inputs },
								}),
								e._v(" "),
								t("MemberSection", {
									attrs: { name: "Return Values", items: e.outputs },
								}),
							],
							1
						),
					]
				);
			};
			Dl._withStripped = !0;
			var Pl = function () {
				var e = this,
					t = e._self._c;
				return e.items.length > 0
					? t(
							"ul",
							[
								t("h4", { staticClass: "text-lg" }, [
									e._v("\n    " + e._s(e.name) + "\n  "),
								]),
								e._v(" "),
								e._l(e.items, function (n, a) {
									return t("li", { key: a }, [
										t("span", { staticClass: "bg-gray-300" }, [
											e._v(e._s(n.type)),
										]),
										e._v(" "),
										t("b", [e._v(e._s(n.name || `_${a}`))]),
										n.desc
											? t("span", [e._v(": "), t("i", [e._v(e._s(n.desc))])])
											: e._e(),
									]);
								}),
							],
							2
					  )
					: e._e();
			};
			Pl._withStripped = !0;
			const jl = {
					components: {
						MemberSection: Cl(
							{
								props: {
									name: { type: String, default: "" },
									items: { type: Array, default: () => new Array() },
								},
							},
							Pl,
							[],
							!1,
							null,
							null,
							null
						).exports,
					},
					props: { json: { type: Object, default: () => new Object() } },
					computed: {
						name: function () {
							return this.json.name || this.json.type;
						},
						keywords: function () {
							let e = [];
							return (
								this.json.stateMutability && e.push(this.json.stateMutability),
								"true" === this.json.anonymous && e.push("anonymous"),
								e.join(" ")
							);
						},
						params: function () {
							return this.json.params || {};
						},
						returns: function () {
							return this.json.returns || {};
						},
						inputs: function () {
							return (this.json.inputs || []).map((e) => ({
								...e,
								desc: this.params[e.name],
							}));
						},
						inputSignature: function () {
							return `(${this.inputs.map((e) => e.type).join(",")})`;
						},
						outputs: function () {
							return (this.json.outputs || []).map((e, t) => ({
								...e,
								desc: this.returns[e.name || `_${t}`],
							}));
						},
						outputSignature: function () {
							return `(${this.outputs.map((e) => e.type).join(",")})`;
						},
					},
				},
				Nl = Cl(jl, Dl, [], !1, null, null, null).exports;
			var Ul = function () {
				var e = this,
					t = e._self._c;
				return t(
					"div",
					{ staticClass: "w-full mt-8" },
					[
						t("h2", { staticClass: "text-lg" }, [e._v(e._s(e.title))]),
						e._v(" "),
						e._l(Object.keys(e.json), function (n) {
							return t("Member", {
								key: n,
								staticClass: "mt-3",
								attrs: { json: e.json[n] },
							});
						}),
					],
					2
				);
			};
			Ul._withStripped = !0;
			var Ll = Cl(
				{
					components: { Member: Nl },
					props: {
						title: { type: String, default: "" },
						json: { type: Object, default: () => new Object() },
					},
				},
				Ul,
				[],
				!1,
				null,
				null,
				null
			);
			const Bl = Cl(
				{
					components: {
						Member: Nl,
						MemberSet: Ll.exports,
						HeaderBar: Fl,
						FooterBar: Ol,
					},
					props: { json: { type: Object, default: () => new Object() } },
				},
				El,
				[],
				!1,
				null,
				null,
				null
			).exports;
			var ql = function () {
				var e = this,
					t = e._self._c;
				return t(
					"div",
					{
						staticClass:
							"w-full space-y-10 md:max-w-screen-sm lg:max-w-screen-md mx-auto pb-32",
					},
					[
						t("Branch", { attrs: { json: e.trees, name: "Sources:" } }),
						e._v(" "),
						t("FooterBar", { staticClass: "mt-20" }),
					],
					1
				);
			};
			ql._withStripped = !0;
			var Wl = function () {
				var e = this,
					t = e._self._c;
				return t("div", [
					e._v("\n  " + e._s(e.name) + "\n  "),
					Array.isArray(e.json)
						? t(
								"div",
								{ staticClass: "pl-5" },
								e._l(e.json, function (n, a) {
									return t(
										"div",
										{ key: a },
										[
											t(
												"router-link",
												{ attrs: { to: `${n.source}:${n.name}` } },
												[e._v("\n        " + e._s(n.name) + "\n      ")]
											),
										],
										1
									);
								}),
								0
						  )
						: t(
								"div",
								{ staticClass: "pl-5" },
								e._l(Object.keys(e.json), function (n) {
									return t(
										"div",
										{ key: n },
										[t("Branch", { attrs: { json: e.json[n], name: n } })],
										1
									);
								}),
								0
						  ),
				]);
			};
			Wl._withStripped = !0;
			var zl = Cl(
				{
					name: "Branch",
					props: {
						name: { type: String, default: null },
						json: { type: [Object, Array], default: () => new Object() },
					},
				},
				Wl,
				[],
				!1,
				null,
				null,
				null
			);
			const Vl = Cl(
				{
					components: { Branch: zl.exports, FooterBar: Ol },
					props: { json: { type: Object, default: () => new Object() } },
					computed: {
						trees: function () {
							let e = {};
							for (let t in this.json)
								t.replace("/", "//")
									.split(/\/(?=[^\/])/)
									.reduce(
										function (e, n) {
											if (!n.includes(":")) return (e[n] = e[n] || {}), e[n];
											{
												let [a] = n.split(":");
												(e[a] = e[a] || []), e[a].push(this.json[t]);
											}
										}.bind(this),
										e
									);
							return e;
						},
					},
				},
				ql,
				[],
				!1,
				null,
				null,
				null
			).exports;
			Xn.use(xl);
			const Gl = {
				"src/BurnPool.sol:BurnPool": {
					source: "src/BurnPool.sol",
					name: "BurnPool",
					title: "BurnPool contract.",
					details:
						"The owner of the contract can view who burnt already and for which service. Anyone can burn tokens from his account based upon previous approval. ",
					notice:
						"This contract accounts burning WXM tokens for getting services.",
					constructor: {
						inputs: [],
						stateMutability: "nonpayable",
						type: "constructor",
					},
					events: {
						"AdminChanged(address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "previousAdmin",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "address",
									name: "newAdmin",
									type: "address",
								},
							],
							name: "AdminChanged",
							type: "event",
							details: "Emitted when the admin account has changed.",
						},
						"BeaconUpgraded(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "beacon",
									type: "address",
								},
							],
							name: "BeaconUpgraded",
							type: "event",
							details: "Emitted when the beacon is upgraded.",
						},
						"BurnedForService(address,uint256,int256,uint256,string)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "int256",
									name: "price",
									type: "int256",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "timeStamp",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "string",
									name: "service",
									type: "string",
								},
							],
							name: "BurnedForService",
							type: "event",
							details:
								"Emitted when `from` burns a specific amount of WXM in order to receive the `service` This event will serve as a proof of burn in order to provision the `service` to the `recipient`",
						},
						"BurnedOnboardingFee(address,uint256,int256,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "int256",
									name: "price",
									type: "int256",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "timeStamp",
									type: "uint256",
								},
							],
							name: "BurnedOnboardingFee",
							type: "event",
							details:
								"Emitted when `from` burns the onboarding fee in order to oboard weatherXM stations and mint NFTs for each one This event will serve as a proof of burn in order to add the WeatherXM stations into the network",
						},
						"Initialized(uint8)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "uint8",
									name: "version",
									type: "uint8",
								},
							],
							name: "Initialized",
							type: "event",
							details:
								"Triggered when the contract has been initialized or reinitialized.",
						},
						"Paused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Paused",
							type: "event",
							details: "Emitted when the pause is triggered by `account`.",
						},
						"RoleAdminChanged(bytes32,bytes32,bytes32)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "previousAdminRole",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "newAdminRole",
									type: "bytes32",
								},
							],
							name: "RoleAdminChanged",
							type: "event",
							details:
								"Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole` `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite {RoleAdminChanged} not being emitted signaling this. _Available since v3.1._",
						},
						"RoleGranted(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleGranted",
							type: "event",
							details:
								"Emitted when `account` is granted `role`. `sender` is the account that originated the contract call, an admin role bearer except when using {AccessControl-_setupRole}.",
						},
						"RoleRevoked(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleRevoked",
							type: "event",
							details:
								"Emitted when `account` is revoked `role`. `sender` is the account that originated the contract call:   - if using `revokeRole`, it is the admin role bearer   - if using `renounceRole`, it is the role bearer (i.e. `account`)",
						},
						"Unpaused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Unpaused",
							type: "event",
							details: "Emitted when the pause is lifted by `account`.",
						},
						"Upgraded(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "implementation",
									type: "address",
								},
							],
							name: "Upgraded",
							type: "event",
							details: "Emitted when the implementation is upgraded.",
						},
					},
					methods: {
						"DEFAULT_ADMIN_ROLE()": {
							inputs: [],
							name: "DEFAULT_ADMIN_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"MANUFACTURER_ROLE()": {
							inputs: [],
							name: "MANUFACTURER_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"UPGRADER_ROLE()": {
							inputs: [],
							name: "UPGRADER_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"burnForService(uint256,string)": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{ internalType: "string", name: "service", type: "string" },
							],
							name: "burnForService",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"ERC-20 tokens require approval to be spent by third parties. The user should first approve an amount of WXM to be used by this contract. Then the following fuction transfers tokens on its address and burns them.",
							params: {
								amount: "The amount to be burned.",
								service:
									"The service identifier that the end user will receive from the billing system. ",
							},
							notice: "Burn tokens and store info about the transaction.",
						},
						"burnOnboardingFee(uint256,string)": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{ internalType: "string", name: "uri", type: "string" },
							],
							name: "burnOnboardingFee",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"ERC-20 tokens require approval to be spent by third parties. The user should first approve an amount of WXM to be used by this contract. Then the following fuction transfers tokens on its address, burns them and mints an NFT for the weather station.",
							params: {
								amount: "The amount to burn for onboarding.",
								uri: "The ipfs URI for the weather station's metadata. ",
							},
							notice: "Burn onboarding fee.",
						},
						"getRoleAdmin(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleAdmin",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.",
						},
						"getRoleMember(bytes32,uint256)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "uint256", name: "index", type: "uint256" },
							],
							name: "getRoleMember",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.",
						},
						"getRoleMemberCount(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleMemberCount",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.",
						},
						"grantRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "grantRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleGranted} event.",
						},
						"hasRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "hasRole",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "Returns `true` if `account` has been granted `role`.",
						},
						"initialize(address,address,address,address)": {
							inputs: [
								{ internalType: "address", name: "_token", type: "address" },
								{ internalType: "address", name: "_data", type: "address" },
								{
									internalType: "address",
									name: "_weatherstation",
									type: "address",
								},
								{
									internalType: "address",
									name: "_priceconsumer",
									type: "address",
								},
							],
							name: "initialize",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"On deployment, some addresses for interacting contracts should be passed.",
							params: {
								_data:
									"The address of cycle contract to be used for monitoring when burn took place.",
								_priceconsumer:
									"The contract address for the WXM price pair to track ",
								_token: "The address of WXM contract to be used for burning.",
								_weatherstation:
									"The address for WeatherStation contract to mint NFT per station when burning onboarding fee.",
							},
							notice:
								"Initialize called on deployment, initiates the contract and its proxy.",
						},
						"pause()": {
							inputs: [],
							name: "pause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details: "Only the Admin can pause the smart contract. ",
							notice: "Pause all ops in BurnPool.",
						},
						"paused()": {
							inputs: [],
							name: "paused",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns true if the contract is paused, and false otherwise.",
						},
						"priceFeed()": {
							inputs: [],
							name: "priceFeed",
							outputs: [
								{
									internalType: "contract IPriceFeedConsumer",
									name: "",
									type: "address",
								},
							],
							stateMutability: "view",
							type: "function",
						},
						"proxiableUUID()": {
							inputs: [],
							name: "proxiableUUID",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Implementation of the ERC1822 {proxiableUUID} function. This returns the storage slot used by the implementation. It is used to validate the implementation's compatibility when performing an upgrade. IMPORTANT: A proxy pointing at a proxiable contract should not be considered proxiable itself, because this risks bricking a proxy that upgrades to it, by delegating to itself until out of gas. Thus it is critical that this function revert if invoked through a proxy. This is guaranteed by the `notDelegated` modifier.",
						},
						"renounceRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "renounceRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been revoked `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`. May emit a {RoleRevoked} event.",
						},
						"revokeRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "revokeRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleRevoked} event.",
						},
						"supportsInterface(bytes4)": {
							inputs: [
								{ internalType: "bytes4", name: "interfaceId", type: "bytes4" },
							],
							name: "supportsInterface",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC165-supportsInterface}.",
						},
						"unpause()": {
							inputs: [],
							name: "unpause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details: "Only the Admin can unpause the smart contract.. ",
							notice: "Unpause all ops in BurnPool.",
						},
						"upgradeTo(address)": {
							inputs: [
								{
									internalType: "address",
									name: "newImplementation",
									type: "address",
								},
							],
							name: "upgradeTo",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Upgrade the implementation of the proxy to `newImplementation`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.",
						},
						"upgradeToAndCall(address,bytes)": {
							inputs: [
								{
									internalType: "address",
									name: "newImplementation",
									type: "address",
								},
								{ internalType: "bytes", name: "data", type: "bytes" },
							],
							name: "upgradeToAndCall",
							outputs: [],
							stateMutability: "payable",
							type: "function",
							details:
								"Upgrade the implementation of the proxy to `newImplementation`, and subsequently execute the function call encoded in `data`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.",
						},
					},
				},
				"src/PriceFeedConsumer.sol:PriceFeedConsumer": {
					source: "src/PriceFeedConsumer.sol",
					name: "PriceFeedConsumer",
					title: "The PriceFeedConsumer contract",
					details:
						"The pair for which the price is returned, is selected by the contracts address which is used in constructor The Admin can change the pair, by setting a new aggregator instance",
					notice:
						"A contract that returns latest price from Chainlink Price Feeds",
					constructor: {
						inputs: [
							{ internalType: "address", name: "_priceFeed", type: "address" },
						],
						stateMutability: "nonpayable",
						type: "constructor",
					},
					events: {
						"RoleAdminChanged(bytes32,bytes32,bytes32)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "previousAdminRole",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "newAdminRole",
									type: "bytes32",
								},
							],
							name: "RoleAdminChanged",
							type: "event",
							details:
								"Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole` `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite {RoleAdminChanged} not being emitted signaling this. _Available since v3.1._",
						},
						"RoleGranted(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleGranted",
							type: "event",
							details:
								"Emitted when `account` is granted `role`. `sender` is the account that originated the contract call, an admin role bearer except when using {AccessControl-_setupRole}.",
						},
						"RoleRevoked(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleRevoked",
							type: "event",
							details:
								"Emitted when `account` is revoked `role`. `sender` is the account that originated the contract call:   - if using `revokeRole`, it is the admin role bearer   - if using `renounceRole`, it is the role bearer (i.e. `account`)",
						},
					},
					methods: {
						"DEFAULT_ADMIN_ROLE()": {
							inputs: [],
							name: "DEFAULT_ADMIN_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"getLatestPrice()": {
							inputs: [],
							name: "getLatestPrice",
							outputs: [
								{ internalType: "int256", name: "", type: "int256" },
								{ internalType: "uint256", name: "", type: "uint256" },
							],
							stateMutability: "view",
							type: "function",
							returns: { _0: "latest price" },
							notice: "Returns the latest price",
						},
						"getPriceFeed()": {
							inputs: [],
							name: "getPriceFeed",
							outputs: [
								{
									internalType: "contract AggregatorV3Interface",
									name: "",
									type: "address",
								},
							],
							stateMutability: "view",
							type: "function",
							returns: { _0: "Price Feed address" },
							notice: "Returns the Price Feed address",
						},
						"getRoleAdmin(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleAdmin",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.",
						},
						"grantRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "grantRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleGranted} event.",
						},
						"hasRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "hasRole",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "Returns `true` if `account` has been granted `role`.",
						},
						"renounceRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "renounceRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been revoked `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`. May emit a {RoleRevoked} event.",
						},
						"revokeRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "revokeRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleRevoked} event.",
						},
						"setAggregatorInstance(address)": {
							inputs: [
								{
									internalType: "address",
									name: "_aggregatorInstance",
									type: "address",
								},
							],
							name: "setAggregatorInstance",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							params: {
								_aggregatorInstance:
									"The contract address for the WXM price pair to track ",
							},
							notice: "Change contract address to track for pricefeed.",
						},
						"supportsInterface(bytes4)": {
							inputs: [
								{ internalType: "bytes4", name: "interfaceId", type: "bytes4" },
							],
							name: "supportsInterface",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC165-supportsInterface}.",
						},
					},
				},
				"src/RewardPool.sol:RewardPool": {
					source: "src/RewardPool.sol",
					name: "RewardPool",
					title: "RewardPool contract.",
					notice: "This constract serves as a rewards allocation pool. ",
					constructor: {
						inputs: [],
						stateMutability: "nonpayable",
						type: "constructor",
					},
					events: {
						"AdminChanged(address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "previousAdmin",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "address",
									name: "newAdmin",
									type: "address",
								},
							],
							name: "AdminChanged",
							type: "event",
							details: "Emitted when the admin account has changed.",
						},
						"BeaconUpgraded(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "beacon",
									type: "address",
								},
							],
							name: "BeaconUpgraded",
							type: "event",
							details: "Emitted when the beacon is upgraded.",
						},
						"BusinessDevTokensTransferred(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
							],
							name: "BusinessDevTokensTransferred",
							type: "event",
							details:
								"Emitted when business development are transferred This event contains the target address for business development tokens and the amount",
						},
						"Claimed(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
							],
							name: "Claimed",
							type: "event",
							details:
								"Emitted when rewards are claimed by user This event contains user's address and the amount which was claimed",
						},
						"CompanyTokensTransferred(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
							],
							name: "CompanyTokensTransferred",
							type: "event",
							details:
								"Emitted when company tokens are transferred This event contains the target address for company tokens and the amount",
						},
						"Initialized(uint8)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "uint8",
									name: "version",
									type: "uint8",
								},
							],
							name: "Initialized",
							type: "event",
							details:
								"Triggered when the contract has been initialized or reinitialized.",
						},
						"Paused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Paused",
							type: "event",
							details: "Emitted when the pause is triggered by `account`.",
						},
						"RoleAdminChanged(bytes32,bytes32,bytes32)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "previousAdminRole",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "newAdminRole",
									type: "bytes32",
								},
							],
							name: "RoleAdminChanged",
							type: "event",
							details:
								"Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole` `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite {RoleAdminChanged} not being emitted signaling this. _Available since v3.1._",
						},
						"RoleGranted(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleGranted",
							type: "event",
							details:
								"Emitted when `account` is granted `role`. `sender` is the account that originated the contract call, an admin role bearer except when using {AccessControl-_setupRole}.",
						},
						"RoleRevoked(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleRevoked",
							type: "event",
							details:
								"Emitted when `account` is revoked `role`. `sender` is the account that originated the contract call:   - if using `revokeRole`, it is the admin role bearer   - if using `renounceRole`, it is the role bearer (i.e. `account`)",
						},
						"SubmittedRootHash(uint256,bytes32)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "uint256",
									name: "cycle",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "bytes32",
									name: "root",
									type: "bytes32",
								},
							],
							name: "SubmittedRootHash",
							type: "event",
							details:
								"Emitted when root hash is submitted This event contains the root hash and the cycle indicated when it was submitted",
						},
						"Unpaused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Unpaused",
							type: "event",
							details: "Emitted when the pause is lifted by `account`.",
						},
						"Upgraded(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "implementation",
									type: "address",
								},
							],
							name: "Upgraded",
							type: "event",
							details: "Emitted when the implementation is upgraded.",
						},
					},
					methods: {
						"DEFAULT_ADMIN_ROLE()": {
							inputs: [],
							name: "DEFAULT_ADMIN_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"DISTRIBUTOR_ROLE()": {
							inputs: [],
							name: "DISTRIBUTOR_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"UPGRADER_ROLE()": {
							inputs: [],
							name: "UPGRADER_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"businessDevAllocatedTokens(uint256)": {
							inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							name: "businessDevAllocatedTokens",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"businessDevTokensTarget()": {
							inputs: [],
							name: "businessDevTokensTarget",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
						},
						"claim(uint256,uint256,uint256,bytes32[])": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{
									internalType: "uint256",
									name: "totalRewards",
									type: "uint256",
								},
								{ internalType: "uint256", name: "cycle", type: "uint256" },
								{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
							],
							name: "claim",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Anyone can claim own rewards by submitting the amount and a proof. The amount should be lower or equal to the available allocated to withdraw.",
							params: {
								amount: "The amount of tokens to claim",
								cycle: "The desired cycle for which to choose the root hash",
								proof:
									"The _proof that enables the claim of the requested amount of tokens ",
								totalRewards:
									"The cumulative amount of rewards up to the point of the requested cycle",
							},
							notice: "Claim rewards.",
						},
						"claimedRewards()": {
							inputs: [],
							name: "claimedRewards",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"claims(address)": {
							inputs: [{ internalType: "address", name: "", type: "address" }],
							name: "claims",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"companyTokensTarget()": {
							inputs: [],
							name: "companyTokensTarget",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
						},
						"companyWithdrawals()": {
							inputs: [],
							name: "companyWithdrawals",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"dailyAllocatedRewards(uint256)": {
							inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							name: "dailyAllocatedRewards",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"data()": {
							inputs: [],
							name: "data",
							outputs: [
								{
									internalType: "contract WeatherXMData",
									name: "",
									type: "address",
								},
							],
							stateMutability: "view",
							type: "function",
						},
						"getRemainingAllocatedRewards(address,uint256,uint256,bytes32[])": {
							inputs: [
								{ internalType: "address", name: "account", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{ internalType: "uint256", name: "cycle", type: "uint256" },
								{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
							],
							name: "getRemainingAllocatedRewards",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							params: {
								account: "The account of the recipient",
								amount:
									"The cumulative amount of rewards up to the selected cycle",
								cycle: "cycle for which to choose the root hash",
								proof: "The recipient's proof ",
							},
							notice: "Get remaining rewards to claim.",
						},
						"getRoleAdmin(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleAdmin",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.",
						},
						"getRoleMember(bytes32,uint256)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "uint256", name: "index", type: "uint256" },
							],
							name: "getRoleMember",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.",
						},
						"getRoleMemberCount(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleMemberCount",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.",
						},
						"grantRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "grantRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleGranted} event.",
						},
						"hasRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "hasRole",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "Returns `true` if `account` has been granted `role`.",
						},
						"initialize(address,address)": {
							inputs: [
								{ internalType: "address", name: "_token", type: "address" },
								{ internalType: "address", name: "_data", type: "address" },
							],
							name: "initialize",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"latestBusinessDevWithdrawal()": {
							inputs: [],
							name: "latestBusinessDevWithdrawal",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"latestCompanyWithdrawal()": {
							inputs: [],
							name: "latestCompanyWithdrawal",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"pause()": {
							inputs: [],
							name: "pause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"paused()": {
							inputs: [],
							name: "paused",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns true if the contract is paused, and false otherwise.",
						},
						"proxiableUUID()": {
							inputs: [],
							name: "proxiableUUID",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Implementation of the ERC1822 {proxiableUUID} function. This returns the storage slot used by the implementation. It is used to validate the implementation's compatibility when performing an upgrade. IMPORTANT: A proxy pointing at a proxiable contract should not be considered proxiable itself, because this risks bricking a proxy that upgrades to it, by delegating to itself until out of gas. Thus it is critical that this function revert if invoked through a proxy. This is guaranteed by the `notDelegated` modifier.",
						},
						"renounceRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "renounceRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been revoked `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`. May emit a {RoleRevoked} event.",
						},
						"revokeRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "revokeRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleRevoked} event.",
						},
						"roots(uint256)": {
							inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							name: "roots",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"setBusinessDevTarget(address)": {
							inputs: [
								{ internalType: "address", name: "target", type: "address" },
							],
							name: "setBusinessDevTarget",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							notice:
								"Setup target address for receiving business development tokens. ",
						},
						"setCompanyTarget(address)": {
							inputs: [
								{ internalType: "address", name: "target", type: "address" },
							],
							name: "setCompanyTarget",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							notice:
								"Setup target address for receiving company and investors tokens. ",
						},
						"submitMerkleRoot(bytes32,uint256)": {
							inputs: [
								{ internalType: "bytes32", name: "root", type: "bytes32" },
								{
									internalType: "uint256",
									name: "dailyCumulativeRewards",
									type: "uint256",
								},
							],
							name: "submitMerkleRoot",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"The root hash is calculated of chain and submitted every day. The root hash is stored also off chain in order to calculate each recipient's daily proof if requested for withdrawal. The root hashes are stored in a mapping where the cycle is the accessor. For every cycle there is only one root hash.",
							params: {
								root: "The root hash containing the cumulative rewards plus the daily rewards. ",
							},
							notice: "Submit root hash for rewards.",
						},
						"supportsInterface(bytes4)": {
							inputs: [
								{ internalType: "bytes4", name: "interfaceId", type: "bytes4" },
							],
							name: "supportsInterface",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC165-supportsInterface}.",
						},
						"token()": {
							inputs: [],
							name: "token",
							outputs: [
								{
									internalType: "contract IWeatherXM",
									name: "",
									type: "address",
								},
							],
							stateMutability: "view",
							type: "function",
						},
						"totalAllocatedRewards()": {
							inputs: [],
							name: "totalAllocatedRewards",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"transferBusinessDevTokens()": {
							inputs: [],
							name: "transferBusinessDevTokens",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							notice:
								"Transfer remaining tokens from daily rewarding to business development pool. ",
						},
						"transferCompanyTokens()": {
							inputs: [],
							name: "transferCompanyTokens",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							notice: "Transfer tokens for vesting to a company pool. ",
						},
						"transferRewards(address,uint256,uint256,uint256,bytes32[])": {
							inputs: [
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{
									internalType: "uint256",
									name: "totalRewards",
									type: "uint256",
								},
								{ internalType: "uint256", name: "cycle", type: "uint256" },
								{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
							],
							name: "transferRewards",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Receives the amount and proof for a specific recipient defined by the address and transfers the rewards. The amount should be lower or equal to the available rewards to transfer.",
							params: {
								amount: "The amount to transfer (in WEI)",
								cycle: "The desired cycle for which to choose the root hash",
								proof:
									"The _proof that enables the claim of the requested amount of tokens ",
								to: "The recipient's address",
								totalRewards:
									"The cumulative amount of rewards up to the point of the requested cycle",
							},
							notice: "Transfer rewards to a recipient.",
						},
						"unpause()": {
							inputs: [],
							name: "unpause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"upgradeTo(address)": {
							inputs: [
								{
									internalType: "address",
									name: "newImplementation",
									type: "address",
								},
							],
							name: "upgradeTo",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Upgrade the implementation of the proxy to `newImplementation`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.",
						},
						"upgradeToAndCall(address,bytes)": {
							inputs: [
								{
									internalType: "address",
									name: "newImplementation",
									type: "address",
								},
								{ internalType: "bytes", name: "data", type: "bytes" },
							],
							name: "upgradeToAndCall",
							outputs: [],
							stateMutability: "payable",
							type: "function",
							details:
								"Upgrade the implementation of the proxy to `newImplementation`, and subsequently execute the function call encoded in `data`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.",
						},
					},
				},
				"src/WeatherXMStation.sol:WeatherXMStation": {
					source: "src/WeatherXMStation.sol",
					name: "WeatherXMStation",
					constructor: {
						inputs: [
							{ internalType: "string", name: "name", type: "string" },
							{ internalType: "string", name: "symbol", type: "string" },
						],
						stateMutability: "nonpayable",
						type: "constructor",
					},
					events: {
						"Approval(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "owner",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "approved",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "Approval",
							type: "event",
							details:
								"Emitted when `owner` enables `approved` to manage the `tokenId` token.",
						},
						"ApprovalForAll(address,address,bool)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "owner",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "operator",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "bool",
									name: "approved",
									type: "bool",
								},
							],
							name: "ApprovalForAll",
							type: "event",
							details:
								"Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.",
						},
						"Paused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Paused",
							type: "event",
							details: "Emitted when the pause is triggered by `account`.",
						},
						"RoleAdminChanged(bytes32,bytes32,bytes32)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "previousAdminRole",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "newAdminRole",
									type: "bytes32",
								},
							],
							name: "RoleAdminChanged",
							type: "event",
							details:
								"Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole` `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite {RoleAdminChanged} not being emitted signaling this. _Available since v3.1._",
						},
						"RoleGranted(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleGranted",
							type: "event",
							details:
								"Emitted when `account` is granted `role`. `sender` is the account that originated the contract call, an admin role bearer except when using {AccessControl-_setupRole}.",
						},
						"RoleRevoked(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleRevoked",
							type: "event",
							details:
								"Emitted when `account` is revoked `role`. `sender` is the account that originated the contract call:   - if using `revokeRole`, it is the admin role bearer   - if using `renounceRole`, it is the role bearer (i.e. `account`)",
						},
						"Transfer(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "Transfer",
							type: "event",
							details:
								"Emitted when `tokenId` token is transferred from `from` to `to`.",
						},
						"Unpaused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Unpaused",
							type: "event",
							details: "Emitted when the pause is lifted by `account`.",
						},
						"WeatherStationBurned(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "WeatherStationBurned",
							type: "event",
							details:
								"Emitted when a user burns the NFT and this actions is triggered when the weather station is removed from network This event contains the origin caller address and the token ID for the NFT in focus",
						},
						"WeatherStationClaimed(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "WeatherStationClaimed",
							type: "event",
							details:
								"Emitted when a user claims a weather station and its NFT This event contains the origin caller address and the token ID for the NFT in focus",
						},
						"WeatherStationOnboarded(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "WeatherStationOnboarded",
							type: "event",
							details:
								"Emitted when manufacturer burns onboarding fee and mints an NFT per station This event contains the origin caller address and the token ID for the NFT",
						},
						"WeatherStationTransfered(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "WeatherStationTransfered",
							type: "event",
							details:
								"Emitted when a user transfers ownership of a weather station and its NFT This event contains the origin caller address and the token ID for the NFT in focus",
						},
					},
					methods: {
						"DEFAULT_ADMIN_ROLE()": {
							inputs: [],
							name: "DEFAULT_ADMIN_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"MANUFACTURER_ROLE()": {
							inputs: [],
							name: "MANUFACTURER_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"PROVISIONER_ROLE()": {
							inputs: [],
							name: "PROVISIONER_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							notice:
								"The PROVISIONER_ROLE is assigned to the BurnPool Contract.  ",
						},
						"approve(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "approve",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details: "See {IERC721-approve}.",
						},
						"balanceOf(address)": {
							inputs: [
								{ internalType: "address", name: "owner", type: "address" },
							],
							name: "balanceOf",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC721-balanceOf}.",
						},
						"burn(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "burn",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"exchangeWeatherStations(uint256,uint256)": {
							inputs: [
								{ internalType: "uint256", name: "_tokenId1", type: "uint256" },
								{ internalType: "uint256", name: "_tokenId2", type: "uint256" },
							],
							name: "exchangeWeatherStations",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
						},
						"getApproved(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "getApproved",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC721-getApproved}.",
						},
						"getRoleAdmin(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleAdmin",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.",
						},
						"grantRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "grantRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleGranted} event.",
						},
						"hasRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "hasRole",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "Returns `true` if `account` has been granted `role`.",
						},
						"isApprovedForAll(address,address)": {
							inputs: [
								{ internalType: "address", name: "owner", type: "address" },
								{ internalType: "address", name: "operator", type: "address" },
							],
							name: "isApprovedForAll",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC721-isApprovedForAll}.",
						},
						"mintWeatherStation(address,string)": {
							inputs: [
								{ internalType: "address", name: "recipient", type: "address" },
								{ internalType: "string", name: "uri", type: "string" },
							],
							name: "mintWeatherStation",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
						},
						"name()": {
							inputs: [],
							name: "name",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC721Metadata-name}.",
						},
						"ownerOf(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "ownerOf",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC721-ownerOf}.",
						},
						"pause()": {
							inputs: [],
							name: "pause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"paused()": {
							inputs: [],
							name: "paused",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns true if the contract is paused, and false otherwise.",
						},
						"renounceRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "renounceRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been revoked `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`. May emit a {RoleRevoked} event.",
						},
						"revokeRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "revokeRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleRevoked} event.",
						},
						"safeTransferFrom(address,address,uint256)": {
							inputs: [
								{ internalType: "address", name: "from", type: "address" },
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "safeTransferFrom",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details: "See {IERC721-safeTransferFrom}.",
						},
						"safeTransferFrom(address,address,uint256,bytes)": {
							inputs: [
								{ internalType: "address", name: "from", type: "address" },
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
								{ internalType: "bytes", name: "data", type: "bytes" },
							],
							name: "safeTransferFrom",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details: "See {IERC721-safeTransferFrom}.",
						},
						"setApprovalForAll(address,bool)": {
							inputs: [
								{ internalType: "address", name: "operator", type: "address" },
								{ internalType: "bool", name: "approved", type: "bool" },
							],
							name: "setApprovalForAll",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details: "See {IERC721-setApprovalForAll}.",
						},
						"supportsInterface(bytes4)": {
							inputs: [
								{ internalType: "bytes4", name: "interfaceId", type: "bytes4" },
							],
							name: "supportsInterface",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
						},
						"symbol()": {
							inputs: [],
							name: "symbol",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC721Metadata-symbol}.",
						},
						"tokenByIndex(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "index", type: "uint256" },
							],
							name: "tokenByIndex",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC721Enumerable-tokenByIndex}.",
						},
						"tokenOfOwnerByIndex(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "owner", type: "address" },
								{ internalType: "uint256", name: "index", type: "uint256" },
							],
							name: "tokenOfOwnerByIndex",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC721Enumerable-tokenOfOwnerByIndex}.",
						},
						"tokenURI(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "tokenURI",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "view",
							type: "function",
						},
						"totalSupply()": {
							inputs: [],
							name: "totalSupply",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC721Enumerable-totalSupply}.",
						},
						"transferFrom(address,address,uint256)": {
							inputs: [
								{ internalType: "address", name: "from", type: "address" },
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "transferFrom",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details: "See {IERC721-transferFrom}.",
						},
						"transferWeatherStation(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "transferWeatherStation",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
						},
						"unpause()": {
							inputs: [],
							name: "unpause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
					},
				},
				"src/WeatherXM.sol:WeatherXM": {
					source: "src/WeatherXM.sol",
					name: "WeatherXM",
					constructor: {
						inputs: [
							{ internalType: "string", name: "_name", type: "string" },
							{ internalType: "string", name: "_symbol", type: "string" },
							{ internalType: "address", name: "_address", type: "address" },
						],
						stateMutability: "nonpayable",
						type: "constructor",
					},
					events: {
						"Approval(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "owner",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "spender",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "value",
									type: "uint256",
								},
							],
							name: "Approval",
							type: "event",
							details:
								"Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance.",
						},
						"CycleBegan(uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "uint256",
									name: "cycle",
									type: "uint256",
								},
							],
							name: "CycleBegan",
							type: "event",
							details:
								"Emitted when a cycle is initiated with every mint This event contains the new cycle",
						},
						"OwnershipTransferred(address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "previousOwner",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "newOwner",
									type: "address",
								},
							],
							name: "OwnershipTransferred",
							type: "event",
						},
						"Paused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Paused",
							type: "event",
							details: "Emitted when the pause is triggered by `account`.",
						},
						"Transfer(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "value",
									type: "uint256",
								},
							],
							name: "Transfer",
							type: "event",
							details:
								"Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.",
						},
						"Unpaused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Unpaused",
							type: "event",
							details: "Emitted when the pause is lifted by `account`.",
						},
					},
					methods: {
						"allowance(address,address)": {
							inputs: [
								{ internalType: "address", name: "owner", type: "address" },
								{ internalType: "address", name: "spender", type: "address" },
							],
							name: "allowance",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC20-allowance}.",
						},
						"approve(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "spender", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "approve",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"See {IERC20-approve}. NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.",
						},
						"balanceOf(address)": {
							inputs: [
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "balanceOf",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC20-balanceOf}.",
						},
						"burn(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "burn",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"burnFrom(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "account", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "burnFrom",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"companyCap2y()": {
							inputs: [],
							name: "companyCap2y",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"companyCap3y()": {
							inputs: [],
							name: "companyCap3y",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"cycle()": {
							inputs: [],
							name: "cycle",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"decimals()": {
							inputs: [],
							name: "decimals",
							outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the value {ERC20} uses, unless this function is overridden; NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.",
						},
						"decreaseAllowance(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "spender", type: "address" },
								{
									internalType: "uint256",
									name: "subtractedValue",
									type: "uint256",
								},
							],
							name: "decreaseAllowance",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Atomically decreases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`.",
						},
						"getCycle()": {
							inputs: [],
							name: "getCycle",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"getMintedTokens()": {
							inputs: [],
							name: "getMintedTokens",
							outputs: [
								{ internalType: "uint256", name: "", type: "uint256" },
								{ internalType: "uint256", name: "", type: "uint256" },
							],
							stateMutability: "view",
							type: "function",
						},
						"increaseAllowance(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "spender", type: "address" },
								{
									internalType: "uint256",
									name: "addedValue",
									type: "uint256",
								},
							],
							name: "increaseAllowance",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Atomically increases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address.",
						},
						"initialAmount()": {
							inputs: [],
							name: "initialAmount",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"mint()": {
							inputs: [],
							name: "mint",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"mintTarget()": {
							inputs: [],
							name: "mintTarget",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
						},
						"mintedCompanyTokens()": {
							inputs: [],
							name: "mintedCompanyTokens",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"mintedRewardTokens()": {
							inputs: [],
							name: "mintedRewardTokens",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"name()": {
							inputs: [],
							name: "name",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "view",
							type: "function",
							details: "Returns the name of the token.",
						},
						"owner()": {
							inputs: [],
							name: "owner",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
							details: "Returns the address of the current owner.",
						},
						"pause()": {
							inputs: [],
							name: "pause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"paused()": {
							inputs: [],
							name: "paused",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns true if the contract is paused, and false otherwise.",
						},
						"renounceOwnership()": {
							inputs: [],
							name: "renounceOwnership",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.",
						},
						"rewardCap()": {
							inputs: [],
							name: "rewardCap",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"setMintTarget(address)": {
							inputs: [
								{ internalType: "address", name: "target", type: "address" },
							],
							name: "setMintTarget",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"symbol()": {
							inputs: [],
							name: "symbol",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the symbol of the token, usually a shorter version of the name.",
						},
						"totalSupply()": {
							inputs: [],
							name: "totalSupply",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC20-totalSupply}.",
						},
						"transfer(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "transfer",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `amount`.",
						},
						"transferFrom(address,address,uint256)": {
							inputs: [
								{ internalType: "address", name: "from", type: "address" },
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "transferFrom",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"See {IERC20-transferFrom}. Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `amount`. - the caller must have allowance for ``from``'s tokens of at least `amount`.",
						},
						"transferOwnership(address)": {
							inputs: [
								{ internalType: "address", name: "newOwner", type: "address" },
							],
							name: "transferOwnership",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.",
						},
						"unpause()": {
							inputs: [],
							name: "unpause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
					},
				},
				"src/WeatherXMData.sol:WeatherXMData": {
					source: "src/WeatherXMData.sol",
					name: "WeatherXMData",
					constructor: {
						inputs: [],
						stateMutability: "nonpayable",
						type: "constructor",
					},
					events: {
						"AdminChanged(address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "previousAdmin",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "address",
									name: "newAdmin",
									type: "address",
								},
							],
							name: "AdminChanged",
							type: "event",
							details: "Emitted when the admin account has changed.",
						},
						"BeaconUpgraded(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "beacon",
									type: "address",
								},
							],
							name: "BeaconUpgraded",
							type: "event",
							details: "Emitted when the beacon is upgraded.",
						},
						"Initialized(uint8)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "uint8",
									name: "version",
									type: "uint8",
								},
							],
							name: "Initialized",
							type: "event",
							details:
								"Triggered when the contract has been initialized or reinitialized.",
						},
						"OwnershipTransferred(address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "previousOwner",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "newOwner",
									type: "address",
								},
							],
							name: "OwnershipTransferred",
							type: "event",
						},
						"Upgraded(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "implementation",
									type: "address",
								},
							],
							name: "Upgraded",
							type: "event",
							details: "Emitted when the implementation is upgraded.",
						},
					},
					methods: {
						"dailyCompanyMint(uint256)": {
							inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							name: "dailyCompanyMint",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"dailyRewardMint(uint256)": {
							inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							name: "dailyRewardMint",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"initialize()": {
							inputs: [],
							name: "initialize",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"owner()": {
							inputs: [],
							name: "owner",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
							details: "Returns the address of the current owner.",
						},
						"proxiableUUID()": {
							inputs: [],
							name: "proxiableUUID",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Implementation of the ERC1822 {proxiableUUID} function. This returns the storage slot used by the implementation. It is used to validate the implementation's compatibility when performing an upgrade. IMPORTANT: A proxy pointing at a proxiable contract should not be considered proxiable itself, because this risks bricking a proxy that upgrades to it, by delegating to itself until out of gas. Thus it is critical that this function revert if invoked through a proxy. This is guaranteed by the `notDelegated` modifier.",
						},
						"renounceOwnership()": {
							inputs: [],
							name: "renounceOwnership",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.",
						},
						"transferOwnership(address)": {
							inputs: [
								{ internalType: "address", name: "newOwner", type: "address" },
							],
							name: "transferOwnership",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.",
						},
						"updateDailyCompanyMints(uint256,uint256)": {
							inputs: [
								{ internalType: "uint256", name: "_cycle", type: "uint256" },
								{ internalType: "uint256", name: "_amount", type: "uint256" },
							],
							name: "updateDailyCompanyMints",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"updateDailyRewardMints(uint256,uint256)": {
							inputs: [
								{ internalType: "uint256", name: "_cycle", type: "uint256" },
								{ internalType: "uint256", name: "_amount", type: "uint256" },
							],
							name: "updateDailyRewardMints",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"upgradeTo(address)": {
							inputs: [
								{
									internalType: "address",
									name: "newImplementation",
									type: "address",
								},
							],
							name: "upgradeTo",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Upgrade the implementation of the proxy to `newImplementation`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.",
						},
						"upgradeToAndCall(address,bytes)": {
							inputs: [
								{
									internalType: "address",
									name: "newImplementation",
									type: "address",
								},
								{ internalType: "bytes", name: "data", type: "bytes" },
							],
							name: "upgradeToAndCall",
							outputs: [],
							stateMutability: "payable",
							type: "function",
							details:
								"Upgrade the implementation of the proxy to `newImplementation`, and subsequently execute the function call encoded in `data`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.",
						},
					},
				},
				"src/interfaces/IBurnPool.sol:IBurnPool": {
					source: "src/interfaces/IBurnPool.sol",
					name: "IBurnPool",
					events: {
						"BurnedForService(address,uint256,int256,uint256,string)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "int256",
									name: "price",
									type: "int256",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "timeStamp",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "string",
									name: "service",
									type: "string",
								},
							],
							name: "BurnedForService",
							type: "event",
							details:
								"Emitted when `from` burns a specific amount of WXM in order to receive the `service` This event will serve as a proof of burn in order to provision the `service` to the `recipient`",
						},
						"BurnedOnboardingFee(address,uint256,int256,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "int256",
									name: "price",
									type: "int256",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "timeStamp",
									type: "uint256",
								},
							],
							name: "BurnedOnboardingFee",
							type: "event",
							details:
								"Emitted when `from` burns the onboarding fee in order to oboard weatherXM stations and mint NFTs for each one This event will serve as a proof of burn in order to add the WeatherXM stations into the network",
						},
					},
					methods: {
						"burnForService(uint256,string)": {
							inputs: [
								{ internalType: "uint256", name: "_amount", type: "uint256" },
								{ internalType: "string", name: "service", type: "string" },
							],
							name: "burnForService",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"burnOnboardingFee(uint256,string)": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{ internalType: "string", name: "uri", type: "string" },
							],
							name: "burnOnboardingFee",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
						},
					},
				},
				"src/interfaces/IPriceFeedConsumer.sol:IPriceFeedConsumer": {
					source: "src/interfaces/IPriceFeedConsumer.sol",
					name: "IPriceFeedConsumer",
					methods: {
						"getLatestPrice()": {
							inputs: [],
							name: "getLatestPrice",
							outputs: [
								{ internalType: "int256", name: "", type: "int256" },
								{ internalType: "uint256", name: "", type: "uint256" },
							],
							stateMutability: "view",
							type: "function",
							details: "View function that returns latest price.",
						},
						"getPriceFeed()": {
							inputs: [],
							name: "getPriceFeed",
							outputs: [
								{
									internalType: "contract AggregatorV3Interface",
									name: "",
									type: "address",
								},
							],
							stateMutability: "view",
							type: "function",
							details: "View function returns aggragator instance.",
						},
						"setAggregatorInstance(address)": {
							inputs: [
								{
									internalType: "address",
									name: "_aggregatorInstance",
									type: "address",
								},
							],
							name: "setAggregatorInstance",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Mutative function that enables aggregator instance change.",
						},
					},
				},
				"src/interfaces/IRewardPool.sol:IRewardPool": {
					source: "src/interfaces/IRewardPool.sol",
					name: "IRewardPool",
					events: {
						"BusinessDevTokensTransferred(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
							],
							name: "BusinessDevTokensTransferred",
							type: "event",
							details:
								"Emitted when business development are transferred This event contains the target address for business development tokens and the amount",
						},
						"Claimed(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
							],
							name: "Claimed",
							type: "event",
							details:
								"Emitted when rewards are claimed by user This event contains user's address and the amount which was claimed",
						},
						"CompanyTokensTransferred(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
							],
							name: "CompanyTokensTransferred",
							type: "event",
							details:
								"Emitted when company tokens are transferred This event contains the target address for company tokens and the amount",
						},
						"SubmittedRootHash(uint256,bytes32)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "uint256",
									name: "cycle",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "bytes32",
									name: "root",
									type: "bytes32",
								},
							],
							name: "SubmittedRootHash",
							type: "event",
							details:
								"Emitted when root hash is submitted This event contains the root hash and the cycle indicated when it was submitted",
						},
					},
					methods: {
						"claim(uint256,uint256,uint256,bytes32[])": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{
									internalType: "uint256",
									name: "totalRewards",
									type: "uint256",
								},
								{ internalType: "uint256", name: "cycle", type: "uint256" },
								{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
							],
							name: "claim",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"getRemainingAllocatedRewards(address,uint256,uint256,bytes32[])": {
							inputs: [
								{ internalType: "address", name: "account", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{ internalType: "uint256", name: "cycle", type: "uint256" },
								{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
							],
							name: "getRemainingAllocatedRewards",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"pause()": {
							inputs: [],
							name: "pause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"setBusinessDevTarget(address)": {
							inputs: [
								{ internalType: "address", name: "target", type: "address" },
							],
							name: "setBusinessDevTarget",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"setCompanyTarget(address)": {
							inputs: [
								{ internalType: "address", name: "target", type: "address" },
							],
							name: "setCompanyTarget",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"submitMerkleRoot(bytes32,uint256)": {
							inputs: [
								{ internalType: "bytes32", name: "root", type: "bytes32" },
								{
									internalType: "uint256",
									name: "dailyTotalRewards",
									type: "uint256",
								},
							],
							name: "submitMerkleRoot",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
						},
						"transferBusinessDevTokens()": {
							inputs: [],
							name: "transferBusinessDevTokens",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"transferCompanyTokens()": {
							inputs: [],
							name: "transferCompanyTokens",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"transferRewards(address,uint256,uint256,uint256,bytes32[])": {
							inputs: [
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{
									internalType: "uint256",
									name: "totalRewards",
									type: "uint256",
								},
								{ internalType: "uint256", name: "cycle", type: "uint256" },
								{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
							],
							name: "transferRewards",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
						},
						"unpause()": {
							inputs: [],
							name: "unpause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
					},
				},
				"src/interfaces/IWeatherXMStation.sol:IWeatherXMStation": {
					source: "src/interfaces/IWeatherXMStation.sol",
					name: "IWeatherXMStation",
					events: {
						"Approval(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "owner",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "approved",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "Approval",
							type: "event",
							details:
								"Emitted when `owner` enables `approved` to manage the `tokenId` token.",
						},
						"ApprovalForAll(address,address,bool)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "owner",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "operator",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "bool",
									name: "approved",
									type: "bool",
								},
							],
							name: "ApprovalForAll",
							type: "event",
							details:
								"Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.",
						},
						"RoleAdminChanged(bytes32,bytes32,bytes32)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "previousAdminRole",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "newAdminRole",
									type: "bytes32",
								},
							],
							name: "RoleAdminChanged",
							type: "event",
							details:
								"Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole` `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite {RoleAdminChanged} not being emitted signaling this. _Available since v3.1._",
						},
						"RoleGranted(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleGranted",
							type: "event",
							details:
								"Emitted when `account` is granted `role`. `sender` is the account that originated the contract call, an admin role bearer except when using {AccessControl-_setupRole}.",
						},
						"RoleRevoked(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleRevoked",
							type: "event",
							details:
								"Emitted when `account` is revoked `role`. `sender` is the account that originated the contract call:   - if using `revokeRole`, it is the admin role bearer   - if using `renounceRole`, it is the role bearer (i.e. `account`)",
						},
						"Transfer(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "Transfer",
							type: "event",
							details:
								"Emitted when `tokenId` token is transferred from `from` to `to`.",
						},
						"WeatherStationBurned(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "WeatherStationBurned",
							type: "event",
							details:
								"Emitted when a user burns the NFT and this actions is triggered when the weather station is removed from network This event contains the origin caller address and the token ID for the NFT in focus",
						},
						"WeatherStationClaimed(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "WeatherStationClaimed",
							type: "event",
							details:
								"Emitted when a user claims a weather station and its NFT This event contains the origin caller address and the token ID for the NFT in focus",
						},
						"WeatherStationOnboarded(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "WeatherStationOnboarded",
							type: "event",
							details:
								"Emitted when manufacturer burns onboarding fee and mints an NFT per station This event contains the origin caller address and the token ID for the NFT",
						},
						"WeatherStationTransfered(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "tokenId",
									type: "uint256",
								},
							],
							name: "WeatherStationTransfered",
							type: "event",
							details:
								"Emitted when a user transfers ownership of a weather station and its NFT This event contains the origin caller address and the token ID for the NFT in focus",
						},
					},
					methods: {
						"approve(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "approve",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Gives permission to `to` to transfer `tokenId` token to another account. The approval is cleared when the token is transferred. Only a single account can be approved at a time, so approving the zero address clears previous approvals. Requirements: - The caller must own the token or be an approved operator. - `tokenId` must exist. Emits an {Approval} event.",
						},
						"balanceOf(address)": {
							inputs: [
								{ internalType: "address", name: "owner", type: "address" },
							],
							name: "balanceOf",
							outputs: [
								{ internalType: "uint256", name: "balance", type: "uint256" },
							],
							stateMutability: "view",
							type: "function",
							details: "Returns the number of tokens in ``owner``'s account.",
						},
						"burn(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "burn",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"exchangeWeatherStations(uint256,uint256)": {
							inputs: [
								{ internalType: "uint256", name: "_tokenId1", type: "uint256" },
								{ internalType: "uint256", name: "_tokenId2", type: "uint256" },
							],
							name: "exchangeWeatherStations",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
						},
						"getApproved(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "getApproved",
							outputs: [
								{ internalType: "address", name: "operator", type: "address" },
							],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the account approved for `tokenId` token. Requirements: - `tokenId` must exist.",
						},
						"getRoleAdmin(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleAdmin",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {AccessControl-_setRoleAdmin}.",
						},
						"grantRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "grantRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.",
						},
						"hasRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "hasRole",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "Returns `true` if `account` has been granted `role`.",
						},
						"isApprovedForAll(address,address)": {
							inputs: [
								{ internalType: "address", name: "owner", type: "address" },
								{ internalType: "address", name: "operator", type: "address" },
							],
							name: "isApprovedForAll",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns if the `operator` is allowed to manage all of the assets of `owner`. See {setApprovalForAll}",
						},
						"mintWeatherStation(address,string)": {
							inputs: [
								{ internalType: "address", name: "recipient", type: "address" },
								{ internalType: "string", name: "uri", type: "string" },
							],
							name: "mintWeatherStation",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
						},
						"ownerOf(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "ownerOf",
							outputs: [
								{ internalType: "address", name: "owner", type: "address" },
							],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the owner of the `tokenId` token. Requirements: - `tokenId` must exist.",
						},
						"pause()": {
							inputs: [],
							name: "pause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"renounceRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "renounceRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.",
						},
						"revokeRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "revokeRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.",
						},
						"safeTransferFrom(address,address,uint256)": {
							inputs: [
								{ internalType: "address", name: "from", type: "address" },
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "safeTransferFrom",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients are aware of the ERC721 protocol to prevent tokens from being forever locked. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must exist and be owned by `from`. - If the caller is not `from`, it must have been allowed to move this token by either {approve} or {setApprovalForAll}. - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer. Emits a {Transfer} event.",
						},
						"safeTransferFrom(address,address,uint256,bytes)": {
							inputs: [
								{ internalType: "address", name: "from", type: "address" },
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
								{ internalType: "bytes", name: "data", type: "bytes" },
							],
							name: "safeTransferFrom",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Safely transfers `tokenId` token from `from` to `to`. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must exist and be owned by `from`. - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}. - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer. Emits a {Transfer} event.",
						},
						"setApprovalForAll(address,bool)": {
							inputs: [
								{ internalType: "address", name: "operator", type: "address" },
								{ internalType: "bool", name: "_approved", type: "bool" },
							],
							name: "setApprovalForAll",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Approve or remove `operator` as an operator for the caller. Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller. Requirements: - The `operator` cannot be the caller. Emits an {ApprovalForAll} event.",
						},
						"supportsInterface(bytes4)": {
							inputs: [
								{ internalType: "bytes4", name: "interfaceId", type: "bytes4" },
							],
							name: "supportsInterface",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section] to learn more about how these ids are created. This function call must use less than 30 000 gas.",
						},
						"tokenByIndex(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "index", type: "uint256" },
							],
							name: "tokenByIndex",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns a token ID at a given `index` of all the tokens stored by the contract. Use along with {totalSupply} to enumerate all tokens.",
						},
						"tokenOfOwnerByIndex(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "owner", type: "address" },
								{ internalType: "uint256", name: "index", type: "uint256" },
							],
							name: "tokenOfOwnerByIndex",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns a token ID owned by `owner` at a given `index` of its token list. Use along with {balanceOf} to enumerate all of ``owner``'s tokens.",
						},
						"totalSupply()": {
							inputs: [],
							name: "totalSupply",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the total amount of tokens stored by the contract.",
						},
						"transferFrom(address,address,uint256)": {
							inputs: [
								{ internalType: "address", name: "from", type: "address" },
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "transferFrom",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Transfers `tokenId` token from `from` to `to`. WARNING: Note that the caller is responsible to confirm that the recipient is capable of receiving ERC721 or else they may be permanently lost. Usage of {safeTransferFrom} prevents loss, though the caller must understand this adds an external call which potentially creates a reentrancy vulnerability. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must be owned by `from`. - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}. Emits a {Transfer} event.",
						},
						"transferWeatherStation(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "tokenId", type: "uint256" },
							],
							name: "transferWeatherStation",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
						},
						"unpause()": {
							inputs: [],
							name: "unpause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
					},
				},
				"src/interfaces/IWeatherXM.sol:IWeatherXM": {
					source: "src/interfaces/IWeatherXM.sol",
					name: "IWeatherXM",
					events: {
						"Approval(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "owner",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "spender",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "value",
									type: "uint256",
								},
							],
							name: "Approval",
							type: "event",
							details:
								"Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance.",
						},
						"CycleBegan(uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "uint256",
									name: "cycle",
									type: "uint256",
								},
							],
							name: "CycleBegan",
							type: "event",
							details:
								"Emitted when a cycle is initiated with every mint This event contains the new cycle",
						},
						"Transfer(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "value",
									type: "uint256",
								},
							],
							name: "Transfer",
							type: "event",
							details:
								"Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.",
						},
					},
					methods: {
						"allowance(address,address)": {
							inputs: [
								{ internalType: "address", name: "owner", type: "address" },
								{ internalType: "address", name: "spender", type: "address" },
							],
							name: "allowance",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.",
						},
						"approve(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "spender", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "approve",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.",
						},
						"balanceOf(address)": {
							inputs: [
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "balanceOf",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "Returns the amount of tokens owned by `account`.",
						},
						"burn(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "burn",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"burnFrom(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "account", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "burnFrom",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"decimals()": {
							inputs: [],
							name: "decimals",
							outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
							stateMutability: "view",
							type: "function",
							details: "Returns the decimals places of the token.",
						},
						"getCycle()": {
							inputs: [],
							name: "getCycle",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "nonpayable",
							type: "function",
						},
						"getMintedTokens()": {
							inputs: [],
							name: "getMintedTokens",
							outputs: [
								{ internalType: "uint256", name: "", type: "uint256" },
								{ internalType: "uint256", name: "", type: "uint256" },
							],
							stateMutability: "view",
							type: "function",
						},
						"mint()": {
							inputs: [],
							name: "mint",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"name()": {
							inputs: [],
							name: "name",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "view",
							type: "function",
							details: "Returns the name of the token.",
						},
						"pause()": {
							inputs: [],
							name: "pause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"setMintTarget(address)": {
							inputs: [
								{ internalType: "address", name: "target", type: "address" },
							],
							name: "setMintTarget",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"symbol()": {
							inputs: [],
							name: "symbol",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "view",
							type: "function",
							details: "Returns the symbol of the token.",
						},
						"totalSupply()": {
							inputs: [],
							name: "totalSupply",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "Returns the amount of tokens in existence.",
						},
						"transfer(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "transfer",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Moves `amount` tokens from the caller's account to `to`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.",
						},
						"transferFrom(address,address,uint256)": {
							inputs: [
								{ internalType: "address", name: "from", type: "address" },
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "transferFrom",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Moves `amount` tokens from `from` to `to` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.",
						},
						"unpause()": {
							inputs: [],
							name: "unpause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
					},
				},
				"src/mocks/oracle/MockV3Aggregator.sol:MockV3Aggregator": {
					source: "src/mocks/oracle/MockV3Aggregator.sol",
					name: "MockV3Aggregator",
					title: "MockV3Aggregator",
					notice:
						"Based on the FluxAggregator contractUse this contract when you need to test other contract's ability to read data from an aggregator contract, but how the aggregator got its answer is unimportant",
					constructor: {
						inputs: [
							{ internalType: "uint8", name: "_decimals", type: "uint8" },
							{
								internalType: "int256",
								name: "_initialAnswer",
								type: "int256",
							},
						],
						stateMutability: "nonpayable",
						type: "constructor",
					},
					methods: {
						"decimals()": {
							inputs: [],
							name: "decimals",
							outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
							stateMutability: "view",
							type: "function",
						},
						"description()": {
							inputs: [],
							name: "description",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "pure",
							type: "function",
						},
						"getAnswer(uint256)": {
							inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							name: "getAnswer",
							outputs: [{ internalType: "int256", name: "", type: "int256" }],
							stateMutability: "view",
							type: "function",
						},
						"getRoundData(uint80)": {
							inputs: [
								{ internalType: "uint80", name: "_roundId", type: "uint80" },
							],
							name: "getRoundData",
							outputs: [
								{ internalType: "uint80", name: "roundId", type: "uint80" },
								{ internalType: "int256", name: "answer", type: "int256" },
								{ internalType: "uint256", name: "startedAt", type: "uint256" },
								{ internalType: "uint256", name: "updatedAt", type: "uint256" },
								{
									internalType: "uint80",
									name: "answeredInRound",
									type: "uint80",
								},
							],
							stateMutability: "view",
							type: "function",
						},
						"getTimestamp(uint256)": {
							inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							name: "getTimestamp",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"latestAnswer()": {
							inputs: [],
							name: "latestAnswer",
							outputs: [{ internalType: "int256", name: "", type: "int256" }],
							stateMutability: "view",
							type: "function",
						},
						"latestRound()": {
							inputs: [],
							name: "latestRound",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"latestRoundData()": {
							inputs: [],
							name: "latestRoundData",
							outputs: [
								{ internalType: "uint80", name: "roundId", type: "uint80" },
								{ internalType: "int256", name: "answer", type: "int256" },
								{ internalType: "uint256", name: "startedAt", type: "uint256" },
								{ internalType: "uint256", name: "updatedAt", type: "uint256" },
								{
									internalType: "uint80",
									name: "answeredInRound",
									type: "uint80",
								},
							],
							stateMutability: "view",
							type: "function",
						},
						"latestTimestamp()": {
							inputs: [],
							name: "latestTimestamp",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"test()": {
							inputs: [],
							name: "test",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"updateAnswer(int256)": {
							inputs: [
								{ internalType: "int256", name: "_answer", type: "int256" },
							],
							name: "updateAnswer",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"updateRoundData(uint80,int256,uint256,uint256)": {
							inputs: [
								{ internalType: "uint80", name: "_roundId", type: "uint80" },
								{ internalType: "int256", name: "_answer", type: "int256" },
								{
									internalType: "uint256",
									name: "_timestamp",
									type: "uint256",
								},
								{
									internalType: "uint256",
									name: "_startedAt",
									type: "uint256",
								},
							],
							name: "updateRoundData",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"version()": {
							inputs: [],
							name: "version",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
					},
				},
				"src/mocks/token/MintableERC20.sol:MintableERC20": {
					source: "src/mocks/token/MintableERC20.sol",
					name: "MintableERC20",
					title: "ERC20Mintable",
					details: "ERC20 minting logic",
					constructor: {
						inputs: [
							{ internalType: "string", name: "_name", type: "string" },
							{ internalType: "string", name: "_symbol", type: "string" },
						],
						stateMutability: "nonpayable",
						type: "constructor",
					},
					events: {
						"Approval(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "owner",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "spender",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "value",
									type: "uint256",
								},
							],
							name: "Approval",
							type: "event",
							details:
								"Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance.",
						},
						"Transfer(address,address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "value",
									type: "uint256",
								},
							],
							name: "Transfer",
							type: "event",
							details:
								"Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.",
						},
					},
					methods: {
						"allowance(address,address)": {
							inputs: [
								{ internalType: "address", name: "owner", type: "address" },
								{ internalType: "address", name: "spender", type: "address" },
							],
							name: "allowance",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC20-allowance}.",
						},
						"approve(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "spender", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "approve",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"See {IERC20-approve}. NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.",
						},
						"balanceOf(address)": {
							inputs: [
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "balanceOf",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC20-balanceOf}.",
						},
						"burn(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "burn",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Destroys `amount` tokens from the caller. See {ERC20-_burn}.",
						},
						"burnFrom(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "account", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "burnFrom",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Destroys `amount` tokens from `account`, deducting from the caller's allowance. See {ERC20-_burn} and {ERC20-allowance}. Requirements: - the caller must have allowance for ``accounts``'s tokens of at least `amount`.",
						},
						"decimals()": {
							inputs: [],
							name: "decimals",
							outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the value {ERC20} uses, unless this function is overridden; NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.",
						},
						"decreaseAllowance(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "spender", type: "address" },
								{
									internalType: "uint256",
									name: "subtractedValue",
									type: "uint256",
								},
							],
							name: "decreaseAllowance",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Atomically decreases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`.",
						},
						"getCycle()": {
							inputs: [],
							name: "getCycle",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"increaseAllowance(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "spender", type: "address" },
								{
									internalType: "uint256",
									name: "addedValue",
									type: "uint256",
								},
							],
							name: "increaseAllowance",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Atomically increases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address.",
						},
						"mint(uint256)": {
							inputs: [
								{ internalType: "uint256", name: "value", type: "uint256" },
							],
							name: "mint",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details: "Function to mint tokens",
							params: { value: "The amount of tokens to mint." },
							returns: {
								_0: "A boolean that indicates if the operation was successful.",
							},
						},
						"name()": {
							inputs: [],
							name: "name",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "view",
							type: "function",
							details: "Returns the name of the token.",
						},
						"symbol()": {
							inputs: [],
							name: "symbol",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the symbol of the token, usually a shorter version of the name.",
						},
						"test()": {
							inputs: [],
							name: "test",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"totalSupply()": {
							inputs: [],
							name: "totalSupply",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC20-totalSupply}.",
						},
						"transfer(address,uint256)": {
							inputs: [
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "transfer",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `amount`.",
						},
						"transferFrom(address,address,uint256)": {
							inputs: [
								{ internalType: "address", name: "from", type: "address" },
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
							],
							name: "transferFrom",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"See {IERC20-transferFrom}. Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `amount`. - the caller must have allowance for ``from``'s tokens of at least `amount`.",
						},
					},
				},
				"src/mocks/utils/BurnPoolV2.test.sol:BurnPoolV2": {
					source: "src/mocks/utils/BurnPoolV2.test.sol",
					name: "BurnPoolV2",
					title: "RewardPool contract upgrade.",
					notice:
						"This constract serves as the testing suite for upgradeability. ",
					events: {
						"AdminChanged(address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "previousAdmin",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "address",
									name: "newAdmin",
									type: "address",
								},
							],
							name: "AdminChanged",
							type: "event",
							details: "Emitted when the admin account has changed.",
						},
						"BeaconUpgraded(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "beacon",
									type: "address",
								},
							],
							name: "BeaconUpgraded",
							type: "event",
							details: "Emitted when the beacon is upgraded.",
						},
						"BurnedForService(address,uint256,int256,uint256,string)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "int256",
									name: "price",
									type: "int256",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "timeStamp",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "string",
									name: "service",
									type: "string",
								},
							],
							name: "BurnedForService",
							type: "event",
							details:
								"Emitted when `from` burns a specific amount of WXM in order to receive the `service` This event will serve as a proof of burn in order to provision the `service` to the `recipient`",
						},
						"BurnedOnboardingFee(address,uint256,int256,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "from",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "int256",
									name: "price",
									type: "int256",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "timeStamp",
									type: "uint256",
								},
							],
							name: "BurnedOnboardingFee",
							type: "event",
							details:
								"Emitted when `from` burns the onboarding fee in order to oboard weatherXM stations and mint NFTs for each one This event will serve as a proof of burn in order to add the WeatherXM stations into the network",
						},
						"Initialized(uint8)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "uint8",
									name: "version",
									type: "uint8",
								},
							],
							name: "Initialized",
							type: "event",
							details:
								"Triggered when the contract has been initialized or reinitialized.",
						},
						"Paused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Paused",
							type: "event",
							details: "Emitted when the pause is triggered by `account`.",
						},
						"RoleAdminChanged(bytes32,bytes32,bytes32)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "previousAdminRole",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "newAdminRole",
									type: "bytes32",
								},
							],
							name: "RoleAdminChanged",
							type: "event",
							details:
								"Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole` `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite {RoleAdminChanged} not being emitted signaling this. _Available since v3.1._",
						},
						"RoleGranted(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleGranted",
							type: "event",
							details:
								"Emitted when `account` is granted `role`. `sender` is the account that originated the contract call, an admin role bearer except when using {AccessControl-_setupRole}.",
						},
						"RoleRevoked(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleRevoked",
							type: "event",
							details:
								"Emitted when `account` is revoked `role`. `sender` is the account that originated the contract call:   - if using `revokeRole`, it is the admin role bearer   - if using `renounceRole`, it is the role bearer (i.e. `account`)",
						},
						"Unpaused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Unpaused",
							type: "event",
							details: "Emitted when the pause is lifted by `account`.",
						},
						"Upgraded(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "implementation",
									type: "address",
								},
							],
							name: "Upgraded",
							type: "event",
							details: "Emitted when the implementation is upgraded.",
						},
					},
					methods: {
						"DEFAULT_ADMIN_ROLE()": {
							inputs: [],
							name: "DEFAULT_ADMIN_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"MANUFACTURER_ROLE()": {
							inputs: [],
							name: "MANUFACTURER_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"UPGRADER_ROLE()": {
							inputs: [],
							name: "UPGRADER_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"burnForService(uint256,string)": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{ internalType: "string", name: "service", type: "string" },
							],
							name: "burnForService",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"ERC-20 tokens require approval to be spent by third parties. The user should first approve an amount of WXM to be used by this contract. Then the following fuction transfers tokens on its address and burns them.",
							params: {
								amount: "The amount to be burned.",
								service:
									"The service identifier that the end user will receive from the billing system. ",
							},
							notice: "Burn tokens and store info about the transaction.",
						},
						"burnOnboardingFee(uint256,string)": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{ internalType: "string", name: "uri", type: "string" },
							],
							name: "burnOnboardingFee",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"ERC-20 tokens require approval to be spent by third parties. The user should first approve an amount of WXM to be used by this contract. Then the following fuction transfers tokens on its address, burns them and mints an NFT for the weather station.",
							params: {
								amount: "The amount to burn for onboarding.",
								uri: "The ipfs URI for the weather station's metadata. ",
							},
							notice: "Burn onboarding fee.",
						},
						"getRoleAdmin(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleAdmin",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.",
						},
						"getRoleMember(bytes32,uint256)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "uint256", name: "index", type: "uint256" },
							],
							name: "getRoleMember",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.",
						},
						"getRoleMemberCount(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleMemberCount",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.",
						},
						"grantRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "grantRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleGranted} event.",
						},
						"hasRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "hasRole",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "Returns `true` if `account` has been granted `role`.",
						},
						"initialize(address,address,address,address)": {
							inputs: [
								{ internalType: "address", name: "_token", type: "address" },
								{ internalType: "address", name: "_data", type: "address" },
								{
									internalType: "address",
									name: "_weatherstation",
									type: "address",
								},
								{
									internalType: "address",
									name: "_priceconsumer",
									type: "address",
								},
							],
							name: "initialize",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"On deployment, some addresses for interacting contracts should be passed.",
							params: {
								_data:
									"The address of cycle contract to be used for monitoring when burn took place.",
								_priceconsumer:
									"The contract address for the WXM price pair to track ",
								_token: "The address of WXM contract to be used for burning.",
								_weatherstation:
									"The address for WeatherStation contract to mint NFT per station when burning onboarding fee.",
							},
							notice:
								"Initialize called on deployment, initiates the contract and its proxy.",
						},
						"pause()": {
							inputs: [],
							name: "pause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details: "Only the Admin can pause the smart contract. ",
							notice: "Pause all ops in BurnPool.",
						},
						"paused()": {
							inputs: [],
							name: "paused",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns true if the contract is paused, and false otherwise.",
						},
						"priceFeed()": {
							inputs: [],
							name: "priceFeed",
							outputs: [
								{
									internalType: "contract IPriceFeedConsumer",
									name: "",
									type: "address",
								},
							],
							stateMutability: "view",
							type: "function",
						},
						"proxiableUUID()": {
							inputs: [],
							name: "proxiableUUID",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Implementation of the ERC1822 {proxiableUUID} function. This returns the storage slot used by the implementation. It is used to validate the implementation's compatibility when performing an upgrade. IMPORTANT: A proxy pointing at a proxiable contract should not be considered proxiable itself, because this risks bricking a proxy that upgrades to it, by delegating to itself until out of gas. Thus it is critical that this function revert if invoked through a proxy. This is guaranteed by the `notDelegated` modifier.",
						},
						"renounceRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "renounceRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been revoked `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`. May emit a {RoleRevoked} event.",
						},
						"revokeRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "revokeRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleRevoked} event.",
						},
						"supportsInterface(bytes4)": {
							inputs: [
								{ internalType: "bytes4", name: "interfaceId", type: "bytes4" },
							],
							name: "supportsInterface",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC165-supportsInterface}.",
						},
						"test()": {
							inputs: [],
							name: "test",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"unpause()": {
							inputs: [],
							name: "unpause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details: "Only the Admin can unpause the smart contract.. ",
							notice: "Unpause all ops in BurnPool.",
						},
						"upgradeTo(address)": {
							inputs: [
								{
									internalType: "address",
									name: "newImplementation",
									type: "address",
								},
							],
							name: "upgradeTo",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Upgrade the implementation of the proxy to `newImplementation`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.",
						},
						"upgradeToAndCall(address,bytes)": {
							inputs: [
								{
									internalType: "address",
									name: "newImplementation",
									type: "address",
								},
								{ internalType: "bytes", name: "data", type: "bytes" },
							],
							name: "upgradeToAndCall",
							outputs: [],
							stateMutability: "payable",
							type: "function",
							details:
								"Upgrade the implementation of the proxy to `newImplementation`, and subsequently execute the function call encoded in `data`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.",
						},
						"version()": {
							inputs: [],
							name: "version",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "pure",
							type: "function",
						},
					},
				},
				"src/mocks/utils/RewardPoolV2.test.sol:RewardPoolV2": {
					source: "src/mocks/utils/RewardPoolV2.test.sol",
					name: "RewardPoolV2",
					title: "RewardPool contract upgrade.",
					notice:
						"This constract serves as the testing suite for upgradeability. ",
					events: {
						"AdminChanged(address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "previousAdmin",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "address",
									name: "newAdmin",
									type: "address",
								},
							],
							name: "AdminChanged",
							type: "event",
							details: "Emitted when the admin account has changed.",
						},
						"BeaconUpgraded(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "beacon",
									type: "address",
								},
							],
							name: "BeaconUpgraded",
							type: "event",
							details: "Emitted when the beacon is upgraded.",
						},
						"BusinessDevTokensTransferred(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
							],
							name: "BusinessDevTokensTransferred",
							type: "event",
							details:
								"Emitted when business development are transferred This event contains the target address for business development tokens and the amount",
						},
						"Claimed(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
							],
							name: "Claimed",
							type: "event",
							details:
								"Emitted when rewards are claimed by user This event contains user's address and the amount which was claimed",
						},
						"CompanyTokensTransferred(address,uint256)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "to",
									type: "address",
								},
								{
									indexed: !1,
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
							],
							name: "CompanyTokensTransferred",
							type: "event",
							details:
								"Emitted when company tokens are transferred This event contains the target address for company tokens and the amount",
						},
						"Initialized(uint8)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "uint8",
									name: "version",
									type: "uint8",
								},
							],
							name: "Initialized",
							type: "event",
							details:
								"Triggered when the contract has been initialized or reinitialized.",
						},
						"Paused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Paused",
							type: "event",
							details: "Emitted when the pause is triggered by `account`.",
						},
						"RoleAdminChanged(bytes32,bytes32,bytes32)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "previousAdminRole",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "bytes32",
									name: "newAdminRole",
									type: "bytes32",
								},
							],
							name: "RoleAdminChanged",
							type: "event",
							details:
								"Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole` `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite {RoleAdminChanged} not being emitted signaling this. _Available since v3.1._",
						},
						"RoleGranted(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleGranted",
							type: "event",
							details:
								"Emitted when `account` is granted `role`. `sender` is the account that originated the contract call, an admin role bearer except when using {AccessControl-_setupRole}.",
						},
						"RoleRevoked(bytes32,address,address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "bytes32",
									name: "role",
									type: "bytes32",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "account",
									type: "address",
								},
								{
									indexed: !0,
									internalType: "address",
									name: "sender",
									type: "address",
								},
							],
							name: "RoleRevoked",
							type: "event",
							details:
								"Emitted when `account` is revoked `role`. `sender` is the account that originated the contract call:   - if using `revokeRole`, it is the admin role bearer   - if using `renounceRole`, it is the role bearer (i.e. `account`)",
						},
						"SubmittedRootHash(uint256,bytes32)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "uint256",
									name: "cycle",
									type: "uint256",
								},
								{
									indexed: !1,
									internalType: "bytes32",
									name: "root",
									type: "bytes32",
								},
							],
							name: "SubmittedRootHash",
							type: "event",
							details:
								"Emitted when root hash is submitted This event contains the root hash and the cycle indicated when it was submitted",
						},
						"Unpaused(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !1,
									internalType: "address",
									name: "account",
									type: "address",
								},
							],
							name: "Unpaused",
							type: "event",
							details: "Emitted when the pause is lifted by `account`.",
						},
						"Upgraded(address)": {
							anonymous: !1,
							inputs: [
								{
									indexed: !0,
									internalType: "address",
									name: "implementation",
									type: "address",
								},
							],
							name: "Upgraded",
							type: "event",
							details: "Emitted when the implementation is upgraded.",
						},
					},
					methods: {
						"DEFAULT_ADMIN_ROLE()": {
							inputs: [],
							name: "DEFAULT_ADMIN_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"DISTRIBUTOR_ROLE()": {
							inputs: [],
							name: "DISTRIBUTOR_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"UPGRADER_ROLE()": {
							inputs: [],
							name: "UPGRADER_ROLE",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"businessDevAllocatedTokens(uint256)": {
							inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							name: "businessDevAllocatedTokens",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"businessDevTokensTarget()": {
							inputs: [],
							name: "businessDevTokensTarget",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
						},
						"claim(uint256,uint256,uint256,bytes32[])": {
							inputs: [
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{
									internalType: "uint256",
									name: "totalRewards",
									type: "uint256",
								},
								{ internalType: "uint256", name: "cycle", type: "uint256" },
								{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
							],
							name: "claim",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Anyone can claim own rewards by submitting the amount and a proof. The amount should be lower or equal to the available allocated to withdraw.",
							params: {
								amount: "The amount of tokens to claim",
								cycle: "The desired cycle for which to choose the root hash",
								proof:
									"The _proof that enables the claim of the requested amount of tokens ",
								totalRewards:
									"The cumulative amount of rewards up to the point of the requested cycle",
							},
							notice: "Claim rewards.",
						},
						"claimedRewards()": {
							inputs: [],
							name: "claimedRewards",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"claims(address)": {
							inputs: [{ internalType: "address", name: "", type: "address" }],
							name: "claims",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"companyTokensTarget()": {
							inputs: [],
							name: "companyTokensTarget",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
						},
						"companyWithdrawals()": {
							inputs: [],
							name: "companyWithdrawals",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"dailyAllocatedRewards(uint256)": {
							inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							name: "dailyAllocatedRewards",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"data()": {
							inputs: [],
							name: "data",
							outputs: [
								{
									internalType: "contract WeatherXMData",
									name: "",
									type: "address",
								},
							],
							stateMutability: "view",
							type: "function",
						},
						"getRemainingAllocatedRewards(address,uint256,uint256,bytes32[])": {
							inputs: [
								{ internalType: "address", name: "account", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{ internalType: "uint256", name: "cycle", type: "uint256" },
								{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
							],
							name: "getRemainingAllocatedRewards",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							params: {
								account: "The account of the recipient",
								amount:
									"The cumulative amount of rewards up to the selected cycle",
								cycle: "cycle for which to choose the root hash",
								proof: "The recipient's proof ",
							},
							notice: "Get remaining rewards to claim.",
						},
						"getRoleAdmin(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleAdmin",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.",
						},
						"getRoleMember(bytes32,uint256)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "uint256", name: "index", type: "uint256" },
							],
							name: "getRoleMember",
							outputs: [{ internalType: "address", name: "", type: "address" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.",
						},
						"getRoleMemberCount(bytes32)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
							],
							name: "getRoleMemberCount",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.",
						},
						"grantRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "grantRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleGranted} event.",
						},
						"hasRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "hasRole",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "Returns `true` if `account` has been granted `role`.",
						},
						"initialize(address,address)": {
							inputs: [
								{ internalType: "address", name: "_token", type: "address" },
								{ internalType: "address", name: "_data", type: "address" },
							],
							name: "initialize",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"latestBusinessDevWithdrawal()": {
							inputs: [],
							name: "latestBusinessDevWithdrawal",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"latestCompanyWithdrawal()": {
							inputs: [],
							name: "latestCompanyWithdrawal",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"pause()": {
							inputs: [],
							name: "pause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"paused()": {
							inputs: [],
							name: "paused",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details:
								"Returns true if the contract is paused, and false otherwise.",
						},
						"proxiableUUID()": {
							inputs: [],
							name: "proxiableUUID",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
							details:
								"Implementation of the ERC1822 {proxiableUUID} function. This returns the storage slot used by the implementation. It is used to validate the implementation's compatibility when performing an upgrade. IMPORTANT: A proxy pointing at a proxiable contract should not be considered proxiable itself, because this risks bricking a proxy that upgrades to it, by delegating to itself until out of gas. Thus it is critical that this function revert if invoked through a proxy. This is guaranteed by the `notDelegated` modifier.",
						},
						"renounceRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "renounceRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been revoked `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`. May emit a {RoleRevoked} event.",
						},
						"revokeRole(bytes32,address)": {
							inputs: [
								{ internalType: "bytes32", name: "role", type: "bytes32" },
								{ internalType: "address", name: "account", type: "address" },
							],
							name: "revokeRole",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role. May emit a {RoleRevoked} event.",
						},
						"roots(uint256)": {
							inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							name: "roots",
							outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
							stateMutability: "view",
							type: "function",
						},
						"setBusinessDevTarget(address)": {
							inputs: [
								{ internalType: "address", name: "target", type: "address" },
							],
							name: "setBusinessDevTarget",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							notice:
								"Setup target address for receiving business development tokens. ",
						},
						"setCompanyTarget(address)": {
							inputs: [
								{ internalType: "address", name: "target", type: "address" },
							],
							name: "setCompanyTarget",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							notice:
								"Setup target address for receiving company and investors tokens. ",
						},
						"submitMerkleRoot(bytes32,uint256)": {
							inputs: [
								{ internalType: "bytes32", name: "root", type: "bytes32" },
								{
									internalType: "uint256",
									name: "dailyCumulativeRewards",
									type: "uint256",
								},
							],
							name: "submitMerkleRoot",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"The root hash is calculated of chain and submitted every day. The root hash is stored also off chain in order to calculate each recipient's daily proof if requested for withdrawal. The root hashes are stored in a mapping where the cycle is the accessor. For every cycle there is only one root hash.",
							params: {
								root: "The root hash containing the cumulative rewards plus the daily rewards. ",
							},
							notice: "Submit root hash for rewards.",
						},
						"supportsInterface(bytes4)": {
							inputs: [
								{ internalType: "bytes4", name: "interfaceId", type: "bytes4" },
							],
							name: "supportsInterface",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "view",
							type: "function",
							details: "See {IERC165-supportsInterface}.",
						},
						"test()": {
							inputs: [],
							name: "test",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"token()": {
							inputs: [],
							name: "token",
							outputs: [
								{
									internalType: "contract IWeatherXM",
									name: "",
									type: "address",
								},
							],
							stateMutability: "view",
							type: "function",
						},
						"totalAllocatedRewards()": {
							inputs: [],
							name: "totalAllocatedRewards",
							outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
							stateMutability: "view",
							type: "function",
						},
						"transferBusinessDevTokens()": {
							inputs: [],
							name: "transferBusinessDevTokens",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							notice:
								"Transfer remaining tokens from daily rewarding to business development pool. ",
						},
						"transferCompanyTokens()": {
							inputs: [],
							name: "transferCompanyTokens",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							notice: "Transfer tokens for vesting to a company pool. ",
						},
						"transferRewards(address,uint256,uint256,uint256,bytes32[])": {
							inputs: [
								{ internalType: "address", name: "to", type: "address" },
								{ internalType: "uint256", name: "amount", type: "uint256" },
								{
									internalType: "uint256",
									name: "totalRewards",
									type: "uint256",
								},
								{ internalType: "uint256", name: "cycle", type: "uint256" },
								{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
							],
							name: "transferRewards",
							outputs: [{ internalType: "bool", name: "", type: "bool" }],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Receives the amount and proof for a specific recipient defined by the address and transfers the rewards. The amount should be lower or equal to the available rewards to transfer.",
							params: {
								amount: "The amount to transfer (in WEI)",
								cycle: "The desired cycle for which to choose the root hash",
								proof:
									"The _proof that enables the claim of the requested amount of tokens ",
								to: "The recipient's address",
								totalRewards:
									"The cumulative amount of rewards up to the point of the requested cycle",
							},
							notice: "Transfer rewards to a recipient.",
						},
						"unpause()": {
							inputs: [],
							name: "unpause",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
						},
						"upgradeTo(address)": {
							inputs: [
								{
									internalType: "address",
									name: "newImplementation",
									type: "address",
								},
							],
							name: "upgradeTo",
							outputs: [],
							stateMutability: "nonpayable",
							type: "function",
							details:
								"Upgrade the implementation of the proxy to `newImplementation`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.",
						},
						"upgradeToAndCall(address,bytes)": {
							inputs: [
								{
									internalType: "address",
									name: "newImplementation",
									type: "address",
								},
								{ internalType: "bytes", name: "data", type: "bytes" },
							],
							name: "upgradeToAndCall",
							outputs: [],
							stateMutability: "payable",
							type: "function",
							details:
								"Upgrade the implementation of the proxy to `newImplementation`, and subsequently execute the function call encoded in `data`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.",
						},
						"version()": {
							inputs: [],
							name: "version",
							outputs: [{ internalType: "string", name: "", type: "string" }],
							stateMutability: "pure",
							type: "function",
						},
					},
				},
			};
			new Xn({
				el: "#app",
				router: new xl({
					routes: [
						{ path: "/", component: Vl, props: () => ({ json: Gl }) },
						{
							path: "*",
							component: Bl,
							props: (e) => ({ json: Gl[e.path.slice(1)] }),
						},
					],
				}),
				mounted() {
					document.dispatchEvent(new Event("render-event"));
				},
				render: (e) => e(Al),
			});
		})();
})();
