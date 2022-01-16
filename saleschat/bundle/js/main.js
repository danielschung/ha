$( document ).ready(function() {

//  1. Knowledge Owl -----

function koout() {
	$('div.ko').animate({right:'-402px'},200,'swing');
}

function koinit(time) { 
	$('div.ko').delay(time).animate({right:'0'},200,'swing');
	$('div.wrapper, img.close').one('click', function(event) {
		event.stopPropagation();
		koout();
	})
}

$('button.help').click(function() {
	koinit();
})

//  2. Chat Window -----

function chatin() {
	$('div.chat').fadeIn(200).animate({bottom:'20px', opacity:'1'}, 400, 'swing');
	// $('div.chat div.disclaimer').delay(900).fadeIn(500);
}

function disclaimerIn() {
	$('div.chat div.disclaimer').delay(900).fadeIn(200).animate({top:'86px', opacity:'1'}, 400, 'swing');
}

function disclaimerClose() {
	$('div.chat div.disclaimer').animate({top:'0', opacity:'1'}, 400, 'swing').fadeOut(500);
}

function chatout() {
	$('div.chat').animate({bottom:'0', opacity:'0'}, 400, 'swing').fadeOut(200);
}

function confirmin() {
	$('#confirm-close').fadeIn(200);
}

function confirmout() {
	$('#confirm-close').fadeOut(200);
}

function endconvo() {
	let time = getTime();
	let inject = `<div class="date">Conversation ended by You - ${time}</div>`;
	$(inject).appendTo($('div.log'));
}

function firstMessage() {
	let time = getTime();
	let inject = `<div class="time"><span>Virtual Assistant</span> - ${time}</div>`;
	$(inject).appendTo($('div.first'));
	$('div.first').hide().delay(900).fadeIn();
	$('div.date').hide().delay(900).fadeIn();
}

// function firstRedo() {
// 	let time = getTime();
// 	let inject = `<div class="entry sales option first"><div class="bubble">Hello, I am your Virtual Assistant from Health Alliance. First off, are you a current member?</div><div class="options"><div class="no">No</div><div class="yes">Yes</div></div><div class="time"><span>Virtual Assistant</span> - ${time}</div></div>`;
// 	$(inject).hide().appendTo($('div.chat div.log')).delay(900).fadeIn();
// 	$('div.date').hide().delay(900).fadeIn();
// }

function koexisting() {
	$('div.ko div.conversation').hide();
	$('div.ko div.conversation-existing').show();
}

function konew() {
	$('div.ko div.conversation').show();
	$('div.ko div.conversation-existing').hide();
}

function getTime() {
	let today = new Date();
	let hour = today.getHours();
	let minute = today.getMinutes();
	let meridies = 'AM'
	if (hour > 12) {
		hour = hour - 12;
		meridies = 'PM';
	} else if (hour === 0) {
		hour = '12';
	}
	if (minute < 10) {
		minute = '0' + minute;
	}
	return hour + ':' + minute + ' ' + meridies;
}

$('div.ko div.conversation button').one('click', function() {
	firstMessage();
	disclaimerIn();
});

$('div.ko div.conversation button').click(function() {
	koout();
	chatin();
	turnOffNotification();
});

$('div.chat div.header img.minus').click(function() {
	koexisting();
	chatout();
});

$('div.chat div.header img.close').click(function() {
	confirmin();
});

$('#confirm-close div.no').click(function() {
	confirmout();
});

$('#confirm-close div.yes').click(function() {
	chatout();
	confirmout();
	konew();
	endconvo();
});

$('div.chat div.header img.arrow').click(function() {
	koexisting();
	chatout();
	koinit(300);
})

$('div.ko div.conversation-existing div.chat-block').click(function() {
	koout();
	chatin();
	turnOffNotification();
})

$('div.disclaimer img.close').click(function() {
	disclaimerClose();
})

// textarea function
const textarea = $('textarea');

textarea.each(function () {
  this.setAttribute("style", "max-height:50px" + (this.scrollHeight) + "px;overflow-y:scroll;");
}).on("input", function () {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

function iconChange() {
	if (textarea.val().length > 0) {
		$('div.type img.attachment').hide();
		$('div.type img.send').show();
	} else {
		$('div.type img.attachment').show();
		$('div.type img.send').hide();
	}
}

textarea.keyup(function() {
	iconChange();
})

function userSendInject(message) {
	let time = getTime();
	let codeblock = `<div class="entry user"><div class="bubble">${message}</div><div class="time"><span>You</span> - ${time} | Seen</div></div>`
	$(codeblock).hide().appendTo($('div.chat div.log')).fadeIn();
}

function userSend() {
	let message = textarea.val();
	userSendInject(message);
	textarea.val('');
	iconChange();
}

function autoSendInject(message) {
	let time = getTime();
	let codeblock = `<div class="entry sales"><div class="bubble">${message}</div><div class="time"><span>Virtual Assistant</span> - ${time}</div></div>`;
	$(codeblock).hide().appendTo($('div.chat div.log')).fadeIn();
}

function connectionSuccess(message) {
	let time = getTime();
	let codeblock = `<div class="entry sales"><div class="bubble">${message}</div><div class="time"><span>Sherry S</span> - ${time}</div></div>`;
	$(codeblock).hide().appendTo($('div.chat div.log')).fadeIn();
}

$('div.type img.send').click(function() {
	userSend();
})

textarea.keypress(function (e) {
	let key = e.which;
	if(key == 13) {
		$('div.type img.send').click();
		return false;
	}
});

// auto-message functions
function optionChoice(choice) {
	userSendInject(choice);
}

function autoSendOneYes() {
	let message = `For our current members, you can <a href="https://hally.com/login/" target="_blank">login to Hally</a> to chat with us. We'll continue the conversation there!`;
	autoSendInject(message);
}

function autoSendOneNo() {
	let message = `Ok! I’m going to connect you with an associate for more assistance. While I’m connecting you, could you tell me in a short sentence how we can help you today?`;
	autoSendInject(message);
	prepAutoSendTwo();
}

function prepAutoSendTwo() {
	let log = document.getElementById('log');
	const observer = new MutationObserver(() => {
	  setTimeout(() => { autoSendTwo() }, 3000 );
	  observer.disconnect();
	})
	observer.observe(log, { subtree: false, childList: true });
}

function autoSendTwo() {
	let message = `Got it! I’m passing your info along, and an associate will be assisting you shortly.`;
	autoSendInject(message);
	setTimeout(() => { simulateConnect() }, 7000 );
}

$('div.log div.first div.options div.no').click(function() {
	optionChoice('No');
	setTimeout(() => { autoSendOneNo() }, 1500 );
})

$('div.log div.first div.options div.yes').click(function() {
	optionChoice('Yes');
	setTimeout(() => { autoSendOneYes() }, 1500 );
})

function simulateConnect() {
	let message = `Thank you for the wait. It’s my pleasure to assist you with your questions about sales today. My name is Sherry. May I have your full name please? `;
	connectionSuccess(message);
}

// simulate notification function
function simulateNotification() {
	$('div.notification').addClass('show');
}

function turnOffNotification() {
	$('div.notification').removeClass('show');
}

$('#simulate-notification').click(function() {
	simulateNotification();
})


});
