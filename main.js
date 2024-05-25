// TODO : Add function to prevent/filter out duplicates
// TODO: Fix bug to prevent user from creating multiple options by clicking edit button multiple times
// TODO: Fix if user click on edit button and try to add a new book - the form will reset
// Multiple cards edit -- each book need unique options

const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// Book should be an object instance of Book constructor
function addBookToLibrary() {
  let titleField = document.querySelector('#title').value;
  let authorField = document.querySelector('#author').value;
  let pagesField = document.querySelector('#pages').value;
  let readStatus = document.querySelector(
    'input[name="read-status"]:checked'
  ).value;

  if (
    myLibrary.some(
      book =>
        book.title === titleField &&
        book.author === authorField &&
        book.pages === pagesField
    )
  ) {
    alert('This Book has already been added!');
  } else {
    let newBook = new Book(titleField, authorField, pagesField, readStatus);
    myLibrary.push(newBook);
    displayBook();
    removeBook();
    editBook();
  }
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
  card.setAttribute('data-book-id', myLibrary.length - 1);
  card.className = 'card col';
  cardModify.className = 'card-modify row';
  cardContent.className = 'card-content';
  editBtn.className = 'edit-btn';
  removeBtn.className = 'remove-btn';
  cardContent.innerHTML = `
    <h1 class="card__title">${book.title}</h1>
    <p class="card__author">${book.author}</p>
    <p class="card__pages">${book.pages}</p>
    <p class="card__read-status--${book.readStatus
      .toLowerCase()
      .replace(' ', '-')}">${book.readStatus}</p>
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
      const options = document.createElement('div');
      const cardConfirmChanges = document.createElement('div');
      const saveBtn = document.createElement('button');
      const cancelBtn = document.createElement('button');

      options.className = 'edit-controls radios';
      cardConfirmChanges.className = 'card-confirm-changes row';
      saveBtn.className = 'save-btn';
      cancelBtn.className = 'cancel-btn';

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
      saveBtn.innerHTML = 'Save';
      cancelBtn.innerHTML = 'Cancel';

      cardConfirmChanges.appendChild(saveBtn);
      cardConfirmChanges.appendChild(cancelBtn);
      event.target.closest('.card').appendChild(cardConfirmChanges);
      cardContent.children[3].hidden = true; // Hide read status element
      cardContent.appendChild(options);
      event.target.closest('.edit-btn').hidden = true; // Hide edit button
      saveEditOptions();
    });
  });
}

function saveEditOptions() {
  const saveBtns = document.querySelectorAll('.save-btn');
  const cancelBtns = document.querySelectorAll('.cancel-btn');
  saveBtns.forEach(saveBtn => {
    saveBtn.addEventListener('click', e => {
      try {
        let readStatusEdit = document.querySelector(
          'input[name="read-status-edit"]:checked'
        ).value;
        const card = e.target.closest('.card');
        const cardModify = card.firstElementChild;
        const cardContent = card.children[1];
        cardModify.firstElementChild.hidden = false;
        let bookID = card.getAttribute('data-book-id');
        myLibrary[bookID]['readStatus'] = readStatusEdit;
        cardContent.children[3].innerHTML = `
        <p class="card__read-status--${readStatusEdit
          .toLowerCase()
          .replace(' ', '-')}">${readStatusEdit}</p>
        `;
        cardContent.children[3].hidden = false;
        cardContent.children[4].remove();
        e.target.parentElement.remove();
      } catch (err) {
        console.log(err);
        // alert((err = 'Please Select an Option'));
      }
    });
  });
  cancelBtns.forEach(cancelBtn => {
    cancelBtn.addEventListener('click', e => {
      const card = e.target.closest('.card');
      const cardModify = card.firstElementChild;
      const cardContent = card.children[1];
      cardModify.firstElementChild.hidden = false;
      cardContent.children[3].hidden = false;
      cardContent.children[4].remove(); // Remove because options will be created in editBook()
      e.target.parentElement.remove(); // Remove Save and Cancel buttons
    });
  });
}

/* 

If user click to edit a card and 
click a new edit on a diffrent card
the original card will be null

*/
