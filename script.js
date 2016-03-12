var gifSources = [];
var xhr = new XMLHttpRequest();
xhr.open('GET', "http://uimovement.com/");
xhr.onload = function(e) {
	var text = xhr.responseText;
	var gifUrl = '';
	$(text).find('.single_gif_preview_wrapper').each(function() {

		var url = $(this).find('a').attr('href');
		var src = $(this).find('img').data('src'); // gifソースの取得
		gifSources.push({ url: url, src: src });
	});
	test();
};
xhr.send();

function test() {
	$(gifSources).each(function() {
		var text = '<a href='+this.url+'><img src="'+ this.src +'" data-src="' + this.src + '"></a>';
		console.log(text);
	});
}
