// get quiz setting element
const inputNumber = document.querySelector(".inputNumber"),
  selectorCategory = document.querySelector("#inputSelectCategory"),
  selectorDifficulty = document.querySelector("#inputSelectDifficulty"),
  selectorType = document.querySelector("#inputSelectType");

// create category selector in the quiz setting section
const createCategorySelector = async () => {
  try {
    const getCategory = await (
      await fetch("https://opentdb.com/api_category.php")
    ).json();
    getCategory.trivia_categories.forEach((element) => {
      const option = document.createElement("option");
      option.value = element.id;
      option.textContent = element.name;
      selectorCategory.append(option);
    });
  } catch (error) {
    console.error(error);
  }
};
createCategorySelector();

// get game data function
let gameData;
async function getGameData() {
  try {
    const getQuestion = await (
      await fetch(
        `https://opentdb.com/api.php?amount=${inputNumber.value}${
          selectorCategory.value && `&category=${selectorCategory.value}`
        }${
          selectorDifficulty.value && `&difficulty=${selectorDifficulty.value}`
        }${selectorType.value && `&type=${selectorType.value}`}`
      )
    ).json();
    // console.log(getQuestion);
    btnStartGame.parentElement.parentElement.parentElement.classList.add(
      "hiddenBox"
    );
    gameData = getQuestion;
    return getQuestion;
  } catch (error) {
    console.error(error);
  }
}

// start game function
const startGame = (
  categoryText,
  typeText,
  difficultyText,
  questionText,
  answers
) => {
  // get quiz box
  const quizBox = document.querySelector(".quizBox");
  // get progress bar
  const progressBar = quizBox.querySelector(".progress-bar");
  progressBar.style.width = "0%";
  // get quiz category show box
  const quizCategory = quizBox.querySelector(".category");
  quizCategory.textContent = categoryText;
  // get quiz type show box
  const quizType = quizBox.querySelector(".type");
  quizType.textContent = typeText;
  // get quiz difficulty show box
  const quizDifficulty = quizBox.querySelector(".difficulty");
  quizDifficulty.textContent = difficultyText;
  // get quiz text show box
  const quizText = quizBox.querySelector(".question");
  quizText.textContent = questionText;
  const multipleAnswer = document.querySelector(".multipleAnswer");
  const booleanAnswer = document.querySelector(".booleanAnswer");
  if (typeText === "multiple") {
    let currentIndex = answers.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [answers[currentIndex], answers[randomIndex]] = [
        answers[randomIndex],
        answers[currentIndex],
      ];
    }
    answers.forEach((item, index) => {
      multipleAnswer.querySelector(`.answerChek${++index}`).textContent = item;
    });
    multipleAnswer.classList.remove("hiddenBox");
  } else {
    let currentIndex = answers.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [answers[currentIndex], answers[randomIndex]] = [
        answers[randomIndex],
        answers[currentIndex],
      ];
    }
    console.log(answers);
    answers.forEach((item, index) => {
      booleanAnswer.querySelector(`.answerChek${++index}`).textContent = item;
    });
    booleanAnswer.classList.remove("hiddenBox");
  }
};

// get start game button
const btnStartGame = document.querySelector(".btnStartGame");
// add start game button event
btnStartGame.parentElement.addEventListener("submit", (evt) =>
  evt.preventDefault()
);
btnStartGame.addEventListener("click", () => {
  getGameData().then((data) => {
    const {
      category,
      type,
      difficulty,
      question,
      incorrect_answers,
      correct_answer,
    } = data.results[0];
    const answers = [...incorrect_answers];
    answers.push(correct_answer);
    console.log(answers);
    startGame(category, type, difficulty, question, answers);
    console.log(data.results[0]);
  });
});

let count = 0;
function createQuiz(answer) {
  const {
    category,
    type,
    difficulty,
    question,
    incorrect_answers,
    correct_answer,
  } = gameData.results[count];
  
}
