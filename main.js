// TODO : Add function to prevent/filter out duplicates
// TODO : Add restrection/requirement for the user inputs, ie: prevent user from submitting empty fields

const myLibrary = [];

// DOM
const addBookBtn = document.querySelector("#addBook");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");

addBookBtn.addEventListener("click", () => {
  const readStatus = document.querySelector(
    'input[name="read-status"]:checked'
  );
  let book = new Book(
    titleField.value,
    authorField.value,
    pagesField.value,
    readStatus.value
  );

  addBookToLibrary(book);

  document.querySelector("form").reset();
});

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

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

// book should be an object instance of Book constructor
function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log("book added");
}
