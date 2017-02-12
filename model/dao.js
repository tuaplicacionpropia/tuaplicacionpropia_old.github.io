var Dao;

Dao = (function() {

  function Dao(app) {
    this.app = app;
    this.sid = null;
    this.token = null;
    
    this.articles = [];
    this.selectedPost = null;

    this.provMeta = Github.createNewMeta(app, "tuaplicacionpropia", "tuaplicacionpropia.github.io");
    this.provPosts = Github.createNewPosts(app, "tuaplicacionpropia", "tuaplicacionpropia.github.io");
  }

  Dao.createNew = function (app) {
    var result = null;
    result = new Dao(app);
    
    return result;
  };

  Dao.prototype.selectMenu = function (menu) {
    var self = this;
    self.app.setState({complete: false});

    var urlMenu = "contents/posts/";
    if (menu != null) {
      urlMenu = urlMenu + menu;
    }
    self.provMeta.load(urlMenu, "infoMenu", function () {
      var prefix = (menu != null ? menu + '/' : '');

      var infoMenu = self.app.state.infoMenu;
      var length = (infoMenu != null ? infoMenu.length : 0);
      var menus = [];
      var articles = [];
      for (var i = 0; i < length; i++) {
        var itemMenu = infoMenu[i];
        if (itemMenu['type'] == 'dir') {
          var menu2Add = {};
          menu2Add['id'] = itemMenu['path'].substring("posts/".length);
          menu2Add['title'] =  Utils.capFirst(itemMenu['name']);
          menus.push(menu2Add);
        }
        else if (itemMenu['type'] == 'file' && itemMenu['name'].endsWith('.md')) {
          var itemArticle = prefix + itemMenu['name'];
          articles.push(itemArticle);
        }
      }
      if (menu == null) {
        self.app.setState({'menu': menus});
      }

      self.app.setState({'serverPosts': null});
      if (articles.length > 0) {
        self.provPosts.loadArray(articles, 'serverPosts', function () {
          var posts = [];
          var serverPosts = self.app.state.serverPosts;
          var length = (serverPosts != null ? serverPosts.length : 0);
          for (var i = 0; i < length; i++) {
            var serverPost = serverPosts[i];
            posts.push(Article.createNew(serverPost));
          }
          self.app.setState({complete: true, 'posts': posts});
        });
      }
      self.app.setState({complete: true});
    });
  };

  Dao.prototype.loadHome = function () {
    var self = this;
    self.selectMenu(null);
  };


  Dao.prototype.loadLastPosts = function (thenFn) {
    var self = this;
    self.provMeta.load("commits", "commits", function () {
      var commits = self.app.state.commits;
      var codes = [];
      var length = (commits != null ? commits.length : 0);
      for (var i = 0; i < length; i++) {
        var commit = commits[i];
        if (commit != null) {
          if (!(commit == null || typeof commit['sha'] === "undefined" || commit['sha'] === null)) {
            var code = commit['sha'];
            if (code != null) {
              codes.push("commits/" + code);
            }
          }
        }
      }
      self.app.setState({"commits": undefined});
      length = (codes != null ? codes.length : 0);
      if (length > 0) {
        self.provMeta.loadArray(codes, "concreteCommits", function () {
          var concreteCommits = self.app.state.concreteCommits;
          var concreteLength = (concreteCommits != null ? concreteCommits.length : 0);

          var postFiles = [];
          var keyPostFiles = {};

          for (var i = 0; i < concreteLength; i++) {
            var concreteCommit = concreteCommits[i];
            if (concreteCommit != null && !(typeof concreteCommit['files'] === "undefined") && !(concreteCommit['files'] === null) && (concreteCommit['files']).length > 0) {
              var commitAuthor = concreteCommit['commit']['author'];
              var commitAuthorName = commitAuthor['name'];
              var commitAuthorEmail = commitAuthor['email'];
              var commitAuthorDate = commitAuthor['date'];

              var files = concreteCommit['files'];
              var filesLength = files.length;
              for (var j = 0; j < filesLength; j++) {
                var file = files[j];
                var filename = (file != null ? file['filename'] : null);
                if (filename != null && filename.endsWith('.md') && !(filename in keyPostFiles)) {
                  keyPostFiles[filename] = 'true';
                  var postFile = {};
                  
                  postFile['filename'] = filename;
                  postFile['status'] = file['status'];
                  postFile['authorName'] = commitAuthorName;
                  postFile['authorEmail'] = commitAuthorEmail;
                  postFile['date'] = commitAuthorDate;
                  postFiles.push(postFile);
                  if (postFiles.length >= 5) {
                    break;
                  }
                }
              }
            }
          }

          var idPosts = [];
          var postFilesSize = (postFiles != null ? postFiles.length : 0);
          for (var i = 0; i < postFilesSize; i++) {
            var postFile = postFiles[i];
            var filename = postFile['filename'];
            var idPost = filename;
            if (idPost.startsWith('posts/')) {
              idPost = idPost.substring('posts/'.length);
            }
            idPosts.push(idPost);
            //if (i > 2) {
            //  break;
            //}
          }
          if (idPosts.length > 0) {
            self.provPosts.loadArray(idPosts, "posts");
/*
            self.loadArray(idPosts, "lastPostsPlain", function () {
              var lastPostsPlain = self.app.state.lastPostsPlain;
              var lastPostsPlainLength = (lastPostsPlain != null ? lastPostsPlain.length : 0);
              var lastPosts = [];
              for (var i = 0; i < lastPostsPlainLength; i++) {
                var lastPostPlain = lastPostsPlain[i];
                var toAdd = Article.createNew(lastPostPlain);
                var postFile = postFiles[i];
                toAdd.setCreationDate(postFile['date']);
                toAdd.setLastModificationDate(postFile['date']);
                toAdd.setPublishDate(postFile['date']);
                toAdd.setAuthor(postFile['authorName']);
                lastPosts.push(toAdd);
              }
              self.app.setState({"lastPosts": lastPosts});
              self.app.setState({"posts": lastPosts});
            });
*/
          }
        });
      }
    });
  };


  Dao.prototype.listArticles = function() {
    var result = null;
    result = [];

    var posts = this.app.state.posts;
    var length = (posts != null ? posts.length : 0);
    for (var i = 0; i < length; i++) {
      var post = posts[i];
      result.push(Article.createNew(post));
    }

    return result;
  }

  return Dao;

})();
