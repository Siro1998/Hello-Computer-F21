// to run a simple server, cd in your terminal to the folder these files are in and run:
// python -m SimpleHTTPServer 3000
// then go to http://localhost:3000 in your browser

const synth = window.speechSynthesis;
const SpeechRecognition = webkitSpeechRecognition; //eslint-disable-line
const giphyAPIKey = "moTuOrHfKc7d5rAGn0qhg4hy8Mg8pClc"; // sign up and create an app to get one: https://developers.giphy.com/


const speakFrench = (text) => {
	if (synth.speaking) {
		console.error("it's speaking already");
		return;
	}
	let utterThis = new SpeechSynthesisUtterance(text);
	 utterThis.lang = "fr-FR";
	synth.speak(utterThis);
};
const speakEnglish = (text) => {
	if (synth.speaking) {
		console.error("it's speaking already");
		return;
	}
	let utterThis = new SpeechSynthesisUtterance(text);
	 utterThis.lang = "en-US";
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

const getSpeech = () => {
	const recognition = new SpeechRecognition();
	recognition.lang = "zh-CN";
	recognition.start();
    
	recognition.onresult = (event) => {
		const speechResult = event.results[0][0].transcript;
		console.log(speechResult);
		document.querySelector("#speech-div").textContent = speechResult;
		getGif(speechResult);
	};

	recognition.onend = () => {
		console.log("it is over");
		recognition.stop();
		getSpeech();
	};

	recognition.onerror = (event) => {
		console.log("something went wrong: " + event.error);
	};
};

const getGif = (phrase) => {
	// same as:
	// let url = "http://api.giphy.com/v1/gifs/random?api_key=" + giphyAPIKey + "&tag=" + phrase;
	// more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

	const url = `https://api.giphy.com/v1/gifs/random?api_key=${giphyAPIKey}&tag=${phrase}`;

	// more info: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	fetch(url, { mode: "cors" })
		.then((response) => response.json())
		.then((result) => {
			let imgUrl = result.data.image_url;
			document.querySelector("#the-gif").src = imgUrl;
			console.log(imgUrl);
		});
};

document.querySelector("#my-button").onclick = () => {
    console.log("record");
    getSpeech();
};
document.querySelector("#french").onclick = () => {
    console.log("speak");
    let textInput = document.querySelector("#text-input").value;
	speakFrench(textInput);
};
document.querySelector("#english").onclick = () => {
    console.log("speak");
    let textInput = document.querySelector("#text-input").value;
	speakEnglish(textInput);
};
document.querySelector("#japanese").onclick = () => {
    console.log("speak");
    let textInput = document.querySelector("#text-input").value;
	speakJapanese(textInput);
};