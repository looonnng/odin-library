// TODO : Add function to prevent/filter out duplicates
// TODO : Prevent user from submitting read status only <-- user could submit form with only yes or no input

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
  this.readStatus = readStatus; //readStatus should only accepts user input of yes or no via checkbox

  this.hasRead = function () {
    return this.readStatus ? "has read" : "not read yet";
  };

  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${this.hasRead()}`;
  };
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

// myLibrary.push(theGreatGatsby);
// myLibrary.push(donQuixote);
// myLibrary.push(toKillAMockingbird);

function addCard(book) {
  const div = document.createElement("div");

  div.className = "card";

  div.innerHTML = `
    <h2 class="card__title">${book.title}</h2>
    <p class="card__author">${book.author}</p>
    <p class="card__pages">${book.pages}</p>
    <p class="card__read-status">${book.readStatus}</p>
  `;

  document.querySelector("#cards-container").appendChild(div);
}

addBookBtn.addEventListener("click", (e) => {
  const readStatus = document.querySelector(
    'input[name="read-status"]:checked'
  );

  let newBook = new Book(
    titleField.value,
    authorField.value,
    pagesField.value,
    readStatus.value
  );

  addBookToLibrary(newBook);

  document.querySelector("form").reset(); // Reset all fields after button is clicked

  e.preventDefault();
});
