const inputNumber = document.querySelector(".inputNumber"),
  selectorCategory = document.querySelector("#inputSelectCategory"),
  selectorDifficulty = document.querySelector("#inputSelectDifficulty"),
  selectorType = document.querySelector("#inputSelectType");

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

const btnStartGame = document.querySelector(".btnStartGame");
btnStartGame.parentElement.addEventListener("submit", (evt) =>
  evt.preventDefault()
);
btnStartGame.addEventListener("click", async () => {
  const getQuestion = await (
    await fetch(
      `https://opentdb.com/api.php?amount=${inputNumber.value}${
        selectorCategory.value && `&category=${selectorCategory.value}`
      }${
        selectorDifficulty.value && `&difficulty=${selectorDifficulty.value}`
      }${selectorType.value && `&type=${selectorType.value}`}`
    )
  ).json();
  console.log(getQuestion);
});
