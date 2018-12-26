(function QuestionGame() {
    // Define available questions:

    var questions = [
        new Question(
            "What is the most popular programming language?",
            ["Python", "JavaScript", "Java"],
            1
        ),
        new Question(
            "Which is a popular JS library?",
            ["Flash", "Django", "Spring", "React"],
            3
        ),
        new Question("What is the current version of Angular?", [5, 6, 7, 8], 2)
    ];

    var currentQuestion = questions[Math.floor(Math.random() * 3)];

    askQuestion(currentQuestion);

    // Function Declarations:

    function Question(question, possibleAnswers, correctAnswer) {
        this.question = question;
        this.possibleAnswers = possibleAnswers;
        this.correctAnswer = correctAnswer;
    }

    function askQuestion(question) {
        console.log(question.question);
        console.log("Possible Answers:");
        for (var i = 0; i < question.possibleAnswers.length; i++) {
            console.log(i + ": " + question.possibleAnswers[i]);
        }
        var givenAnswer = prompt("Enter your answer:");

        if (parseInt(givenAnswer) === question.correctAnswer) {
            console.log("That is correct!");
        } else {
            console.log("Nope, that is incorrect");
        }
    }
})();
