(function (t, a, k, e, o, v, r) {
  t['DissectAnalyticsObject'] = o;
  t[o] = t[o] || function () {
      (t[o].q = t[o].q || []).push(arguments)
  }, t[o].l = 1 * new Date();
  v = a.createElement(k),
      r = a.getElementsByTagName(k)[0];
  v.async = 1;
  v.src = e;
  r.parentNode.insertBefore(v, r)
})(window, document, 'script', './dissect.js', 'da');
da('create', 'LICENCE-KEY');
da('collector', 'ws://3.15.162.146:8080/dc/socket', "websocket");
da('send', 'tracker');