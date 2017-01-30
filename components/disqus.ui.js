var DisqusUI = React.createClass({
  displayName: "DisqusUI",


  componentWillMount: function () {
    var self = this;
  },

  componentDidMount: function () {
    var self = this;
    var pageId = self.props.pageId;

    var disqus_developer = 1;
    var disqus_config = function () {
      this.page.url = 'tuaplicacionpropia.com';
      this.page.identifier = "'" + pageId + "'";
    };

    (function () {
      var d = document,
          s = d.createElement('script');
      s.src = 'http://tuaplicacionpropia.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  },

  componentDidUpdate: function () {
    var self = this;
  },

  render: function () {
    var result = null;
    var self = this;
    /*
        var pageId = self.props.pageId;
        var scriptContent = "";
        scriptContent += "/**" + "\n";
        scriptContent += "*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS." + "\n";
        scriptContent += "*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables* /" + "\n";
        scriptContent += "var disqus_config = function () {" + "\n";
        scriptContent += "  this.page.url = 'tuaplicacionpropia.com';  // Replace PAGE_URL with your page's canonical URL variable" + "\n";
        scriptContent += "  this.page.identifier = '" + pageId + "'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable" + "\n";
        scriptContent += "};" + "\n";
        scriptContent += "" + "\n";
        scriptContent += "(function() { // DON'T EDIT BELOW THIS LINE" + "\n";
        scriptContent += "  var d = document, s = d.createElement('script');" + "\n";
        scriptContent += "  s.src = '//tuaplicacionpropia.disqus.com/embed.js';" + "\n";
        scriptContent += "  s.setAttribute('data-timestamp', +new Date());" + "\n";
        scriptContent += "  (d.head || d.body).appendChild(s);" + "\n";
        scriptContent += "})();" + "\n";
            <script dangerouslySetInnerHTML={{__html: [scriptContent]}} />
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    */
    var result = React.createElement(
      "span",
      null,
      React.createElement("div", { id: "disqus_thread" })
    );
    return result;
  }

});

var newDisqusUI = React.createFactory(DisqusUI);