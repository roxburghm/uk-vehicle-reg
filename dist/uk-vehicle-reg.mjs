const l = /^(([A-HJ-PR-Y]{1,3}[0-9]{1,4})|([0-9]{1,4}[A-HJ-PR-Y]{1,3}))$/, o = /^([A-HJ-PR-Y]{3}[0-9]{1,3}[A-HJ-NPR-TV-Y])$/, c = /^([A-HJ-NPR-TV-Y][0-9]{1,3}[A-HJ-PR-Y]{3})$/, f = /^([A-HJ-PR-Y]{2}[0-9]{2}[A-HJ-PR-Z]{3})$/;
function u(r) {
  const t = r.replace(/\s+/g, "").toUpperCase(), e = [];
  return t ? f.test(t) ? { isValid: !0, format: "Current", errors: [] } : c.test(t) ? { isValid: !0, format: "Prefix", errors: [] } : o.test(t) ? { isValid: !0, format: "Suffix", errors: [] } : l.test(t) ? (t.length > 6, { isValid: !0, format: "Dateless", errors: [] }) : (t.length > 7 && e.push("Registration is too long (max 7 characters allowed)"), /[IQ]/.test(t) && e.push("Contains illegal characters (I or Q are typically not allowed in mainland formats)"), { isValid: !1, errors: e.length > 0 ? e : ["Invalid format"] }) : { isValid: !1, errors: ["Input is empty"] };
}
function d(r) {
  const t = u(r);
  if (!t.isValid)
    return r.toUpperCase();
  const e = r.replace(/\s+/g, "").toUpperCase();
  switch (t.format) {
    case "Current":
      return `${e.slice(0, 4)} ${e.slice(4)}`;
    case "Prefix":
      const a = e.length - 3;
      return `${e.slice(0, a)} ${e.slice(a)}`;
    case "Suffix":
      return `${e.slice(0, 3)} ${e.slice(3)}`;
    case "Dateless":
      const n = /[A-Z]/.test(e[0]);
      let s = -1;
      if (n) {
        const i = e.match(/\d/);
        i && (s = i.index);
      } else {
        const i = e.match(/[A-Z]/);
        i && (s = i.index);
      }
      return s !== -1 ? `${e.slice(0, s)} ${e.slice(s)}` : e;
    // Should happen?
    default:
      return e;
  }
}
export {
  f as CURRENT_REGEX,
  l as DATELESS_REGEX,
  c as PREFIX_REGEX,
  o as SUFFIX_REGEX,
  d as format,
  u as validate
};
//# sourceMappingURL=uk-vehicle-reg.mjs.map
