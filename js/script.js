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

		/* 必要な情報の取得 */
		$(this).find('.single-resource-thumb').each(function(i) {
			var _data = {
				title: $(this).find('h6').text(), // 作品名
				creatorImg: $(this).find('.avatar-image').attr('src'), // 作者画像
				creatorName: $(this).find('.user-resource-user-deets').find('a').text(), // 作者名
				url: $(this).find('.single_gif_preview_wrapper').find('a').attr('href'), // 画像元サイト
				src: $(this).find('.single_gif_preview_wrapper').find('img').data('src') // 画像ソース
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
