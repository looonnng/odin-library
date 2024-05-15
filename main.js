// TODO : Add function to prevent/filter out duplicates
// TODO : Add Remove button
// TODO : Add Modify button??
// TODO : Remove book from myLibrary after user click remove button2

const myLibrary = [];

// DOM
let cardsContainerEl = document.querySelector("#cards-container");
const addBookBtn = document.querySelector("#addBook");

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// book should be an object instance of Book constructor
function addBookToLibrary() {
  let titleField = document.querySelector("#title").value;
  let authorField = document.querySelector("#author").value;
  let pagesField = document.querySelector("#pages").value;
  let readStatus = document.querySelector('input[name="read-status"]:checked').value;
  let newBook = new Book(titleField, authorField, pagesField, readStatus);
  myLibrary.push(newBook);
  displayBook();
}

// TODO: Simplify card.innerHTML
function createCard(book) {
  const card = document.createElement("div");
  const cardModify = document.createElement("div");
  const cardContent = document.createElement("div");
  const editBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  card.setAttribute("data-book-id", myLibrary.length - 1);
  card.className = "card col";
  cardModify.className = "card-modify row";
  cardContent.className = "card-content";
  editBtn.className = "edit-btn";
  removeBtn.className = "remove-btn";

  cardContent.innerHTML = `
    <h2 class="card__title">${book.title}</h2>
    <p class="card__author">${book.author}</p>
    <p class="card__pages">${book.pages}</p>
    <p class="card__read-status">${book.readStatus}</p>
  `;
  editBtn.innerHTML = '<span class="material-symbols-outlined">edit</span>';
  removeBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';

  cardModify.appendChild(editBtn);
  cardModify.appendChild(removeBtn);
  card.appendChild(cardModify);
  card.appendChild(cardContent);
  cardsContainerEl.appendChild(card);
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

// Event: Add book when user click add book button
document.querySelector("#new-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

// Event: Display book
function displayBook() {
  cardsContainerEl.innerHTML = ""; // Clear cardContainer DOM element to prevent duplicate
  myLibrary.forEach((book) => createCard(book));
}