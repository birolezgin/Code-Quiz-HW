var button = document.getElementById("my-button");
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var secondsLeft = 20;

    button.addEventListener("click", function(){ setTime();});
    function setTime() {
    var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";
    
    if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
        var initial=prompt("Please type your initial here");
        alert("Hi " + initial + " Your score is " + `${quiz.score}`);
      }

    if(secondsLeft === 0) {
        showScore();
    }

    if (quiz.isFinish()) {
        clearInterval(timerInterval);
        timeEl.textContent =  "-- Quiz is over! --";
        var initial=prompt("Please type your initial here");
        alert("Hi " + initial + " Your score is " + `${quiz.score}`);
    }
   
  }, 1000);
}

function sendMessage() {
  timeEl.textContent = " ";

  var imgEl = document.createElement("img");

  imgEl.setAttribute("src", "times-up.JPG");
  mainEl.appendChild(imgEl);
}


function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

// Question prototype
Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

// Quiz Constructor
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0
}

// Quiz prototype
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

// Quiz isFinish
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}

// Quiz guess
Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();
    if(question.checkAnswer(answer)){
        this.score++;
    }

    else {
        secondsLeft = secondsLeft - 4;
    }

    this.questionIndex++;
}

var q1 = new Question("It is in the North of Washington State!",["Bellevue","Renton","Kent","Everet"],"Everet");

var q2 = new Question("It is not from berry family!",["Strawberry","Bananas","Blueberry","Roseberry"],"Bananas");

var q3 = new Question("It is not a Autumn month!",["September","December","November","October"],"December");

var questions = [q1,q2,q3];

// Start Quiz
var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion(){
    if(quiz.isFinish()){
        showScore();
    }else{

        var question = quiz.getQuestion();
        var choices = question.choices;
        

        document.querySelector('#question')
        .textContent = question.text;

        for(var i=0; i<choices.length;i++){
            var element = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];
            guess('btn'+i,choices[i]);
        }

        showProgress();
    }
}

function guess(id,guess){
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
    }
}

function showScore(){
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

    document.querySelector('.card-body').innerHTML = html;
}

function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex+1;
    document.querySelector('#progress').innerHTML ='Question '+ questionNumber + ' of ' + totalQuestion;
}
