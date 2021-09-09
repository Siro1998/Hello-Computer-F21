console.log("hello from the script!");

// const is the same as var but for variables that don't change
// let is the same as var but for variables that can change
const synth = window.speechSynthesis;

document.querySelector("#button1").onclick = () => {
	console.log("button1 clicked");
	let textInput = document.querySelector("#text-input").value;
	speakFrench(textInput);
};
document.querySelector("#button2").onclick = () => {
	console.log("button1 clicked");
	let textInput = document.querySelector("#text-input").value;
	speakGerman(textInput);
};
document.querySelector("#button3").onclick = () => {
	console.log("button1 clicked");
	let textInput = document.querySelector("#text-input").value;
	speakJapanese(textInput);
};
document.querySelector("#button4").onclick = () => {
	console.log("button1 clicked");
	let textInput = document.querySelector("#text-input").value;
	speakChinese(textInput);
};

// function speak(text) {} --> this is the same as below
const speakFrench = (text) => {
	if (synth.speaking) {
		console.error("it's speaking already");
		return;
	}

	let utterThis = new SpeechSynthesisUtterance(text);
	 utterThis.lang = "fr-FR";
	synth.speak(utterThis);
};

const speakGerman = (text) => {
	if (synth.speaking) {
		console.error("it's speaking already");
		return;
	}

	let utterThis = new SpeechSynthesisUtterance(text);
	 utterThis.lang = "de-DE";
	synth.speak(utterThis);
};

const speakJapanese = (text) => {
	if (synth.speaking) {
		console.error("it's speaking already");
		return;
	}

	let utterThis = new SpeechSynthesisUtterance(text);
	 utterThis.lang = "ja-JP";
	synth.speak(utterThis);
};

const speakChinese = (text) => {
	if (synth.speaking) {
		console.error("it's speaking already");
		return;
	}

	let utterThis = new SpeechSynthesisUtterance(text);
	 utterThis.lang = "zh-CN";
	synth.speak(utterThis);
};