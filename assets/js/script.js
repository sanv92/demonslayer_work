$(document).ready(function() {

//slider
if($('.bjqs').length) {
	$('#slide > div:first-child').bjqs({
		height      : 376,
		width       : 636,
		responsive  : true
	});
}

//browser fix
if($('#tb_header').length) {
    $('#tb_header > ul + ul  > li + li:even').addClass('tb_even');
    $('#tb_header > ul + ul  > li + li:odd').addClass('tb_odd');
    $('#tb_header > h2 + dl + ul > li + li + li:odd').addClass('tbs_even');
    $('#tb_header > h2 + dl + ul > li + li + li:even').addClass('tbs_odd');
}

//random logo
	$(function() {
		$("#nav > a > img").mouseover(function() {
				var number = 1 + Math.floor(Math.random() * 2);
				var src = $(this).attr("src").match(/[^\.]+/) + "-"+number+".gif";
				$(this).attr("src", src);
			})
			.mouseout(function() {
				var src = $(this).attr("src");
				var src = src.substring(0, src.length - 6) + '.gif';
				$(this).attr("src", src);
			});
	});

//login
	$('#nav > ul > li:first-child + li + li + li + li + li').click(function () {
		arent.showDialog('01');
		return false;
	});
	$('#nav > ul > li:first-child + li + li + li + li ').click(function () {
		parent.showDialog('02');
		return false;
	});
	
//menu
	$('nav[role=navigation] ul:first-child > li').hover( function() {
		$(this).find('ul').hide(0);
		$(this).find('ul').stop(true, true);
		$(this).find('ul').slideDown(400);
	}, function() {
			$(this).find('ul').hide(0);
		});

//gender select
$('#lblock > figure > figure > figcaption').hover(function() {
if($(this).next('img').is(':not(:visible)') && $('#lblock > figure > figure > figcaption + img').css('opacity') == 1) {
	$('#lblock > figure > figure > figcaption').removeClass('active');
	$(this).addClass('active');
	$('#lblock > figure > figure > figcaption').next('img').hide(0);
	$(this).next('img').fadeIn(0);
}

});


//gallery by Sander
var gallen = $('#screenshots > ul > li, #gallery > ul > li').size() -1;

$('#lightoff').css({ 'opacity' : 0.6 });
	$('#screenshots > ul > li, #gallery > ul > li').click(function(e){
	e.preventDefault();
	e.stopPropagation();

if($('#screenshots').length) { var href = $(this).children('img').attr('src'); }
if($('#gallery').length) { var href = $(this).children('a').attr('href'); }

if($('#screenshots').length) { var alt = $(this).children('img').attr('alt'); }
if($('#gallery').length) { var alt = $(this).children('a').children('img').attr('alt'); }


$(this).addClass('spilt');

if($('#screenshots').length) { $(this).css({ 'border' : '1px solid #929292' }); }
if($('#gallery').length) { $(this).children('a').children('img').css({ 'background' : '#007AFF' }); }

$('#close').fadeIn('fast');
		if ($('#lightoff').is(":hidden")) {

			$('#lightoff').fadeIn("slow");
			$('<div class="tooltip">').html('<div id="wrnav"><div id="alt">' + alt + '</div><img src="' + href + '" alt="" /></div><div id="lfgallnav"><div><div id="galleft"></div><div id="galright"></div><div id="spclose"></div></div></div></div>').fadeIn(300).appendTo('body');

    var w = $('.tooltip img').width();
	var h = $('.tooltip img').height();
	$('#lfgallnav').css({ height : h + 'px' });
	$('#lfgallnav > div:first-child').css({ width : w + 'px' });


$(window).bind('resize',function() {
    var w = $('.tooltip img').width();
	var h = $('.tooltip img').height();
	$('#lfgallnav').css({ height : h + 'px' });
	$('#lfgallnav > div:first-child').css({ width : w + 'px', height : h + 'px' });
});

	$('#spclose').fadeIn(500);
	$('#galleft').fadeIn(500);
	$('#galright').fadeIn(500);


setTimeout(function(){
	$("#lfgallnav").trigger("resize");
}, 100);

function navout() {
	$('#spclose').hide();
	$('#galleft').hide();
	$('#galright').hide();
}

function navin() {
	$('#spclose').fadeIn(300);
	$('#galleft').fadeIn(300);
	$('#galright').fadeIn(300);
}

		$('#galright').click(function() {

if($('#screenshots').length) {
	var galnum = $('.spilt').index();
	if(gallen == galnum) {} else {
				var childimgprv = $(".spilt").next().addClass("spilt");
				$(".spilt").prev().removeClass("spilt");
				var gpilt = $(childimgprv).children('img').attr('src');
				var piltnimi = $(childimgprv).children('img').attr('alt');
				$(childimgprv).prev().removeAttr('style');
				$(childimgprv).css({ 'border' : '1px solid #929292' });
				//$('.tooltip img').removeAttr('src');
				$('.tooltip #alt').text(piltnimi);
				$('.tooltip img').attr('src', gpilt);
				navout();
	}
			}

if($('#gallery').length) {
	var galnum = $('.spilt').index();
	if(gallen == galnum) {} else {
				var childimgprv = $(".spilt").next().addClass("spilt");
				$(".spilt").prev().removeClass("spilt");
				var gpilt = $(childimgprv).children('a').attr('href');
				var piltnimi = $(childimgprv).children('a').children('img').attr('alt');
				$(childimgprv).prev().children('a').children('img').removeAttr('style');
				$(childimgprv).children('a').children('img').css({ 'background' : '#007AFF' });
				//$('.tooltip img').removeAttr('src');
				$('.tooltip #alt').text(piltnimi);
				$('.tooltip img').attr('src', gpilt);
				navout();
	}
}



setTimeout(function(){
	$("#lfgallnav").trigger("resize");
	navin();
}, 400);


		});


if($('#screenshots').length) {
$('#galleft').click(function(){
	var galnum = $('.spilt').index();

		if(0 == galnum) {} else {
			var childimgprv = $(".spilt").prev().addClass("spilt");
			$(".spilt").next().removeClass("spilt");
			var gpilt = $(childimgprv).children('img').attr('src');
			var piltnimi = $(childimgprv).children('img').attr('alt');
			$(childimgprv).next().children('a').children('img').removeAttr('style');
			$(childimgprv).css({ 'border' : '1px solid #929292' });
			//$('.tooltip img').removeAttr('src');	
			$('.tooltip #alt').text(piltnimi);	
			$('.tooltip img').attr('src', gpilt);
			navout();
	}

setTimeout(function(){
	$("#lfgallnav").trigger("resize");
	navin();
}, 400);

});
}

if($('#gallery').length) {
$('#galleft').click(function(){
	var galnum = $('.spilt').index();

		if(0 == galnum) {} else {
			var childimgprv = $(".spilt").prev().addClass("spilt");
			$(".spilt").next().removeClass("spilt");
			var gpilt = $(childimgprv).children('a').attr('href');
			var piltnimi = $(childimgprv).children('a').children('img').attr('alt');
			$(childimgprv).next().children('a').children('img').removeAttr('style');
			$(childimgprv).children('a').children('img').css({ 'background' : '#007AFF' });
			//$('.tooltip img').removeAttr('src');	
			$('.tooltip #alt').text(piltnimi);	
			$('.tooltip img').attr('src', gpilt);
			navout();

	}

setTimeout(function(){
	$("#lfgallnav").trigger("resize");
	navin();
}, 400);


	});

}
		
		} else {
			$('#lightoff, .tooltip img').fadeOut("slow");
			$('<div class="tooltip">').html('');
			$('#screenshots > ul > li, #gallery > ul > li').removeAttr('class');
			$('#spclose').fadeOut('fast');
		}

	}), $(document).on('click', '#spclose', function(){
			$('#lightoff').fadeOut("slow");
			$('.tooltip').fadeOut("fast");
			$('<div class="tooltip">').html('');
			$('#spclose').remove();
			$('#screenshots > ul > li, #gallery > ul > li').removeAttr('class');
			$('.tooltip').remove();
			$('#screenshots > ul > li, #gallery > ul > li a img').removeAttr('style');
			$('#close').fadeOut('fast');
			$('#spclose').fadeOut('fast');
	});
//gallery

if($('#vk_groups').length) {
	VK.Widgets.Group("vk_groups", {mode: 0, width: "270", height: "300", color1: 'FFFFFF', color2: '2B587A', color3: '5B7FA6'}, 57925293);
}

});
