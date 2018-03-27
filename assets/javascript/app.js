var timerClear = 00 + ":" + 00;
//+++++++++++++ time needs to be global because you need to clear it in multiple functions
var time;
var questionBank = [
    {
        question: 'In the "Harry Potter" book series, He Who Must Not Be Named" is also known as?',
        answers: {
            a: 'Severus Snape',
            b: 'Draco Malfoy',
            c: 'Lord Voldemort',
            d: 'Gellert Grindelwald',
        },
        correctAnswer: 'c'
    },
    {
        question: "Which of the following is NOT an example of a pangram (also known as a holoalphabetic sentence)?",
        answers: {
            a: 'Pack my box with five dozen liquor jugs',
            b: 'Jackdaws love my big sphinx of quartz',
            c: 'The five boxing wizards jump quickly',
            d: 'The onyx goblin lunged over the dreary frog'
        },
        correctAnswer: 'd'
    },
    {
        question: "The oldest known written recipe is for what?",
        answers: {
            a: 'Beer',
            b: 'Wine',
            c: 'Cheese',
            d: 'Bread'
        },
        correctAnswer: 'a'
},
{
        question: "Which of the following is NOT a California Law?",
        answers: {
            a: 'It is a misdemeanor to shoot at any kind of game from a moving vehicle, unless the target is a whale.',
            b: 'It’s unlawful to let a dog pursue a bear or bobcat at any time.',
            c: 'The harassing of Bigfoot, Sasquatch or other undiscovered subspecies is a felony punishable by a fine and/or imprisonment.',
            d: 'Animals are banned from mating publicly within 1,500 feet of a tavern, school, or place of worship.'
        },
        correctAnswer: 'c'
},
{
        question: "What famous artwork is NOT in the Louvre museum in Paris?",
        answers: {
            a: 'Victory of Samothrace by Unknown',
            b: 'Waterlillies by Claude Monet',
            c: 'Venus de Milo by Alexandros of Antioch',
            d: 'Mona Lisa by Leonardo da Vinci'
        },
        correctAnswer: 'b'
},
{
        question: "Which sea creature has three hearts?",
        answers: {
            a: 'Blue Whale',
            b: 'Common Octopus',
            c: 'Bottlenose Dolphin',
            d: 'Great White Shark'
        },
        correctAnswer: 'b'
},
{
        question: "The Louvre in Paris is the largest museum in the world. It contains so much art, that if you spent 24 hours a day inside and looked at each piece for only 30 seconds, it would still take you at least how many days to finish a full tour?",
        answers: {
            a: '90',
            b: '200',
            c: '60',
            d: '100'
        },
        correctAnswer: 'd'
},
{
        question: "In the state of Texas, it's illegal to do what?",
        answers: {
            a: "It is illegal for one to shoot a buffalo from the second story of a hotel.",
            b: "It is illegal to milk another person’s goat.",
            c: 'It is a felony to steal more than $1000 of grease',
            d: 'A man may not seduce a woman by lying, and claiming he will marry her.'
        },
        correctAnswer: 'a'
    },
];
var start = function (duration, display) {
        var timer = duration, minutes, seconds;
        
        //------------ time needs to be global because you need to clear it in a later funtion
        time = setInterval(function () {
            //this is a decrement function now
            timer--;
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.text(minutes + ":" + seconds);
    
            //clear interval when timer === 0
            if (timer === 0) {
            //---------------
                timer = duration;
                //clear time when timer === 0
                clearInterval(time);
            }
        }, 1000);
    };
    var format =   function (minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;display.textContent = minutes + ':' + seconds;
    };
    var quizBox = document.getElementById('quiz');
    var resultBox = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    var answerContainers = quizBox.querySelectorAll('.answers');
    var userAnswer = '';
    var numCorrect = 0;
    var output = [];
    var answers;
    
    var showResults = function(questions, quizBox, resultBox){
        var answerContainers = quizBox.querySelectorAll('.answers');
        var userAnswer = '';
        var numCorrect = 0;
        for(var i=0; i<questions.length; i++){
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;
                answerContainers[i].style.color = 'green';
            }else{
                answerContainers[i].style.color = 'red';
            }
        }
        resultBox.innerHTML = numCorrect + ' / ' + questions.length;
    };
    
    var generateQuiz = function (questions, quizBox, resultBox, submitButton){
        function showQuestions(questions, quizBox){
            var output = [];
            var answers;
            for(var i=0; i<questions.length; i++){
                answers = [];
                for(letter in questions[i].answers){
                    answers.push(
                        '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">' + " " + letter + ' : ' + questions[i].answers[letter] 
                        + '</label>'
                    );
                }
                output.push(
                    '<div class="question card card-head bg-warning py-2 mt-5 text-center">' + questions[i].question + '</div>'
                    + '<div class="answers card card-body border-warning">' + answers.join('') + '</div>'
                );
            }
            quizBox.innerHTML = output.join('');
        };
        
        showQuestions(questionBank, quizBox);
    };
$( document ).ready(function() {
    console.log( "ready!" );
});
$('#start').on("click", function() {
    console.log("start timer!")
    var two = 60 * 2,
    display = $('#timer');
    start(two, display);
    generateQuiz(questionBank, quizBox, resultBox, submitButton);
    
    setInterval(
        function(){
            alert("Time is up!");
            showResults(questionBank, quizBox, resultBox);
    }, 120000);
}
);
$('#submit').on("click", function(){
    console.log('submitted');
    //clear the time interval NOT timer
    clearInterval(time);
    showResults(questionBank, quizBox, resultBox);
    $('#timer').html = timerClear;
    });