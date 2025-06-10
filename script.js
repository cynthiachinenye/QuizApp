const qOptions =[
     {question:"What does HTML stands for? ",
               option:["Hyper text markup language","Home Tool Markup Language", "Hyperlinks Text Markup Language"],
               answer:"Hyperlinks Text Markup Language",
            },
            {question:"Who is making the Web standards?",
                option:["Google","Microsoft","Mozilla","The world wide web consortium"],
                answer:"The world wide web consortium",
            },
            {question:"Choose the correct HTML element for the largest heading:",
                option:["<head>","<h6>","<h1>","<heading>"],
                answer:"<h1>",
            },
            {question:"What is the correct HTML element for inserting a line break?",
                option:["<break>","<br>","<lb>"],
                answer:"<br>",
            },
            {question:"What does CSS stand for?",
                option:["Colorful Style Sheets","Computer Style Sheets","Cascading Style Sheets","Consortium Style Sheets"],
                answer:"Cascading Style Sheets",
            },
            {question:"What is the correct HTML for referring to an external style sheet?",
                option:["<style src='mystyle.css'>","<stylesheet>mystyle.css</stylesheet>",'<link rel="stylesheet" type="text/css" href="style.css"/>'],
                answer:'<link rel="stylesheet" type="text/css" href="style.css"/>',
            },
            {question:"Where in an HTML document is the correct place to refer to an external style sheet?",
                option:["At the end of the document","In the <head> section","In the <body> section","The world wide web consortium"],
                answer:"In the <head> section",
            },
            {question:"Which HTML tag is used to define an internal style sheet?",
                option:["<script>","<css>","<style>"],
                answer:"<style>",
            },
            {question:"Inside which HTML element do we put the JavaScript?",
                option:["<scripting>","<js>","<script>","<javascript>"],
                answer:"<script>",
            },
            {question:`What is the correct JavaScript syntax to change the content of the HTML element below?<p id="demo">This is a demonstration.</p>`,
                option:["document.getElementByName('p').innerHTML='Hello World'","#demo.innerHTML='Hello World!'","document.getElementById('demo').innerHTML='Hello World!","document.getElement('p').innerHTML='Hello World!'"],
                answer:"document.getElementById('demo').innerHTML='Hello World!'",
            }
]

const startScreen = document.querySelector('.start-screen');
const startBtn = document.getElementById('startBtn');
const quizScreen = document.querySelector('.quiz-screen');
const questionHeader = document.getElementById('question');
const optionContiner = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultScreen = document.getElementById('result-screen');


startBtn.addEventListener('click', e =>{
    e.preventDefault()
    startScreen.style.display ="none";
    quizScreen.style.display ="block";

    displayQuestion();
    startTimer();
})

let currentQIndex = 0;
let userAnswers=[];
let score = 0;
let timeLeft= 3600;
let timeInterval;

const displayQuestion = () =>{

    const displayCurrentQuestion = qOptions[currentQIndex];
    questionHeader.textContent= displayCurrentQuestion.question;

    // update progress

    const progressText = document.getElementById('progress-bar');
     
    if(progressText){

    progressText.textContent =` Question ${currentQIndex + 1} of ${qOptions.length}` 
    }
    optionContiner.innerHTML = '';
    
    displayCurrentQuestion.option.forEach(optionT=>{
        console.log(optionT)
        const label = document.createElement('label');
        label.classList.add('label-option');

        const input = document.createElement('input');
        input.type='radio';
        input.name= "option";
        input.value = optionT;


        label.appendChild(input);
        label.appendChild(document.createTextNode(optionT));
        optionContiner.appendChild(label);
    })

}

const timeFormat=(second)=>{
    const hrs = Math.floor(second / 3600);
    const mins = Math.floor((second % 3600) / 60);
    const secs = second % 60;

    return(`${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2,'0')}`);
}

const startTimer = ()=>{
    const timeDisplayer =  document.getElementById('timer');
    timeDisplayer.textContent = timeFormat(timeLeft);

    timeInterval = setInterval(()=>{
        timeLeft--;
        timeDisplayer.textContent = timeFormat(timeLeft);

        if(timeLeft <= 0){
            clearInterval(timeInterval);

            showResult();
            return;
        }
    },1000)
}

nextBtn.addEventListener('click', ()=>{

    const selectOption = document.querySelector('input[name="option"]:checked');

    // if(!selectOption){
    //     return;
    // }

   const  userAnswer = selectOption ? selectOption.value: "";
    const correctAnswer = qOptions[currentQIndex].answer;

    if(userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()){
        score++;
    }

    userAnswers.push({
        question:qOptions[currentQIndex].question,
        correctAnswer:qOptions[currentQIndex].answer,
        selectedAnswer:userAnswer
    })

    currentQIndex++;
    if(currentQIndex < qOptions.length){
        displayQuestion();
    }else{
        showResult();
    }

})

const showResult =()=>{
    // alert("question has ended");
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";
    document.getElementById('timer').style.display ="none";

    const totalQuestions = qOptions.length;
    const totalQuestionAnswered = ((score / totalQuestions)*100).toFixed(2);

    resultScreen.innerHTML= `
    

      <h2>Quiz Completed!</h2>

      <h4>Your Total Score ${score} out of ${totalQuestions}</h4>
      <h5>You Scored: ${totalQuestionAnswered} %</h5>

     <div id="btnflx">
     <div>
      <button id="showAns"> Show Answer</button>
      <div id="correctionList"></div>
      </div>

     <div><button id="restartBtn">Restart</button></div>
    
     </div>
    `

// Wait for doma to update then add event listener

setTimeout(() => {

    const answerBtn = document.getElementById('showAns');
    const answerList = document.getElementById('correctionList');

    answerBtn.addEventListener('click', function(){
        answerList.innerHTML=`<h4>Reveiw Your Answer</h4>`;

        userAnswers.forEach((item,index)=>{

            const isCorrect = item.selectedAnswer === item.correctAnswer;
            answerList.innerHTML += `

             <div style="margin-bottom:10px;">
                        <p><strong>Q${index + 1}:</strong> ${item.question}</p>
                        <p style="color:${isCorrect ? 'green' : 'red'}">
                            ${isCorrect ? '✅ Correct' : `❌ Wrong (Your answer: ${item.selectedAnswer})`}
                        </p>
                        <p>Correct Answer: ${item.correctAnswer}</p>
                        <hr>
                    </div>
            
           
                    `
            
                   
                   
             

        });
        // hide button after clicking
        answerBtn.style.display = "none";


        
    });
    //wait a tiny bit for the DOM to catch up

 const restartBtn = document.getElementById('restartBtn');
             restartBtn.addEventListener('click', ()=>{
              currentQIndex = 0;
              userAnswers=[];
              clearInterval(timeInterval);
              score=0;
              timeLeft = 3600;

              resultScreen.style.display ="none";
              quizScreen.style.display ="block";

              document.getElementById('timer').style.display ="none"


              displayQuestion();
              startTimer();

             })

    
}, 1000);


}
// restartBtn()