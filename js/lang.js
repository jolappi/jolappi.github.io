var langs = ['en', 'fi'];
var langCode = '';
var langJS = null;


var translate = function (data)
{
	$("[tkey]").each (function (index)
	{
		var strTr = data [$(this).attr ('tkey')];
	    $(this).html (strTr);
		console.log(strTr);
	});
}


langCode = navigator.language.substr (0, 2);
console.log(langCode);
if (langCode in langs){
	$.getJSON('lang/'+langCode+'.json', translate);
} else {
	$.getJSON('lang/en.json', translate);
}
