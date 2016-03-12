var gifSources = [];
var xhr = new XMLHttpRequest();
xhr.open('GET', "http://uimovement.com/");
xhr.onload = function(e) {
	var text = xhr.responseText;
	var gifUrl = '';
	$(text).find('.single_gif_preview_wrapper').each(function() {
		gifUrl = $(this).find('img').data('src');
		gifSources.push(gifUrl);
	});
	test();
};
xhr.send();

function test() {
	$(gifSources).each(function() {
		var text = '<img src="'+ this +'" data-src="' + this + '">';
		$('.te').append(text);
	});
}
