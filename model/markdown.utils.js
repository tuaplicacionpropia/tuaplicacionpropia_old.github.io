
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
