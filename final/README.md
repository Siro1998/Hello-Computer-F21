# Final!!！
## What I did!
  For the final project, I created a game called Quick,Guess , which is inspired by Quick, Draw by Google Creative Lab. 
  I used the open drawing data of Quick, Draw and let the player to guess what each drawing is.
  Players have one minute time limit to guess as much drawings as they can, and if they get it correctly, score will plus one. 
  Technology envolves Javascript, html, CSS, speech recognition, speech synthesis, API, Node.js...
  
  <img width="1381" alt="Screen Shot 2021-10-16 at 6 16 42 PM" src="https://user-images.githubusercontent.com/43830622/137603398-9e1e5049-95b5-4fae-8d6a-758028266714.png">


## Get Data from Quick,Draw
  Quick,Draw has more than 50 million drawing in their dataset, and are all stored in ndjson file format. I downloaded these file, selected some drawings and combined them into a new ndjson file. 
  
  <img width="869" alt="Screen Shot 2021-10-16 at 6 35 49 PM" src="https://user-images.githubusercontent.com/43830622/137603753-6763fdc2-8aae-4b38-b0a3-12eeaaacf9f7.png">

  <img width="1127" alt="Screen Shot 2021-10-16 at 6 37 19 PM" src="https://user-images.githubusercontent.com/43830622/137603755-fb8bca15-8a60-400b-87a6-964f5896b7c4.png">

  <img width="997" alt="Screen Shot 2021-10-17 at 11 10 25 AM" src="https://user-images.githubusercontent.com/43830622/137633374-1bcc60d0-4016-4099-ae6b-fbbc7571ed9d.png">

  Download and install the npm express and ndjson.
  
  <img width="803" alt="Screen Shot 2021-10-17 at 11 32 20 AM" src="https://user-images.githubusercontent.com/43830622/137634235-5b1a3dd9-fa71-46f2-9be5-1e3a5b595c6c.png">

  <img width="758" alt="Screen Shot 2021-10-17 at 11 32 46 AM" src="https://user-images.githubusercontent.com/43830622/137634272-5b850dbe-5d5f-437e-aa59-29e361f89e8c.png">

  I created a js server to access the data.
  
  <img width="659" alt="Screen Shot 2021-10-17 at 11 22 02 AM" src="https://user-images.githubusercontent.com/43830622/137633844-d0dfc185-1dd0-407c-b8b9-80774830ae94.png">

## Result

html code:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />
    <title>Quick, Guess!</title>

  </head>
  <body>
    <div class = "navbar">
        <div>Quick, Guess!</div>
        <div><span id="time">01:00</span></div>
        <div id="score-div">My Score: 0</div>
    </div>


    <div class = "startmenu">
        <div><button id="start">Start</button></div>
        <div><button id="my-drawing">Next</button></div></div>
    </div>
    
    <div class = "canvas"><canvas id="canvas" height="300" width="300"></canvas></div>
    
    <div class = "myspeech" id="speech-div"></div>
    <div class = "answer">
        <div class = "myanswerbutton"><button id="my-answer">Speak</button></div>
        <div class = "getanswer"><button id="get-answer">Cheat</button></div>
    </div>
    
        
    <div class = "judgement">
        <div id="myanswer-div"></div>
    </div>


    <script src="./sketch.js"></script>
  </body>
</html>
```

Javascript code:

```
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
```


## Demo

https://user-images.githubusercontent.com/43830622/137634915-883b950c-f0b1-461c-9546-9345a8d81e9d.mov



