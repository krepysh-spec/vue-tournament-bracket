import { ref as B, computed as N, watch as A, onMounted as W, createElementBlock as v, openBlock as c, normalizeClass as R, unref as S, createCommentVNode as I, withDirectives as G, createElementVNode as e, Fragment as z, renderList as F, toDisplayString as C, vModelSelect as X, vModelText as J, createVNode as U, createTextVNode as _, createBlock as q } from "vue";
const E = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, k = "TBD", d = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, H = {
  CAN_SELECT_TEAM: "can-select-team"
}, Y = {
  key: 0,
  class: "flex items-center gap-2"
}, Z = ["src", "alt"], ee = ["value", "disabled"], te = {
  key: 1,
  class: "flex items-center gap-2"
}, ae = ["src", "alt"], le = { class: "text-gray-900 dark:text-white" }, ie = {
  __name: "TeamSelect",
  props: {
    team: {
      type: Object,
      required: !0
    },
    teamPosition: {
      type: String,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    selectedTeams: {
      type: Array,
      required: !0
    },
    canEdit: {
      type: Boolean,
      required: !0
    },
    highlightedTeam: {
      type: Number,
      default: null
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [H.CAN_SELECT_TEAM]: !0
      })
    },
    isWinner: {
      type: Boolean,
      default: !1
    },
    isLoser: {
      type: Boolean,
      default: !1
    },
    shouldHighlight: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:team", "highlight-team", "unhighlight-team"],
  setup(t, { emit: p }) {
    const a = t, i = p, l = B(a.team.name), n = N(() => {
      var s;
      return l.value === k ? null : ((s = a.availableTeams.find((g) => g.name === l.value)) == null ? void 0 : s.logo) || null;
    });
    A(() => a.team, (s) => {
      l.value = s.name;
    }, { immediate: !0 }), W(() => {
      console.log("TeamSelect mounted:", {
        team: a.team,
        availableTeams: a.availableTeams
      });
    });
    const h = (s) => s === k ? !1 : a.selectedTeams.includes(s) && s !== a.team.name || s === a.team.name && a.team.name !== k, x = N(() => a.availableTeams ? a.availableTeams.filter((s) => s.name === k || s.name === a.team.name ? !0 : !h(s.name)) : []), u = () => {
      a.team.name !== k && i("highlight-team", a.team.name);
    }, m = () => {
      i("unhighlight-team");
    }, y = () => {
      const s = a.availableTeams.find((g) => g.name === l.value);
      console.log("Updating team:", { selectedTeam: l.value, selectedTeamData: s }), i("update:team", {
        position: a.teamPosition,
        team: {
          id: (s == null ? void 0 : s.id) || null,
          name: l.value,
          logo: (s == null ? void 0 : s.logo) || null,
          score: 0
        }
      });
    };
    return (s, g) => (c(), v("div", {
      class: R(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": t.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": t.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": t.shouldHighlight && t.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": t.shouldHighlight && t.isLoser
      }]),
      onMouseenter: u,
      onMouseleave: m
    }, [
      t.canEdit && t.permissions[S(H).CAN_SELECT_TEAM] ? (c(), v("div", Y, [
        n.value ? (c(), v("img", {
          key: 0,
          src: n.value,
          alt: l.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, Z)) : I("", !0),
        G(e("select", {
          "onUpdate:modelValue": g[0] || (g[0] = (o) => l.value = o),
          class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 hover:cursor-pointer",
          onChange: y
        }, [
          g[1] || (g[1] = e("option", { value: "TBD" }, "TBD", -1)),
          (c(!0), v(z, null, F(x.value, (o) => (c(), v("option", {
            key: o.id,
            value: o.name,
            disabled: h(o.name)
          }, C(o.name), 9, ee))), 128))
        ], 544), [
          [X, l.value]
        ])
      ])) : (c(), v("div", te, [
        t.team.logo ? (c(), v("img", {
          key: 0,
          src: t.team.logo,
          alt: t.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ae)) : I("", !0),
        e("span", le, C(t.team.name), 1)
      ]))
    ], 34));
  }
}, re = {
  key: 1,
  class: "text-white"
}, ne = {
  __name: "TeamScoreInput",
  props: {
    team: {
      type: Object,
      required: !0
    },
    teamPosition: {
      type: String,
      required: !0
    },
    canEditScore: {
      type: Boolean,
      required: !0
    },
    isFirstTeam: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:score"],
  setup(t, { emit: p }) {
    const a = t, i = p, l = B(!1), n = B(a.team.score ?? 0), h = () => {
      a.canEditScore && (l.value = !0);
    }, x = () => {
      const u = parseInt(n.value) || 0;
      i("update:score", {
        position: a.teamPosition,
        score: u
      });
    };
    return A(() => a.team, (u) => {
      n.value = u.score ?? 0;
    }, { deep: !0 }), (u, m) => (c(), v("div", {
      class: R(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": t.isFirstTeam }]),
      onClick: h
    }, [
      l.value ? G((c(), v("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": m[0] || (m[0] = (y) => n.value = y),
        class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
        min: "0",
        onChange: x,
        onBlur: m[1] || (m[1] = (y) => l.value = !1)
      }, null, 544)), [
        [J, n.value]
      ]) : (c(), v("span", re, C(t.team.score), 1))
    ], 2));
  }
}, oe = { class: "flex" }, D = {
  __name: "TeamRow",
  props: {
    team: {
      type: Object,
      required: !0
    },
    teamPosition: {
      type: String,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    selectedTeams: {
      type: Array,
      required: !0
    },
    canEdit: {
      type: Boolean,
      required: !0
    },
    canEditScore: {
      type: Boolean,
      required: !0
    },
    isWinner: {
      type: Boolean,
      default: !1
    },
    isLoser: {
      type: Boolean,
      default: !1
    },
    shouldHighlight: {
      type: Boolean,
      default: !1
    },
    isFirstTeam: {
      type: Boolean,
      default: !1
    },
    highlightedTeam: {
      type: Number,
      default: null
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [H.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(t) {
    return (p, a) => (c(), v("div", oe, [
      U(ie, {
        team: t.team,
        "team-position": t.teamPosition,
        "available-teams": t.availableTeams,
        "selected-teams": t.selectedTeams,
        "highlighted-team": t.highlightedTeam,
        permissions: t.permissions,
        "can-edit": t.canEdit,
        "is-winner": t.isWinner,
        "is-loser": t.isLoser,
        "should-highlight": t.shouldHighlight,
        "is-first-team": t.isFirstTeam,
        "onUpdate:team": a[0] || (a[0] = (i) => p.$emit("update:team", i)),
        onHighlightTeam: a[1] || (a[1] = (i) => p.$emit("highlight-team", i)),
        onUnhighlightTeam: a[2] || (a[2] = (i) => p.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
      U(ne, {
        team: t.team,
        "team-position": t.teamPosition,
        "can-edit-score": t.canEditScore,
        "is-first-team": t.isFirstTeam,
        "onUpdate:score": a[3] || (a[3] = (i) => p.$emit("update:score", i))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, se = { class: "my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10" }, de = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[1px] mx-2 transition-colors duration-200"
}, ue = {
  __name: "BracketMatch",
  props: {
    match: {
      type: Object,
      required: !0
    },
    index: {
      type: Number,
      required: !0
    },
    totalMatches: {
      type: Number,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    selectedTeams: {
      type: Array,
      required: !0
    },
    roundIndex: {
      type: Number,
      required: !0
    },
    highlightedTeam: {
      type: String,
      default: null
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [H.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(t, { emit: p }) {
    const a = t, i = p, l = N(() => a.roundIndex === 0), n = N(() => a.match[d.ONE].name !== k && a.match[d.TWO].name !== k), h = (o) => a.match.winner === o, x = (o) => a.match.winner && a.match.winner !== o, u = (o) => {
      const b = a.match[o].name;
      return a.highlightedTeam === b;
    }, m = (o) => {
      i("highlight-team", o);
    }, y = () => {
      i("unhighlight-team");
    }, s = ({ position: o, team: b }) => {
      const r = {
        ...a.match,
        [o]: b
      };
      i("update:match", r);
    }, g = ({ position: o, score: b }) => {
      const r = {
        ...a.match,
        [o]: {
          ...a.match[o],
          score: b
        }
      };
      r.teamOne.score > 0 || r.teamTwo.score > 0 ? r.winner = r.teamOne.score > r.teamTwo.score ? d.ONE : d.TWO : r.winner = null, i("update:match", r);
    };
    return (o, b) => (c(), v("div", {
      class: R(["relative text-[0.8em] flex items-center", { group: t.index % 2 == 0 && t.totalMatches > 1 }])
    }, [
      e("div", se, [
        U(D, {
          team: t.match.teamOne,
          "team-position": S(d).ONE,
          "available-teams": t.availableTeams,
          "selected-teams": t.selectedTeams,
          "can-edit": l.value,
          "can-edit-score": n.value,
          "is-winner": h(S(d).ONE),
          "is-loser": x(S(d).ONE),
          "should-highlight": u(S(d).ONE),
          "is-first-team": !0,
          "can-select-team": o.canSelectTeam,
          "highlighted-team": t.highlightedTeam,
          permissions: t.permissions,
          "onUpdate:team": s,
          "onUpdate:score": g,
          onHighlightTeam: m,
          onUnhighlightTeam: y
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
        U(D, {
          team: t.match.teamTwo,
          "team-position": S(d).TWO,
          "available-teams": t.availableTeams,
          "selected-teams": t.selectedTeams,
          "can-edit": l.value,
          "can-edit-score": n.value,
          "is-winner": h(S(d).TWO),
          "is-loser": x(S(d).TWO),
          "should-highlight": u(S(d).TWO),
          "can-select-team": o.canSelectTeam,
          "highlighted-team": t.highlightedTeam,
          permissions: t.permissions,
          "onUpdate:team": s,
          "onUpdate:score": g,
          onHighlightTeam: m,
          onUnhighlightTeam: y
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
      ]),
      t.index % 2 == 0 && t.totalMatches > 1 ? (c(), v("div", de, b[0] || (b[0] = [
        e("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : I("", !0)
    ], 2));
  }
}, me = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, ce = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50" }, K = {
  __name: "BracketColumn",
  props: {
    column: {
      type: Object,
      required: !0
    },
    columnIndex: {
      type: Number,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    selectedTeams: {
      type: Array,
      required: !0
    },
    highlightedTeam: {
      type: String,
      default: null
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [H.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(t, { emit: p }) {
    const a = t, i = p, l = (n, h) => {
      i("update:match", a.columnIndex, n, h);
    };
    return (n, h) => (c(), v("div", me, [
      (c(!0), v(z, null, F(t.column.items, (x, u) => (c(), v(z, {
        key: x.number
      }, [
        e("div", ce, C(x.number), 1),
        U(ue, {
          match: x,
          index: u,
          "total-matches": t.column.items.length,
          "round-index": t.columnIndex,
          "available-teams": t.availableTeams,
          "selected-teams": t.selectedTeams,
          "highlighted-team": t.highlightedTeam,
          permissions: t.permissions,
          "onUpdate:match": (m) => l(u, m),
          onHighlightTeam: h[0] || (h[0] = (m) => n.$emit("highlight-team", m)),
          onUnhighlightTeam: h[1] || (h[1] = (m) => n.$emit("unhighlight-team"))
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "permissions", "onUpdate:match"])
      ], 64))), 128))
    ]));
  }
}, he = { class: "flex justify-between px-5" }, ge = { class: "flex flex-col items-center gap-2" }, fe = ["onUpdate:modelValue", "onBlur"], pe = ["value", "onChange"], ve = ["value"], Q = {
  __name: "BracketRoundHeaders",
  props: {
    columns: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:columns"],
  setup(t, { emit: p }) {
    const a = t, i = p, l = [1, 3, 5, 7, 9], n = B(a.columns.map((u) => u.name));
    A(() => a.columns, (u) => {
      n.value = u.map((m) => m.name);
    }, { deep: !0 });
    const h = (u, m) => {
      n.value[u] = m;
      const y = [...a.columns];
      y[u] = {
        ...y[u],
        name: m
      }, i("update:columns", y);
    }, x = (u, m) => {
      const y = [...a.columns];
      y[u] = {
        ...y[u],
        bestOf: Number(m)
      }, i("update:columns", y);
    };
    return (u, m) => (c(), v("div", he, [
      (c(!0), v(z, null, F(t.columns, (y, s) => (c(), v("div", {
        key: y.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        e("div", ge, [
          m[0] || (m[0] = e("form", { class: "max-w-sm mx-auto" }, [
            e("div", { class: "flex items-center" }, [
              e("button", {
                id: "dropdown-phone-button",
                "data-dropdown-toggle": "dropdown-phone",
                class: "shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600",
                type: "button"
              }, [
                e("svg", {
                  fill: "none",
                  "aria-hidden": "true",
                  class: "h-4 w-4 me-2",
                  viewBox: "0 0 20 15"
                }, [
                  e("rect", {
                    width: "19.6",
                    height: "14",
                    y: ".5",
                    fill: "#fff",
                    rx: "2"
                  }),
                  e("mask", {
                    id: "a",
                    style: { "mask-type": "luminance" },
                    width: "20",
                    height: "15",
                    x: "0",
                    y: "0",
                    maskUnits: "userSpaceOnUse"
                  }, [
                    e("rect", {
                      width: "19.6",
                      height: "14",
                      y: ".5",
                      fill: "#fff",
                      rx: "2"
                    })
                  ]),
                  e("g", { mask: "url(#a)" }, [
                    e("path", {
                      fill: "#D02F44",
                      "fill-rule": "evenodd",
                      d: "M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z",
                      "clip-rule": "evenodd"
                    }),
                    e("path", {
                      fill: "#46467F",
                      d: "M0 .5h8.4v6.533H0z"
                    }),
                    e("g", { filter: "url(#filter0_d_343_121520)" }, [
                      e("path", {
                        fill: "url(#paint0_linear_343_121520)",
                        "fill-rule": "evenodd",
                        d: "M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z",
                        "clip-rule": "evenodd"
                      })
                    ])
                  ]),
                  e("defs", null, [
                    e("linearGradient", {
                      id: "paint0_linear_343_121520",
                      x1: ".933",
                      x2: ".933",
                      y1: "1.433",
                      y2: "6.1",
                      gradientUnits: "userSpaceOnUse"
                    }, [
                      e("stop", { "stop-color": "#fff" }),
                      e("stop", {
                        offset: "1",
                        "stop-color": "#F0F0F0"
                      })
                    ]),
                    e("filter", {
                      id: "filter0_d_343_121520",
                      width: "6.533",
                      height: "5.667",
                      x: ".933",
                      y: "1.433",
                      "color-interpolation-filters": "sRGB",
                      filterUnits: "userSpaceOnUse"
                    }, [
                      e("feFlood", {
                        "flood-opacity": "0",
                        result: "BackgroundImageFix"
                      }),
                      e("feColorMatrix", {
                        in: "SourceAlpha",
                        result: "hardAlpha",
                        values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      }),
                      e("feOffset", { dy: "1" }),
                      e("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" }),
                      e("feBlend", {
                        in2: "BackgroundImageFix",
                        result: "effect1_dropShadow_343_121520"
                      }),
                      e("feBlend", {
                        in: "SourceGraphic",
                        in2: "effect1_dropShadow_343_121520",
                        result: "shape"
                      })
                    ])
                  ])
                ]),
                _(" +1 "),
                e("svg", {
                  class: "w-2.5 h-2.5 ms-2.5",
                  "aria-hidden": "true",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 10 6"
                }, [
                  e("path", {
                    stroke: "currentColor",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "m1 1 4 4 4-4"
                  })
                ])
              ]),
              e("div", {
                id: "dropdown-phone",
                class: "z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-52 dark:bg-gray-700"
              }, [
                e("ul", {
                  class: "py-2 text-sm text-gray-700 dark:text-gray-200",
                  "aria-labelledby": "dropdown-phone-button"
                }, [
                  e("li", null, [
                    e("button", {
                      type: "button",
                      class: "inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white",
                      role: "menuitem"
                    }, [
                      e("div", { class: "inline-flex items-center" }, [
                        e("svg", {
                          fill: "none",
                          "aria-hidden": "true",
                          class: "h-4 w-4 me-2",
                          viewBox: "0 0 20 15"
                        }, [
                          e("rect", {
                            width: "19.6",
                            height: "14",
                            y: ".5",
                            fill: "#fff",
                            rx: "2"
                          }),
                          e("mask", {
                            id: "a",
                            style: { "mask-type": "luminance" },
                            width: "20",
                            height: "15",
                            x: "0",
                            y: "0",
                            maskUnits: "userSpaceOnUse"
                          }, [
                            e("rect", {
                              width: "19.6",
                              height: "14",
                              y: ".5",
                              fill: "#fff",
                              rx: "2"
                            })
                          ]),
                          e("g", { mask: "url(#a)" }, [
                            e("path", {
                              fill: "#D02F44",
                              "fill-rule": "evenodd",
                              d: "M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z",
                              "clip-rule": "evenodd"
                            }),
                            e("path", {
                              fill: "#46467F",
                              d: "M0 .5h8.4v6.533H0z"
                            }),
                            e("g", { filter: "url(#filter0_d_343_121520)" }, [
                              e("path", {
                                fill: "url(#paint0_linear_343_121520)",
                                "fill-rule": "evenodd",
                                d: "M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z",
                                "clip-rule": "evenodd"
                              })
                            ])
                          ]),
                          e("defs", null, [
                            e("linearGradient", {
                              id: "paint0_linear_343_121520",
                              x1: ".933",
                              x2: ".933",
                              y1: "1.433",
                              y2: "6.1",
                              gradientUnits: "userSpaceOnUse"
                            }, [
                              e("stop", { "stop-color": "#fff" }),
                              e("stop", {
                                offset: "1",
                                "stop-color": "#F0F0F0"
                              })
                            ]),
                            e("filter", {
                              id: "filter0_d_343_121520",
                              width: "6.533",
                              height: "5.667",
                              x: ".933",
                              y: "1.433",
                              "color-interpolation-filters": "sRGB",
                              filterUnits: "userSpaceOnUse"
                            }, [
                              e("feFlood", {
                                "flood-opacity": "0",
                                result: "BackgroundImageFix"
                              }),
                              e("feColorMatrix", {
                                in: "SourceAlpha",
                                result: "hardAlpha",
                                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              }),
                              e("feOffset", { dy: "1" }),
                              e("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" }),
                              e("feBlend", {
                                in2: "BackgroundImageFix",
                                result: "effect1_dropShadow_343_121520"
                              }),
                              e("feBlend", {
                                in: "SourceGraphic",
                                in2: "effect1_dropShadow_343_121520",
                                result: "shape"
                              })
                            ])
                          ])
                        ]),
                        _(" United States (+1) ")
                      ])
                    ])
                  ]),
                  e("li", null, [
                    e("button", {
                      type: "button",
                      class: "inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white",
                      role: "menuitem"
                    }, [
                      e("div", { class: "inline-flex items-center" }, [
                        e("svg", {
                          class: "h-4 w-4 me-2",
                          fill: "none",
                          viewBox: "0 0 20 15"
                        }, [
                          e("rect", {
                            width: "19.6",
                            height: "14",
                            y: ".5",
                            fill: "#fff",
                            rx: "2"
                          }),
                          e("mask", {
                            id: "a",
                            style: { "mask-type": "luminance" },
                            width: "20",
                            height: "15",
                            x: "0",
                            y: "0",
                            maskUnits: "userSpaceOnUse"
                          }, [
                            e("rect", {
                              width: "19.6",
                              height: "14",
                              y: ".5",
                              fill: "#fff",
                              rx: "2"
                            })
                          ]),
                          e("g", { mask: "url(#a)" }, [
                            e("path", {
                              fill: "#0A17A7",
                              d: "M0 .5h19.6v14H0z"
                            }),
                            e("path", {
                              fill: "#fff",
                              "fill-rule": "evenodd",
                              d: "M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z",
                              "clip-rule": "evenodd"
                            }),
                            e("path", {
                              stroke: "#DB1F35",
                              "stroke-linecap": "round",
                              "stroke-width": ".667",
                              d: "M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093"
                            }),
                            e("path", {
                              fill: "#E6273E",
                              "fill-rule": "evenodd",
                              d: "M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z",
                              "clip-rule": "evenodd"
                            })
                          ])
                        ]),
                        _(" United Kingdom (+44) ")
                      ])
                    ])
                  ]),
                  e("li", null, [
                    e("button", {
                      type: "button",
                      class: "inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white",
                      role: "menuitem"
                    }, [
                      e("div", { class: "inline-flex items-center" }, [
                        e("svg", {
                          class: "h-4 w-4 me-2",
                          fill: "none",
                          viewBox: "0 0 20 15",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          e("rect", {
                            width: "19.6",
                            height: "14",
                            y: ".5",
                            fill: "#fff",
                            rx: "2"
                          }),
                          e("mask", {
                            id: "a",
                            style: { "mask-type": "luminance" },
                            width: "20",
                            height: "15",
                            x: "0",
                            y: "0",
                            maskUnits: "userSpaceOnUse"
                          }, [
                            e("rect", {
                              width: "19.6",
                              height: "14",
                              y: ".5",
                              fill: "#fff",
                              rx: "2"
                            })
                          ]),
                          e("g", { mask: "url(#a)" }, [
                            e("path", {
                              fill: "#0A17A7",
                              d: "M0 .5h19.6v14H0z"
                            }),
                            e("path", {
                              fill: "#fff",
                              stroke: "#fff",
                              "stroke-width": ".667",
                              d: "M0 .167h-.901l.684.586 3.15 2.7v.609L-.194 6.295l-.14.1v1.24l.51-.319L3.83 5.033h.73L7.7 7.276a.488.488 0 00.601-.767L5.467 4.08v-.608l2.987-2.134a.667.667 0 00.28-.543V-.1l-.51.318L4.57 2.5h-.73L.66.229.572.167H0z"
                            }),
                            e("path", {
                              fill: "url(#paint0_linear_374_135177)",
                              "fill-rule": "evenodd",
                              d: "M0 2.833V4.7h3.267v2.133c0 .369.298.667.666.667h.534a.667.667 0 00.666-.667V4.7H8.2a.667.667 0 00.667-.667V3.5a.667.667 0 00-.667-.667H5.133V.5H3.267v2.333H0z",
                              "clip-rule": "evenodd"
                            }),
                            e("path", {
                              fill: "url(#paint1_linear_374_135177)",
                              "fill-rule": "evenodd",
                              d: "M0 3.3h3.733V.5h.934v2.8H8.4v.933H4.667v2.8h-.934v-2.8H0V3.3z",
                              "clip-rule": "evenodd"
                            }),
                            e("path", {
                              fill: "#fff",
                              "fill-rule": "evenodd",
                              d: "M4.2 11.933l-.823.433.157-.916-.666-.65.92-.133.412-.834.411.834.92.134-.665.649.157.916-.823-.433zm9.8.7l-.66.194.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm0-8.866l-.66.193.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.193zm2.8 2.8l-.66.193.193-.66-.193-.66.66.193.66-.193-.193.66.193.66-.66-.193zm-5.6.933l-.66.193.193-.66-.193-.66.66.194.66-.194-.193.66.193.66-.66-.193zm4.2 1.167l-.33.096.096-.33-.096-.33.33.097.33-.097-.097.33.097.33-.33-.096z",
                              "clip-rule": "evenodd"
                            })
                          ]),
                          e("defs", null, [
                            e("linearGradient", {
                              id: "paint0_linear_374_135177",
                              x1: "0",
                              x2: "0",
                              y1: ".5",
                              y2: "7.5",
                              gradientUnits: "userSpaceOnUse"
                            }, [
                              e("stop", { "stop-color": "#fff" }),
                              e("stop", {
                                offset: "1",
                                "stop-color": "#F0F0F0"
                              })
                            ]),
                            e("linearGradient", {
                              id: "paint1_linear_374_135177",
                              x1: "0",
                              x2: "0",
                              y1: ".5",
                              y2: "7.033",
                              gradientUnits: "userSpaceOnUse"
                            }, [
                              e("stop", { "stop-color": "#FF2E3B" }),
                              e("stop", {
                                offset: "1",
                                "stop-color": "#FC0D1B"
                              })
                            ])
                          ])
                        ]),
                        _(" Australia (+61) ")
                      ])
                    ])
                  ]),
                  e("li", null, [
                    e("button", {
                      type: "button",
                      class: "inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white",
                      role: "menuitem"
                    }, [
                      e("div", { class: "inline-flex items-center" }, [
                        e("svg", {
                          class: "w-4 h-4 me-2",
                          fill: "none",
                          viewBox: "0 0 20 15"
                        }, [
                          e("rect", {
                            width: "19.6",
                            height: "14",
                            y: ".5",
                            fill: "#fff",
                            rx: "2"
                          }),
                          e("mask", {
                            id: "a",
                            style: { "mask-type": "luminance" },
                            width: "20",
                            height: "15",
                            x: "0",
                            y: "0",
                            maskUnits: "userSpaceOnUse"
                          }, [
                            e("rect", {
                              width: "19.6",
                              height: "14",
                              y: ".5",
                              fill: "#fff",
                              rx: "2"
                            })
                          ]),
                          e("g", { mask: "url(#a)" }, [
                            e("path", {
                              fill: "#262626",
                              "fill-rule": "evenodd",
                              d: "M0 5.167h19.6V.5H0v4.667z",
                              "clip-rule": "evenodd"
                            }),
                            e("g", { filter: "url(#filter0_d_374_135180)" }, [
                              e("path", {
                                fill: "#F01515",
                                "fill-rule": "evenodd",
                                d: "M0 9.833h19.6V5.167H0v4.666z",
                                "clip-rule": "evenodd"
                              })
                            ]),
                            e("g", { filter: "url(#filter1_d_374_135180)" }, [
                              e("path", {
                                fill: "#FFD521",
                                "fill-rule": "evenodd",
                                d: "M0 14.5h19.6V9.833H0V14.5z",
                                "clip-rule": "evenodd"
                              })
                            ])
                          ]),
                          e("defs", null, [
                            e("filter", {
                              id: "filter0_d_374_135180",
                              width: "19.6",
                              height: "4.667",
                              x: "0",
                              y: "5.167",
                              "color-interpolation-filters": "sRGB",
                              filterUnits: "userSpaceOnUse"
                            }, [
                              e("feFlood", {
                                "flood-opacity": "0",
                                result: "BackgroundImageFix"
                              }),
                              e("feColorMatrix", {
                                in: "SourceAlpha",
                                result: "hardAlpha",
                                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              }),
                              e("feOffset"),
                              e("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" }),
                              e("feBlend", {
                                in2: "BackgroundImageFix",
                                result: "effect1_dropShadow_374_135180"
                              }),
                              e("feBlend", {
                                in: "SourceGraphic",
                                in2: "effect1_dropShadow_374_135180",
                                result: "shape"
                              })
                            ]),
                            e("filter", {
                              id: "filter1_d_374_135180",
                              width: "19.6",
                              height: "4.667",
                              x: "0",
                              y: "9.833",
                              "color-interpolation-filters": "sRGB",
                              filterUnits: "userSpaceOnUse"
                            }, [
                              e("feFlood", {
                                "flood-opacity": "0",
                                result: "BackgroundImageFix"
                              }),
                              e("feColorMatrix", {
                                in: "SourceAlpha",
                                result: "hardAlpha",
                                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              }),
                              e("feOffset"),
                              e("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" }),
                              e("feBlend", {
                                in2: "BackgroundImageFix",
                                result: "effect1_dropShadow_374_135180"
                              }),
                              e("feBlend", {
                                in: "SourceGraphic",
                                in2: "effect1_dropShadow_374_135180",
                                result: "shape"
                              })
                            ])
                          ])
                        ]),
                        _(" Germany (+49) ")
                      ])
                    ])
                  ]),
                  e("li", null, [
                    e("button", {
                      type: "button",
                      class: "inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white",
                      role: "menuitem"
                    }, [
                      e("div", { class: "inline-flex items-center" }, [
                        e("svg", {
                          class: "w-4 h-4 me-2",
                          fill: "none",
                          viewBox: "0 0 20 15"
                        }, [
                          e("rect", {
                            width: "19.1",
                            height: "13.5",
                            x: ".25",
                            y: ".75",
                            fill: "#fff",
                            stroke: "#F5F5F5",
                            "stroke-width": ".5",
                            rx: "1.75"
                          }),
                          e("mask", {
                            id: "a",
                            style: { "mask-type": "luminance" },
                            width: "20",
                            height: "15",
                            x: "0",
                            y: "0",
                            maskUnits: "userSpaceOnUse"
                          }, [
                            e("rect", {
                              width: "19.1",
                              height: "13.5",
                              x: ".25",
                              y: ".75",
                              fill: "#fff",
                              stroke: "#fff",
                              "stroke-width": ".5",
                              rx: "1.75"
                            })
                          ]),
                          e("g", { mask: "url(#a)" }, [
                            e("path", {
                              fill: "#F44653",
                              d: "M13.067.5H19.6v14h-6.533z"
                            }),
                            e("path", {
                              fill: "#1035BB",
                              "fill-rule": "evenodd",
                              d: "M0 14.5h6.533V.5H0v14z",
                              "clip-rule": "evenodd"
                            })
                          ])
                        ]),
                        _(" France (+33) ")
                      ])
                    ])
                  ]),
                  e("li", null, [
                    e("button", {
                      type: "button",
                      class: "inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white",
                      role: "menuitem"
                    }, [
                      e("div", { class: "inline-flex items-center" }, [
                        e("svg", {
                          class: "w-4 h-4 me-2",
                          fill: "none",
                          viewBox: "0 0 20 15"
                        }, [
                          e("rect", {
                            width: "19.6",
                            height: "14",
                            y: ".5",
                            fill: "#fff",
                            rx: "2"
                          }),
                          e("mask", {
                            id: "a",
                            style: { "mask-type": "luminance" },
                            width: "20",
                            height: "15",
                            x: "0",
                            y: "0",
                            maskUnits: "userSpaceOnUse"
                          }, [
                            e("rect", {
                              width: "19.6",
                              height: "14",
                              y: ".5",
                              fill: "#fff",
                              rx: "2"
                            })
                          ]),
                          e("g", { mask: "url(#a)" }, [
                            e("path", {
                              fill: "#262626",
                              "fill-rule": "evenodd",
                              d: "M0 5.167h19.6V.5H0v4.667z",
                              "clip-rule": "evenodd"
                            }),
                            e("g", { filter: "url(#filter0_d_374_135180)" }, [
                              e("path", {
                                fill: "#F01515",
                                "fill-rule": "evenodd",
                                d: "M0 9.833h19.6V5.167H0v4.666z",
                                "clip-rule": "evenodd"
                              })
                            ]),
                            e("g", { filter: "url(#filter1_d_374_135180)" }, [
                              e("path", {
                                fill: "#FFD521",
                                "fill-rule": "evenodd",
                                d: "M0 14.5h19.6V9.833H0V14.5z",
                                "clip-rule": "evenodd"
                              })
                            ])
                          ]),
                          e("defs", null, [
                            e("filter", {
                              id: "filter0_d_374_135180",
                              width: "19.6",
                              height: "4.667",
                              x: "0",
                              y: "5.167",
                              "color-interpolation-filters": "sRGB",
                              filterUnits: "userSpaceOnUse"
                            }, [
                              e("feFlood", {
                                "flood-opacity": "0",
                                result: "BackgroundImageFix"
                              }),
                              e("feColorMatrix", {
                                in: "SourceAlpha",
                                result: "hardAlpha",
                                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              }),
                              e("feOffset"),
                              e("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" }),
                              e("feBlend", {
                                in2: "BackgroundImageFix",
                                result: "effect1_dropShadow_374_135180"
                              }),
                              e("feBlend", {
                                in: "SourceGraphic",
                                in2: "effect1_dropShadow_374_135180",
                                result: "shape"
                              })
                            ]),
                            e("filter", {
                              id: "filter1_d_374_135180",
                              width: "19.6",
                              height: "4.667",
                              x: "0",
                              y: "9.833",
                              "color-interpolation-filters": "sRGB",
                              filterUnits: "userSpaceOnUse"
                            }, [
                              e("feFlood", {
                                "flood-opacity": "0",
                                result: "BackgroundImageFix"
                              }),
                              e("feColorMatrix", {
                                in: "SourceAlpha",
                                result: "hardAlpha",
                                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              }),
                              e("feOffset"),
                              e("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" }),
                              e("feBlend", {
                                in2: "BackgroundImageFix",
                                result: "effect1_dropShadow_374_135180"
                              }),
                              e("feBlend", {
                                in: "SourceGraphic",
                                in2: "effect1_dropShadow_374_135180",
                                result: "shape"
                              })
                            ])
                          ])
                        ]),
                        _(" Germany (+49) ")
                      ])
                    ])
                  ])
                ])
              ]),
              e("label", {
                for: "phone-input",
                class: "mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              }, "Phone number:"),
              e("div", { class: "relative w-full" }, [
                e("input", {
                  type: "phone",
                  id: "phone-input",
                  class: "block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
                  pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
                  placeholder: "123-456-7890",
                  required: ""
                })
              ])
            ])
          ], -1)),
          G(e("input", {
            "onUpdate:modelValue": (g) => n.value[s] = g,
            onBlur: (g) => h(s, g.target.value),
            class: "fi-input text-center border-none py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] disabled:placeholder:[-webkit-text-fill-color:theme(colors.gray.400)] dark:text-white dark:placeholder:text-gray-500 dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] dark:disabled:placeholder:[-webkit-text-fill-color:theme(colors.gray.500)] sm:text-sm sm:leading-6 bg-white/0 ps-0 pe-3"
          }, null, 40, fe), [
            [J, n.value[s]]
          ]),
          e("select", {
            value: y.bestOf,
            onChange: (g) => x(s, g.target.value),
            class: "fi-select-input w-32border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900"
          }, [
            (c(), v(z, null, F(l, (g) => e("option", {
              key: g,
              value: g
            }, " Best of " + C(g), 9, ve)), 64))
          ], 40, pe)
        ])
      ]))), 128))
    ]));
  }
}, ye = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, xe = { class: "flex flex-col" }, be = { class: "overflow-x-auto" }, we = { class: "min-w-max" }, ke = { class: "flex flex-1 p-5" }, Te = {
  __name: "BracketLower",
  props: {
    initialState: {
      type: Array,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    defaultBestOf: {
      type: Number,
      default: 3,
      validator: (t) => [1, 3, 5, 7, 9].includes(t)
    }
  },
  emits: ["update:state"],
  setup(t, { emit: p }) {
    const a = p, i = t, l = B([]), n = B(null), h = N(() => {
      const o = /* @__PURE__ */ new Set();
      return l.value.forEach((b) => {
        b.items.forEach((r) => {
          r[d.ONE].name !== k && o.add(r[d.ONE].name), r[d.TWO].name !== k && o.add(r[d.TWO].name);
        });
      }), Array.from(o);
    }), x = (o) => {
      n.value = o;
    }, u = () => {
      n.value = null;
    }, m = (o, b, r) => {
      if (console.log("Updating lower match:", { roundIndex: o, matchIndex: b, updatedMatch: r }), l.value[o] && l.value[o].items) {
        if (l.value[o].items[b] = r, r.winner && o < l.value.length - 1) {
          const w = o + 1, f = Math.floor(b / 2);
          if (l.value[w] && l.value[w].items[f]) {
            const T = l.value[w].items[f], O = b % 2 === 0 ? d.ONE : d.TWO, M = r[r.winner];
            l.value[w].items[f] = {
              ...T,
              [O]: {
                id: M.id,
                name: M.name,
                logo: M.logo,
                score: 0
              }
            };
          }
        }
        s();
      }
    }, y = (o) => {
      console.log("Updating lower columns:", o), l.value = o, s();
    }, s = () => {
      console.log("Emitting lower tournament state:", l.value), a("update:state", l.value);
    }, g = () => {
      console.log("Initializing lower tournament with state:", i.initialState), i.initialState && i.initialState.length > 0 && (l.value = JSON.parse(JSON.stringify(i.initialState)));
    };
    return A(() => i.initialState, () => {
      g();
    }, { deep: !0 }), W(() => {
      g();
    }), (o, b) => (c(), v("div", ye, [
      b[0] || (b[0] = e("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Lower Bracket", -1)),
      e("div", xe, [
        e("div", be, [
          e("div", we, [
            U(Q, {
              columns: l.value,
              "onUpdate:columns": y
            }, null, 8, ["columns"]),
            e("div", ke, [
              (c(!0), v(z, null, F(l.value, (r, w) => (c(), q(K, {
                key: r.name,
                column: r,
                "column-index": w,
                "available-teams": t.availableTeams,
                "selected-teams": h.value,
                "highlighted-team": n.value,
                "onUpdate:match": m,
                onHighlightTeam: x,
                onUnhighlightTeam: u
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}, j = () => ({
  id: null,
  name: k,
  logo: null,
  score: 0
}), V = (t) => ({
  number: t,
  [d.ONE]: j(),
  [d.TWO]: j(),
  winner: null
}), Ue = (t, p = 3) => {
  const a = [], i = Math.log2(t);
  let l = 1;
  for (let n = 0; n < i; n++) {
    const h = Math.pow(2, i - n - 1), x = [];
    for (let u = 0; u < h; u++)
      x.push(V(l++));
    a.push({
      name: `Round ${n + 1}`,
      items: x,
      bestOf: p
    });
  }
  return a;
}, P = (t, p) => {
  const a = [];
  let i = 1;
  const l = Math.pow(2, t - 2), n = {
    name: "Lower Round 1",
    bestOf: p,
    items: Array(l).fill(null).map(() => V(i++))
  };
  a.push(n);
  const h = Math.pow(2, t - 3), x = {
    name: "Lower Round 2",
    bestOf: p,
    items: Array(h).fill(null).map(() => V(i++))
  };
  if (a.push(x), t > 3) {
    const u = Math.pow(2, t - 4), m = {
      name: "Lower Round 3",
      bestOf: p,
      items: Array(u).fill(null).map(() => V(i++))
    };
    a.push(m);
  }
  return a;
}, Oe = { class: "flex flex-col" }, Se = { class: "flex flex-col" }, Me = { class: "overflow-x-auto" }, Be = { class: "min-w-max" }, _e = { class: "flex flex-1 p-5" }, Ee = {
  __name: "TournamentBracket",
  props: {
    initialState: {
      type: Object,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    defaultBestOf: {
      type: Number,
      required: !0
    },
    format: {
      type: String,
      required: !0
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [H.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(t, { emit: p }) {
    const a = p, i = t, l = B([]), n = B([]), h = B(null), x = N(() => {
      const r = /* @__PURE__ */ new Set();
      return l.value.forEach((w) => {
        w.items.forEach((f) => {
          f[d.ONE].name !== k && r.add(f[d.ONE].name), f[d.TWO].name !== k && r.add(f[d.TWO].name);
        });
      }), i.format === E.DOUBLE_ELIMINATION && n.value.forEach((w) => {
        w.items.forEach((f) => {
          f[d.ONE].name !== k && r.add(f[d.ONE].name), f[d.TWO].name !== k && r.add(f[d.TWO].name);
        });
      }), Array.from(r);
    }), u = (r) => {
      h.value = r;
    }, m = () => {
      h.value = null;
    }, y = (r, w, f) => {
      if (console.log("Updating upper match:", { roundIndex: r, matchIndex: w, updatedMatch: f }), l.value[r] && l.value[r].items) {
        if (l.value[r].items[w] = f, f.winner && r < l.value.length - 1) {
          const T = r + 1, O = Math.floor(w / 2);
          if (l.value[T] && l.value[T].items[O]) {
            const M = l.value[T].items[O], $ = w % 2 === 0 ? d.ONE : d.TWO, L = f[f.winner];
            l.value[T].items[O] = {
              ...M,
              [$]: {
                id: L.id,
                name: L.name,
                logo: L.logo,
                score: 0
              }
            };
          }
        }
        if (i.format === E.DOUBLE_ELIMINATION && f.winner) {
          const T = f[f.winner === d.ONE ? d.TWO : d.ONE];
          if (T.name !== k) {
            const O = Math.floor(r / 2), M = Math.floor(w / 2);
            if (n.value[O] && n.value[O].items[M]) {
              const $ = n.value[O].items[M], L = w % 2 === 0 ? d.ONE : d.TWO;
              n.value[O].items[M] = {
                ...$,
                [L]: {
                  id: T.id,
                  name: T.name,
                  logo: T.logo,
                  score: 0
                }
              };
            }
          }
        }
        o();
      }
    }, s = (r) => {
      console.log("Updating upper columns:", r), l.value = r, o();
    }, g = (r) => {
      console.log("Updating lower state:", r), n.value = r, o();
    }, o = () => {
      console.log("Emitting tournament state:", {
        upper: l.value,
        lower: i.format === E.DOUBLE_ELIMINATION ? n.value : null
      }), a("update:state", {
        upper: l.value,
        lower: i.format === E.DOUBLE_ELIMINATION ? n.value : null
      });
    }, b = () => {
      console.log("Initializing tournament with state:", i.initialState), i.initialState && (Array.isArray(i.initialState) ? (l.value = JSON.parse(JSON.stringify(i.initialState)), i.format === E.DOUBLE_ELIMINATION && (n.value = P(l.value.length, i.defaultBestOf))) : (l.value = JSON.parse(JSON.stringify(i.initialState.upper || [])), n.value = JSON.parse(JSON.stringify(i.initialState.lower || []))));
    };
    return A(() => i.initialState, () => {
      b();
    }, { deep: !0 }), A(() => i.format, (r) => {
      r === E.DOUBLE_ELIMINATION && (!n.value || n.value.length === 0) && (n.value = P(l.value.length, i.defaultBestOf), o());
    }), W(() => {
      b();
    }), (r, w) => (c(), v("div", Oe, [
      w[0] || (w[0] = e("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Upper Bracket", -1)),
      e("div", Se, [
        e("div", Me, [
          e("div", Be, [
            U(Q, {
              columns: l.value,
              "onUpdate:columns": s
            }, null, 8, ["columns"]),
            e("div", _e, [
              (c(!0), v(z, null, F(l.value, (f, T) => (c(), q(K, {
                key: f.name,
                column: f,
                "column-index": T,
                "available-teams": t.availableTeams,
                "selected-teams": x.value,
                "highlighted-team": h.value,
                permissions: t.permissions,
                "onUpdate:match": y,
                onHighlightTeam: u,
                onUnhighlightTeam: m
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
            ])
          ])
        ])
      ]),
      t.format === S(E).DOUBLE_ELIMINATION ? (c(), q(Te, {
        key: 0,
        "initial-state": n.value,
        "available-teams": t.availableTeams,
        "default-best-of": t.defaultBestOf,
        permissions: t.permissions,
        "onUpdate:state": g
      }, null, 8, ["initial-state", "available-teams", "default-best-of", "permissions"])) : I("", !0)
    ]));
  }
}, Ne = (t) => {
  t.component("TournamentBracket", Ee);
};
export {
  Ee as TournamentBracket,
  P as createLowerBracketStructure,
  Ue as createTournamentState,
  Ne as install
};
