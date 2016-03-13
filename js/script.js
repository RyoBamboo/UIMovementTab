var data = [];
var xhr = new XMLHttpRequest();
xhr.open('GET', "http://uimovement.com/");
xhr.onload = function(e) {
	var text = xhr.responseText;
	$(text).find('.single_gif_preview_wrapper').each(function() {
		var url = $(this).find('a').attr('href');
		var src = $(this).find('img').data('src'); // gifソースの取得
		data.push({ url: url, src: src });
	});
	show();
	fadeOut('loader-bg');
};
xhr.send();

function show() {
	$(data).each(function() {
		var image = "<img src='"+ this.src + "' data-src='"+ this.src + "'>";
		var link = "<a href='http://uimovement.com"+this.url+"' target='_blank'>" + image +"</a>";
		$('#images').append(link);
	});
}

function fadeOut(elementId) {
	$('#'+elementId).fadeOut('slow');
}
