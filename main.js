// TODO : Add function to prevent/filter out duplicates
// TODO : Add Remove button
// TODO : Add Modify button??
// TODO : Remove book from myLibrary after user click remove button2

const myLibrary = [];

// DOM
const addBookBtn = document.querySelector("#addBook");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");
const cardsContainer = document.querySelector("#cards-container");

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// book should be an object instance of Book constructor
function addBookToLibrary(book) {
  myLibrary.push(book);
  addCard(book);
}

let theGreatGatsby = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  137,
  "no"
);
let donQuixote = new Book("Don Quixote", "Miguel de Cervantes", 1072, "no");
let toKillAMockingbird = new Book(
  "To Kill a Mockingbird",
  "Harper Lee",
  281,
  "yes"
);

myLibrary.push(theGreatGatsby);
myLibrary.push(donQuixote);
myLibrary.push(toKillAMockingbird);

// TODO: Simplify card.innerHTML
function addCard(book) {
  const card = document.createElement("div");
  // const cardModify = document.createElement('div');
  // const cardContent = document.createElement("div");
  card.id = `myBook-${myLibrary.length}`;
  card.setAttribute("data-book-id", myLibrary.length);
  card.className = "card col";
  // cardModify.className = 'card-modify';
  // cardContent.className = "card-content";

  card.innerHTML = `
  <div class="card-modify row">
    <button type="button" class="edit-btn"><span class="material-symbols-outlined">
      edit
      </span></button>
    <button type="button" class="remove-btn"><span class="material-symbols-outlined">
      close
      </span></button>
  </div>
  <div class="card-content">
    <h2 class="card__title">${book.title}</h2>
    <p class="card__author">${book.author}</p>
    <p class="card__pages">${book.pages}</p>
    <p class="card__read-status">${book.readStatus}</p>
  </div>
  `;
  cardsContainer.appendChild(card);
}

// TODO Finish Remove Button
function removeBook() {
  const removeBtn = document.querySelectorAll(".remove-btn");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".card").remove(); //This target the .card
    });
  });
}

addBookBtn.addEventListener("click", (e) => {
  const readStatus = document.querySelector(
    'input[name="read-status"]:checked'
  );
  if (
    titleField.value &&
    authorField.value &&
    pagesField.value &&
    readStatus.value
  ) {
    let newBook = new Book(
      titleField.value,
      authorField.value,
      pagesField.value,
      readStatus.value
    );
    addBookToLibrary(newBook);
    document.querySelector("form").reset(); // Reset all fields after button is clicked
    removeBook();
    e.preventDefault();
  }
});
