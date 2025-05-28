import { ref as S, computed as $, watch as q, onMounted as R, createElementBlock as v, openBlock as m, normalizeClass as C, withDirectives as j, createCommentVNode as A, createElementVNode as p, Fragment as B, renderList as E, toDisplayString as D, vModelSelect as V, vModelText as W, createVNode as O, createBlock as L } from "vue";
const G = {
  key: 0,
  class: "relative"
}, K = ["value", "disabled"], Q = ["src", "alt"], X = {
  key: 1,
  class: "flex items-center gap-2"
}, Y = ["src", "alt"], Z = { class: "text-gray-900 dark:text-white" }, I = {
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
  setup(e, { emit: g }) {
    const t = e, n = g, a = S(t.team.name), l = $(() => {
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
    const u = (s) => s === "TBD" ? !1 : t.selectedTeams.includes(s) && s !== t.team.name || s === t.team.name && t.team.name !== "TBD", c = $(() => t.availableTeams ? t.availableTeams.filter((s) => s.name === "TBD" || s.name === t.team.name ? !0 : !u(s.name)) : []), d = () => {
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
      onMouseenter: d,
      onMouseleave: r
    }, [
      e.canEdit ? (m(), v("div", G, [
        j(p("select", {
          "onUpdate:modelValue": b[0] || (b[0] = (o) => a.value = o),
          class: "w-full cursor-pointer bg-transparent text-gray-900 dark:text-white pl-8",
          onChange: y
        }, [
          b[1] || (b[1] = p("option", { value: "TBD" }, "TBD", -1)),
          (m(!0), v(B, null, E(c.value, (o) => (m(), v("option", {
            key: o.id,
            value: o.name,
            disabled: u(o.name)
          }, D(o.name), 9, K))), 128))
        ], 544), [
          [V, a.value]
        ]),
        l.value ? (m(), v("img", {
          key: 0,
          src: l.value,
          alt: a.value,
          class: "absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
        }, null, 8, Q)) : A("", !0)
      ])) : (m(), v("div", X, [
        e.team.logo ? (m(), v("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, Y)) : A("", !0),
        p("span", Z, D(e.team.name), 1)
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
  setup(e, { emit: g }) {
    const t = e, n = g, a = S(!1), l = S(t.team.score ?? 0), u = () => {
      t.canEditScore && (a.value = !0);
    }, c = () => {
      const d = parseInt(l.value) || 0;
      n("update:score", {
        position: t.teamPosition,
        score: d
      });
    };
    return q(() => t.team, (d) => {
      l.value = d.score ?? 0;
    }, { deep: !0 }), (d, r) => (m(), v("div", {
      class: C(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: u
    }, [
      a.value ? j((m(), v("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": r[0] || (r[0] = (y) => l.value = y),
        class: "w-12 bg-orange-500 dark:bg-orange-600 text-center text-white",
        min: "0",
        onChange: c,
        onBlur: r[1] || (r[1] = (y) => a.value = !1)
      }, null, 544)), [
        [W, l.value]
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
    return (g, t) => (m(), v("div", te, [
      O(I, {
        team: e.team,
        "team-position": e.teamPosition,
        "available-teams": e.availableTeams,
        "selected-teams": e.selectedTeams,
        "can-edit": e.canEdit,
        "is-winner": e.isWinner,
        "is-loser": e.isLoser,
        "should-highlight": e.shouldHighlight,
        "onUpdate:team": t[0] || (t[0] = (n) => g.$emit("update:team", n)),
        onHighlightTeam: t[1] || (t[1] = (n) => g.$emit("highlight-team", n)),
        onUnhighlightTeam: t[2] || (t[2] = (n) => g.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "is-winner", "is-loser", "should-highlight"]),
      O(ee, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (n) => g.$emit("update:score", n))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, ae = { class: "my-1.5 ml-2.5 bg-white dark:bg-gray-800 rounded overflow-hidden w-full min-w-[200px] shadow" }, ne = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[1px] mx-2 transition-colors duration-200"
}, ie = {
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
  setup(e, { emit: g }) {
    const t = e, n = g, a = $(() => t.roundIndex === 0), l = $(() => t.match.teamOne.name !== "TBD" && t.match.teamTwo.name !== "TBD"), u = (o) => t.match.winner === o, c = (o) => t.match.winner && t.match.winner !== o, d = (o) => {
      const f = t.match[o].name;
      return t.highlightedTeam === f;
    }, r = (o) => {
      n("highlight-team", o);
    }, y = () => {
      n("unhighlight-team");
    }, s = ({ position: o, team: f }) => {
      const i = {
        ...t.match,
        [o]: f
      };
      n("update:match", i);
    }, b = ({ position: o, score: f }) => {
      const i = {
        ...t.match,
        [o]: {
          ...t.match[o],
          score: f
        }
      };
      i.teamOne.score > 0 || i.teamTwo.score > 0 ? i.winner = i.teamOne.score > i.teamTwo.score ? "teamOne" : "teamTwo" : i.winner = null, n("update:match", i);
    };
    return (o, f) => (m(), v("div", {
      class: C(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      p("div", ae, [
        O(H, {
          team: e.match.teamOne,
          "team-position": "teamOne",
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": l.value,
          "is-winner": u("teamOne"),
          "is-loser": c("teamOne"),
          "should-highlight": d("teamOne"),
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
          "can-edit-score": l.value,
          "is-winner": u("teamTwo"),
          "is-loser": c("teamTwo"),
          "should-highlight": d("teamTwo"),
          "onUpdate:team": s,
          "onUpdate:score": b,
          onHighlightTeam: r,
          onUnhighlightTeam: y
        }, null, 8, ["team", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight"])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (m(), v("div", ne, f[0] || (f[0] = [
        p("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : A("", !0)
    ], 2));
  }
}, le = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, oe = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50" }, z = {
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
  setup(e, { emit: g }) {
    const t = e, n = g, a = (l, u) => {
      n("update:match", t.columnIndex, l, u);
    };
    return (l, u) => (m(), v("div", le, [
      (m(!0), v(B, null, E(e.column.items, (c, d) => (m(), v(B, {
        key: c.number
      }, [
        p("div", oe, D(c.number), 1),
        O(ie, {
          match: c,
          index: d,
          "total-matches": e.column.items.length,
          "round-index": e.columnIndex,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "highlighted-team": e.highlightedTeam,
          "onUpdate:match": (r) => a(d, r),
          onHighlightTeam: u[0] || (u[0] = (r) => l.$emit("highlight-team", r)),
          onUnhighlightTeam: u[1] || (u[1] = (r) => l.$emit("unhighlight-team"))
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
  setup(e, { emit: g }) {
    const t = e, n = g, a = [1, 3, 5, 7, 9], l = (c, d) => {
      const r = [...t.columns];
      r[c] = {
        ...r[c],
        name: d
      }, n("update:columns", r);
    }, u = (c, d) => {
      const r = [...t.columns];
      r[c] = {
        ...r[c],
        bestOf: Number(d)
      }, n("update:columns", r);
    };
    return (c, d) => (m(), v("div", se, [
      (m(!0), v(B, null, E(e.columns, (r, y) => (m(), v("div", {
        key: r.name,
        class: "flex-1 text-center text-sm text-gray-400"
      }, [
        p("div", re, [
          p("input", {
            value: r.name,
            onInput: (s) => l(y, s.target.value),
            class: "bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-center w-32 text-gray-900 dark:text-white"
          }, null, 40, me),
          p("select", {
            value: r.bestOf,
            onChange: (s) => u(y, s.target.value),
            class: "bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-center w-32 text-gray-900 dark:text-white"
          }, [
            (m(), v(B, null, E(a, (s) => p("option", {
              key: s,
              value: s
            }, " Best of " + D(s), 9, ce)), 64))
          ], 40, ue)
        ])
      ]))), 128))
    ]));
  }
}, de = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, he = { class: "flex flex-col" }, ge = { class: "overflow-x-auto" }, ve = { class: "min-w-max" }, fe = { class: "flex flex-1 p-5" }, Te = {
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
  setup(e, { emit: g }) {
    const t = g, n = e, a = S([]), l = S(null), u = $(() => {
      const o = /* @__PURE__ */ new Set();
      return a.value.forEach((f) => {
        f.items.forEach((i) => {
          i.teamOne.name !== "TBD" && o.add(i.teamOne.name), i.teamTwo.name !== "TBD" && o.add(i.teamTwo.name);
        });
      }), Array.from(o);
    }), c = (o) => {
      l.value = o;
    }, d = () => {
      l.value = null;
    }, r = (o, f, i) => {
      if (console.log("Updating lower match:", { roundIndex: o, matchIndex: f, updatedMatch: i }), a.value[o] && a.value[o].items) {
        if (a.value[o].items[f] = i, i.winner && o < a.value.length - 1) {
          const T = o + 1, h = Math.floor(f / 2);
          if (a.value[T] && a.value[T].items[h]) {
            const w = a.value[T].items[h], x = f % 2 === 0 ? "teamOne" : "teamTwo", k = i[i.winner];
            a.value[T].items[h] = {
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
    }), (o, f) => (m(), v("div", de, [
      f[0] || (f[0] = p("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Lower Bracket", -1)),
      p("div", he, [
        p("div", ge, [
          p("div", ve, [
            O(F, {
              columns: a.value,
              "onUpdate:columns": y
            }, null, 8, ["columns"]),
            p("div", fe, [
              (m(!0), v(B, null, E(a.value, (i, T) => (m(), L(z, {
                key: i.name,
                column: i,
                "column-index": T,
                "available-teams": e.availableTeams,
                "selected-teams": u.value,
                "highlighted-team": l.value,
                "onUpdate:match": r,
                onHighlightTeam: c,
                onUnhighlightTeam: d
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}, P = () => ({
  id: null,
  name: "TBD",
  logo: null,
  score: 0
}), M = (e) => ({
  number: e,
  teamOne: P(),
  teamTwo: P(),
  winner: null
}), Be = (e, g = 3) => {
  const t = [], n = Math.log2(e);
  let a = 1;
  for (let l = 0; l < n; l++) {
    const u = Math.pow(2, n - l - 1), c = [];
    for (let d = 0; d < u; d++)
      c.push(M(a++));
    t.push({
      name: `Round ${l + 1}`,
      items: c,
      bestOf: g
    });
  }
  return t;
}, J = (e, g) => {
  const t = [];
  let n = 1;
  const a = Math.pow(2, e - 2), l = {
    name: "Lower Round 1",
    bestOf: g,
    items: Array(a).fill(null).map(() => M(n++))
  };
  t.push(l);
  const u = Math.pow(2, e - 3), c = {
    name: "Lower Round 2",
    bestOf: g,
    items: Array(u).fill(null).map(() => M(n++))
  };
  if (t.push(c), e > 3) {
    const d = Math.pow(2, e - 4), r = {
      name: "Lower Round 3",
      bestOf: g,
      items: Array(d).fill(null).map(() => M(n++))
    };
    t.push(r);
  }
  return t;
}, pe = { class: "flex flex-col" }, be = { class: "flex flex-col" }, ye = { class: "overflow-x-auto" }, we = { class: "min-w-max" }, xe = { class: "flex flex-1 p-5" }, ke = {
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
  setup(e, { emit: g }) {
    const t = g, n = e, a = S([]), l = S([]), u = S(null), c = $(() => {
      const i = /* @__PURE__ */ new Set();
      return a.value.forEach((T) => {
        T.items.forEach((h) => {
          h.teamOne.name !== "TBD" && i.add(h.teamOne.name), h.teamTwo.name !== "TBD" && i.add(h.teamTwo.name);
        });
      }), n.isDoubleElimination && l.value.forEach((T) => {
        T.items.forEach((h) => {
          h.teamOne.name !== "TBD" && i.add(h.teamOne.name), h.teamTwo.name !== "TBD" && i.add(h.teamTwo.name);
        });
      }), Array.from(i);
    }), d = (i) => {
      u.value = i;
    }, r = () => {
      u.value = null;
    }, y = (i, T, h) => {
      if (console.log("Updating upper match:", { roundIndex: i, matchIndex: T, updatedMatch: h }), a.value[i] && a.value[i].items) {
        if (a.value[i].items[T] = h, h.winner && i < a.value.length - 1) {
          const w = i + 1, x = Math.floor(T / 2);
          if (a.value[w] && a.value[w].items[x]) {
            const k = a.value[w].items[x], N = T % 2 === 0 ? "teamOne" : "teamTwo", U = h[h.winner];
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
        if (n.isDoubleElimination && h.winner) {
          const w = h[h.winner === "teamOne" ? "teamTwo" : "teamOne"];
          if (w.name !== "TBD") {
            const x = Math.floor(i / 2), k = Math.floor(T / 2);
            if (l.value[x] && l.value[x].items[k]) {
              const N = l.value[x].items[k], U = T % 2 === 0 ? "teamOne" : "teamTwo";
              l.value[x].items[k] = {
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
    }, s = (i) => {
      console.log("Updating upper columns:", i), a.value = i, o();
    }, b = (i) => {
      console.log("Updating lower state:", i), l.value = i, o();
    }, o = () => {
      console.log("Emitting tournament state:", {
        upper: a.value,
        lower: n.isDoubleElimination ? l.value : null
      }), t("update:state", {
        upper: a.value,
        lower: n.isDoubleElimination ? l.value : null
      });
    }, f = () => {
      console.log("Initializing tournament with state:", n.initialState), n.initialState && (Array.isArray(n.initialState) ? (a.value = JSON.parse(JSON.stringify(n.initialState)), n.isDoubleElimination && (l.value = J(a.value.length, n.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(n.initialState.upper || [])), l.value = JSON.parse(JSON.stringify(n.initialState.lower || []))));
    };
    return q(() => n.initialState, () => {
      f();
    }, { deep: !0 }), q(() => n.isDoubleElimination, (i) => {
      i && (!l.value || l.value.length === 0) && (l.value = J(a.value.length, n.defaultBestOf), o());
    }), R(() => {
      f();
    }), (i, T) => (m(), v("div", pe, [
      T[0] || (T[0] = p("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Upper Bracket", -1)),
      p("div", be, [
        p("div", ye, [
          p("div", we, [
            O(F, {
              columns: a.value,
              "onUpdate:columns": s
            }, null, 8, ["columns"]),
            p("div", xe, [
              (m(!0), v(B, null, E(a.value, (h, w) => (m(), L(z, {
                key: h.name,
                column: h,
                "column-index": w,
                "available-teams": e.availableTeams,
                "selected-teams": c.value,
                "highlighted-team": u.value,
                "onUpdate:match": y,
                onHighlightTeam: d,
                onUnhighlightTeam: r
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ]),
      e.isDoubleElimination ? (m(), L(Te, {
        key: 0,
        "initial-state": l.value,
        "available-teams": e.availableTeams,
        "default-best-of": e.defaultBestOf,
        "onUpdate:state": b
      }, null, 8, ["initial-state", "available-teams", "default-best-of"])) : A("", !0)
    ]));
  }
}, Oe = (e) => {
  e.component("TournamentBracket", ke);
};
export {
  ke as TournamentBracket,
  J as createLowerBracketStructure,
  Be as createTournamentState,
  Oe as install
};
