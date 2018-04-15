// Carla de Beer
// October 2017
// A simple Chatbot number guessing game.

// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=slmSCEho31g

function setup() {
	noCanvas();

	let bot = new RiveScript();
	bot.loadFile("brain.rive", brainReady, brainError);

	function brainReady() {
		console.log("Chatbot ready!");
		bot.sortReplies();
		let num = floor(random(10)) + 1;
		bot.reply("local-user", "set " + num);
	}

	function brainError() {
		console.log("Chatbot error!");
	}

	let button = select("#submit");
	let userInput = select("#userInput");
	let output = select("#output");

	button.mousePressed(chat);

	function chat() {
		let input = userInput.value();
		let reply = bot.reply("local-user", input);
		output.html(reply);
	}
}

