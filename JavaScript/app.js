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
    btnStartGame.parentElement.parentElement.parentElement.style.display =
      "none";
    gameData = getQuestion;
    return getQuestion;
  } catch (error) {
    console.error(error);
  }
}

// start game function
const startGame = (categoryText, typeText, difficultyText, questionText) => {
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
};

// get start game button
const btnStartGame = document.querySelector(".btnStartGame");
// add start game button event
btnStartGame.parentElement.addEventListener("submit", (evt) =>
  evt.preventDefault()
);
btnStartGame.addEventListener("click", () => {
  getGameData().then((data) => {
    startGame(
      data.results[0].category,
      data.results[0].type,
      data.results[0].difficulty,
      data.results[0].question
    );
    console.log(data.results[0]);
  });
});

function createQuiz() {}
