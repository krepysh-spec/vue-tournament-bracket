import { ref as B, computed as $, watch as q, onMounted as R, createElementBlock as v, openBlock as m, normalizeClass as C, withDirectives as j, createCommentVNode as A, createElementVNode as T, Fragment as S, renderList as E, toDisplayString as D, vModelSelect as V, vModelText as W, createVNode as O, createBlock as L } from "vue";
const G = {
  key: 0,
  class: "relative"
}, I = ["value", "disabled"], K = ["src", "alt"], Q = {
  key: 1,
  class: "flex items-center gap-2"
}, X = ["src", "alt"], Y = { class: "text-gray-900 dark:text-white" }, Z = {
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
  setup(e, { emit: u }) {
    const t = e, n = u, a = B(t.team.name), i = $(() => {
      var s;
      return a.value === "TBD" ? null : ((s = t.availableTeams.find((b) => b.name === a.value)) == null ? void 0 : s.logo) || null;
    });
    q(() => t.team, (s) => {
      a.value = s.name;
    }, { immediate: !0 }), R(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const c = (s) => s === "TBD" ? !1 : t.selectedTeams.includes(s) && s !== t.team.name || s === t.team.name && t.team.name !== "TBD", d = $(() => t.availableTeams ? t.availableTeams.filter((s) => s.name === "TBD" || s.name === t.team.name ? !0 : !c(s.name)) : []), h = () => {
      t.team.name !== "TBD" && n("highlight-team", t.team.name);
    }, r = () => {
      n("unhighlight-team");
    }, y = () => {
      const s = t.availableTeams.find((b) => b.name === a.value);
      console.log("Updating team:", { selectedTeam: a.value, selectedTeamData: s }), n("update:team", {
        position: t.teamPosition,
        team: {
          id: (s == null ? void 0 : s.id) || null,
          name: a.value,
          logo: (s == null ? void 0 : s.logo) || null,
          score: 0
        }
      });
    };
    return (s, b) => (m(), v("div", {
      class: C(["flex-grow p-2.5 hover:bg-gray-200 dark:hover:bg-gray-700", {
        "hover:bg-green-900/30 dark:hover:bg-green-900/30": e.isWinner,
        "hover:bg-red-900/30 dark:hover:bg-red-900/30": e.isLoser,
        "bg-green-900/30 dark:bg-green-900/30": e.shouldHighlight && e.isWinner,
        "bg-red-900/30 dark:bg-red-900/30": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: h,
      onMouseleave: r
    }, [
      e.canEdit ? (m(), v("div", G, [
        j(T("select", {
          "onUpdate:modelValue": b[0] || (b[0] = (o) => a.value = o),
          class: "w-full cursor-pointer bg-transparent text-gray-900 dark:text-white pl-8",
          onChange: y
        }, [
          b[1] || (b[1] = T("option", { value: "TBD" }, "TBD", -1)),
          (m(!0), v(S, null, E(d.value, (o) => (m(), v("option", {
            key: o.id,
            value: o.name,
            disabled: c(o.name)
          }, D(o.name), 9, I))), 128))
        ], 544), [
          [V, a.value]
        ]),
        i.value ? (m(), v("img", {
          key: 0,
          src: i.value,
          alt: a.value,
          class: "absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
        }, null, 8, K)) : A("", !0)
      ])) : (m(), v("div", Q, [
        e.team.logo ? (m(), v("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, X)) : A("", !0),
        T("span", Y, D(e.team.name), 1)
      ]))
    ], 34));
  }
}, _ = {
  key: 1,
  class: "text-white"
}, ee = {
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
  setup(e, { emit: u }) {
    const t = e, n = u, a = B(!1), i = B(t.team.score ?? 0), c = () => {
      t.canEditScore && (a.value = !0);
    }, d = () => {
      const h = parseInt(i.value) || 0;
      n("update:score", {
        position: t.teamPosition,
        score: h
      });
    };
    return q(() => t.team, (h) => {
      i.value = h.score ?? 0;
    }, { deep: !0 }), (h, r) => (m(), v("div", {
      class: C(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: c
    }, [
      a.value ? j((m(), v("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": r[0] || (r[0] = (y) => i.value = y),
        class: "w-12 bg-orange-500 dark:bg-orange-600 text-center text-white",
        min: "0",
        onChange: d,
        onBlur: r[1] || (r[1] = (y) => a.value = !1)
      }, null, 544)), [
        [W, i.value]
      ]) : (m(), v("span", _, D(e.team.score), 1))
    ], 2));
  }
}, te = { class: "flex" }, H = {
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
  setup(e) {
    return (u, t) => (m(), v("div", te, [
      O(Z, {
        team: e.team,
        "team-position": e.teamPosition,
        "available-teams": e.availableTeams,
        "selected-teams": e.selectedTeams,
        "can-edit": e.canEdit,
        "is-winner": e.isWinner,
        "is-loser": e.isLoser,
        "should-highlight": e.shouldHighlight,
        "onUpdate:team": t[0] || (t[0] = (n) => u.$emit("update:team", n)),
        onHighlightTeam: t[1] || (t[1] = (n) => u.$emit("highlight-team", n)),
        onUnhighlightTeam: t[2] || (t[2] = (n) => u.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "is-winner", "is-loser", "should-highlight"]),
      O(ee, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (n) => u.$emit("update:score", n))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, ae = { class: "my-1.5 ml-2.5 bg-white dark:bg-gray-800 rounded overflow-hidden w-full min-w-[200px] shadow" }, ne = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[1px] mx-2 transition-colors duration-200"
}, le = {
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
  setup(e, { emit: u }) {
    const t = e, n = u, a = $(() => t.roundIndex === 0), i = $(() => t.match.teamOne.name !== "TBD" && t.match.teamTwo.name !== "TBD"), c = (o) => t.match.winner === o, d = (o) => t.match.winner && t.match.winner !== o, h = (o) => {
      const f = t.match[o].name;
      return t.highlightedTeam === f;
    }, r = (o) => {
      n("highlight-team", o);
    }, y = () => {
      n("unhighlight-team");
    }, s = ({ position: o, team: f }) => {
      const l = {
        ...t.match,
        [o]: f
      };
      n("update:match", l);
    }, b = ({ position: o, score: f }) => {
      const l = {
        ...t.match,
        [o]: {
          ...t.match[o],
          score: f
        }
      };
      l.teamOne.score > 0 || l.teamTwo.score > 0 ? l.winner = l.teamOne.score > l.teamTwo.score ? "teamOne" : "teamTwo" : l.winner = null, n("update:match", l);
    };
    return (o, f) => (m(), v("div", {
      class: C(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      T("div", ae, [
        O(H, {
          team: e.match.teamOne,
          "team-position": "teamOne",
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": i.value,
          "is-winner": c("teamOne"),
          "is-loser": d("teamOne"),
          "should-highlight": h("teamOne"),
          "is-first-team": !0,
          "onUpdate:team": s,
          "onUpdate:score": b,
          onHighlightTeam: r,
          onUnhighlightTeam: y
        }, null, 8, ["team", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight"]),
        O(H, {
          team: e.match.teamTwo,
          "team-position": "teamTwo",
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": i.value,
          "is-winner": c("teamTwo"),
          "is-loser": d("teamTwo"),
          "should-highlight": h("teamTwo"),
          "onUpdate:team": s,
          "onUpdate:score": b,
          onHighlightTeam: r,
          onUnhighlightTeam: y
        }, null, 8, ["team", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight"])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (m(), v("div", ne, f[0] || (f[0] = [
        T("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : A("", !0)
    ], 2));
  }
}, ie = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, oe = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50" }, z = {
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
  setup(e, { emit: u }) {
    const t = e, n = u, a = (i, c) => {
      n("update:match", t.columnIndex, i, c);
    };
    return (i, c) => (m(), v("div", ie, [
      (m(!0), v(S, null, E(e.column.items, (d, h) => (m(), v(S, {
        key: d.number
      }, [
        T("div", oe, D(d.number), 1),
        O(le, {
          match: d,
          index: h,
          "total-matches": e.column.items.length,
          "round-index": e.columnIndex,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "highlighted-team": e.highlightedTeam,
          "onUpdate:match": (r) => a(h, r),
          onHighlightTeam: c[0] || (c[0] = (r) => i.$emit("highlight-team", r)),
          onUnhighlightTeam: c[1] || (c[1] = (r) => i.$emit("unhighlight-team"))
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "onUpdate:match"])
      ], 64))), 128))
    ]));
  }
}, se = { class: "flex justify-between px-5" }, re = { class: "flex flex-col items-center gap-2" }, me = ["value", "onInput"], ue = ["value", "onChange"], ce = ["value"], F = {
  __name: "BracketRoundHeaders",
  props: {
    columns: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:columns"],
  setup(e, { emit: u }) {
    const t = e, n = u, a = [1, 3, 5, 7, 9], i = (d, h) => {
      const r = [...t.columns];
      r[d] = {
        ...r[d],
        name: h
      }, n("update:columns", r);
    }, c = (d, h) => {
      const r = [...t.columns];
      r[d] = {
        ...r[d],
        bestOf: Number(h)
      }, n("update:columns", r);
    };
    return (d, h) => (m(), v("div", se, [
      (m(!0), v(S, null, E(e.columns, (r, y) => (m(), v("div", {
        key: r.name,
        class: "flex-1 text-center text-sm text-gray-400"
      }, [
        T("div", re, [
          T("input", {
            value: r.name,
            onInput: (s) => i(y, s.target.value),
            class: "bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-center w-32 text-gray-900 dark:text-white"
          }, null, 40, me),
          T("select", {
            value: r.bestOf,
            onChange: (s) => c(y, s.target.value),
            class: "bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-center w-32 text-gray-900 dark:text-white"
          }, [
            (m(), v(S, null, E(a, (s) => T("option", {
              key: s,
              value: s
            }, " Best of " + D(s), 9, ce)), 64))
          ], 40, ue)
        ])
      ]))), 128))
    ]));
  }
}, de = (e, u) => {
  const t = e.__vccOpts || e;
  for (const [n, a] of u)
    t[n] = a;
  return t;
}, he = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, ge = { class: "flex flex-col" }, ve = { class: "overflow-x-auto" }, fe = { class: "min-w-max" }, pe = { class: "flex flex-1 p-5" }, Te = {
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
      validator: (e) => [1, 3, 5, 7, 9].includes(e)
    }
  },
  emits: ["update:state"],
  setup(e, { emit: u }) {
    const t = u, n = e, a = B([]), i = B(null), c = $(() => {
      const o = /* @__PURE__ */ new Set();
      return a.value.forEach((f) => {
        f.items.forEach((l) => {
          l.teamOne.name !== "TBD" && o.add(l.teamOne.name), l.teamTwo.name !== "TBD" && o.add(l.teamTwo.name);
        });
      }), Array.from(o);
    }), d = (o) => {
      i.value = o;
    }, h = () => {
      i.value = null;
    }, r = (o, f, l) => {
      if (console.log("Updating lower match:", { roundIndex: o, matchIndex: f, updatedMatch: l }), a.value[o] && a.value[o].items) {
        if (a.value[o].items[f] = l, l.winner && o < a.value.length - 1) {
          const p = o + 1, g = Math.floor(f / 2);
          if (a.value[p] && a.value[p].items[g]) {
            const w = a.value[p].items[g], x = f % 2 === 0 ? "teamOne" : "teamTwo", k = l[l.winner];
            a.value[p].items[g] = {
              ...w,
              [x]: {
                id: k.id,
                name: k.name,
                logo: k.logo,
                score: 0
              }
            };
          }
        }
        s();
      }
    }, y = (o) => {
      console.log("Updating lower columns:", o), a.value = o, s();
    }, s = () => {
      console.log("Emitting lower tournament state:", a.value), t("update:state", a.value);
    }, b = () => {
      console.log("Initializing lower tournament with state:", n.initialState), n.initialState && n.initialState.length > 0 && (a.value = JSON.parse(JSON.stringify(n.initialState)));
    };
    return q(() => n.initialState, () => {
      b();
    }, { deep: !0 }), R(() => {
      b();
    }), (o, f) => (m(), v("div", he, [
      f[0] || (f[0] = T("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Lower Bracket", -1)),
      T("div", ge, [
        T("div", ve, [
          T("div", fe, [
            O(F, {
              columns: a.value,
              "onUpdate:columns": y
            }, null, 8, ["columns"]),
            T("div", pe, [
              (m(!0), v(S, null, E(a.value, (l, p) => (m(), L(z, {
                key: l.name,
                column: l,
                "column-index": p,
                "available-teams": e.availableTeams,
                "selected-teams": c.value,
                "highlighted-team": i.value,
                "onUpdate:match": r,
                onHighlightTeam: d,
                onUnhighlightTeam: h
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}, be = /* @__PURE__ */ de(Te, [["__scopeId", "data-v-9781a410"]]), P = () => ({
  id: null,
  name: "TBD",
  logo: null,
  score: 0
}), M = (e) => ({
  number: e,
  teamOne: P(),
  teamTwo: P(),
  winner: null
}), $e = (e, u = 3) => {
  const t = [], n = Math.log2(e);
  let a = 1;
  for (let i = 0; i < n; i++) {
    const c = Math.pow(2, n - i - 1), d = [];
    for (let h = 0; h < c; h++)
      d.push(M(a++));
    t.push({
      name: `Round ${i + 1}`,
      items: d,
      bestOf: u
    });
  }
  return t;
}, J = (e, u) => {
  const t = [];
  let n = 1;
  const a = Math.pow(2, e - 2), i = {
    name: "Lower Round 1",
    bestOf: u,
    items: Array(a).fill(null).map(() => M(n++))
  };
  t.push(i);
  const c = Math.pow(2, e - 3), d = {
    name: "Lower Round 2",
    bestOf: u,
    items: Array(c).fill(null).map(() => M(n++))
  };
  if (t.push(d), e > 3) {
    const h = Math.pow(2, e - 4), r = {
      name: "Lower Round 3",
      bestOf: u,
      items: Array(h).fill(null).map(() => M(n++))
    };
    t.push(r);
  }
  return t;
}, ye = { class: "flex flex-col" }, we = { class: "flex flex-col" }, xe = { class: "overflow-x-auto" }, ke = { class: "min-w-max" }, Be = { class: "flex flex-1 p-5" }, Se = {
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
      validator: (e) => [1, 3, 5, 7, 9].includes(e)
    },
    isDoubleElimination: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:state"],
  setup(e, { emit: u }) {
    const t = u, n = e, a = B([]), i = B([]), c = B(null), d = $(() => {
      const l = /* @__PURE__ */ new Set();
      return a.value.forEach((p) => {
        p.items.forEach((g) => {
          g.teamOne.name !== "TBD" && l.add(g.teamOne.name), g.teamTwo.name !== "TBD" && l.add(g.teamTwo.name);
        });
      }), n.isDoubleElimination && i.value.forEach((p) => {
        p.items.forEach((g) => {
          g.teamOne.name !== "TBD" && l.add(g.teamOne.name), g.teamTwo.name !== "TBD" && l.add(g.teamTwo.name);
        });
      }), Array.from(l);
    }), h = (l) => {
      c.value = l;
    }, r = () => {
      c.value = null;
    }, y = (l, p, g) => {
      if (console.log("Updating upper match:", { roundIndex: l, matchIndex: p, updatedMatch: g }), a.value[l] && a.value[l].items) {
        if (a.value[l].items[p] = g, g.winner && l < a.value.length - 1) {
          const w = l + 1, x = Math.floor(p / 2);
          if (a.value[w] && a.value[w].items[x]) {
            const k = a.value[w].items[x], N = p % 2 === 0 ? "teamOne" : "teamTwo", U = g[g.winner];
            a.value[w].items[x] = {
              ...k,
              [N]: {
                id: U.id,
                name: U.name,
                logo: U.logo,
                score: 0
              }
            };
          }
        }
        if (n.isDoubleElimination && g.winner) {
          const w = g[g.winner === "teamOne" ? "teamTwo" : "teamOne"];
          if (w.name !== "TBD") {
            const x = Math.floor(l / 2), k = Math.floor(p / 2);
            if (i.value[x] && i.value[x].items[k]) {
              const N = i.value[x].items[k], U = p % 2 === 0 ? "teamOne" : "teamTwo";
              i.value[x].items[k] = {
                ...N,
                [U]: {
                  id: w.id,
                  name: w.name,
                  logo: w.logo,
                  score: 0
                }
              };
            }
          }
        }
        o();
      }
    }, s = (l) => {
      console.log("Updating upper columns:", l), a.value = l, o();
    }, b = (l) => {
      console.log("Updating lower state:", l), i.value = l, o();
    }, o = () => {
      console.log("Emitting tournament state:", {
        upper: a.value,
        lower: n.isDoubleElimination ? i.value : null
      }), t("update:state", {
        upper: a.value,
        lower: n.isDoubleElimination ? i.value : null
      });
    }, f = () => {
      console.log("Initializing tournament with state:", n.initialState), n.initialState && (Array.isArray(n.initialState) ? (a.value = JSON.parse(JSON.stringify(n.initialState)), n.isDoubleElimination && (i.value = J(a.value.length, n.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(n.initialState.upper || [])), i.value = JSON.parse(JSON.stringify(n.initialState.lower || []))));
    };
    return q(() => n.initialState, () => {
      f();
    }, { deep: !0 }), q(() => n.isDoubleElimination, (l) => {
      l && (!i.value || i.value.length === 0) && (i.value = J(a.value.length, n.defaultBestOf), o());
    }), R(() => {
      f();
    }), (l, p) => (m(), v("div", ye, [
      p[0] || (p[0] = T("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Upper Bracket", -1)),
      T("div", we, [
        T("div", xe, [
          T("div", ke, [
            O(F, {
              columns: a.value,
              "onUpdate:columns": s
            }, null, 8, ["columns"]),
            T("div", Be, [
              (m(!0), v(S, null, E(a.value, (g, w) => (m(), L(z, {
                key: g.name,
                column: g,
                "column-index": w,
                "available-teams": e.availableTeams,
                "selected-teams": d.value,
                "highlighted-team": c.value,
                "onUpdate:match": y,
                onHighlightTeam: h,
                onUnhighlightTeam: r
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ]),
      e.isDoubleElimination ? (m(), L(be, {
        key: 0,
        "initial-state": i.value,
        "available-teams": e.availableTeams,
        "default-best-of": e.defaultBestOf,
        "onUpdate:state": b
      }, null, 8, ["initial-state", "available-teams", "default-best-of"])) : A("", !0)
    ]));
  }
}, Ee = (e) => {
  e.component("TournamentBracket", Se);
};
export {
  Se as TournamentBracket,
  J as createLowerBracketStructure,
  $e as createTournamentState,
  Ee as install
};
