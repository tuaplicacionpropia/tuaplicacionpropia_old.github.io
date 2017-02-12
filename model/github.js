var Github;

Github = (function() {

  function Github(app, user, repo, prefixUrl, suffixUrl, typeData) {
    this.app = app;
    this.user = user;//tuaplicacionpropia
    this.repo = repo;//tuaplicacionpropia.github.io
    this.prefixUrl = prefixUrl;
    this.suffixUrl = suffixUrl;
    this.typeData = typeData;
    //var prefixUrl = "https://api.github.com/repos";
    //var prefixUrl = "https://raw.githubusercontent.com";
    //var suffixUrl = "";
    //var suffixUrl = "master/posts/";
  }

  Github.createNew = function (app, user, repo, prefixUrl, suffixUrl) {
    var result = null;
    result = new Github(app, user, repo, prefixUrl, suffixUrl);
    return result;
  };

  Github.createNewMeta = function (app, user, repo) {
    var result = null;
    result = new Github(app, user, repo, "https://api.github.com/repos", "", 'json');
    return result;
  };

  Github.createNewPosts = function (app, user, repo) {
    var result = null;
    result = new Github(app, user, repo, "https://raw.githubusercontent.com", "master/posts/", 'hjson');
    return result;
  };

  Github.prototype.loadArray = function (array, target, thenFn) {
    var length = (array != null ? array.length : 0);
    var numCompletes = 0;
    var fnIncNumCompletes = function () {
      numCompletes = numCompletes + 1;
    };
    for (var i = 0; i < length; i++) {
      var itemUrl = array[i];
      var newTarget = target + "[" + i + "]";
      this.load(itemUrl, newTarget, fnIncNumCompletes);
    }
    var fnCheckComplete = function () {
      if (numCompletes < length) {
        setTimeout(fnCheckComplete, 10);
      }
      else {
        if (thenFn != null) {
          thenFn();
        }
      }
    };
    fnCheckComplete();
  };

  Github.prototype.load = function (url, target, thenFn) {
    var self = this;
    var prefixUrl = this.prefixUrl + "/" + this.user + "/" + this.repo + "/" + this.suffixUrl;

    url = (url != null ? url : "");
    var fullUrl = prefixUrl + url;
    
    var argApp = this.app;
    var argTarget = target;
    var remote_error = argApp._remote_error;

    $.ajax({ 
      url : fullUrl, 
      contentType: 'text/plain; charset=UTF-8', 
      dataType : 'text', 
      type: 'GET', 
      error: function (jqXHR, textStatus, errorThrown) {
        var respdata = {success: 'false', error: errorThrown, status: textStatus, jqXHR: jqXHR};
        remote_error(respdata);
        if (thenFn != null) {
          thenFn();
        }
      },
      success: function (respdata, textStatus, jqXHR) {
        var targetValue = null;
        if (self.typeData == 'hjson') {
          targetValue = Hjson.parse(respdata);
        }
        else {
          targetValue = JSON.parse(respdata);
        }
//list
//list.posts
//list.posts[0]

        var arrayTarget = argTarget.split(".");
        var src = argApp.state;
        src = (src != null ? src : {});
        var targetLength = arrayTarget.length;
        var newState = null;
        for (var i = 0; i < targetLength; i++) {
          var itemTarget = arrayTarget[i];

          var itemTargetIdxStart = itemTarget.indexOf("[");
          var itemTargetIdxEnd = itemTarget.indexOf("]");
          var itemTargetName = (itemTargetIdxStart < 0 ? itemTarget : itemTarget.substring(0, itemTargetIdxStart));
          var itemTargetIndex = (itemTargetIdxStart >= 0 && itemTargetIdxEnd >= 0 ? itemTarget.substring(itemTargetIdxStart + 1, itemTargetIdxEnd) : null);

          if (typeof src[itemTargetName] === "undefined" || src[itemTargetName] === null) {
            var src = (itemTargetIndex != null ? [] : {});
          }
          else {
            var src = src[itemTargetName];
          }

          if (itemTargetIndex != null) {
            var initLength = src.length;
            for (var k = initLength; k <= itemTargetIndex; k++) {
              src.push(null);
            }
            src[itemTargetIndex] = targetValue;
          }

          if (i == 0) {
            newState = {};
            newState[itemTargetName] = (targetLength == 1 && itemTargetIndex == null ? targetValue : src);
          }
        }

        if (newState != null) {
          argApp.setState(newState);
          argApp.forceUpdate();
        }
        if (thenFn != null) {
          thenFn();
        }
      }
    });
  };

  //url=commits
  Github.prototype.loadMetaGit = function (url, target, thenFn) {
    this.load("" + url, target, thenFn);
  };

  Github.prototype.loadMetaData = function (url, target, thenFn) {
    this.load("contents/posts/" + url, target, thenFn);
  };

  return Github;

})();
