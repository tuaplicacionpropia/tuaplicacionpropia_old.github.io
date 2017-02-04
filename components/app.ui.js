var AppUI = React.createClass({
  displayName: "AppUI",


  componentWillMount: function () {
    var self = this;
    console.log('location = ' + window.location.href);
    self.setState({ complete: false });
    var dao = Dao.createNew(this);

    //file:///home/jmramoss/almacen/webtuaplicacionpropia/index.html?javascript/intro_reactjs.md
    //file:///home/jmramoss/almacen/webtuaplicacionpropia/index.html?www/github_api_rest.md
    var href = window.location.href;
    var paramsIdx = href.indexOf("?");
    if (paramsIdx > -1) {
      var option = href.substring(paramsIdx + 1);
      if (option.endsWith(".md")) {
        dao.loadObject(option, "post2Open", function () {
          self._openPost(Article.createNew(self.state.post2Open));
        });
      } else {
        dao.selectMenu(option);
      }
    } else {
      dao.loadHome();
      dao.loadLastPosts();
    }

    this.setState({ dao: dao });
  },

  componentDidMount: function () {
    var self = this;
  },

  componentDidUpdate: function () {
    var self = this;
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    var result = true;
    var self = this;

    if (typeof nextState["complete"] !== "undefined") {
      result = nextState["complete"];
    }

    return result;
  },

  _renderHeader: function () {
    return React.createElement(
      "div",
      { className: "header" },
      this._renderHeaderTop(),
      this._renderHeaderBottom()
    );
  },

  _renderHeaderTop: function () {
    return React.createElement(
      "div",
      { className: "header-top" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "logo" },
          React.createElement(
            "a",
            { href: "index.html" },
            React.createElement(
              "h1",
              null,
              "TU APLICACI\xD3N PROPIA"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "search" },
          React.createElement(
            "form",
            null,
            React.createElement("input", { type: "text", value: "Search", onfocus: "this.value = '';", onblur: "if (this.value == '') {this.value = 'Search';}" }),
            React.createElement("input", { type: "submit", value: "" })
          )
        ),
        React.createElement(
          "div",
          { className: "social" },
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "https://www.facebook.com/tuaplicacionpropia", target: "_blank", className: "facebook" },
                " "
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "https://twitter.com/tuaplicacionpro", target: "_blank", className: "facebook twitter" },
                " "
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "https://plus.google.com/112667009554417038338?hl=es", target: "_blank", className: "facebook chrome" },
                " "
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "https://www.linkedin.com/in/jes%C3%BAs-mar%C3%ADa-ramos-saky-835871121/", target: "_blank", className: "facebook in" },
                " "
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "https://www.youtube.com/channel/UCZ0Y_Mh6iRsNp3jt5lbL7qg", target: "_blank", className: "facebook yout" },
                " "
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "https://github.com/tuaplicacionpropia/tuaplicacionpropia.github.io", target: "_blank" },
                React.createElement("i", { className: "fa fa-github", "aria-hidden": "true" })
              )
            )
          )
        ),
        React.createElement("div", { className: "clearfix" })
      )
    );
  },

  _renderHeaderBottom: function () {
    return React.createElement(
      "div",
      { className: "head-bottom" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "navbar-header" },
          React.createElement(
            "button",
            { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar" },
            React.createElement(
              "span",
              { className: "sr-only" },
              "Toggle navigation"
            ),
            React.createElement("span", { className: "icon-bar" }),
            React.createElement("span", { className: "icon-bar" }),
            React.createElement("span", { className: "icon-bar" })
          )
        ),
        React.createElement(
          "div",
          { id: "navbar", className: "navbar-collapse collapse" },
          this._renderTopMenu()
        )
      )
    );
  },

  _renderMenuitem: function (menuitem) {
    var result = null;
    if (menuitem.menu != null && menuitem.menu.length > 0) {
      var result = this._renderMenuitemContainer(menuitem);
    } else {
      var result = this._renderMenuitemLeaf(menuitem);
    }
    return result;
  },

  _openMenu: function (menuitem) {
    this.state.dao.selectMenu(menuitem.id);
    //alert(menuitem);
  },

  _openHome: function (menuitem) {
    this.state.dao.selectMenu(null);
    //alert(menuitem);
  },

  _renderMenuitemLeaf: function (menuitem) {
    return React.createElement(
      "li",
      null,
      React.createElement(
        "a",
        { href: "javascript:void(0)", onClick: this._openMenu.bind(this, menuitem) },
        menuitem.title
      )
    );
  },

  _renderMenuitemContainer: function (menuitem) {
    var result = null;
    var options = [];
    if (menuitem.menu != null && menuitem.menu.length > 0) {
      for (var j = 0; j < menuitem.menu.length; j++) {
        var menuitemSuboption = menuitem.menu[j];
        var option = this._renderMenuitem(menuitemSuboption);
        options.push(option);
      }
    }
    var result = React.createElement(
      "li",
      { className: "dropdown" },
      React.createElement(
        "a",
        { href: "javascript:void(0)", className: "dropdown-toggle", "data-toggle": "dropdown", role: "button", "aria-haspopup": "true", "aria-expanded": "false" },
        menuitem.title,
        " ",
        React.createElement("span", { className: "caret" })
      ),
      React.createElement(
        "ul",
        { className: "dropdown-menu" },
        options
      )
    );
    return result;
  },

  _renderTopMenu: function () {
    var result = null;
    var menu = this.state.menu; //dao.loadMenu();
    //console.log('posts = ' + menu[0].posts);
    var length = menu != null ? menu.length : 0;
    var options = [];
    for (var i = 0; i < length; i++) {
      var menuitem = menu[i];
      var option = this._renderMenuitem(menuitem);
      options.push(option);
    }
    var result = React.createElement(
      "ul",
      { className: "nav navbar-nav" },
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "javascript:void(0)", onClick: this._openHome.bind(this) },
          "Inicio"
        )
      ),
      options
    );
    return result;
  },

  _renderTopMenu2: function () {
    return React.createElement(
      "ul",
      { className: "nav navbar-nav" },
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "index.html" },
          "Home"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "videos.html" },
          "Videos"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "reviews.html" },
          "Reviews"
        )
      ),
      React.createElement(
        "li",
        { className: "dropdown" },
        React.createElement(
          "a",
          { href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", role: "button", "aria-haspopup": "true", "aria-expanded": "false" },
          "Tech ",
          React.createElement("span", { className: "caret" })
        ),
        React.createElement(
          "ul",
          { className: "dropdown-menu" },
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "tech.html" },
              "Action"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "tech.html" },
              "Action"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "tech.html" },
              "Action"
            )
          )
        )
      ),
      React.createElement(
        "li",
        { className: "dropdown" },
        React.createElement(
          "a",
          { href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", role: "button", "aria-haspopup": "true", "aria-expanded": "false" },
          "Culture ",
          React.createElement("span", { className: "caret" })
        ),
        React.createElement(
          "ul",
          { className: "dropdown-menu" },
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "singlepage.html" },
              "Action"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "singlepage.html" },
              "Action"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "singlepage.html" },
              "Action"
            )
          )
        )
      ),
      React.createElement(
        "li",
        { className: "dropdown" },
        React.createElement(
          "a",
          { href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", role: "button", "aria-haspopup": "true", "aria-expanded": "false" },
          "Science ",
          React.createElement("span", { className: "caret" })
        ),
        React.createElement(
          "ul",
          { className: "dropdown-menu" },
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "singlepage.html" },
              "Action"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "singlepage.html" },
              "Action"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "singlepage.html" },
              "Action"
            )
          )
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "design.html" },
          "Design"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "business.html" },
          "Business"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "world.html" },
          "World"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "forum.html" },
          "Forum"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "contact.html" },
          "Contact"
        )
      )
    );
  },

  _openPost: function (post) {
    $('meta[itemprop=image]').attr('content', 'http://tuaplicacionpropia.com/images/banner1.jpg');
    this.state.dao.selectedPost = post;
    this.forceUpdate();
    //alert('periquito ' + post.title);
  },

  _renderBanner: function () {
    var result = [];
    var articles = this.state.dao.listArticles();
    var length = articles != null ? articles.length : 0;

    if (length > 0) {
      var index = Utils.randInt(length);

      var self = this;
      var fnOpenPost = function (post) {
        self._openPost(post);
      };
      var article = articles[index];
      var wArticle = newArticleUI({ mold: "banner", item: article, openPost: fnOpenPost });
      result.push(wArticle);
    }

    return result;
  },

  _renderContent: function () {
    return React.createElement(
      "div",
      { className: "technology" },
      this._renderMainContent()
    );
  },

  _renderMainContent: function () {
    var content = null;
    if (this.state.dao.selectedPost == null) {
      var content = this._renderArticles();
    } else {
      var content = newArticleUI({ mold: "full", item: this.state.dao.selectedPost });
    }
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "col-md-9 technology-left" },
        React.createElement(
          "div",
          null,
          content
        )
      ),
      this._renderSidePanel(),
      React.createElement("div", { className: "clearfix" })
    );
  },

  _renderArticles: function () {
    var result = [];
    var articles = this.state.dao.listArticles();
    var length = articles != null ? articles.length : 0;
    var self = this;
    var fnOpenPost = function (post) {
      self._openPost(post);
    };

    for (var i = 0; i < length; i++) {
      var article = articles[i];
      var wArticle = newArticleUI({ mold: "resume", item: article, openPost: fnOpenPost });
      result.push(wArticle);
    }
    return result;
  },

  _renderSidePanel: function () {
    return React.createElement(
      "div",
      { className: "col-md-3 technology-right" },
      React.createElement(
        "div",
        { className: "blo-top" },
        React.createElement(
          "div",
          { className: "tech-btm" },
          React.createElement("img", { src: "images/banner1.jpg", className: "img-responsive", alt: "" })
        )
      ),
      React.createElement(
        "div",
        { className: "blo-top" },
        React.createElement(
          "div",
          { className: "tech-btm" },
          React.createElement(
            "h4",
            null,
            "Sign up to our newsletter"
          ),
          React.createElement(
            "p",
            null,
            "Pellentesque dui, non felis. Maecenas male"
          ),
          React.createElement(
            "div",
            { className: "name" },
            React.createElement(
              "form",
              null,
              React.createElement("input", { type: "text", placeholder: "Email", required: "" })
            )
          ),
          React.createElement(
            "div",
            { className: "button" },
            React.createElement(
              "form",
              null,
              React.createElement("input", { type: "submit", value: "Subscribe" })
            )
          ),
          React.createElement(
            "div",
            { className: "clearfix" },
            " "
          )
        )
      ),
      React.createElement(
        "div",
        { className: "blo-top1" },
        React.createElement(
          "div",
          { className: "tech-btm" },
          React.createElement(
            "h4",
            null,
            "Top stories of the week "
          ),
          React.createElement(
            "div",
            { className: "blog-grids" },
            React.createElement(
              "div",
              { className: "blog-grid-left" },
              React.createElement(
                "a",
                { href: "singlepage.html" },
                React.createElement("img", { src: "images/6.jpg", className: "img-responsive", alt: "" })
              )
            ),
            React.createElement(
              "div",
              { className: "blog-grid-right" },
              React.createElement(
                "h5",
                null,
                React.createElement(
                  "a",
                  { href: "singlepage.html" },
                  "Pellentesque dui, non felis. Maecenas male"
                ),
                " "
              )
            ),
            React.createElement(
              "div",
              { className: "clearfix" },
              " "
            )
          ),
          React.createElement(
            "div",
            { className: "blog-grids" },
            React.createElement(
              "div",
              { className: "blog-grid-left" },
              React.createElement(
                "a",
                { href: "singlepage.html" },
                React.createElement("img", { src: "images/7.jpg", className: "img-responsive", alt: "" })
              )
            ),
            React.createElement(
              "div",
              { className: "blog-grid-right" },
              React.createElement(
                "h5",
                null,
                React.createElement(
                  "a",
                  { href: "singlepage.html" },
                  "Pellentesque dui, non felis. Maecenas male"
                ),
                " "
              )
            ),
            React.createElement(
              "div",
              { className: "clearfix" },
              " "
            )
          ),
          React.createElement(
            "div",
            { className: "blog-grids" },
            React.createElement(
              "div",
              { className: "blog-grid-left" },
              React.createElement(
                "a",
                { href: "singlepage.html" },
                React.createElement("img", { src: "images/11.jpg", className: "img-responsive", alt: "" })
              )
            ),
            React.createElement(
              "div",
              { className: "blog-grid-right" },
              React.createElement(
                "h5",
                null,
                React.createElement(
                  "a",
                  { href: "singlepage.html" },
                  "Pellentesque dui, non felis. Maecenas male"
                ),
                " "
              )
            ),
            React.createElement(
              "div",
              { className: "clearfix" },
              " "
            )
          ),
          React.createElement(
            "div",
            { className: "blog-grids" },
            React.createElement(
              "div",
              { className: "blog-grid-left" },
              React.createElement(
                "a",
                { href: "singlepage.html" },
                React.createElement("img", { src: "images/9.jpg", className: "img-responsive", alt: "" })
              )
            ),
            React.createElement(
              "div",
              { className: "blog-grid-right" },
              React.createElement(
                "h5",
                null,
                React.createElement(
                  "a",
                  { href: "singlepage.html" },
                  "Pellentesque dui, non felis. Maecenas male"
                ),
                " "
              )
            ),
            React.createElement(
              "div",
              { className: "clearfix" },
              " "
            )
          ),
          React.createElement(
            "div",
            { className: "blog-grids" },
            React.createElement(
              "div",
              { className: "blog-grid-left" },
              React.createElement(
                "a",
                { href: "singlepage.html" },
                React.createElement("img", { src: "images/10.jpg", className: "img-responsive", alt: "" })
              )
            ),
            React.createElement(
              "div",
              { className: "blog-grid-right" },
              React.createElement(
                "h5",
                null,
                React.createElement(
                  "a",
                  { href: "singlepage.html" },
                  "Pellentesque dui, non felis. Maecenas male"
                ),
                " "
              )
            ),
            React.createElement(
              "div",
              { className: "clearfix" },
              " "
            )
          )
        )
      )
    );
  },

  _renderFooter: function () {
    return React.createElement(
      "div",
      { className: "footer" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "col-md-4 footer-left" },
          React.createElement(
            "h6",
            null,
            "THIS LOOKS GREAT"
          ),
          React.createElement(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt"
          ),
          React.createElement(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt consectetur adipisicing elit,"
          )
        ),
        React.createElement(
          "div",
          { className: "col-md-4 footer-middle" },
          React.createElement(
            "h4",
            null,
            "Twitter Feed"
          ),
          React.createElement(
            "div",
            { className: "mid-btm" },
            React.createElement(
              "p",
              null,
              "Consectetur adipisicing"
            ),
            React.createElement(
              "p",
              null,
              "Sed do eiusmod tempor"
            ),
            React.createElement(
              "a",
              { href: "https://w3layouts.com/" },
              "https://w3layouts.com/"
            )
          ),
          React.createElement(
            "p",
            null,
            "Consectetur adipisicing"
          ),
          React.createElement(
            "p",
            null,
            "Sed do eiusmod tempor"
          ),
          React.createElement(
            "a",
            { href: "https://w3layouts.com/" },
            "https://w3layouts.com/"
          )
        ),
        React.createElement(
          "div",
          { className: "col-md-4 footer-right" },
          React.createElement(
            "h4",
            null,
            "Quick Links"
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              "Eiusmod tempor"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              "Consectetur "
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              "Adipisicing elit"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              "Eiusmod tempor"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              "Consectetur "
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              "Adipisicing elit"
            )
          )
        ),
        React.createElement("div", { className: "clearfix" })
      )
    );
  },

  _renderFooterNav: function () {
    return React.createElement(
      "div",
      { className: "foot-nav" },
      React.createElement(
        "div",
        { className: "container" },
        this._renderBottomMenu()
      )
    );
  },

  _renderBottomMenu: function () {
    var menu = this.state.menu; //dao.loadMenu();
    var length = menu != null ? menu.length : 0;
    var options = [];
    for (var i = 0; i < length; i++) {
      var menuitem = menu[i];
      var option = this._renderMenuitem(menuitem);
      options.push(option);
    }
    var result = React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "#", onClick: this._openHome.bind(this) },
          "Inicio"
        )
      ),
      options,
      React.createElement("div", { className: "clearfix" })
    );
    return result;
  },

  _renderBottomMenu2: function () {
    return React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "index.html" },
          "Home"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "videos.html" },
          "Videos"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "reviews.html" },
          "Reviews"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "tech.html" },
          "Tech"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "singlepage.html" },
          "Culture"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "singlepage.html" },
          "Science"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "design.html" },
          "Design"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "business.html" },
          "Business"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "world.html" },
          "World"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "forum.html" },
          "Forum"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "contact.html" },
          "Contact"
        )
      ),
      React.createElement("div", { className: "clearfix" })
    );
  },

  _renderCopyright: function () {
    return React.createElement(
      "div",
      { className: "copyright" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "p",
          null,
          "\xA9 2016 Business_Blog. All rights reserved | Template by ",
          React.createElement(
            "a",
            { href: "http://w3layouts.com/" },
            "W3layouts"
          )
        )
      )
    );
  },
  /*
    render: function() {
      return [
        (
          {this._renderHeader()}
        ),
        (
          {this._renderBanner()}
        ),
        (
          {this._renderContent()}
        ),
        (
          {this._renderFooterNav()}
        ),
        (
          {this._renderCopyright()}
        )
      ];
    }
  */

  _renderBannerContent: function () {
    var result = null;
    var result = [];
    if (this.state.dao.selectedPost == null) {
      result.push(this._renderBanner());
    }
    result.push(this._renderContent());
    return result;
  },

  render: function () {
    console.log("RENDERING APP");
    return React.createElement(
      "span",
      null,
      this._renderHeader(),
      this._renderBannerContent(),
      this._renderFooter(),
      this._renderFooterNav(),
      this._renderCopyright()
    );
  }

});

var newAppUI = React.createFactory(AppUI);