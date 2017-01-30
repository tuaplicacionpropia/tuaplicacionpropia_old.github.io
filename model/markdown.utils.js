
function md_paragraphs (nodes) {
  $(nodes).filter("p").attr('align', 'justify');
}

function md_images (nodes) {
  $(nodes).find('img').addClass("img-responsive");
      //$(_nodes_).filter("p.img").addClass("img-responsive");
      //$(_nodes_).filter('img').addClass("img-responsive");
//      $(_nodes_).filter('p img').addClass("img-responsive");
}

showdown.extension('adaptmd', function () {
  return [{
    type: "output",
    filter: function (html, converter, options) {
      var result = "";
      var _nodes_ = $.parseHTML(html);

      md_paragraphs(_nodes_);      
      md_images(_nodes_);      

      $(_nodes_).each(function() {
        if (!(this.nodeName == "#text")) {
          result += this.outerHTML;
        }
      });
      return result;
    }
  }];
});
