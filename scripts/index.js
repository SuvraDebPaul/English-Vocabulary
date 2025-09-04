const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((lessons) => displayLessons(lessons.data));
};

const loadLevelWord = (id) => {
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
  console.log(lessonBtn);
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
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
    return;
  }
  words.forEach((word) => {
    console.log(word);
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
