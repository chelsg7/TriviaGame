var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

var timerClear = 00 + ":" + 00;




var start = function(duration, display) {
    var start = Date.now(),
    diff,
    minutes,
    seconds;
    var timer = function () {
        diff = duration - (
            ((Date.now() - start) / 1000) | 0);
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

var questions = [
	{
		question: 'In the "Harry Potter" book series, He Who Must Not Be Named" is also known as??',
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
		question: "Mary, Queen of Scots, claimed to be the heir to the crown of what four nations?",
		answers: {
			a: 'Scotland, Wales, England and Ireland',
			b: 'Scotland, France, Wales and Ireland',
            c: 'Scotland, France, England and Ireland',
            d: 'Scotland, England, Belgium and Germany'
		},
		correctAnswer: 'c'
},
{
		question: "What famous artwork is NOT in the Louvre museum?",
		answers: {
			a: 'Victory of Samothrace',
			b: 'Waterlillies',
            c: 'Venus de Milo',
            d: 'Mona Lisa'
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
		question: "In nautical terms, port is what direction?",
		answers: {
			a: 'right',
			b: 'reverse',
            c: 'forward',
            d: 'left'
		},
		correctAnswer: 'd'
},
{
		question: "In the state of Texas, it's illegal to do what?",
		answers: {
			a: "Swear in front of a corpse",
			b: "Milk another man's goat",
            c: 'Use a mousetrap without a hunting permit',
            d: 'Teach other people what polygamy is'
        },
        correctAnswer: 'a'
    },
];

var showResults = function (questions, quizContainer, resultsContainer){
        
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
    
    // for each question...
    for(var i=0; i<questions.length; i++){

        // find selected answer
        userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
        
        // if answer is correct
        if(userAnswer===questions[i].correctAnswer){
            // add to the number of correct answers
            numCorrect++;
            
            // color the answers green
            answerContainers[i].style.color = 'green';
        }
        // if answer is wrong or blank
        else{
            // color the answers red
            answerContainers[i].style.color = 'red';
        }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' / ' + questions.length;
};

var  generateQuiz = function(questions, quizContainer, resultsContainer, submitButton){
    
    var showQuestions = function (questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + "  "  + letter + ' : '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question card mt-5 mb-2 mx-auto text-center col-12">' + "   " + questions[i].question + '</div>'
                + '<div class="answers card px-5">' +  answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    };
    

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}


$( document ).ready(function() {
    console.log( "ready!" );
    
    
    $('#start').on("click", function() {
        console.log("start timer!")
        var twoMinutes = 60 * 2;
        
        display = document.querySelector('#timer');
        start(twoMinutes, display);
        generateQuiz(questions, quizContainer, resultsContainer, submitButton);
        setInterval(
            function(){
                alert("Time is up!");
                showResults(questions, quizContainer, resultsContainer);
            }, 120000);
            clearInterval();
            $('#timer').html(timerClear);
    }
);


});
