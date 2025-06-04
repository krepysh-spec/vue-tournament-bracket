import { ref as A, computed as L, watch as M, onMounted as H, createElementBlock as p, openBlock as d, normalizeClass as P, unref as O, createCommentVNode as W, withDirectives as R, createElementVNode as v, Fragment as $, renderList as I, toDisplayString as C, vModelSelect as Q, vModelText as V, createVNode as U, createBlock as j } from "vue";
const B = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, w = "TBD", s = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, N = {
  CAN_SELECT_TEAM: "can_select_team",
  CAN_EDIT_DATE: "can_edit_date"
}, X = {
  key: 0,
  class: "flex items-center gap-2"
}, Y = ["src", "alt"], Z = ["value", "disabled"], ee = {
  key: 1,
  class: "flex items-center gap-2"
}, te = ["src", "alt"], ae = { class: "text-gray-900 dark:text-white" }, ie = {
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
        [N.CAN_SELECT_TEAM]: !0
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
  setup(e, { emit: T }) {
    const t = e, l = T, a = A(t.team.name), n = L(() => {
      var r;
      return a.value === w ? null : ((r = t.availableTeams.find((f) => f.name === a.value)) == null ? void 0 : r.logo) || null;
    });
    M(() => t.team, (r) => {
      a.value = r.name;
    }, { immediate: !0 }), H(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const h = (r) => r === w ? !1 : t.selectedTeams.includes(r) && r !== t.team.name || r === t.team.name && t.team.name !== w, b = L(() => t.availableTeams ? t.availableTeams.filter((r) => r.name === w || r.name === t.team.name ? !0 : !h(r.name)) : []), m = () => {
      t.team.name !== w && l("highlight-team", t.team.name);
    }, g = () => {
      l("unhighlight-team");
    }, y = () => {
      const r = t.availableTeams.find((f) => f.name === a.value);
      console.log("Updating team:", { selectedTeam: a.value, selectedTeamData: r }), l("update:team", {
        position: t.teamPosition,
        team: {
          id: (r == null ? void 0 : r.id) || null,
          name: a.value,
          logo: (r == null ? void 0 : r.logo) || null,
          score: 0
        }
      });
    };
    return (r, f) => (d(), p("div", {
      class: P(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": e.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": e.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": e.shouldHighlight && e.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: m,
      onMouseleave: g
    }, [
      e.canEdit && e.permissions[O(N).CAN_SELECT_TEAM] ? (d(), p("div", X, [
        n.value ? (d(), p("img", {
          key: 0,
          src: n.value,
          alt: a.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, Y)) : W("", !0),
        R(v("select", {
          "onUpdate:modelValue": f[0] || (f[0] = (c) => a.value = c),
          class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 hover:cursor-pointer",
          onChange: y
        }, [
          f[1] || (f[1] = v("option", { value: "TBD" }, "TBD", -1)),
          (d(!0), p($, null, I(b.value, (c) => (d(), p("option", {
            key: c.id,
            value: c.name,
            disabled: h(c.name)
          }, C(c.name), 9, Z))), 128))
        ], 544), [
          [Q, a.value]
        ])
      ])) : (d(), p("div", ee, [
        e.team.logo ? (d(), p("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, te)) : W("", !0),
        v("span", ae, C(e.team.name), 1)
      ]))
    ], 34));
  }
}, ne = {
  key: 1,
  class: "text-white"
}, le = {
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
  setup(e, { emit: T }) {
    const t = e, l = T, a = A(!1), n = A(t.team.score ?? 0), h = () => {
      t.canEditScore && (a.value = !0);
    }, b = () => {
      const m = parseInt(n.value) || 0;
      l("update:score", {
        position: t.teamPosition,
        score: m
      });
    };
    return M(() => t.team, (m) => {
      n.value = m.score ?? 0;
    }, { deep: !0 }), (m, g) => (d(), p("div", {
      class: P(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: h
    }, [
      a.value ? R((d(), p("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": g[0] || (g[0] = (y) => n.value = y),
        class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
        min: "0",
        onChange: b,
        onBlur: g[1] || (g[1] = (y) => a.value = !1)
      }, null, 544)), [
        [V, n.value]
      ]) : (d(), p("span", ne, C(e.team.score), 1))
    ], 2));
  }
}, se = { class: "flex" }, _ = {
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
        [N.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(e) {
    return (T, t) => (d(), p("div", se, [
      U(ie, {
        team: e.team,
        "team-position": e.teamPosition,
        "available-teams": e.availableTeams,
        "selected-teams": e.selectedTeams,
        "highlighted-team": e.highlightedTeam,
        permissions: e.permissions,
        "can-edit": e.canEdit,
        "is-winner": e.isWinner,
        "is-loser": e.isLoser,
        "should-highlight": e.shouldHighlight,
        "is-first-team": e.isFirstTeam,
        "onUpdate:team": t[0] || (t[0] = (l) => T.$emit("update:team", l)),
        onHighlightTeam: t[1] || (t[1] = (l) => T.$emit("highlight-team", l)),
        onUnhighlightTeam: t[2] || (t[2] = (l) => T.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
      U(le, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (l) => T.$emit("update:score", l))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, oe = { class: "flex flex-col w-full" }, re = { class: "px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center" }, me = ["value", "disabled"], ue = { class: "my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10" }, ce = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[-10px] ml-[15px] mx-2 transition-colors duration-200"
}, de = {
  __name: "BracketMatch",
  props: {
    match: {
      type: Object,
      required: !0,
      default: () => ({
        teamOne: { name: w, score: 0 },
        teamTwo: { name: w, score: 0 },
        winner: null,
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        // Default to today's date
      })
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
        [N.CAN_SELECT_TEAM]: !0,
        [N.CAN_EDIT_DATE]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(e, { emit: T }) {
    const t = e, l = T, a = L(() => t.roundIndex === 0 && t.permissions[N.CAN_SELECT_TEAM]), n = L(() => t.match[s.ONE].name !== w && t.match[s.TWO].name !== w), h = (i) => t.match.winner === i, b = (i) => t.match.winner && t.match.winner !== i, m = (i) => {
      const u = t.match[i].name;
      return t.highlightedTeam === u;
    }, g = (i) => {
      l("highlight-team", i);
    }, y = () => {
      l("unhighlight-team");
    }, r = ({ position: i, team: u }) => {
      const o = {
        ...t.match,
        [i]: u
      };
      l("update:match", o);
    }, f = ({ position: i, score: u }) => {
      const o = {
        ...t.match,
        [i]: {
          ...t.match[i],
          score: u
        }
      };
      o[s.ONE].score > o[s.TWO].score ? o.winner = s.ONE : o[s.TWO].score > o[s.ONE].score ? o.winner = s.TWO : o.winner = null, l("update:match", o);
    }, c = (i) => i ? new Date(i).toISOString().slice(0, 16) : "", x = (i) => {
      const u = {
        ...t.match,
        date: i.target.value
      };
      l("update:match", u);
    };
    return (i, u) => (d(), p("div", {
      class: P(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      v("div", oe, [
        v("div", re, [
          v("input", {
            type: "datetime-local",
            value: c(e.match.date),
            onInput: x,
            class: "bg-transparent border-none focus:ring-0 p-0 text-xs",
            disabled: !e.permissions[O(N).CAN_EDIT_DATE]
          }, null, 40, me)
        ]),
        v("div", ue, [
          U(_, {
            team: e.match.teamOne,
            "team-position": O(s).ONE,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": a.value,
            "can-edit-score": n.value,
            "is-winner": h(O(s).ONE),
            "is-loser": b(O(s).ONE),
            "should-highlight": m(O(s).ONE),
            "is-first-team": !0,
            "can-select-team": i.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": r,
            "onUpdate:score": f,
            onHighlightTeam: g,
            onUnhighlightTeam: y
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
          U(_, {
            team: e.match.teamTwo,
            "team-position": O(s).TWO,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": a.value,
            "can-edit-score": n.value,
            "is-winner": h(O(s).TWO),
            "is-loser": b(O(s).TWO),
            "should-highlight": m(O(s).TWO),
            "can-select-team": i.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": r,
            "onUpdate:score": f,
            onHighlightTeam: g,
            onUnhighlightTeam: y
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
        ])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (d(), p("div", ce, u[0] || (u[0] = [
        v("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : W("", !0)
    ], 2));
  }
}, he = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, ge = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50 mt-[23px]" }, z = {
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
        [N.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(e, { emit: T }) {
    const t = e, l = T, a = (n, h) => {
      l("update:match", t.columnIndex, n, h);
    };
    return (n, h) => (d(), p("div", he, [
      (d(!0), p($, null, I(e.column.matches, (b, m) => (d(), p($, {
        key: b.id
      }, [
        v("div", ge, C(b.number), 1),
        U(de, {
          match: b,
          index: m,
          "total-matches": e.column.matches.length,
          "round-index": e.columnIndex,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "highlighted-team": e.highlightedTeam,
          permissions: e.permissions,
          "onUpdate:match": (g) => a(m, g),
          onHighlightTeam: h[0] || (h[0] = (g) => n.$emit("highlight-team", g)),
          onUnhighlightTeam: h[1] || (h[1] = (g) => n.$emit("unhighlight-team"))
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "permissions", "onUpdate:match"])
      ], 64))), 128))
    ]));
  }
}, fe = { class: "flex justify-between px-5" }, ve = { class: "flex flex-col items-center gap-2" }, pe = { class: "mt-2" }, Te = { class: "flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" }, be = ["onUpdate:modelValue", "onBlur"], ye = { class: "grid shrink-0 grid-cols-1 focus-within:relative" }, we = ["value", "onChange"], xe = ["value"], G = {
  __name: "BracketRoundHeaders",
  props: {
    columns: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:columns"],
  setup(e, { emit: T }) {
    const t = e, l = T, a = [1, 3, 5, 7, 9], n = A(t.columns.map((m) => m.name));
    M(() => t.columns, (m) => {
      n.value = m.map((g) => g.name);
    }, { deep: !0 });
    const h = (m, g) => {
      n.value[m] = g;
      const y = [...t.columns];
      y[m] = {
        ...y[m],
        name: g
      }, l("update:columns", y);
    }, b = (m, g) => {
      const y = [...t.columns];
      y[m] = {
        ...y[m],
        bestOf: Number(g)
      }, l("update:columns", y);
    };
    return (m, g) => (d(), p("div", fe, [
      (d(!0), p($, null, I(e.columns, (y, r) => (d(), p("div", {
        key: y.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        v("div", ve, [
          v("div", pe, [
            v("div", Te, [
              R(v("input", {
                type: "text",
                "onUpdate:modelValue": (f) => n.value[r] = f,
                onBlur: (f) => h(r, f.target.value),
                class: "block min-w-0 grow py-1.5 pr-3 text-gray-800 dark:text-white border-none pl-1 text-base text-gray-900 bg-white dark:bg-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              }, null, 40, be), [
                [V, n.value[r]]
              ]),
              v("div", ye, [
                v("select", {
                  value: y.bestOf,
                  onChange: (f) => b(r, f.target.value),
                  class: "col-start-1 row-start-1 w-full text-gray-800 dark:text-white border-none appearance-none py-1.5 bg-white dark:bg-gray-900 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                }, [
                  (d(), p($, null, I(a, (f) => v("option", {
                    key: f,
                    value: f
                  }, " Best of " + C(f), 9, xe)), 64))
                ], 40, we)
              ])
            ])
          ])
        ])
      ]))), 128))
    ]));
  }
}, Ee = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, Oe = { class: "flex flex-col" }, Ne = { class: "overflow-x-auto" }, ke = { class: "min-w-max" }, Se = { class: "flex flex-1 p-5" }, Ae = {
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
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [N.CAN_SELECT_TEAM]: !0,
        [N.CAN_EDIT_DATE]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(e, { emit: T }) {
    const t = T, l = e, a = A([]), n = A(null), h = L(() => {
      const c = /* @__PURE__ */ new Set();
      return a.value.forEach((x) => {
        x.matches.forEach((i) => {
          i[s.ONE].name !== w && c.add(i[s.ONE].name), i[s.TWO].name !== w && c.add(i[s.TWO].name);
        });
      }), Array.from(c);
    }), b = (c) => {
      n.value = c;
    }, m = () => {
      n.value = null;
    }, g = (c, x, i) => {
      if (console.log("Updating lower match:", { roundIndex: c, matchIndex: x, updatedMatch: i }), a.value[c] && a.value[c].matches) {
        if (a.value[c].matches[x] = i, i.winner && c < a.value.length - 1) {
          const u = c + 1, o = Math.floor(x / 2);
          if (a.value[u] && a.value[u].matches[o]) {
            const E = a.value[u].matches[o], k = x % 2 === 0 ? s.ONE : s.TWO, S = i[i.winner];
            a.value[u].matches[o] = {
              ...E,
              [k]: {
                id: S.id,
                name: S.name,
                logo: S.logo,
                score: 0
              }
            };
          }
        }
        r();
      }
    }, y = (c) => {
      console.log("Updating lower columns:", c), a.value = c, r();
    }, r = () => {
      console.log("Emitting lower tournament state:", a.value), t("update:state", a.value);
    }, f = () => {
      console.log("Initializing lower tournament with state:", l.initialState), l.initialState && l.initialState.length > 0 && (a.value = JSON.parse(JSON.stringify(l.initialState)));
    };
    return M(() => l.initialState, () => {
      f();
    }, { deep: !0 }), H(() => {
      f();
    }), (c, x) => (d(), p("div", Ee, [
      x[0] || (x[0] = v("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Lower Bracket", -1)),
      v("div", Oe, [
        v("div", Ne, [
          v("div", ke, [
            U(G, {
              columns: a.value,
              "onUpdate:columns": y
            }, null, 8, ["columns"]),
            v("div", Se, [
              (d(!0), p($, null, I(a.value, (i, u) => (d(), j(z, {
                key: i.id,
                column: i,
                "column-index": u,
                "available-teams": e.availableTeams,
                "selected-teams": h.value,
                "highlighted-team": n.value,
                permissions: e.permissions,
                "onUpdate:match": g,
                onHighlightTeam: b,
                onUnhighlightTeam: m
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}, F = () => ({
  id: null,
  name: w,
  logo: null,
  score: 0
}), K = (e) => ({
  id: `match-${e}`,
  number: e,
  [s.ONE]: F(),
  [s.TWO]: F(),
  winner: null,
  date: null
}), Ce = (e, T = 3) => {
  const t = [], l = Math.log2(e);
  let a = 1;
  for (let n = 0; n < l; n++) {
    const h = Math.pow(2, l - n - 1), b = [];
    for (let m = 0; m < h; m++)
      b.push(K(a++));
    t.push({
      id: `upper-round-${n + 1}`,
      name: `Round ${n + 1}`,
      matches: b,
      bestOf: T
    });
  }
  return t;
}, J = (e, T) => {
  const t = [];
  let l = 1;
  const a = e - 1;
  for (let n = 0; n < a; n++) {
    const h = Math.pow(2, e - n - 2), b = [];
    for (let m = 0; m < h; m++)
      b.push(K(l++));
    t.push({
      id: `lower-round-${n + 1}`,
      name: `Lower Round ${n + 1}`,
      matches: b,
      bestOf: T
    });
  }
  return t;
}, Be = { class: "flex flex-col" }, $e = { class: "flex flex-col" }, Ue = { class: "overflow-x-auto" }, Le = { class: "min-w-max" }, Me = { class: "flex flex-1 p-5" }, Ie = {
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
        [N.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(e, { emit: T }) {
    const t = T, l = e, a = A([]), n = A([]), h = A(null), b = L(() => {
      const i = /* @__PURE__ */ new Set();
      return a.value.forEach((u) => {
        u.matches.forEach((o) => {
          o[s.ONE].name !== w && i.add(o[s.ONE].name), o[s.TWO].name !== w && i.add(o[s.TWO].name);
        });
      }), l.format === B.DOUBLE_ELIMINATION && n.value.forEach((u) => {
        u.matches.forEach((o) => {
          o[s.ONE].name !== w && i.add(o[s.ONE].name), o[s.TWO].name !== w && i.add(o[s.TWO].name);
        });
      }), Array.from(i);
    }), m = (i) => {
      h.value = i;
    }, g = () => {
      h.value = null;
    }, y = (i, u, o) => {
      if (console.log("Updating upper match:", { roundIndex: i, matchIndex: u, updatedMatch: o }), a.value[i] && a.value[i].matches) {
        if (a.value[i].matches[u] = o, o.winner && i < a.value.length - 1) {
          const E = i + 1, k = Math.floor(u / 2);
          if (a.value[E] && a.value[E].matches[k]) {
            const S = a.value[E].matches[k], D = u % 2 === 0 ? s.ONE : s.TWO, q = o[o.winner];
            a.value[E].matches[k] = {
              ...S,
              [D]: {
                id: q.id,
                name: q.name,
                logo: q.logo,
                score: 0
              }
            };
          }
        }
        if (l.format === B.DOUBLE_ELIMINATION && o.winner) {
          const E = o[o.winner === s.ONE ? s.TWO : s.ONE];
          if (E.name !== w) {
            const k = Math.floor(i / 2), S = Math.floor(u / 2);
            if (n.value[k] && n.value[k].matches[S]) {
              const D = n.value[k].matches[S], q = u % 2 === 0 ? s.ONE : s.TWO;
              n.value[k].matches[S] = {
                ...D,
                [q]: {
                  id: E.id,
                  name: E.name,
                  logo: E.logo,
                  score: 0
                }
              };
            }
          }
        }
        c();
      }
    }, r = (i) => {
      console.log("Updating upper columns:", i), a.value = i, c();
    }, f = (i) => {
      console.log("Updating lower state:", i), n.value = i, c();
    }, c = () => {
      console.log("Emitting tournament state:", {
        upper: a.value,
        lower: l.format === B.DOUBLE_ELIMINATION ? n.value : null
      }), t("update:state", {
        upper: a.value,
        lower: l.format === B.DOUBLE_ELIMINATION ? n.value : null
      });
    }, x = () => {
      console.log("Initializing tournament with state:", l.initialState), l.initialState && (Array.isArray(l.initialState) ? (a.value = JSON.parse(JSON.stringify(l.initialState)), l.format === B.DOUBLE_ELIMINATION && (n.value = J(a.value.length, l.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(l.initialState.upper || [])), n.value = JSON.parse(JSON.stringify(l.initialState.lower || []))));
    };
    return M(() => l.initialState, () => {
      x();
    }, { deep: !0 }), M(() => l.format, (i) => {
      i === B.DOUBLE_ELIMINATION && (!n.value || n.value.length === 0) && (n.value = J(a.value.length, l.defaultBestOf), c());
    }), H(() => {
      x();
    }), (i, u) => (d(), p("div", Be, [
      u[0] || (u[0] = v("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Upper Bracket", -1)),
      v("div", $e, [
        v("div", Ue, [
          v("div", Le, [
            U(G, {
              columns: a.value,
              "onUpdate:columns": r
            }, null, 8, ["columns"]),
            v("div", Me, [
              (d(!0), p($, null, I(a.value, (o, E) => (d(), j(z, {
                key: o.id,
                column: o,
                "column-index": E,
                "available-teams": e.availableTeams,
                "selected-teams": b.value,
                "highlighted-team": h.value,
                permissions: e.permissions,
                "onUpdate:match": y,
                onHighlightTeam: m,
                onUnhighlightTeam: g
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
            ])
          ])
        ])
      ]),
      e.format === O(B).DOUBLE_ELIMINATION ? (d(), j(Ae, {
        key: 0,
        "initial-state": n.value,
        "available-teams": e.availableTeams,
        "default-best-of": e.defaultBestOf,
        permissions: e.permissions,
        "onUpdate:state": f
      }, null, 8, ["initial-state", "available-teams", "default-best-of", "permissions"])) : W("", !0)
    ]));
  }
}, We = (e) => {
  e.component("TournamentBracket", Ie);
};
export {
  N as PERMISSIONS,
  Ie as TournamentBracket,
  J as createLowerBracketStructure,
  Ce as createTournamentState,
  We as install
};
