var a = $('#a');
var b = $('#b');
var c = $('#c');
var d = $('#d');

var aHealth = $('#aHealth');
var bHealth = $('#bHealth');
var cHealth = $('#cHealth');
var dHealth = $('#dHealth');

a.attr('data-health' , 100);
a.attr('data-attack' , 14);
a.attr('data-counter' , 35);
a.attr('data-alive' , 'yes');
aHealth.append(a.attr('data-health'));

b.attr('data-health' , 200);
b.attr('data-attack' , 8);
b.attr('data-counter' , 5);
b.attr('data-alive' , 'yes');
bHealth.append(b.attr('data-health'));

c.attr('data-health' , 140);
c.attr('data-attack' , 12);
c.attr('data-counter' , 10);
c.attr('data-alive' , 'yes');
cHealth.append(c.attr('data-health'));

d.attr('data-health' , 120);
d.attr('data-attack' , 12);
d.attr('data-counter' , 25);
d.attr('data-alive' , 'yes');
dHealth.append(d.attr('data-health'));

var menu = $('.menu');
var actionButton = $('.actionButton');

actionButton.hide();

function chosenChar() {
	if (menu.text() == "Select Character") {
		$('.player').append($(this));
		$(this).removeClass('col-3');
		$(this).addClass('pChar');
		menu.text('Choose Opponent');
		$('.pChar').attr('data-alive' , 'player');
		$('.pChar > img').css("height" , "200px");
		$('.char').css("color", "red");
		$(this).css("color", "RoyalBlue");
	} else if (menu.text() == "Choose Opponent" || menu.text() == "Choose New Opponent") {
		$('.opponent').append($(this));
		$(this).removeClass('col-3');
		$(this).addClass('oChar');
		menu.text('Fight');
		actionButton.text('Attack');
		actionButton.show();
		$('.pChar > img').css("height" , "250px");
		$('.oChar > img').css("height" , "250px");
		$('.charSelect > .char').hide();
		$('.opponent > h2').text('Opponent Pick');
	}

}

var basePower = 0;
var drawDead;
var playerChar = $('.pChar');
	var oppChar = $('.oChar');

function attackAction() {

	var playerChar = $('.pChar');
	var oppChar = $('.oChar');

	var newPower = basePower + parseInt(playerChar.attr('data-attack'));
	var pAttack = oppChar.attr('data-health') - newPower;

	if (oppChar.attr('data-health') >= 0) {
	
	basePower = newPower;
	oppChar.attr('data-health' , pAttack);

	$('.oChar > div > p > .showHealth').text(oppChar.attr('data-health'));


	var oCounter = playerChar.attr('data-health') - oppChar.attr('data-counter');
	playerChar.attr('data-health' , oCounter);

	$('.pChar > div > p > .showHealth').text(playerChar.attr('data-health'));

	}

	$('.attackPower').text('You dealt ' + newPower + ' damage');
	$('.counterDamage').text(oppChar.attr('data-counter') + ' damage taken');




	if (oppChar.attr('data-health') <= 0) {
		oppChar.attr('data-alive' , 'no');
		oppChar.hide();
		$('.opponent > h2').text('You Defeated ' + $('.oChar > h3').text());
		oppChar.removeClass('oChar');
		menu.text('Choose New Opponent');
		$('.charSelect > .char').show();
		$('.char > img').css("height" , "150px");
		$('.pChar > img').css("height" , "150px");
		$('.oChar > img').css("height" , "150px");
		
	}

	if (playerChar.attr('data-health') <= 0) {
		playerChar.hide();
		playerChar.removeClass('pChar');
		menu.text('DEFTEATED');
		$('.player > h2').text('Defeated by ' + $('.oChar > h3').text());
		actionButton.text('Reset');
		actionButton.addClass('resetButton');
		$('.charSelect > .char').show();
		$('.resetButton').on('click' , function() {
			location.reload();
		})
	}

	if ((playerChar.attr('data-health') <= 0) && (oppChar.attr('data-health') <= 0)) {
		menu.text('DEFTEATED');
		actionButton.text('Reset');
		actionButton.addClass('resetButton');
		$('.opponent > h2').text('Draw');
		$('.player > h2').text('Draw');
		playerChar.show();
		oppChar.show();
		$('.charSelect').hide();
		$('.resetButton').on('click' , function() {
			location.reload();
		})
	}

	if (($('.char').attr('data-alive') == 'yes' || $('.oChar').attr('data-alive') == 'yes') == false && $('.pChar').attr('data-alive') == 'player') {
		menu.text('WINNER!');
		actionButton.text('Reset');
		actionButton.addClass('resetButton');
		$('.pChar > img').css("height" , "300px");
		$('.resetButton').on('click' , function() {
			location.reload();
		})

	}



}

$('.char').on('click' , chosenChar);


$('.actionButton').on('click' , attackAction);



