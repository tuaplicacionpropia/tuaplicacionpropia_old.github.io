var Cookies;
Cookies = (function() {

  function Cookies() {
  }

  Cookies.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  Cookies.getCookie = function (cname) {
    var result = "";
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        result = c.substring(name.length, c.length);
        break;
      }
    }
    return result;
  };

  Cookies.rmCookie = function (cname) {
    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  return Cookies;

})();


var Utils;
Utils = (function() {

  function Utils() {
  }

  Utils.translateDateEs2TypeDate = function (date) {
    var result = null;
    
    try {
      var dateInFormatter = JSJoda.DateTimeFormatter.ofPattern("dd/MM/yyyy");
      var dateOutFormatter = JSJoda.DateTimeFormatter.ofPattern("yyyy-MM-dd");

      var result = dateOutFormatter.format(dateInFormatter.parse(date));
    }
    catch(err) {
      var result = null;
    }    

    return result;
  };

  Utils.translateTypeDate2DateEs = function (date) {
    var result = null;
    
    try {
      var dateInFormatter = JSJoda.DateTimeFormatter.ofPattern("yyyy-MM-dd");
      var dateOutFormatter = JSJoda.DateTimeFormatter.ofPattern("dd/MM/yyyy");

      var result = dateOutFormatter.format(dateInFormatter.parse(date));
    }
    catch(err) {
      var result = null;
    }    

    return result;
  };

  Utils.getDateEs = function (widget) {
    var result = null;

    var result = widget.value;
    if (widget.type == "date") {
      var result = Utils.translateTypeDate2DateEs(widget.value);
    }
    
    return result;
  };

  Utils.setDateEs = function (widget, date) {
    var newValue = date;
    if (widget.type == "date") {
      var newValue = Utils.translateDateEs2TypeDate(date);
    }
    widget.value = newValue;
  };

  Utils.diffDays = function (start, end) {
    var result = null;
    try {
      var formatter = JSJoda.DateTimeFormatter.ofPattern("dd/MM/yyyy");
      var d1 = JSJoda.LocalDate.from(formatter.parse(start));
      var d2 = JSJoda.LocalDate.from(formatter.parse(end));
      var result = d1.until(d2, JSJoda.ChronoUnit.DAYS);
    }
    catch (err) {
      ;
    }
    return result;
  };

  Utils.plusDays = function (day, numDays) {
    var result = null;
    try {
      var formatter = JSJoda.DateTimeFormatter.ofPattern("dd/MM/yyyy");
      numDays = (numDays < 0 ? (-1)*numDays : numDays);
      var d = JSJoda.LocalDate.from(formatter.parse(day)).plusDays(numDays);
      var result = formatter.format(d);
    }
    catch (err) {
      ;
    }
    return result;
  };

  Utils.minusDays = function (day, numDays) {
    var result = null;
    try {
      var formatter = JSJoda.DateTimeFormatter.ofPattern("dd/MM/yyyy");
      numDays = (numDays < 0 ? (-1)*numDays : numDays);
      var d = JSJoda.LocalDate.from(formatter.parse(day)).minusDays(numDays);
      var result = formatter.format(d);
    }
    catch (err) {
      ;
    }
    return result;
  };

  Utils.btnDisableTemporal = function (widget) {
    var result = null;

    var fewSeconds = 300;
    var btn = $(widget);
    if (btn.nodeName != "BUTTON") {
      var btn = $(widget).closest("button")[0];
    }

    $(btn).attr('disabled', '');
    setTimeout(function(){
        $(btn).removeAttr('disabled');
    }, fewSeconds*1000);
    
    return result;
  };

  Utils.randInt = function (limit) {
    var result = null;
    var result = Math.floor(Math.random() * limit);
    return result;
  };

  Utils.loadHjsonData = function (url, app, target) {
    var prefixUrl = "https://raw.githubusercontent.com/tuaplicacionpropia/tuaplicacionpropia.github.io/master/";
    
    var fullUrl = prefixUrl + url;
    
    var argApp = app;
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
      },
      success: function (respdata, textStatus, jqXHR) {
        var targetValue = Hjson.parse(respdata);
        argApp.setState({"" + argTarget: targetValue});
        argApp.forceUpdate();
      }
    });
  };

  return Utils;

})();
