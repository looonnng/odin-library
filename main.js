// TODO : Add function to prevent/filter out duplicates
// TODO : Add Modify button??


const myLibrary = [];


function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = myLibrary.length;
}

// Book should be an object instance of Book constructor
function addBookToLibrary() {
  let titleField = document.querySelector("#title").value;
  let authorField = document.querySelector("#author").value;
  let pagesField = document.querySelector("#pages").value;
  let readStatus = document.querySelector(
    'input[name="read-status"]:checked'
  ).value;
  let newBook = new Book(titleField, authorField, pagesField, readStatus);
  myLibrary.push(newBook);
  displayBook();
  removeBook();
}

// Event: Add book when user click add book button
let cardsContainerEl = document.querySelector("#cards-container");
document.querySelector("#new-book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  event.target.reset();
});

function createCard(book) {
  const card = document.createElement("div");
  const cardModify = document.createElement("div");
  const cardContent = document.createElement("div");
  const editBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  card.setAttribute("data-book-id", book.id);
  card.className = "card col";
  cardModify.className = "card-modify row";
  cardContent.className = "card-content";
  editBtn.className = "edit-btn";
  removeBtn.className = "remove-btn";

  cardContent.innerHTML = `
    <h1 class="card__title">${book.title}</h1>
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

// Event: Loop through array and display book
function displayBook() {
  cardsContainerEl.innerHTML = ""; // Clear cardContainer DOM element to prevent duplicate
  myLibrary.forEach((book) => createCard(book));
}

function createNewID() {
  const cards = document.querySelectorAll(".card");
  myLibrary.forEach((book, index) => (book.id = index));
  cards.forEach((card, index) => card.setAttribute("data-book-id", index));
}

function removeBook() {
  const removeBtn = document.querySelectorAll(".remove-btn");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const card = event.target.closest(".card");
      let bookID = card.getAttribute("data-book-id");
      myLibrary.splice(bookID, 1); 
      card.remove();
      createNewID(); // Update the array after removing book
    });
  });
}
