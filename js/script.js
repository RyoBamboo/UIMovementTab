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
	fadeOut('loader-bg'); // ロード画面を非表示
	show(); // 画像の表示
};
xhr.send();

function show() {
	$(data).each(function() {
		var image = "<img src='"+ this.src + "' data-src='"+ this.src + "'>";
		var link = "<a class='gif-image' href='http://uimovement.com"+this.url+"' target='_blank' style='display:none'>" + image +"</a>";
		$('#images').append(link);
	});
	fadeIn('gif-image', 500, 1000);
}

/**
 * 読み込んだ画像をフェードインさせながら表示する
 *
 * elementClass(string): 表示させる要素につけたClass名
 * delaySpeed(int): フェードインさせるまでのスピード
 * fadeSpeed(int): フェードインが完了するまでのスピード
 */
function fadeIn(elementClass, delaySpeed, fadeSpeed) {
	$('.'+elementClass).each(function(i) {
		$(this).delay(i*delaySpeed+delaySpeed).css({display:'block', opacity: 0}).animate({opacity:'1'}, fadeSpeed);
	});
}

function fadeOut(elementId) {
	$('#'+elementId).fadeOut('slow');
}
