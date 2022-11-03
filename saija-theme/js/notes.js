function recent_tweets(a) {
  "" == alcyone.twitter ||
    alcyone.hide_twitter ||
    $(document).ready(twitter(a));
}
function twitter(a) {
  for (var b = "", c = [], d = 0; d < a.length; d++)
    if ("@" != a[d].text.substring(0, 1)) {
      c.push(a[d]);
      break;
    }
  c == [] && c.push(a[0]);
  var e = c[0];
  (b +=
    '<li class="tweet"><p class="tweet__text">' +
    parse_tweet(e.text) +
    '</p><p class="tweet__link"><a href="https://twitter.com/' +
    alcyone.twitter +
    "/status/" +
    e.id_str +
    '">' +
    twi_time(e.created_at) +
    "</a></p></li>"),
    $("#twitter").html(b);
}
function parse_tweet(a) {
  function b(a, b) {
    var c = $("<a>", { text: b, href: a, target: "_blank" });
    return c.prop("outerHTML");
  }
  return (
    (a = a.replace(
      /[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g,
      function (a) {
        return b(a, a);
      }
    )),
    (a = a.replace(/[@]+[A-Za-z0-9_]+/g, function (a) {
      return b("http://twitter.com/" + a.replace("@", ""), a);
    })),
    (a = a.replace(/[#]+[A-Za-z0-9_]+/g, function (a) {
      return b("http://search.twitter.com/search?q=" + a.replace("#", ""), a);
    }))
  );
}
function twi_time(a) {
  a = a.replace(/(\+[0-9]{4}\s)/gi, "");
  var b = Date.parse(a),
    c = arguments.length > 1 ? arguments[1] : new Date(),
    d = parseInt((c.getTime() - b) / 6e4);
  return time_ago(d);
}
function time_ago(a) {
  return 0 == a
    ? "now"
    : 1 > a
    ? "less than a minute ago"
    : 2 > a
    ? "a minute ago"
    : 45 > a
    ? parseInt(a).toString() + " minutes ago"
    : 90 > a
    ? "an hour ago"
    : 1440 > a
    ? parseInt(a / 60).toString() + " hours ago"
    : 2880 > a
    ? "1 day ago"
    : parseInt(a / 1440).toString() + " days ago";
}
(function () {
  function a() {}
  function b(a, b) {
    for (var c = a.length; c--; ) if (a[c].listener === b) return c;
    return -1;
  }
  function c(a) {
    return function () {
      return this[a].apply(this, arguments);
    };
  }
  var d = a.prototype,
    e = this,
    f = e.EventEmitter;
  (d.getListeners = function (a) {
    var b,
      c,
      d = this._getEvents();
    if ("object" == typeof a) {
      b = {};
      for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
    } else b = d[a] || (d[a] = []);
    return b;
  }),
    (d.flattenListeners = function (a) {
      var b,
        c = [];
      for (b = 0; a.length > b; b += 1) c.push(a[b].listener);
      return c;
    }),
    (d.getListenersAsObject = function (a) {
      var b,
        c = this.getListeners(a);
      return c instanceof Array && ((b = {}), (b[a] = c)), b || c;
    }),
    (d.addListener = function (a, c) {
      var d,
        e = this.getListenersAsObject(a),
        f = "object" == typeof c;
      for (d in e)
        e.hasOwnProperty(d) &&
          -1 === b(e[d], c) &&
          e[d].push(f ? c : { listener: c, once: !1 });
      return this;
    }),
    (d.on = c("addListener")),
    (d.addOnceListener = function (a, b) {
      return this.addListener(a, { listener: b, once: !0 });
    }),
    (d.once = c("addOnceListener")),
    (d.defineEvent = function (a) {
      return this.getListeners(a), this;
    }),
    (d.defineEvents = function (a) {
      for (var b = 0; a.length > b; b += 1) this.defineEvent(a[b]);
      return this;
    }),
    (d.removeListener = function (a, c) {
      var d,
        e,
        f = this.getListenersAsObject(a);
      for (e in f)
        f.hasOwnProperty(e) &&
          ((d = b(f[e], c)), -1 !== d && f[e].splice(d, 1));
      return this;
    }),
    (d.off = c("removeListener")),
    (d.addListeners = function (a, b) {
      return this.manipulateListeners(!1, a, b);
    }),
    (d.removeListeners = function (a, b) {
      return this.manipulateListeners(!0, a, b);
    }),
    (d.manipulateListeners = function (a, b, c) {
      var d,
        e,
        f = a ? this.removeListener : this.addListener,
        g = a ? this.removeListeners : this.addListeners;
      if ("object" != typeof b || b instanceof RegExp)
        for (d = c.length; d--; ) f.call(this, b, c[d]);
      else
        for (d in b)
          b.hasOwnProperty(d) &&
            (e = b[d]) &&
            ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
      return this;
    }),
    (d.removeEvent = function (a) {
      var b,
        c = typeof a,
        d = this._getEvents();
      if ("string" === c) delete d[a];
      else if ("object" === c)
        for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
      else delete this._events;
      return this;
    }),
    (d.removeAllListeners = c("removeEvent")),
    (d.emitEvent = function (a, b) {
      var c,
        d,
        e,
        f,
        g = this.getListenersAsObject(a);
      for (e in g)
        if (g.hasOwnProperty(e))
          for (d = g[e].length; d--; )
            (c = g[e][d]),
              c.once === !0 && this.removeListener(a, c.listener),
              (f = c.listener.apply(this, b || [])),
              f === this._getOnceReturnValue() &&
                this.removeListener(a, c.listener);
      return this;
    }),
    (d.trigger = c("emitEvent")),
    (d.emit = function (a) {
      var b = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(a, b);
    }),
    (d.setOnceReturnValue = function (a) {
      return (this._onceReturnValue = a), this;
    }),
    (d._getOnceReturnValue = function () {
      return this.hasOwnProperty("_onceReturnValue")
        ? this._onceReturnValue
        : !0;
    }),
    (d._getEvents = function () {
      return this._events || (this._events = {});
    }),
    (a.noConflict = function () {
      return (e.EventEmitter = f), a;
    }),
    "function" == typeof define && define.amd
      ? define("eventEmitter/EventEmitter", [], function () {
          return a;
        })
      : "object" == typeof module && module.exports
      ? (module.exports = a)
      : (this.EventEmitter = a);
}.call(this),
  (function (a) {
    function b(b) {
      var c = a.event;
      return (c.target = c.target || c.srcElement || b), c;
    }
    var c = document.documentElement,
      d = function () {};
    c.addEventListener
      ? (d = function (a, b, c) {
          a.addEventListener(b, c, !1);
        })
      : c.attachEvent &&
        (d = function (a, c, d) {
          (a[c + d] = d.handleEvent
            ? function () {
                var c = b(a);
                d.handleEvent.call(d, c);
              }
            : function () {
                var c = b(a);
                d.call(a, c);
              }),
            a.attachEvent("on" + c, a[c + d]);
        });
    var e = function () {};
    c.removeEventListener
      ? (e = function (a, b, c) {
          a.removeEventListener(b, c, !1);
        })
      : c.detachEvent &&
        (e = function (a, b, c) {
          a.detachEvent("on" + b, a[b + c]);
          try {
            delete a[b + c];
          } catch (d) {
            a[b + c] = void 0;
          }
        });
    var f = { bind: d, unbind: e };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", f)
      : (a.eventie = f);
  })(this),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(
          ["eventEmitter/EventEmitter", "eventie/eventie"],
          function (c, d) {
            return b(a, c, d);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("wolfy87-eventemitter"),
          require("eventie")
        ))
      : (a.imagesLoaded = b(a, a.EventEmitter, a.eventie));
  })(window, function (a, b, c) {
    function d(a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }
    function e(a) {
      return "[object Array]" === m.call(a);
    }
    function f(a) {
      var b = [];
      if (e(a)) b = a;
      else if ("number" == typeof a.length)
        for (var c = 0, d = a.length; d > c; c++) b.push(a[c]);
      else b.push(a);
      return b;
    }
    function g(a, b, c) {
      if (!(this instanceof g)) return new g(a, b);
      "string" == typeof a && (a = document.querySelectorAll(a)),
        (this.elements = f(a)),
        (this.options = d({}, this.options)),
        "function" == typeof b ? (c = b) : d(this.options, b),
        c && this.on("always", c),
        this.getImages(),
        j && (this.jqDeferred = new j.Deferred());
      var e = this;
      setTimeout(function () {
        e.check();
      });
    }
    function h(a) {
      this.img = a;
    }
    function i(a) {
      (this.src = a), (n[a] = this);
    }
    var j = a.jQuery,
      k = a.console,
      l = void 0 !== k,
      m = Object.prototype.toString;
    (g.prototype = new b()),
      (g.prototype.options = {}),
      (g.prototype.getImages = function () {
        this.images = [];
        for (var a = 0, b = this.elements.length; b > a; a++) {
          var c = this.elements[a];
          "IMG" === c.nodeName && this.addImage(c);
          var d = c.nodeType;
          if (d && (1 === d || 9 === d || 11 === d))
            for (
              var e = c.querySelectorAll("img"), f = 0, g = e.length;
              g > f;
              f++
            ) {
              var h = e[f];
              this.addImage(h);
            }
        }
      }),
      (g.prototype.addImage = function (a) {
        var b = new h(a);
        this.images.push(b);
      }),
      (g.prototype.check = function () {
        function a(a, e) {
          return (
            b.options.debug && l && k.log("confirm", a, e),
            b.progress(a),
            c++,
            c === d && b.complete(),
            !0
          );
        }
        var b = this,
          c = 0,
          d = this.images.length;
        if (((this.hasAnyBroken = !1), !d)) return void this.complete();
        for (var e = 0; d > e; e++) {
          var f = this.images[e];
          f.on("confirm", a), f.check();
        }
      }),
      (g.prototype.progress = function (a) {
        this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded;
        var b = this;
        setTimeout(function () {
          b.emit("progress", b, a),
            b.jqDeferred && b.jqDeferred.notify && b.jqDeferred.notify(b, a);
        });
      }),
      (g.prototype.complete = function () {
        var a = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var b = this;
        setTimeout(function () {
          if ((b.emit(a, b), b.emit("always", b), b.jqDeferred)) {
            var c = b.hasAnyBroken ? "reject" : "resolve";
            b.jqDeferred[c](b);
          }
        });
      }),
      j &&
        (j.fn.imagesLoaded = function (a, b) {
          var c = new g(this, a, b);
          return c.jqDeferred.promise(j(this));
        }),
      (h.prototype = new b()),
      (h.prototype.check = function () {
        var a = n[this.img.src] || new i(this.img.src);
        if (a.isConfirmed)
          return void this.confirm(a.isLoaded, "cached was confirmed");
        if (this.img.complete && void 0 !== this.img.naturalWidth)
          return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
        var b = this;
        a.on("confirm", function (a, c) {
          return b.confirm(a.isLoaded, c), !0;
        }),
          a.check();
      }),
      (h.prototype.confirm = function (a, b) {
        (this.isLoaded = a), this.emit("confirm", this, b);
      });
    var n = {};
    return (
      (i.prototype = new b()),
      (i.prototype.check = function () {
        if (!this.isChecked) {
          var a = new Image();
          c.bind(a, "load", this),
            c.bind(a, "error", this),
            (a.src = this.src),
            (this.isChecked = !0);
        }
      }),
      (i.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (i.prototype.onload = function (a) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(a);
      }),
      (i.prototype.onerror = function (a) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(a);
      }),
      (i.prototype.confirm = function (a, b) {
        (this.isConfirmed = !0),
          (this.isLoaded = a),
          this.emit("confirm", this, b);
      }),
      (i.prototype.unbindProxyEvents = function (a) {
        c.unbind(a.target, "load", this), c.unbind(a.target, "error", this);
      }),
      g
    );
  }),
  $(document).ready(function () {
    function post_Photoset($post, height, mar, id) {
      var $ps = $post.find(".photoset");
      eval($post.find(".photoset__json").text()),
        alcyone.hide_zoom_button ||
          $("#zoom-" + id).on("click", function () {
            return window.parent.Tumblr.Lightbox.init(photoset[id], 1), !1;
          });
      var $ifrm = $("<div></div>");
      $ifrm.html($ps.find(".photoset__iframe").text());
      var psheight = $ifrm.find("iframe").attr("height"),
        layout = $ps.data("layout").toString().split(""),
        gaps = layout.length - 1;
      if (0 == gaps)
        var g = layout[0] - 1,
          postwidth = (height * (500 - 10 * g)) / psheight + mar * g;
      else
        var postwidth = (500 * (height - gaps * mar)) / (psheight - 10 * gaps);
      var url = $ifrm
        .find("iframe")
        .attr("src")
        .replace("/500/", "/" + postwidth + "/");
      $ps.load(url, function () {
        $ps.addClass("photoset--responsive"),
          post_Scale($post, postwidth / height),
          $ps.find("style").remove();
        var a = 0,
          b = [];
        $.each(layout, function (c, d) {
          b.push(3);
          var d = parseInt(d);
          if (1 == d) return void a++;
          for (i = a; i < parseInt(d) + a; ++i) {
            var e =
              parseInt(photoset[id][i].height) /
              parseInt(photoset[id][i].width);
            e < b[c] && (b[c] = e);
          }
          (a += parseInt(d)),
            2 == d && (b[c] = (b[c] * postwidth) / (2 * postwidth + mar)),
            3 == d && (b[c] = (b[c] * postwidth) / (3 * postwidth + 2 * mar)),
            $ps
              .find(".photoset_row")
              .eq(c)
              .css("padding-top", 100 * b[c] + "%");
        }),
          $ps.find(".photoset_photo").each(function () {
            var a = parseInt($(this).data("photoset-index")) - 1;
            $(this).css(
              "background-image",
              "url('" + photoset[id][a].low_res + "')"
            );
          });
      });
    }
    function post_Audio(a) {
      var b = a.find(".audio__player");
      if (b.find(".tumblr_audio_player").length) {
        b.addClass("native");
        var c = b.find(".tumblr_audio_player"),
          d = c.attr("src"),
          e = alcyone.color_post_background.split(","),
          f = parseInt(e[0]) + parseInt(e[1]) + parseInt(e[2]),
          g = "default";
        765 == f ? (g = "white") : 400 > f && (g = "black"),
          (d = d.replace("color=white", "color=" + g)),
          b.hasClass("audio__player--art") ||
            (d = d.replace("simple=1", "simple=0")),
          c.attr("src", d);
      } else b.find(".soundcloud_audio_player").length ? (b.addClass("soundcloud"), post_Scale(a, 1)) : b.find(".spotify_audio_player").length && (b.addClass("spotify"), b.height(80));
    }
    function componentToHex(a) {
      var b = a.toString(16);
      return 1 == b.length ? "0" + b : b;
    }
    function rgbToHex(a) {
      for (a = a.split(","), i = 0; i < 3; i++) a[i] = parseInt(a[i]);
      return componentToHex(a[0]) + componentToHex(a[1]) + componentToHex(a[2]);
    }
    function post_Video(a) {
      var b = a.find(".video__player iframe");
      if (b.hasClass("tumblr_video_iframe"));
      else if (b.attr("src").indexOf("youtube") > 0) {
        var c = "&autohide=1&showinfo=0&color=white";
        alcyone.light_youtube_player && (c += "&theme=light"),
          b.attr("src", b.attr("src") + c);
      } else if (b.attr("src").indexOf("vimeo") > 0) {
        var c = "&color=" + rgbToHex(alcyone.color_accent);
        b.attr("src", b.attr("src") + c);
      }
      var d = b.attr("width") / b.attr("height");
      post_Scale(a, d);
    }
    function post_Img(a, b, c) {
      var d = a.attr("src"),
        e = ["high", "500", "400", "250", "100"];
      for (i = 0; i < e.length; i++) {
        var f = a.data(e[i + 1] + "-height");
        if (b > f) {
          d = a.data(e[i] + "-src");
          break;
        }
      }
      a.attr("src", d);
      var g = !1;
      imagelink &&
        ((g = !0),
        a.parents("a").length &&
          (a
            .parents("a")
            .attr("href")
            .indexOf("/image/" + c) > -1
            ? a.unwrap()
            : (g = !1))),
        g &&
          "permalink" == imagelink &&
          alcyone.index &&
          a.wrap('<a href="' + a.closest(".post").data("link") + '">'),
        g &&
          "lightbox" == imagelink &&
          a.css("cursor", "pointer").on("click", function () {
            $zoom = $(this);
            var a = [
              {
                width: $zoom.data("high-width"),
                height: $zoom.data("high-height"),
                low_res: $zoom.data("250-src"),
                high_res: $zoom.data("high-src"),
              },
            ];
            return window.parent.Tumblr.Lightbox.init(a, 1), !1;
          });
    }
    function post_Scale(a, b) {
      a.width(postheight * b)
        .addClass("post--scale")
        .data("scale", b);
    }
    function fixheader(a) {
      $("#content_outer").css("padding-top", a + "px");
    }
    function postheight_eval() {
      var a = 0;
      return (
        (a = header
          ? $(window).height() - headerheight_eval() - postmargin
          : $(window).height() - 2 * postmargin),
        postheight_original > a ? a : postheight_original
      );
    }
    function rescale(a) {
      $(".post--scale").each(function () {
        ($post = $(this)), $post.width(a * $post.data("scale") + "px");
      });
    }
    function posts_layout(a) {
      (page_loading = !0),
        $(a)
          .hide()
          .post()
          .imagesLoaded()
          .always(function () {
            (page_loading = !1), $(a).show();
          });
    }
    function checkpage(a) {
      a == total_pages &&
        setTimeout(function () {
          $("#pagination__loader").addClass("done");
        }, 3e3);
      var b = 10,
        c = b;
      if ((1 == page_start && (c = b - 2), a == page_start + c)) {
        $container.infinitescroll("unbind"),
          $(".pagination").show(),
          (page_limit = !0);
        var d = $("#loadmore")
          .attr("href")
          .replace(page_start + 1, a + 1);
        $("#loadmore")
          .attr("href", d)
          .on("click", function () {
            return (
              history.pushState("", "", d),
              $("html, body").animate({ scrollLeft: 0 }, 500),
              setTimeout(function () {
                (page_limit = !1),
                  (page_loading = !0),
                  $container.find(".post.infscr").remove(),
                  $(".pagination").hide(),
                  $container.infinitescroll("bind").infinitescroll("scroll");
              }, 500),
              !1
            );
          }),
          (page_start = a);
      }
    }
    function postnotify(a) {
      var b = "",
        c = "",
        d = "",
        e = !1;
      return (
        $("li", a).each(function () {
          ($note = $(this)),
            $note.hasClass("with_commentary")
              ? (b +=
                  '<li class="add"><p class="comment">' +
                  $note.find("blockquote").html() +
                  '</p><p class="meta">' +
                  $note.find(".avatar_frame").outerHTML() +
                  $note.find(".tumblelog").outerHTML() +
                  " added <span>(reblogged from " +
                  $note.find(".source_tumblelog").outerHTML() +
                  ")</span></p></li>")
              : $note.hasClass("reply")
              ? (b +=
                  '<li class="reply"><p class="comment">' +
                  $note.find(".answer_content").html() +
                  '</p><p class="meta">' +
                  $note.find(".avatar_frame").outerHTML() +
                  $note.find(".action a").outerHTML() +
                  " replied</p></li>")
              : $note.hasClass("original_post") ||
                ($note.hasClass("answer")
                  ? (b +=
                      '<li class="answer"><p class="comment">' +
                      $note.find(".answer_content").html() +
                      '</p><p class="meta">' +
                      $note.find(".avatar_frame").outerHTML() +
                      $note.find(".action a").outerHTML() +
                      " answered</p></li>")
                  : $note.hasClass("reblog")
                  ? (c +=
                      '<li><a href="' +
                      $note.find(".avatar_frame").attr("href") +
                      '" title="' +
                      $note.find(".tumblelog").text() +
                      "&ensp;&lsaquo;&ensp;" +
                      $note.find(".source_tumblelog").text() +
                      '">' +
                      $note.find(".avatar_frame").html() +
                      "</a></li>")
                  : $note.hasClass("like")
                  ? (d +=
                      '<li><a href="' +
                      $note.find(".avatar_frame").attr("href") +
                      '" title="' +
                      $note.find(".action a").text() +
                      '">' +
                      $note.find(".avatar_frame").html() +
                      "</a></li>")
                  : $note.hasClass("more_notes_link_container") &&
                    (e =
                      "http://" +
                      domain +
                      "/notes/" +
                      $note.html().match(/\'\/notes\/(.*?)\&amp;/i)[1] +
                      "&large=true"));
        }),
        { comms: b, reblogs: c, likes: d, next: e }
      );
    }
    function morenotesinit() {
      $("#loadmorenotes").one("click", function () {
        return (
          $("#pagination__loader--notes").fadeIn(),
          $.ajax({
            url: $(this).attr("href"),
            dataType: "html",
            timeout: 5e4,
            success: function (a) {
              morenotes(a),
                $("#pagination__loader--notes").fadeOut(),
                morenotesinit();
            },
            error: function () {
              $(this).append("Error loading notes");
            },
          }),
          !1
        );
      });
    }
    function morenotes(a) {
      var a = postnotify($(a));
      $(".notes__module--comments").append(a.comms),
        $(".notes__module--reblogs").append(a.reblogs),
        $(".notes__module--likes").append(a.likes),
        "" != a.comms && $(".post--notes--comments").removeClass("post--empty"),
        "" != a.reblogs &&
          $(".post--notes--reblogs").removeClass("post--empty"),
        "" != a.likes && $(".post--notes--likes").removeClass("post--empty"),
        a.next
          ? $("#loadmorenotes").attr("href", a.next)
          : $("#loadmorenotesouter").remove();
    }
    $(".no-js").removeClass("no-js");
    var postmargin = parseInt(alcyone.post_margin),
      postheight = parseInt(alcyone.post_height),
      postheight_original = parseInt(alcyone.post_height);
    postheight > 1200 && (postheight = 1200);
    var imagelink = alcyone.redirect_tumblr_image_links;
    "no" == imagelink && (imagelink = !1);
    var likebutton = !alcyone.hide_like_button,
      posts = 0,
      $container = $("#content");
    alcyone.hide_zoom_button ||
      $container.on("click", ".lightbox-link", function () {
        $zoom = $(this);
        var a = [
          {
            width: $zoom.data("width"),
            height: $zoom.data("height"),
            low_res: $zoom.data("low-res"),
            high_res: $zoom.data("high-res"),
          },
        ];
        return window.parent.Tumblr.Lightbox.init(a, 1), !1;
      }),
      (photoset = []),
      (jQuery.fn.post = function () {
        return this.each(function () {
          posts++, ($post = $(this));
          var a = $post.data("id");
          if ($post.data("tags")) {
            (tags = $post
              .data("tags")
              .replace(/\ /g, " tag-")
              .replace(/\_/g, "-")
              .toLowerCase()),
              $post
                .attr("class", $post.attr("class") + tags)
                .attr("data-tags", "");
            var b = $post.find('.tag[data-tag^="photoset-"]');
            b.length &&
              (b.remove(),
              $post.find(".post__tags .tag").length ||
                $post.find(".post__tags").remove());
          }
          var c = postheight;
          $post.find(".img--responsive").each(function () {
            post_Img($(this), c, a);
          }),
            $post.hasClass("post--photoset")
              ? post_Photoset(
                  $post,
                  c,
                  parseInt(alcyone.photoset_image_margin),
                  a
                )
              : $post.hasClass("post--audio")
              ? post_Audio($post)
              : $post.hasClass("post--video") && post_Video($post, c);
        });
      });
    var $header = $("#header"),
      header_display = alcyone.header_display;
    header = "header" == header_display.substr(0, 6) ? !0 : !1;
    var headerheight_eval = function () {
      return $header.outerHeight(!0);
    };
    header &&
      $header.imagesLoaded().done(function () {
        fixheader(headerheight_eval()),
          $("#content_outer").addClass("content--absolute"),
          $header.addClass(
            "headerfixed" == header_display
              ? "header--fixed"
              : "header--absolute"
          );
      }),
      "sidebarfixed" == header_display &&
        ($("#content_outer").css("margin-left", $header.outerWidth(!0) + "px"),
        $header.addClass("header--fixed")),
      (postheight = postheight_eval());
    var try_layout = !1,
      headerheight = headerheight_eval();
    if (
      ($(window).resize(function () {
        try_layout = !0;
      }),
      setInterval(function () {
        try_layout &&
          ((try_layout = !1),
          postheight != postheight_eval() &&
            ((postheight = postheight_eval()), rescale(postheight)),
          header &&
            headerheight != headerheight_eval() &&
            ((headerheight = headerheight_eval()), fixheader(headerheight)));
      }, 20),
      alcyone.index)
    ) {
      "buttons" != alcyone.permalink_display &&
        $(".content").on("click", ".permalink__button--link", function () {
          var a = $(this).closest(".post");
          return a.add($(".post--open")).toggleClass("post--open"), !1;
        });
      var page_start = parseInt(alcyone.page),
        page = page_start,
        total_pages = alcyone.total_pages,
        page_loading = !1,
        page_limit = !1;
      $(".post.infscr")
        .post()
        .imagesLoaded()
        .always(function () {
          $("#pagination__loader--init").remove();
        }),
        alcyone.infinite_scroll &&
          $container.infinitescroll(
            {
              navSelector: ".pagination",
              nextSelector: "#loadmore",
              itemSelector: ".post.infscr",
              extraScrollPx: 1e3,
              prefill: !1,
              state: { currPage: page_start },
              loading: {
                msg: $(
                  '<div id="pagination__loader" class="pagination__loader"></div>'
                ),
                msgText: "loading",
                msgText: "",
                selector: ".shell",
              },
            },
            function (a) {
              page++,
                checkpage(page),
                posts_layout(a),
                Tumblr.LikeButton.get_status_by_page(page);
            }
          );
    } else if (
      ($(".post").post(), !alcyone.classic_post_notes && $("#notes").length)
    ) {
      var $notes = $("#notes"),
        $outer = $("#notesouter");
      $.fn.outerHTML = function () {
        var a;
        if (this.length) {
          if (!(a = this[0].outerHTML)) {
            a = this[0];
            var b = document.createElement("div");
            b.appendChild(a.cloneNode(!0)), (a = b.innerHTML);
          }
        } else a = this;
        return a;
      };
      var domain = alcyone.name + ".tumblr.com";
      $notes.data("url").indexOf(alcyone.name + ".tumblr.com") < 0 &&
        (domain = $notes.data("url").split("/")[2]);
      var notes = postnotify($notes),
        string = "";
      (string += '<article class="post post--notes post--notes--comments'),
        (string += "" == notes.comms ? " post--empty" : ""),
        (string +=
          '"><section class="post__content notes__module notes__module--comments">' +
          notes.comms +
          "</section></article>"),
        (string += '<article class="post post--notes post--notes--reblogs'),
        (string += "" == notes.reblogs ? " post--empty" : ""),
        (string +=
          '"><section class="post__content notes__module notes__module--reblogs notes__module--thumbs clearfix">' +
          notes.reblogs +
          "</section></article>"),
        (string += '<article class="post post--notes post--notes--likes'),
        (string += "" == notes.likes ? " post--empty" : ""),
        (string +=
          '"><section class="post__content notes__module notes__module--likes notes__module--thumbs clearfix">' +
          notes.likes +
          "</section></article>"),
        notes.next
          ? (string +=
              '<nav class="post pagination" id="loadmorenotesouter"><a href="' +
              notes.next +
              '" title="load more notes" class="next button button--right" id="loadmorenotes"></a></nav>')
          : $notes.addClass("done"),
        $outer.after(string).remove(),
        morenotesinit(),
        $("#pagination__loader--notes").fadeOut(),
        $("#loadmorenotes").on("click", function () {
          return !1;
        });
    }
  }));
