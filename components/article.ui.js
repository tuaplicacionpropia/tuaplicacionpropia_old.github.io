var ArticleUI = React.createClass({
  displayName: "ArticleUI",


  componentWillMount: function () {
    var self = this;
  },

  componentDidMount: function () {
    var self = this;
  },

  componentDidUpdate: function () {
    var self = this;
  },

  _openPost: function () {
    if (this.props.openPost != null) {
      this.props.openPost(this.props.item);
    } else {
      alert(this.props.item.title);
    }
  },

  _renderMoldBanner: function () {
    var article = this.props.item;

    var title = article.getTitle();
    var title = title != null ? title : "";

    var contentHtml = article.getContentHtml();
    var contentHtml = contentHtml != null ? contentHtml : "";

    var firstParagraph = article.getFirstParagraph();

    var mainImage = article.getMainImage();
    var mainImage = mainImage != null ? "images/" + mainImage : "";
    var attrStyle = "url(" + mainImage + ")";

    return React.createElement(
      "div",
      { className: "banner", style: { backgroundImage: attrStyle } },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h2",
          null,
          title
        ),
        React.createElement("span", { dangerouslySetInnerHTML: { __html: [firstParagraph] } }),
        React.createElement(
          "a",
          { href: "#", onClick: this._openPost },
          "READ ARTICLE"
        )
      )
    );
  },

  _renderMoldResume: function () {
    var article = this.props.item;

    var title = article.getTitle();
    var title = title != null ? title : "";

    var mainImage = article.getMainImage();
    var mainImage = mainImage != null ? "images/" + mainImage : "";

    var mainLabel = article.getMainLabel();
    var mainLabel = mainLabel != null ? mainLabel : "";

    var contentHtml = article.getContentHtml();
    var contentHtml = contentHtml != null ? contentHtml : "";

    var firstParagraph = article.getFirstParagraph();

    var publishDay = article.getPublishDateDay();
    var publishDay = publishDay != null ? publishDay : "";

    var author = article.getAuthor();
    var author = author != null ? author : "";

    var numComments = null;
    var numComments = numComments != null ? numComments : 0;

    var numFavourites = null;
    var numFavourites = numFavourites != null ? numFavourites : 0;

    var numViews = null;
    var numViews = numViews != null ? numViews : 0;

    return React.createElement(
      "span",
      null,
      React.createElement(
        "div",
        { className: "soci" },
        React.createElement(
          "ul",
          null,
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#", className: "facebook-1" },
              " "
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#", className: "facebook-1 twitter" },
              " "
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#", className: "facebook-1 chrome" },
              " "
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              React.createElement(
                "i",
                { className: "glyphicon glyphicon-envelope" },
                " "
              )
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              React.createElement(
                "i",
                { className: "glyphicon glyphicon-print" },
                " "
              )
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              React.createElement(
                "i",
                { className: "glyphicon glyphicon-plus" },
                " "
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "tc-ch", onClick: this._openPost },
        mainImage.length > 0 && React.createElement(
          "div",
          { className: "tch-img" },
          React.createElement(
            "a",
            { href: "#" },
            React.createElement("img", { src: mainImage, className: "img-responsive", alt: "" })
          )
        ),
        mainImage.length > 0 && mainLabel.length > 0 && React.createElement(
          "a",
          { className: "blog pink", href: "singlepage.html" },
          mainLabel
        ),
        React.createElement(
          "h3",
          null,
          React.createElement(
            "a",
            { href: "#" },
            title
          )
        ),
        React.createElement("span", { dangerouslySetInnerHTML: { __html: [firstParagraph] } }),
        React.createElement(
          "div",
          { className: "blog-poast-info" },
          React.createElement(
            "ul",
            null,
            author.length > 0 && React.createElement(
              "li",
              null,
              React.createElement(
                "i",
                { className: "glyphicon glyphicon-user" },
                " "
              ),
              React.createElement(
                "a",
                { className: "admin", href: "#" },
                " ",
                author,
                " "
              )
            ),
            publishDay.length > 0 && React.createElement(
              "li",
              null,
              React.createElement(
                "i",
                { className: "glyphicon glyphicon-calendar" },
                " "
              ),
              publishDay
            ),
            numComments > 0 && React.createElement(
              "li",
              null,
              React.createElement(
                "i",
                { className: "glyphicon glyphicon-comment" },
                " "
              ),
              React.createElement(
                "a",
                { className: "p-blog", href: "#" },
                numComments,
                " Comments "
              )
            ),
            numFavourites > 0 && React.createElement(
              "li",
              null,
              React.createElement(
                "i",
                { className: "glyphicon glyphicon-heart" },
                " "
              ),
              React.createElement(
                "a",
                { className: "admin", href: "#" },
                numFavourites,
                " favourites "
              )
            ),
            numViews > 0 && React.createElement(
              "li",
              null,
              React.createElement(
                "i",
                { className: "glyphicon glyphicon-eye-open" },
                " "
              ),
              numViews,
              " views"
            )
          )
        )
      )
    );
  },

  _renderMoldMini: function () {
    return React.createElement(
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
    );
  },

  _renderMoldFull_Comments: function () {
    var result = null;

    var article = this.props.item;
    var title = article.getTitle();
    var title = title != null ? title : "";

    var pageId = Utils.slugify(title);
    var result = newDisqusUI({ "pageId": pageId });
    return result;
  },

  _renderMoldFull_Comments2: function () {
    return [React.createElement(
      "div",
      { className: "comment-top" },
      React.createElement(
        "h2",
        null,
        "Comment"
      ),
      React.createElement(
        "div",
        { className: "media-left" },
        React.createElement(
          "a",
          { href: "#" },
          React.createElement("img", { src: "images/si.png", alt: "" })
        )
      ),
      React.createElement(
        "div",
        { className: "media-body" },
        React.createElement(
          "h4",
          { className: "media-heading" },
          "Richard Spark"
        ),
        React.createElement(
          "p",
          null,
          "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis."
        ),
        React.createElement(
          "div",
          { className: "media" },
          React.createElement(
            "div",
            { className: "media-left" },
            React.createElement(
              "a",
              { href: "#" },
              React.createElement("img", { src: "images/si.png", alt: "" })
            )
          ),
          React.createElement(
            "div",
            { className: "media-body" },
            React.createElement(
              "h4",
              { className: "media-heading" },
              "Joseph Goh"
            ),
            React.createElement(
              "p",
              null,
              "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis."
            ),
            React.createElement(
              "div",
              { className: "media" },
              React.createElement(
                "div",
                { className: "media-left" },
                React.createElement(
                  "a",
                  { href: "#" },
                  React.createElement("img", { src: "images/si.png", alt: "" })
                )
              ),
              React.createElement(
                "div",
                { className: "media-body" },
                React.createElement(
                  "h4",
                  { className: "media-heading" },
                  "Melinda Dee"
                ),
                React.createElement(
                  "p",
                  null,
                  "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis."
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "media" },
          React.createElement(
            "div",
            { className: "media-left" },
            React.createElement(
              "a",
              { href: "#" },
              React.createElement("img", { src: "images/si.png", alt: "" })
            )
          ),
          React.createElement(
            "div",
            { className: "media-body" },
            React.createElement(
              "h4",
              { className: "media-heading" },
              "Rackham"
            ),
            React.createElement(
              "p",
              null,
              "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis."
            )
          )
        )
      )
    ), React.createElement(
      "div",
      { className: "comment" },
      React.createElement(
        "h3",
        null,
        "Leave a Comment"
      ),
      React.createElement(
        "div",
        { className: " comment-bottom" },
        React.createElement(
          "form",
          null,
          React.createElement("input", { type: "text", placeholder: "Name" }),
          React.createElement("input", { type: "text", placeholder: "Email" }),
          React.createElement("input", { type: "text", placeholder: "Subject" }),
          React.createElement("textarea", { placeholder: "Message", required: "" }),
          React.createElement("input", { type: "submit", value: "Send" })
        )
      )
    )];
  },

  _renderMoldFull: function () {
    var article = this.props.item;

    var title = article.getTitle();
    var title = title != null ? title : "";

    var mainImage = article.getMainImage();
    var mainImage = mainImage != null ? "images/" + mainImage : "";

    var mainLabel = article.getMainLabel();
    var mainLabel = mainLabel != null ? mainLabel : "";

    var contentHtml = article.getContentHtml();
    var contentHtml = contentHtml != null ? contentHtml : "";

    var firstParagraph = article.getFirstParagraph();

    var publishDay = article.getPublishDateDay();
    var publishDay = publishDay != null ? publishDay : "";

    var author = article.getAuthor();
    var author = author != null ? author : "";

    var numComments = null;
    var numComments = numComments != null ? numComments : 0;

    var numFavourites = null;
    var numFavourites = numFavourites != null ? numFavourites : 0;

    var numViews = null;
    var numViews = numViews != null ? numViews : 0;

    return React.createElement(
      "div",
      { className: "tc-ch business" },
      React.createElement(
        "div",
        { className: " blog-grid2" },
        React.createElement("img", { src: mainImage, className: "img-responsive", alt: "" }),
        React.createElement(
          "div",
          { className: "blog-text" },
          React.createElement(
            "h5",
            null,
            title
          ),
          React.createElement("span", { dangerouslySetInnerHTML: { __html: [contentHtml] } }),
          React.createElement(
            "div",
            { className: "blog-poast-info" },
            React.createElement(
              "ul",
              null,
              author.length > 0 && React.createElement(
                "li",
                null,
                React.createElement(
                  "i",
                  { className: "glyphicon glyphicon-user" },
                  " "
                ),
                React.createElement(
                  "a",
                  { className: "admin", href: "#" },
                  " ",
                  author,
                  " "
                )
              ),
              publishDay.length > 0 && React.createElement(
                "li",
                null,
                React.createElement(
                  "i",
                  { className: "glyphicon glyphicon-calendar" },
                  " "
                ),
                publishDay
              ),
              numComments > 0 && React.createElement(
                "li",
                null,
                React.createElement(
                  "i",
                  { className: "glyphicon glyphicon-comment" },
                  " "
                ),
                React.createElement(
                  "a",
                  { className: "p-blog", href: "#" },
                  numComments,
                  " Comments "
                )
              ),
              numFavourites > 0 && React.createElement(
                "li",
                null,
                React.createElement(
                  "i",
                  { className: "glyphicon glyphicon-heart" },
                  " "
                ),
                React.createElement(
                  "a",
                  { className: "admin", href: "#" },
                  numFavourites,
                  " favourites "
                )
              ),
              numViews > 0 && React.createElement(
                "li",
                null,
                React.createElement(
                  "i",
                  { className: "glyphicon glyphicon-eye-open" },
                  " "
                ),
                numViews,
                " views"
              )
            )
          )
        )
      ),
      this._renderMoldFull_Comments()
    );
  },

  render: function () {
    var self = this;
    var mold = self.props.mold;
    var result = null;
    var result = mold == "banner" ? this._renderMoldBanner() : result;
    var result = mold == "resume" ? this._renderMoldResume() : result;
    var result = mold == "mini" ? this._renderMoldMini() : result;
    var result = mold == "full" ? this._renderMoldFull() : result;
    return result;
  }

});

var newArticleUI = React.createFactory(ArticleUI);