
function md_paragraphs (nodes) {
  $(nodes).filter("p").attr('align', 'justify');
}

function md_images (nodes) {
  $(nodes).find('img').addClass("img-responsive");
      //$(_nodes_).filter("p.img").addClass("img-responsive");
      //$(_nodes_).filter('img').addClass("img-responsive");
//      $(_nodes_).filter('p img').addClass("img-responsive");
}

function md_anchors (nodes) {
  //$(nodes).find("a").attr('target', '_blank');
//  var array = $(nodes).find("*");//filter("a").find("*");
  var array = $(nodes).find("*").filter("a");//filter("a").find("*");
  $.each(array, function(i, val) {
    console.log('iiiiiiiiiiiiiiii = ' + i);
    console.log('valvalvalvalvalvalval = ' + val);
    $(val).attr('target', '_blank');
  });
}

showdown.extension('adaptmd', function () {
  return [{
    type: "output",
    filter: function (html, converter, options) {
      var result = "";
      var _nodes_ = $.parseHTML(html);

      md_paragraphs(_nodes_);      
      md_images(_nodes_);      
      md_anchors(_nodes_);

      $(_nodes_).each(function() {
        if (!(this.nodeName == "#text")) {
          result += this.outerHTML;
        }
      });
      return result;
    }
  }];
});
showdown.setFlavor('github');
//converter.setFlavor('github');
showdown.setOption('tables', true);

function showdown_convert (mdtext) {
  var result = null;
  //var converter = new showdown.Converter();
  var converter = new showdown.Converter({ extensions: ['adaptmd']});
  converter.setFlavor('github');
  converter.setOption('tables', true);
  result = converter.makeHtml(mdtext);
  return result;
}

function remarkable_convert (mdtext) {
  var result = null;

  var md = new Remarkable();
  md.set({
    html: true,
    breaks: true,
    xhtmlOut: true,
    linkTarget: '_blank',
  });

  md.renderer.rules.paragraph_open = (function() {
    var original = md.renderer.rules.paragraph_open;
    return function() {
      var result = null;
      var p = original.apply(this, arguments);
      if (p == '<p>') {
        result = '<p align="justify">';
      }
      else {
        result = p;
      }
      return result;
    };
  })();

  md.renderer.rules.image = (function() {
    var original = md.renderer.rules.image;
    return function() {
      var result = null;
      var img = original.apply(this, arguments);
      var classImg = ' class="img-responsive2"';
      result = img.substring(0, 4) + classImg + img.substring(4);
      return result;
    };
  })();

  result = md.render(mdtext);

  return result;
}
