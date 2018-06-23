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
var actionButton = $('<button>');

function chosenChar() {
	if (menu.text() == "Select Character") {
		$('.player').append($(this));
		$(this).removeClass('col-3');
		$(this).addClass('float-left');
		$(this).addClass('pChar');
		menu.text('Choose Opponent');
		$('.pChar').attr('data-alive' , 'player');
	} else if (menu.text() == "Choose Opponent") {
		$('.opponent').append($(this));
		$(this).removeClass('col-3');
		$(this).addClass('float-right');
		$(this).addClass('oChar');
		menu.text('Challengers Awaiting');
		actionButton.text('Attack');
		actionButton.addClass('attackButton');
		$('.actions').append(actionButton);
	}

}

var basePower = 0;

function attackAction() {

	var playerChar = $('.pChar');
	var oppChar = $('.oChar');

	if (oppChar.attr('data-health') >= 0) {
	
	var newPower = basePower + parseInt(playerChar.attr('data-attack'));
	var pAttack = oppChar.attr('data-health') - newPower;
	basePower = newPower;
	oppChar.attr('data-health' , pAttack);

	$('.oChar > .showHealth').text(oppChar.attr('data-health'));





	var oCounter = playerChar.attr('data-health') - oppChar.attr('data-counter');
	playerChar.attr('data-health' , oCounter);

	$('.pChar > .showHealth').text(playerChar.attr('data-health'));

	}


	if (oppChar.attr('data-health') <= 0) {
		oppChar.attr('data-health' , 0)
		$('.oHealth').text('Health: ' + oppChar.attr('data-health'));
		oppChar.attr('data-alive' , 'no');
		oppChar.hide();
		oppChar.removeClass('oChar');
		menu.text('Choose Opponent');
	}

	if (playerChar.attr('data-health') <= 0) {
		playerChar.attr('data-health' , 0)
		$('.pHealth').text('Health: ' + playerChar.attr('data-health'));
		playerChar.hide();
		playerChar.removeClass('pChar');
		menu.text('DEFTEATED');
		actionButton.text('Reset');
		actionButton.addClass('resetButton');
		$('.resetButton').on('click' , function() {
			location.reload();
		})
	}

	if (($('.char').attr('data-alive') == 'yes' || $('.oChar').attr('data-alive') == 'yes') == false && $('.pChar').attr('data-alive') == 'player') {
		menu.text('WINNER!');
		actionButton.text('Reset');
		actionButton.addClass('resetButton');
		$('.resetButton').on('click' , function() {
			location.reload();
		})

	}



}

$('.char').on('click' , chosenChar);


$('.actions').on('click' , attackAction);



