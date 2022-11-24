import  BookService  from './services/BookService';
const bookService = new BookService();

import {format} from 'timeago.js';

 export default class UI {
  
  async renderBooks() { 
    const books = await bookService.getBooks();
    const booksCardContainer = document.getElementById('books-cards');
    booksCardContainer.innerHTML = '';
    books.forEach ((book) => {
      const div = document.createElement("div");
      div.className = '';
      div.innerHTML = `
            <div class= "card m-2">
        <div class="row">
          <div class="col-md-4">
            <img src=${book.imagepath}" class="img-fluid"/>
            </div>
            <div class="col-md-8">
            <div class="card-blok px-2">
            <h3 class="card-title">TITULO</h3>
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">${book.author}</p>
              <p class="card-text">${book.isbn}</p>
              <a href="#" class="btn btn-danger delete" ._id="${book._id}">x</a>
              </div>
            </div>
          </div>
          <div class="card-footer">
            ${format (book.created_at)}
            </div>
          </div>
       `;
       booksCardContainer.appendChild(div);
     });
  }
  
  async addANewBook(book) {
    await bookService.postBook(book);
    this.clearBookForm();
    this.renderBooks();
  }

  clearBookForm() {
    document.getElementById('book-form').reset();

  }

  renderMessage(message, colorMessage, secondsToremove) { 
    const div = document.createElement('div');
    div.className = `alert alert-${colorMessage} message`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.col-md-4');
    const BookForm = document.querySelector('#book-form');

    container.insertBefore(div, BookForm);
    setTimeout(() => {
        document.querySelector('.message').remove();
    }, secondsToremove);
    
  }

 async deleteBook(bookId) { 
  await bookService.deleteBook(bookId);
  this.renderBooks();
 }

}
