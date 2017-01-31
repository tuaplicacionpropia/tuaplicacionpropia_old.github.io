var Dao;

Dao = (function() {

  function Dao(app) {
    this.app = app;
    this.sid = null;
    this.token = null;
    
    this.articles = [];
    this.selectedPost = null;
  }

  Dao.createNew = function (app) {
    var result = null;
    result = new Dao(app);
    
    return result;
  };

  Dao.prototype.selectMenu = function (menu) {
    var self = this;
    self.app.setState({complete: false});

    self.loadMetaData(menu, "infoMenu", function () {
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

      self.app.setState({'posts': null});
      if (articles.length > 0) {
        self.loadArray(articles, 'posts', function () {
          self.app.setState({complete: true});
        });
      }
      self.app.setState({complete: true});
    });
/*
    self.loadObject('index.md', 'menu', function () {
      var posts = self.app.state.menu[0].posts;
      self.loadArray(posts, 'posts', function () {
        self.app.setState({complete: true});
      });
    });
*/
  };

  Dao.prototype.loadHome = function () {
    var self = this;
    self.selectMenu(null);
  };


  Dao.prototype.loadHome2 = function () {
    var self = this;
    self.app.setState({complete: false});

    self.loadMetaData(null, "infoMenu", function () {
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
          var itemArticle = itemMenu['name'];
          articles.push(itemArticle);
        }
      }
      self.app.setState({'menu': menus});

      self.loadArray(articles, 'posts', function () {
        self.app.setState({complete: true});
      });
      self.app.setState({complete: true});
    });
/*
    self.loadObject('index.md', 'menu', function () {
      var posts = self.app.state.menu[0].posts;
      self.loadArray(posts, 'posts', function () {
        self.app.setState({complete: true});
      });
    });
*/
  };


  Dao.prototype.loadMetaData = function (url, target, thenFn) {
    var prefixUrl = "https://api.github.com/repos/tuaplicacionpropia/tuaplicacionpropia.github.io/contents/posts/";
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
        var targetValue = JSON.parse(respdata);
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

  Dao.prototype.loadObject = function (url, target, thenFn) {
    var prefixUrl = "https://raw.githubusercontent.com/tuaplicacionpropia/tuaplicacionpropia.github.io/master/posts/";
    
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
        var targetValue = Hjson.parse(respdata);
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

  Dao.prototype.loadArray = function (array, target) {
    var length = (array != null ? array.length : 0);
    for (var i = 0; i < length; i++) {
      var itemUrl = array[i];
      var newTarget = target + "[" + i + "]";
      this.loadObject(itemUrl, newTarget);
    }
  };



  Dao.prototype.loadMenu = function () {
    var result = null;
    //this.callServer("index.md");
    var result = Hjson.parse(`[
      {
        id: index.html
        title: Inicio
      }
      {
        id: desarrollo.html
        title: Desarrollo
        menu: [
          {
            id: python.html
            title: Python
          }
          {
            id: java.html
            title: Java
          }
        ]
      }
    ]`);
    return result;
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

  Dao.prototype.listArticles2 = function() {
    var result = null;
    var result = [];
/*
    var hjsonText = `
      title: Top 5 javascript libraries
      mainImage: 3.jpg
    `;

    var obj = Hjson.parse(hjsonText);
*/
/*
    result.push(Article.createNew({title: 'Lorem Ipsum is simply1', mainImage: '1.jpg', mainLabel: 'Technology'}));
    result.push(Article.createNew({title: 'Lorem Ipsum is simply2', mainImage: '2.jpg', mainLabel: 'Science'}));
    result.push(Article.createNew({title: 'Lorem Ipsum is simply3', mainImage: '3.jpg', mainLabel: 'Culture'}));
    result.push(Article.createNew({title: 'Lorem Ipsum is simply4', mainImage: '4.jpg', mainLabel: 'Business'}));
    result.push(Article.createNew({title: 'Lorem Ipsum is simply5', mainImage: '5.jpg', mainLabel: 'Technology'}));
*/

    result.push(Article.loadNew(`
      title: Lorem ipsum 
      mainImage2: 1.jpg
      mainLabel: Science
      publishDate: 01/12/2016 15:43:32
      author: Jesús María Ramos Saky
      content: 
        '''
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.

Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.

Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.

Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
        '''
    `));

    result.push(Article.loadNew(`
      title: Cicero
      mainImage: 2.jpg
      content: 
        '''
[sd-logo]: http://media.istockphoto.com/photos/python-picture-id487418597

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

NemoZZZZZZZZ enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

![Python][sd-logo]



Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere
        '''
    `));

    result.push(Article.loadNew(`
      title: Li Europan lingues 
      mainImage: 3.jpg
      content: 
        '''
Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.

Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores.

At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues.

Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.

Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles.
        '''
    `));
    result.push(Article.loadNew(`
      title: Muy lejos, más allá... 
      mainImage: 4.jpg
      content: 
        '''


link to <http://www.google.com/>

this is my email <somedude@mail.com>


**Muy lejos, más allá de las montañas de palabras**, alejados de los países de las vocales y las consonantes, viven los textos simulados. Viven aislados en casas de letras, en la costa de la semántica, un gran océano de lenguas.

Un riachuelo llamado Pons fluye por su pueblo y los abastece con las normas necesarias. Hablamos de un país paraisomático en el que a uno le caen pedazos de frases asadas en la boca.

Ni siquiera los todopoderosos signos de puntuación dominan a los textos simulados; una vida, se puede decir, poco ortográfica.

Pero un buen día, una pequeña línea de texto simulado, llamada Lorem Ipsum, decidió aventurarse y salir al vasto mundo de la gramática.

El gran Oxmox le desanconsejó hacerlo, ya que esas tierras estaban llenas de comas malvadas, signos de interrogación salvajes y puntos y coma traicioneros, pero el texto simulado no se dejó atemorizar. Empacó sus siete versales, enfundó su inicial en el cinturón y se puso en camino. Cuando ya había escalado las primeras colinas de las montañas cursivas, se dio media vuelta para dirigir su mirada por última vez, hacia su ciudad natal Letralandia, el encabezamiento del pueblo Alfabeto y el subtítulo de su
        '''
    `));
    result.push(Article.loadNew(`
      title: ¿Penas del joven Werther ?
      mainImage: 5.jpg
      content: 
        '''
Reina en mi espíritu una alegría admirable, muy parecida a las dulces alboradas de la primavera, de que gozo aquí con delicia.

Estoy solo, y me felicito de vivir en este país, el más a propósito para almas como la mía, soy tan dichoso, mi querido amigo, me sojuzga de tal modo la idea de reposar, que no me ocupo de mi arte.

Ahora no sabría dibujar, ni siquiera hacer una línea con el lápiz; y, sin embargo, jamás he sido mejor pintor Cuando el valle se vela en torno mío con un encaje de vapores; cuando el sol de mediodía centellea sobre la impenetrable sombra de mi bosque sin conseguir otra cosa que filtrar entre las hojas algunos rayos que penetran hasta el fondo del santuario, cuando recostado sobre la crecida hierba, cerca de la cascada, mi vista, más próxima a la tierra, descubre multitud de menudas y diversas plantas; cuando siento más cerca de mi corazón los rumores de vida de ese pequeño mundo que palpita en los tallos de las hojas, y veo las formas innumerables e infinitas de los gusanillos y de los insectos; cuando siento, en fin, la presencia del Todopoderoso, que nos ha creado
        '''
    `));

    this.articles = result;
    return result;
  };

  return Dao;

})();
