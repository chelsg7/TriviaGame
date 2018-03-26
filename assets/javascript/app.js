var timerClear = 00 + ":" + 00;
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

var timer = "";

var start = function(duration, display) {
    var start = Date.now(),
    diff,
    minutes,
    seconds;
    var timer = function () {
        diff = duration - (((Date.now() - start) / 1000) | 0);

            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;
            
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            display.textContent = minutes + ":" + seconds; 
            
            if (diff <= 0) {
                start = Date.now() + 1000;
            }
        };
        timer();
        setInterval(timer, 1000);
    };

    var reset = function(){
        clearInterval();
        clearTimeout()
        document.getElementById('#timer').html = timerClear;
    };

    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    var answerContainers = quizContainer.querySelectorAll('.answers');
    var userAnswer = '';
    var numCorrect = 0;
    var output = [];
    var answers;

    
    var showResults = function(questions, quizContainer, resultsContainer){
        var answerContainers = quizContainer.querySelectorAll('.answers');
        var userAnswer = '';
        var numCorrect = 0;

        for(var i=0; i<questions.length; i++){
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;
                answerContainers[i].style.color = 'darkgreen';
            }else{
                answerContainers[i].style.color = 'red';
            }
        }
        resultsContainer.innerHTML = numCorrect + ' / ' + questions.length;
    };
    
    var generateQuiz = function (questions, quizContainer, resultsContainer, submitButton){
        function showQuestions(questions, quizContainer){
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
            quizContainer.innerHTML = output.join('');
        };
        
        showQuestions(questionBank, quizContainer);
    };


$( document ).ready(function() {
    console.log( "ready!" );
});


$('#start').on("click", function() {
    console.log("start timer!")
    var twoMinutes = 60 * 2;
    
    display = document.querySelector('#timer');
    start(twoMinutes, display);
    generateQuiz(questionBank, quizContainer, resultsContainer, submitButton);
    
    setInterval(
        function(){
            alert("Time is up!");
            showResults(questionBank, quizContainer, resultsContainer);
            reset();
    }, 120000);
    clearInterval();
}
);

$('#submit').on("click", function(){
        showResults(questionBank, quizContainer, resultsContainer);
        reset();
        clearInterval();
        clearTimeout();
});
