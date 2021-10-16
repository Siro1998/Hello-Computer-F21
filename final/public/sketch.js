let strokeIndex = 0;
let index = 0;
let score = 0;
let object;
let word;
let prevx, prevy;
var speechResult;
var myTimer;

const url = '/quickdraw';

const synth = window.speechSynthesis;
const SpeechRecognition = webkitSpeechRecognition;

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');



document.querySelector("#my-answer").onclick = () => {
    document.querySelector("#speech-div").textContent = "I am listening...";
    console.log("answer");
    getSpeech();
};

document.querySelector("#my-drawing").onclick = () => {
    getDrawing();
    draw();
    document.querySelector("#speech-div").textContent = " ";
    document.querySelector("#myanswer-div").textContent = " ";
};

document.querySelector("#start").onclick = () => {
    clearInterval(myTimer);
    display = document.querySelector('#time');
    startTimer(60,display);
    score = 0;
    document.querySelector("#score-div").textContent = "My Score: " + score;
    getDrawing();
    draw();
};

document.querySelector("#get-answer").onclick = () => {
    document.querySelector("#speech-div").textContent = word;
};

async function getDrawing(){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function draw() {   
    //if(canvas.getContext){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    //}
    getDrawing().then(function(result) {
        var data = result;
        object = data.drawing;
        console.log(object);
        word= data.word;
        console.log(word);
        strokeIndex=0;
        while(strokeIndex < object.length){
        //if (object) {
            //console.log(strokeIndex + "  " + index);
            let x = object[strokeIndex][0][index];
            let y = object[strokeIndex][1][index];
            if(prevx !== undefined){
                drawLine(prevx,prevy,x,y);
                //syncDelay(50);
            }
            index++;
            if(index >= object[strokeIndex][0].length){
                strokeIndex++;
                prevx = undefined;
                prevy = undefined;
                index = 0;
                //if(strokeIndex === object.length){
                //    object = null;
                //}
            }else{
                prevx = x;
                prevy = y;
            }
        //}
        }  
    });
    
}  

function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
}   

function drawLine(x1,y1,x2,y2,stroke='black',width=3){
    if(stroke){
        ctx.strokeStyle = stroke;
    }
    if(width){
        ctx.lineWidth = width;
    }
    ctx.beginPath();
    ctx.moveTo(x1+20,y1+20);
    ctx.lineTo(x2+20,y2+20);
    ctx.stroke();
    ctx.closePath();
} 

const getSpeech = () => {
	const recognition = new SpeechRecognition();
	recognition.lang = "en-US";
	recognition.start();
    
	recognition.onresult = (event) => {
		speechResult = event.results[0][0].transcript;
		console.log(speechResult);
		document.querySelector("#speech-div").textContent = speechResult;
        
        const answer = getAnswer();
        console.log(answer);
        
        if(answer){
            score++;
            document.querySelector("#score-div").textContent = "My Score: " + score;
        }
	};

	recognition.onend = () => {
		console.log("it is over");
		recognition.stop();
	};

	recognition.onerror = (event) => {
		console.log("something went wrong: " + event.error);
	};
};    

const getAnswer = () => {
    if (speechResult === word){
        console.log("right!");
        document.querySelector("#myanswer-div").textContent = "Correct!";
        speakEnglish("Correct");
        return true;
    }else{
        console.log("wrong!");
        document.querySelector("#myanswer-div").textContent = "Try Again!";
        speakEnglish("Try Again!");
        return false;
    }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    myTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if(--timer<0){
            clearInterval(myTimer);
        }
    }, 1000);

}

const speakEnglish = (text) => {
	if (synth.speaking) {
		console.error("it's speaking already");
		return;
	}

	let utterThis = new SpeechSynthesisUtterance(text);
	 utterThis.lang = "en-US";
	synth.speak(utterThis);
};




