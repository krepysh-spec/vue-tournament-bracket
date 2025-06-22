import { ref as A, computed as M, watch as _, onMounted as j, createElementBlock as y, openBlock as g, normalizeClass as R, unref as k, createCommentVNode as q, withDirectives as F, createElementVNode as p, Fragment as I, renderList as U, toDisplayString as L, vModelSelect as X, vModelText as z, createVNode as B, createBlock as P } from "vue";
const C = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, x = "TBD", l = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, b = {
  CAN_SELECT_TEAM: "can_select_team",
  CAN_EDIT_DATE: "can_edit_date",
  CAN_EDIT_SCOPE: "can_edit_scope",
  CAN_EDIT_ROUND_NAME: "can_edit_round_name",
  CAN_EDIT_BEST_OF: "can_edit_best_of"
}, Y = {
  key: 0,
  class: "flex items-center gap-2"
}, Z = ["src", "alt"], ee = ["value", "disabled"], te = {
  key: 1,
  class: "flex items-center gap-2"
}, ae = ["src", "alt"], ie = { class: "text-gray-900 dark:text-white" }, ne = {
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
        [b.CAN_SELECT_TEAM]: !0
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
  setup(e, { emit: E }) {
    const t = e, n = E, a = A(t.team.name), s = M(() => {
      var r;
      return a.value === x ? null : ((r = t.availableTeams.find((T) => T.name === a.value)) == null ? void 0 : r.logo) || null;
    });
    _(() => t.team, (r) => {
      a.value = r.name;
    }, { immediate: !0 }), j(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const f = (r) => r === x ? !1 : t.selectedTeams.includes(r) && r !== t.team.name || r === t.team.name && t.team.name !== x, h = M(() => t.availableTeams ? t.availableTeams.filter((r) => r.name === x || r.name === t.team.name ? !0 : !f(r.name)) : []), o = () => {
      t.team.name !== x && n("highlight-team", t.team.name);
    }, v = () => {
      n("unhighlight-team");
    }, d = () => {
      const r = t.availableTeams.find((T) => T.name === a.value);
      console.log("Updating team:", { selectedTeam: a.value, selectedTeamData: r }), n("update:team", {
        position: t.teamPosition,
        team: {
          id: (r == null ? void 0 : r.id) || null,
          name: a.value,
          logo: (r == null ? void 0 : r.logo) || null,
          score: 0
        }
      });
    };
    return (r, T) => (g(), y("div", {
      class: R(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": e.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": e.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": e.shouldHighlight && e.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: o,
      onMouseleave: v
    }, [
      e.canEdit && e.permissions[k(b).CAN_SELECT_TEAM] ? (g(), y("div", Y, [
        s.value ? (g(), y("img", {
          key: 0,
          src: s.value,
          alt: a.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, Z)) : q("", !0),
        F(p("select", {
          "onUpdate:modelValue": T[0] || (T[0] = (c) => a.value = c),
          class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 hover:cursor-pointer",
          onChange: d
        }, [
          T[1] || (T[1] = p("option", { value: "TBD" }, "TBD", -1)),
          (g(!0), y(I, null, U(h.value, (c) => (g(), y("option", {
            key: c.id,
            value: c.name,
            disabled: f(c.name)
          }, L(c.name), 9, ee))), 128))
        ], 544), [
          [X, a.value]
        ])
      ])) : (g(), y("div", te, [
        e.team.logo ? (g(), y("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ae)) : q("", !0),
        p("span", ie, L(e.team.name), 1)
      ]))
    ], 34));
  }
}, se = {
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
  setup(e, { emit: E }) {
    const t = e, n = E, a = A(!1), s = A(t.team.score ?? 0), f = () => {
      t.canEditScore && (a.value = !0);
    }, h = () => {
      const o = parseInt(s.value) || 0;
      n("update:score", {
        position: t.teamPosition,
        score: o
      });
    };
    return _(() => t.team, (o) => {
      s.value = o.score ?? 0;
    }, { deep: !0 }), (o, v) => (g(), y("div", {
      class: R(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: f
    }, [
      a.value ? F((g(), y("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": v[0] || (v[0] = (d) => s.value = d),
        class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
        min: "0",
        onChange: h,
        onBlur: v[1] || (v[1] = (d) => a.value = !1)
      }, null, 544)), [
        [z, s.value]
      ]) : (g(), y("span", se, L(e.team.score), 1))
    ], 2));
  }
}, oe = { class: "flex" }, H = {
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
        [b.CAN_SELECT_TEAM]: !0,
        [b.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(e) {
    return (E, t) => (g(), y("div", oe, [
      B(ne, {
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
        "onUpdate:team": t[0] || (t[0] = (n) => E.$emit("update:team", n)),
        onHighlightTeam: t[1] || (t[1] = (n) => E.$emit("highlight-team", n)),
        onUnhighlightTeam: t[2] || (t[2] = (n) => E.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
      B(le, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (n) => E.$emit("update:score", n))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, re = { class: "flex flex-col w-full" }, me = { class: "px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center" }, ue = ["value", "disabled"], ce = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[-10px] ml-[15px] mx-2 transition-colors duration-200"
}, de = {
  __name: "BracketMatch",
  props: {
    match: {
      type: Object,
      required: !0,
      default: () => ({
        teamOne: { name: x, score: 0 },
        teamTwo: { name: x, score: 0 },
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
        [b.CAN_SELECT_TEAM]: !0,
        [b.CAN_EDIT_DATE]: !0,
        [b.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team", "click-match"],
  setup(e, { emit: E }) {
    const t = e, n = E, a = M(() => t.roundIndex === 0 && t.permissions[b.CAN_SELECT_TEAM]), s = M(() => t.match[l.ONE].name !== x && t.match[l.TWO].name !== x && t.permissions[b.CAN_EDIT_SCOPE]), f = (i) => t.match.winner === i, h = (i) => t.match.winner && t.match.winner !== i, o = (i) => {
      const u = t.match[i].name;
      return t.highlightedTeam === u;
    }, v = (i) => {
      n("highlight-team", i);
    }, d = () => {
      n("unhighlight-team");
    }, r = ({ position: i, team: u }) => {
      const m = {
        ...t.match,
        [i]: u
      };
      n("update:match", m);
    }, T = ({ position: i, score: u }) => {
      const m = {
        ...t.match,
        [i]: {
          ...t.match[i],
          score: u
        }
      };
      m[l.ONE].score > m[l.TWO].score ? m.winner = l.ONE : m[l.TWO].score > m[l.ONE].score ? m.winner = l.TWO : m.winner = null, n("update:match", m);
    }, c = (i) => i ? new Date(i).toISOString().slice(0, 16) : "", w = (i) => {
      const u = {
        ...t.match,
        date: i.target.value
      };
      n("update:match", u);
    }, O = (i) => {
      const u = i.target.tagName.toLowerCase();
      u === "input" || u === "select" || u === "option" || u === "button" || i.target.closest("input,select,option,button") || !(!t.permissions[b.CAN_SELECT_TEAM] && !t.permissions[b.CAN_EDIT_DATE] && !t.permissions[b.CAN_EDIT_SCOPE]) || n("click-match", {
        match: t.match,
        roundIndex: t.roundIndex,
        matchIndex: t.index,
        id: t.match.id ?? null
      });
    };
    return (i, u) => (g(), y("div", {
      class: R(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      p("div", re, [
        p("div", me, [
          p("input", {
            type: "datetime-local",
            value: c(e.match.date),
            onInput: w,
            class: "bg-transparent border-none focus:ring-0 p-0 text-xs",
            disabled: !e.permissions[k(b).CAN_EDIT_DATE]
          }, null, 40, ue)
        ]),
        p("div", {
          class: "my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10",
          onClick: O
        }, [
          B(H, {
            team: e.match.teamOne,
            "team-position": k(l).ONE,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": a.value,
            "can-edit-score": s.value,
            "is-winner": f(k(l).ONE),
            "is-loser": h(k(l).ONE),
            "should-highlight": o(k(l).ONE),
            "is-first-team": !0,
            "can-select-team": i.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": r,
            "onUpdate:score": T,
            onHighlightTeam: v,
            onUnhighlightTeam: d
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
          B(H, {
            team: e.match.teamTwo,
            "team-position": k(l).TWO,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": a.value,
            "can-edit-score": s.value,
            "is-winner": f(k(l).TWO),
            "is-loser": h(k(l).TWO),
            "should-highlight": o(k(l).TWO),
            "can-select-team": i.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": r,
            "onUpdate:score": T,
            onHighlightTeam: v,
            onUnhighlightTeam: d
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
        ])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (g(), y("div", ce, u[0] || (u[0] = [
        p("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : q("", !0)
    ], 2));
  }
}, he = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, ge = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50 mt-[23px]" }, G = {
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
        [b.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team", "click-match"],
  setup(e, { emit: E }) {
    const t = e, n = E, a = (f, h) => {
      n("update:match", t.columnIndex, f, h);
    }, s = (f, h) => {
      n("click-match", {
        ...h,
        roundIndex: t.columnIndex,
        matchIndex: f
      });
    };
    return (f, h) => (g(), y("div", he, [
      (g(!0), y(I, null, U(e.column.matches, (o, v) => (g(), y(I, {
        key: o.id
      }, [
        p("div", ge, L(o.number), 1),
        B(de, {
          match: o,
          index: v,
          "total-matches": e.column.matches.length,
          "round-index": e.columnIndex,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "highlighted-team": e.highlightedTeam,
          permissions: e.permissions,
          "onUpdate:match": (d) => a(v, d),
          onHighlightTeam: h[0] || (h[0] = (d) => f.$emit("highlight-team", d)),
          onUnhighlightTeam: h[1] || (h[1] = (d) => f.$emit("unhighlight-team")),
          onClickMatch: (d) => s(v, d)
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "permissions", "onUpdate:match", "onClickMatch"])
      ], 64))), 128))
    ]));
  }
}, fe = { class: "flex justify-between px-5" }, Te = { class: "flex flex-col items-center gap-2" }, pe = { class: "mt-2" }, ve = { class: "flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" }, be = ["onUpdate:modelValue", "onBlur", "disabled"], ye = { class: "grid shrink-0 grid-cols-1 focus-within:relative" }, Ee = ["value", "onChange", "disabled"], Oe = ["value"], K = {
  __name: "BracketRoundHeaders",
  props: {
    columns: {
      type: Array,
      required: !0
    },
    permissions: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:columns"],
  setup(e, { emit: E }) {
    const t = e, n = E, a = [1, 3, 5, 7, 9], s = A(t.columns.map((o) => o.name));
    _(() => t.columns, (o) => {
      s.value = o.map((v) => v.name);
    }, { deep: !0 });
    const f = (o, v) => {
      s.value[o] = v;
      const d = [...t.columns];
      d[o] = {
        ...d[o],
        name: v
      }, n("update:columns", d);
    }, h = (o, v) => {
      const d = [...t.columns];
      d[o] = {
        ...d[o],
        bestOf: Number(v)
      }, n("update:columns", d);
    };
    return (o, v) => (g(), y("div", fe, [
      (g(!0), y(I, null, U(e.columns, (d, r) => (g(), y("div", {
        key: d.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        p("div", Te, [
          p("div", pe, [
            p("div", ve, [
              F(p("input", {
                type: "text",
                "onUpdate:modelValue": (T) => s.value[r] = T,
                onBlur: (T) => f(r, T.target.value),
                disabled: !e.permissions[k(b).CAN_EDIT_ROUND_NAME],
                class: "block min-w-0 grow py-1.5 pr-3 text-gray-800 dark:text-white border-none pl-1 text-base text-gray-900 bg-white dark:bg-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              }, null, 40, be), [
                [z, s.value[r]]
              ]),
              p("div", ye, [
                p("select", {
                  value: d.bestOf,
                  onChange: (T) => h(r, T.target.value),
                  disabled: !e.permissions[k(b).CAN_EDIT_BEST_OF],
                  class: "col-start-1 row-start-1 w-full text-gray-800 dark:text-white border-none appearance-none py-1.5 bg-white dark:bg-gray-900 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                }, [
                  (g(), y(I, null, U(a, (T) => p("option", {
                    key: T,
                    value: T
                  }, " Best of " + L(T), 9, Oe)), 64))
                ], 40, Ee)
              ])
            ])
          ])
        ])
      ]))), 128))
    ]));
  }
}, xe = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, we = { class: "flex flex-col" }, Ne = { class: "overflow-x-auto" }, ke = { class: "min-w-max" }, Se = { class: "flex flex-1 p-5" }, Ae = {
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
        [b.CAN_SELECT_TEAM]: !0,
        [b.CAN_EDIT_DATE]: !0,
        [b.CAN_EDIT_SCOPE]: !0,
        [b.CAN_EDIT_ROUND_NAME]: !0,
        [b.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(e, { emit: E }) {
    const t = E, n = e, a = A([]), s = A(null), f = M(() => {
      const c = /* @__PURE__ */ new Set();
      return a.value.forEach((w) => {
        w.matches.forEach((O) => {
          O[l.ONE].name !== x && c.add(O[l.ONE].name), O[l.TWO].name !== x && c.add(O[l.TWO].name);
        });
      }), Array.from(c);
    }), h = (c) => {
      s.value = c;
    }, o = () => {
      s.value = null;
    }, v = (c, w, O) => {
      if (console.log("Updating lower match:", { roundIndex: c, matchIndex: w, updatedMatch: O }), a.value[c] && a.value[c].matches) {
        if (a.value[c].matches[w] = O, O.winner && c < a.value.length - 1) {
          const i = c + 1, u = Math.floor(w / 2);
          if (a.value[i] && a.value[i].matches[u]) {
            const m = a.value[i].matches[u], N = w % 2 === 0 ? l.ONE : l.TWO, S = O[O.winner];
            a.value[i].matches[u] = {
              ...m,
              [N]: {
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
    }, d = (c) => {
      console.log("Updating lower columns:", c), a.value = c, r();
    }, r = () => {
      console.log("Emitting lower tournament state:", a.value), t("update:state", a.value);
    }, T = () => {
      console.log("Initializing lower tournament with state:", n.initialState), n.initialState && n.initialState.length > 0 && (a.value = JSON.parse(JSON.stringify(n.initialState)));
    };
    return _(() => n.initialState, () => {
      T();
    }, { deep: !0 }), j(() => {
      T();
    }), (c, w) => (g(), y("div", xe, [
      w[0] || (w[0] = p("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Lower Bracket", -1)),
      p("div", we, [
        p("div", Ne, [
          p("div", ke, [
            B(K, {
              columns: a.value,
              "onUpdate:columns": d,
              permissions: e.permissions
            }, null, 8, ["columns", "permissions"]),
            p("div", Se, [
              (g(!0), y(I, null, U(a.value, (O, i) => (g(), P(G, {
                key: O.id,
                column: O,
                "column-index": i,
                "available-teams": e.availableTeams,
                "selected-teams": f.value,
                "highlighted-team": s.value,
                permissions: e.permissions,
                "onUpdate:match": v,
                onHighlightTeam: h,
                onUnhighlightTeam: o
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}, J = () => ({
  id: null,
  name: x,
  logo: null,
  score: 0
}), Q = (e) => ({
  id: `match-${e}`,
  number: e,
  [l.ONE]: J(),
  [l.TWO]: J(),
  winner: null,
  date: null
}), De = (e, E = 3) => {
  const t = [], n = Math.log2(e);
  let a = 1;
  for (let s = 0; s < n; s++) {
    const f = Math.pow(2, n - s - 1), h = [];
    for (let o = 0; o < f; o++)
      h.push(Q(a++));
    t.push({
      id: `upper-round-${s + 1}`,
      name: `Round ${s + 1}`,
      matches: h,
      bestOf: E
    });
  }
  return t;
}, V = (e, E) => {
  const t = [];
  let n = 1;
  const a = e - 1;
  for (let s = 0; s < a; s++) {
    const f = Math.pow(2, e - s - 2), h = [];
    for (let o = 0; o < f; o++)
      h.push(Q(n++));
    t.push({
      id: `lower-round-${s + 1}`,
      name: `Lower Round ${s + 1}`,
      matches: h,
      bestOf: E
    });
  }
  return t;
}, Ce = { class: "flex flex-col" }, Ie = { class: "flex flex-col" }, Be = { class: "overflow-x-auto" }, Me = { class: "min-w-max" }, _e = { class: "flex flex-1 p-5" }, Ue = {
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
        [b.CAN_SELECT_TEAM]: !0,
        [b.CAN_EDIT_ROUND_NAME]: !0,
        [b.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state", "click-match"],
  setup(e, { emit: E }) {
    const t = E, n = e, a = A([]), s = A([]), f = A(null), h = M(() => {
      const i = /* @__PURE__ */ new Set();
      return a.value.forEach((u) => {
        u.matches.forEach((m) => {
          m[l.ONE].name !== x && i.add(m[l.ONE].name), m[l.TWO].name !== x && i.add(m[l.TWO].name);
        });
      }), n.format === C.DOUBLE_ELIMINATION && s.value.forEach((u) => {
        u.matches.forEach((m) => {
          m[l.ONE].name !== x && i.add(m[l.ONE].name), m[l.TWO].name !== x && i.add(m[l.TWO].name);
        });
      }), Array.from(i);
    }), o = (i) => {
      f.value = i;
    }, v = () => {
      f.value = null;
    }, d = (i, u, m) => {
      if (console.log("Updating upper match:", { roundIndex: i, matchIndex: u, updatedMatch: m }), a.value[i] && a.value[i].matches) {
        if (a.value[i].matches[u] = m, m.winner && i < a.value.length - 1) {
          const N = i + 1, S = Math.floor(u / 2);
          if (a.value[N] && a.value[N].matches[S]) {
            const $ = a.value[N].matches[S], W = u % 2 === 0 ? l.ONE : l.TWO, D = m[m.winner];
            a.value[N].matches[S] = {
              ...$,
              [W]: {
                id: D.id,
                name: D.name,
                logo: D.logo,
                score: 0
              }
            };
          }
        }
        if (n.format === C.DOUBLE_ELIMINATION && m.winner) {
          const N = m[m.winner === l.ONE ? l.TWO : l.ONE];
          if (N.name !== x) {
            const S = Math.floor(i / 2), $ = Math.floor(u / 2);
            if (s.value[S] && s.value[S].matches[$]) {
              const W = s.value[S].matches[$], D = u % 2 === 0 ? l.ONE : l.TWO;
              s.value[S].matches[$] = {
                ...W,
                [D]: {
                  id: N.id,
                  name: N.name,
                  logo: N.logo,
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
    }, T = (i) => {
      console.log("Updating lower state:", i), s.value = i, c();
    }, c = () => {
      console.log("Emitting tournament state:", {
        upper: a.value,
        lower: n.format === C.DOUBLE_ELIMINATION ? s.value : null
      }), t("update:state", {
        upper: a.value,
        lower: n.format === C.DOUBLE_ELIMINATION ? s.value : null
      });
    }, w = () => {
      console.log("Initializing tournament with state:", n.initialState), n.initialState && (Array.isArray(n.initialState) ? (a.value = JSON.parse(JSON.stringify(n.initialState)), n.format === C.DOUBLE_ELIMINATION && (s.value = V(a.value.length, n.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(n.initialState.upper || [])), s.value = JSON.parse(JSON.stringify(n.initialState.lower || []))));
    };
    _(() => n.initialState, () => {
      w();
    }, { deep: !0 }), _(() => n.format, (i) => {
      i === C.DOUBLE_ELIMINATION && (!s.value || s.value.length === 0) && (s.value = V(a.value.length, n.defaultBestOf), c());
    });
    const O = (i) => {
      t("click-match", i);
    };
    return j(() => {
      w();
    }), (i, u) => (g(), y("div", Ce, [
      u[0] || (u[0] = p("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Upper Bracket", -1)),
      p("div", Ie, [
        p("div", Be, [
          p("div", Me, [
            B(K, {
              columns: a.value,
              "onUpdate:columns": r,
              permissions: e.permissions
            }, null, 8, ["columns", "permissions"]),
            p("div", _e, [
              (g(!0), y(I, null, U(a.value, (m, N) => (g(), P(G, {
                key: m.id,
                column: m,
                "column-index": N,
                "available-teams": e.availableTeams,
                "selected-teams": h.value,
                "highlighted-team": f.value,
                permissions: e.permissions,
                "onUpdate:match": d,
                onHighlightTeam: o,
                onUnhighlightTeam: v,
                onClickMatch: O
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
            ])
          ])
        ])
      ]),
      e.format === k(C).DOUBLE_ELIMINATION ? (g(), P(Ae, {
        key: 0,
        "initial-state": s.value,
        "available-teams": e.availableTeams,
        "default-best-of": e.defaultBestOf,
        permissions: e.permissions,
        "onUpdate:state": T
      }, null, 8, ["initial-state", "available-teams", "default-best-of", "permissions"])) : q("", !0)
    ]));
  }
}, Le = (e) => {
  e.component("TournamentBracket", Ue);
};
export {
  b as PERMISSIONS,
  Ue as TournamentBracket,
  V as createLowerBracketStructure,
  De as createTournamentState,
  Le as install
};
