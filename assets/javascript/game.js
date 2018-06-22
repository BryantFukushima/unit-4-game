var a = $('#a');
var b = $('#b');
var c = $('#c');
var d = $('#d');

a.attr('data-health' , 100);
a.attr('data-attack' , 1);
a.attr('data-counter' , 15);

b.attr('data-health' , 200);
b.attr('data-attack' , 2);
b.attr('data-counter' , 5);

c.attr('data-health' , 140);
c.attr('data-attack' , 3);
c.attr('data-counter' , 8);

d.attr('data-health' , 120);
d.attr('data-attack' , 4);
d.attr('data-counter' , 9);

var menu = $('.menu');
var actionButton = $('<button>');

function chosenChar() {
	if (menu.text() == "Select Character") {
		$('.player').append($(this));
		$(this).removeClass('col-3');
		$(this).addClass('float-left');
		$(this).addClass('pChar');
		menu.text('Choose Opponent');
		var showHP = $('<div>');
		var hp = $(this).data('health');
		showHP.addClass('pHealth');
		showHP.text('Health: ' + hp);
		$('.player').append(showHP);
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

	
	var newPower = basePower + playerChar.data('attack');
	var pAttack = oppChar.attr('data-health') - newPower;
	basePower = newPower;
	oppChar.attr('data-health' , pAttack);

	$('.oHealth').text('Health: ' + oppChar.attr('data-health'));



	var oCounter = playerChar.data('health') - oppChar.data('counter');
	playerChar.data('health' , oCounter);

	$('.pHealth').text('Health: ' + playerChar.data('health'));

	if (oppChar.attr('data-health') <= 0) {
		oppChar.attr('data-health' , 0)
		$('.oHealth').text('Health: ' + oppChar.attr('data-health'));
		oppChar.hide();
		oppChar.removeClass('oChar');
		menu.text('Choose Opponent')
	}

}

$('.char').on('click' , chosenChar);


$('.actions').on('click' , attackAction);