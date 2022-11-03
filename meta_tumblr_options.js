"undefined" != typeof Tumblr ||
  (Tumblr = {}) /*! scripts/application/cookie.js */,
  (function (e) {
    var t = {
      get: function (e) {
        return new RegExp(e + "=([^;]+)").test(unescape(document.cookie))
          ? RegExp.$1
          : null;
      },
      set: function (e, t, i, s) {
        s = s || {};
        var o = new Date(),
          n = s.path ? s.path : "/",
          a = !!s.is_secure,
          r = s.domain ? s.domain : "";
        o.setTime(o.getTime() + 1e3 * i),
          (document.cookie =
            e +
            "=" +
            escape(t) +
            (null == i ? "" : ";expires=" + o.toGMTString()) +
            ";path=" +
            n +
            (a === !1 ? "" : ";secure") +
            ("" === r ? "" : ";domain=" + r));
      },
      unset: function (e) {
        t.set(e, "", -1);
      },
    };
    e.Cookie = t;
  })(Tumblr) /*! scripts/tumblr/post_message_listener.js */,
  (Tumblr.PostMessageListener = (function () {
    return {
      initialize: function (e) {
        e = e || function () {};
        var t = window.addEventListener ? "addEventListener" : "attachEvent",
          i = window[t],
          s = "attachEvent" == t ? "onmessage" : "message";
        i(
          s,
          function (t) {
            var i = t.data && t.data.split ? t.data.split(";") : [""];
            e(i, t.origin);
          },
          !1
        );
      },
    };
  })()) /*! scripts/loader.js */,
  (function (e, t, i) {
    function s(e) {
      return this.start
        ? ((this.created = !1),
          (this.opts = this.opts || {}),
          void t.extend(this.opts, s.defaults, o, e))
        : new s(e);
    }
    var o = {
      zIndex: 2e9,
      color: "inherit",
      top: "50%",
      left: "50%",
      position: "absolute",
      className: "leviathan",
    };
    (s.defaults = {}),
      (s.prototype = {
        start: function (t) {
          return (
            "object" != typeof t && (t = !1),
            t && t instanceof jQuery && (t = t[0]),
            !(!this.created && !t) &&
              (t || (t = this.$target[0]),
              this.destroy(),
              (this.uid = this._uid()),
              (this.$target = e(t)),
              this.$target.data("loader-uid", this.uid),
              (this.el = this._html()),
              this.$target.append(this.el),
              (this.$loader = e("#loader_" + this.uid)),
              this._init(),
              this)
          );
        },
        stop: function () {
          return (
            "undefined" != typeof this.$loader &&
              (this.$loader.hide(), this.$loader.removeClass("animate")),
            this
          );
        },
        destroy: function () {
          return (
            this.stop(),
            "undefined" != typeof this.$loader && this.$loader.remove(),
            "undefined" != typeof this.$target &&
              this.$target.removeData("loader-uid"),
            this
          );
        },
        _init: function () {
          (this.created = !0),
            "auto" !== this.opts.color &&
              e(".Knight-Rider-bar", this.$loader).css(
                "background-color",
                this.opts.color
              ),
            this.$loader.css("position", this.opts.position),
            this.$loader.css("z-index", this.opts.zIndex),
            this.$loader.css("top", this.opts.top),
            this.$loader.css("left", this.opts.left),
            this.$loader.show();
        },
        _uid: function () {
          return Math.floor(1e7 * Math.random());
        },
        _html: function () {
          return (
            '<div id="loader_' +
            this.uid +
            '" class="Knight-Rider-loader centered animate ' +
            this.opts.className +
            '"><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div></div>'
          );
        },
      }),
      (i.Loader = s);
  })(jQuery, _, Tumblr) /*! scripts/pay.js */,
  (function () {
    function e(e) {
      return document.getElementById(e);
    }
    function t(t, n, a, r, l, h, _, c, d, p) {
      if (!e("pay_widget")) {
        (s = c), (o = d);
        var u = document.createElement("div");
        (u.id = "dim"),
          (u.style.cssText =
            "width:100%; height:100%; background:#000 url(/images/dim_loader.gif) center no-repeat; position:fixed; left:0px; top:0px; z-index:2147483646; opacity:0.6; filter:alpha(opacity=60);"),
          document.body.appendChild(u);
        var m = a && e(a + "_anchor");
        m
          ? ((m.style.position = "relative"), (m.style.zIndex = "2147483647"))
          : (m = document.body),
          r || (r = "bottom"),
          l || (l = /top|bottom/.test(r) ? 125 : 50);
        var g = ("top" == r ? 10 : -350) + (h ? h : 0),
          f = -133 + (125 - l) + (_ ? _ : 0);
        alert("hi mom =]");
        var b = document.createElement("iframe");
        (b.src =
          "/pay/" + t + "/" + n + "/" + r + "/" + l + (p ? "?" + p : "")),
          (b.id = "pay_widget"),
          (b.frameborder = "0"),
          (b.scrolling = "no"),
          (b.allowTransparency = "true"),
          (b.style.cssText =
            "display:none; width:302px; height:350px; border-width:0px; overflow:hidden; position:absolute; left:" +
            f +
            "px; top:" +
            g +
            "px; background-color:transparent; z-index:2147483647;"),
          (b.onload = function () {
            (b.style.display = ""), (u.style.backgroundImage = "none");
          }),
          m.appendChild(b),
          setInterval(function () {
            document.cookie.length > 0 &&
              document.cookie.indexOf("pay_widget_close=") != -1 &&
              i(document.cookie.indexOf("pay_widget_close=success") != -1);
          }, 100);
      }
    }
    function i(t) {
      var i = "tumblr.com";
      /tumblr$/.test(i) && (i = "tumblr");
      var n = e("pay_widget"),
        a = e("dim");
      n && n.parentNode.removeChild(n),
        a && a.parentNode.removeChild(a),
        (document.cookie =
          "pay_widget_close=0; expires=Tue, 06 Jul 1999 00:00:00 GMT; path=/; domain=" +
          i),
        t ? s && s() : o && o();
    }
    var s, o;
    (this.show_pay_widget = t), (this.hide_pay_widget = i);
  })(); /*! scripts/theme_engine.js */
var Tumblr = Tumblr || {};
Tumblr.Template = (function () {
  function is_safe_to_mark(e) {
    if (!TumblrData.feature.quick_update) return !1;
    for (var t, i = 0; i < e.length; i++)
      if (((t = e[i]), "<" === t)) {
        if (open_angle) continue;
        open_angle++;
      } else ">" === t && open_angle > 0 && open_angle--;
    var s,
      o = e.split("<");
    for (t = "<", i = 0; i < o.length; i++)
      (s = o[i]),
        s.match(/^script[\s>]/i)
          ? open_scripts++
          : s.match(/\/\s*script[\s>]/i)
          ? open_scripts > 0 && open_scripts--
          : s.match(/^style[\s>]/i)
          ? open_styles++
          : s.match(/\/\s*style[\s>]/i) && open_styles > 0 && open_styles--;
    return open_angle <= 0 && open_scripts <= 0 && open_styles <= 0;
  }
  function get_safe_mark_id(e) {
    return _.indexOf(["title", "description"], e) >= 0 && e;
  }
  function plaintext(e) {
    return htmlentities.encode(strip_tags(strip(e)));
  }
  function js(e) {
    return (
      "'" +
      _.escape(e)
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f") +
      "'"
    );
  }
  function jsplaintext(e) {
    return js(plaintext(e));
  }
  function hex2rgb(e) {
    0 !== e.indexOf("#") && (e = "#" + e),
      4 == e.length &&
        (e =
          "#" +
          e.substr(1, 1) +
          e.substr(1, 1) +
          e.substr(2, 1) +
          e.substr(2, 1) +
          e.substr(3, 1) +
          e.substr(3, 1));
    var t = /^#[0-9a-f]{6}$/i.test(e);
    if (t) {
      if (("#" == e[0] && (e = e.substr(1)), 3 == e.length)) {
        var i = e;
        (e = ""), (i = /^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(i).slice(1));
        for (var s = 0; s < 3; s++) e += i[s] + i[s];
      }
      var o = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(e).slice(1);
      return (
        (parseInt(o[0], 16) || 0) +
        "," +
        (parseInt(o[1], 16) || 0) +
        "," +
        (parseInt(o[2], 16) || 0)
      );
    }
    return "";
  }
  function audio_player(e, t) {
    var i = lookup(t, "audioplayerwhite");
    if (!i) return "";
    var s, o, n;
    return (
      "undefined" == typeof e.color &&
      "undefined" == typeof e.width &&
      "undefined" == typeof e.height
        ? ((s = "white"), (o = 207), (n = 27))
        : ((s = "undefined" != typeof e.color ? e.color : "white"),
          (o = "undefined" != typeof e.width ? e.width : 500),
          (n = "undefined" != typeof e.height && e.height)),
      (i = i.replace(/color=[^\"\&]+/i, "color=" + s)),
      (i = i.replace(/width=\"[^\"]+\"/i, 'width="' + o + '"')),
      n && (i = i.replace(/height=\"[^\"]+\"/i, 'height="' + n + '"')),
      i
    );
  }
  function audio_embed(e, t) {
    var i = lookup(t, "audioembed-500");
    if (!i) return "";
    var s = "undefined" != typeof e.color ? e.color : "white",
      o = "undefined" != typeof e.width ? e.width : 500,
      n = "undefined" != typeof e.height && e.height;
    return (
      (i = i.replace(/color=[^\"\&]+/i, "color=" + s)),
      (i = i.replace(/width=\"[^\"]+\"/i, 'width="' + o + '"')),
      n && (i = i.replace(/height=\"[^\"]+\"/i, 'height="' + n + '"')),
      i
    );
  }
  function tumblelog_like_button(e) {
    var t = "demo",
      i = e.color || "",
      s = e.size || "20";
    s = parseInt(s, 10) > 100 ? "100" : s;
    var o = e["post-id"] || "459265350",
      n = e.rk || "",
      a =
        window.location.protocol +
        "//assets.tumblr.com/assets/html/like_iframe.html#name=" +
        t +
        "&post_id=" +
        o +
        "&color=" +
        i +
        "&rk=" +
        n,
      r =
        '<div class="like_button" data-post-id="' +
        o +
        '" id="like_button_' +
        o +
        '"><iframe id="like_iframe_' +
        o +
        '" src="' +
        a +
        '" scrolling="no" width="' +
        s +
        '" height="' +
        s +
        '" frameborder="0" class="like_toggle" allowTransparency="true"></iframe></div>';
    return r;
  }
  function tumblelog_reblog_button(e) {
    var t = e.size || "20",
      i = e.color || "default",
      s = e.reblog_url || !1;
    if (!s) return "";
    switch (i) {
      case "white":
        i = "#fff";
        break;
      case "black":
        i = "#000";
        break;
      default:
        i = "#ccc";
    }
    var o =
        '<svg width="100%" height="100%" viewBox="0 0 537 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="' +
        i +
        '"><path d="M 98.893,177.139c0.00-7.462, 4.826-12.275, 12.288-12.275L 405.12,164.864 l0.00,83.469 l 118.72-120.947L 405.12,8.678l0.00,81.51 L 49.382,90.189 c-15.206,0.00-27.648,12.429-27.648,27.648l0.00,171.814 l 77.146-71.603L 98.88,177.139 z M 438.874,332.646c0.00,7.45-4.826,12.275-12.275,12.275L 123.75,344.922 l0.00-83.469 l-116.506,120.922l 116.506,120.947l0.00-81.498 l 356.864,0.00 c 15.206,0.00, 27.648-12.454, 27.648-27.648L 508.262,220.134 l-69.402,71.59L 438.861,332.646 z" ></path></svg>',
      n = "display: block;width:" + t + "px;height:" + t + "px;",
      a =
        '<a href="' +
        s +
        '" class="reblog_button"style="' +
        n +
        '">' +
        o +
        "</a>";
    return a;
  }
  function render(e, t) {
    (token_tree = token_tree || tokenize(this.template)),
      (t = t || []),
      (e = e || token_tree);
    var i,
      s,
      o,
      n,
      a = "";
    for (var r in e) {
      var l = e[r];
      if ("string" == typeof l)
        if ((n = l.match(pattern))) {
          i = n[0].replace(/[{}]/g, "");
          var h = {};
          if (i.indexOf("=") !== -1) {
            var_name_parts = i.split(" ");
            for (var _ in var_name_parts) {
              var c = var_name_parts[_];
              if (c.indexOf("=") !== -1) {
                var d = c.split("=");
                h[d[0]] = d[1].replace(/"/g, "");
              } else i = c;
            }
          }
          o = !1;
          for (var p in transforms)
            if (i.substr(0, p.length).toLowerCase() == p) {
              (i = i.substr(p.length)), (o = transforms[p]);
              break;
            }
          if (
            ((s = lookup(t, i)),
            "undefined" == typeof s && (s = ""),
            "string" == typeof s || "number" == typeof s)
          )
            o && (s = o(s)),
              safe_to_mark &&
                (safe_mark_id = get_safe_mark_id(i)) &&
                ("title" !== safe_mark_id ||
                  lookup(t, "block:regular") ||
                  (safe_mark_id = "blogtitle"),
                "description" !== safe_mark_id ||
                  lookup(t, "block:postodd") ||
                  lookup(t, "block:posteven") ||
                  (safe_mark_id = "blogdescription"),
                (s =
                  '<span class="tumblr_theme_marker_' +
                  safe_mark_id +
                  '">' +
                  s +
                  "</span>")),
              (a += s);
          else if (
            "object" == typeof s &&
            null != s &&
            s.callback &&
            callbacks[s.callback]
          ) {
            if (s.attributes)
              for (var u in s.attributes) h[u] = s.attributes[u];
            var m = callbacks[s.callback](h, t);
            a += o ? o(m) : m;
          }
        } else (safe_to_mark = is_safe_to_mark(l)), (a += l);
      else {
        var g = r.split(";"),
          f = "block:" + g[0];
        if (((s = lookup(t, f)), "undefined" != typeof s))
          if (s === !0) a += render(l, t.concat([f]));
          else if ("string" == typeof s || "number" == typeof s) a += s;
          else if ("object" == typeof s)
            if ("[object Array]" == Object.prototype.toString.call(s))
              for (var b = 0, v = s.length; b < v; b++)
                a += render(l, t.concat([f, b]));
            else a += render(l, t.concat([f]));
      }
    }
    return a;
  }
  function tokenize(e) {
    token_tree = {};
    for (
      var t, i, s, o, n, a = [], r = 1, l = 0;
      null != (t = token_pattern.exec(e));

    )
      (o = t[0].replace(/[{}]/g, "").toLowerCase()),
        (n = e.substring(l, t.index)) && append_to_branch(token_tree, a, n),
        "block:" == o.substring(0, 6) || "/block:" == o.substring(0, 7)
          ? a[a.length - 1] &&
            (s = a[a.length - 1].split(";")[0]) &&
            s &&
            (s == o.substr(6) || s == o.substr(7))
            ? a.pop()
            : "block:" == o.substring(0, 6) &&
              ((o = append_attributes(o, r)),
              a.push(o.substr(6) + ";" + r),
              append_to_branch(token_tree, a),
              r++)
          : append_to_branch(token_tree, a, "{" + o + "}"),
        (l = t.index + t[0].length);
    return (
      (i = e.substr(l, e.length - l)) && append_to_branch(token_tree, a, i),
      delete token_tree.size,
      token_tree
    );
  }
  function append_attributes(e, t) {
    var i = e.indexOf(" ");
    if (i > -1) {
      for (
        var s, o, n = {}, a = e.substr(i + 1), r = a.split(" "), l = 0;
        (o = r[l]);
        l++
      )
        (s = o.split("=")),
          s[0] && s[1] && (n[s[0]] = s[1].replace(/["']/g, "")),
          (block_attributes[e.substr(0, i).replace("block:", "") + ";" + t] =
            n);
      e = e.substr(0, i);
    }
    return e;
  }
  function append_to_branch(e, t, i) {
    if (((i = i || !1), t.length))
      for (var s = 0; s < t.length; s++)
        s == t.length - 1
          ? i === !1
            ? ((e[t[s]] = {}), (e[t[s]].size = 0))
            : ((size = e[t[s]].size), (e[t[s]][size + "k"] = i), e[t[s]].size++)
          : (e[t[s]] || (e[t[s]] = {}), (e = e[t[s]]));
    else e.size || (e.size = 0), (e[e.size + "k"] = i), e.size++;
  }
  function keys_to_lowercase(e) {
    if (JSON) {
      var t = JSON.stringify(e);
      return (
        (t = t.replace(/"[^"]*"(?=:)/g, function (e) {
          return e.indexOf("block:") !== -1 || e.indexOf("if:") !== -1
            ? e.toLowerCase().replace(/\s/g, "")
            : e.toLowerCase();
        })),
        JSON.parse(t)
      );
    }
    var i,
      s = {};
    for (var o in e)
      (i = e[o]),
        o.indexOf("block:") !== -1 || o.indexOf("if:") !== -1
          ? (s[o.toLowerCase().replace(/\s/g, "")] =
              "object" == typeof i ? keys_to_lowercase(i) : i)
          : (s[o.toLowerCase()] =
              "object" == typeof i ? keys_to_lowercase(i) : i);
    return s;
  }
  function set_content_map(e) {
    (branch_cache = {}),
      (this.content_map = content_map = keys_to_lowercase(e)),
      generate_conditional_blocks_and_booleans();
  }
  function generate_conditional_blocks_and_booleans() {
    var e, t;
    for (var i in content_map) {
      e = content_map[i];
      var s = !1,
        o = !1;
      0 === i.indexOf("font:")
        ? ("string" != typeof e && (e = e.toString()),
          (e = fonts[e.toLowerCase()] || e),
          (content_map[i] = e))
        : "showtitle" === i ||
          "showdescription" === i ||
          "showheaderimage" === i ||
          "showavatar" === i
        ? ((content_map["block:" + i.replace(/^show/i, "hide")] =
            !to_boolean(e)),
          (content_map["block:" + i] = to_boolean(e)))
        : 0 === i.indexOf("if:") || 0 === i.indexOf("text:")
        ? ((t = i.replace(/if:|text:/, "").replace(/\s/g, "")),
          (s = "block:if" + t),
          (o = "block:ifnot" + t),
          (content_map[s] = to_boolean(e)),
          (content_map[o] = !to_boolean(e)))
        : 0 === i.indexOf("image:")
        ? ("https://assets.tumblr.com/images/x.gif" == e && (e = !1),
          (t = i.replace(/image:/, "").replace(/\s/g, "")),
          (s = "block:if" + t),
          (o = "block:ifnot" + t),
          (content_map["block:if" + t + "image"] = to_boolean(e)),
          (content_map["block:ifnot" + t + "image"] = !to_boolean(e)),
          to_boolean(e) ||
            (content_map[i] = "https://assets.tumblr.com/images/x.gif"))
        : "headerimage" === i &&
          ((content_map["headerimage-640"] = content_map[i]),
          (content_map["headerimage-1024"] = content_map[i]),
          (s = "block:if" + i),
          (o = "block:ifnot" + i),
          (content_map[s] = to_boolean(e)),
          (content_map[o] = !to_boolean(e)));
    }
  }
  function to_boolean(e) {
    switch (e) {
      case "0":
        return !1;
      case "1":
        return !0;
      default:
        return Boolean(e);
    }
  }
  function set_template(e) {
    (token_tree = null),
      (this.template = e
        .replace(/\{block:Text\}/gi, "{block:Regular}")
        .replace(/\{\/block:Text\}/gi, "{/block:Regular}")
        .replace(/\{block:Chat\}/gi, "{block:Conversation}")
        .replace(/\{\/block:Chat\}/gi, "{/block:Conversation}"));
  }
  function lookup(global_position, key) {
    for (var local_position = [], i = 0; i < global_position.length; i++)
      local_position.push(global_position[i]);
    for (var value; local_position.length; ) {
      var cache_key = JSON.stringify(local_position),
        map;
      try {
        map =
          branch_cache[cache_key] ||
          eval('content_map["' + local_position.join('"]["') + '"]');
      } catch (e) {
        try {
          local_position.splice(2, 1),
            (map =
              branch_cache[cache_key] ||
              eval('content_map["' + local_position.join('"]["') + '"]'));
        } catch (e) {
          console.error(e);
        }
      }
      if (((branch_cache[cache_key] = map), "object" == typeof map)) {
        if (((value = map[key]), "undefined" != typeof value)) break;
        local_position.pop();
      } else local_position.pop(), global_position.pop();
    }
    return (
      "undefined" != typeof value ||
        local_position.length ||
        (value = content_map[key]),
      value
    );
  }
  function strip(e) {
    return e.replace(/^\s+/, "").replace(/\s+$/, "");
  }
  function strip_tags(e) {
    return e.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "");
  }
  var token_tree,
    content_map,
    pattern =
      /^\{([a-zA-Z0-9][a-zA-Z0-9\-\/=" ]*|select\:[a-zA-Z0-9 ]+|font\:[a-zA-Z0-9 ]+|text\:[a-zA-Z0-9 ]+|image\:[a-zA-Z0-9 ]+|color\:[a-zA-Z0-9 ]+|RGBcolor\:[a-zA-Z0-9 ]+|lang\:[a-zA-Z0-9\- ]+)\}/gi,
    token_pattern =
      /\{([a-zA-Z0-9][a-zA-Z0-9\-\/=" ]*|select\:[a-zA-Z0-9 ]+|font\:[a-zA-Z0-9 ]+|text\:[a-zA-Z0-9 ]+|image\:[a-zA-Z0-9 ]+|color\:[a-zA-Z0-9 ]+|RGBcolor\:[a-zA-Z0-9 ]+|lang\:[a-zA-Z0-9\- ]+|[\/]?block\:[a-zA-Z0-9]+( [a-zA-Z0-9=" ]+)*)\}/gi,
    block_attributes = {},
    branch_cache = {},
    safe_to_mark = !0,
    safe_mark_id = "",
    transforms = {
      plaintext: plaintext,
      jsplaintext: jsplaintext,
      js: js,
      urlencoded: encodeURIComponent,
      rgb: hex2rgb,
    },
    fonts = {
      arial: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
      "arial black":
        "'Arial Black', Arial, 'Helvetica Neue', Helvetica, sans-serif",
      baskerville: "Baskerville, 'Times New Roman', Times, serif",
      "century gothic": "'Century Gothic', 'Apple Gothic', sans-serif",
      copperplate: "'Copperplate', serif",
      "courier new": "'Courier New', Courier, monospace",
      futura: "Futura, 'Century Gothic', AppleGothic, sans-serif",
      garamond: "Garamond, 'Hoefler Text', Times New Roman, Times, serif",
      geneva:
        "Geneva, 'Lucida Sans', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif",
      georgia:
        "Georgia, Palatino, 'Palatino Linotype', Times, 'Times New Roman', serif",
      helvetica: "Helvetica, Arial, sans-serif",
      "helvetica neue": "'Helvetica Neue', Arial, Helvetica, sans-serif",
      impact: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
      "lucida sans":
        "'Lucida Sans', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif",
      "trebuchet ms":
        "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      verdana: "Verdana, Geneva, Tahoma, sans-serif",
    },
    open_angle = 0,
    open_scripts = 0,
    open_styles = 0,
    callbacks = {
      audio_player: audio_player,
      audio_embed: audio_embed,
      tumblelog_like_button: tumblelog_like_button,
      tumblelog_reblog_button: tumblelog_reblog_button,
    },
    htmlentities = (function (e) {
      function t(t) {
        var i = e.createElement("div");
        return (
          i.appendChild(e.createTextNode(t)), (t = i.innerHTML), (i = null), t
        );
      }
      return (
        (t.decode = function (t) {
          var i = e.createElement("div");
          return (
            (i.innerHTML = t), (t = i.innerText || i.textContent), (i = null), t
          );
        }),
        (t.encode = t)
      );
    })(document);
  return {
    render: render,
    set_content_map: set_content_map,
    set_template: set_template,
    template: "",
    content_map: "",
    block_attributes: block_attributes,
    pattern: pattern,
  };
})(); /*! scripts/tumblr_editor.js */
var l10n_str = window.l10n_str || {};
if (
  ("undefined" != typeof Tumblr || (Tumblr = {}),
  (Tumblr.Editor = {}),
  (function (e) {
    function t(e, t, i) {
      if (document.createEvent) {
        var s = document.createEvent("Events");
        s.initEvent(e, !0, !0), (s.data = i), t.dispatchEvent(s);
      } else document.createEventObject && document.documentElement[e]++;
    }
    function i(e, i, s) {
      var o = document.getElementById(e);
      if ((s || (s = ""), document.selection))
        o.focus(),
          (sel = document.selection.createRange()),
          (sel.text = i + sel.text + s),
          o.focus();
      else if (o.selectionStart || "0" == o.selectionStart) {
        var n = o.selectionStart,
          a = o.selectionEnd,
          r = a,
          l = o.scrollTop;
        (o.value =
          o.value.substring(0, n) +
          i +
          o.value.substring(n, a) +
          s +
          o.value.substring(a, o.value.length)),
          (r += i.length + s.length),
          o.focus(),
          (o.selectionStart = r),
          (o.selectionEnd = r),
          (o.scrollTop = l);
      } else (o.value += i), (o.value += s), o.focus();
      t("input", o);
    }
    var s = function (e, i) {
      i = i || {};
      var s = i.focus || !1,
        o = i.type || !1,
        n =
          i.layout ||
          "bold,italic,strikethrough,separator,bullist,numlist,separator,blockquote,separator,image,link,unlink,separator,pagebreak,separator,code",
        a =
          i.custom_css ||
          "https://assets.tumblr.com/assets/styles/legacy/custom_tinymce.css",
        r = i.theme || "advanced",
        l = i.skin || "default",
        h = i.immediate || !1,
        _ = i.plugins || "safari,pagebreak",
        c = i.resize || !1,
        d = i.min_height || 100,
        p = i.min_width || 500,
        u = i.max_width || 500,
        m = i.placeholder || !1,
        g = i.allow_inline_style ? "|style" : "",
        f =
          "figure[class" +
          g +
          "],-a[class|href|id|name|rel|title|target" +
          g +
          "],-article[class|id|title" +
          g +
          "],-big[class|id|title" +
          g +
          "],-blockquote[class|id|title" +
          g +
          "],br,-code[class|id|title" +
          g +
          "],div[align<center?justify?left?right|class|id|title" +
          g +
          "],-em/i[class|id|title],-h1[align<center?justify?left?right|class|id|title" +
          g +
          "],-h2[align<center?justify?left?right|class|id|title" +
          g +
          "],-h3[align<center?justify?left?right|class|id|title" +
          g +
          "],-h4[align<center?justify?left?right|class|id|title" +
          g +
          "],-h5[align<center?justify?left?right|class|id|title" +
          g +
          "],-h6[align<center?justify?left?right|class|id|title" +
          g +
          "],hr[size|noshade],iframe[align<bottom?left?middle?right?top|class|frameborder|height|id|marginheight|marginwidth|name|scrolling<auto?no?yes|src|title|width" +
          g +
          "],img[align<bottom?left?middle?right?top|alt|border|class|height|id|name|src|title|width" +
          g +
          "],-ins[class|id|title" +
          g +
          "],-li[class|id|title|type" +
          g +
          "],object[align<bottom?left?middle?right?top|archive|border|class|classid|codebase|codetype|data|declare|height|hspace|id|name|title|type|width" +
          g +
          "],-ol[class|id|start|title|type" +
          g +
          "],p[align<center?justify?left?right|class|id|title" +
          g +
          "],param[id|name|type|value|valuetype<DATA?OBJECT?REF" +
          g +
          "],-pre/listing/plaintext/xmp[align|class|id|title|width" +
          g +
          "],script[charset|defer|language|src|type" +
          g +
          "],-small[class|id|onclick|ondblclick|title" +
          g +
          "],span[align<center?justify?left?right|class|id|title" +
          g +
          "],-strike/del/s[class|id|title" +
          g +
          "],-strong/b[class|id|title" +
          g +
          "],-sub[class|id|title" +
          g +
          "],-sup[class|id|title" +
          g +
          "],-u[class|id|title" +
          g +
          "],-ul[class|id|title|type" +
          g +
          "]" +
          (i.extra_elements ? "," + i.extra_elements : "");
      if ((o && "rich" !== o && "tinymce" !== o) || !tinyMCE) {
        if (document.getElementById(e + "_manual_toolbar")) {
          var b = document.getElementById(e + "_manual_toolbar");
          b.parentNode.removeChild(b);
        }
        var v = document.createElement("div");
        (v.id = e + "_manual_toolbar"), (v.className = "manual_toolbar");
        var w =
            window.__ ||
            function (e) {
              return e;
            },
          y = '<div class="editor_controls">';
        (y +=
          '<div class="editor_note">' +
          ("markdown" == o
            ? '<a href="http://daringfireball.net/projects/markdown/syntax" tabindex="-1" target="_blank">' +
              (l10n_str.markdown || w("markdown")) +
              "</a>"
            : l10n_str.html_enabled || w("HTML enabled")) +
          "</div>"),
          (y += '<div class="editor_buttons">'),
          (y +=
            '<span class="editor_button bold" onclick="' +
            ("markdown" == o
              ? "Tumblr.Editor.insertTag('" + e + "', '**', '**');"
              : "Tumblr.Editor.insertTag('" + e + "', '<b>', '</b>');") +
            ' return false;"></span>'),
          (y +=
            '<span class="editor_button italic" onclick="' +
            ("markdown" == o
              ? "Tumblr.Editor.insertTag('" + e + "', '_', '_');"
              : "Tumblr.Editor.insertTag('" + e + "', '<i>', '</i>');") +
            ' return false;"></span>'),
          (y +=
            "markdown" == o
              ? ""
              : '<span class="editor_button strikethrough" onclick="Tumblr.Editor.insertTag(\'' +
                e +
                "', '<strike>', '</strike>'); return false;\"></span>"),
          (y +=
            '<span class="editor_button link" onclick="' +
            ("markdown" == o
              ? "Tumblr.Editor.insertTag('" +
                e +
                "', '[', '](' + prompt((l10n_str.enter_the_url || __('Enter the URL:')), 'http://') + ')');"
              : "Tumblr.Editor.insertTag('" +
                e +
                "', '<a href=&quot;' + prompt((l10n_str.enter_the_url || __('Enter the URL:')), 'http://') + '&quot;>', '</a>');") +
            ' return false;"></span>'),
          (y += '<span class="editor_button photo"></span>'),
          (y += "</div>"),
          (y += "</div>"),
          (v.innerHTML = y),
          document
            .getElementById(e)
            .parentNode.insertBefore(v, document.getElementById(e)),
          (document.getElementById(e).style.height =
            parseInt(document.getElementById(e).style.height, 10) - 30 + "px");
        var k = document.getElementById(e),
          $ = k.value.lastIndexOf("</p>");
        if (
          (($ = $ == -1 ? k.value.length : $),
          "number" == typeof k.selectionStart)
        )
          k.selectionStart = k.selectionEnd = $;
        else if ("undefined" != typeof k.createTextRange) {
          k.focus();
          var x = k.createTextRange();
          x.collapse(!1), x.select();
        }
        k.scrollTop = 99999;
      } else {
        var C = function () {
          function i(e) {
            var i,
              o = !1;
            e.onRemove.add(function (e) {
              i && i.off("click.image_upload");
            }),
              e.onInit.add(function (e) {
                if (
                  (e.addShortcut("ctrl+k", "Insert link", "mceLink"),
                  s &&
                    ("focus_end" === s
                      ? setTimeout(function () {
                          e.focus(),
                            e.selection.select(e.getBody(), !0),
                            e.selection.collapse(!1),
                            e.execCommand("mceFocus", !1, "");
                        }, 200)
                      : setTimeout(function () {
                          e.focus();
                        }, 200)),
                  m)
                ) {
                  var n = e.getContent();
                  "" === n &&
                    (e.setContent(m),
                    e.selection.select(e.dom.select("p")[0]),
                    e.selection.collapse(!1),
                    (o = !0));
                }
                if (e.plugins.image_upload) {
                  var a = jQuery("a.mce_image_upload").parent("td"),
                    r = jQuery("a.mce_image").parent("td").hide();
                  (i = jQuery("a.mce_image").on(
                    "click.image_upload",
                    function (e) {
                      return e.preventDefault(), e.stopPropagation(), !1;
                    }
                  )),
                    e.onKeyDown.add(function (e, t) {
                      t.altKey && (a.hide(), r.show());
                    }),
                    e.onKeyUp.add(function (e, t) {
                      jQuery("body").hasClass("popover_open") ||
                        (a.show(), r.hide());
                    });
                }
                e.plugins.autoresize &&
                  (e.onChange.add(function (e, t) {
                    var i = e.settings.resize_events_blackout;
                    (e.settings.resize_events_blackout = !0),
                      i || e.execCommand("mceAutoResize"),
                      clearTimeout(e.settings.resize_events_blackout_timeout),
                      (e.settings.resize_events_blackout_timeout = setTimeout(
                        function () {
                          e.settings.resize_events_blackout = !1;
                        },
                        100
                      ));
                  }),
                  tinymce.dom.Event.add(e.getWin(), "resize", function () {
                    !e.settings.resize_events_blackout && this.innerHeight
                      ? ((e.plugins.autoresize.autoresize_min_height =
                          this.innerHeight),
                        t("tinymce.resize", document))
                      : t("tinymce.autoresize", document);
                  })),
                  tinymce.dom.Event.add(e.getBody(), "focus", function (i) {
                    return (
                      e.execCommand("mceAutoResize"),
                      t("tinymce.focus", document),
                      !1
                    );
                  }),
                  tinymce.dom.Event.add(e.getBody(), "dragenter", function (e) {
                    return tinymce.dom.Event.cancel(e);
                  }),
                  tinymce.dom.Event.add(
                    e.getBody().parentNode,
                    "drop",
                    function (e) {
                      tinymce.dom.Event.cancel(e), tinymce.dom.Event.stop(e);
                    }
                  ),
                  t("tinymce.init", document, e);
              }),
              e.onMouseDown.add(function (e, t) {
                o && e.setContent("");
              }),
              e.onSetContent.add(function (e, t) {
                e.save();
              }),
              e.onPaste.add(function (e, t) {
                setTimeout(function () {
                  e.save(), e.execCommand("mceAutoResize");
                }, 100);
              }),
              e.onKeyDown.add(function (e, i) {
                return 27 === i.keyCode
                  ? (t("tinymce.keydown_esc", document), !1)
                  : 13 === i.keyCode && (i.metaKey || i.ctrlKey)
                  ? (t("tinymce.keydown_cmd_enter", document), !1)
                  : void 0;
              });
          }
          "default" == l &&
            "www.tumblr.com" == window.location.host &&
            (document.domain = "tumblr.com"),
            tinyMCE.init({
              setup: i,
              mode: "exact",
              language: language_for_tinymce ? language_for_tinymce : "en",
              elements: e,
              convert_newlines_to_brs: !1,
              theme: r,
              skin: l,
              remove_trailing_nbsp: !0,
              theme_advanced_layout_manager: "SimpleLayout",
              theme_advanced_buttons2: "",
              theme_advanced_buttons3: "",
              theme_advanced_toolbar_location: "top",
              theme_advanced_resizing: c,
              theme_advanced_resizing_min_width: p,
              theme_advanced_resizing_max_width: u,
              theme_advanced_resizing_use_cookie: !1,
              theme_advanced_path: !1,
              content_css: a,
              plugins: _,
              autoresize_min_height: d,
              autoresize_max_height: 750,
              object_resizing: !1,
              pagebreak_separator: "[[MORE]]",
              convert_urls: !1,
              process_html: !0,
              cleanup_on_startup: !0,
              inline_styles: !1,
              gecko_spellcheck: !0,
              flash_video_player_url: !1,
              valid_elements: f,
              theme_advanced_buttons1: n,
              formats: { strikethrough: { inline: "strike" } },
              width: "100%",
              paste_preprocess: function (e, t) {
                t.content.indexOf("data:image") !== -1 && (t.content = "");
              },
            });
        };
        h
          ? C()
          : window.addEventListener
          ? window.addEventListener("load", C, !1)
          : window.attachEvent && window.attachEvent("onload", C),
          document.getElementById(e + "_is_rich_text") &&
            (document.getElementById(e + "_is_rich_text").value = 1);
      }
    };
    Backbone &&
      Backbone.Events &&
      (function (e, t) {
        _.each(
          [
            "tinymce.autoresize",
            "tinymce.blur",
            "tinymce.change",
            "tinymce.focus",
            "tinymce.keydown_esc",
            "tinymce.keydown_cmd_enter",
            "tinymce.keyup",
            "tinymce.image_upload.click",
            "tinymce.init",
            "tinymce.resize",
          ],
          function (i) {
            e.addEventListener(
              i,
              function (e) {
                t.trigger(i, e);
              },
              !1
            );
          }
        );
      })(document, _.extend(e, Backbone.Events)),
      (e.render = s),
      (e.insertTag = i);
  })(Tumblr.Editor) /*! scripts/plexi.js */,
  (function (e, t) {
    "use strict";
    var i = function (t) {
      return this instanceof i
        ? ((this.token = t.token || ""),
          t.instance &&
            ((this.instance = t.instance), (this.$instance = e(t.instance))),
          (this.hide_timeout = null),
          (this.transition_class = null),
          (this.$hide_timeout = null),
          void i.register(this))
        : new i(t);
    };
    (i.prototype = {
      create: function (t, i) {
        i = i || {};
        var s = e(t);
        (this.$instance = e("<div/>", {
          "data-token": this.token,
          class: "plexi",
        })),
          (this.instance = this.$instance.get(0)),
          i.cssClass && this.$instance.addClass(i.cssClass),
          s.append(this.$instance);
      },
      show: function (t) {
        (t = t || {}),
          (this.transition_class = t.transition_class || !1),
          this.$instance.hasClass("instant") ||
            this.$instance.addClass("active"),
          setTimeout(
            e.proxy(function () {
              clearTimeout(this.$hide_timeout),
                this.transition_class &&
                  this.$instance.addClass(this.transition_class),
                this.$instance.addClass("show"),
                this.$instance.hasClass("instant") ||
                  this.$instance.addClass("active");
            }, this),
            1
          );
      },
      hide: function () {
        this.$instance.removeClass("show"),
          (this.$hide_timeout = setTimeout(
            e.proxy(function () {
              this.$instance.removeClass("show instant active fast"),
                this.transition_class &&
                  this.$instance.removeClass(this.transition_class);
            }, this),
            50
          ));
      },
      destroy: function () {
        return i.instances.splice(_.indexOf(this), 1), this;
      },
    }),
      (i.instances = []),
      (i.register = function (e) {
        this.instances.push(e);
      }),
      (i.findByToken = function (t) {
        for (var i, s = 0; s < this.instances.length; s++)
          this.instances[s].token == t && (i = this.instances[s]);
        if (!i) {
          var o = e('.plexi[data-token="' + t + '"]');
          if (o.length) {
            var n = new Tumblr.Plexi({ instance: o, token: t });
            return this.instances.push(n), n;
          }
        }
        return i;
      }),
      (t.Plexi = i);
  })(jQuery, Tumblr) /*! scripts/multi_popover.js */,
  (function (e, t) {
    var i = function (t, s) {
      function o() {
        var e = function () {
          return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
        };
        return (
          e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
        );
      }
      return this instanceof i
        ? ((s = s || {}),
          (this.$container = e(t)),
          this.$container.is(".popover")
            ? ((this.$popover = this.$container),
              (this.$container = this.$popover.parent()))
            : (this.$popover = this.$container.find(".popover")),
          (this.token = s.token || o()),
          (this.animate = s.animate || !1),
          (this.on_hide = s.on_hide || function () {}),
          (this.on_show = s.on_show || function () {}),
          (this.direction = s.direction || "auto"),
          (this.insertPlexiAt = e(s.insertAt) || this.container),
          (this.plexiSelector = '.plexi[data-token="' + this.token + '"]'),
          (this.events = { click: e.proxy(this.__plexiClick, this) }),
          i.register(this),
          this)
        : new i(t, s);
    };
    (i.prototype = {
      __plexiClick: function (e) {
        e.preventDefault(), this.hide();
      },
      show: function () {
        return (
          this.position(),
          0 === e(this.plexiSelector).length
            ? ((this.plexi = new Tumblr.Plexi({ token: this.token })),
              this.plexi.create(this.insertPlexiAt))
            : (this.plexi = Tumblr.Plexi.findByToken(this.token)),
          (this.visible = !0),
          this.plexi.show(),
          this.$popover.show(),
          this.plexi.$instance.on("click", this.events.click),
          this.on_show.apply(this, [this]),
          this
        );
      },
      position: function () {
        this.$container.show(), this.$popover.show();
        var t = e(window),
          i = { top: t.scrollTop(), left: t.scrollLeft() };
        this.$popover.removeClass("south"),
          (i.right = i.left + t.width()),
          (i.bottom = i.top + t.height());
        var s = this.$popover.offset();
        (s.right = s.left + this.$popover.outerWidth()),
          (s.bottom = s.top + this.$popover.outerHeight());
        var o =
          "south" === this.direction ||
          ("auto" === this.direction && i.bottom < s.bottom);
        o && this.$popover.addClass("south");
      },
      hide: function () {
        return (
          this.plexi.hide(),
          this.$popover.hide(),
          (this.visible = !1),
          this.$container.removeClass("active"),
          this.plexi.$instance.off("click", this.events.click),
          this.on_hide.apply(this, [this]),
          this
        );
      },
    }),
      (i.instances = []),
      (i.register = function (e) {
        this.instances.push(e);
      }),
      (i.hideAll = function () {
        for (var e = 0; e < this.instances.length; e++)
          this.instances[e].hide();
      }),
      (i.visible = function () {
        for (var e = 0; e < this.instances.length; e++)
          if (this.instances[e].visible) return !0;
        return !1;
      }),
      (t.MultiPopover = i);
  })(jQuery, Tumblr) /*! scripts/tumblr/pay_popover.js */,
  (function (e, t) {
    var i = Backbone.View.extend({
      events: {
        "click .cancel": "cancel_button",
        "click .confirm": "confirm_button",
      },
      initialize: function (e) {
        (this.options = e || {}),
          (this.id = this.options.id || "pay_widget"),
          (this.button_selector = this.options.button_selector || ".button"),
          (this.amount = this.options.amount || 0),
          (this.key = this.options.key || ""),
          (this.params = this.options.params || !1),
          (this.has_purchased = this.options.has_purchased),
          (this.success_callback = this.options.success),
          (this.cancel_callback = this.options.cancel),
          (this.load_callback = this.options.load),
          (this.error_callback = this.options.error),
          (this.$button = this.$(this.button_selector));
        var i = this;
        (this.popover = new t.MultiPopover(this.$el, {
          on_show: function () {
            i.$el.show();
          },
          on_hide: function () {
            i.$el.hide(!1);
          },
          token: "pay-widget-plexi",
        })),
          (this.$popover = this.popover.$popover),
          Tumblr.PostMessageListener.initialize(
            _.bind(function (e, t) {
              if (t !== "https://secure." + this.no_www(window.location.host))
                return !1;
              if ("pay_widget" !== e[0]) return !1;
              switch (e[1]) {
                case "size":
                  this.set_iframe_size(
                    e[2] || this.$iframe.width(),
                    e[3] || this.$iframe.height()
                  );
                  break;
                case "close":
                  this.hide(e.length > 2 && "success" === e[2]);
              }
            }, this)
          ),
          this.render();
      },
      render: function (e) {
        e &&
          ((this.amount =
            "undefined" != typeof e.amount
              ? parseInt(e.amount, 10)
              : this.amount),
          (this.key = e.key || this.key),
          (this.params = e.params || this.params),
          (this.has_purchased = e.has_purchased || this.has_purchased),
          (this.success_callback = e.success || this.success_callback),
          (this.cancel_callback = e.cancel || this.cancel_callback),
          (this.load_callback = e.load || this.load_callback),
          (this.error_callback = e.error || this.error_callback)),
          this.amount
            ? (this.initialize_iframe(), this.$el.removeClass("free"))
            : this.$el.addClass("free"),
          this.show(),
          this.position_popover();
      },
      build_url: function (e, t) {
        var i = "";
        "string" == typeof t
          ? (i = "?" + t)
          : _.isObject(t) &&
            (i =
              "" +
              _.chain(t)
                .pairs()
                .reduce(function (e, t, i) {
                  return (
                    (e += e ? "&" : "?"),
                    e +
                      encodeURIComponent(t[0]) +
                      "=" +
                      encodeURIComponent(t[1])
                  );
                }, "")
                .value());
        var s = "/pay/" + e;
        return s + i;
      },
      position_popover: function () {
        return this.options.position
          ? void this.$popover.css({
              left: this.options.position.left,
              top: this.options.position.top,
            })
          : void this.$popover.css({
              left:
                this.$button.offset().left + 0.5 * this.$button.outerWidth(),
              top: this.$button.offset().top + this.$button.outerHeight() + 10,
            });
      },
      initialize_iframe: function () {
        (this.$iframe && this.$iframe.length) ||
          (this.$popover.find("iframe.pay_widget").remove(),
          (this.$iframe = e("<iframe/>")
            .attr({
              id: this.id,
              frameborder: "0",
              scrolling: "no",
              allowTransparency: "true",
            })
            .addClass("pay_widget")
            .on(
              "load",
              _.bind(function (e) {
                this.$popover.removeClass("loading"),
                  this.$iframe.removeClass("loading"),
                  this.button_spinner(this.button_selector, !1);
              }, this)
            )),
          this.$popover.append(this.$iframe)),
          this.button_spinner(this.button_selector, !0),
          (this.iframe_url = this.build_url(this.amount, this.params)),
          this.$iframe.attr("src") === this.iframe_url &&
            this.$iframe.attr("src", "about:blank"),
          this.$popover.addClass("loading"),
          this.$iframe.addClass("loading"),
          this.$iframe.attr("src", this.iframe_url);
      },
      cancel_button: function (e) {
        if (_.isFunction(this.has_purchased)) {
          if (!this.has_purchased()) return;
        } else if (this.amount) return;
        this.hide(!1);
      },
      confirm_button: function (e) {
        if (_.isFunction(this.has_purchased)) {
          if (!this.has_purchased()) return;
        } else if (this.amount) return;
        this.hide(!0);
      },
      set_iframe_size: function (e, t) {
        this.$iframe && this.$iframe.css({ width: e, height: t });
      },
      button_label: function (t, i) {
        var s = this.$(t),
          o = s.find(".button_label");
        if (
          ((o && o.length) ||
            (o = e('<span class="button_label"></span>')
              .text(s.text())
              .appendTo(s.text(""))),
          i)
        ) {
          var n = s.data(i) || o.text();
          o.text(n);
        }
      },
      button_spinner: function (t, i) {
        var s = this.$(t);
        this.button_label(s);
        var o = s.find(".button_loader");
        (o && o.length) ||
          (o = e('<span class="button_loader"></span>').appendTo(s));
        var n =
          s.data("loader") ||
          Tumblr.Loader({
            color: "#ffffff",
            top: "0",
            left: "0",
            position: "absolute",
            className: "",
          });
        s.data("loader", n),
          i
            ? (s.addClass("loading"), n.start(o))
            : (s.removeClass("loading"), n.stop());
      },
      show: function () {
        this.popover.show();
      },
      hide: function (e) {
        this.popover.hide(),
          this.$iframe &&
            (this.set_iframe_size("", ""),
            this.$iframe.attr("src", "about:blank")),
          "undefined" != typeof e &&
            (e &&
              _.isFunction(this.success_callback) &&
              this.success_callback(),
            !e && _.isFunction(this.cancel_callback) && this.cancel_callback());
      },
      no_www: function (e) {
        return e.replace(/^([^\/]:\/\/)?(www\.)?(.*)/i, "$1$3");
      },
      post_message: function (e, t, i) {
        i || (i = window.parent),
          t || (t = "https://secure." + this.no_www(window.location.host)),
          "string" != typeof e && (e = e.join(";")),
          i !== window && i.postMessage(e, t);
      },
      destroy: function (e) {
        this.$iframe.remove(),
          this.constructor.__super__.destroy.apply(this, arguments);
      },
    });
    t.PayPopover = i;
  })(jQuery, Tumblr) /*! scripts/tumblr/flat_select.js */,
  (function (e, t, i, s) {
    var o = i.View.extend({
      el: "body",
      defaults: {},
      events: { "change .flat_select select": "__select_change" },
      __select_change: function (t) {
        var i = e(t.currentTarget);
        this.update_select(i);
      },
      initialize: function (e) {
        this.options = t.extend({}, this.defaults, e);
      },
      update_select: function (e) {
        var t = e.siblings("label");
        t.text(e.find(":selected").text());
      },
    });
    s.FlatSelect = o;
  })(jQuery, _, Backbone, Tumblr) /*! scripts/tumblr/binary_switch.js */,
  (function (e, t) {
    var i = Backbone.View.extend({
      el: ".binary_switcher",
      className: "binary_switch",
      defaults: { additionalClassNames: "" },
      initialize: function (e) {
        (this.options = e || {}),
          (this.options = _.extend(this.defaults, this.options || {}));
      },
      render: function () {
        return (
          _.each(
            this.$el.not("[data-binary-switch-init]"),
            _.bind(function (t) {
              var i = e(t);
              i.attr("data-binary-switch-init", !0),
                i.wrap(
                  e("<label>")
                    .addClass(this.className)
                    .addClass(this.options.additionalClassNames)
                ),
                i.after(e("<span>", { class: this.className + "_button" })),
                i.after(e("<span>", { class: this.className + "_track" }));
            }, this)
          ),
          this
        );
      },
    });
    t.BinarySwitch = i;
  })(jQuery, Tumblr) /*! scripts/tumblr/autosize_textarea.js */,
  (function (e, t, i, s) {
    var o = i.View.extend({
      tagName: "textarea",
      className: "autosize",
      events: {
        focus: "focus_event",
        blur: "blur_event",
        change: "change_event",
        input: "input_event",
      },
      defaults: { min_height: !1, max_height: !1 },
      initialize: function (e) {
        this.options = t.extend({}, this.defaults, e || {});
      },
      create_shadow: function () {
        return (
          this.remove_shadow(),
          (this.$shadow_wrap = e("<div/>", {
            css: {
              position: "absolute",
              overflow: "hidden",
              "margin-top": "0",
              "margin-right": "0",
              "margin-bottom": "0",
              "margin-left": "0",
              "padding-top": "0",
              "padding-right": "0",
              "padding-bottom": "0",
              "padding-left": "0",
              width: "1px",
              height: "1px",
              visibility: "hidden",
              "pointer-events": "none",
            },
          }).insertAfter(this.$el)),
          (this.$shadow = e("<div/>").appendTo(this.$shadow_wrap)),
          this.$shadow
        );
      },
      remove_shadow: function () {
        this.$shadow &&
          (this.$shadow.remove(),
          this.$shadow_wrap.remove(),
          delete this.$shadow,
          delete this.$shadow_wrap);
      },
      apply_el_html: function (e) {
        var i = this.$el.val() || " ";
        (i && "\n" !== i.charAt(i.length - 1)) || (i += "&nbsp"),
          e.html(t.escape(i));
      },
      apply_el_style: function (e) {
        e.css({
          "-webkit-sizing": this.$el.css("-webkit-box-sizing"),
          "-moz-sizing": this.$el.css("-moz-box-sizing"),
          "box-sizing": this.$el.css("box-sizing"),
          "padding-top": this.$el.css("padding-top"),
          "padding-right": this.$el.css("padding-right"),
          "padding-bottom": this.$el.css("padding-bottom"),
          "padding-left": this.$el.css("padding-left"),
          "border-top-width": this.$el.css("border-top-width"),
          "border-right-width": this.$el.css("border-right-width"),
          "border-bottom-width": this.$el.css("border-bottom-width"),
          "border-left-width": this.$el.css("border-left-width"),
          "border-top-style": this.$el.css("border-top-style"),
          "border-right-style": this.$el.css("border-right-style"),
          "border-bottom-style": this.$el.css("border-bottom-style"),
          "border-left-style": this.$el.css("border-left-style"),
          width: this.get_el_width(this.$el),
          height: "auto",
          "min-height": "0",
          "max-height": "none",
          overflow: this.$el.css("overflow"),
          font: this.$el.css("font"),
          "white-space": this.$el.css("white-space"),
          position: "absolute",
          visibility: "hidden",
          "pointer-events": "none",
        });
      },
      get_el_width: function (e) {
        var t =
          e.css("box-sizing") ||
          e.css("-moz-box-sizing") ||
          e.css("-webkit-box-sizing");
        switch (t) {
          case "border-box":
            return e.outerWidth();
          case "padding-box":
            return e.innerWidth();
          default:
            return e.width();
        }
      },
      get_el_height: function (e) {
        var t =
          e.css("box-sizing") ||
          e.css("-moz-box-sizing") ||
          e.css("-webkit-box-sizing");
        switch (t) {
          case "border-box":
            return e.outerHeight();
          case "padding-box":
            return e.innerHeight();
          default:
            return e.height();
        }
      },
      set_el_height: function () {
        this.$shadow ||
          (this.create_shadow(),
          this.apply_el_html(this.$shadow),
          this.apply_el_style(this.$shadow));
        var e = this.options.min_height,
          t = this.options.max_height,
          i = this.get_el_height(this.$shadow);
        e !== !1 && i < e ? (i = e) : t !== !1 && i > t && (i = t),
          this.$el.css({ "min-height": i, "max-height": i, height: i }),
          this.trigger("textarea:autosize");
      },
      determine_height: function () {
        this.create_shadow(),
          this.apply_el_html(this.$shadow),
          this.apply_el_style(this.$shadow),
          this.set_el_height(),
          this.remove_shadow();
      },
      focus_event: function () {
        this.create_shadow(), this.apply_el_style(this.$shadow);
      },
      blur_event: function () {
        this.remove_shadow();
      },
      change_event: function () {
        this.determine_height();
      },
      input_event: function () {
        this.apply_el_html(this.$shadow), this.set_el_height();
      },
      render: function () {
        this.determine_height();
      },
    });
    s.AutosizeTextarea = o;
  })(jQuery, _, Backbone, Tumblr) /*! scripts/color_utilities.js */,
  (function (e, t, i) {
    var s = {
      rgb_to_hex: function (e, t, i) {
        return (
          "#" + ((1 << 24) + (e << 16) + (t << 8) + i).toString(16).slice(1)
        );
      },
      hex_to_rgb: function (e) {
        (e = new String(e).replace(/[^0-9a-f]/gi, "")),
          e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]);
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t
          ? {
              r: parseInt(t[1], 16),
              g: parseInt(t[2], 16),
              b: parseInt(t[3], 16),
            }
          : null;
      },
      rgb_to_hsv: function (e, t, i) {
        var s = Math.min(Math.min(e, t), i),
          o = Math.max(Math.max(e, t), i),
          n = o - s,
          a = { h: 6, s: o ? (o - s) / o : 0, v: o / 255 };
        return (
          n
            ? o === e
              ? (a.h += (t - i) / n)
              : o === t
              ? (a.h += 2 + (i - e) / n)
              : (a.h += 4 + (e - t) / n)
            : (a.h = 0),
          (a.h = (60 * a.h) % 360),
          a
        );
      },
      hsv_to_rgb: function (e, t, i) {
        var s, o, n;
        if (t) {
          s = o = n = 0;
          var a = ((e + 360) % 360) / 60,
            r = i * t,
            l = i - r,
            h = r * (1 - Math.abs((a % 2) - 1));
          a < 1
            ? ((s = r), (o = h))
            : a < 2
            ? ((s = h), (o = r))
            : a < 3
            ? ((o = r), (n = h))
            : a < 4
            ? ((o = h), (n = r))
            : a < 5
            ? ((n = r), (s = h))
            : ((n = h), (s = r)),
            (s += l),
            (o += l),
            (n += l);
        } else s = o = n = i;
        return {
          r: Math.round(255 * s),
          g: Math.round(255 * o),
          b: Math.round(255 * n),
        };
      },
      hex_to_hsv: function (e) {
        (e = new String(e).replace(/[^0-9a-f]/gi, "")),
          e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]);
        var s = i.ColorUtilities.hex_to_rgb(e),
          o = i.ColorUtilities.rgb_to_hsv.apply(i.ColorUtilities, t.toArray(s));
        return o;
      },
      hsv_to_hex: function (e, s, o) {
        var n = i.ColorUtilities.hsv_to_rgb(e, s, o),
          a = i.ColorUtilities.rgb_to_hex.apply(i.ColorUtilities, t.toArray(n));
        return a;
      },
      hex_brightness: function (e, t) {
        (e = String(e).replace(/[^0-9a-f]/gi, "")),
          e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
          (t = t || 0);
        var i,
          s,
          o,
          n = parseInt(e, 16),
          a = t < 0 ? 0 : 255,
          r = t < 0 ? -t : t,
          l = n >> 16,
          h = (n >> 8) & 255,
          _ = 255 & n;
        return (
          (i = Math.round((a - l) * r) + l),
          (s = Math.round((a - h) * r) + h),
          (o = Math.round((a - _) * r) + _),
          "#" + (16777216 + 65536 * i + 256 * s + o).toString(16).slice(1)
        );
      },
      hsv_to_readable: function (e) {
        return (
          "string" == typeof e && (e = i.ColorUtilities.hex_to_hsv(e)),
          e.s < 0.2 && e.v > 0.8 ? "#444" : "#FFF"
        );
      },
      compare_colors: function (e, i, s) {
        var o = {
          upper_bound: 0.8,
          lower_bound: 0.2,
          diff_bound: 0.1,
          hue_bound: 15,
        };
        t.extend(o, s);
        var n = o.upper_bound,
          a = o.lower_bound,
          r = o.diff_bound,
          l = o.hue_bound,
          h = Math.abs(e.h - i.h),
          _ = Math.abs(e.s - i.s),
          c = Math.abs(e.v - i.v);
        return (
          (h <= r && _ <= r && c <= r) ||
          (_ <= r &&
            c <= r &&
            (_ >= n || (_ <= a && c >= n) || (c <= a && h <= l)))
        );
      },
    };
    i.ColorUtilities = s;
  })(jQuery, _, Tumblr) /*! scripts/color_editor/views/_palette.js */,
  Tumblr.ColorEditor || (Tumblr.ColorEditor = {}),
  (function (e, t, i, s) {
    var o = i.View.extend({
      className: "color_palette",
      defaults: {
        colors: [],
        current_color: !1,
        current_page: 0,
        on_change: e.noop,
      },
      events: {
        "click .swatch": "__color_click",
        "click .pagination a.dot": "__pagination_click",
        "click .pagination a.next": "__pagination_next_click",
        "click .pagination a.previous": "__pagination_previous_click",
      },
      __color_click: function (t) {
        t.preventDefault();
        var i = e(t.currentTarget);
        i.hasClass("selected") ||
          (this.$(".swatch.selected").removeClass("selected"),
          i.addClass("selected"),
          this.update_color(i.data("color")));
      },
      __pagination_click: function (t) {
        t.preventDefault();
        var i = e(t.currentTarget);
        i.hasClass("selected") ||
          ((this.current_page = i.data("page")), this.render(!0));
      },
      __pagination_next_click: function (t) {
        t.preventDefault(),
          !e(t.currentTarget).hasClass("disabled") &&
            this.current_page < this.page_count - 1 &&
            (this.current_page++, this.render(!0));
      },
      __pagination_previous_click: function (t) {
        t.preventDefault(),
          !e(t.currentTarget).hasClass("disabled") &&
            this.current_page > 0 &&
            (this.current_page--, this.render(!0));
      },
      initialize: function (e) {
        (this.options = t.extend({}, this.defaults, e)),
          (this.colors = this.options.colors),
          (this.current_color = this.options.current_color),
          (this.current_page = this.options.current_page),
          (this.page_count = this.colors.length);
      },
      render: function (e) {
        return (
          this.$el.html(
            this.template({
              colors: this.colors[this.current_page],
              current_color: this.current_color,
              page: this.current_page,
              page_color: this.colors[this.current_page][4],
              page_count: this.page_count,
            })
          ),
          this.$el.toggleClass("paginating", e || !1),
          this
        );
      },
      update_color: function (e) {
        (this.current_color = e), this.options.on_change(this.current_color);
      },
      template: t.template(
        '            <%                var previous_arrow_class = "arrow previous icon_arrow_carrot_left";                previous_arrow_class += (page === 0) ? " disabled" : "";                var next_arrow_class = "arrow next icon_arrow_carrot_right";                next_arrow_class += (page === page_count - 1) ? " disabled" : "";            %>            <% _.each(colors, function(color) { %>                <a class="swatch<% if(color === current_color){ print(" selected") } %>" data-color="<%= color %>" style="background-color:<%= color %>"><span class="inner_border"></span></a>            <% }); %>            <% if(page_count > 1) { %>                <div class="pagination">                    <a class="<%= previous_arrow_class %>"></a>                    <% for(var i=0; i<page_count; i++) { %>                        <% if(i === page) { %>                            <a class="dot selected" data-page="<%= i %>" style="background-color:<%= page_color %>"></a>                        <% } else { %>                            <a class="dot" data-page="<%= i %>"></a>                        <% } %>                    <% } %>                    <a class="<%= next_arrow_class %>"></a>                </div>            <% } %>        '
      ),
    });
    s.Palette = o;
  })(
    jQuery,
    _,
    Backbone,
    Tumblr.ColorEditor
  ) /*! scripts/color_editor/views/_picker.js */,
  Tumblr.ColorEditor || (Tumblr.ColorEditor = {}),
  (function (e, t, i, s) {
    var o = i.View.extend({
      className: "color_picker",
      defaults: {
        color: { r: 0, g: 0, b: 0 },
        debounce: 30,
        on_change: e.noop,
      },
      events: {
        paste: "__paste",
        "mousedown .hue_selector": "__hue_mousedown",
        "mousedown .saturation_wrapper": "__saturation_mousedown",
        "focus .color_text": "__color_text_focus",
        "keyup .color_text": "__color_text_keyup",
      },
      __hue_mousedown: function (i) {
        this.hue_width = this.$hue.width();
        var s = (i.pageX - this.$hue.offset().left) / this.hue_width;
        (this.hsv.h = Math.round(360 * s)),
          this.update_hue(),
          e("body").on(
            "mousemove.pickerhue",
            t.bind(
              t.throttle(this.__hue_mousemove, this.options.debounce),
              this
            )
          ),
          e("body").on("mouseup.pickerhue", t.bind(this.__hue_mouseup, this));
      },
      __hue_mousemove: function (e) {
        var t = this.$hue.offset().left;
        if (
          (e.preventDefault(),
          e.stopPropagation(),
          (e.cancelBubble = !0),
          (e.returnValue = !1),
          !(e.pageX < t || e.pageX > t + this.hue_width))
        ) {
          var i = (e.pageX - this.$hue.offset().left) / this.hue_width;
          return (this.hsv.h = Math.round(360 * i)), this.update_hue(), !1;
        }
      },
      __hue_mouseup: function (t) {
        t.preventDefault(), t.stopPropagation(), e("body").off(".pickerhue");
      },
      __saturation_mousedown: function (i) {
        var s = this.$saturation.offset(),
          o = i.pageX - s.left,
          n = i.pageY - s.top;
        (this.saturation_width = this.$saturation.width()),
          (this.saturation_height = this.$saturation.height()),
          (this.hsv.s = Math.max(0, Math.min(o / this.saturation_width, 1))),
          (this.hsv.v = Math.max(
            0,
            Math.min(1 - n / this.saturation_height, 1)
          )),
          this.update_saturation(),
          this.$saturation_indicator.addClass("dragging"),
          e("body").on(
            "mousemove.pickersaturation",
            t.bind(
              t.throttle(this.__saturation_mousemove, this.options.debounce),
              this
            )
          ),
          e("body").on(
            "mouseup.pickersaturation",
            t.bind(this.__saturation_mouseup, this)
          );
      },
      __saturation_mousemove: function (e) {
        var t = this.$saturation.offset(),
          i = e.pageX - t.left,
          s = e.pageY - t.top;
        return (
          e.preventDefault(),
          e.stopPropagation(),
          (e.cancelBubble = !0),
          (e.returnValue = !1),
          (this.hsv.s = Math.max(0, Math.min(i / this.saturation_width, 1))),
          (this.hsv.v = Math.max(
            0,
            Math.min(1 - s / this.saturation_height, 1)
          )),
          this.update_saturation(),
          !1
        );
      },
      __saturation_mouseup: function () {
        this.$saturation_indicator.removeClass("dragging"),
          e("body").off(".pickersaturation");
      },
      __color_text_keyup: function (t) {
        var i = e(t.currentTarget)
          .val()
          .replace(/[^0-9a-f]/gi, "");
        13 !== t.which ||
          (3 !== i.length && 6 !== i.length) ||
          ((this.hsv = Tumblr.ColorUtilities.hex_to_hsv(i)),
          this.update_hue(),
          this.update_saturation(!1));
      },
      __paste: function (e) {
        e.preventDefault(), e.stopPropagation();
        var t = !1;
        if (
          (window.clipboardData && window.clipboardData.getData
            ? (t = window.clipboardData.getData("Text"))
            : e.originalEvent.clipboardData &&
              e.originalEvent.clipboardData.getData &&
              (t = e.originalEvent.clipboardData.getData("text/plain")),
          t)
        ) {
          t = String(t).replace(/[^0-9a-f]/gi, "");
          var i = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(t);
          i &&
            ((this.hsv = Tumblr.ColorUtilities.hex_to_hsv(t)),
            this.update_hue(),
            this.update_saturation(!1));
        }
        return !1;
      },
      initialize: function (i) {
        (this.options = t.extend({}, this.defaults, i)),
          (this.current_color = t.isObject(this.options.color)
            ? this.options.color
            : Tumblr.ColorUtilities.hex_to_rgb(this.options.color)),
          (this.hsv = Tumblr.ColorUtilities.rgb_to_hsv.apply(
            this,
            t.toArray(this.current_color)
          )),
          (this.current_hex = !1),
          (this.hue_width = 0),
          (this.saturation_height = 0),
          (this.saturation_width = 0),
          (this.$hue = e()),
          (this.$hue_indicator = e()),
          (this.$saturation = e()),
          (this.$color = e()),
          (this.$color_text = e());
      },
      render: function () {
        return (
          this.$el.html(
            this.template({
              color: this.current_color,
              hue_position: this.hue_position,
            })
          ),
          (this.$hue = this.$(".hue_selector")),
          (this.$hue_indicator = this.$(".hue_selector .indicator")),
          (this.$saturation = this.$(".saturation_wrapper")),
          (this.$saturation_indicator = this.$(
            ".saturation_wrapper .indicator"
          )),
          (this.$color = this.$(".color_value")),
          (this.$color_text = this.$(".color_value .color_text")),
          this.update_hue(),
          this.update_saturation(!1),
          this
        );
      },
      update_hue: function () {
        var e = t.toArray(Tumblr.ColorUtilities.hsv_to_rgb(this.hsv.h, 1, 1)),
          i = "rgb(" + e.toString() + ")";
        this.$hue_indicator.css({
          "background-color": i,
          left: Math.round((this.hsv.h / 360) * 100) + "%",
        }),
          this.$saturation.css("background-color", i),
          this.update_color_value();
      },
      update_saturation: function (e) {
        (e = e || !0),
          this.$saturation_indicator.css({
            left: Math.round(100 * this.hsv.s) + "%",
            top: Math.round(100 - 100 * this.hsv.v) + "%",
          }),
          e && this.update_color_value();
      },
      update_color_value: function () {
        var e = Tumblr.ColorUtilities.hsv_to_hex.apply(
            this,
            t.toArray(this.hsv)
          ),
          i = this.hsv.s,
          s = this.hsv.v;
        this.$saturation_indicator.css("background-color", e),
          this.$color.css("background-color", e),
          this.$color_text
            .css("color", i < 0.2 && s > 0.8 ? "#444" : "#FFF")
            .val(e),
          this.current_hex &&
            e !== this.current_hex &&
            this.options.on_change(e),
          (this.current_hex = e);
      },
      template: t.template(
        '            <div class="hue_wrapper">                <div class="hue_selector">                    <div class="indicator"></div>                </div>                <div class="color_value">                    <input class="color_text" type="text" maxlength="7" />                </div>            </div>            <div class="saturation_wrapper">                <div class="saturation_inner">                    <div class="indicator"></div>                </div>            </div>        '
      ),
    });
    s.Picker = o;
  })(
    jQuery,
    _,
    Backbone,
    Tumblr.ColorEditor
  ) /*! scripts/color_editor/views/color_editor_view.js */,
  Tumblr.ColorEditor || (Tumblr.ColorEditor = {}),
  (function (e, t, i, s) {
    var o = i.View.extend({
      className: "color_editor",
      colors: {
        red: ["#D95E40", "#FB4C16", "#FF4141", "#F0BFB6", "#FF7373"],
        yellow: ["#F2992E", "#FFD800", "#FFF231", "#DECBA4", "#E7EC6C"],
        green: ["#56BC8A", "#56BF4B", "#5ACDB3", "#9BCACA", "#BFE4A8"],
        blue: ["#529ECC", "#5AC9E1", "#5289DB", "#394ACB", "#6154C4"],
        purple: ["#A77DC2", "#B09BD5", "#D969C3", "#E1B7D2", "#FE3B80"],
        grayscale: [
          "#FFFFFF",
          "#F6F6F6",
          "#EEEEEE",
          "#CCCCCC",
          "#888888",
          "#666666",
          "#444444",
          "#222222",
          "#000000",
        ],
      },
      defaults: { color: "#444444", debounce: 30, on_change: e.noop },
      events: {
        "click .palette_selector": "__palette_selector_click",
        "click .picker_selector": "__picker_selector_click",
      },
      __palette_selector_click: function (t) {
        t.preventDefault();
        var i = e(t.currentTarget);
        i.hasClass("selected") ||
          (this.$(".color_selectors .selected").removeClass("selected"),
          i.addClass("selected"),
          i.hasClass("custom")
            ? this.render_custom_palette()
            : this.render_palette(i.data("color")));
      },
      __picker_selector_click: function (t) {
        t.preventDefault();
        var i = e(t.currentTarget);
        i.hasClass("selected") ||
          (this.$(".color_selectors .selected").removeClass("selected"),
          i.addClass("selected"),
          this.render_picker());
      },
      __custom_palette_change: function (e) {
        (this.custom_palette = e),
          this.$custom_palette_selector.html(
            this.custom_palette_template({ colors: e[0].slice(0, 3) })
          ),
          this.$el.addClass("has_custom_palette"),
          this.is_custom_palette_open && this.render_custom_palette();
      },
      __color_change: function (e) {
        t.isObject(e)
          ? (this.current_color = Tumblr.ColorUtilities.rgb_to_hex(
              e.r,
              e.g,
              e.b
            ))
          : (this.current_color = e),
          this.$picker_selector.css("border-color", this.current_color),
          this.options.on_change(this.current_color);
      },
      initialize: function (i) {
        (this.options = t.extend({}, this.defaults, i)),
          (this.current_color = this.options.color),
          (this.current_color_palette = !1),
          (this.current_color_palette_page = 0),
          (this.current_view = null),
          (this.color_palette = null),
          (this.custom_palette = null),
          (this.is_custom_palette_open = !1),
          (this.$color_view = e()),
          (this.$custom_palette_selector = e()),
          (this.$picker_selector = e()),
          Tumblr.Events &&
            Tumblr.Flags.bool("indash_header_image_colors") &&
            this.listenTo(
              Tumblr.Events,
              "coloreditor:custompalette",
              this.__custom_palette_change
            ),
          this.generate_colors();
      },
      render: function () {
        return (
          this.$el.html(this.template({ colors: this.colors })),
          (this.$color_view = this.$(".color_view")),
          (this.$custom_palette_selector = this.$(".palette_selector.custom")),
          (this.$picker_selector = this.$(".picker_selector").css(
            "border-color",
            this.current_color
          )),
          this.$(".color_selectors .selected").removeClass("selected"),
          this.current_color_palette
            ? (this.$(
                '.palette_selector[data-color="' +
                  this.current_color_palette +
                  '"]'
              ).addClass("selected"),
              this.render_palette(
                this.current_color_palette,
                this.current_color_palette_page
              ))
            : (this.$(".picker_selector").addClass("selected"),
              this.render_picker()),
          this
        );
      },
      render_palette: function (e, i) {
        this.remove_current_view(),
          (this.current_view = new s.Palette({
            colors: this.color_palette[e],
            current_color: this.current_color,
            current_page: i || 0,
            on_change: t.bind(this.__color_change, this),
          })),
          this.$color_view.html(this.current_view.render().el);
      },
      render_custom_palette: function () {
        this.custom_palette &&
          (this.remove_current_view(),
          (this.current_view = new s.Palette({
            colors: this.custom_palette,
            current_color: this.current_color,
            current_page: 0,
            on_change: t.bind(this.__color_change, this),
          })),
          this.$color_view.html(this.current_view.render().el),
          (this.is_custom_palette_open = !0));
      },
      render_picker: function () {
        this.remove_current_view(),
          (this.current_view = new s.Picker({
            color: Tumblr.ColorUtilities.hex_to_rgb(this.current_color),
            debounce: this.options.debounce,
            on_change: t.bind(this.__color_change, this),
          })),
          this.$color_view.html(this.current_view.render().el);
      },
      remove_current_view: function () {
        this.current_view &&
          (this.current_view.remove(), (this.current_view = null)),
          (this.is_custom_palette_open = !1);
      },
      generate_colors: function () {
        var e = {};
        t.each(
          this.colors,
          function (t, i) {
            if (((e[i] = []), "grayscale" === i))
              t.indexOf(this.current_color) > -1 &&
                ((this.current_color_palette = i),
                (this.current_color_palette_page = 0)),
                e[i].push(t);
            else
              for (var s = 0, o = t.length; s < o; s++) {
                var n = this.get_color_variations(t[s]);
                n.indexOf(this.current_color) > -1 &&
                  ((this.current_color_palette = i),
                  (this.current_color_palette_page = s)),
                  e[i].push(n);
              }
          },
          this
        ),
          (this.color_palette = e);
      },
      get_color_variations: function (e) {
        for (
          var t = [], i = (Tumblr.ColorUtilities.hex_to_hsv(e), 0.2), s = 4;
          s > 0;
          s--
        ) {
          var o = i * s;
          t.push(Tumblr.ColorUtilities.hex_brightness(e, o));
        }
        t.push(e);
        for (var s = 1; s <= 4; s++) {
          var o = -(i * s);
          t.push(Tumblr.ColorUtilities.hex_brightness(e, o));
        }
        return t;
      },
      template: t.template(
        '            <div class="color_selectors">                <a class="palette_selector" data-color="red" style="background-color:<%= colors.red[0] %>" />                <a class="palette_selector" data-color="yellow" style="background-color:<%= colors.yellow[0] %>" />                <a class="palette_selector" data-color="green" style="background-color:<%= colors.green[0] %>" />                <a class="palette_selector" data-color="blue" style="background-color:<%= colors.blue[0] %>" />                <a class="palette_selector" data-color="purple" style="background-color:<%= colors.purple[0] %>" />                <a class="palette_selector grayscale" data-color="grayscale" style="background-color:#444" />                <a class="palette_selector custom" />                <a class="picker_selector" />            </div>            <div class="color_view"></div>        '
      ),
      custom_palette_template: t.template(
        '            <% _.each(colors, function(color) { %>                <span class="custom_color" style="background-color:<%- color %>"></span>            <% }) %>        '
      ),
    });
    s.Editor = o;
  })(jQuery, _, Backbone, Tumblr.ColorEditor) /*! scripts/font_picker.js */,
  (function (e, t, i, s) {
    var o = i.View.extend({
      className: "font_picker",
      defaults: {
        fonts: {},
        current_font: "",
        current_font_weight: "normal",
        on_show: e.noop,
        on_hide: e.noop,
        on_change: e.noop,
      },
      events: {
        "mouseover .font": "__font_mouseover",
        "click .font": "__font_click",
        "click .font_picker_glass": "__glass_click",
      },
      __font_mouseover: function (t) {
        e(t.currentTarget);
      },
      __font_click: function (t) {
        this.$(".font.selected").removeClass("selected");
        var i = e(t.currentTarget).addClass("selected");
        (this.current_font = i.attr("data-value")),
          this.on_change(this.current_font),
          this.hide();
      },
      __glass_click: function (e) {
        e.preventDefault(), this.hide();
      },
      initialize: function (e) {
        (this.options = t.extend({}, this.defaults, e)),
          (this.fonts = this.options.fonts),
          (this.current_font = this.options.current_font),
          (this.is_bold = "bold" === this.options.current_font_weight),
          (this.on_show = this.options.on_show),
          (this.on_hide = this.options.on_hide),
          (this.on_change = this.options.on_change);
      },
      render: function () {
        return (
          this.$el.html(
            this.template({
              fonts: this.fonts,
              current_font: this.current_font,
            })
          ),
          this.toggle_font_weight(this.is_bold),
          this
        );
      },
      show: function () {
        this.$el.show(), this.on_show();
      },
      hide: function () {
        this.$el.hide(), this.on_hide();
      },
      scroll_to_current_font: function (e) {
        var t = this.$(".font_options"),
          i = t.children(".selected").first();
        i.length &&
          t.scrollTop(
            e +
              t.scrollTop() +
              i.position().top +
              0.5 * (i.outerHeight() - t.innerHeight())
          );
      },
      toggle_font_weight: function (e) {
        (this.is_bold = !!e), this.$el.toggleClass("bold", this.is_bold);
      },
      template: t.template(
        '            <ul class="font_options">                <% _.each(fonts, function(font, font_name) { %>                    <% if(font.hidden) return; %>                    <% if(font_name === current_font) { %>                        <li class="font selected" data-value="<%- font_name %>" style="font-family:<%- font.family %>;"><i class="icon icon_checkmark" /><%- font.display_name %></li>                    <% } else { %>                        <li class="font" data-value="<%- font_name %>" style="font-family:<%- font.family %>;"><i class="icon icon_checkmark" /><%- font.display_name %></li>                    <% } %>                <% }) %>            </ul>            <div class="font_picker_glass"></div>        '
      ),
    });
    s.FontPicker = o;
  })(jQuery, _, Backbone, Tumblr) /*! scripts/image_picker.js */,
  (function (e, t, i, s) {
    "function" != typeof __ &&
      (__ = function (e) {
        return e;
      });
    var o = i.View.extend({
      className: "image_picker",
      defaults: {
        data_map: {},
        upload_text: "Choose a photo",
        reset_text: "Reset",
        remove_text: "Remove",
        generic_error: "Error uploading photo",
        data_url: "",
        current_url: "",
        default_url: "",
        uploading: !1,
        on_change: e.noop,
      },
      events: {
        "click .menu_option_upload": "upload_click",
        "click .menu_option[data-set-url]": "__option_click",
      },
      upload_click: function (e) {
        return this.xhr
          ? this.cancel()
          : void (
              (e && this.get_fileinput().is(e.target)) ||
              this.$fileinput.trigger("click")
            );
      },
      __option_click: function (t) {
        var i = e(t.currentTarget).data("set-url");
        (this.current_url = i),
          (this.data_url = ""),
          this.on_change(this.current_url, this.data_url),
          this.render();
      },
      initialize: function (e) {
        (this.options = t.extend({}, this.defaults, e)),
          (this.default_url = this.options.default_url),
          (this.current_url = this.options.current_url),
          (this.on_change = this.options.on_change),
          window.FileReader
            ? ((this.file_reader = new FileReader()),
              (this.file_reader.onload = t.bind(this.__file_read, this)))
            : (this.file_reader = null);
      },
      read_file: function (e) {
        this.file_reader &&
          ((this.data_url = ""), this.file_reader.readAsDataURL(e));
      },
      __file_read: function (e) {
        this.data_url = e.target.result;
      },
      __file_add: function (e, t) {
        (this.xhr = t.submit()), this.read_file(t.files[0]);
      },
      __file_send: function (e, t) {
        (t.withFormKey = !0),
          this.$choose_a_photo.addClass("menu_option_loading"),
          this.$loader.addClass("animate"),
          this.trigger("imagepicker:loading");
      },
      __file_done: function (e, i) {
        if (
          ((this.xhr = null),
          t.isArray(i.result.response) && i.result.response.length > 0)
        ) {
          var s = i.result.response[0];
          t.result(s, "url")
            ? ((this.current_url = s.url),
              (this.options.data_map[this.current_url] = this.data_url),
              this.on_change(this.current_url),
              this.render(),
              this.trigger("imagepicker:done", this.current_url))
            : (t.result(s, "error")
                ? Tumblr.Dialog.alert(s.error)
                : Tumblr.Dialog.alert(this.options.generic_error),
              this.$choose_a_photo.removeClass("menu_option_loading"),
              this.$loader.removeClass("animate"),
              this.trigger("imagepicker:done", null));
        }
      },
      __file_fail: function (e, t) {
        (this.xhr = null),
          this.$choose_a_photo.removeClass("menu_option_loading"),
          this.$loader.removeClass("animate"),
          this.trigger("imagepicker:done", null);
      },
      initialize_dropzone: function () {
        this.get_fileinput().fileupload({
          url: "/svc/post/upload_photo?source=image_picker",
          maxNumberOfFiles: 1,
          pasteZone: null,
          dropZone: this.options.dropzone || null,
          fileInput: this.$fileinput,
          add: t.bind(this.__file_add, this),
          done: t.bind(this.__file_done, this),
          send: t.bind(this.__file_send, this),
          fail: t.bind(this.__file_fail, this),
        });
      },
      cancel: function () {
        if (this.xhr)
          try {
            this.xhr.abort();
          } catch (e) {}
      },
      remove: function () {
        return this.cancel(), i.View.prototype.remove.call(this);
      },
      render: function () {
        return (
          this.$el.html(
            this.template({
              upload_text: this.options.upload_text,
              reset_text: this.options.reset_text,
              remove_text: this.options.remove_text,
              uploading: !!this.xhr,
              default_url: this.default_url,
              current_url: this.current_url,
            })
          ),
          this.cache_selectors(),
          this.initialize_dropzone(),
          this
        );
      },
      get_fileinput: function () {
        return (this.$fileinput = this.$('input[type="file"]'));
      },
      cache_selectors: function () {
        this.get_fileinput(),
          (this.$choose_a_photo = this.$(".menu_option_upload")),
          (this.$loader = this.$(".Knight-Rider-loader"));
      },
      template: t.template(
        '<ul class="menu_options"><li class="menu_option menu_option_upload<% if (uploading) { %> menu_option_loading<% } %>"><span class="menu_option_text"><%- upload_text %></span><div class="Knight-Rider-loader<% if (uploading) { %> animate<% } %>"><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div></div><input type="file" name="photo"/></li><% if (default_url !== false && current_url !== default_url) { %><li class="menu_option" data-set-url="<%- default_url %>"><%- default_url === \'\' ? remove_text : reset_text %></li><% } %></ul>'
      ),
    });
    s.ImagePicker = o;
  })(jQuery, _, Backbone, Tumblr) /*! scripts/tumblr/upload.js */,
  (function (e, t) {
    var i =
        window.__ ||
        function (e) {
          return e;
        },
      s = function (t, i) {
        return this instanceof s
          ? (i || (i = {}),
            (this.$el = e(t).first()),
            (this.el = this.$el.get(0)),
            (this.logging = !1),
            i.id || (i.id = this.$el.attr("id") || this.$el.attr("name") || ""),
            i.url || (i.url = ""),
            i.default_url || (i.default_url = ""),
            i.accept || (i.accept = !1),
            i.multiple || (i.multiple = !1),
            this.initialize(i),
            this)
          : new s(t, i);
      };
    (s.upload_icon = function (e, t) {
      return (
        (t = _.extend(
          {
            template:
              '<input type="hidden" name="<%- id %>" value="<%- url %>"/><div class="file_upload file_upload_icon"><div class="icon"></div><div class="not_progress"></div><div class="progress"></div></div>',
            initialize: function (e) {
              (this.$input = this.$el.find('input[type="hidden"]')),
                (this.$fileinput_container =
                  this.$el.find(".file_upload_icon")),
                (this.$icon = this.$el.find(".icon")),
                (this.$not_progress = this.$el.find(".not_progress")),
                (this.$progress = this.$el.find(".progress"));
            },
            reset: function () {
              this.$fileinput_container.removeClass("loading");
            },
            progress: function (e, t, i) {
              var s = t ? e / t : 0;
              s = Math.max(0, Math.min(s, 1));
              var o = Math.round(100 * s),
                n = 100 - o;
              this.$not_progress.width(n + "%"),
                this.$progress.width(o + "%"),
                s && this.$fileinput_container.addClass("loading");
            },
            success: function (e, t, i) {
              this.reset(), this.$input.val(e).trigger("change");
            },
            error: function (e, t, s) {
              (e.length && e[0]) ||
                (e = [
                  i(
                    "Something strange happened while saving that. Please try again in a bit?"
                  ),
                ]),
                1 === e.length
                  ? Tumblr.Dialog.alert(e[0])
                  : Tumblr.Dialog.alert(
                      "<ul><li>" + e.join("</li><li>") + "</li></ul>"
                    ),
                this.reset();
            },
            fail: function (e) {
              Tumblr.Dialog.alert(
                i("We encountered an unexpected error. Please try again.")
              ),
                this.reset();
            },
          },
          t
        )),
        new s(e, t)
      );
    }),
      (s.upload_button = function (e, t) {
        return (
          (t = _.extend(
            {
              button_class: "gray light",
              button_label: i("Upload"),
              template:
                '<input type="hidden" name="<%- id %>" value="<%- url %>"/><div class="file_upload file_upload_button button <%- button_class %>"><span class="button_label"><%- button_label %></span><span class="button_loader"></span></div>',
              initialize: function (e) {
                (this.$button = this.$el.find(".button")),
                  (this.$label = this.$button.children(".button_label")),
                  (this.$loader = this.$button.children(".button_loader")),
                  (this.$input = this.$el.find('input[type="hidden"]')),
                  (this.$fileinput_container = this.$button);
              },
              reset: function () {
                this.$fileinput_container.removeClass("loading"),
                  this.loader && this.loader.stop();
              },
              send: function (e, t) {
                this.loader ||
                  (this.loader = Tumblr.Loader({
                    color: "#ffffff",
                    top: "0",
                    left: "0",
                    position: "absolute",
                    className: "",
                  })),
                  this.$fileinput_container.addClass("loading"),
                  this.loader.start(this.$loader);
              },
              success: function (e, t, i) {
                this.$input.val(e).trigger("change"),
                  _.delay(
                    _.bind(function () {
                      this.reset();
                    }, this),
                    500
                  );
              },
              error: function (e, t, s) {
                (e.length && e[0]) ||
                  (e = [
                    i(
                      "Something strange happened while saving that. Please try again in a bit?"
                    ),
                  ]),
                  1 === e.length
                    ? Tumblr.Dialog.alert(e[0])
                    : Tumblr.Dialog.alert(
                        "<ul><li>" + e.join("</li><li>") + "</li></ul>"
                      ),
                  this.reset();
              },
              fail: function (e) {
                Tumblr.Dialog.alert(
                  i("We encountered an unexpected error. Please try again.")
                ),
                  this.reset();
              },
            },
            t
          )),
          new s(e, t)
        );
      }),
      (s.upload_dropzone = function (e, t) {
        return (
          (t = _.extend(
            {
              multiple: !0,
              button_class: "",
              dropzone_label: i("Add files"),
              dropzone_info: "",
              template:
                '<div class="file_upload file_upload_dropzone dropzone <%- button_class %>"><div class="dropzone_box"><div class="dropzone_label"><div><%= dropzone_label %></div><% if (dropzone_info) { %><div class="small"><%= dropzone_info %></div><% } %></div></div><div class="Knight-Rider-loader centered"><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div></div></div>',
              initialize: function (e) {
                (this.$input = this.$el.find('input[type="hidden"]')),
                  (this.$fileinput_container = this.$el.find(".file_upload")),
                  (this.$loader = this.$el.find(".Knight-Rider-loader"));
              },
              reset: function () {
                this.$fileinput_container.removeClass("loading"),
                  this.$loader.removeClass("animate");
              },
              send: function (e, t) {
                this.$fileinput_container.addClass("loading"),
                  this.$loader.addClass("animate");
              },
              success: function (e, t, i) {
                this.$input.val(e).trigger("change"),
                  _.delay(
                    _.bind(function () {
                      this.reset();
                    }, this),
                    500
                  );
              },
              error: function (e, t, s) {
                (e.length && e[0]) ||
                  (e = [
                    i(
                      "Something strange happened while saving that. Please try again in a bit?"
                    ),
                  ]),
                  1 === e.length
                    ? Tumblr.Dialog.alert(e[0])
                    : Tumblr.Dialog.alert(
                        "<ul><li>" + e.join("</li><li>") + "</li></ul>"
                      ),
                  this.reset();
              },
              fail: function (e) {
                Tumblr.Dialog.alert(
                  i("We encountered an unexpected error. Please try again.")
                ),
                  this.reset();
              },
            },
            t
          )),
          new s(e, t)
        );
      }),
      (s.prototype = {
        log: function () {
          return (
            !!window.console &&
            ("function" == typeof window.console.debug
              ? window.console.debug.apply(window.console, arguments)
              : "function" == typeof window.console.log &&
                window.console.log.apply(window.console, arguments))
          );
        },
        initialize: function (e) {
          return (
            (this.options = e),
            (this.id = e.id),
            (this.url = e.url),
            (this.default_url = e.default_url),
            "string" == typeof e.template &&
              (e.template = _.template(e.template)),
            "function" == typeof e.template &&
              (this.options.prepend
                ? this.$el.prepend(e.template(_.omit(e, "template")))
                : this.$el.append(e.template(_.omit(e, "template")))),
            this.logging && this.log(this.id, "initialize()"),
            "function" == typeof this.options.initialize &&
              this.options.initialize.call(this, e),
            this.fileupload_init(),
            this
          );
        },
        progress: function (e, t, i) {
          return (
            this.logging &&
              this.log(
                this.id,
                "progress()",
                e,
                t,
                _.pluck(i, "name").join(",")
              ),
            "function" == typeof this.options.progress &&
              this.options.progress.call(this, e, t, i),
            this
          );
        },
        reset: function () {
          return (
            this.logging && this.log(this.id, "reset()"),
            "function" == typeof this.options.reset &&
              this.options.reset.call(this),
            this
          );
        },
        validate: function (e) {
          return (
            (this.errors = []),
            e.length < 1
              ? this.errors.push("Please select a file to upload.")
              : e.length > 1 &&
                this.errors.push("Please select only one file to upload."),
            _.isFunction(this.options.validate) &&
              this.options.validate.call(this, e, this.errors),
            this.logging && this.log(this.id, "validate()", this.errors),
            !this.errors.length
          );
        },
        fileupload_data: function () {
          return this.$el.data("blueimpFileupload");
        },
        fileupload_destroy: function () {
          return (
            this.fileupload_data() &&
              (this.logging && this.log(this.id, "fileupload_destroy()"),
              this.$el.fileupload("destroy")),
            this
          );
        },
        fileupload_init: function () {
          return (
            this.fileupload_destroy(),
            (this.$fileinput_container && this.$fileinput_container.length) ||
              (this.$fileinput_container = this.$el),
            this.$fileinput && this.$fileinput.remove(),
            (this.$fileinput = e('<input type="file" name="file"/>')),
            this.options.accept &&
              this.$fileinput.prop("accept", this.options.accept),
            this.options.multiple && this.$fileinput.prop("multiple", !0),
            this.$fileinput_container.append(this.$fileinput),
            (this.fileupload_options = _.extend(
              {
                singleFileUploads: !0,
                limitConcurrentUploads: this.options.multiple ? void 0 : 1,
                sequentialUploads: !!this.options.multiple,
                autoUpload: !0,
                fileInput: this.$fileinput,
                formData: [],
                dataType: "json",
                url: "/svc/upload/static_file",
                dropZone: null,
                pasteZone: null,
                withFormKey: !0,
              },
              this.options.fileupload_options
            )),
            (this.fileupload_options.change = _.bind(function (e, t) {
              this.logging && this.log(this.id, "fileupload.change()"),
                (this.$fileinput = this.$el.find('input[type="file"]'));
            }, this)),
            (this.fileupload_options.add = _.bind(function (e, t) {
              return "function" == typeof this.options.add
                ? this.options.add(t)
                : (this.logging && this.log(this.id, "fileupload.add()"),
                  void t.submit());
            }, this)),
            (this.fileupload_options.submit = _.bind(function (e, t) {
              return this.validate(t.files)
                ? void (
                    this.logging &&
                    this.log(this.id, "fileupload.submit()", "ok")
                  )
                : (this.logging &&
                    this.log(this.id, "fileupload.submit()", "error"),
                  "function" == typeof this.options.error &&
                    this.options.error.call(this, this.errors),
                  (this.errors = !1),
                  !1);
            }, this)),
            (this.fileupload_options.send = _.bind(function (e, t) {
              this.logging &&
                this.log(
                  this.id,
                  "fileupload.send()",
                  _.pluck(t.files, "name").join(","),
                  _.pluck(t.originalFiles, "name").join(",")
                ),
                (t.withFormKey = !0),
                "function" == typeof this.options.send &&
                  this.options.send.call(this, t.files, t.originalFiles),
                this.progress(0);
            }, this)),
            (this.fileupload_options.progress = _.bind(function (e, t) {
              this.logging &&
                this.log(
                  this.id,
                  "fileupload.progress()",
                  _.pluck(t.files, "name").join(",")
                ),
                this.progress(t.loaded, t.total, t.files);
            }, this)),
            (this.fileupload_options.done = _.bind(function (e, t) {
              this.logging &&
                this.log(
                  this.id,
                  "fileupload.done()",
                  _.pluck(t.files, "name").join(",")
                ),
                this.progress(t.loaded, t.total, t.files);
              var i = t.result.response;
              i.success
                ? "function" == typeof this.options.success &&
                  this.options.success.call(this, i.url, i, t.files)
                : "function" == typeof this.options.error &&
                  this.options.error.call(this, [i.message], i, t.files);
            }, this)),
            (this.fileupload_options.fail = _.bind(function (e, t) {
              this.logging && this.log(this.id, "fileupload.fail()"),
                this.reset(),
                "abort" !== t.textStatus &&
                  "function" == typeof this.options.fail &&
                  this.options.fail.call(this, t);
            }, this)),
            (this.fileupload_options.always = _.bind(function (e, t) {
              this.logging && this.log(this.id, "fileupload.always()"),
                "function" == typeof this.options.always &&
                  this.options.always.call(this, t);
            }, this)),
            this.$el.fileupload(this.fileupload_options),
            this.reset(),
            this
          );
        },
      }),
      (t.Upload = s);
  })(jQuery, Tumblr || {}) /*! scripts/tumblr/utils/multiline_ellipsis.js */,
  jQuery.fn.extend({
    multiline_ellipsis: function () {
      for (
        var e = "multiline_ellipsis_display",
          t = this.wrapInner(function () {
            return 1 === jQuery("." + e, this).length
              ? ""
              : '<div class="' +
                  e +
                  '" data-original_text="' +
                  jQuery(this).text() +
                  '"><span></span></div>';
          }),
          i = t.children(":first"),
          s = i.data("original_text") || "",
          o = i.children(":first"),
          n = i.height(),
          a = 1 === o.length ? s.length : -1;
        a > 0 && o.height() > n;

      )
        o.text(s.substring(0, a) + "..."), (a = o.text().lastIndexOf(" "));
      return this;
    },
  }) /*! scripts/customize_v3/customize.js */,
  (function (e, t, i, s, o, n) {
    function a(e) {
      return parseInt(e, 10) || 0;
    }
    function r(e, i) {
      if (e.get("name") === i.get("demo_tumblelog_name")) return !0;
      var s = t.map(e.get("purchased_theme_ids"), a),
        o = t.map(TumblrData.default_theme_ids, a),
        n = a(e.get("theme_id")),
        r = a(i.get("id")),
        l = a(i.get("premium"));
      return !n || !l || !(n === r || !t.contains(o, n)) || t.contains(s, n);
    }
    function l(e) {
      e.set(
        t.transform(
          e.keys(),
          function (e, t) {
            (t.match(/^font:/i) || "TitleFont" === t || "BodyFont" === t) &&
              (e[t] = "Comic Sans MS");
          },
          {}
        )
      );
    }
    var h =
        "hey tumblr staff, i honestly want to use comic sans for all of my fonts",
      _ =
        (t.template(
          '<!doctype html>        <html>            <head>                <title>Customize</title>                <style type="text/css">                    body {                        background: #fafafa;                        color: #666666;                        font-family: "Helvetica Neue", Arial, sans-serif;                        font-size: 14px;                        line-height: 18px;                        text-align: center;                        -webkit-font-smoothing: antialiased;                    }                    a {                        color: #444444;                        text-decoration: none;                        font-weight: bold;                    }                    .vertical_center {                        position: absolute;                        top: 50%;                        left: 0;                        right: 0;                        height: 62px;                        margin-top: -31px;                    }                    .redirect_container {                        display: inline-block;                        text-align: left;                    }                    .redirect_from {                        font-size: 14px;                        color: #666666;                        padding: 5px;                    }                    .redirect_to {                        font-size: 12px;                        font-weight: bold;                        color: #444444;                        background-color: #ededed;                        border-radius: 2px;                        padding: 5px;                        margin-top: 5px;                    }                    .redirect_to a {                        font-size: 14px;                    }                    .link_icon {                        margin: 0 auto;                        width: 60px;                        height: 60px;                        background: url(\'' +
            (TumblrData.sprite || "/images/customize_sprite.png") +
            "') -340px 0 no-repeat;                        opacity: 0.14;                    }                    @media only screen and (-webkit-min-device-pixel-ratio: 2 ), only screen and ( -moz-min-device-pixel-ratio: 2), only screen and ( -o-min-device-pixel-ratio: 2/1 ), only screen and ( min-device-pixel-ratio: 2 ), only screen and ( min-resolution: 192dpi ), only screen and ( min-resolution: 2dppx ) {                        .link_icon {                            background-image: url('" +
            (TumblrData.sprite_2x || "/images/customize_sprite_2x.png") +
            '\');                            background-size: 500px 210px;                        }                    }                </style>            </head>            <body>                <div class="vertical_center">                    <div class="redirect_container">                        <% if (redirect_from) { %>                            <div class="redirect_from"><%= redirect_from %></div>                            <% if (redirect_to) { %>                                <div class="redirect_to">&#8627; <a href="<%= redirect_to %>" target="_blank"><%= redirect_to %></a></div>                            <% } %>                        <% } else { %>                            <div class="link_icon"></div>                        <% } %>                    </div>                </div>            </body>        </html>'
        ),
        t.last(TumblrData.default_theme_ids)),
      c = {
        blog_name: "demo",
        can_edit: !1,
        unsaved_changes: !1,
        beforeunload_prompt: !0,
        initialize: function (o) {
          (o = t.extend({ blog: {}, theme: {}, editor_type: "rich" }, o)),
            (this.blog_name =
              o.tumblelog_name || t.last(location.href.split("/"))),
            (o.blog.id = this.blog_name),
            (this.image_data_map = o.image_data_map || {}),
            (this.demo_content = new this.DemoContent(
              t.extend({ id: o.demo_tumblelog_name }, o.demo_content)
            )),
            (this.demo_page = new this.DemoContent(
              t.extend({ id: o.demo_tumblelog_name }, o.demo_page)
            )),
            (this.blog = new this.Blog(o.blog, { pages: o.pages })),
            (this.theme = new this.Theme(o.theme)),
            (this.global_params = new this.AppearanceParams(
              o.blog.global_params,
              {
                defaults: { header_image: o.default_header_image || "" },
                supported_params: this.AppearanceParams.from_html(
                  this.theme.get("theme")
                ),
                allow_npf_patch: o.blog.global_params.hasOwnProperty(
                  "show_new_post_styles"
                ),
              }
            )),
            (this.theme_params = new this.ThemeParams(
              this.determine_theme_params(
                t.keys(this.theme.get("default_params"))
              )
            )),
            (this.theme_preview = new this.ThemePreview(
              t.extend(
                {
                  __theme_html:
                    s._init.custom_html || this.theme.unescaped_theme(),
                },
                this.determine_content_map(!0)
              )
            )),
            (this.themes = new this.Themes([], {
              categories: o.theme_categories,
            })),
            (this.customize_prefs = new i.Model({
              use_own_posts:
                o.can_use_own_posts && "0" !== s.Cookie.get("use_own_posts"),
            })),
            (this.demo_page_content_keys = t.keys(this.demo_page.toJSON())),
            this.demo_content.on(
              "change",
              this.handler.demo_content_change,
              this
            ),
            this.blog.on("change", this.handler.blog_change, this),
            this.global_params.on(
              "change",
              this.handler.global_params_change,
              this
            ),
            this.theme.on(
              "change:demo_tumblelog_name",
              this.demo_theme_change,
              this
            ),
            this.theme.on(
              "change:id change:theme",
              this.update_blog_theme,
              this
            ),
            this.theme.on(
              "change:theme",
              this.determine_params_from_theme,
              this
            ),
            this.theme.on("change:theme", this.update_theme_preview, this),
            this.theme.on("change", this.handler.theme_change, this),
            this.theme_params.on(
              "change",
              this.handler.theme_params_change,
              this
            ),
            this.blog.pages.on("add", this.handler.blog_pages_change, this),
            this.blog.pages.on("remove", this.handler.blog_pages_change, this),
            this.blog.pages.on("change", this.handler.blog_pages_change, this),
            this.blog.pages.on("reset", this.handler.blog_pages_reset, this),
            (this.panel = {
              customize: new this.CustomizeView({ el: "#customize_panel" }),
              advanced_options: new this.AdvancedOptionsView({
                el: "#advanced_options_panel",
              }),
              edit_html: new this.EditHtmlView({
                el: "#edit_html_panel",
                theme_author_prompt: this.blog.get("theme_author_prompt"),
                custom_html: s._init.custom_html,
              }),
              edit_page: new this.EditPageView({
                el: "#edit_page_panel",
                editor_type: o.editor_type,
              }),
              theme_list: new this.ThemeListView({
                el: "#theme_list_panel",
                theme_id: this.theme.id,
                preview_theme_id: s._init.preview_theme_id,
              }),
            }),
            (this.blog_preview = new this.BlogPreviewView({
              el: "#preview_container",
            })),
            (this.file_browser = new this.FileBrowser({
              el: "#upload_static_file_container",
            })),
            (this.jqxhr_blog = !1),
            (this.jqxhr_page = !1),
            (this.$el = e(".l-container")),
            (this.$panel_container = e("#customize")),
            (this.$preview_container = e("#preview_container")),
            (this.$popover_container = e("#popover_container")),
            (this.$popover_container_content = e("#popover_container_content")),
            (this.$pay_widget_panel = e("#pay_widget_container .panel_width")),
            this.panel.customize.on("edit_page", this.edit_page, this),
            this.panel.customize.on("delete_page", this.delete_page, this),
            this.panel.customize.on("sort_pages", this.sort_pages, this),
            this.panel.edit_html.on(
              "dismiss_theme_author_prompt",
              this.dismiss_theme_author_prompt,
              this
            ),
            this.panel.edit_page.on("save_page", this.save_page, this),
            this.panel.edit_page.on("page_preview", this.page_preview, this),
            this.panel.theme_list.on(
              "reset_theme_params",
              this.reset_theme_params,
              this
            ),
            this.panel.theme_list.on("reset_preview", this.reset_preview, this),
            this.panel.theme_list.on(
              "loading_preview",
              this.loading_preview,
              this
            ),
            t.each(
              this.panel,
              function (e) {
                e.on("exit", this.exit, this),
                  e.on("switch_panel", this.switch_panel, this),
                  e.on("popover_scroll", this.update_popover_scroll, this),
                  e.on(
                    "enable_preview_render",
                    this.enable_preview_render,
                    this
                  ),
                  e.on("refresh_preview", this.force_preview_refresh, this),
                  e.on("save_blog", this.save_blog, this),
                  e.on("buy_theme", this.buy_theme, this),
                  e.on("set_panel_size", this.set_panel_size, this),
                  e.on("upload_static_file", this.toggle_file_browser, this),
                  e.render();
              },
              this
            ),
            (this.current_panel = this.panel.customize),
            "customize" !== o.start_panel &&
              t.has(c.panel, o.start_panel) &&
              this.switch_panel(o.start_panel),
            this.customize_prefs.get("use_own_posts") &&
            this.demo_content.id !== this.blog.id
              ? this.demo_content.set("id", this.blog.id)
              : (this.demo_content.trigger("change"),
                this.theme_preview.trigger("reset")),
            this.blog_preview.on(
              "preview:load_start",
              this.current_theme_loading_begin,
              this
            ),
            this.blog_preview.on(
              "preview:load_progress",
              this.current_theme_loading_progress,
              this
            ),
            this.blog_preview.on(
              "preview:loaded",
              this.current_theme_loading_complete,
              this
            ),
            this.blog_preview.on(
              "preview:timeout",
              this.current_theme_timeout,
              this
            ),
            this.blog_preview.once(
              "preview:loaded",
              this.first_preview_render,
              this
            ),
            this.current_panel.update_scrollbar_height(),
            (!o.custom_theme_preview ||
              (o.custom_theme_preview.id === this.theme.get("id") &&
                "0" !== o.custom_theme_preview.id)) &&
              this.set_unsaved_changes(!1),
            e(window).on(
              "beforeunload",
              t.bind(function () {
                return this.unsaved_changes && this.beforeunload_prompt
                  ? __("You have unsaved changes.")
                  : void (this.beforeunload_prompt = !0);
              }, this)
            ),
            t.delay(
              t.bind(function () {
                this.hide_loader(!0);
              }, this),
              1e3
            );
        },
        show_loader: function () {
          e("[data-js-customize-loader").removeClass("loaded hidden");
        },
        hide_loader: function () {
          this.$el.removeClass("hidden"),
            this.current_panel.update_scrollbar_height();
          var i = e("[data-js-customize-loader]");
          t.delay(function () {
            i.addClass("loaded"),
              t.delay(function () {
                i.addClass("hidden");
              }, 1e3);
          }, 1500),
            this.current_panel.initial_show_action();
        },
        current_theme_loading_begin: function () {
          this.panel.theme_list.set_loading_progress(0),
            this.panel.theme_list.loading_indicator(!0);
        },
        current_theme_loading_progress: function (e) {
          this.panel.theme_list.set_loading_progress(e, !0);
        },
        current_theme_loading_complete: function () {
          this.panel.edit_html.button_spinner(
            '[data-action="update_preview"]',
            !1
          ),
            this.panel.theme_list.loading_indicator(!1),
            this.preview_render_progress_for_panel(this.current_panel);
        },
        current_theme_timeout: function () {
          this.panel.edit_html.button_spinner(
            '[data-action="update_preview"]',
            !1
          );
        },
        first_preview_render: function () {
          logger.log("First preview load complete!");
        },
        set_unsaved_changes: function (e) {
          (this.unsaved_changes = e),
            this.panel.customize.toggle_save_button(this.unsaved_changes),
            this.panel.advanced_options.toggle_save_button(
              this.unsaved_changes
            );
        },
        generate_avatar_sizes: function (i) {
          return e.when.apply(
            e,
            t.map(
              [16, 24, 30, 40, 48, 64, 96, 128],
              function (e) {
                return this.resize_image_data(i, e, e).done(
                  t.bind(function (t) {
                    this.blog.attributes["PortraitURL-" + e] = t;
                  }, this)
                );
              },
              this
            )
          );
        },
        resize_image_data: function (t, i, s) {
          var o = new Image(),
            n = e.Deferred();
          return (
            (o.onload = function () {
              var e = document.createElement("canvas"),
                t = e.getContext("2d");
              (e.width = i), (e.height = s);
              var a = 0,
                r = 0,
                l = o.naturalWidth,
                h = o.naturalHeight,
                _ = l / h;
              _ > 1
                ? ((a = Math.round(0.5 * (l - h))), (l = h))
                : _ < 1 && ((r = Math.round(0.5 * (h - l))), (h = l)),
                t.drawImage(o, a, r, l, h, 0, 0, i, s),
                n.resolve(e.toDataURL());
            }),
            (o.src = t),
            n
          );
        },
        determine_theme_params: function (e) {
          var i = this.blog.get("custom_params"),
            s = t.extend({}, this.theme.get("default_params"));
          return (
            t.each(i, function (e, i) {
              (t.has(s, i) && t.isObject(e)) || (s[i] = e);
            }),
            e ? t.pick(s, e) : s
          );
        },
        determine_content_map: function (e) {
          return !e &&
            this.current_panel &&
            this.current_panel === this.panel.edit_page
            ? this.determine_page_map()
            : t.extend(
                this.demo_content.toJSON(),
                this.global_params.content_map_exports(),
                this.theme_params.custom_param_exports(
                  this.global_params.special_param_exports()
                ),
                this.blog.content_map_exports()
              );
        },
        determine_page_map: function () {
          return t.extend(
            t.pick(this.demo_content.toJSON(), this.demo_page_content_keys),
            t.pick(
              this.demo_page.toJSON(),
              "block:Posts",
              "block:PermalinkPage",
              "CurrentPage",
              "TotalPages"
            ),
            this.global_params.content_map_exports(),
            this.theme_params.custom_param_exports(
              this.global_params.special_param_exports()
            ),
            this.blog.content_map_exports()
          );
        },
        handler: {
          demo_content_change: function () {
            return this.demo_content.changed.id
              ? (logger.log(
                  "demo_content.id changed! Fetching new demo content..."
                ),
                void this.demo_content.fetch())
              : (logger.debug("Tumblr.Customize: demo_content_change()"),
                void this.theme_preview.set(this.determine_content_map()));
          },
          blog_change: function () {
            if (
              (logger.debug("Tumblr.Customize: blog_change()"),
              this.blog.changed.id &&
                (logger.warn("Blog ID changed! Fetch pages..."),
                (this.blog.pages.blog_id = this.blog.id),
                this.blog.pages.fetch({ reset: !0 })),
              this.blog.changed.description &&
                this.blog.changed.description.toLowerCase() === h &&
                (l(this.theme_params), this.panel.customize.render()),
              this.blog.changed.avatar_url)
            ) {
              var e = this.image_lookup(this.blog.get("avatar_url"));
              if (e)
                return void this.generate_avatar_sizes(e).always(
                  t.bind(function () {
                    this.update_preview_content(!0);
                  }, this)
                );
            }
            this.update_preview_content(!0);
          },
          global_params_change: function () {
            logger.debug("Tumblr.Customize: global_params_change()"),
              this.global_params.changed.header_image &&
                this.global_params.set(
                  {
                    header_bounds: "",
                    header_image_dimens: "",
                    header_image_focused: "",
                  },
                  { silent: !0 }
                ),
              this.blog.set("global_params", this.global_params.toJSON(), {
                silent: !0,
              }),
              this.update_preview_content(!0);
          },
          theme_change: function () {
            logger.debug("Tumblr.Customize: theme_change()"),
              this.current_panel === this.panel.edit_html &&
                this.panel.edit_html.button_spinner(
                  '[data-action="update_preview"]',
                  !0
                );
          },
          theme_params_change: function () {
            logger.debug("Tumblr.Customize: theme_params_change()"),
              this.blog.set(
                "custom_params",
                this.theme_params.custom_param_exports(),
                { silent: !0 }
              ),
              this.update_preview_content(!0);
          },
          blog_pages_change: function () {
            logger.debug("Tumblr.Customize: blog_pages_change()"),
              TumblrData.feature.page_demo_updates &&
                this.demo_content.id === this.blog.id &&
                (logger.debug(
                  "Blog pages changed, fetching updated demo content..."
                ),
                this.demo_content.fetch());
          },
          blog_pages_reset: function () {
            logger.debug("Tumblr.Customize: blog_pages_reset()");
          },
        },
        update_preview_content: function (e) {
          this.theme_preview.set(this.determine_content_map()),
            e && this.set_unsaved_changes(!0);
        },
        demo_theme_change: function () {
          logger.debug("Tumblr.Customize: demo_theme_change()"),
            !this.customize_prefs.get("use_own_posts") &&
              this.theme.changed.demo_tumblelog_name &&
              this.demo_content.set(
                "id",
                this.theme.get("demo_tumblelog_name") || this.DEMO_BLOG_NAME
              );
        },
        update_theme_preview: function () {
          logger.debug("Tumblr.Customize: update_theme_preview()"),
            this.theme_preview.set(
              "__theme_html",
              this.theme.unescaped_theme()
            );
        },
        update_blog_theme: function () {
          logger.debug("Tumblr.Customize: update_blog_theme()"),
            this.blog.set({
              theme_id: this.theme.id,
              custom_theme: this.theme.id > 0 ? "" : this.theme.get("theme"),
            }),
            this.set_unsaved_changes(!0),
            this.panel.edit_html.save_complete(!0);
        },
        determine_params_from_theme: function () {
          logger.debug("Tumblr.Customize: determine_params_from_theme()"),
            this.global_params
              .set_supported_params(
                this.AppearanceParams.from_html(this.theme.get("theme"))
              )
              .trigger("reset"),
            this.theme_params.set_supported_params(
              t.keys(this.theme.get("default_params"))
            ),
            this.theme_params
              .clear({ silent: !0 })
              .set(
                this.determine_theme_params(this.theme_params.supported_params)
              )
              .trigger("reset");
        },
        reset_theme_params: function () {
          logger.warn("Resetting theme params..."),
            this.theme_params.set(this.theme.get("default_params"));
        },
        reset_preview: function () {
          logger.warn("Resetting preview..."),
            this.theme_preview.set(
              t.extend(
                { __theme_html: this.theme.unescaped_theme() },
                this.determine_content_map()
              )
            );
        },
        loading_preview: function () {
          this.blog_preview.set_loading_progress(0, !1),
            this.blog_preview.loading_indicator(!0),
            this.panel.theme_list.set_loading_progress(0),
            this.panel.theme_list.loading_indicator(!0);
        },
        export_json_string: function (e) {
          return JSON.stringify(
            t.omit(this.theme_params.toJSON(), "select_lists"),
            null,
            e || 0
          );
        },
        import_json_string: function (e) {
          return (
            "string" == typeof e && (e = JSON.parse(e)),
            !!t.isObject(e) &&
              (this.theme_params
                .set(e, { silent: !0 })
                .filter_unsupported_params()
                .trigger("change"),
              !0)
          );
        },
        theme_param_import_dialog: function () {
          var i, o;
          s.Dialog.dialog({
            has_form: !0,
            confirm_by_enter: !1,
            close_by_space: !1,
            type: "theme_param_import_dialog",
            text: '                        <div id="theme_param_import_dialog">                            <strong>JSON Theme Parameter Importer</strong>                            <div id="theme_param_import"></div>                        </div>                    ',
            escape_button: 0,
            buttons: {
              0: {
                text: __("Close"),
                close: !0,
                callback: t.bind(function () {
                  return i.destroy(), !0;
                }, this),
              },
              1: {
                text: __("Import"),
                selected: !0,
                btn_class: "blue",
                close: !0,
                callback: t.bind(function () {
                  var t = e.trim(o.getValue());
                  "{" !== t[0] && (t = "{" + t),
                    "}" !== t[t.length - 1] && (t += "}");
                  try {
                    this.import_json_string(t);
                  } catch (i) {
                    return !1;
                  }
                }, this),
              },
            },
          }),
            (i = ace.edit("theme_param_import")),
            (o = i.getSession());
          var n = ace.require("ace/mode/json").Mode;
          o.setUseWorker(!1),
            o.setMode(new n()),
            o.setUseWrapMode(!0),
            i.renderer.setShowGutter(!1),
            i.setShowPrintMargin(!1),
            i.focus(),
            i.commands.addCommand({
              name: "Indent lines",
              bindKey: { win: "Ctrl-]", mac: "Command-]", sender: "editor" },
              exec: function (e) {
                var t = e.getSelectionRange();
                return (
                  o.indentRows(t.start.row, t.end.row, o.getTabString()), !0
                );
              },
            }),
            i.commands.addCommand({
              name: "Un-indent lines",
              bindKey: { win: "Ctrl-[", mac: "Command-[", sender: "editor" },
              exec: function (e) {
                var t = e.getSelectionRange();
                return o.outdentRows(t), !0;
              },
            }),
            i.commands.addCommand({
              bindKey: {
                win: "Ctrl-F|Ctrl-H",
                mac: "Command-F|Command-Option-F",
                sender: "editor",
              },
              exec: function () {
                return !0;
              },
            });
          var a = this.export_json_string(4);
          o.setValue(a);
        },
        toggle_file_browser: function (e) {
          "undefined" == typeof e &&
            (e = this.file_browser.$el.hasClass("hide")),
            this.current_panel === this.panel.edit_html &&
              this.file_browser.set_editor(this.current_panel.editor),
            e
              ? (this.file_browser.generate_inline_asset_list(
                  this.theme.get("theme")
                ),
                this.file_browser.open())
              : this.file_browser.close();
        },
        set_panel_size: function (e, i, s) {
          i && this.$el.addClass("no_transition"),
            this.$panel_container.css("width", e),
            this.$preview_container.css("left", e),
            this.$pay_widget_panel.css("width", e),
            s && this.current_panel && this.current_panel.set_width(e),
            i &&
              t.defer(
                t.bind(function () {
                  this.$el.removeClass("no_transition");
                }, this)
              );
        },
        switch_panel: function (e, t) {
          logger.debug("Tumblr.Customize: switch_panel(" + e + ")");
          var i = this.panel[e];
          if (i === this.panel.edit_html && !r(this.blog, this.theme))
            return (
              s.Dialog.alert("(╯°□°）╯︵ ┻━┻"),
              this.current_panel.set_theme_editable &&
                this.current_panel.set_theme_editable(!1),
              !1
            );
          if (!i || this.current_panel === i) return !1;
          t || (t = "customize" === e ? "right" : "left"),
            i.width && this.set_panel_size(i.manual_width || i.width);
          var o = this.current_panel.$(".title_bar_container").height(),
            n = i.$(".title_bar_container").height();
          return (
            this.preview_render_progress_for_panel(i, this.current_panel),
            this.current_panel.hide_panel(t, n),
            i.show_panel(t, o),
            (this.current_panel = i),
            !0
          );
        },
        preview_render_progress_for_panel: function (e, t) {
          switch (e) {
            case this.panel.customize:
              t && t === this.panel.edit_page
                ? (this.blog_preview.show_render_progress = !0)
                : (this.blog_preview.show_render_progress = !1);
              break;
            case this.panel.theme_list:
              this.blog_preview.show_render_progress = !0;
              break;
            case this.panel.edit_page:
              t && t === this.panel.customize
                ? (this.blog_preview.show_render_progress = !0)
                : (this.blog_preview.show_render_progress = !1);
              break;
            default:
              this.blog_preview.show_render_progress = !1;
          }
          return this.blog_preview.show_render_progress;
        },
        update_popover_scroll: function () {
          this.current_panel &&
            (this.$popover_container.css({
              top: this.current_panel.$content_container.offset().top,
              bottom:
                e(window).height() -
                (this.current_panel.$content_container.offset().top +
                  this.current_panel.$content_container.outerHeight()),
            }),
            this.$popover_container_content.css({
              top: -this.current_panel.$content_container.scrollTop(),
              left: -this.current_panel.$content_container.scrollLeft(),
            }));
        },
        page_preview: function (e) {
          if (!e)
            return (
              this.theme_preview
                .clear({ silent: !0 })
                .set(
                  t.extend(
                    { __theme_html: this.theme.unescaped_theme() },
                    this.determine_content_map(!0)
                  )
                ),
              !0
            );
          var i = t.clone(this.demo_page.get("block:Posts")) || [],
            s = !1;
          switch ((i.length && (s = i[0] = t.clone(i[0])), e.type)) {
            case "custom_layout":
              return (
                this.theme_preview
                  .clear({ silent: !0 })
                  .set("__theme_html", e.body),
                !0
              );
            case "redirect":
            case "standard_layout":
              var o = this.determine_page_map(),
                n = o["block:Pages"] || [],
                a = n;
              if (e.show_link && e.label) {
                var r = { URL: e.redirect_to, Label: e.label };
                (a = t.uniq(n.concat([r]))), (o["block:Pages"] = a);
              }
              return "redirect" === e.type
                ? (this.theme_preview
                    .clear({ silent: !0 })
                    .set(
                      t.extend(
                        { __theme_html: this.theme.unescaped_theme() },
                        o
                      )
                    ),
                  !1)
                : !!s &&
                    (t.extend(s, {
                      Title: e.title,
                      "block:Title": !!e.title,
                      Body: e.body,
                      "block:Body": !!e.body,
                    }),
                    this.demo_page.set("block:Posts", i),
                    (o["block:Posts"] = i),
                    this.theme_preview
                      .clear({ silent: !0 })
                      .set(
                        t.extend(
                          { __theme_html: this.theme.unescaped_theme() },
                          o
                        )
                      ),
                    !0);
            default:
              if (!s) return !1;
              t.extend(s, {
                Title: e.title,
                "block:Title": !!e.title,
                Body: e.body,
                "block:Body": !!e.body,
              });
              var o = this.determine_page_map();
              return (
                this.demo_page.set("block:Posts", i),
                (o["block:Posts"] = i),
                this.theme_preview
                  .clear({ silent: !0 })
                  .set(
                    t.extend({ __theme_html: this.theme.unescaped_theme() }, o)
                  ),
                !0
              );
          }
        },
        enable_preview_render: function (e) {
          "undefined" == typeof e && (e = !0), (this.blog_preview.enable = e);
        },
        force_preview_refresh: function (e) {
          e &&
            this.theme_preview.set(
              { __theme_html: this.theme.unescaped_theme() },
              { silent: !0 }
            ),
            this.theme_preview.trigger("reset");
        },
        exit: function (e) {
          return (
            s.Prima.Url.hasAllowedProtocol(e) || (e = "/dashboard"),
            this.unsaved_changes
              ? void s.Dialog.confirm({
                  text: __("Exit without saving?"),
                  callback_ok: t.bind(function () {
                    (this.beforeunload_prompt = !1), window.location.assign(e);
                  }, this),
                })
              : (window.location.assign(e), !0)
          );
        },
        edit_page: function (e) {
          logger.debug("Tumblr.Customize: edit_page()"),
            this.panel.edit_page.set_page(
              !!e && (this.blog.pages.get(e) || !1),
              t.bind(function () {
                this.switch_panel("edit_page"), this.panel.edit_page.render();
              }, this)
            );
        },
        delete_page: function (e) {
          logger.debug("Tumblr.Customize: delete_page()"),
            (e = this.blog.pages.get(e)),
            e && e.destroy();
        },
        sort_pages: function (i) {
          logger.debug("Tumblr.Customize: sort_pages()"),
            this.blog.pages.set_order(i),
            e.ajax("/pages/" + this.blog.id + "/sort", {
              type: "post",
              data: {
                pages_in_order: t
                  .pluck(this.blog.pages.toJSON(), "request_uri")
                  .join("|||"),
              },
              withFormKey: !0,
            });
        },
        save_blog: function (e) {
          return (
            logger.debug("Tumblr.Customize: save_blog()"),
            e || (e = {}),
            e.blog || (e.blog = this.blog),
            e.theme || (e.theme = this.theme),
            r(e.blog, e.theme)
              ? this.jqxhr_blog
                ? (logger.error(
                    "Tumblr.Customize: save_page() is waiting for previous request to complete"
                  ),
                  !1)
                : (this.panel.customize.button_spinner(
                    '[data-action="save_settings"]',
                    !0
                  ),
                  this.panel.advanced_options.button_spinner(
                    '[data-action="save_settings"]',
                    !0
                  ),
                  this.panel.edit_html.button_spinner(
                    '[data-action="save_settings"]',
                    !0
                  ),
                  void (this.jqxhr_blog = e.blog.save(null, {
                    success: t.bind(function () {
                      logger.warn("Blog settings saved!"),
                        (this.jqxhr_blog = !1),
                        this.global_params.set(this.blog.get("global_params"), {
                          silent: !0,
                        }),
                        this.theme_params.set(this.blog.get("custom_params"), {
                          silent: !0,
                        }),
                        (this.global_params.hasChanged() ||
                          this.theme_params.hasChanged()) &&
                          this.theme_preview.set(this.determine_content_map()),
                        this.set_unsaved_changes(!1),
                        this.panel.customize.save_complete(!0),
                        this.panel.advanced_options.save_complete(!0),
                        this.panel.edit_html.save_complete(!0),
                        t.isFunction(e.always) && e.always(),
                        t.parseInt(e.blog.get("theme_id")) !==
                          t.parseInt(e.theme.id) &&
                          e.theme
                            .set({ id: e.blog.get("theme_id") }, { silent: !0 })
                            .fetch({
                              success: t.bind(function () {
                                s.Dialog.alert(
                                  __(
                                    "Your custom theme HTML appears to be invalid"
                                  )
                                ),
                                  this.panel.edit_html.update_editor_html(!0);
                              }, this),
                              type: "POST",
                            });
                    }, this),
                    error: t.bind(function (i, o) {
                      logger.error("Error saving blog settings."),
                        406 === o.status
                          ? s.Dialog.alert(
                              __(
                                "Uh oh! We couldn't save your theme. Looks like your custom theme references assets from non-HTTPS URLs. Please try again using only HTTPS URLs."
                              )
                            )
                          : s.Dialog.alert(__("Woops :(")),
                        (this.jqxhr_blog = !1),
                        this.panel.customize.save_complete(!1),
                        this.panel.advanced_options.save_complete(!1),
                        this.panel.edit_html.save_complete(!1),
                        t.isFunction(e.always) && e.always();
                    }, this),
                    type: "POST",
                  })))
              : (s.Dialog.alert(
                  "<p>" +
                    __("Your settings may not be valid") +
                    "</p><p>" +
                    __(
                      "Please feel free to contact support if the problem persists. Please include your Tumblr URL and the email address you use with your Tumblr account."
                    ) +
                    "</p>"
                ),
                !1)
          );
        },
        save_page: function (e) {
          return (
            logger.debug("Tumblr.Customize: save_page()"),
            e || (e = {}),
            e.page || (e.page = this.panel.edit_page.page),
            this.jqxhr_page
              ? (logger.error(
                  "Tumblr.Customize: save_page() is waiting for previous request to complete"
                ),
                !1)
              : (this.panel.edit_page.button_spinner(
                  '[data-action="save_page"]',
                  !0
                ),
                void (this.jqxhr_page = e.page.save(
                  {
                    user_form_key: c.user_form_key,
                    secure_form_key: c.secure_form_key,
                  },
                  {
                    success: t.bind(function () {
                      logger.warn("Page settings saved!"),
                        (this.jqxhr_page = !1),
                        this.panel.edit_page.save_complete(!1),
                        t.isFunction(e.always) && e.always(!0),
                        e.original_page
                          ? e.original_page.set(e.page.toJSON())
                          : this.blog.pages.add(e.page.toJSON());
                    }, this),
                    error: t.bind(function (i, s) {
                      return (
                        logger.error("Error saving page settings."),
                        (this.jqxhr_page = !1),
                        this.panel.edit_page.save_complete(!1),
                        404 === s.status
                          ? void this.blog.pages.fetch({
                              reset: !0,
                              success: t.bind(function (i, s) {
                                var o = t.findWhere(s, {
                                  request_uri: e.page.request_uri,
                                });
                                (e.page.id = o ? o.id : void 0),
                                  this.panel.edit_page.save_complete(!1),
                                  e.always(
                                    !1,
                                    __(
                                      "Sorry, we seem to be having technical trouble.  Please try again later."
                                    )
                                  );
                              }, this),
                            })
                          : (this.panel.edit_page.save_complete(!1),
                            void (
                              t.isFunction(e.always) &&
                              (s.responseJSON
                                ? e.always(!1, s.responseJSON.errors)
                                : e.always(
                                    !1,
                                    __(
                                      "Sorry, we seem to be having technical trouble.  Please try again later."
                                    )
                                  ))
                            ))
                      );
                    }, this),
                    type: "POST",
                  }
                )))
          );
        },
        buy_theme: function () {
          var i = this.theme.get("premium") + "";
          if (!i || "0" === i)
            return (
              s.Dialog.alert("This theme is already free."),
              this.current_panel.set_theme_editable &&
                this.current_panel.set_theme_editable(!0),
              !1
            );
          var o = c.user_form_key;
          this.payment_widget
            ? this.payment_widget.render({
                amount: i,
                key: o,
                ssl: "https:" === window.location.protocol ? "1" : "",
                success_callback: t.bind(function () {
                  e.post(
                    "/customize_api/blog/" + this.blog.id + "/purchase_theme",
                    { theme_id: this.theme.id }
                  ),
                    this.blog.get("purchased_theme_ids").push(this.theme.id),
                    this.panel.customize.render(),
                    this.panel.advanced_options.render();
                }, this),
                cancel_callback: t.bind(function () {}, this),
              })
            : (this.payment_widget = new s.PayPopover({
                amount: i,
                key: o,
                ssl: "https:" === window.location.protocol ? "1" : "",
                success: t.bind(function () {
                  e.post(
                    "/customize_api/blog/" + this.blog.id + "/purchase_theme",
                    { theme_id: this.theme.id }
                  ),
                    this.blog.get("purchased_theme_ids").push(this.theme.id),
                    this.panel.customize.render(),
                    this.panel.advanced_options.render();
                }, this),
                cancel: t.bind(function () {}, this),
                el: "#pay_widget_container",
              }));
        },
        reset_to_default: function () {
          this.theme.set({ id: _ }, { silent: !0 }).fetch({
            success: t.bind(function () {
              this.panel.edit_html.update_editor_html(!0);
            }, this),
            type: "POST",
          });
        },
        dismiss_theme_author_prompt: function () {
          e.ajax("/customize_api/acknowledged", {
            type: "post",
            data: { id: this.blog.id },
            withFormKey: !0,
          });
        },
        font_lookup: function (e) {
          return e ? t.result(o, e) : o;
        },
        image_lookup: function (e) {
          return t.result(this.image_data_map, e);
        },
      };
    n.Customize = c;
  })(
    jQuery,
    _,
    Backbone,
    Tumblr,
    TumblrData.fonts,
    Tumblr
  ) /*! scripts/customize_v3/model/param_view_model.js */,
  (function (e, t, i, s) {
    var o = i.Model.extend({
      defaults: { id: "", name: "", key: "", tooltip: "", value: "" },
      initialize: function (e, i) {
        (this.options = t.extend(
          {
            model_to_view_filter: t.identity,
            view_to_model_filter: t.identity,
            model: null,
          },
          t.omit(i, t.isUndefined)
        )),
          t.has(e, "value") || this.copy_from_model({ silent: !0 });
      },
      listen_to_model: function () {
        this.options.model &&
          this.listenTo(this.options.model, "change", function () {
            this.model_has_changed() && this.copy_from_model();
          });
      },
      model_has_changed: function () {
        return t.has(this.options.model.changed, this.get("key"));
      },
      copy_from_model: function (e) {
        if (this.options.model) {
          var t = this.get_model_value(!0);
          this.set("value", t, e);
        }
      },
      update_model: function (e) {
        this.options.model.set(
          this.get("key"),
          this.options.view_to_model_filter(this.get("value")),
          e
        );
      },
      get_model_value: function (e) {
        var t = this.options.model.get(this.get("key"));
        return e ? this.options.model_to_view_filter(t) : t;
      },
    });
    s.ParamViewModel = o;
  })(
    jQuery,
    _,
    Backbone,
    Tumblr.Customize
  ) /*! scripts/customize_v3/model/demo_content.js */,
  (function (e, t) {
    Tumblr.Customize.DemoContent = Backbone.Model.extend({
      urlRoot: "/customize_api/demo_content/",
      demo_id: Tumblr.Customize.DEMO_BLOG_NAME || "demo",
      initialize: function () {
        this.id || (this.id = this.demo_id);
      },
    });
  })(jQuery, Tumblr) /*! scripts/customize_v3/model/blog.js */,
  (function (e, t, i, s) {
    var o = i.Model.extend({
      urlRoot: "/customize_api/blog/",
      initialize: function (e, t) {
        t || (t = {}),
          this.set({ user_form_key: Tumblr.Customize.user_form_key }),
          this.set({ secure_form_key: Tumblr.Customize.secure_form_key }),
          (this.pages = new Tumblr.Customize.Pages(t.pages, {
            blog_id: this.id,
          }));
      },
      content_map_exports: function () {
        var e = t.pick(this.attributes, [
          "PortraitURL-16",
          "PortraitURL-24",
          "PortraitURL-30",
          "PortraitURL-40",
          "PortraitURL-48",
          "PortraitURL-64",
          "PortraitURL-96",
          "PortraitURL-128",
        ]);
        return (
          (e.Title = this.get("title")),
          (e.BlogTitle = this.get("title")),
          (e.Description = this.get("description")),
          (e.CustomCSS = this.get("custom_css")),
          e
        );
      },
    });
    s.Blog = o;
  })(
    jQuery,
    _,
    Backbone,
    Tumblr.Customize
  ) /*! scripts/customize_v3/model/appearance_params.js */,
  (function (e, t, i, s) {
    var o = i.Model.extend(
      {
        defaults: {},
        initialize: function (e, i) {
          i && i.defaults && t.extend(this.defaults, i.defaults);
          var s = [];
          i &&
            i.allow_npf_patch &&
            ((o.conditional_fields.ShowNewPostStyles = "show_new_post_styles"),
            s.push("show_new_post_styles")),
            i && i.supported_params
              ? this.set_supported_params(t.union(i.supported_params, s))
              : this.set_supported_params(t.union(o.global_keys(), s));
        },
        set_supported_params: function (e) {
          return (this.supported_params = e), this;
        },
        set: function (e, s, o) {
          return (
            !s && t.has(this.defaults, e) && (s = this.defaults[e]),
            i.Model.prototype.set.call(this, e, s, o)
          );
        },
        special_param_exports: function () {
          return t.transform(
            o.style_fields,
            function (e, t, i) {
              (e[i] = this.get(t)),
                "header_image" === t &&
                  (this.get("header_stretch")
                    ? (e[i] =
                        this.get("header_image_focused") ||
                        this.get("header_image"))
                    : (e[i] =
                        this.get("header_image") || this.get("header_image")));
            },
            {},
            this
          );
        },
        content_map_exports: function () {
          var e = this.special_param_exports();
          return (
            t.each(
              o.conditional_fields,
              function (t, i) {
                var s = i,
                  o = s.replace(/^Show/, "Hide");
                s === o && (o = "No" + s),
                  (e["block:" + o] = !this.get(t)),
                  (e["block:" + s] = !e["block:" + o]),
                  (e["block:If" + s] = e["block:" + s]),
                  (e["block:IfNot" + s] = e["block:" + o]);
              },
              this
            ),
            (e["block:IfNotHeaderImage"] = !this.get("header_image")),
            (e["block:IfHeaderImage"] = !e["block:IfNotHeaderImage"]),
            e
          );
        },
      },
      {
        style_fields: {
          BackgroundColor: "background_color",
          TitleFont: "title_font",
          TitleFontWeight: "title_font_weight",
          TitleColor: "title_color",
          LinkColor: "link_color",
          AccentColor: "link_color",
          AvatarShape: "avatar_shape",
          HeaderImage: "header_image",
        },
        conditional_fields: {
          ShowAvatar: "show_avatar",
          ShowTitle: "show_title",
          ShowDescription: "show_description",
          ShowHeaderImage: "show_header_image",
          StretchHeaderImage: "header_stretch",
        },
        global_keys: function () {
          var e = t.union(
            t.values(o.style_fields),
            t.values(o.conditional_fields)
          );
          return t.uniq(e);
        },
        supported_template_tags: function (e) {
          return !e && this._template_tags
            ? this._template_tags
            : ((this._template_tags = {}),
              t.each(
                this.style_fields,
                function (e, t) {
                  this._template_tags["{" + t + "}"] = e;
                },
                this
              ),
              t.each(
                this.conditional_fields,
                function (e, t) {
                  var i = t,
                    s = i.replace(/^Show/, "Hide");
                  i === s && (s = "No" + i),
                    (this._template_tags["{block:" + s + "}"] = e),
                    (this._template_tags["{block:" + i + "}"] = e);
                },
                this
              ),
              this._template_tags);
        },
        from_html: function (e) {
          e = e || "";
          var i = this.supported_template_tags(),
            s = e.match(
              /\{([\w\d]+|block:(?:if|show|hide|stretch|no)[\w\d\s]+)\}/gi
            ),
            o = [];
          return (
            t.each(s, function (e) {
              t.has(i, e) && o.push(i[e]);
            }),
            t.uniq(o)
          );
        },
      }
    );
    s.AppearanceParams = o;
  })(
    jQuery,
    _,
    Backbone,
    Tumblr.Customize
  ) /*! scripts/customize_v3/model/theme.js */,
  (function (e, t, i, s, o) {
    "use strict";
    (s.Customize.Theme = i.Model.extend({
      defaults: {
        id: 0,
        title: "",
        author_name: "",
        author_blog: "",
        install_count: 0,
        purchased: !1,
        wide_thumbnail_key: !1,
        theme: "",
      },
      initialize: function (e) {
        i.Model.prototype.initialize.apply(this, arguments),
          this.set("theme", this.get("theme") || "");
      },
      urlRoot: function () {
        return "/customize_api/theme/" + s.Customize.blog.id;
      },
      default_params: function (e) {
        var i = t.omit(s.Customize.theme.get("default_params"), "select_lists");
        return "undefined" == typeof e ? i : !(!i || !t.has(i, e)) && i[e];
      },
      unescaped_theme: function () {
        return this.get("theme").replace(/\\n/g, "\n").replace(/\\t/g, "\t");
      },
      purchased: function () {
        return t.include(s.Customize.blog.get("purchased_theme_ids"), this.id);
      },
      determine_features: function (e) {
        return (
          (this.features = {
            free:
              !this.get("premium") || parseFloat(this.get("premium"), 10) <= 0,
            premium: parseFloat(this.get("premium"), 10) > 0,
            purchased: t.contains(
              (e || s.Customize.blog).get("purchased_theme_ids"),
              this.id
            ),
            single_column: t.contains(
              s.Customize.themes.categories.single_column,
              this.id
            ),
            two_column: t.contains(
              s.Customize.themes.categories.two_column,
              this.id
            ),
            grid: t.contains(s.Customize.themes.categories.grid, this.id),
            good_for_text: t.contains(
              s.Customize.themes.categories.good_for_text,
              this.id
            ),
            minimal: t.contains(s.Customize.themes.categories.minimal, this.id),
            multiple_layouts: t.contains(
              s.Customize.themes.categories.multiple_layouts,
              this.id
            ),
            high_res: t.contains(
              s.Customize.themes.categories.high_res,
              this.id
            ),
          }),
          this.features
        );
      },
    })),
      (s.Customize.Themes = i.Collection.extend({
        model: s.Customize.Theme,
        url: function () {
          return (
            "/customize_api/themes?blog=" +
            encodeURIComponent(s.Customize.blog.id)
          );
        },
        initialize: function (e, i) {
          i && (this.categories = t.extend({}, i.categories)),
            this.constructor.__super__.initialize.apply(this, arguments);
        },
        in_category: function (e) {
          if (!t.has(this.categories, e)) return [];
          var i = t.map(
            this.categories[e],
            function (e, t) {
              return this.get(e);
            },
            this
          );
          return i;
        },
        with_features: function (e, i) {
          var o = this.filter(function (i) {
            var o = i.features || i.determine_features(s.Customize.blog);
            return t.isArray(e)
              ? t.reduce(
                  e,
                  function (e, t) {
                    return e || o[t];
                  },
                  !1
                )
              : o[e];
          });
          return i ? t.pluck(o, "id") : o;
        },
        with_query_like: function (i, s, o) {
          if (
            ((i = e.trim(i || "").toLowerCase()),
            (s = e.trim(s || "").toLowerCase()),
            !i && !s)
          )
            return !1;
          var n = this.filter(function (e) {
            return 1 === i.length
              ? !(!s || e.get("author_name").toLowerCase() !== s) ||
                  e.get("title").toLowerCase().charAt(0) === i
              : !(!i || !t.contains(e.get("title").toLowerCase(), i)) ||
                  !(!s || !t.contains(e.get("author_name").toLowerCase(), s));
          });
          return o ? t.pluck(n, "id") : n;
        },
      }));
  })(
    window.jQuery,
    window._,
    window.Backbone,
    window.Tumblr,
    window.Tumblr
  ) /*! scripts/customize_v3/model/theme_params.js */,
  (function (e, t) {
    var i = Backbone.Model.extend(
      {
        initialize: function (e, t) {
          t && t.supported_params
            ? (this.set_supported_params(t.supported_params),
              this.filter_unsupported_params())
            : this.set_supported_params(_.keys(this.attributes));
        },
        set_supported_params: function (e) {
          return (this.supported_params = e), this;
        },
        filter_unsupported_params: function () {
          return (
            this.supported_params &&
              (this.attributes = _.pick(
                this.attributes,
                this.supported_params
              )),
            this
          );
        },
        select_list_lookup: function (e, t, i) {
          if (this.has("select_lists")) {
            var s = this.get("select_lists");
            return _.has(s, e)
              ? "undefined" == typeof t
                ? s[e]
                : _.has(s[e], t)
                ? _.result(s[e], t)
                : i
              : void 0;
          }
        },
        custom_param_exports: function (e) {
          var t = this.toJSON();
          return delete t.select_lists, i.resolve_special_params(t, e);
        },
      },
      {
        parse_key: function (e) {
          var t = e.match(/^\s*([^:]+):(.*\S)\s*$/);
          return {
            key: e,
            type: !!t && t[1],
            name: t ? t[2] : e,
            id: e.toLowerCase().replace(/[^\w\d]/g, "_"),
          };
        },
        resolve_special_param: function (e, t, i) {
          if (!e) return e;
          if (i && !_.contains(["font", "image", "color"], i)) return e;
          var s = /^\s*{(.*)}\s*$/i,
            o = e.match(s);
          return o && _.has(t, o[1]) ? t[o[1]] : e;
        },
        resolve_special_params: function (e, t) {
          if (!t) return e;
          return _.transform(
            e,
            function (e, i, s) {
              var o = this.parse_key(s);
              e[s] = this.resolve_special_param(i, t, o.type);
            },
            {},
            this
          );
        },
        from_html: function (t) {
          var s = {},
            o = t.match(/<\s*meta\s+[^>]*>/gi);
          return (
            _.each(
              o,
              function (t) {
                var o = e(t);
                if (o) {
                  var n = o.attr("name");
                  if (n) {
                    var a = i.parse_key(n),
                      r = a.key,
                      l = a.type,
                      h = o.attr("content"),
                      c = o.attr("title");
                    "select" === l &&
                      (s.select_lists || (s.select_lists = {}),
                      s.select_lists[r] || (s.select_lists[r] = {}),
                      (s.select_lists[r][h] = c || h)),
                      l && (_.has(s, r) || (s[r] = h));
                  }
                }
              },
              this
            ),
            s
          );
        },
      }
    );
    t.ThemeParams = i;
  })(jQuery, Tumblr.Customize) /*! scripts/customize_v3/model/page.js */,
  (function (e, t) {
    var i = Backbone.Model.extend({
        defaults: {
          type: "standard_layout",
          request_uri: "",
          native_uri: !1,
          label: "",
          show_link: !1,
          title: "",
          body: "",
          redirect_to: "",
        },
        urlRoot: function () {
          return "/customize_api/blog/" + t.blog.id + "/pages";
        },
        sync: function (e, t, i) {
          return (
            "read" === e
              ? (i = _.extend(
                  {
                    type: "POST",
                    url: this.urlRoot(),
                    data: _.extend({ method: e, uri: t.id }, i.data),
                  },
                  i
                ))
              : "update" === e &&
                (i = _.extend(
                  {
                    url: this.urlRoot(),
                    attrs: _.extend({ method: e, uri: t.id }, t.toJSON(i)),
                  },
                  i
                )),
            Backbone.sync.call(this, e, t, i)
          );
        },
        validate: function (e) {
          var t = {};
          switch (
            ("redirect" === !e.type &&
              (e.request_uri && "/" !== e.request_uri
                ? e.request_uri.match(/[#?<>"']/gi) &&
                  (t.request_uri = __(
                    "This URL is not valid. Please use a different URL."
                  ))
                : (t.request_uri = __("Enter a URL"))),
            e.show_link &&
              !e.label &&
              (("standard_layout" === e.type && e.title) ||
                (t.label = __("Enter a link title"))),
            e.type)
          ) {
            case "standard_layout":
              e.body || (t.body = __("Body cannot be empty"));
              break;
            case "custom_layout":
              e.body || (t.custom_layout = __("Body cannot be empty"));
              break;
            case "redirect":
              e.redirect_to || (t.redirect_to = __("Enter a link URL"));
          }
          if (_.keys(t).length) return t;
        },
        destroy: function () {
          return this.constructor.__super__.destroy.call(this, {
            url: "/customize_api/blog/" + t.blog.get("name") + "/page/delete",
            type: "POST",
            data: { page_uri: this.get("request_uri") },
            withFormKey: !0,
            processData: !0,
            error: function (e, t) {
              200 !== t.status && Tumblr.Dialog.alert(__(t.statusText));
            },
          });
        },
      }),
      s = Backbone.Collection.extend({
        model: i,
        blog_id: 0,
        sort_order: !1,
        comparator: function (e) {
          return this.sort_order
            ? _.indexOf(this.sort_order, e.id)
            : e.get("sort_order");
        },
        url: function () {
          return (
            "/customize_api/blog/" + (this.blog_id || t.blog.id) + "/pages"
          );
        },
        initialize: function (e, t) {
          t && (this.blog_id = t.blog_id),
            this.on(
              "reset",
              function () {
                (this.sort_order = !1), this.sort();
              },
              this
            ),
            this.constructor.__super__.initialize.apply(this, arguments);
        },
        set_order: function (e) {
          return (this.sort_order = e), this.sort();
        },
      });
    (t.Page = i), (t.Pages = s);
  })(
    jQuery,
    Tumblr.Customize
  ) /*! scripts/customize_v3/model/theme_preview.js */,
  (function (e, t, i, s) {
    var o = i.Model.extend({
      webfonts: [],
      attributes: { __theme_html: "" },
      filtered_content_map: function () {
        var e = this.toJSON();
        return (
          delete e.__theme_html,
          (this.webfonts = []),
          t.each(
            e,
            t.bind(function (e, i, o) {
              if ("bodyfont" !== i.toLowerCase()) {
                if (i.match(/^font:/i) || i.match(/^[^\s:]+font$/i)) {
                  var n = s.font_lookup(e);
                  return void (n && n.family
                    ? ((o[i] = n.family),
                      n.path &&
                        t.indexOf(this.webfonts, n.path) < 0 &&
                        this.webfonts.push(n.path))
                    : e.match(/ /) &&
                      !e.match(/[,"']/) &&
                      (o[i] = '"' + e + '"'));
                }
                if (i.match(/^image:/i) || i.match(/^[^\s:]+image$/i)) {
                  var a = s.image_lookup(e);
                  a && (o[i] = a);
                }
              }
            }, this)
          ),
          (e.CustomCSS =
            '</style><style type="text/css" class="tumblr_theme_marker_customcss">' +
            this.get("CustomCSS") +
            '</style><style type="text/css">'),
          e
        );
      },
    });
    s.ThemePreview = o;
  })(
    jQuery,
    _,
    Backbone,
    Tumblr.Customize
  ) /*! scripts/customize_v3/view/param_view.js */,
  (function (e, t, i, s, o, n, a, r) {
    "use strict";
    var l = i.View.extend(
        {
          events: {
            click: "focus",
            "change input, textarea, select": "change_event",
            "input input, textarea": "input_event",
          },
          debounce: 250,
          type: "",
          options: {
            name: "",
            tooltip: "",
            key: "",
            model_to_view_filter: t.identity,
            view_to_model_filter: t.identity,
            input_filter: t.identity,
            on_popover_show: t.noop,
            on_popover_hide: t.noop,
          },
          render_on_change: !1,
          block_render: !1,
          needs_render: !0,
          className: function () {
            return this.type ? "field_row field_row_" + this.type : "field_row";
          },
          focus: function (e) {
            this.$input.is(e.target) ||
              (this.$input.focus(),
              this.$input.is("select") && this.$input.click());
          },
          initialize: function (i) {
            return (
              (this.options = t.defaults(
                t.omit(i, t.isUndefined),
                this.options
              )),
              !t.has(this.options, "type") || (this.type = this.options.type),
              !t.has(this.options, "debounce") ||
                (this.debounce = this.options.debounce),
              !t.has(this.options, "render_on_change") ||
                (this.render_on_change = this.options.render_on_change),
              (this.models = []),
              (this.subviews = []),
              (this.$content_container = e(this.options.content_container)),
              (this.$popover_container = e(this.options.popover_container)),
              (this.on_popover_show = this.options.on_popover_show),
              (this.on_popover_hide = this.options.on_popover_hide),
              (this.view_model = new n(
                {
                  id: this.options.id,
                  name: this.options.name,
                  tooltip: this.options.tooltip,
                  key: this.options.key,
                },
                {
                  model_to_view_filter: this.options.model_to_view_filter,
                  view_to_model_filter: this.options.view_to_model_filter,
                  model: this.options.model,
                }
              )),
              this.models.push(this.view_model),
              this.options.model &&
                this.listenTo(this.options.model, "change", this.model_change),
              this.debounce
                ? (this.debounced_update_model = t.debounce(
                    this.update_model,
                    this.debounce
                  ))
                : (this.debounced_update_model = this.update_model),
              this.listenTo(
                this.view_model,
                "change",
                this.debounced_update_model
              ),
              this.render_on_change &&
                this.listenTo(
                  this.view_model,
                  "change",
                  this.view_model_change
                ),
              this
            );
          },
          remove: function () {
            t.each(
              this.models,
              function (e) {
                this.stopListening(e);
              },
              this
            ),
              (this.models = []),
              t.each(this.subviews, function (e) {
                e.remove();
              }),
              (this.children = []),
              i.View.prototype.remove.apply(this, arguments);
          },
          cache_selectors: function () {
            this.$input = this.$("input, textarea, select");
          },
          model_change: function () {
            this.view_model.model_has_changed() &&
              this.view_model.copy_from_model();
          },
          get_input_value: function () {
            var e;
            return (
              (e = this.$input.is('[type="checkbox"]')
                ? this.$input.is(":checked")
                : this.$input.val()),
              this.options.input_filter(e)
            );
          },
          change_event: function () {
            this.update_from_input(!1);
          },
          input_event: function () {
            this.update_from_input(!0);
          },
          update_from_input: function (e) {
            e && (this.block_render = !0),
              this.view_model.set("value", this.get_input_value()),
              e && (this.block_render = !1);
          },
          update_model: function () {
            this.view_model.update_model();
          },
          view_model_change: function () {
            this.block_render ? (this.needs_render = !0) : this.render();
          },
          render: function () {
            return (
              (this.needs_render = !1),
              this.$el.html(this.template(this.view_model.toJSON())),
              this.cache_selectors(),
              this
            );
          },
          template: t.template(e("#param_text_template").html()),
        },
        {
          from_type: function (e, t) {
            switch (e) {
              case "text":
                return new h(t);
              case "color":
                return new c(t);
              case "image":
                return new d(t);
              case "if":
                return new p(t);
              case "font":
                return new u(t);
              case "shape":
                return new m(t);
              case "select":
                return new g(t);
              case "code":
                return new _(t);
              default:
                return new l(t);
            }
          },
        }
      ),
      h = l.extend({
        type: "text",
        render: function () {
          return (
            this.autosize_textarea &&
              (this.stopListening(this.autosize_textarea),
              this.autosize_textarea.remove()),
            this.constructor.__super__.render.apply(this, arguments),
            (this.autosize_textarea = new o.AutosizeTextarea({
              min_height: this.options.min_height || 28,
              max_height: 200,
              el: this.$input,
            })),
            this.listenTo(
              this.autosize_textarea,
              "textarea:autosize",
              function () {
                this.trigger("resize");
              }
            ),
            this.autosize_textarea.render(),
            this
          );
        },
        template: t.template(e("#param_text_template").html()),
      }),
      _ = l.extend({
        type: "code",
        render_on_change: !0,
        ace_init: function () {
          this.$input.hide(),
            (this.editor = s.edit(this.$ace_editor.get(0))),
            (this.session = this.editor.getSession()),
            (this.renderer = this.editor.renderer),
            this.editor.setValue(this.$input.val()),
            this.editor.clearSelection(),
            this.ace_set_mode(this.options.editor_mode),
            this.ace_editor_commands(),
            this.$ace_editor.addClass("autoresize"),
            this.ace_autosize(),
            this.session.on(
              "change",
              t.bind(function (e) {
                this.update_from_input(!0), this.ace_autosize();
              }, this)
            );
        },
        ace_destroy: function () {
          this.editor &&
            (this.$ace_editor.remove(),
            this.editor.destroy(),
            delete this.editor,
            this.$input.show());
        },
        ace_set_mode: function (e) {
          var t,
            i = o.ace.theme.customize;
          switch (e) {
            case "html":
              t = s.require("ace/mode/html").Mode;
              break;
            case "css":
              t = s.require("ace/mode/css").Mode;
              break;
            case "javascript":
              t = s.require("ace/mode/javascript").Mode;
              break;
            case "json":
              t = s.require("ace/mode/json").Mode;
              break;
            default:
              t = o.ace.mode.tumblr;
          }
          this.session.setUseWorker(!1),
            this.session.setMode(new t()),
            this.editor.setTheme(i),
            this.session.setUseWrapMode(!0),
            this.session.setFoldStyle("manual"),
            this.editor.setShowPrintMargin(!1),
            this.renderer.setShowGutter(!1),
            this.renderer.setPadding(11);
        },
        ace_autosize: function () {
          if (this.options.autoresize) {
            var t = this.renderer.lineHeight || 16,
              i =
                this.session.getScreenLength() * t +
                this.renderer.scrollBar.getWidth();
            e(this.editor.container).height(i),
              this.editor.resize(),
              this.trigger("resize");
          }
        },
        ace_editor_commands: function () {
          var e = this.editor,
            t = this.session;
          e.commands.addCommand({
            name: "Indent lines",
            bindKey: { win: "Ctrl-]", mac: "Command-]", sender: "editor" },
            exec: function (e) {
              var i = e.getSelectionRange();
              return t.indentRows(i.start.row, i.end.row, t.getTabString()), !0;
            },
          }),
            e.commands.addCommand({
              name: "Un-indent lines",
              bindKey: { win: "Ctrl-[", mac: "Command-[", sender: "editor" },
              exec: function (e) {
                var i = e.getSelectionRange();
                return t.outdentRows(i), !0;
              },
            }),
            e.commands.addCommand({
              bindKey: {
                win: "Ctrl-F|Ctrl-H",
                mac: "Command-F|Command-Option-F",
                sender: "editor",
              },
              exec: function () {
                return !0;
              },
            });
        },
        focus: function (e) {
          this.editor && this.editor.focus();
        },
        get_input_value: function () {
          if (!this.editor)
            return this.constructor.__super__.get_input_value.apply(
              this,
              arguments
            );
          var e = this.editor.getValue();
          return this.options.input_filter(e);
        },
        render: function () {
          return (
            this.ace_destroy(),
            this.constructor.__super__.render.apply(this, arguments),
            (this.$ace_editor = e("<div>").insertAfter(this.$input)),
            this.ace_init(),
            this
          );
        },
        template: t.template(e("#param_code_template").html()),
      }),
      c = l.extend({
        type: "color",
        render_on_change: !0,
        events: { click: "open_picker" },
        initialize: function (e) {
          return (
            this.constructor.__super__.initialize.apply(this, arguments),
            (this.events = t.extend({}, l.prototype.events, this.events)),
            this.delegateEvents(),
            this.view_model.set(
              "previous_value",
              this.view_model.get("value"),
              { silent: !0 }
            ),
            this
          );
        },
        view_model_change: function () {
          this.block_render
            ? (this.needs_render = !0)
            : this.picker_is_open
            ? this.render_swatch()
            : this.render();
        },
        create_picker: function () {
          (this.popover = new o.Customize.PanelPopover({
            className: "panel_popover color_picker_popover",
            on_show: t.bind(this.on_show, this),
            on_hide: t.bind(this.on_hide, this),
            container: ".content_container",
            parent: this.$el,
          })),
            (this.picker = new o.ColorEditor.Editor({
              color: this.view_model.get("value"),
              on_change: t.bind(this.color_picker_change, this),
            })),
            this.subviews.push(this.picker, this.popover);
        },
        open_picker: function () {
          var e = this.view_model.get("value");
          (this.picker.current_color = e),
            this.picker.render_picker(),
            this.popover.show(),
            this.popover.position_to_parent(
              this.$el.outerWidth(),
              0.5 * this.$el.outerHeight()
            ),
            this.view_model.set("previous_value", e, { silent: !0 }),
            this.render_swatch();
        },
        on_show: function () {
          (this.picker_is_open = !0),
            this.on_popover_show(this, {
              clearance_top: 50,
              clearance_bottom: 140,
            });
        },
        on_hide: function () {
          (this.picker_is_open = !1),
            this.on_popover_hide(this),
            this.render_swatch();
        },
        color_picker_change: function (e) {
          this.view_model.set("value", e);
        },
        cache_selectors: function () {
          this.constructor.__super__.cache_selectors.apply(this, arguments),
            (this.$current_swatch = this.$(".color_swatch")),
            (this.$previous_swatch = this.$(".color_previous"));
        },
        render_swatch: function () {
          this.picker_is_open
            ? this.$previous_swatch.addClass("editing")
            : this.$previous_swatch.removeClass("editing"),
            this.$previous_swatch.css(
              "background-color",
              this.view_model.get("previous_value")
            ),
            this.$current_swatch.css(
              "background-color",
              this.view_model.get("value")
            );
        },
        render: function () {
          return (
            this.constructor.__super__.render.apply(this, arguments),
            this.picker ||
              (this.create_picker(),
              this.$popover_container.append(this.popover.render().el),
              this.popover.append(this.picker.render().el)),
            this
          );
        },
        template: t.template(e("#param_color_template").html()),
      }),
      d = l.extend({
        debounce: 0,
        type: "image",
        render_on_change: !0,
        events: { click: "open_picker" },
        initialize: function (e) {
          return (
            this.constructor.__super__.initialize.apply(this, arguments),
            t.has(this.options, "default_value") &&
              (this.view_model.defaults = t.defaults(
                { value: this.options.default_value },
                this.view_model.defaults
              )),
            (this.events = t.extend({}, l.prototype.events, this.events)),
            this.delegateEvents(),
            this
          );
        },
        create_picker: function () {
          (this.popover = new o.Customize.PanelPopover({
            className: "panel_popover image_picker_popover",
            on_show: t.bind(this.on_show, this),
            on_hide: t.bind(this.on_hide, this),
            container: ".content_container",
            parent: this.$el,
          })),
            (this.picker = new o.ImagePicker({
              data_map: this.options.data_map,
              upload_text: this.options.upload_text,
              reset_text: this.options.reset_text,
              remove_text: this.options.remove_text,
              current_url: this.view_model.get("value"),
              default_url: t.result(this.view_model.defaults, "value"),
              on_change: t.bind(this.image_picker_change, this),
            })),
            this.picker.$el.on(
              {
                mouseenter: t.bind(function () {
                  this.popover.$el.addClass("hover_first");
                }, this),
                mouseleave: t.bind(function () {
                  this.popover.$el.removeClass("hover_first");
                }, this),
              },
              ".menu_option_upload"
            ),
            this.listenTo(this.picker, "imagepicker:loading", function () {
              this.popover.hide(),
                this.$el.addClass("loading"),
                this.$loader.addClass("animate");
            }),
            this.listenTo(this.picker, "imagepicker:done", function () {
              this.$el.removeClass("loading"),
                this.$loader.removeClass("animate");
            }),
            this.subviews.push(this.picker, this.popover);
        },
        open_picker: function () {
          if (!this.picker.xhr) {
            (this.picker.current_url = this.view_model.get("value")),
              (this.picker.default_url = t.result(
                this.view_model.defaults,
                "value"
              )),
              this.picker.render(),
              this.picker.cancel();
            var e = !1;
            this.picker.current_url
              ? this.picker.default_url === !1
                ? (e = !0)
                : (this.picker.default_url || !1) === this.picker.current_url &&
                  (e = !0)
              : (e = !0),
              e
                ? this.picker.upload_click()
                : (this.popover.show(),
                  this.popover.position_to_parent(
                    this.$el.outerWidth(),
                    0.5 * this.$el.outerHeight()
                  ));
          }
        },
        on_show: function () {
          (this.picker_is_open = !0),
            this.on_popover_show(this, {
              clearance_top: 50,
              clearance_bottom: 140,
            });
        },
        on_hide: function () {
          (this.picker_is_open = !1),
            this.on_popover_hide(this),
            e(window).off("focus", this.__close_picker);
        },
        image_picker_change: function (e) {
          this.view_model.set("value", e), this.popover.hide();
        },
        remove: function () {
          this.picker &&
            (this.picker.$el.off("mouseenter", ".menu_option_upload"),
            this.picker.$el.off("mouseleave", ".menu_option_upload")),
            i.View.prototype.remove.apply(this, arguments);
        },
        cache_selectors: function () {
          (this.$input = this.$('input:not([type="file"])')),
            (this.$icon = this.$(".icon")),
            (this.$loader = this.$(".Knight-Rider-loader"));
        },
        render: function () {
          return (
            this.constructor.__super__.render.apply(this, arguments),
            this.picker ||
              (this.create_picker(),
              this.$popover_container.append(this.popover.render().el),
              this.popover.append(this.picker.render().el)),
            this.$icon.removeClass("icon_photo_plus icon_edit_pencil"),
            (t.result(this.view_model.defaults, "value") || !1) ===
            this.view_model.get("value")
              ? this.$icon.addClass("icon_photo_plus")
              : this.view_model.get("value")
              ? this.$icon.addClass("icon_edit_pencil")
              : this.$icon.addClass("icon_photo_plus"),
            this
          );
        },
        template: t.template(e("#param_image_template").html()),
      }),
      p = l.extend({
        debounce: 0,
        type: "if",
        render: function () {
          return (
            this.constructor.__super__.render.apply(this, arguments),
            new o.BinarySwitch({
              el: this.$('.binary_switch_checkbox input[type="checkbox"]'),
            }).render(),
            this
          );
        },
        template: t.template(e("#param_if_template").html()),
      }),
      u = l.extend({
        debounce: 0,
        type: "font",
        render_on_change: !0,
        events: { "click .flat_select": "open_picker" },
        initialize: function (e) {
          return (
            this.constructor.__super__.initialize.apply(this, arguments),
            (this.events = t.extend({}, l.prototype.events, this.events)),
            this.delegateEvents(),
            (this.weight_view_model = new n(
              { key: this.options.weight_key },
              { model: this.options.model }
            )),
            this.models.push(this.weight_view_model),
            this.update_weight({ silent: !0 }),
            this.update_font({ silent: !0 }),
            this.listenTo(
              this.weight_view_model,
              "change:value",
              this.change_weight_value
            ),
            this
          );
        },
        update_font: function (e) {
          var t = this.view_model.get("value"),
            i = a(t);
          this.view_model.set(
            {
              font_family: i ? i.family : "",
              label: i ? i.display_name : t,
              font_weight: this.view_model.get("weight_value"),
            },
            e
          );
        },
        update_weight: function (e) {
          this.view_model.set(
            {
              weight_key: this.weight_view_model.get("key"),
              weight_value: this.weight_view_model.get("value"),
              font_weight: this.weight_view_model.get("value"),
            },
            e
          );
        },
        change_weight_value: function () {
          this.update_weight();
        },
        get_input_weight_value: function () {
          var e;
          return (e = this.$input_weight.is('[type="checkbox"]')
            ? this.$input_weight.is(":checked")
              ? "bold"
              : "normal"
            : this.$input_weight.val());
        },
        change_event: function (e) {
          this.$input_weight.is(e.currentTarget)
            ? this.update_weight_from_input(!1)
            : this.update_from_input(!1);
        },
        update_from_input: function (e) {
          e && (this.block_render = !0),
            this.view_model.set("value", this.get_input_value(), {
              silent: !0,
            }),
            this.update_font(),
            e && (this.block_render = !1);
        },
        update_weight_from_input: function (e) {
          e && (this.block_render = !0),
            this.weight_view_model.set("value", this.get_input_weight_value()),
            e && (this.block_render = !1);
        },
        create_picker: function () {
          (this.picker = new o.FontPicker({
            fonts: a(),
            current_font: this.view_model.get("value"),
            current_font_weight: this.view_model.get("weight_value"),
            on_show: t.bind(this.on_show, this),
            on_hide: t.bind(this.on_hide, this),
            on_change: t.bind(this.font_change, this),
          })),
            this.subviews.push(this.picker);
        },
        open_picker: function () {
          this.picker.show();
          var e = this.$el.offset(),
            t = this.$content_container.offset();
          this.picker.$el.css({
            top:
              e.top -
              t.top +
              this.$content_container.scrollTop() +
              0.5 * this.$el.outerHeight(),
            left:
              e.left -
              t.left +
              this.$content_container.scrollLeft() +
              this.$el.outerWidth(),
          });
        },
        on_show: function () {
          this.$el.scrollTop(),
            this.on_popover_show(this, {
              clearance_top: 60,
              clearance_bottom: 60,
            });
        },
        on_hide: function () {
          this.on_popover_hide(this);
        },
        font_change: function (e) {
          this.$input.val(e).trigger("change");
        },
        cache_selectors: function () {
          (this.$input = this.$('input[type="hidden"]')),
            (this.$input_weight = this.$('input[type="checkbox"]')),
            (this.$current_selection = this.$(".current_selection"));
        },
        update_model: function () {
          this.weight_view_model.update_model(),
            this.constructor.__super__.update_model.apply(this, arguments);
        },
        update_current_selection_style: function () {
          this.$current_selection
            .css({
              "font-family": this.view_model.get("font_family"),
              "font-weight": this.view_model.get("font_weight"),
            })
            .text(this.view_model.get("label"));
        },
        render: function () {
          return (
            this.update_font({ silent: !0 }),
            this.constructor.__super__.render.apply(this, arguments),
            this.picker
              ? ((this.picker.is_bold =
                  "normal" !== this.view_model.get("font_weight")),
                this.picker.render())
              : (this.create_picker(),
                (this.picker.is_bold =
                  "normal" !== this.view_model.get("font_weight")),
                this.$popover_container.append(this.picker.render().el)),
            new o.BinarySwitch({
              className: "bold_switch",
              el: this.$('.font_bold_checkbox input[type="checkbox"]'),
            }).render(),
            this
          );
        },
        template: t.template(e("#param_font_template").html()),
      }),
      m = l.extend({
        debounce: 0,
        type: "shape",
        initialize: function (e) {
          return (
            this.constructor.__super__.initialize.apply(this, arguments),
            this.view_model.set(
              { select_options: e.select_options || {} },
              { silent: !0 }
            ),
            this
          );
        },
        get_input_value: function () {
          var e = this.$input.filter(":checked").val();
          return (
            "undefined" == typeof e && (e = this.$input.first().val()),
            this.options.input_filter(e)
          );
        },
        template: t.template(e("#param_shape_template").html()),
      }),
      g = l.extend({
        debounce: 0,
        type: "select",
        initialize: function (e) {
          this.constructor.__super__.initialize.apply(this, arguments);
          var i = e.select_options || {},
            s = this.view_model.get("value"),
            o = this.get_label(s, e.select_options);
          return (
            t.isUndefined(o) &&
              t.any(i) &&
              ((s = (function (e) {
                for (var t in e) return t;
              })(i)),
              (o = this.get_label(s, e.select_options))),
            this.view_model.set(
              { select_options: i, label: o || s },
              { silent: !0 }
            ),
            this
          );
        },
        get_label: function (e, i) {
          return (
            i || (i = this.view_model.get("select_options")), t.result(i, e)
          );
        },
        update_from_input: function (e) {
          e && (this.block_render = !0);
          var t = this.get_input_value();
          this.view_model.set({ value: t, label: this.get_label(t) }),
            e && (this.block_render = !1);
        },
        render: function () {
          return (
            this.constructor.__super__.render.apply(this, arguments),
            new o.Prima.FlatSelect(),
            this
          );
        },
        template: t.template(e("#param_select_template").html()),
      });
    r.ParamView = l;
  })(
    jQuery,
    _,
    Backbone,
    ace,
    Tumblr,
    Tumblr.Customize.ParamViewModel,
    Tumblr.Customize.font_lookup,
    Tumblr.Customize
  ) /*! scripts/customize_v3/view/panel_popover.js */,
  (function (e, t, i, s) {
    var o = i.View.extend({
      events: { "click .panel_popover_glass": "__glass_click" },
      className: "panel_popover",
      __glass_click: function (e) {
        e.preventDefault(), this.hide();
      },
      initialize: function (e) {
        (this.options = t.extend({}, e)),
          (this.on_show = this.options.on_show),
          (this.on_hide = this.options.on_hide);
      },
      position_to_parent: function (t, i) {
        "string" == typeof this.options.container
          ? (this.$container = this.$parent.closest(this.options.container))
          : (this.$container = e(this.options.container)),
          t || (t = 0),
          i || (i = 0);
        var s = this.$parent.offset() || { top: 0, left: 0 },
          o = this.$container.offset() || { top: 0, left: 0 },
          n = {
            top: this.$container.scrollTop(),
            left: this.$container.scrollLeft(),
          };
        this.$el.css({
          left: s.left - o.left + n.left + t,
          top: s.top - o.top + n.top + i,
        });
      },
      empty: function () {
        this.$content.empty.apply(this.$content, arguments);
      },
      append: function () {
        this.$content.append.apply(this.$content, arguments);
      },
      prepend: function () {
        this.$content.prepend.apply(this.$content, arguments);
      },
      show: function () {
        this.$el.show(), this.on_show();
      },
      hide: function () {
        this.$el.hide(), this.on_hide();
      },
      render: function () {
        return (
          this.$el
            .html(
              this.template({
                popover_content: this.options.popover_content || "",
              })
            )
            .hide(),
          (this.$content = this.$el.find(".panel_popover_content")),
          (this.$parent = e(this.options.parent)),
          this
        );
      },
      template: t.template(
        '            <div class="panel_popover_content">                <%= popover_content %>            </div>            <div class="panel_popover_glass"></div>        '
      ),
    });
    s.PanelPopover = o;
  })(
    jQuery,
    _,
    Backbone,
    Tumblr.Customize
  ) /*! scripts/customize_v3/view/panel_view.js */,
  (function (e, t, i, s, o, n) {
    "use strict";
    var a = window.Backbone.View.extend(
      {
        events: {
          'click [data-action="exit"]': "exit",
          'click [data-action="switch_panel"]': "switch_panel",
          'click [data-action="save_settings"]': "save_settings",
          'click [data-action="buy_theme"]': "buy_theme",
          "change select": "update_select_label",
          "mousedown .resize_handle": "resize_mousedown",
          "mouseover .tooltip_container": "show_tooltip_event",
          "mouseout .tooltip_container": "hide_tooltip_event",
        },
        initialize: function () {
          t.bindAll(this, [
            "resize_mousemove",
            "resize_mouseup",
            "mouse_active_state",
            "panel_keydown",
            "panel_keyup",
            "scrollbar_drag",
            "trigger_scroll_update",
            "on_popover_show",
            "on_popover_hide",
            "enable_sync_scroll",
            "disable_sync_scroll",
          ]),
            (this.id = this.$el.data("id")),
            this.$("#fields_text").on(
              "keyup",
              'input[type="text"]',
              t.bind(t.debounce(this.key_trigger_change, 1e3), this)
            ),
            this.$el.on(
              "keyup",
              "[data-quick-update]",
              t.bind(this.key_trigger_change, this)
            ),
            this.$el.on(
              "keyup",
              "textarea.autoresize",
              t.bind(t.throttle(this.autosize_textarea_keyup, 100), this)
            ),
            this.autosize_textarea(this.$("textarea.autoresize")),
            (this.$content_container = this.$el.children(".content_container")),
            (this.$content = this.$content_container.children(".content")),
            (this.$popover_container = e("#popover_container")),
            (this.$popover_container_content = e("#popover_container_content")),
            (this.$glass = e("#glass")),
            this.init_scrollbar(),
            (this.width_offset =
              this.$content_container.width() -
              this.$content_container.outerWidth()),
            this.width &&
              this.$content_container.width(this.width + this.width_offset);
        },
        mouse_active_state: function (t) {
          var i = e(t.currentTarget);
          switch (t.type) {
            case "mousedown":
              i.addClass("active"),
                i.on("mouseup", this.mouse_active_state),
                i.on("mouseleave", this.mouse_active_state);
              break;
            case "mouseout":
            case "mouseleave":
            case "mouseup":
              i.removeClass("active"),
                i.off("mouseup", this.mouse_active_state),
                i.off("mouseleave", this.mouse_active_state);
          }
        },
        prevent_default: function (e) {
          e.preventDefault();
        },
        key_trigger_change: function (t) {
          e(t.currentTarget).trigger("change");
        },
        panel_keydown: function () {},
        panel_keyup: function () {},
        autosize_textarea_keyup: function (e) {
          return this.autosize_textarea(e.currentTarget);
        },
        autosize_textarea: function (i) {
          var s = e(i);
          if (s.length > 1)
            return void s.each(
              t.bind(function (e, t) {
                this.autosize_textarea(t);
              }, this)
            );
          var o = s.data("shadow");
          (o && o.length) ||
            ((o = e('<div class="textarea_shadow"/></div>').insertAfter(s)),
            s.data("shadow", o));
          var n = t.escape(s.prop("value"));
          o.html(
            n.replace(/([\s\r\n]+)$/g, "$1&nbsp;").replace(/\n/g, "<br/>")
          );
          var a = o.outerHeight(),
            r = Math.abs(s.height() - a) > 1;
          s.css({ overflow: "hidden", resize: "none", height: a }),
            r && this.trigger("panel:resize");
        },
        set_width: function (e) {
          this.max_width && e > this.max_width && (e = this.max_width),
            this.width && e < this.width && (e = this.width),
            (this.manual_width = e),
            this.$content_container.width(e + this.width_offset);
        },
        init_scrollbar: function () {
          var i = !1;
          (i =
            "onwheel" in document.createElement("div")
              ? "wheel"
              : void 0 !== document.onmousewheel
              ? "mousewheel"
              : "DOMMouseScroll"),
            this.$content_container.on(
              "scroll",
              t.bind(this.update_scrollbar_position, this)
            ),
            /iphone|ipod|ipad/gi.test(window.navigator.platform) ||
              this.$content_container.addClass("custom_scrollbar"),
            (this.$scrollbar_container = e(
              '<div class="scrollbar_container"></div>'
            ).appendTo(this.$el)),
            (this.$scrollbar_position = e(
              '<div class="scrollbar_position"></div>'
            ).appendTo(this.$scrollbar_container)),
            (this.$scrollbar_pill = e(
              '<div class="scrollbar_pill"></div>'
            ).appendTo(this.$scrollbar_position)),
            this.$scrollbar_position.on("mousedown", this.scrollbar_drag);
          var s = this.$content_container;
          s.add(this.$scrollbar_container).on(i, function (e) {
            var t = 0;
            switch (e.type) {
              case "wheel":
                t = -e.originalEvent.deltaY;
                break;
              case "mousewheel":
                t = e.originalEvent.wheelDelta;
                break;
              case "DOMMouseScroll":
                t = -(e.originalEvent.deltaY || 40 * e.originalEvent.detail);
            }
            (t *= 0.4), s.scrollTop(s.scrollTop() - t);
          }),
            this.on(
              "panel:resize",
              t.debounce(this.update_scrollbar_height, 100),
              this
            ),
            this.update_scrollbar_height();
        },
        scrollbar_drag: function (t) {
          if (!t)
            return (
              (this.drag_x = 0),
              (this.drag_y = 0),
              (this.scroll_x = 0),
              (this.scroll_y = 0),
              e(window).off("mousemove", this.scrollbar_drag),
              e(window).off("mouseup", this.scrollbar_drag),
              this.$scrollbar_container.removeClass("active"),
              this.$glass.hide(),
              !1
            );
          switch (t.type) {
            case "mousedown":
              (this.drag_x = t.clientX),
                (this.drag_y = t.clientY),
                (this.scroll_x = this.$content_container.scrollLeft()),
                (this.scroll_y = this.$content_container.scrollTop()),
                e(window).on("mousemove", this.scrollbar_drag),
                e(window).one("mouseup", this.scrollbar_drag),
                this.$scrollbar_container.addClass("active"),
                this.$glass.show();
              break;
            case "mousemove":
              this.$content_container.scrollTop(
                this.scroll_y + (t.clientY - this.drag_y) / this.scroll_ratio
              );
              break;
            case "mouseup":
              this.scrollbar_drag(!1);
          }
        },
        update_scrollbar_height: function () {
          var e = this.$content_container.height(),
            t = this.$content_container.children().outerHeight(),
            i = e / t;
          i < 1
            ? this.$scrollbar_container.removeClass("no_scroll")
            : this.$scrollbar_container.addClass("no_scroll"),
            this.$scrollbar_position.height(
              Math.max(0, Math.min(100 * i, 100)) + "%"
            ),
            (this.scroll_ratio = e / t),
            this.update_scrollbar_position();
        },
        update_scrollbar_position: function () {
          this.$scrollbar_position.css(
            "top",
            this.$content_container.scrollTop() * this.scroll_ratio
          );
        },
        trigger_scroll_update: function () {
          this.trigger("popover_scroll");
        },
        button_label: function (t, i) {
          var s = this.$(t),
            o = s.children(".button_label");
          if (
            ((o && o.length) ||
              (o = e('<span class="button_label"></span>')
                .text(s.text())
                .appendTo(s.text(""))),
            i)
          ) {
            var n = s.data(i) || o.text();
            o.text(n);
          }
        },
        button_spinner: function (t, i) {
          var s = this.$(t);
          this.button_label(s);
          var n = s.children(".button_loader");
          (n && n.length) ||
            (n = e('<span class="button_loader"></span>').appendTo(s));
          var a =
            s.data("loader") ||
            o.Loader({
              color: "#ffffff",
              top: "0",
              left: "0",
              position: "absolute",
              className: "",
            });
          s.data("loader", a),
            i
              ? (s.addClass("loading"), a.start(n))
              : (s.removeClass("loading"), a.stop());
        },
        switch_panel: function (t) {
          this.trigger(
            "switch_panel",
            e(t.currentTarget).data("panel") || "customize"
          );
        },
        save_settings: function () {
          this.trigger("save_blog");
        },
        buy_theme: function () {
          this.trigger("buy_theme");
        },
        resize_mousedown: function (t) {
          t.ctrlKey ||
            ((this.initial_size = this.$content_container.width()),
            (this.start_x = t.pageX),
            (this.start_y = t.pageY),
            (this.max_width = Math.max(
              this.width || 0,
              e(window).width() - 100
            )),
            this.$glass.show().addClass("resizing"),
            e(window).on({
              mousemove: this.resize_mousemove,
              mouseup: this.resize_mouseup,
            }));
        },
        resize_mousemove: function (e) {
          var t = e.pageX - this.start_x || 0;
          this.set_width(this.initial_size + t),
            this.trigger("set_panel_size", this.manual_width, !0, !1);
        },
        resize_mouseup: function () {
          this.$glass.hide().removeClass("resizing"),
            e(window).off({
              mousemove: this.resize_mousemove,
              mouseup: this.resize_mouseup,
            });
        },
        force_into_view: function (i, s, o) {
          var n = this.$content_container,
            a = i.closest(n);
          a.length || (a = e(window)),
            s || (s = 0),
            "undefined" != typeof o || (o = s);
          var r,
            l = t.result(a.offset(), "top") || 0,
            h = a.outerHeight(),
            _ = l + h,
            c = n.scrollTop() || 0,
            d = t.result(i.offset(), "top") || 0,
            p = d + i.outerHeight();
          return (
            (r = s - d + l),
            r > 0
              ? (n.animate({ scrollTop: c - r }, 100), !0)
              : ((r = o - _ + p),
                r > 0 && (n.animate({ scrollTop: c + r }, 100), !0))
          );
        },
        show_tooltip_event: function (e) {
          this.show_tooltip(e.currentTarget);
        },
        hide_tooltip_event: function (e) {
          this.hide_tooltip(e.currentTarget);
        },
        show_tooltip: function (i, s) {
          var o = e(i),
            n = o.data("tooltip");
          n ||
            ((n = o.find(".tooltip").clone().addClass("hide")),
            this.$popover_container_content.append(n)),
            o.data("tooltip", n),
            "undefined" != typeof s && n.text(s),
            n.css({
              top:
                o.offset().top -
                this.$content_container.offset().top +
                this.$content_container.scrollTop() +
                0.5 * o.outerHeight(),
              left:
                o.offset().left -
                this.$content_container.offset().left +
                this.$content_container.scrollLeft() +
                o.outerWidth(),
            }),
            t.defer(function () {
              n.removeClass("hide");
            }),
            this.trigger_scroll_update(),
            this.enable_sync_scroll();
        },
        hide_tooltip: function (t) {
          var i = e(t),
            s = i.data("tooltip");
          s && (s.addClass("hide"), this.disable_sync_scroll());
        },
        create_error_tag: function (i, s, o) {
          var n = e(s);
          if (!n.length) return !1;
          var a = e("<div/>").addClass("error_tag hide").text(i);
          o && a.attr("data-field", o),
            a.css({
              top:
                n.offset().top -
                this.$content_container.offset().top +
                this.$content_container.scrollTop() +
                0.5 * n.outerHeight(),
              left:
                n.offset().left -
                this.$content_container.offset().left +
                this.$content_container.scrollLeft() +
                n.outerWidth(),
            }),
            this.$popover_container_content.append(a),
            t.defer(function () {
              a.removeClass("hide");
            });
        },
        mark_errors: function (e) {
          this.clear_errors(),
            t.each(
              e,
              t.bind(function (e, t) {
                var i = this.$('[name="' + t + '"]').closest(
                  ".field_row_input"
                );
                i.addClass("error"), e && this.create_error_tag(e, i, t);
              }, this)
            ),
            this.trigger_scroll_update(),
            this.enable_sync_scroll();
        },
        clear_errors: function () {
          this.$("field_row_input.error").removeClass("error"),
            this.$popover_container.find(".error_tag").remove(),
            this.disable_sync_scroll();
        },
        clear_error: function (t) {
          var i = e(
              "string" == typeof t ? '.field_row_input [name="' + t + '"]' : t
            ),
            s = i.attr("name") || i.attr("id"),
            o =
              i.closest(".field_row_input.error").removeClass("error").length >
              0;
          return (
            this.$popover_container
              .find('.error_tag[data-field="' + s + '"]')
              .remove(),
            o
          );
        },
        toggle_save_button: function (e) {
          var t = this.$('[data-action="save_settings"]');
          e
            ? (t.removeClass("disabled"), this.button_label(t, "save"))
            : (t.addClass("disabled"), this.button_label(t, "saved"));
        },
        save_complete: function () {
          this.button_spinner('[data-action="save_settings"]', !1);
        },
        exit: function () {
          var e,
            t,
            i = /[?&]redirect_to=([^&]*)/.exec(window.location.search);
          !i ||
            /^\s*javascript/.test(i[1]) ||
            (i[1].indexOf("http") === -1 && i[1].indexOf("/") === -1) ||
            ((e = decodeURIComponent(i[1].replace(/\+/g, " "))),
            (t = e.indexOf("#")) > 0 && (e = e.substr(0, t))),
            this.trigger("exit", e || "/dashboard");
        },
        show_secondary_bar: function () {
          this.$el.addClass("show_secondary_bar");
        },
        hide_secondary_bar: function () {
          this.$el.removeClass("show_secondary_bar");
        },
        show_bottom_bar: function () {
          this.$el.addClass("show_bottom_bar");
        },
        hide_bottom_bar: function () {
          this.$el.removeClass("show_bottom_bar");
        },
        initial_show_action: function () {},
        show_panel: function (i, s) {
          s && this.$(".title_bar_container").height(s),
            "left" === i && this.$el.removeClass("left").addClass("right"),
            "right" === i && this.$el.removeClass("right").addClass("left"),
            this.$el.removeClass("hidden"),
            t.defer(
              t.bind(function () {
                this.$el.removeClass("left right"),
                  this.$(".title_bar_container").height(""),
                  this.update_scrollbar_height();
              }, this)
            ),
            e(window).on("keydown", this.panel_keydown),
            e(window).on("keyup", this.panel_keyup);
        },
        hide_panel: function (i, s) {
          "left" === i && this.$el.removeClass("right").addClass("left"),
            "right" === i && this.$el.removeClass("left").addClass("right"),
            s && this.$(".title_bar_container").height(s),
            t.delay(
              t.bind(function () {
                this.$el.addClass("hidden"),
                  this.$(".title_bar_container").height("");
              }, this),
              e("body").hasClass("slow") ? 3e3 : 400
            );
        },
        update_select_label: function (t) {
          var i = e(t.currentTarget);
          i.siblings(".current_selection").text(i.children(":selected").text());
        },
        on_popover_show: function (e, i) {
          (i = t.extend({ clearance_top: 10, clearance_bottom: 10 }, i)),
            this.force_into_view(e.$el, i.clearance_top, i.clearance_bottom),
            this.trigger_scroll_update(),
            this.enable_sync_scroll();
        },
        on_popover_hide: function (e) {
          this.disable_sync_scroll();
        },
        enable_sync_scroll: function () {
          this.$content_container.on("scroll", this.trigger_scroll_update);
        },
        disable_sync_scroll: function () {
          this.$content_container.off("scroll", this.trigger_scroll_update);
        },
        render: function () {},
      },
      {
        to_option_params: function (e, t, i) {
          var s = e.match(/(?:([^:]+):)?(.*)/),
            o = { key: e, value: t };
          return (
            (o.type = s[1] || ""),
            (o.display_name = s[2] || ""),
            (o.name =
              (o.type ? o.type + "_" : "") +
              o.display_name.replace(/\s/g, "_").toLowerCase()),
            (o.default_value = i || ""),
            o
          );
        },
        page_template: t.template(
          '            <div class="page<% if (native_uri) { %> override<% } %> sortable_item" data-page-id="<%= id %>">                <div class="drag_anchor"></div>                <div class="name"                    <% if (native_uri) { %> title="<%= __("This page overrides a built-in URL.") %>"<% } %>                    data-edit-page="<%= id %>"><%= request_uri %></div>                <div class="delete" data-delete-page="<%= id %>"><%= __("Delete") %></div>            </div>'
        ),
      }
    );
    n.PanelView = a;
  })(
    window.jQuery,
    window._,
    window.Backbone,
    window.Tumblr.Customize,
    window.Tumblr,
    window.Tumblr.Customize
  ) /*! scripts/customize_v3/view/customize_view.js */,
  (function (e, t, i, s, o) {
    "use strict";
    var n = i.PanelView.extend({
      events: t.defaults(
        {
          'click [data-action="reset_theme"]': "reset_theme",
          'click [data-action="new_page"]': "edit_page",
          "click [data-edit-page]": "edit_page",
          "click [data-delete-page]": "delete_page",
        },
        i.PanelView.prototype.events
      ),
      initialize: function (e) {
        (this.resize = !1),
          (this.width = 300),
          (this.blog = e.blog || i.blog),
          (this.global_params = e.global_params || i.global_params),
          (this.theme = e.theme || i.theme),
          (this.theme_params = e.theme_params || i.theme_params),
          (this.theme_preview = e.theme_preview || i.theme_preview),
          (this.sortablePages = null),
          this.blog.on("reset", this.render_appearance_params, this),
          this.global_params.on("change", this.determine_special_params, this),
          this.global_params.on("reset", this.render_appearance_params, this),
          this.theme.on("change", this.render_current_theme, this),
          this.theme.on("reset", this.render_current_theme, this),
          this.theme_params.on("reset", this.render_theme_params, this),
          this.blog.pages.on("change:id", this.renderPages, this),
          this.blog.pages.on("add", this.renderPages, this),
          this.blog.pages.on("remove", this.renderPages, this),
          (this.image_data_map = e.image_data_map || i.image_data_map),
          (this.resolve_special_param = t.bind(
            this.resolve_special_param,
            this
          )),
          this.constructor.__super__.initialize.apply(this, arguments);
      },
      edit_page: function (t) {
        this.trigger("edit_page", e(t.currentTarget).data("edit-page"));
      },
      delete_page: function (t) {
        var i = e(t.currentTarget).data("delete-page"),
          o = this;
        s.Dialog.confirm(__("Delete this page?"), function () {
          o.trigger("delete_page", i);
        });
      },
      sortPages: function () {
        var i = t.map(
          this.$(this.sortablePages.itemSelector).toArray(),
          function (t) {
            return e(t).data("page-id");
          },
          this
        );
        this.trigger("sort_pages", i);
      },
      determine_special_params: function (e) {
        this._special_params = this.global_params.special_param_exports();
        var i = t.transform(
          this.global_params.changed,
          function (e, i, s) {
            e.push("{" + t.camelCase("_" + s) + "}"),
              "link_color" === s && e.push("{AccentColor}");
          },
          []
        );
        t.each(
          this.theme_param_views,
          function (e) {
            var s = t.trim(e.view_model.get_model_value());
            t.contains(i, s) &&
              (e.view_model.copy_from_model({ silent: !0 }), e.render());
          },
          this
        );
      },
      reset_theme: function () {
        this.trigger("reset_theme_params");
      },
      to_boolean: function (e) {
        return (
          (e = t.trim("" + e).toLowerCase()),
          "true" === e ||
            "0" === e ||
            ("false" !== e &&
              "1" !== e &&
              "null" !== e &&
              "undefined" !== e &&
              !!e)
        );
      },
      resolve_special_param: function (e, t) {
        return (
          this._special_params || this.determine_special_params(),
          i.ThemeParams.resolve_special_param(e, this._special_params, t)
        );
      },
      initial_show_action: function () {
        t.each(
          this.appearance_param_views,
          function (e) {
            t.has(e, "autosize_textarea") && e.autosize_textarea.render();
          },
          this
        ),
          t.each(
            this.theme_param_views,
            function (e) {
              t.has(e, "autosize_textarea") && e.autosize_textarea.render();
            },
            this
          );
      },
      show_panel: function () {
        this.constructor.__super__.show_panel.apply(this, arguments),
          t.each(
            this.appearance_param_views,
            function (e) {
              t.has(e, "autosize_textarea") && e.autosize_textarea.render();
            },
            this
          ),
          t.each(
            this.theme_param_views,
            function (e) {
              t.has(e, "autosize_textarea") && e.autosize_textarea.render();
            },
            this
          );
      },
      set_theme_editable: function (e) {
        e
          ? (this.$("#edit_html_button").show(),
            this.$('[data-action="save_settings"]').show(),
            this.$('[data-action="buy_theme"]').hide())
          : (this.$("#edit_html_button").hide(),
            this.$('[data-action="save_settings"]').hide(),
            this.$('[data-action="buy_theme"]').show());
      },
      render_current_theme: function () {
        logger.debug("Customize: render_current_theme()");
        var e = this.theme.toJSON();
        e.id && "0" !== e.id
          ? ((e.by_line = e.author_name ? "by " + e.author_name : ""),
            (e.thumbnail =
              "https://66.media.tumblr.com/themes/wide/" +
              e.wide_thumbnail_key +
              ".png"),
            this.$("#current_theme_module .current_theme").removeClass(
              "custom_html"
            ))
          : ((e.title = __("Custom theme")),
            (e.author_name = ""),
            (e.by_line = ""),
            (e.thumbnail = ""),
            this.$("#current_theme_module .current_theme").addClass(
              "custom_html"
            )),
          this.$("#current_theme_title").text(e.title).attr("title", e.by_line),
          e.thumbnail &&
            this.$("#current_theme_thumbnail").attr("src", e.thumbnail),
          (this.can_edit =
            this.blog.get("name") === e.demo_tumblelog_name ||
            !t.parseInt(e.id) ||
            !t.parseInt(e.premium) ||
            t(this.blog.get("purchased_theme_ids")).include(this.theme.id)),
          this.set_theme_editable(this.can_edit);
      },
      render_all_params: function () {
        logger.debug("Customize: render_all_params()"),
          this.render_appearance_params(),
          this.render_open_graph_params(),
          this.render_link_handling_params(),
          this.render_theme_params();
      },
      render_appearance_params: function () {
        logger.debug("Customize: render_appearance_params()");
        var s = e("#fields_global");
        t.each(
          this.appearance_param_views,
          function (e) {
            this.stopListening(e), e.remove();
          },
          this
        ),
          (this.appearance_param_views = []),
          s.empty();
        var o = {
          data_map: this.image_data_map,
          on_popover_show: this.on_popover_show,
          on_popover_hide: this.on_popover_hide,
          content_container: this.$content_container,
          popover_container: this.$popover_container_content,
          model: this.global_params,
        };
        this.appearance_param_views.push(
          i.ParamView.from_type(
            "text",
            t.defaults(
              {
                id: "blog_title",
                model: this.blog,
                key: "title",
                name: __("Title"),
                debounce: 0,
              },
              o
            )
          ),
          i.ParamView.from_type(
            "text",
            t.defaults(
              {
                id: "blog_description",
                model: this.blog,
                key: "description",
                name: __("Description"),
                debounce: 0,
              },
              o
            )
          ),
          i.ParamView.from_type(
            "image",
            t.defaults(
              {
                id: "blog_header_image",
                key: "header_image",
                name: __("Header image"),
                default_value: this.global_params.defaults.header_image,
                upload_text: __("Choose a photo"),
                reset_text: __("Reset"),
                remove_text: __("Remove"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "image",
            t.defaults(
              {
                id: "blog_avatar",
                model: this.blog,
                key: "avatar_url",
                name: __("Avatar"),
                default_value: !1,
                upload_text: __("Choose a photo"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "shape",
            t.defaults(
              {
                id: "blog_avatar_shape",
                key: "avatar_shape",
                name: __("Avatar shape"),
                select_options: { square: __("Square"), circle: __("Circle") },
              },
              o
            )
          ),
          i.ParamView.from_type(
            "font",
            t.defaults(
              {
                id: "blog_title_font",
                key: "title_font",
                weight_key: "title_font_weight",
                name: __("Title font"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "color",
            t.defaults(
              {
                id: "blog_background_color",
                key: "background_color",
                name: __("Background color"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "color",
            t.defaults(
              {
                id: "blog_title_color",
                key: "title_color",
                name: __("Title color"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "color",
            t.defaults(
              {
                id: "blog_accent_color",
                key: "link_color",
                name: __("Accent color"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "if",
            t.defaults(
              {
                id: "blog_show_header_image",
                key: "show_header_image",
                name: __("Show header image"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "if",
            t.defaults(
              {
                id: "blog_header_stretch",
                key: "header_stretch",
                name: __("Stretch header image"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "if",
            t.defaults(
              {
                id: "blog_show_avatar",
                key: "show_avatar",
                name: __("Show avatar"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "if",
            t.defaults(
              {
                id: "blog_show_title",
                key: "show_title",
                name: __("Show title"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "if",
            t.defaults(
              {
                id: "blog_show_description",
                key: "show_description",
                name: __("Show description"),
              },
              o
            )
          ),
          i.ParamView.from_type(
            "if",
            t.defaults(
              {
                id: "blog_show_new_post_styles",
                key: "show_new_post_styles",
                name: __("Use new post types"),
                tooltip: __(
                  "Enable this for new features, disable if your Tumblr posts aren’t formatted properly."
                ),
              },
              o
            )
          )
        ),
          t.each(
            this.appearance_param_views,
            function (e) {
              this.listenTo(e, "resize", this.update_scrollbar_height),
                s.append(e.$el),
                e.render();
            },
            this
          ),
          this.supported_appearance_param_visibility();
      },
      supported_appearance_param_visibility: function () {
        var e = !1,
          i = this.global_params.supported_params;
        t.each(
          this.appearance_param_views,
          function (s) {
            s.model === this.global_params &&
              (t.contains(i, s.view_model.get("key"))
                ? ((e = !0), s.$el.removeClass("hidden"))
                : s.$el.addClass("hidden"));
          },
          this
        );
      },
      render_open_graph_params: function () {
        logger.debug("Customize: render_open_graph_params()");
        var s = e("#fieldset_open_graph");
        t.each(
          this.open_graph_param_views,
          function (e) {
            this.stopListening(e), e.remove();
          },
          this
        ),
          (this.open_graph_param_views = []),
          s.empty();
        var o = {
          data_map: this.image_data_map,
          on_popover_show: this.on_popover_show,
          on_popover_hide: this.on_popover_hide,
          content_container: this.$content_container,
          popover_container: this.$popover_container_content,
          model: this.global_params,
        };
        this.open_graph_param_views.push(
          i.ParamView.from_type(
            "text",
            t.defaults(
              {
                id: "open_graph_title",
                model: this.blog,
                key: "open_graph_title",
                name: __("Title"),
                debounce: 0,
              },
              o
            )
          ),
          i.ParamView.from_type(
            "text",
            t.defaults(
              {
                id: "open_graph_description",
                model: this.blog,
                key: "open_graph_description",
                name: __("Description"),
                debounce: 0,
              },
              o
            )
          )
        ),
          t.each(
            this.open_graph_param_views,
            function (e) {
              this.listenTo(e, "resize", this.update_scrollbar_height),
                s.append(e.$el),
                e.render();
            },
            this
          );
      },
      render_link_handling_params: function () {
        logger.debug("Customize: render_link_handling_params()");
        var s = e("#fieldset_link_handling");
        t.each(
          this.link_handling_param_views,
          function (e) {
            this.stopListening(e), e.remove();
          },
          this
        ),
          (this.link_handling_param_views = []),
          s.empty();
        var o = {
          data_map: this.image_data_map,
          on_popover_show: this.on_popover_show,
          on_popover_hide: this.on_popover_hide,
          content_container: this.$content_container,
          popover_container: this.$popover_container_content,
          model: this.global_params,
        };
        this.link_handling_param_views.push(
          i.ParamView.from_type(
            "if",
            t.defaults(
              {
                id: "better_link_decoding",
                model: this.blog,
                key: "better_link_decoding",
                name: __("Use better tagged and search URL decoding"),
                tooltip: __(
                  "Enable this for more reliable URL parsing for your search and tagged pages; you may need to redo any existing bookmarks or links."
                ),
              },
              o
            )
          )
        ),
          t.each(
            this.link_handling_param_views,
            function (e) {
              this.listenTo(e, "resize", this.update_scrollbar_height),
                s.append(e.$el),
                e.render();
            },
            this
          );
      },
      render_theme_params: function () {
        logger.debug("Customize: render_theme_params()"),
          t.each(
            this.theme_param_views,
            function (e) {
              this.stopListening(e), e.remove();
            },
            this
          ),
          (this.theme_param_views = []),
          e("#fieldset_theme .fieldset_group").empty(),
          t.each(
            this.theme_params.keys(),
            function (e) {
              if ("select_lists" !== e) {
                var t = i.ThemeParams.parse_key(e);
                if (t.type) {
                  switch (
                    ((t.name = __(t.name)),
                    (t.data_map = this.image_data_map),
                    (t.id = "theme_param_" + t.id),
                    (t.model = this.theme_params),
                    (t.on_popover_show = this.on_popover_show),
                    (t.on_popover_hide = this.on_popover_hide),
                    (t.content_container = this.$content_container),
                    (t.popover_container = this.$popover_container_content),
                    t.type)
                  ) {
                    case "if":
                      t.model_to_view_filter = this.to_boolean;
                      break;
                    case "image":
                      (t.model_to_view_filter = this.resolve_special_param),
                        (t.upload_text = __("Choose a photo")),
                        (t.reset_text = __("Reset")),
                        (t.remove_text = __("Remove"));
                      break;
                    case "color":
                      t.model_to_view_filter = this.resolve_special_param;
                      break;
                    case "font":
                      (t.model_to_view_filter = this.resolve_special_param),
                        t.model.has("select:" + t.name + " weight") &&
                          (t.weight_key = "select:" + t.name + " weight");
                      break;
                    case "select":
                      if (t.model.has("font:" + t.name.replace(/ weight$/, "")))
                        return;
                      t.select_options =
                        this.theme_params.select_list_lookup(e);
                  }
                  this.theme_param_views.push(i.ParamView.from_type(t.type, t));
                }
              }
            },
            this
          ),
          this.theme_param_views.length
            ? e("#theme_params_module").show()
            : e("#theme_params_module").hide(),
          t.each(
            this.theme_param_views,
            function (t) {
              this.listenTo(t, "resize", this.update_scrollbar_height),
                e("#fields_" + t.type).append(t.$el),
                t.render();
            },
            this
          );
      },
      renderPages: function () {
        logger.debug("Customize: render_pages()"),
          this.$("#customize_pages").empty();
        var e = this.blog.pages.toJSON(),
          i = s.Customize.PanelView.page_template;
        t.forEach(
          e,
          function (e) {
            this.$("#customize_pages").append(i(e)).parent().show();
          },
          this
        ),
          e.length
            ? this.$("#pages_module .navigation_row").removeClass("top_border")
            : this.$("#pages_module .navigation_row").addClass("top_border"),
          this.makePagesSortable();
      },
      makePagesSortable: function () {
        this.sortablePages && this.sortablePages.disableItems(),
          (this.sortablePages = null),
          this.blog.pages.length > 1 &&
            ((this.sortablePages = new s.Prima.SortableView({
              el: this.$("#customize_pages"),
              itemSelector: ".sortable_item",
              afterDragEnd: t.bind(this.sortPages, this),
              transparentPlaceholder: !1,
            })),
            this.sortablePages.reloadItems());
      },
      render: function () {
        this.render_current_theme(),
          this.render_appearance_params(),
          this.render_open_graph_params(),
          this.render_link_handling_params(),
          this.render_theme_params(),
          this.renderPages();
      },
      save_complete: function () {
        i.PanelView.prototype.save_complete.call(this),
          this.render_open_graph_params();
      },
    });
    o.CustomizeView = n;
  })(
    window.jQuery,
    window._,
    window.Tumblr.Customize,
    window.Tumblr,
    window.Tumblr.Customize
  ) /*! scripts/customize_v3/view/advanced_options_view.js */,
  (function (e, t, i, s, o, n) {
    "use strict";
    var a = i.PanelView.extend({
      user_initiated: !1,
      model_initiated: !1,
      initialize: function (e) {
        (this.resize = !1),
          (this.width = 300),
          (this.demo_content = e.demo_content || i.demo_content),
          (this.blog = e.blog || i.blog),
          (this.theme = e.theme || i.theme),
          (this.theme_params = e.theme_params || i.theme_params),
          (this.theme_preview = e.theme_preview || i.theme_preview),
          (this.customize_prefs = e.customize_prefs || i.customize_prefs),
          this.blog.on("reset", this.render_advanced_options, this),
          this.theme.on("change", this.render, this),
          this.theme.on("reset", this.render, this),
          this.customize_prefs.on(
            "change:use_own_posts",
            this.set_demo_content,
            this
          ),
          this.constructor.__super__.initialize.apply(this, arguments);
      },
      panel_keydown: function (t) {
        switch (t.which) {
          case 73:
            if (
              (t.metaKey || t.ctrlKey) &&
              t.shiftKey &&
              t.altKey &&
              !e("#theme_param_import_dialog").length
            )
              return (
                t.preventDefault(),
                t.stopPropagation(),
                i.theme_param_import_dialog(),
                !1
              );
        }
      },
      set_theme_editable: function (e) {
        e
          ? (this.$("#edit_html_button").show(),
            this.$('[data-action="save_settings"]').show(),
            this.$('[data-action="buy_theme"]').hide(),
            this.$(".title_bar").removeClass("hide_title"))
          : (this.$("#edit_html_button").hide(),
            this.$('[data-action="save_settings"]').hide(),
            this.$('[data-action="buy_theme"]').show(),
            this.$(".title_bar").addClass("hide_title"));
      },
      set_demo_content: function (e) {
        e !== !0 && e !== !1 && (e = this.customize_prefs.get("use_own_posts")),
          logger.debug("AdvancedOptions: set_demo_content(" + e + ")"),
          s.Cookie.set("use_own_posts", e ? "1" : "0", 31536e3),
          e
            ? this.demo_content.set("id", i.blog_name)
            : this.demo_content.set(
                "id",
                this.theme.get("demo_tumblelog_name") || i.DEMO_BLOG_NAME
              );
      },
      render_advanced_options: function () {
        logger.debug("Customize: render_advanced_options()");
        var s = e("#fields_advanced");
        t.each(
          this.advanced_param_views,
          function (e) {
            this.stopListening(e), e.remove();
          },
          this
        ),
          (this.advanced_param_views = []),
          s.empty();
        var n = {
            on_popover_show: this.on_popover_show,
            on_popover_hide: this.on_popover_hide,
            content_container: this.$content_container,
            popover_container: this.$popover_container_content,
            model: this.blog,
          },
          a = t.transform(
            t.range(1, 16),
            function (e, t) {
              e[t] = t;
            },
            {},
            this
          );
        if (
          (this.blog.get("is_premium_partner") &&
            (a = Object.assign(a, { 20: 20, 30: 30, 40: 40, 50: 50 })),
          this.advanced_param_views.push(
            i.ParamView.from_type(
              "if",
              t.defaults(
                {
                  id: "blog_open_links_in_new_window",
                  key: "open_links_in_new_window",
                  name: __("Open links in new window"),
                },
                n
              )
            ),
            i.ParamView.from_type(
              "if",
              t.defaults(
                {
                  id: "blog_enable_mobile_interface",
                  key: "enable_mobile_interface",
                  name: __("Use default mobile theme"),
                  tooltip: __(
                    "This will override your theme with a special layout optimized for browsing on mobile devices like iPhone and Android."
                  ),
                },
                n
              )
            ),
            i.ParamView.from_type(
              "if",
              t.defaults(
                {
                  id: "blog_truncate_feed",
                  key: "truncate_feed",
                  name: __("Truncate RSS feed"),
                  tooltip: __(
                    "Shortens posts in your RSS feed so subscribers need to visit your blog to read them in full."
                  ),
                },
                n
              )
            ),
            i.ParamView.from_type(
              "if",
              t.defaults(
                {
                  id: "blog_brag",
                  key: "brag",
                  name: __("Promote Tumblr!"),
                  tooltip: __('Show a "Follow" button to non-Tumblr users.'),
                },
                n
              )
            ),
            i.ParamView.from_type(
              "select",
              t.defaults(
                {
                  id: "blog_demo_content",
                  key: "use_own_posts",
                  name: __("Preview"),
                  model: this.customize_prefs,
                  model_to_view_filter: function (e) {
                    return e ? "own" : "demo";
                  },
                  view_to_model_filter: function (e) {
                    return "own" === e;
                  },
                  select_options: {
                    own: __("My posts"),
                    demo: __("Sample posts"),
                  },
                },
                n
              )
            ),
            i.ParamView.from_type(
              "select",
              t.defaults(
                {
                  id: "blog_posts_per_page",
                  key: "posts_per_page",
                  name: __("Posts per page"),
                  select_options: a,
                },
                n
              )
            )
          ),
          o.feature.blog_network_google_amp)
        ) {
          var r = i.ParamView.from_type(
            "if",
            t.defaults(
              {
                id: "blog_enable_google_amp",
                key: "enable_google_amp",
                name: __("Enable Google AMP"),
                tooltip: __(
                  "Optimizes the way pages appear in search results on mobile devices."
                ),
              },
              n
            )
          );
          this.advanced_param_views.splice(2, 0, r);
        }
        t.each(
          this.advanced_param_views,
          function (e) {
            this.listenTo(e, "resize", this.update_scrollbar_height),
              s.append(e.render().$el);
          },
          this
        ),
          this.custom_css_view ||
            ((this.custom_css_view = i.ParamView.from_type("code", {
              model: this.blog,
              id: "custom_css",
              key: "custom_css",
              name: __("Add custom CSS"),
              editor_mode: "css",
              autoresize: !0,
            }).render()),
            this.listenTo(
              this.custom_css_view,
              "resize",
              this.update_scrollbar_height
            )),
          e("#fields_custom_css").empty().append(this.custom_css_view.$el);
      },
      render: function () {
        logger.debug("AdvancedOptions: render()");
        var e = this.theme.toJSON();
        this.render_advanced_options(),
          (this.can_edit =
            this.blog.get("name") === e.demo_tumblelog_name ||
            !t.parseInt(e.id) ||
            !t.parseInt(e.premium) ||
            t(this.blog.get("purchased_theme_ids")).include(this.theme.id)),
          this.set_theme_editable(this.can_edit);
      },
    });
    n.AdvancedOptionsView = a;
  })(
    window.jQuery,
    window._,
    window.Tumblr.Customize,
    window.Tumblr,
    window.TumblrData,
    window.Tumblr.Customize
  ) /*! scripts/customize_v3/view/edit_html_view.js */,
  (function (e, t, i, s, o) {
    "use strict";
    var n = i.PanelView.extend({
      events: t.defaults(
        {
          'click [data-action="tools"]': "show_tools",
          "click #tools_popover .popover_menu_item a": "hide_tools",
          'click [data-action="find"]': "toggle_find",
          'click [data-action="goto_line"]': "goto_line",
          'click [data-action="word_wrap"]': "toggle_word_wrap",
          'click [data-action="upload_static_file"]': "upload_static_file",
          'click [data-action="submit_theme"]': "submit_theme",
          'click [data-action="submit_theme_later"]': "submit_theme_later",
          'click [data-action="dismiss_bottom_bar"]': "dismiss_bottom_bar",
          "click #tools_popover .popover_menu_item .binary_switch":
            "prevent_default",
          'click [data-action="update_preview"]': "update_theme_html",
        },
        i.PanelView.prototype.events
      ),
      initialize: function (e) {
        (this.changed_html = !1),
          (this.saved_html = !0),
          (this.panel_active = !1),
          (this.theme_author_prompt = e.theme_author_prompt || !1),
          (this.resize = !1),
          (this.width = 600),
          (this.theme = e.theme || i.theme),
          (this.theme_preview = e.theme_preview || i.theme_preview),
          this.theme.on("change", this.handler.theme_change, this),
          this.theme.on("reset", this.handler.theme_reset, this),
          (this.custom_html_preview = e.custom_html),
          this.custom_html_preview && (this.saved_html = !1),
          this.constructor.__super__.initialize.apply(this, arguments);
      },
      handler: {
        theme_change: function () {
          logger.debug("EditHtml: theme_change()"),
            this.theme.changed.id &&
              (this.update_editor_html(),
              this.$('[data-action="submit_theme"]').addClass("disabled"));
        },
        theme_reset: function () {
          logger.debug("EditHtml: theme_reset()"), this.update_editor_html();
        },
      },
      theme_is_submittable: function (e) {
        "undefined" == typeof e && (e = this.theme.get("theme"));
        var i = t.trim(e.replace(/\s{2,}/g, " ", e)).toLowerCase(),
          s = [
            "<!-- tumblr theme #",
            '<meta name="tumblr-theme"',
            "This Tumblr Theme and all of its CSS, Javascript,",
            "and media assets are subject to Tumblr's Terms of Service:",
          ];
        if (
          t.some(s, function (e) {
            return i.indexOf(e.toLowerCase()) !== -1;
          })
        )
          return !1;
        var o = [
          "<html",
          "<body",
          "{rss",
          "{favicon",
          "{customcss",
          "{metadescription",
          "{photoalt",
        ];
        return !t.some(o, function (e) {
          return i.indexOf(e) === -1;
        });
      },
      set_width: function () {
        this.constructor.__super__.set_width.apply(this, arguments),
          this.editor && this.editor.resize();
      },
      show_bottom_bar: function () {
        this.constructor.__super__.show_bottom_bar.apply(this, arguments),
          this.editor && this.editor.resize(),
          this.update_scrollbar_height();
      },
      hide_bottom_bar: function () {
        this.constructor.__super__.hide_bottom_bar.apply(this, arguments),
          this.editor && this.editor.resize(),
          this.update_scrollbar_height();
      },
      show_panel: function () {
        (this.panel_active = !0),
          this.editor
            ? this.update_editor_html(!0)
            : (this.initialize_editor(),
              this.toggle_word_wrap(
                "0" !== s.Cookie.get("customize_word_wrap")
              ),
              this.init_scrollbar()),
          this.editor.focus(),
          this.constructor.__super__.show_panel.apply(this, arguments);
      },
      hide_panel: function () {
        (this.panel_active = !1),
          this.hide_secondary_bar(),
          this.hide_bottom_bar(),
          this.trigger("upload_static_file", !1),
          this.constructor.__super__.hide_panel.apply(this, arguments);
      },
      initialize_editor: function () {
        logger.log("Initializing HTML editor..."),
          (this.editor = ace.edit("editor")),
          (this.editor_session = this.editor.getSession());
        var i = s.ace.mode.tumblr,
          o = s.ace.theme.customize;
        this.editor_session.setUseWorker(!1),
          this.editor_session.setMode(new i()),
          this.editor.setTheme(o),
          this.editor_session.setUseWrapMode(!0),
          this.editor_session.setFoldStyle("manual"),
          this.editor.setShowPrintMargin(!1),
          this.editor_session.setValue(
            this.custom_html_preview || this.theme.unescaped_theme()
          ),
          this.editor.gotoLine(1),
          this.editor.commands.addCommand({
            name: "save",
            bindKey: { win: "Ctrl-S", mac: "Command-S", sender: "editor" },
            exec: t.bind(function () {
              return this.update_theme_html(), !0;
            }, this),
          }),
          this.editor.commands.addCommand({
            name: "soft wrap",
            bindKey: {
              win: "Ctrl-Alt-W",
              mac: "Command-Option-W",
              sender: "editor",
            },
            exec: t.bind(function () {
              return (
                this.editor_session.setUseWrapMode(
                  !this.editor_session.getUseWrapMode()
                ),
                !0
              );
            }, this),
          }),
          this.editor.commands.addCommand({
            name: "Indent lines",
            bindKey: { win: "Ctrl-]", mac: "Command-]", sender: "editor" },
            exec: t.bind(function () {
              var e = this.editor.getSelectionRange();
              return (
                this.editor_session.indentRows(
                  e.start.row,
                  e.end.row,
                  this.editor_session.getTabString()
                ),
                !0
              );
            }, this),
          }),
          this.editor.commands.addCommand({
            name: "Un-indent lines",
            bindKey: { win: "Ctrl-[", mac: "Command-[", sender: "editor" },
            exec: t.bind(function () {
              var e = this.editor.getSelectionRange();
              return this.editor_session.outdentRows(e), !0;
            }, this),
          });
        var n = !1;
        (this.editor.commands.commands.find.exec = t.bind(function (i) {
          ace.config.loadModule(
            "ace/ext/searchbox",
            t.bind(function (s) {
              s.Search(i, !0),
                n ||
                  ((n = !0),
                  (this.editor.searchBox.$searchBarKb.commands[
                    "Ctrl-f|Command-f|Ctrl-H|Command-Option-F"
                  ].exec = function () {}),
                  this.$(".secondary_bar").append(i.searchBox.element),
                  e(i.searchBox.element)
                    .find('[action="replaceAndFindNext"]')
                    .appendTo(e(i.searchBox.element).find(".ace_replace_form")),
                  (i.searchBox.hide = t.bind(function () {
                    this.hide_secondary_bar(),
                      i.keyBinding.removeKeyboardHandler(
                        i.searchBox.$closeSearchBarKb
                      ),
                      i.focus();
                  }, this)),
                  e(i.searchBox.searchInput).focus(),
                  i.on("findSearchBox", function () {
                    e(i.container).addClass("search-highlight"),
                      t.defer(function () {
                        e(i.container).removeClass("search-highlight");
                      });
                  }),
                  e(i.searchBox.element)
                    .find("button")
                    .on("mousedown", this._mouse_active_state)),
                this.show_secondary_bar();
            }, this)
          );
        }, this)),
          this.editor_session.on(
            "change",
            t.bind(this.change_editor_html, this)
          ),
          (this._update_scrollbar_height = t.debounce(
            this.update_scrollbar_height,
            100
          ));
      },
      change_editor_html: function () {
        (this.changed_html = !0),
          this.toggle_update_button(this.changed_html),
          this._update_scrollbar_height();
      },
      update_preview_html: function () {
        this.editor_session &&
          (logger.warn("Updating preview only..."),
          this.theme_preview.set(
            "__theme_html",
            this.editor_session.getValue()
          ));
      },
      update_theme_html: function () {
        if (this.editor_session) {
          logger.warn("Updating theme HTML...");
          var e = this.editor_session.getValue();
          e !== this.theme.get("theme")
            ? this.theme
                .clear({ silent: !0 })
                .set({
                  id: 0,
                  title: "",
                  default_params: i.ThemeParams.from_html(e),
                  theme: e,
                })
            : (logger.warn("Theme HTML hasn't changed! Forcing refresh..."),
              this.trigger("refresh_preview")),
            this.custom_html_preview &&
              this.button_spinner('[data-action="update_preview"]', !1),
            (this.custom_html_preview = !1),
            !parseInt(this.theme.id, 10) &&
              this.theme_author_prompt &&
              this.theme_is_submittable(e) &&
              (this.show_bottom_bar(), (this.theme_author_prompt = !1)),
            this.changed_html && (this.saved_html = !1),
            (this.changed_html = !1),
            this.render();
        }
      },
      update_editor_html: function (e) {
        if (this.editor_session) {
          if (!this.panel_active)
            return void logger.warn(
              "Edit HTML panel is not active. Skipping editor update"
            );
          logger.warn("Replacing editor HTML content"),
            e && (this.custom_html_preview = !1),
            this.editor_session.setValue(
              this.custom_html_preview || this.theme.unescaped_theme()
            ),
            this.changed_html && !e && (this.saved_html = !1),
            (this.changed_html = !1),
            this.render();
        }
      },
      init_tools_popover: function () {
        var t = e("#tools_popover"),
          i = t.get(0);
        (this.tools_popover = new s.MultiPopover(i, {
          token: "edit-html-plexi",
        }).show()),
          t.on("mouseenter", ".popover_menu_item:first-child", function () {
            t.addClass("hover_first");
          }),
          t.on("mouseleave", ".popover_menu_item:first-child", function () {
            t.removeClass("hover_first");
          }),
          new s.BinarySwitch({ el: t.find('input[type="checkbox"]') }).render();
      },
      show_tools: function () {
        this.tools_popover
          ? this.tools_popover.show()
          : this.init_tools_popover(),
          !parseInt(this.theme.id, 10) &&
          this.theme_is_submittable(this.editor_session.getValue())
            ? this.tools_popover.$container
                .find('[data-action="submit_theme"]')
                .removeClass("disabled")
            : this.tools_popover.$container
                .find('[data-action="submit_theme"]')
                .addClass("disabled");
        var e = this.$('[data-action="tools"]'),
          t = e.offset();
        this.tools_popover.$container.css({
          left: t.left + 0.5 * e.width() - 30,
          top: t.top + e.height() + 15,
        });
      },
      hide_tools: function () {
        this.tools_popover && this.tools_popover.hide();
      },
      toggle_find: function () {
        this.editor || this.initialize_editor(),
          this.editor.searchBox && this.$el.hasClass("show_secondary_bar")
            ? this.editor.searchBox.hide()
            : this.editor.execCommand("find"),
          this.hide_tools();
      },
      goto_line: function () {
        this.editor || this.initialize_editor(),
          this.editor.execCommand("gotoline"),
          this.hide_tools();
      },
      toggle_word_wrap: function (e) {
        this.editor || this.initialize_editor();
        var t =
          "boolean" == typeof e ? e : !this.editor_session.getUseWrapMode();
        t
          ? (this.$(
              '.popover_menu_item[data-action="word_wrap"] input[type="checkbox"]'
            ).prop("checked", !0),
            this.editor_session.setUseWrapMode(!0))
          : (this.$(
              '.popover_menu_item[data-action="word_wrap"] input[type="checkbox"]'
            ).prop("checked", !1),
            this.editor_session.setUseWrapMode(!1)),
          s.Cookie.set("customize_word_wrap", t ? "1" : "0", 31536e3);
      },
      upload_static_file: function () {
        this.hide_tools(), this.trigger("upload_static_file");
      },
      submit_theme: function (t) {
        if (!this.theme.id || "0" === this.theme.id) {
          t.preventDefault(), t.stopPropagation();
          var i = e(
            '<form action="/themes/new" method="post" target="_blank" class="hidden"></form>'
          );
          e('<textarea name="customize_theme"></textarea>')
            .val(this.theme.get("theme"))
            .appendTo(i),
            e('<input type="hidden" name="form_key"/>')
              .val(e("#form_key").val())
              .appendTo(i),
            i.appendTo("body").submit().remove(),
            this.hide_bottom_bar();
        }
      },
      submit_theme_later: function () {
        this.dismiss_bottom_bar(),
          this.show_tooltip(
            this.$('[data-action="tools"]'),
            __(
              "If you ever want to share this theme with Tumblr, the option is in here."
            )
          ),
          t.delay(
            t.bind(function () {
              this.hide_tooltip(this.$('[data-action="tools"]'));
            }, this),
            4e3
          );
      },
      dismiss_bottom_bar: function () {
        this.hide_bottom_bar(), this.trigger("dismiss_theme_author_prompt");
      },
      init_scrollbar: function () {
        if (this.editor) {
          (this.editor_scrollbar = this.editor.renderer.scrollBar),
            (this.$editor_scrollbar_el = e(this.editor_scrollbar.element)),
            (this.$editor_scrollbar_inner = e(this.editor_scrollbar.inner));
          var i = !1;
          (i =
            "onwheel" in document.createElement("div")
              ? "wheel"
              : void 0 !== document.onmousewheel
              ? "mousewheel"
              : "DOMMouseScroll"),
            this.editor_session.on(
              "changeScrollTop",
              t.bind(this.update_scrollbar_position, this)
            ),
            this.$content_container.addClass("custom_scrollbar"),
            (this.$scrollbar_container = e(
              '<div class="scrollbar_container"></div>'
            ).appendTo(this.$el)),
            (this.$scrollbar_position = e(
              '<div class="scrollbar_position"></div>'
            ).appendTo(this.$scrollbar_container)),
            (this.$scrollbar_pill = e(
              '<div class="scrollbar_pill"></div>'
            ).appendTo(this.$scrollbar_position)),
            (this._scrollbar_drag = t.bind(this.scrollbar_drag, this)),
            this.$scrollbar_position.on("mousedown", this._scrollbar_drag);
          var s = 0,
            o = 0,
            n = this.editor,
            a = t.debounce(function () {
              (s = 0),
                (o =
                  n.getSession().getScreenLength() * n.renderer.lineHeight +
                  n.renderer.scrollBar.getWidth() -
                  n.container.offsetHeight);
            }, 100),
            r = this.$content_container,
            l = this.editor.renderer;
          r.add(this.$scrollbar_container).on(i, function (e) {
            a();
            var t = 0;
            switch (e.type) {
              case "wheel":
                t = -e.originalEvent.deltaY;
                break;
              case "mousewheel":
                t = e.originalEvent.wheelDelta;
                break;
              case "DOMMouseScroll":
                t = -(e.originalEvent.deltaY || 40 * e.originalEvent.detail);
            }
            (t *= 0.4), l.scrollToY(Math.max(s, Math.min(l.scrollTop - t, o)));
          }),
            this.on("panel:resize", this._update_scrollbar_height, this),
            this._update_scrollbar_height();
        }
      },
      scrollbar_drag: function (t) {
        if (!t)
          return (
            (this.drag_x = 0),
            (this.drag_y = 0),
            (this.scroll_x = 0),
            (this.scroll_y = 0),
            e(window).off("mousemove", this._scrollbar_drag),
            e(window).off("mouseup", this._scrollbar_drag),
            this.$scrollbar_container.removeClass("active"),
            this.$glass.hide(),
            !1
          );
        switch (t.type) {
          case "mousedown":
            (this.drag_x = t.clientX),
              (this.drag_y = t.clientY),
              (this.scroll_x = this.editor.renderer.scrollLeft),
              (this.scroll_y = this.editor.renderer.scrollTop),
              e(window).on("mousemove", this._scrollbar_drag),
              e(window).one("mouseup", this._scrollbar_drag),
              this.$scrollbar_container.addClass("active"),
              this.$glass.show();
            break;
          case "mousemove":
            var i = Math.max(
              0,
              this.scroll_y + (t.clientY - this.drag_y) / this.scroll_ratio
            );
            this.max_scroll_top &&
              i > this.max_scroll_top &&
              (i = this.max_scroll_top),
              this.editor.renderer.scrollToY(i);
            break;
          case "mouseup":
            this.scrollbar_drag(!1);
        }
      },
      update_scrollbar_height: function () {
        this.$editor_scrollbar_el.show();
        var e = this.$editor_scrollbar_el.height(),
          t = this.$editor_scrollbar_inner.height();
        this.max_scroll_top = t - e;
        var i = e / t;
        i < 1
          ? this.$scrollbar_container.removeClass("no_scroll")
          : this.$scrollbar_container.addClass("no_scroll"),
          this.$scrollbar_position.height(
            Math.max(0, Math.min(100 * i, 100)) + "%"
          ),
          (this.scroll_ratio = e / t),
          this.update_scrollbar_position(),
          this.$editor_scrollbar_el.hide();
      },
      update_scrollbar_position: function () {
        this.$scrollbar_position.css(
          "top",
          this.editor.renderer.scrollTop * this.scroll_ratio
        );
      },
      switch_panel: function () {
        return this.custom_html_preview || this.changed_html
          ? (s.Dialog.confirm(
              __("Close without saving HTML?"),
              t.bind(function () {
                this.custom_html_preview &&
                  (this.trigger("refresh_preview", !0),
                  (this.custom_html_preview = !1)),
                  this.constructor.__super__.switch_panel.apply(
                    this,
                    arguments
                  );
              }, this)
            ),
            !0)
          : void this.constructor.__super__.switch_panel.apply(this, arguments);
      },
      save_settings: function () {
        this.custom_html_preview &&
          (this.update_theme_html(),
          this.button_spinner('[data-action="update_preview"]', !1)),
          this.constructor.__super__.save_settings.apply(this, arguments);
      },
      toggle_save_button: function (e) {
        var t = this.$('[data-action="save_settings"]');
        e
          ? (t.removeClass("disabled"), this.button_label(t, "save"), t.show())
          : (t.addClass("disabled"), this.button_label(t, "saved"), t.hide());
      },
      save_complete: function (e) {
        this.custom_html_preview ||
          (this.button_spinner('[data-action="save_settings"]', !1),
          (e || "undefined" == typeof e) &&
            ((this.saved_html = !0), this.render()));
      },
      toggle_update_button: function (e) {
        var t = this.$('[data-action="update_preview"]');
        e ? t.removeClass("disabled") : t.addClass("disabled");
      },
      render: function () {
        this.toggle_save_button(!this.saved_html),
          this.toggle_update_button(this.changed_html),
          this.editor && this.update_scrollbar_height();
      },
    });
    o.EditHtmlView = n;
  })(
    window.jQuery,
    window._,
    window.Tumblr.Customize,
    window.Tumblr,
    window.Tumblr.Customize
  ) /*! scripts/customize_v3/view/edit_page_view.js */,
  (function (e, t, i, s, o) {
    "use strict";
    s.Customize.EditPageView = s.Customize.PanelView.extend({
      events: t.defaults(
        {
          'click [data-action="close_page"]': "close_page",
          'click [data-action="save_page"]': "save_page",
          'click [data-action="update_preview"]': "update_page_preview",
          'focus [name="page[label]"]': "enable_show_link",
          'change [name="page[show_link]"]': "focus_page_label",
          "change input, textarea, select": "change_field",
        },
        i.PanelView.prototype.events
      ),
      initialize: function (e) {
        (this.changed_page = !1),
          (this.saved_page = !0),
          (this.editor_type = e.editor_type || "rich"),
          (this.resetting_page = !1),
          (this.editor = !1),
          (this.setting_editor = !1),
          (this.resize = !1),
          (this.width = 600),
          (this.$title = this.$(".title_header")),
          (this.$page_label = this.$('[name="page[label]"]')),
          (this.original_page = !1),
          (this.page = new s.Customize.Page()),
          this.page.on("change", this.handler.page_change, this),
          this.page.on("reset", this.handler.page_reset, this),
          this.page.on("invalid", this.handler.page_invalid, this),
          this.$("input, textarea").on(
            "keyup",
            t.bind(this.key_trigger_change, this)
          ),
          (this._ace_autoheight = t.bind(
            t.debounce(this.ace_autoheight, 100),
            this
          )),
          new s.BinarySwitch({
            el: this.$('.binary_switch_checkbox input[type="checkbox"]'),
          }).render(),
          this.constructor.__super__.initialize.apply(this, arguments);
      },
      handler: {
        page_change: function () {
          logger.debug("EditPage: page_change()"),
            (this.saved_page = !1),
            this.resetting_page ||
              ((this.changed_page = !0),
              this.toggle_update_button(this.changed_page)),
            ("undefined" == typeof this.page.changed.title &&
              "undefined" == typeof this.page.changed.request_uri &&
              "undefined" == typeof this.page.changed.show_link) ||
              this.page_title_placeholder(
                "standard_layout" === this.page.get("type")
                  ? this.page.get("title")
                  : __("Page title"),
                this.page.get("show_link")
              ),
            this.page.changed.type &&
              (this.$('[name="page[request_uri]"]').val(""),
              this.$('[name="page[label]"]').val(""),
              this.$('[name="page[body]"]').val("")),
            "undefined" != typeof this.page.changed.show_link &&
              "redirect" !== this.page.get("type") &&
              this.$('[name="page[show_link]"]')
                .prop("checked", this.page.get("show_link"))
                .trigger("change"),
            this.page.changed.type
              ? (this.page_type_fields(this.page.changed.type),
                "custom_layout" === this.page.previous("type") &&
                "standard_layout" === this.page.changed.type
                  ? this.sync_textareas(!1)
                  : "standard_layout" === this.page.previous("type") &&
                    "custom_layout" === this.page.changed.type &&
                    this.sync_textareas(!0),
                this.update_page_preview())
              : "redirect" === this.page.get("type") &&
                this.update_page_preview();
        },
        page_reset: function () {
          logger.debug("EditPage: page_reset()"),
            (this.saved_page = !0),
            (this.changed_page = !1),
            this.update_page_preview(),
            this.toggle_update_button(this.changed_page),
            this.render(),
            this.clear_errors(),
            (this.resetting_page = !1);
        },
        page_invalid: function (e, i) {
          this.button_spinner('[data-action="save_page"]', !1),
            (this.resetting_page = !1),
            i.label && ((i.show_link = i.label), (i.label = "")),
            (i = t.transform(i, function (e, t, i) {
              e["page[" + i + "]"] = t;
            })),
            this.mark_errors(i);
        },
      },
      set_page: function (e, i) {
        logger.debug("EditPage: set_page()"),
          (this.resetting_page = !0),
          (this.original_page = e),
          (this.saved_page = !0),
          (this.changed_page = !1),
          this.toggle_save_button(!this.saved_page),
          this.toggle_update_button(this.changed_page),
          "function" != typeof i &&
            (i = t.bind(this.render, this, this.page.toJSON())),
          e
            ? (this.page.set(e.toJSON(), { silent: !0 }).fetch({
                success: t.bind(function () {
                  this.handler.page_reset.call(this), i();
                }, this),
              }),
              this.$title.text(this.$title.data("edit")))
            : (this.page.clear({ silent: !0 }).set(this.page.defaults),
              (this.resetting_page = !1),
              (this.saved_page = !0),
              this.$title.text(this.$title.data("new")),
              i());
      },
      change_field: function (t) {
        var i = e(t.currentTarget),
          s = i.attr("name");
        if (s) {
          var o = i.val(),
            n = this.clear_error(i);
          n &&
            i.is('[name="page[label]"]') &&
            this.clear_error("page[show_link]"),
            i.is('[type="checkbox"]') && (o = i.is(":checked")),
            i.is('[name="page[custom_layout]"]') && (s = "page[body]"),
            i.is('[name="page[request_uri]"]') && (o = "/" + o),
            (s = s.replace(/page\[(.*)\]/i, "$1")),
            this.page.has(s) && this.page.set(s, o);
        }
      },
      show_panel: function () {
        this.editor
          ? (this.$('[data-token="source-editor-plexi"]').trigger("click"),
            this.update_editor_html())
          : this.initialize_editor(),
          e(window).on("resize", this._ace_autoheight),
          this.constructor.__super__.show_panel.apply(this, arguments);
      },
      hide_panel: function () {
        this.clear_errors(),
          this.trigger("page_preview", !1),
          s.MultiPopover.hideAll(),
          e(window).off("resize", this._ace_autoheight),
          this.constructor.__super__.hide_panel.apply(this, arguments);
      },
      mark_errors: function (e) {
        this.constructor.__super__.mark_errors.apply(this, arguments),
          this.custom_editor &&
            t.has(e, "page[custom_layout]") &&
            this.create_error_tag(
              e["page[custom_layout]"],
              this.custom_editor.container,
              "page[custom_layout]"
            );
      },
      update_page_preview: function () {
        logger.warn("EditPage: Triggering page preview"),
          this.trigger("page_preview", this.page.toJSON()),
          (this.preview_changed = !1),
          (this.saved_page = !1),
          this.toggle_update_button(this.preview_changed),
          this.toggle_save_button(!this.saved_page);
      },
      close_page: function (e) {
        if (!this.saved_page) {
          var t = this;
          return (
            s.Dialog.confirm(__("Close without saving page?"), function () {
              t.switch_panel(e);
            }),
            !0
          );
        }
        return this.clear_errors(), this.switch_panel(e);
      },
      save_page: function () {
        this.clear_errors(),
          (this.resetting_page = !0),
          this.trigger("save_page", {
            always: t.bind(function (e, i) {
              e
                ? ((this.saved_page = !0),
                  this.toggle_save_button(!this.saved_page))
                : "string" == typeof i
                ? s.Dialog.alert(i)
                : ((i = t.transform(i, function (e, t, i) {
                    e["page[" + i + "]"] = t;
                  })),
                  this.mark_errors(i)),
                (this.resetting_page = !1);
            }, this),
            original_page: this.original_page,
            page: this.page,
          });
      },
      save_complete: function () {
        this.button_spinner('[data-action="save_page"]', !1);
      },
      toggle_save_button: function (e) {
        var t = this.$('[data-action="save_page"]');
        e
          ? (t.removeClass("disabled"), this.button_label(t, "save"), t.show())
          : (t.addClass("disabled"), this.button_label(t, "saved"), t.hide());
      },
      enable_show_link: function () {
        this.page.set("show_link", !0);
      },
      focus_page_label: function (t) {
        e(t.currentTarget).prop("checked") && this.$page_label.focus();
      },
      page_type_fields: function (t) {
        t || (t = this.page.get("type")),
          logger.debug("EditPage: page_type_fields(" + t + ")"),
          this.$("[data-page-layout]").each(function (i, s) {
            e(s).data("page-layout") === t ? e(s).show() : e(s).hide();
          }),
          "custom_layout" === t && this.ace_autoheight(),
          "redirect" === t
            ? (logger.debug("==== MOVING TO REDIRECT ==== "),
              this.switch_to_link_ui(this))
            : "redirect" !== t &&
              (logger.debug("==== MOVING TO NON-REDIRECT ==== "),
              this.switch_to_non_link_ui(this));
      },
      page_title_placeholder: function (e, t) {
        this.$page_label.attr("placeholder", e),
          t === !0
            ? this.$page_label.removeClass("hide")
            : t === !1 && this.$page_label.addClass("hide");
      },
      sync_textareas: function (e) {
        e
          ? (this.editor_session
              ? ((this.setting_editor = !0),
                this.editor_session.setValue(
                  this.$('[name="page[body]"]').val()
                ),
                (this.setting_editor = !1))
              : this.$('[name="page[custom_layout]"]').val(
                  this.$('[name="page[body]"]').val()
                ),
            this.autosize_textarea(this.$("textarea.autoresize")))
          : (this.editor_session
              ? this.$('[name="page[body]"]').val(
                  this.editor_session.getValue()
                )
              : this.$('[name="page[body]"]').val(
                  this.$('[name="page[custom_layout]"]').val()
                ),
            this.update_editor_html());
      },
      initialize_editor: function () {
        this.initialize_standard_editor(),
          this.initialize_custom_editor(),
          (this.editor = !0);
      },
      initialize_standard_editor: function () {
        var t = "page_body";
        this.$("#" + t)
          .closest(".textarea")
          .addClass("no_label"),
          s.Editor.render(t, {
            type: this.editor_type,
            immediate: !0,
            skin: "bluth",
            custom_css: "/assets/styles/custom_tinymce_bluth.css",
            layout:
              "bold,italic,strikethrough,link,unlink," +
              (e("html").hasClass("ie9")
                ? "numlist,bullist,image,blockquote,code"
                : "numlist,bullist,image,image_upload,blockquote,code"),
            plugins: e("html").hasClass("ie9")
              ? "autoresize,safari,pagebreak,ajax_forms,tumblr_popovers"
              : "autoresize,safari,pagebreak,ajax_forms,image_upload,tumblr_popovers",
            resize: !0,
            min_height: 225,
            min_width: 560,
            max_width: 560,
            allow_inline_style: !0,
            focus: !1,
            extra_elements:
              "table[align<center?left?right|bgcolor|border|cellpadding|cellspacing|class|dir<ltr?rtl|frame|height|id|lang|style|summary|title|width],tbody[align<center?char?justify?left?right|char|class|charoff|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],td[abbr|align<center?char?justify?left?right|axis|bgcolor|char|charoff|class|colspan|dir<ltr?rtl|headers|height|id|lang|nowrap<nowrap|rowspan|scope<col?colgroup?row?rowgroup|style|title|valign<baseline?bottom?middle?top|width],tfoot[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],th[abbr|align<center?char?justify?left?right|axis|bgcolor|char|charoff|class|colspan|dir<ltr?rtl|headers|height|id|lang|nowrap<nowrap|rowspan|scope<col?colgroup?row?rowgroup|style|title|valign<baseline?bottom?middle?top|width],thead[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],tr[abbr|align<center?char?justify?left?right|bgcolor|char|charoff|class|rowspan|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],tt[class|dir<ltr?rtl|id|lang|style|title]",
          }),
          "rich" !== this.editor_type
            ? this.initialize_image_uploader(t)
            : (s.Editor.on(
                "tinymce.init",
                function (e) {
                  (this.standard_editor = e.data),
                    this.standard_editor.setContent(this.page.get("body")),
                    this.initialize_image_uploader(t);
                },
                this
              ),
              s.Editor.on(
                "tinymce.change",
                function () {
                  this.resetting_page ||
                    this.page.set("body", this.standard_editor.getContent());
                },
                this
              ));
      },
      initialize_custom_editor: function () {
        logger.log("Initializing Custom Layout editor..."),
          (this.custom_editor = ace.edit("custom_editor")),
          (this.editor_session = this.custom_editor.getSession());
        var i = ace.require("ace/mode/html").Mode,
          o = s.ace.theme.customize;
        this.editor_session.setUseWorker(!1),
          this.editor_session.setMode(new i()),
          this.custom_editor.setTheme(o),
          this.editor_session.setUseWrapMode(!0),
          this.editor_session.setFoldStyle("manual"),
          this.custom_editor.setShowPrintMargin(!1),
          this.custom_editor.renderer.setShowGutter(!1),
          (this.$custom_editor = e(this.custom_editor.container)),
          (this.$ace_placeholder =
            this.$custom_editor.siblings(".ace_placeholder")),
          this.$('[name="page[custom_layout]"]')
            .closest(".field_row_input")
            .remove(),
          this.custom_editor.commands.addCommand({
            name: "soft wrap",
            bindKey: {
              win: "Ctrl-Alt-W",
              mac: "Command-Option-W",
              sender: "editor",
            },
            exec: t.bind(function () {
              return (
                this.editor_session.setUseWrapMode(
                  !this.editor_session.getUseWrapMode()
                ),
                !0
              );
            }, this),
          }),
          this.editor_session.on(
            "change",
            t.bind(t.debounce(this.change_editor_html, 50), this)
          );
      },
      initialize_image_uploader: function (i) {
        var o = [
            "#" + i + "_parent .mce_image_upload",
            "#" + i + "_manual_toolbar .editor_button.photo",
          ].join(", "),
          n = s.Upload.upload_icon(o, {
            accept: "image/*",
            validate: function (e, i) {
              t.each(e, function (e) {
                e.size > 20971520 && i.push(__("File is too big. Max 20MB."));
              });
            },
            fileupload_options: { url: "/svc/upload/text_image" },
          });
        n.$input.on(
          "change",
          t.bind(function (o) {
            var n = e(o.currentTarget).val(),
              a = this.standard_editor,
              r = new Image();
            e(r)
              .one(
                "load",
                t.bind(function () {
                  e(r).off(),
                    a
                      ? (a.execCommand(
                          "mceInsertContent",
                          !1,
                          '<img src="' + n + '" />'
                        ),
                        a.execCommand("mceInsertContent", !1, "<p>"),
                        t.delay(function () {
                          a.execCommand("mceAutoResize");
                        }, 100))
                      : (s.Editor.insertTag(i, '<img src="' + n + '"/>'),
                        e("#" + i).trigger("change"));
                }, this)
              )
              .one("error", function () {
                e(r).off();
              }),
              (r.src = n);
          }, this)
        );
        var a = e("#" + i + "_parent .mce_image_upload");
        a.length && (a[0].onmousedown = a[0].onclick = !1);
      },
      change_editor_html: function () {
        if (!this.setting_editor) {
          var e = this.editor_session.getValue();
          this.page.set("body", e),
            e
              ? this.$ace_placeholder.addClass("empty")
              : this.$ace_placeholder.removeClass("empty");
        }
      },
      update_editor_html: function () {
        "rich" === this.editor_type &&
          this.standard_editor &&
          (this.standard_editor.setContent(this.page.get("body")),
          (this.setting_editor = !0),
          this.editor_session.setValue(this.page.get("body")),
          (this.setting_editor = !1));
      },
      ace_autoheight: function () {
        if (!this.custom_editor) return !1;
        var t = e(window).height(),
          i = parseInt(this.$content.css("padding-bottom"), 10) || 0;
        return (
          this.$custom_editor.height(t - this.$custom_editor.offset().top - i),
          this.custom_editor.resize(),
          !0
        );
      },
      toggle_update_button: function (e) {
        var t = this.$('[data-action="update_preview"]');
        e ? t.removeClass("disabled") : t.addClass("disabled");
      },
      switch_to_link_ui: function () {
        var e = this.$('[name="page[show_link]"]');
        (this.page.show_link = !0),
          e.prop("checked", !0).trigger("change"),
          e.parent().addClass("hide"),
          this.$('[name="page[request_uri]"]')
            .closest(".field_row_inner")
            .addClass("hide");
        var t = e.closest(".fieldset").find(".field_row_text_toggle");
        t.find(".field_row_label_text").addClass("hide"),
          t.find(".field_row_input").addClass("full");
      },
      switch_to_non_link_ui: function () {
        var e = this.$('[name="page[show_link]"]');
        e.parent().removeClass("hide");
        var t = e.closest(".fieldset").find(".field_row_text_toggle");
        t.find(".field_row_label_text").removeClass("hide"),
          t.find(".field_row_input").removeClass("full"),
          this.$('[name="page[request_uri]"]')
            .closest(".field_row_inner")
            .removeClass("hide");
      },
      render: function (e) {
        var i = t.extend(
          {
            type: "standard_layout",
            request_uri: "",
            show_link: !1,
            title: "",
            body: "",
            redirect_to: "",
          },
          e || this.page.toJSON()
        );
        this.page_type_fields(),
          this.$('[name="page[type]"]').val(i.type).trigger("change"),
          this.$('[name="page[label]"]').val(i.label),
          this.$('[name="page[show_link]"]').prop("checked", i.show_link),
          i.show_link
            ? this.$('[name="page[show_link]"]')
                .siblings(".binary_switch")
                .addClass("enabled")
            : this.$('[name="page[show_link]"]')
                .siblings(".binary_switch")
                .removeClass("enabled"),
          this.$('[name="page[request_uri]"]').val(i.request_uri.substr(1)),
          this.$('[name="page[title]"]').val(i.title),
          this.$('[name="page[body]"]').val(i.body),
          this.editor_session
            ? ((this.setting_editor = !0),
              this.editor_session.setValue(i.body),
              (this.setting_editor = !1))
            : this.$('[name="page[custom_layout]"]').val(i.body),
          this.$('[name="page[redirect_to]"]').val(i.redirect_to),
          this.page_title_placeholder(
            "standard_layout" === i.type ? i.title : __("Page title"),
            i.show_link
          ),
          this.update_editor_html(),
          this.autosize_textarea(this.$("textarea.autoresize")),
          this.trigger("panel:resize");
      },
    });
  })(
    window.jQuery,
    window._,
    window.Tumblr.Customize,
    window.Tumblr,
    window.Tumblr.Customize
  ) /*! scripts/customize_v3/view/theme_list_view.js */,
  (function (e, t, i, s, o) {
    "use strict";
    var n = i.PanelView.extend({
      events: t.defaults(
        {
          'click [data-action="reset_theme"]': "reset_theme",
          'click [data-action="use_theme"]': "use_theme",
          "click #theme_categories_search .search": "theme_search",
          "click #theme_categories_search .cancel": "cancel_search",
          'change [name="theme_categories"]': "filter_change",
          "click .theme_container[data-theme-id]": "select_theme",
        },
        i.PanelView.prototype.events
      ),
      initialize: function (e) {
        (this.current_theme_id = e.theme_id || 0),
          (this.update_theme = !1),
          (this.loading_progress = 0),
          (this.$theme_list = this.$("#theme_list")),
          (this.$slider = this.$("#theme_categories_search")),
          (this.$theme_search_input = this.$("#theme_search_input")),
          (this.resize = !1),
          (this.width = 300),
          (this.demo_content = e.demo_content || i.demo_content),
          (this.blog = e.blog || i.blog),
          (this.global_params = e.global_params || i.global_params),
          (this.theme = e.theme || i.theme),
          (this.theme_params = e.theme_params || i.theme_params),
          (this.themes = e.themes || i.themes),
          (this.theme_preview = e.theme_preview || i.theme_preview),
          (this.sample_demo_content = new i.DemoContent()),
          (this.sample_theme = new i.Theme()),
          e.preview_theme_id &&
            (this.sample_theme.set("id", e.preview_theme_id, { silent: !0 }),
            this.sample_theme.fetch({ type: "POST" }),
            (this.update_theme = !0)),
          this.theme.on("change", this.handler.theme_change, this),
          this.theme.on("reset", this.handler.theme_reset, this),
          this.themes.on("reset", this.handler.themes_reset, this),
          this.sample_demo_content.on(
            "change",
            this.handler.sample_demo_content_change,
            this
          ),
          this.sample_theme.on(
            "change",
            this.handler.sample_theme_change,
            this
          ),
          this.$theme_search_input.on("keyup", t.bind(this.keyup_search, this)),
          this.constructor.__super__.initialize.apply(this, arguments),
          this.$content_container.on(
            "scroll",
            t.throttle(t.bind(this.lazy_load_thumbnails, this), 500)
          );
      },
      determine_content_map: function () {
        var e;
        return (
          (e =
            this.demo_content.get("id") !== i.DEMO_BLOG_NAME
              ? this.demo_content.toJSON()
              : this.sample_demo_content.toJSON()),
          t.extend(
            e,
            this.global_params.content_map_exports(),
            this.sample_theme.get("default_params"),
            this.blog.content_map_exports()
          )
        );
      },
      handler: {
        theme_change: function () {
          logger.debug("ThemeList: theme_change()"),
            this.loading_indicator(!0),
            this.set_current_theme(this.sample_theme.id);
        },
        theme_reset: function () {
          logger.debug("ThemeList: theme_reset()"),
            this.loading_indicator(!0),
            this.set_current_theme(this.sample_theme.id);
        },
        themes_reset: function () {
          logger.debug("ThemeList: themes_reset()"), this.render();
        },
        sample_demo_content_change: function () {
          return this.sample_demo_content.changed.id
            ? (logger.log(
                "sample_demo_content.id changed! Fetching new demo content..."
              ),
              void this.sample_demo_content.fetch())
            : (logger.debug("ThemeList: sample_demo_content_change()"),
              void this.theme_preview.set(
                t.extend(
                  { __theme_html: this.sample_theme.unescaped_theme() },
                  this.determine_content_map()
                )
              ));
        },
        sample_theme_change: function () {
          return (
            logger.debug("ThemeList: sample_theme_change()"),
            this.loading_indicator(!0),
            this.set_current_theme(this.sample_theme.id),
            this.sample_demo_content.get("id") !==
            this.sample_theme.get("demo_tumblelog_name")
              ? void this.sample_demo_content.set(
                  "id",
                  this.sample_theme.get("demo_tumblelog_name")
                )
              : void this.theme_preview
                  .set(
                    t.extend(
                      { __theme_html: this.sample_theme.unescaped_theme() },
                      this.determine_content_map()
                    ),
                    { silent: !0 }
                  )
                  .trigger("reset")
          );
        },
      },
      panel_keydown: function (e) {
        switch (e.which) {
          case 70:
            if (e.metaKey || e.ctrlKey)
              return (
                e.preventDefault(), e.stopPropagation(), this.theme_search(), !1
              );
            break;
          case 27:
            return this.cancel_search(), !1;
        }
      },
      initial_show_action: function () {
        this.themes.length &&
          (this.scroll_to_current_theme(), this.trigger("panel:resize"));
      },
      show_panel: function () {
        this.themes.length || this.themes.fetch({ reset: !0 }),
          this.constructor.__super__.show_panel.apply(this, arguments),
          this.themes.length && this.scroll_to_current_theme();
      },
      set_current_theme: function (e) {
        (this.current_theme_id = e),
          this.$(".theme_container.current").removeClass("current"),
          (this.$current_theme = this.$(
            "#theme_" + this.current_theme_id
          ).addClass("current")),
          this.scroll_to_current_theme(300);
      },
      scroll_to_current_theme: function (e) {
        if (!this.$current_theme.length || !this.$current_theme.is(":visible"))
          return this.load_thumbnails_in_view(250), !1;
        var t =
            this.$current_theme.offset().top -
            this.$content_container.children().offset().top,
          i =
            parseInt(
              this.$content_container.children().css("padding-top"),
              10
            ) || 0;
        return (
          e
            ? this.$content_container.animate({ scrollTop: t - i }, 300)
            : this.$content_container.scrollTop(t - i),
          !0
        );
      },
      select_theme: function (t) {
        if (e(t.target).closest(".theme_text").length) return !0;
        var i = e(t.currentTarget).data("theme-id");
        logger.log("Previewing theme " + i + "..."),
          this.trigger("loading_preview"),
          this.loading_indicator(!0),
          this.set_current_theme(i),
          this.sample_theme.set("id", i, { silent: !0 }),
          this.sample_theme.fetch({ type: "POST" }),
          (this.update_theme = !0);
      },
      loading_indicator: function (e) {
        if (
          (this.$(".theme_container").removeClass("loading"),
          "undefined" == typeof e || e)
        ) {
          if (!this.$current_theme || !this.$current_theme.length) return !1;
          this.$current_theme.addClass("loading");
        } else this.set_loading_progress(1);
      },
      set_loading_progress: function (e, t) {
        if (t && e < this.loading_progress) return !1;
        if (!this.$current_theme || !this.$current_theme.length) return !1;
        e = Math.max(0, Math.min(e, 1));
        var i = this.$current_theme.find(".progress_circle"),
          s = this.$current_theme.find(".progress_left"),
          o = this.$current_theme.find(".progress_right"),
          n = 360 * e - 180 + "deg";
        return (
          i.addClass("instant"),
          e > 0.5
            ? (i.addClass("gt0 gt50"),
              o.css({
                "-webkit-transform": "rotate(0deg)",
                "-moz-transform": "rotate(0deg)",
                "-ms-transform": "rotate(0deg)",
                "-o-transform": "rotate(0deg)",
                transform: "rotate(0deg)",
              }),
              s.css({
                "-webkit-transform": "rotate(" + n + ")",
                "-moz-transform": "rotate(" + n + ")",
                "-ms-transform": "rotate(" + n + ")",
                "-o-transform": "rotate(" + n + ")",
                transform: "rotate(" + n + ")",
              }))
            : e > 0
            ? (i.addClass("gt0").removeClass("gt50"),
              o.css({
                "-webkit-transform": "rotate(" + n + ")",
                "-moz-transform": "rotate(" + n + ")",
                "-ms-transform": "rotate(" + n + ")",
                "-o-transform": "rotate(" + n + ")",
                transform: "rotate(" + n + ")",
              }),
              s.css({
                "-webkit-transform": "rotate(0deg)",
                "-moz-transform": "rotate(0deg)",
                "-ms-transform": "rotate(0deg)",
                "-o-transform": "rotate(0deg)",
                transform: "rotate(0deg)",
              }))
            : (i.removeClass("gt0 gt50"),
              o.css({
                "-webkit-transform": "rotate(-180deg)",
                "-moz-transform": "rotate(-180deg)",
                "-ms-transform": "rotate(-180deg)",
                "-o-transform": "rotate(180deg)",
                transform: "rotate(180deg)",
              }),
              s.css({
                "-webkit-transform": "rotate(0deg)",
                "-moz-transform": "rotate(0deg)",
                "-ms-transform": "rotate(0deg)",
                "-o-transform": "rotate(0deg)",
                transform: "rotate(0deg)",
              })),
          (this.loading_progress = e),
          !0
        );
      },
      use_theme: function (i) {
        logger.debug("ThemeList: use_theme()"),
          this.update_theme &&
            (this.trigger("enable_preview_render", !1),
            this.theme.set(this.sample_theme.toJSON()),
            this.trigger("reset_theme_params"),
            t.delay(
              t.bind(function () {
                this.trigger("enable_preview_render", !0);
              }, this),
              100
            )),
          this.trigger(
            "switch_panel",
            e(i.currentTarget).data("panel") || "customize"
          );
      },
      reset_theme: function (t) {
        logger.debug("ThemeList: reset_preview()"),
          this.cancel_search(),
          this.set_current_theme(this.theme.id),
          (this.update_theme = !1),
          this.trigger("reset_preview"),
          this.trigger(
            "switch_panel",
            e(t.currentTarget).data("panel") || "customize"
          );
      },
      filter_change: function (t) {
        var i = e(t.currentTarget).val();
        "all" === i && (i = !1), this.filter_themes(i);
      },
      theme_search: function () {
        this.$slider.hasClass("theme_search") ||
          (this.$theme_search_input.val(""),
          this.$slider.addClass("theme_search"),
          t.delay(
            t.bind(function () {
              this.$theme_search_input.focus();
            }, this),
            250
          ));
      },
      cancel_search: function () {
        this.$slider.removeClass("theme_search"),
          this.$theme_search_input.blur(),
          this.$('[name="theme_categories"]').trigger("change");
      },
      load_theme_image: function (t) {
        e(t).each(function (t, i) {
          var s = e(i).addClass("thumbnail_loaded"),
            o = s.children(".theme_thumbnail"),
            n = o.data("thumbnail");
          n &&
            (o.children("img").remove(),
            e("<img/>", { alt: "", src: n }).appendTo(o));
        });
      },
      filter_themes: function (e) {
        return (
          logger.debug("ThemeList: filter_themes()"),
          e
            ? (t.isString(e) &&
                (logger.log("Showing themes for: " + e),
                (e = this.themes.with_features(e, !0))),
              this.$(".theme_container").hide(),
              t.forEach(
                e,
                function (e) {
                  this.$("#theme_" + e).show();
                },
                this
              ),
              this.scroll_to_current_theme() ||
                this.$content_container.scrollTop(0),
              void this.trigger("panel:resize"))
            : (this.$(".theme_container").show(),
              void this.trigger("panel:resize"))
        );
      },
      keyup_search: function (e) {
        switch (e.which) {
          case 37:
          case 38:
          case 39:
          case 40:
          case 91:
          case 16:
          case 17:
          case 18:
          case 13:
          case 27:
            return !1;
          case 65:
            if (e.currentTarget.selectionEnd - e.currentTarget.selectionStart)
              return !1;
        }
        this.filter_themes_by_search(this.$theme_search_input.val()),
          this.load_thumbnails_in_view();
      },
      filter_themes_by_search: function (e) {
        if ((logger.debug("ThemeList: filter_themes_by_search(" + e + ")"), !e))
          return (
            this.$(".theme_container").show(), void this.trigger("panel:resize")
          );
        var i = this.themes.with_query_like(e, e, !0);
        this.$(".theme_container").hide(),
          t.forEach(
            i,
            function (e) {
              this.$("#theme_" + e).show();
            },
            this
          ),
          this.trigger("panel:resize");
      },
      lazy_load_thumbnails: function () {
        return this.load_thumbnails_in_view(
          Math.max(this.$content_container.height(), 250)
        );
      },
      load_thumbnails_in_view: function (t) {
        t || (t = 0);
        var i = this.$content_container.height(),
          s = this.$content_container.scrollTop(),
          o = s + i,
          n = this.$content_container.children(".content").height();
        (s -= t), (o += t);
        var a = this.$theme_list.children(":visible"),
          r = a.length,
          l = Math.max(0, Math.floor((r * s) / n)),
          h = Math.min(r - 1, Math.ceil((r * o) / n));
        return (
          (this.$top = e(this.$theme_list.children(":visible").get(l))),
          (this.$bottom = e(this.$theme_list.children(":visible").get(h))),
          this.load_thumbnails(this.$top, this.$bottom)
        );
      },
      load_thumbnails: function (t, i) {
        var s = e(t),
          o = e(i);
        this.load_theme_image(
          s.nextUntil(o).addBack().add(o).not(".thumbnail_loaded")
        );
      },
      render: function () {
        this.$theme_list.empty(),
          t.forEach(
            this.themes.models,
            function (t) {
              e(e.trim(this.template(t.toJSON()))).appendTo(this.$theme_list);
            },
            this
          ),
          this.loading_indicator(!0),
          this.set_current_theme(this.current_theme_id),
          this.scroll_to_current_theme(),
          this.trigger("panel:resize");
      },
      template: t.template(
        '            <div class="theme_container" id="theme_<%= id %>" data-theme-id="<%= id %>">                <div class="theme_thumbnail"<% if (wide_thumbnail_key) { %> data-thumbnail="https://66.media.tumblr.com/themes/wide/<%= wide_thumbnail_key %>.png"<% } %>>                    <div class="progress_circle">                        <div class="progress_total"></div>                        <div class="progress_current">                            <div class="progress_left"></div>                            <div class="progress_right"></div>                        </div>                    </div>                    <% if (parseFloat(premium, 10) > 0) { %>                        <div class="theme_price"><span>$<%= premium %></span></div>                    <% } %>                </div>                <div class="theme_text">                    <a href="/theme/<%= id %>" class="theme_title" target="_blank"><%= title %></a>                    <% if (author_name) { %>                        <span class="note theme_by">                            <%=__("by")%> <a class="theme_author" href="<%= author_blog %>" target="_blank"><%= author_name %></a>                        </span>                    <% } %>                </div>            </div>        '
      ),
    });
    o.ThemeListView = n;
  })(
    window.jQuery,
    window._,
    window.Tumblr.Customize,
    window.Tumblr,
    window.Tumblr.Customize
  ) /*! scripts/customize_v3/view/blog_preview_view.js */,
  (function (e, t, i, s) {
    var o = i.View.extend({
      quick_update_parameters: [
        "Title",
        "BlogTitle",
        "Description",
        "CustomCSS",
      ],
      initialize: function (i) {
        this.theme_preview = i.theme_preview || Tumblr.Customize.theme_preview;
        var s = /^([^\/]+\/\/)(.+)/i;
        (this.ssl_sanitize_map =
          i.ssl_sanitize_map ||
          t.transform(
            TumblrData.ssl_sanitize_map,
            function (e, i) {
              i[0].match(s) &&
                e.push([
                  new RegExp(
                    "([^:])" + t.escapeRegExp(i[0].replace(s, "//$2")),
                    "gi"
                  ),
                  i[1],
                ]);
            },
            t.clone(TumblrData.ssl_sanitize_map)
          )),
          (this.$blog_view = !1),
          (this.old_blog_view = []),
          (this.rendered_template = ""),
          (this.$progress_bar = this.$(".progress_bar .progress_current")),
          (this.initialized = !1),
          (this.invalid_timeout = !1),
          (this.show_render_progress = !0),
          (this.enable = !0),
          this.theme_preview.on(
            "change",
            this.handler.theme_preview_change,
            this
          ),
          this.theme_preview.on(
            "reset",
            this.handler.theme_preview_reset,
            this
          ),
          e(window).on(
            "message",
            t.bind(function (e) {
              if (((e = e.originalEvent), "string" != typeof e.data))
                return (
                  logger.error(
                    "Message event data is not a string and cannot be split!"
                  ),
                  void logger.log(e.data)
                );
              var t = e.data.split(";");
              switch (t[0]) {
                case "loaded":
                  this.$blog_view.trigger("load");
                  break;
                case "ready":
                  logger.time("update"),
                    e.source.postMessage(
                      this.rendered_template,
                      TumblrData.safe_host
                    ),
                    logger.timeEnd("update");
                  break;
                case "progress":
                  t.length > 2 && this.preview_load_state(parseInt(t[1], 10));
              }
            }, this)
          );
      },
      handler: {
        theme_preview_change: function () {
          if (!this.initialized)
            return (
              this.update_theme_template(),
              this.update_content_map(),
              this.trigger("preview:load_start"),
              this.render(!0),
              void (this.initialized = !0)
            );
          var e = !1,
            i = !1;
          t.each(
            this.theme_preview.changed,
            function (s, o) {
              "__theme_html" === o
                ? ((e = !0), this.update_theme_template())
                : ((i = !0),
                  t.indexOf(this.quick_update_parameters, o) < 0
                    ? (e = !0)
                    : this.throttled_quick_update(o, s));
            },
            this
          ),
            i && this.update_content_map(),
            this.theme_preview.get("id") || this.set_content_map(!1),
            e &&
              (this.trigger("theme:loading_begin"),
              this.set_loading_progress(0, !0),
              this.debounced_render(this.show_render_progress));
        },
        theme_preview_reset: function () {
          this.update_theme_template(),
            this.update_content_map(),
            this.set_loading_progress(0, !0),
            this.render(),
            (this.initialized = !0);
        },
      },
      create_blog_view: function () {
        return e("<iframe/>", {
          frameborder: 0,
          marginwidth: 0,
          marginheight: 0,
          src:
            TumblrData.safe_host +
            "/customize_preview_receiver.html?" +
            TumblrData.receiver_checksum,
          class: "preview_iframe",
        });
      },
      remove_old_blog_views: function () {
        for (var e; (e = this.old_blog_view.pop()); ) e.remove();
        this.loading_indicator(!1);
      },
      preview_load_state: function (e, t) {
        t = t ? Math.max(t, this.marker_count) : this.marker_count;
        var i = t > 0 ? e / t : 0;
        this.set_loading_progress(i, !1),
          this.trigger("preview:load_progress", i);
      },
      set_content_map: function (e) {
        logger.debug("BlogPreview: set_content_map()"),
          Tumblr.Template.set_content_map(e);
      },
      update_content_map: function () {
        return this.set_content_map(this.theme_preview.filtered_content_map());
      },
      set_theme_template: function (e) {
        logger.debug("BlogPreview: set_template_theme()"),
          (e = this.insert_progress_markers(e)),
          Tumblr.Template.set_template(e);
      },
      update_theme_template: function () {
        return this.set_theme_template(this.theme_preview.get("__theme_html"));
      },
      insert_progress_markers: function (e) {
        var i,
          s,
          o =
            "<script class=\"tumblr_preview_marker___\">window.tumblr_preview_marker || (window.tumblr_preview_marker = 0); parent.postMessage('progress;' + (window.tumblr_preview_marker++) + ';' + document.getElementsByClassName('tumblr_preview_marker___').length, '*');</script>",
          n = e.split("<script"),
          a = 0;
        return (
          t.forEach(
            n,
            function (e, t) {
              (n[t] = ""),
                (t > 0 &&
                  ((i = e.split("</script")),
                  (e = i.slice(1).join("</script")),
                  (n[t] = i[0]),
                  i.length < 2)) ||
                  ((s = e.match(/<\/div>(?=\s*?\n)/g)) && (a += s.length),
                  (n[t] += e.replace(
                    /<\/div>(?=\s*?\n)/g,
                    "</div>" + o + "\n"
                  )));
            },
            this
          ),
          logger.warn("Marker count: " + a),
          (this.marker_count = a),
          e.replace(/<\/div>(?=\s*?\n)/g, "</div>" + o)
        );
      },
      ssl_sanitize_url: function (e, i) {
        if (!i && "https:" !== document.location.protocol) return e;
        var s = t.trim(e.replace(/\s{2,}/g, " ", e)).toLowerCase();
        return (
          t.each(this.ssl_sanitize_map, function (i) {
            i[0] instanceof RegExp
              ? (e = e.replace(i[0], "$1" + i[1]))
              : s.indexOf(i[0]) !== -1 &&
                (e = e.replace(new RegExp(t.escapeRegExp(i[0]), "gi"), i[1]));
          }),
          e
        );
      },
      throttled_quick_update: t.throttle(function (e, t) {
        this.quick_update(e, t);
      }, 50),
      quick_update: function (e, t) {
        logger.debug("quick_update(" + e + ")"),
          this.$blog_view
            .prop("contentWindow")
            .postMessage("quick_update;" + e + ";" + t, "*");
      },
      loading_indicator: function (e) {
        "undefined" == typeof e || e
          ? this.$el.addClass("loading")
          : this.$el.removeClass("loading");
      },
      set_loading_progress: function (e, i) {
        if ("undefined" != typeof i) {
          if (i && this.$progress_bar.hasClass("smooth"))
            return (
              this.$progress_bar.removeClass("smooth"),
              t.defer(t.bind(this.set_loading_progress, this), [e])
            );
          if (!i && !this.$progress_bar.hasClass("smooth"))
            return (
              this.$progress_bar.addClass("smooth"),
              t.defer(t.bind(this.set_loading_progress, this), [e])
            );
        }
        (e = Math.max(0, Math.min(e, 1))),
          this.$progress_bar.width(100 * e + "%");
      },
      debounced_render: t.debounce(function (e) {
        this.render(e);
      }, 50),
      render: function (i) {
        if (!this.enable)
          return logger.debug("BlogPreview: render() is disabled"), !1;
        if (!t.isString(Tumblr.Template.template)) return !1;
        logger.debug("BlogPreview: render()"),
          this.old_blog_view.length &&
            (logger.warn("Interrupting an ongoing preview render!"),
            clearTimeout(this.remove_timer)),
          logger.log("Rendering preview..." + (i ? " (progressive load)" : "")),
          this.show_render_progress && this.loading_indicator(!0),
          this.set_loading_progress(0, !0),
          clearTimeout(this.invalid_timeout),
          clearTimeout(this.progressive_timeout),
          logger.time("Create iframe"),
          this.$blog_view && this.old_blog_view.push(this.$blog_view),
          (this.$blog_view = this.create_blog_view()
            .hide()
            .prependTo(this.$el)),
          (this.first = !0),
          (this.rendering = !0),
          i &&
            (this.progressive_timeout = t.delay(
              t.bind(function () {
                logger.log("Progressive load! Not waiting for the iframe..."),
                  this.rendering && this.render_complete();
              }, this),
              500
            )),
          this.$blog_view.on(
            "load",
            t.bind(function () {
              return this.first
                ? (logger.log(
                    "Give preview 5 seconds to load, starting now..."
                  ),
                  (this.first = !1),
                  void (this.invalid_timeout = t.delay(
                    t.bind(function () {
                      logger.timeEnd("Load preview"),
                        logger.error("Load preview timed out. Loading as-is."),
                        this.trigger("preview:timeout"),
                        this.rendering && this.render_complete();
                    }, this),
                    5e3
                  )))
                : (logger.timeEnd("Load preview"),
                  this.trigger("preview:loaded"),
                  void (this.rendering && this.render_complete()));
            }, this)
          ),
          logger.timeEnd("Create iframe");
        var s;
        if (
          t.isObject(Tumblr.Template.content_map) &&
          t.keys(Tumblr.Template.content_map).length
        ) {
          logger.time("render"),
            (s = Tumblr.Template.render()),
            logger.timeEnd("render");
          var o = t.reduce(
            this.theme_preview.webfonts,
            function (t, i) {
              return (
                t +
                '<link rel="stylesheet" type="text/css" href="' +
                e("#webfont_" + i).attr("href") +
                '">'
              );
            },
            ""
          );
          o && (s = s.replace(/(<\/head>)/i, "$1" + o)),
            Tumblr.Template.content_map["block:disablenewpoststyles"] !== !0 &&
              Tumblr.Template.content_map["block:shownewpoststyles"] &&
              "undefined" != typeof Tumblr.Template.content_map.newpoststyles &&
              Tumblr.Template.content_map.newpoststyles.length > 0 &&
              t.each(Tumblr.Template.content_map.newpoststyles, function (e) {
                s = s.replace(/(<\/head>)/i, "$1" + e);
              }),
            (s =
              Tumblr.Template.content_map.id &&
              Tumblr.Template.content_map.id != Tumblr.Customize.DEMO_BLOG_ID
                ? s.replace(/<a href=(?!\\)/g, '<a target="_blank" href=')
                : s.replace(
                    /<a href=(?!\\)/g,
                    '<a style="cursor:pointer" title='
                  )),
            TumblrData.inject_scripts
              ? t.each(TumblrData.inject_scripts, function (e) {
                  s += '<script src="' + e + '"></script>';
                })
              : (s +=
                  '<script src="https://assets.tumblr.com/assets/scripts/tumblelog.js"></script>');
          var n = Tumblr._init.theme.typekit_kit_id;
          n &&
            (s +=
              '<script type="text/javascript" src="//use.typekit.net/' +
              n +
              '.js"></script><script type="text/javascript">try{Typekit.load();}catch(e){}</script>');
        } else
          logger.warn("No content map! Assuming custom HTML..."),
            (s = Tumblr.Template.template);
        return (
          (s = this.ssl_sanitize_url(s)),
          e.browser.msie &&
            (s += '<script>top.postMessage("loaded", "*")</script>'),
          (this.rendered_template = s),
          logger.time("Load preview"),
          logger.log("Loading rendered theme..."),
          !0
        );
      },
      render_complete: function () {
        (this.rendering = !1),
          clearTimeout(this.invalid_timeout),
          clearTimeout(this.progressive_timeout),
          logger.log("Showing preview and removing old views..."),
          this.$blog_view.show(),
          (this.remove_timer = t.defer(
            t.bind(this.remove_old_blog_views, this)
          ));
      },
    });
    s.BlogPreviewView = o;
  })(
    jQuery,
    _,
    Backbone,
    Tumblr.Customize
  ) /*! scripts/customize_v3/view/file_browser_view.js */,
  (function (e) {
    Tumblr.Customize.FileBrowser = Backbone.View.extend({
      events: {
        "mouseover .tooltip_container": "show_tooltip_event",
        "mouseout .tooltip_container": "hide_tooltip_event",
        dragover: "drag_start",
        dragleave: "drag_end",
        drop: "drag_end",
        'click [data-asset-action="replace"]': "upload_replacement",
        'click [data-asset-action="insert"]': "insert_link",
        "click .icon_close": "close",
      },
      initialize: function (t) {
        (this.options = t || {}),
          (this.assets = []),
          this.cache_selectors(),
          (this.uploader_config = {
            send: _.bind(function (e) {
              _.each(
                e,
                _.bind(function (e) {
                  var t = this.create_file_slot(
                    this.normalize_file_data({
                      file: e,
                      display_name: e.name,
                      url: "",
                    })
                  );
                  t.addClass("uploading").removeClass("error");
                }, this)
              ),
                this.$uploaded_files.scrollTop(
                  this.$uploaded_files.prop("scrollHeight") -
                    this.$uploaded_files.height()
                );
            }, this),
            progress: _.bind(function (e, t, i) {
              _.each(
                i,
                _.bind(function (i) {
                  var s = this.get_file_slot(i);
                  if (s && s.length) {
                    var o = t ? e / t : 0;
                    (o = Math.max(0, Math.min(o, 1))),
                      s.find(".progress").width(100 * o + "%");
                  }
                }, this)
              );
            }, this),
            success: _.bind(function (e, t, i) {
              _.each(
                i,
                _.bind(function (t) {
                  var i = this.get_file_slot(t);
                  if (!i || !i.length)
                    return (
                      this.add_asset_url(e),
                      void (
                        window.console &&
                        window.console.warn &&
                        window.console.warn(
                          "Could not find the slot for this uploaded file!"
                        )
                      )
                    );
                  this.create_replacement_uploader(i);
                  var s = !1,
                    o = i.data("replace-asset-url");
                  if ((o && (s = _.findWhere(this.assets, { url: o })), s)) {
                    (s.url = e), i.data("replace-asset-url", !1);
                    for (var n = { needle: o }; this.editor.replace(e, n); );
                  } else this.add_asset_url(e);
                  i.removeClass("uploading").data("url", e),
                    i
                      .find(".asset_filename")
                      .attr({ title: e, href: e })
                      .text(e.replace(/(.*\/)?([^\/]+)/i, "$2"));
                }, this)
              );
            }, this),
            error: _.bind(function (e, t, i) {
              _.each(
                i,
                _.bind(function (e) {
                  var t = this.get_file_slot(e);
                  t &&
                    t.length &&
                    (t.removeClass("uploading").addClass("error"),
                    t.data("url") || t.remove());
                }, this)
              ),
                t.message && Tumblr.Dialog.alert(t.message);
            }, this),
          });
        var i = !1;
        (this.uploader_config_with_warning = _.extend(
          {},
          this.uploader_config,
          {
            add: _.bind(function (e) {
              if (i) return void i.push(e);
              var t = _.transform(
                e.originalFiles,
                _.bind(function (e, t) {
                  var i = _.findWhere(this.assets, { display_name: t.name });
                  i && e.push(_.extend({ file: t }, i));
                }, this)
              );
              t.length
                ? ((i = [e]),
                  Tumblr.Dialog.confirm({
                    text:
                      "<p>" +
                      (1 === t.length
                        ? __("This will replace the following file:")
                        : __("This will replace the following files:")) +
                      "</p><ul><li>" +
                      _.pluck(t, "display_name").join("</li><li>") +
                      "</li></ul><p>" +
                      __("Are you sure?") +
                      "</p>",
                    text_ok: __("Replace"),
                    callback_ok: _.bind(function () {
                      _.each(
                        t,
                        _.bind(function (e) {
                          var t = this.get_url_file_slot(e.url);
                          t
                            ? (t.data("file", e.file),
                              t.data("replace-asset-url", e.url))
                            : window.console &&
                              window.console.warn &&
                              window.console.warn(
                                "Could not find slot for URL: " + e.url
                              );
                        }, this)
                      ),
                        _.each(i, function (e) {
                          e.submit();
                        }),
                        (i = !1);
                    }, this),
                    callback_cancel: function () {
                      i = !1;
                    },
                  }))
                : e.submit();
            }, this),
            send: _.bind(function (e) {
              (i = !1),
                _.each(
                  e,
                  _.bind(function (e) {
                    var t = this.get_file_slot(e);
                    t ||
                      (t = this.create_file_slot(
                        this.normalize_file_data({
                          file: e,
                          display_name: e.name,
                          url: "",
                        })
                      )),
                      t.addClass("uploading").removeClass("error");
                  }, this)
                ),
                this.$uploaded_files.scrollTop(
                  this.$uploaded_files.prop("scrollHeight") -
                    this.$uploaded_files.height()
                );
            }, this),
          }
        )),
          (this.upload_static_file_text = new Tumblr.Upload.upload_button(
            this.$el.find("#upload_static_file_text"),
            _.extend(
              {
                button_class: "text_button",
                button_label: __("Add a file"),
                template:
                  '<input type="hidden" name="<%- id %>" value="<%- url %>"/><div class="file_upload <%- button_class %>"><span><%- button_label %></span></div>',
                prepend: !0,
                initialize: function () {
                  (this.$input = this.$el.find('input[type="hidden"]')),
                    (this.$fileinput_container = this.$el.find(".file_upload"));
                },
                id: "static_file_text",
              },
              this.uploader_config_with_warning
            )
          )),
          (this.upload_static_file_dropzone = new Tumblr.Upload.upload_dropzone(
            this.$el.find("#upload_static_file_dropzone"),
            _.extend(
              {
                dropzone_info: __("5 MB max, 15MB per day"),
                id: "static_file_dropzone",
              },
              this.uploader_config_with_warning
            )
          )),
          (this.$content_container = this.$el),
          (this.$popover_container_content = e("#popover_container_content"));
      },
      open: function () {
        this.$el.removeClass("hide");
      },
      close: function () {
        this.$el.addClass("hide");
      },
      cache_selectors: function () {
        this.$uploaded_files = this.$el.find(".uploaded_files");
      },
      drag_start: function (t) {
        if (_.contains(t.originalEvent.dataTransfer.types, "Files")) {
          clearTimeout(this.drag_end_timeout), this.$el.addClass("dragging");
          var i = e(t.target).closest(".dropzone_container");
          i.length && i.find(".dropzone_box").addClass("dragover");
        }
      },
      drag_end: function (t) {
        clearTimeout(this.drag_end_timeout),
          this._drag_end ||
            (this._drag_end = _.bind(function () {
              this.$el.removeClass("dragging");
            }, this));
        var i = e(t.target).closest(".dropzone_container");
        i.length && i.find(".dropzone_box").removeClass("dragover"),
          (this.drag_end_timeout = _.delay(this._drag_end, 50));
      },
      set_editor: function (e) {
        this.editor = e;
      },
      get_url_for_slot: function (t) {
        var i = e(t).closest(".uploaded_file");
        return i.data("url");
      },
      insert_link: function (e) {
        var t = this.get_url_for_slot(e.currentTarget);
        t && this.editor.insert(t.replace(/^http:\/\//i, "https://"));
      },
      create_file_slot: function (t) {
        var i = e(this.uploaded_file_template(t));
        return (
          i.data("file", t.file),
          this.$uploaded_files.append(i),
          this.$el.addClass("has_files"),
          i
        );
      },
      get_url_file_slot: function (t) {
        var i = !1;
        return (
          this.$uploaded_files.children().each(function (s, o) {
            if (e(o).data("url") === t) return (i = e(o)), !1;
          }),
          i
        );
      },
      get_file_slot: function (t) {
        var i = !1;
        return (
          this.$uploaded_files.children().each(function (s, o) {
            if (e(o).data("file") === t) return (i = e(o)), !1;
          }),
          i
        );
      },
      create_replacement_uploader: function (t) {
        var i = e(t);
        return (
          !i.find(".asset_replace .file_upload").length &&
          void (this.upload_static_file_dropzone =
            new Tumblr.Upload.upload_dropzone(
              i.find(".asset_replace"),
              _.extend({}, this.uploader_config, {
                button_class: "text_button",
                button_label: __("Replace"),
                template:
                  '<input type="hidden" name="<%- id %>" value="<%- url %>"/><div class="file_upload <%- button_class %>"><span><%- button_label %></span></div>',
                initialize: function () {
                  (this.$input = this.$el.find('input[type="hidden"]')),
                    (this.$fileinput_container = this.$el.find(".file_upload")),
                    (this.$loader = this.$el.find(".Knight-Rider-loader"));
                },
                send: _.bind(function (e) {
                  _.each(
                    e,
                    _.bind(function (e) {
                      i.find(".progress").width(0),
                        i.data("file", e).addClass("uploading");
                    }, this)
                  );
                }, this),
                success: _.bind(function (e, t, s) {
                  var o = e.replace(/(.*\/)?([^\/]+)/i, "$2");
                  _.each(
                    s,
                    _.bind(function () {
                      var t = i.find(".asset_filename").attr("href");
                      _.each(this.assets, function (i) {
                        i.url === t &&
                          ((i.uploaded = !0),
                          (i.display_name = o),
                          (i.url = e));
                      }),
                        i.removeClass("uploading").data("url", e),
                        i
                          .find(".asset_filename")
                          .attr({ title: e, href: e })
                          .text(o);
                      for (var s = { needle: t }; this.editor.replace(e, s); );
                    }, this)
                  );
                }, this),
                id: "static_file_replace_" + Math.random().toString().substr(2),
              })
            ))
        );
      },
      add_asset_url: function (e) {
        return (e = this.normalize_file_data(e)), this.assets.push(e), e;
      },
      normalize_file_data: function (e) {
        return (
          "string" == typeof e && (e = { url: e }),
          (e = _.extend(
            {
              uploaded: !1,
              in_use: !1,
              display_name: e.url
                ? e.url.replace(/(.*\/)?([^\/]+)/i, "$2")
                : "...",
              url: "",
            },
            e
          ))
        );
      },
      generate_inline_asset_list: function (e) {
        _.each(
          this.find_assets(e),
          _.bind(function (e) {
            if (!_.findWhere(this.assets, { url: e })) {
              var t = this.add_asset_url(e),
                i = this.create_file_slot(t);
              this.create_replacement_uploader(i);
            }
          }, this)
        );
      },
      find_assets: function (e) {
        var t = e.match(/https?:\/\/static\.tumblr\.com\/[^"'?]+/gi) || [],
          i = e.match(/https?:\/\/assets\.tumblr\.com\/[^"'?]+/gi) || [];
        return _.uniq([].concat(t, i));
      },
      show_tooltip_event: function (e) {
        this.show_tooltip(e.currentTarget);
      },
      hide_tooltip_event: function (e) {
        this.hide_tooltip(e.currentTarget);
      },
      show_tooltip: function (t, i) {
        var s = e(t),
          o = s.data("tooltip");
        o ||
          ((o = s.find(".tooltip").clone().addClass("hide")),
          this.$popover_container_content.append(o)),
          s.data("tooltip", o),
          "undefined" != typeof i && o.text(i),
          o.css({
            top: s.offset().top + 0.5 * s.outerHeight(),
            left: s.offset().left + s.outerWidth(),
          }),
          _.defer(function () {
            o.removeClass("hide");
          });
      },
      hide_tooltip: function (t) {
        var i = e(t),
          s = i.data("tooltip");
        s && s.addClass("hide");
      },
      uploaded_file_template: _.template(
        '<li class="uploaded_file" data-url="<%- url %>"><div class="progress"></div><a href="<%- url %>" title="<%- url %>" class="asset_filename" data-asset-action="copy" target="_blank"><%- display_name %></a><div class="file_actions"><div class="asset_replace"></div><div class="text_button" data-asset-action="insert">' +
          __("Insert") +
          "</div></div></li>"
      ),
    });
  })(jQuery, Tumblr),
  Tumblr.Flags.bool("is_dev"))
) {
  var logger = console;
  (logger.time = logger.time || function () {}),
    (logger.timeEnd = logger.timeEnd || function () {}),
    (logger.debug = console.debug || console.log);
} else {
  var logger = {};
  logger.log =
    logger.info =
    logger.warn =
    logger.error =
    logger.debug =
    logger.time =
    logger.timeEnd =
      function () {};
}
Tumblr.Customize.DEMO_BLOG_NAME = "demo";
