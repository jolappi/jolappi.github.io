var langs = ['en', 'fi'];
var langCode = '';
var langJS = null;

var getFirstBrowserLanguage = function () {
    var nav = window.navigator,
    browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
    i,
    language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }

    return "en";
  };

var translate = function (data)
{
	$("[tkey]").each (function (index)
	{
		var strTr = data [$(this).attr ('tkey')];
	    $(this).html (strTr);
		console.log(strTr);
	});
}


langCode = getFirstBrowserLanguage();
console.log(langCode + window.language);
if (langCode in langs){
	$.getJSON('lang/'+langCode+'.json', translate);
} else {
	$.getJSON('lang/en.json', translate);
}
