let currentPage = 1;
let imgsUrl = "https://dog.ceo/api/breeds/image/random/4?page=" + currentPage;
let breedUrl = "https://dog.ceo/api/breeds/list/all";

function fetchImages() {
  let loader = document.getElementById("loading");
  fetch(imgsUrl)
    .then((response) => response.json())
    .then((data) => {
      let imageContainer = document.getElementById("dog-image-container");
      imageContainer.innerHTML = "";
      data.message.forEach((imageUrl) => {
        let img = document.createElement("img");
        img.src = imageUrl;
        img.className = "images";
        imageContainer.appendChild(img);
      });

      loader.style.display = "none";
    });
}

let nextButton = document.getElementById("next-btn");
nextButton.addEventListener("click", () => {
  currentPage += 1;
  imgsUrl = "https://dog.ceo/api/breeds/image/random/4?page=" + currentPage;
  fetchImages();
});

let prevButton = document.getElementById("Prev-btn");
prevButton.addEventListener("click", () => {
  currentPage -= 1;
  imgsUrl = "https://dog.ceo/api/breeds/image/random/4?page=" + currentPage;
  fetchImages();
});

function fetchBreed() {
  fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
      const breedList = Object.keys(data.message);
      renderBreeds(breedList);
    });
}

function renderBreeds(breeds) {
  const ul = document.getElementById("dog-breeds");
  breeds.forEach((breed) => {
    const li = document.createElement("li");
    li.textContent = breed;
    ul.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchImages();
  fetchBreed();
});

document.addEventListener("DOMContentLoaded", () => {
  const ul = document.getElementById("dog-breeds");

  ul.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      event.target.style.color = getRandomColor();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("breed-dropdown");

  select.addEventListener("change", () => {
    const selectedLetter = select.value;
    filterBreeds(selectedLetter);
  });
});

function filterBreeds(letter) {
  const breeds = document.querySelectorAll("#dog-breeds li");

  breeds.forEach((breed) => {
    const firstLetter = breed.textContent[0];
    breed.style.display = firstLetter === letter ? "list-item" : "none";
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
