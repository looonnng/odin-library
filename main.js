// TODO : Add function to prevent/filter out duplicates
// TODO : Add Modify button??
// Cannot edit simultaneously -- Opt for modals or popup edit instead?

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
  let titleField = document.querySelector('#title').value;
  let authorField = document.querySelector('#author').value;
  let pagesField = document.querySelector('#pages').value;
  let readStatus = document.querySelector('input[name="read-status"]:checked');
  let newBook = new Book(titleField, authorField, pagesField, readStatus);
  myLibrary.push(newBook);
  displayBook();
  removeBook();
  editBook();
}

// Event: Add book when user click add book button
let cardsContainerEl = document.querySelector('#cards-container');
document.querySelector('#new-book-form').addEventListener('submit', event => {
  event.preventDefault();
  addBookToLibrary();
  event.target.reset();
});

function createCard(book) {
  const card = document.createElement('div');
  const cardModify = document.createElement('div');
  const cardContent = document.createElement('div');
  const editBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  card.setAttribute('data-book-id', book.id);
  card.className = 'card col';
  cardModify.className = 'card-modify row';
  cardContent.className = 'card-content';
  editBtn.className = 'edit-btn';
  removeBtn.className = 'remove-btn';
  cardContent.innerHTML = `
    <h1 class="card__title">${book.title}</h1>
    <p class="card__author">${book.author}</p>
    <p class="card__pages">${book.pages}</p>
    <p class="card__read-status--${book.readStatus.id}">${book.readStatus.value}</p>
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
  cardsContainerEl.innerHTML = ''; // Clear cardContainer DOM element to prevent duplicate
  myLibrary.forEach(book => createCard(book));
}

function createNewID() {
  const cards = document.querySelectorAll('.card');
  myLibrary.forEach((book, index) => (book.id = index));
  cards.forEach((card, index) => card.setAttribute('data-book-id', index));
}

function removeBook() {
  const removeBtns = document.querySelectorAll('.remove-btn');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', event => {
      const card = event.target.closest('.card');
      let bookID = card.getAttribute('data-book-id');
      myLibrary.splice(bookID, 1);
      card.remove();
      createNewID(); // Update the array after removing book
    });
  });
}

function editBook() {
  const editBtns = document.querySelectorAll('.edit-btn');
  editBtns.forEach(btn => {
    btn.addEventListener('click', event => {
      const cardContent = event.target.closest('.card').lastChild;
      console.log(cardContent);
      const options = document.createElement('div');
      options.className = 'controls-wrapper';
      options.innerHTML = `
      <label class="fieldset__label" for="not-started-edit"
        ><input
          class="fieldset__input"
          type="radio"
          name="read-status-edit"
          id="not-started-edit"
          value="Not Started"
          required
        />Not Started</label
      >
      <label class="fieldset__label" for="in-progress-edit"
        ><input
          class="fieldset__input"
          type="radio"
          name="read-status-edit"
          id="in-progress-edit"
          value="In Progress"
        />In Progress</label
      >
      <label class="fieldset__label" for="finished-edit"
        ><input
          class="fieldset__input"
          type="radio"
          name="read-status-edit"
          id="finished-edit"
          value="Finished"
        />Finished</label
      >
      `;

      cardContent.removeChild(cardContent.lastElementChild);
      cardContent.appendChild(options);
    });
  });
}
