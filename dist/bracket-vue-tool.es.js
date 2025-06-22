import { ref as k, computed as _, watch as $, onMounted as P, createElementBlock as T, openBlock as d, normalizeClass as j, unref as N, createCommentVNode as L, withDirectives as R, createElementVNode as v, Fragment as B, renderList as U, toDisplayString as D, vModelSelect as Q, vModelText as V, createVNode as I, createBlock as W } from "vue";
const C = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, O = "TBD", l = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, E = {
  CAN_SELECT_TEAM: "can_select_team",
  CAN_EDIT_DATE: "can_edit_date",
  CAN_EDIT_SCOPE: "can_edit_scope",
  CAN_EDIT_ROUND_NAME: "can_edit_round_name",
  CAN_EDIT_BEST_OF: "can_edit_best_of"
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
        [E.CAN_SELECT_TEAM]: !0
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
  setup(e, { emit: p }) {
    const t = e, s = p, a = k(t.team.name), n = _(() => {
      var r;
      return a.value === O ? null : ((r = t.availableTeams.find((f) => f.name === a.value)) == null ? void 0 : r.logo) || null;
    });
    $(() => t.team, (r) => {
      a.value = r.name;
    }, { immediate: !0 }), P(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const h = (r) => r === O ? !1 : t.selectedTeams.includes(r) && r !== t.team.name || r === t.team.name && t.team.name !== O, b = _(() => t.availableTeams ? t.availableTeams.filter((r) => r.name === O || r.name === t.team.name ? !0 : !h(r.name)) : []), m = () => {
      t.team.name !== O && s("highlight-team", t.team.name);
    }, g = () => {
      s("unhighlight-team");
    }, y = () => {
      const r = t.availableTeams.find((f) => f.name === a.value);
      console.log("Updating team:", { selectedTeam: a.value, selectedTeamData: r }), s("update:team", {
        position: t.teamPosition,
        team: {
          id: (r == null ? void 0 : r.id) || null,
          name: a.value,
          logo: (r == null ? void 0 : r.logo) || null,
          score: 0
        }
      });
    };
    return (r, f) => (d(), T("div", {
      class: j(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": e.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": e.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": e.shouldHighlight && e.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: m,
      onMouseleave: g
    }, [
      e.canEdit && e.permissions[N(E).CAN_SELECT_TEAM] ? (d(), T("div", X, [
        n.value ? (d(), T("img", {
          key: 0,
          src: n.value,
          alt: a.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, Y)) : L("", !0),
        R(v("select", {
          "onUpdate:modelValue": f[0] || (f[0] = (c) => a.value = c),
          class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 hover:cursor-pointer",
          onChange: y
        }, [
          f[1] || (f[1] = v("option", { value: "TBD" }, "TBD", -1)),
          (d(!0), T(B, null, U(b.value, (c) => (d(), T("option", {
            key: c.id,
            value: c.name,
            disabled: h(c.name)
          }, D(c.name), 9, Z))), 128))
        ], 544), [
          [Q, a.value]
        ])
      ])) : (d(), T("div", ee, [
        e.team.logo ? (d(), T("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, te)) : L("", !0),
        v("span", ae, D(e.team.name), 1)
      ]))
    ], 34));
  }
}, ne = {
  key: 1,
  class: "text-white"
}, se = {
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
  setup(e, { emit: p }) {
    const t = e, s = p, a = k(!1), n = k(t.team.score ?? 0), h = () => {
      t.canEditScore && (a.value = !0);
    }, b = () => {
      const m = parseInt(n.value) || 0;
      s("update:score", {
        position: t.teamPosition,
        score: m
      });
    };
    return $(() => t.team, (m) => {
      n.value = m.score ?? 0;
    }, { deep: !0 }), (m, g) => (d(), T("div", {
      class: j(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: h
    }, [
      a.value ? R((d(), T("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": g[0] || (g[0] = (y) => n.value = y),
        class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
        min: "0",
        onChange: b,
        onBlur: g[1] || (g[1] = (y) => a.value = !1)
      }, null, 544)), [
        [V, n.value]
      ]) : (d(), T("span", ne, D(e.team.score), 1))
    ], 2));
  }
}, le = { class: "flex" }, F = {
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
        [E.CAN_SELECT_TEAM]: !0,
        [E.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(e) {
    return (p, t) => (d(), T("div", le, [
      I(ie, {
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
        "onUpdate:team": t[0] || (t[0] = (s) => p.$emit("update:team", s)),
        onHighlightTeam: t[1] || (t[1] = (s) => p.$emit("highlight-team", s)),
        onUnhighlightTeam: t[2] || (t[2] = (s) => p.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
      I(se, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (s) => p.$emit("update:score", s))
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
        teamOne: { name: O, score: 0 },
        teamTwo: { name: O, score: 0 },
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
        [E.CAN_SELECT_TEAM]: !0,
        [E.CAN_EDIT_DATE]: !0,
        [E.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(e, { emit: p }) {
    const t = e, s = p, a = _(() => t.roundIndex === 0 && t.permissions[E.CAN_SELECT_TEAM]), n = _(() => t.match[l.ONE].name !== O && t.match[l.TWO].name !== O && t.permissions[E.CAN_EDIT_SCOPE]), h = (i) => t.match.winner === i, b = (i) => t.match.winner && t.match.winner !== i, m = (i) => {
      const u = t.match[i].name;
      return t.highlightedTeam === u;
    }, g = (i) => {
      s("highlight-team", i);
    }, y = () => {
      s("unhighlight-team");
    }, r = ({ position: i, team: u }) => {
      const o = {
        ...t.match,
        [i]: u
      };
      s("update:match", o);
    }, f = ({ position: i, score: u }) => {
      const o = {
        ...t.match,
        [i]: {
          ...t.match[i],
          score: u
        }
      };
      o[l.ONE].score > o[l.TWO].score ? o.winner = l.ONE : o[l.TWO].score > o[l.ONE].score ? o.winner = l.TWO : o.winner = null, s("update:match", o);
    }, c = (i) => i ? new Date(i).toISOString().slice(0, 16) : "", w = (i) => {
      const u = {
        ...t.match,
        date: i.target.value
      };
      s("update:match", u);
    };
    return (i, u) => (d(), T("div", {
      class: j(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      v("div", oe, [
        v("div", re, [
          v("input", {
            type: "datetime-local",
            value: c(e.match.date),
            onInput: w,
            class: "bg-transparent border-none focus:ring-0 p-0 text-xs",
            disabled: !e.permissions[N(E).CAN_EDIT_DATE]
          }, null, 40, me)
        ]),
        v("div", ue, [
          I(F, {
            team: e.match.teamOne,
            "team-position": N(l).ONE,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": a.value,
            "can-edit-score": n.value,
            "is-winner": h(N(l).ONE),
            "is-loser": b(N(l).ONE),
            "should-highlight": m(N(l).ONE),
            "is-first-team": !0,
            "can-select-team": i.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": r,
            "onUpdate:score": f,
            onHighlightTeam: g,
            onUnhighlightTeam: y
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
          I(F, {
            team: e.match.teamTwo,
            "team-position": N(l).TWO,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": a.value,
            "can-edit-score": n.value,
            "is-winner": h(N(l).TWO),
            "is-loser": b(N(l).TWO),
            "should-highlight": m(N(l).TWO),
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
      e.index % 2 == 0 && e.totalMatches > 1 ? (d(), T("div", ce, u[0] || (u[0] = [
        v("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : L("", !0)
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
        [E.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(e, { emit: p }) {
    const t = e, s = p, a = (n, h) => {
      s("update:match", t.columnIndex, n, h);
    };
    return (n, h) => (d(), T("div", he, [
      (d(!0), T(B, null, U(e.column.matches, (b, m) => (d(), T(B, {
        key: b.id
      }, [
        v("div", ge, D(b.number), 1),
        I(de, {
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
}, fe = { class: "flex justify-between px-5" }, ve = { class: "flex flex-col items-center gap-2" }, Te = { class: "mt-2" }, pe = { class: "flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" }, be = ["onUpdate:modelValue", "onBlur", "disabled"], ye = { class: "grid shrink-0 grid-cols-1 focus-within:relative" }, Ee = ["value", "onChange", "disabled"], Oe = ["value"], G = {
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
  setup(e, { emit: p }) {
    const t = e, s = p, a = [1, 3, 5, 7, 9], n = k(t.columns.map((m) => m.name));
    $(() => t.columns, (m) => {
      n.value = m.map((g) => g.name);
    }, { deep: !0 });
    const h = (m, g) => {
      n.value[m] = g;
      const y = [...t.columns];
      y[m] = {
        ...y[m],
        name: g
      }, s("update:columns", y);
    }, b = (m, g) => {
      const y = [...t.columns];
      y[m] = {
        ...y[m],
        bestOf: Number(g)
      }, s("update:columns", y);
    };
    return (m, g) => (d(), T("div", fe, [
      (d(!0), T(B, null, U(e.columns, (y, r) => (d(), T("div", {
        key: y.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        v("div", ve, [
          v("div", Te, [
            v("div", pe, [
              R(v("input", {
                type: "text",
                "onUpdate:modelValue": (f) => n.value[r] = f,
                onBlur: (f) => h(r, f.target.value),
                disabled: !e.permissions[N(E).CAN_EDIT_ROUND_NAME],
                class: "block min-w-0 grow py-1.5 pr-3 text-gray-800 dark:text-white border-none pl-1 text-base text-gray-900 bg-white dark:bg-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              }, null, 40, be), [
                [V, n.value[r]]
              ]),
              v("div", ye, [
                v("select", {
                  value: y.bestOf,
                  onChange: (f) => b(r, f.target.value),
                  disabled: !e.permissions[N(E).CAN_EDIT_BEST_OF],
                  class: "col-start-1 row-start-1 w-full text-gray-800 dark:text-white border-none appearance-none py-1.5 bg-white dark:bg-gray-900 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                }, [
                  (d(), T(B, null, U(a, (f) => v("option", {
                    key: f,
                    value: f
                  }, " Best of " + D(f), 9, Oe)), 64))
                ], 40, Ee)
              ])
            ])
          ])
        ])
      ]))), 128))
    ]));
  }
}, we = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, xe = { class: "flex flex-col" }, Ne = { class: "overflow-x-auto" }, Se = { class: "min-w-max" }, Ae = { class: "flex flex-1 p-5" }, ke = {
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
        [E.CAN_SELECT_TEAM]: !0,
        [E.CAN_EDIT_DATE]: !0,
        [E.CAN_EDIT_SCOPE]: !0,
        [E.CAN_EDIT_ROUND_NAME]: !0,
        [E.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(e, { emit: p }) {
    const t = p, s = e, a = k([]), n = k(null), h = _(() => {
      const c = /* @__PURE__ */ new Set();
      return a.value.forEach((w) => {
        w.matches.forEach((i) => {
          i[l.ONE].name !== O && c.add(i[l.ONE].name), i[l.TWO].name !== O && c.add(i[l.TWO].name);
        });
      }), Array.from(c);
    }), b = (c) => {
      n.value = c;
    }, m = () => {
      n.value = null;
    }, g = (c, w, i) => {
      if (console.log("Updating lower match:", { roundIndex: c, matchIndex: w, updatedMatch: i }), a.value[c] && a.value[c].matches) {
        if (a.value[c].matches[w] = i, i.winner && c < a.value.length - 1) {
          const u = c + 1, o = Math.floor(w / 2);
          if (a.value[u] && a.value[u].matches[o]) {
            const x = a.value[u].matches[o], S = w % 2 === 0 ? l.ONE : l.TWO, A = i[i.winner];
            a.value[u].matches[o] = {
              ...x,
              [S]: {
                id: A.id,
                name: A.name,
                logo: A.logo,
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
      console.log("Initializing lower tournament with state:", s.initialState), s.initialState && s.initialState.length > 0 && (a.value = JSON.parse(JSON.stringify(s.initialState)));
    };
    return $(() => s.initialState, () => {
      f();
    }, { deep: !0 }), P(() => {
      f();
    }), (c, w) => (d(), T("div", we, [
      w[0] || (w[0] = v("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Lower Bracket", -1)),
      v("div", xe, [
        v("div", Ne, [
          v("div", Se, [
            I(G, {
              columns: a.value,
              "onUpdate:columns": y,
              permissions: e.permissions
            }, null, 8, ["columns", "permissions"]),
            v("div", Ae, [
              (d(!0), T(B, null, U(a.value, (i, u) => (d(), W(z, {
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
}, H = () => ({
  id: null,
  name: O,
  logo: null,
  score: 0
}), K = (e) => ({
  id: `match-${e}`,
  number: e,
  [l.ONE]: H(),
  [l.TWO]: H(),
  winner: null,
  date: null
}), De = (e, p = 3) => {
  const t = [], s = Math.log2(e);
  let a = 1;
  for (let n = 0; n < s; n++) {
    const h = Math.pow(2, s - n - 1), b = [];
    for (let m = 0; m < h; m++)
      b.push(K(a++));
    t.push({
      id: `upper-round-${n + 1}`,
      name: `Round ${n + 1}`,
      matches: b,
      bestOf: p
    });
  }
  return t;
}, J = (e, p) => {
  const t = [];
  let s = 1;
  const a = e - 1;
  for (let n = 0; n < a; n++) {
    const h = Math.pow(2, e - n - 2), b = [];
    for (let m = 0; m < h; m++)
      b.push(K(s++));
    t.push({
      id: `lower-round-${n + 1}`,
      name: `Lower Round ${n + 1}`,
      matches: b,
      bestOf: p
    });
  }
  return t;
}, Ce = { class: "flex flex-col" }, Be = { class: "flex flex-col" }, Ie = { class: "overflow-x-auto" }, _e = { class: "min-w-max" }, $e = { class: "flex flex-1 p-5" }, Ue = {
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
        [E.CAN_SELECT_TEAM]: !0,
        [E.CAN_EDIT_ROUND_NAME]: !0,
        [E.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(e, { emit: p }) {
    const t = p, s = e, a = k([]), n = k([]), h = k(null), b = _(() => {
      const i = /* @__PURE__ */ new Set();
      return a.value.forEach((u) => {
        u.matches.forEach((o) => {
          o[l.ONE].name !== O && i.add(o[l.ONE].name), o[l.TWO].name !== O && i.add(o[l.TWO].name);
        });
      }), s.format === C.DOUBLE_ELIMINATION && n.value.forEach((u) => {
        u.matches.forEach((o) => {
          o[l.ONE].name !== O && i.add(o[l.ONE].name), o[l.TWO].name !== O && i.add(o[l.TWO].name);
        });
      }), Array.from(i);
    }), m = (i) => {
      h.value = i;
    }, g = () => {
      h.value = null;
    }, y = (i, u, o) => {
      if (console.log("Updating upper match:", { roundIndex: i, matchIndex: u, updatedMatch: o }), a.value[i] && a.value[i].matches) {
        if (a.value[i].matches[u] = o, o.winner && i < a.value.length - 1) {
          const x = i + 1, S = Math.floor(u / 2);
          if (a.value[x] && a.value[x].matches[S]) {
            const A = a.value[x].matches[S], q = u % 2 === 0 ? l.ONE : l.TWO, M = o[o.winner];
            a.value[x].matches[S] = {
              ...A,
              [q]: {
                id: M.id,
                name: M.name,
                logo: M.logo,
                score: 0
              }
            };
          }
        }
        if (s.format === C.DOUBLE_ELIMINATION && o.winner) {
          const x = o[o.winner === l.ONE ? l.TWO : l.ONE];
          if (x.name !== O) {
            const S = Math.floor(i / 2), A = Math.floor(u / 2);
            if (n.value[S] && n.value[S].matches[A]) {
              const q = n.value[S].matches[A], M = u % 2 === 0 ? l.ONE : l.TWO;
              n.value[S].matches[A] = {
                ...q,
                [M]: {
                  id: x.id,
                  name: x.name,
                  logo: x.logo,
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
        lower: s.format === C.DOUBLE_ELIMINATION ? n.value : null
      }), t("update:state", {
        upper: a.value,
        lower: s.format === C.DOUBLE_ELIMINATION ? n.value : null
      });
    }, w = () => {
      console.log("Initializing tournament with state:", s.initialState), s.initialState && (Array.isArray(s.initialState) ? (a.value = JSON.parse(JSON.stringify(s.initialState)), s.format === C.DOUBLE_ELIMINATION && (n.value = J(a.value.length, s.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(s.initialState.upper || [])), n.value = JSON.parse(JSON.stringify(s.initialState.lower || []))));
    };
    return $(() => s.initialState, () => {
      w();
    }, { deep: !0 }), $(() => s.format, (i) => {
      i === C.DOUBLE_ELIMINATION && (!n.value || n.value.length === 0) && (n.value = J(a.value.length, s.defaultBestOf), c());
    }), P(() => {
      w();
    }), (i, u) => (d(), T("div", Ce, [
      u[0] || (u[0] = v("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Upper Bracket", -1)),
      v("div", Be, [
        v("div", Ie, [
          v("div", _e, [
            I(G, {
              columns: a.value,
              "onUpdate:columns": r,
              permissions: e.permissions
            }, null, 8, ["columns", "permissions"]),
            v("div", $e, [
              (d(!0), T(B, null, U(a.value, (o, x) => (d(), W(z, {
                key: o.id,
                column: o,
                "column-index": x,
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
      e.format === N(C).DOUBLE_ELIMINATION ? (d(), W(ke, {
        key: 0,
        "initial-state": n.value,
        "available-teams": e.availableTeams,
        "default-best-of": e.defaultBestOf,
        permissions: e.permissions,
        "onUpdate:state": f
      }, null, 8, ["initial-state", "available-teams", "default-best-of", "permissions"])) : L("", !0)
    ]));
  }
}, Le = (e) => {
  e.component("TournamentBracket", Ue);
};
export {
  E as PERMISSIONS,
  Ue as TournamentBracket,
  J as createLowerBracketStructure,
  De as createTournamentState,
  Le as install
};
