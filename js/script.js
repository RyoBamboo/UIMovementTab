var data = [];
var xhr = new XMLHttpRequest();
xhr.open('GET', "http://uimovement.com/");
xhr.onload = function(e) {
	var text = xhr.responseText;
	$(text).find('.day-of-resources-wrapper').each(function(i) {
		// 日付の取得
		var dateString = $(this).children('h4').text().split('Today');
		dateString.forEach(function(value) {
			if (value !== '') {
				dateString = value.trim();
			}
		});
		data[dateString]={};
		$(this).find('.single_gif_preview_wrapper').each(function(i) {
			var _data = {
				url: $(this).find('a').attr('href'),
                src: $(this).find('img').data('src')
			};
			data[dateString][i] = _data;
		});
	});
	fadeOut('loader-bg'); // ロード画面を非表示
	show(); // 画像の表示
};
xhr.send();

function show() {
	Object.keys(data).forEach(function(date) {
		Object.keys(data[date]).forEach(function(index) {
			var src = data[date][index].src;
			var url = data[date][index].url;
			var image = "<img src='"+ src + "' data-src='"+ src + "'>";
			var link = "<a class='gif-image' href='http://uimovement.com"+ url +"' target='_blank' style='display:none'>"+ image +"</a>";
			$('#images').append(link);
		});
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
