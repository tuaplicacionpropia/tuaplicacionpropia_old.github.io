var Article;
Article = (function() {

  function Article() {
    this.id = null;
    this.title = null;
    this.description = null;
    this.mainImage = null;
    this.creationDate = null;
    this.lastModificationDate = null;
    this.publishDate = null;
    this.content = null;
    this.mainLabel = null;
    this.contentHtml = null;
    this.author = null;

    this.original = null;
  }

  Article.prototype.getOriginal = function() {
    return this.original;
  };

  Article.prototype.clone = function() {
    var result = new Article();
    result.id = this.id;
    result.title = this.title;
    result.description = this.description;
    result.mainImage = this.mainImage;
    result.creationDate = this.creationDate;
    result.lastModificationDate = this.lastModificationDate;
    result.publishDate = this.publishDate;
    result.content = this.content;
    result.mainLabel = this.mainLabel;
    result.contentHtml = this.contentHtml;
    result.author = this.author;

    result.original = this;
    return result;
  };
  
  Article.prototype.applyChanges = function() {
    var result = this.original;
    if (result != null) {
      result.id = this.id;

      result.title = this.title;
      result.description = this.description;
      result.mainImage = this.mainImage;
      result.creationDate = this.creationDate;
      result.lastModificationDate = this.lastModificationDate;
      result.publishDate = this.publishDate;
      result.content = this.content;
      result.mainLabel = this.mainLabel;
      result.contentHtml = this.contentHtml;
      result.author = this.author;
    }
    else {
      result = this;
    }
    return result;
  };
  
  Article.prototype.hasChanges = function() {
    var result = true;
    if (this.original != null && this.original != this && this.original.id != null) {
      result = false;
      result = result || this.original.id != this.id;

      result = result || this.original.title != this.title;
      result = result || this.original.description != this.description;
      result = result || this.original.mainImage != this.mainImage;
      result = result || this.original.creationDate != this.creationDate;
      result = result || this.original.lastModificationDate != this.lastModificationDate;
      result = result || this.original.publishDate != this.publishDate;
      result = result || this.original.content != this.content;
      result = result || this.original.mainLabel != this.mainLabel;
      result = result || this.original.contentHtml != this.contentHtml;
      result = result || this.original.author != this.author;
    }
    return result;
  };

  Article.prototype.getId = function() {
    return this.id;
  };

  Article.prototype.setId = function(newValue) {
    this.id = newValue;
  };

  Article.prototype.getTitle = function() {
    return this.title;
  };

  Article.prototype.setTitle = function(newValue) {
    this.title = newValue;
  };

  Article.prototype.getDescription = function() {
    return this.description;
  };

  Article.prototype.setDescription = function(newValue) {
    this.description = newValue;
  };

  Article.prototype.getMainImage = function() {
    return this.mainImage;
  };

  Article.prototype.setMainImage = function(newValue) {
    this.mainImage = newValue;
  };

  Article.prototype.getCreationDate = function() {
    return this.creationDate;
  };

  Article.prototype.setCreationDate = function(newValue) {
    this.creationDate = newValue;
  };

  Article.prototype.getLastModificationDate = function() {
    return this.lastModificationDate;
  };

  Article.prototype.setLastModificationDate = function(newValue) {
    this.lastModificationDate = newValue;
  };

  Article.prototype.getPublishDate = function() {
    return this.publishDate;
  };

  Article.prototype.setPublishDate = function(newValue) {
    this.publishDate = newValue;
  };

  Article.prototype.getPublishDateDay = function() {
    var result = null;
    if (this.publishDate != null) {
      var dateFormatter = JSJoda.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
      var date = JSJoda.LocalDateTime.parse(this.publishDate, dateFormatter);
      var resFormatter = JSJoda.DateTimeFormatter.ofPattern("dd/MM/yyyy");
      var result = resFormatter.format(date);
    }
    return result;
  };

  Article.prototype.getContent = function() {
    return this.content;
  };

  Article.prototype.setContent = function(newValue) {
    this.content = newValue;
  };

  Article.prototype.getMainLabel = function() {
    return this.mainLabel;
  };

  Article.prototype.setMainLabel = function(newValue) {
    this.mainLabel = newValue;
  };

  Article.prototype.getAuthor = function() {
    return this.author;
  };

  Article.prototype.setAuthor = function(newValue) {
    this.author = newValue;
  };

  Article.prototype.getContentHtml = function() {
    if (this.contentHtml == null && this.content != null) {
      //var converter = new showdown.Converter();
      var converter = new showdown.Converter({ extensions: ['adaptmd']});
      this.contentHtml = converter.makeHtml(this.content);
    }
    return this.contentHtml;
  };

  Article.prototype.setContentHtml = function(newValue) {
    this.contentHtml = newValue;
  };

  Article.prototype.getFirstParagraph = function() {
    var result = null;
    var contentHtml = this.getContentHtml();
    var contentHtml = (contentHtml != null ? contentHtml : "");

    var nodeContent2 = $.parseHTML(contentHtml);
    var nodeContent = $(nodeContent2).filter("p").get(0);
    var result = nodeContent.outerHTML;
    return result;
  };

  Article.sortDefault = function(obj1, obj2) {
    var result = -1;

    var fechaHora1 = obj1.getPublishDate();
    var fechaHora2 = obj2.getPublishDate();

    var dateFormatter = JSJoda.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
    var date1 = JSJoda.LocalDateTime.parse(fechaHora1, dateFormatter);
    var date2 = JSJoda.LocalDateTime.parse(fechaHora2, dateFormatter);

    result = (-1)*date1.compareTo(date2);

    return result;
  };

  Article.decodeList = function(list) {
    var result = [];
    if (list.length > 0) {
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var toAdd = new Article();

        toAdd.setId(item.id);

        toAdd.setTitle(item.title);
        toAdd.setDescription(item.description);
        toAdd.setMainImage(item.mainImage);
        toAdd.setCreationDate(item.creationDate);
        toAdd.setLastModificationDate(item.lastModificationDate);
        toAdd.setPublishDate(item.publishDate);
        toAdd.setContent(item.content);
        toAdd.setMainLabel(item.mainLabel);
        toAdd.setAuthor(item.author);

        result.push(toAdd);
      }
      
    }
    result.sort(Article.sortDefault);
    return result
  };

  Article.loadNew = function(text) {
    var result = null;
    var params = Hjson.parse(text);
    result = Article.createNew(params);
    return result;
  };

  Article.createNew = function(params) {
    var result = null;

    if (typeof params === "undefined" || params === null) {
      params = {};
    }
    if (typeof params.id === "undefined" || params.id === null) {
      params['id'] = null;
    }
    if (typeof params.title === "undefined" || params.title === null) {
      params['title'] = null;
    }
    if (typeof params.description === "undefined" || params.description === null) {
      params['description'] = null;
    }
    if (typeof params.mainImage === "undefined" || params.mainImage === null) {
      params['mainImage'] = null;
    }
    if (typeof params.creationDate === "undefined" || params.creationDate === null) {
      params['creationDate'] = null;
    }
    if (typeof params.lastModificationDate === "undefined" || params.lastModificationDate === null) {
      params['lastModificationDate'] = null;
    }
    if (typeof params.publishDate === "undefined" || params.publishDate === null) {
      params['publishDate'] = null;
    }
    if (typeof params.content === "undefined" || params.content === null) {
      params['content'] = null;
    }
    if (typeof params.mainLabel === "undefined" || params.mainLabel === null) {
      params['mainLabel'] = null;
    }
    if (typeof params.author === "undefined" || params.author === null) {
      params['author'] = null;
    }

    var result = new Article();
    result.setId(params.id);
    result.setTitle(params.title);
    result.setDescription(params.description);
    result.setMainImage(params.mainImage);
    result.setCreationDate(params.creationDate);
    result.setLastModificationDate(params.lastModificationDate);
    result.setPublishDate(params.publishDate);
    result.setContent(params.content);
    result.setMainLabel(params.mainLabel);
    result.setAuthor(params.author);

    return result;
  };

  return Article;

})();
