import { ref as B, computed as N, watch as H, onMounted as C, createElementBlock as v, openBlock as c, normalizeClass as W, createCommentVNode as V, withDirectives as R, createElementVNode as e, Fragment as U, renderList as F, toDisplayString as L, vModelSelect as Q, vModelText as j, createVNode as E, unref as M, createTextVNode as z, createBlock as q } from "vue";
const S = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, k = "TBD", d = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, X = {
  key: 0,
  class: "flex items-center gap-2"
}, Y = ["src", "alt"], Z = ["value", "disabled"], ee = {
  key: 1,
  class: "flex items-center gap-2"
}, te = ["src", "alt"], ae = { class: "text-gray-900 dark:text-white" }, le = {
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
      return l.value === k ? null : ((s = a.availableTeams.find((f) => f.name === l.value)) == null ? void 0 : s.logo) || null;
    });
    H(() => a.team, (s) => {
      l.value = s.name;
    }, { immediate: !0 }), C(() => {
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
      const s = a.availableTeams.find((f) => f.name === l.value);
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
    return (s, f) => (c(), v("div", {
      class: W(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": t.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": t.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": t.shouldHighlight && t.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": t.shouldHighlight && t.isLoser
      }]),
      onMouseenter: u,
      onMouseleave: m
    }, [
      t.canEdit ? (c(), v("div", X, [
        n.value ? (c(), v("img", {
          key: 0,
          src: n.value,
          alt: l.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, Y)) : V("", !0),
        R(e("select", {
          "onUpdate:modelValue": f[0] || (f[0] = (o) => l.value = o),
          class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 hover:cursor-pointer",
          onChange: y
        }, [
          f[1] || (f[1] = e("option", { value: "TBD" }, "TBD", -1)),
          (c(!0), v(U, null, F(x.value, (o) => (c(), v("option", {
            key: o.id,
            value: o.name,
            disabled: h(o.name)
          }, L(o.name), 9, Z))), 128))
        ], 544), [
          [Q, l.value]
        ])
      ])) : (c(), v("div", ee, [
        t.team.logo ? (c(), v("img", {
          key: 0,
          src: t.team.logo,
          alt: t.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, te)) : V("", !0),
        e("span", ae, L(t.team.name), 1)
      ]))
    ], 34));
  }
}, ie = {
  key: 1,
  class: "text-white"
}, re = {
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
    return H(() => a.team, (u) => {
      n.value = u.score ?? 0;
    }, { deep: !0 }), (u, m) => (c(), v("div", {
      class: W(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": t.isFirstTeam }]),
      onClick: h
    }, [
      l.value ? R((c(), v("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": m[0] || (m[0] = (y) => n.value = y),
        class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
        min: "0",
        onChange: x,
        onBlur: m[1] || (m[1] = (y) => l.value = !1)
      }, null, 544)), [
        [j, n.value]
      ]) : (c(), v("span", ie, L(t.team.score), 1))
    ], 2));
  }
}, ne = { class: "flex" }, G = {
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
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(t) {
    return (p, a) => (c(), v("div", ne, [
      E(le, {
        team: t.team,
        "team-position": t.teamPosition,
        "available-teams": t.availableTeams,
        "selected-teams": t.selectedTeams,
        "can-edit": t.canEdit,
        "is-winner": t.isWinner,
        "is-loser": t.isLoser,
        "should-highlight": t.shouldHighlight,
        "onUpdate:team": a[0] || (a[0] = (i) => p.$emit("update:team", i)),
        onHighlightTeam: a[1] || (a[1] = (i) => p.$emit("highlight-team", i)),
        onUnhighlightTeam: a[2] || (a[2] = (i) => p.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "is-winner", "is-loser", "should-highlight"]),
      E(re, {
        team: t.team,
        "team-position": t.teamPosition,
        "can-edit-score": t.canEditScore,
        "is-first-team": t.isFirstTeam,
        "onUpdate:score": a[3] || (a[3] = (i) => p.$emit("update:score", i))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, oe = { class: "my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10" }, se = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[1px] mx-2 transition-colors duration-200"
}, de = {
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
    }, f = ({ position: o, score: b }) => {
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
      class: W(["relative text-[0.8em] flex items-center", { group: t.index % 2 == 0 && t.totalMatches > 1 }])
    }, [
      e("div", oe, [
        E(G, {
          team: t.match.teamOne,
          "team-position": M(d).ONE,
          "available-teams": t.availableTeams,
          "selected-teams": t.selectedTeams,
          "can-edit": l.value,
          "can-edit-score": n.value,
          "is-winner": h(M(d).ONE),
          "is-loser": x(M(d).ONE),
          "should-highlight": u(M(d).ONE),
          "is-first-team": !0,
          "onUpdate:team": s,
          "onUpdate:score": f,
          onHighlightTeam: m,
          onUnhighlightTeam: y
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight"]),
        E(G, {
          team: t.match.teamTwo,
          "team-position": M(d).TWO,
          "available-teams": t.availableTeams,
          "selected-teams": t.selectedTeams,
          "can-edit": l.value,
          "can-edit-score": n.value,
          "is-winner": h(M(d).TWO),
          "is-loser": x(M(d).TWO),
          "should-highlight": u(M(d).TWO),
          "onUpdate:team": s,
          "onUpdate:score": f,
          onHighlightTeam: m,
          onUnhighlightTeam: y
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight"])
      ]),
      t.index % 2 == 0 && t.totalMatches > 1 ? (c(), v("div", se, b[0] || (b[0] = [
        e("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : V("", !0)
    ], 2));
  }
}, ue = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, me = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50" }, J = {
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
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(t, { emit: p }) {
    const a = t, i = p, l = (n, h) => {
      i("update:match", a.columnIndex, n, h);
    };
    return (n, h) => (c(), v("div", ue, [
      (c(!0), v(U, null, F(t.column.items, (x, u) => (c(), v(U, {
        key: x.number
      }, [
        e("div", me, L(x.number), 1),
        E(de, {
          match: x,
          index: u,
          "total-matches": t.column.items.length,
          "round-index": t.columnIndex,
          "available-teams": t.availableTeams,
          "selected-teams": t.selectedTeams,
          "highlighted-team": t.highlightedTeam,
          "onUpdate:match": (m) => l(u, m),
          onHighlightTeam: h[0] || (h[0] = (m) => n.$emit("highlight-team", m)),
          onUnhighlightTeam: h[1] || (h[1] = (m) => n.$emit("unhighlight-team"))
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "onUpdate:match"])
      ], 64))), 128))
    ]));
  }
}, ce = { class: "flex justify-between px-5" }, he = { class: "flex flex-col items-center gap-2" }, fe = ["onUpdate:modelValue", "onBlur"], ge = ["value", "onChange"], pe = ["value"], K = {
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
    H(() => a.columns, (u) => {
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
    return (u, m) => (c(), v("div", ce, [
      (c(!0), v(U, null, F(t.columns, (y, s) => (c(), v("div", {
        key: y.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        e("div", he, [
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
                z(" +1 "),
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
                        z(" United States (+1) ")
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
                        z(" United Kingdom (+44) ")
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
                        z(" Australia (+61) ")
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
                        z(" Germany (+49) ")
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
                        z(" France (+33) ")
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
                        z(" Germany (+49) ")
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
          R(e("input", {
            "onUpdate:modelValue": (f) => n.value[s] = f,
            onBlur: (f) => h(s, f.target.value),
            class: "fi-input text-center border-none py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] disabled:placeholder:[-webkit-text-fill-color:theme(colors.gray.400)] dark:text-white dark:placeholder:text-gray-500 dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] dark:disabled:placeholder:[-webkit-text-fill-color:theme(colors.gray.500)] sm:text-sm sm:leading-6 bg-white/0 ps-0 pe-3"
          }, null, 40, fe), [
            [j, n.value[s]]
          ]),
          e("select", {
            value: y.bestOf,
            onChange: (f) => x(s, f.target.value),
            class: "fi-select-input w-32border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900"
          }, [
            (c(), v(U, null, F(l, (f) => e("option", {
              key: f,
              value: f
            }, " Best of " + L(f), 9, pe)), 64))
          ], 40, ge)
        ])
      ]))), 128))
    ]));
  }
}, ve = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, ye = { class: "flex flex-col" }, xe = { class: "overflow-x-auto" }, be = { class: "min-w-max" }, we = { class: "flex flex-1 p-5" }, ke = {
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
          const w = o + 1, g = Math.floor(b / 2);
          if (l.value[w] && l.value[w].items[g]) {
            const T = l.value[w].items[g], O = b % 2 === 0 ? d.ONE : d.TWO, _ = r[r.winner];
            l.value[w].items[g] = {
              ...T,
              [O]: {
                id: _.id,
                name: _.name,
                logo: _.logo,
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
    }, f = () => {
      console.log("Initializing lower tournament with state:", i.initialState), i.initialState && i.initialState.length > 0 && (l.value = JSON.parse(JSON.stringify(i.initialState)));
    };
    return H(() => i.initialState, () => {
      f();
    }, { deep: !0 }), C(() => {
      f();
    }), (o, b) => (c(), v("div", ve, [
      b[0] || (b[0] = e("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Lower Bracket", -1)),
      e("div", ye, [
        e("div", xe, [
          e("div", be, [
            E(K, {
              columns: l.value,
              "onUpdate:columns": y
            }, null, 8, ["columns"]),
            e("div", we, [
              (c(!0), v(U, null, F(l.value, (r, w) => (c(), q(J, {
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
}, D = () => ({
  id: null,
  name: k,
  logo: null,
  score: 0
}), I = (t) => ({
  number: t,
  [d.ONE]: D(),
  [d.TWO]: D(),
  winner: null
}), Ue = (t, p = 3) => {
  const a = [], i = Math.log2(t);
  let l = 1;
  for (let n = 0; n < i; n++) {
    const h = Math.pow(2, i - n - 1), x = [];
    for (let u = 0; u < h; u++)
      x.push(I(l++));
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
    items: Array(l).fill(null).map(() => I(i++))
  };
  a.push(n);
  const h = Math.pow(2, t - 3), x = {
    name: "Lower Round 2",
    bestOf: p,
    items: Array(h).fill(null).map(() => I(i++))
  };
  if (a.push(x), t > 3) {
    const u = Math.pow(2, t - 4), m = {
      name: "Lower Round 3",
      bestOf: p,
      items: Array(u).fill(null).map(() => I(i++))
    };
    a.push(m);
  }
  return a;
}, Te = { class: "flex flex-col" }, Oe = { class: "flex flex-col" }, _e = { class: "overflow-x-auto" }, Se = { class: "min-w-max" }, Me = { class: "flex flex-1 p-5" }, Be = {
  __name: "TournamentBracket",
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
    },
    format: {
      type: String,
      default: S.SINGLE_ELIMINATION,
      validator: (t) => Object.values(S).includes(t)
    }
  },
  emits: ["update:state"],
  setup(t, { emit: p }) {
    const a = p, i = t, l = B([]), n = B([]), h = B(null), x = N(() => {
      const r = /* @__PURE__ */ new Set();
      return l.value.forEach((w) => {
        w.items.forEach((g) => {
          g[d.ONE].name !== k && r.add(g[d.ONE].name), g[d.TWO].name !== k && r.add(g[d.TWO].name);
        });
      }), i.format === S.DOUBLE_ELIMINATION && n.value.forEach((w) => {
        w.items.forEach((g) => {
          g[d.ONE].name !== k && r.add(g[d.ONE].name), g[d.TWO].name !== k && r.add(g[d.TWO].name);
        });
      }), Array.from(r);
    }), u = (r) => {
      h.value = r;
    }, m = () => {
      h.value = null;
    }, y = (r, w, g) => {
      if (console.log("Updating upper match:", { roundIndex: r, matchIndex: w, updatedMatch: g }), l.value[r] && l.value[r].items) {
        if (l.value[r].items[w] = g, g.winner && r < l.value.length - 1) {
          const T = r + 1, O = Math.floor(w / 2);
          if (l.value[T] && l.value[T].items[O]) {
            const _ = l.value[T].items[O], $ = w % 2 === 0 ? d.ONE : d.TWO, A = g[g.winner];
            l.value[T].items[O] = {
              ..._,
              [$]: {
                id: A.id,
                name: A.name,
                logo: A.logo,
                score: 0
              }
            };
          }
        }
        if (i.format === S.DOUBLE_ELIMINATION && g.winner) {
          const T = g[g.winner === d.ONE ? d.TWO : d.ONE];
          if (T.name !== k) {
            const O = Math.floor(r / 2), _ = Math.floor(w / 2);
            if (n.value[O] && n.value[O].items[_]) {
              const $ = n.value[O].items[_], A = w % 2 === 0 ? d.ONE : d.TWO;
              n.value[O].items[_] = {
                ...$,
                [A]: {
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
    }, f = (r) => {
      console.log("Updating lower state:", r), n.value = r, o();
    }, o = () => {
      console.log("Emitting tournament state:", {
        upper: l.value,
        lower: i.format === S.DOUBLE_ELIMINATION ? n.value : null
      }), a("update:state", {
        upper: l.value,
        lower: i.format === S.DOUBLE_ELIMINATION ? n.value : null
      });
    }, b = () => {
      console.log("Initializing tournament with state:", i.initialState), i.initialState && (Array.isArray(i.initialState) ? (l.value = JSON.parse(JSON.stringify(i.initialState)), i.format === S.DOUBLE_ELIMINATION && (n.value = P(l.value.length, i.defaultBestOf))) : (l.value = JSON.parse(JSON.stringify(i.initialState.upper || [])), n.value = JSON.parse(JSON.stringify(i.initialState.lower || []))));
    };
    return H(() => i.initialState, () => {
      b();
    }, { deep: !0 }), H(() => i.format, (r) => {
      r === S.DOUBLE_ELIMINATION && (!n.value || n.value.length === 0) && (n.value = P(l.value.length, i.defaultBestOf), o());
    }), C(() => {
      b();
    }), (r, w) => (c(), v("div", Te, [
      w[0] || (w[0] = e("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Upper Bracket", -1)),
      e("div", Oe, [
        e("div", _e, [
          e("div", Se, [
            E(K, {
              columns: l.value,
              "onUpdate:columns": s
            }, null, 8, ["columns"]),
            e("div", Me, [
              (c(!0), v(U, null, F(l.value, (g, T) => (c(), q(J, {
                key: g.name,
                column: g,
                "column-index": T,
                "available-teams": t.availableTeams,
                "selected-teams": x.value,
                "highlighted-team": h.value,
                "onUpdate:match": y,
                onHighlightTeam: u,
                onUnhighlightTeam: m
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ]),
      t.format === M(S).DOUBLE_ELIMINATION ? (c(), q(ke, {
        key: 0,
        "initial-state": n.value,
        "available-teams": t.availableTeams,
        "default-best-of": t.defaultBestOf,
        "onUpdate:state": f
      }, null, 8, ["initial-state", "available-teams", "default-best-of"])) : V("", !0)
    ]));
  }
}, Ee = (t) => {
  t.component("TournamentBracket", Be);
};
export {
  Be as TournamentBracket,
  P as createLowerBracketStructure,
  Ue as createTournamentState,
  Ee as install
};
