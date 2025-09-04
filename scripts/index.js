const createElements = (arr) => {
  const htmlInput = arr.map((element) => {
    return `<p class="px-5 py-2 bg-blue-100">${element}</p>`;
  });
  return htmlInput.join(" ");
};

const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((lessons) => displayLessons(lessons.data));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((words) => {
      removeActive();
      const lessonBtn = document.getElementById(`lesson-btn-${id}`);
      lessonBtn.classList.add("active");
      displayLevelWords(words.data);
    });
};
//Remove Active Class From Btn
const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-button");
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
//my_modal_2.showModal();

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
            <div class="modal-content mb-5 space-y-3">
            <div>
              <h2 class="text-3xl font-semibold">
                ${word.word}
                <span
                  >(<i class="fa-solid fa-microphone-lines"></i>
                  ${word.pronunciation}</span
                >)
              </h2>
            </div>
            <div class="space-y-1">
              <p class="text-2xl font-semibold">Meaning</p>
              <p>${word.meaning}</p>
            </div>
            <div class="space-y-1">
              <p class="text-2xl font-semibold">Example</p>
              <p>${word.sentence}</p>
            </div>
            <div class="space-y-1">
              <p class="font-bangla text-2xl font-semibold">
                সমার্থক শব্দ গুলো
              </p>
              <div class="flex gap-2">
              ${createElements(word.synonyms)}
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-primary">
            Complete Learning
          </button>
  `;
  document.getElementById("wordModal").showModal();
};
//Display Data of thr Cards
const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div class="text-center col-span-full">
      <img class="mx-auto" src="./images/alert-error.png" alt="Alert Error >
        <p class="text-md text-gray-500 font-medium">
          <span class="font-bangla">এই </span>Lesson
          <span class="font-bangla">এ এখনো কোন </span>Vocabulary <span class="font-bangla">যুক্ত করা হয়নি। </span>
        </p>
        <h2 class="text-3xl font-bold mt-5">
          <span class="font-bangla">নেক্সট </span>Lesson
          <span class="font-bangla"> এ যান</span>
        </h2>
      </div>
    `;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white py-10 px-5 text-center     rounded-xl">
        <h2 class="text-3xl font-bold">${
          word.word ? word.word : "Not Found"
        }</h2>
        <p class="text-xl font-medium my-7">Meaning /Pronunciation</p>
        <h2 class="font-bangla text-3xl font-bold">"${
          word.meaning ? word.meaning : "Not Found"
        } / ${word.pronunciation ? word.pronunciation : "Not Found"}"</h2>
        <div class="mt-14 flex justify-between mx-5">
          <button
            type="button"
            title="More Info"
            onclick="loadWordDetails(${word.id})"
            class="btn outline-none bg-[#1A91FF20] hover:bg-[#1A91FF80]"
          >
            <i class="fa-solid fa-circle-info text-xl"></i>
          </button>
          <button
            type="button"
            title="Pronunciation"
            class="btn outline-none bg-[#1A91FF20] hover:bg-[#1A91FF80]"
          >
            <i class="fa-solid fa-volume-high text-xl"></i>
          </button>
        </div>
    </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};
//Lesson Button Dynamic Push
const displayLessons = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    lessonContainer.insertAdjacentHTML(
      "beforeend",
      `
        <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-button">
          <span><i class="fa-solid fa-book-open"></i></span> Lesson - ${lesson.level_no}
        </button>
        `
    );
  });
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", (e) => {
  removeActive();
  const inputValue = document
    .getElementById("input-search")
    .value.trim()
    .toLowerCase();
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(inputValue)
      );
      displayLevelWords(filterWords);
    });
});
