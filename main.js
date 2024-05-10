// TODO : Add function to prevent/filter out duplicates
// TODO : Add Remove button
// TODO : Add Modify button??
// TODO : Remove book from myLibrary after user click remove button2

let myLibrary = [];

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
  book.id = `${myLibrary.length - 1}`;
  addCard(book);
}

// TODO: Simplify card.innerHTML
function addCard(book) {
  const card = document.createElement("div");
  const cardModify = document.createElement("div");
  const cardContent = document.createElement("div");
  const editButton = document.createElement("button");
  const removeButton = document.createElement("button");

  card.id = `myBook-${myLibrary.length - 1}`;
  card.className = "card col";
  card.setAttribute("data-book-id", myLibrary.length - 1);

  cardModify.className = "card-modify row";

  cardContent.className = "card-content";
  cardContent.innerHTML = `
  <div class="card-content">
    <h2 class="card__title">${book.title}</h2>
    <p class="card__author">${book.author}</p>
    <p class="card__pages">${book.pages}</p>
    <p class="card__read-status">${book.readStatus}</p>
  </div>
  `;

  editButton.className = "edit-btn";
  editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>';

  removeButton.className = "remove-btn";
  removeButton.innerHTML =
    '<span class="material-symbols-outlined">close</span>';

  cardModify.appendChild(editButton);
  cardModify.appendChild(removeButton);

  card.appendChild(cardModify);
  card.appendChild(cardContent);

  cardsContainer.appendChild(card);
}

// TODO Finish Remove Button
function removeBook() {
  const removeBtn = document.querySelectorAll(".remove-btn");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      const bookID = card.getAttribute("data-book-id");
      console.log(bookID);
      myLibrary.splice(bookID, 1); //Need to update the array after removing book
      console.log(myLibrary);
      card.remove();
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

function displayBook() {}
