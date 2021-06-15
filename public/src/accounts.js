const books = require('../../test/fixtures/books.fixture');
const accounts = require('../../test/fixtures/accounts.fixture');
const authors = require('../../test/fixtures/authors.fixture');

function findAccountById(accounts, id) {
  return Object.values(accounts).find((account) => account.id === id);
}


function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2)=> acc1.name.last.toLowerCase() < acc2.name.last.toLowerCase() ? -1 : 1);
}


function getTotalNumberOfBorrows(account, books) {  
  return books.reduce((total, book)=> total += book.borrows.filter((book)=> book.id === account.id).length, 0);
}


// return an array of books and authors that represent all books currently checked out by the given account
// alter the borrowed object to contain the author property
function getBooksPossessedByAccount(account, books, authors) {
  return books.reduce((borrowed, book)=>{
    // check if book has been checked out
    const borrowedBook = book.borrows.some((book)=> book.id === account.id && book.returned === false);
    
    if (borrowedBook) borrowed.push(book);
    if (borrowed){
      return borrowed.map((bookObj)=>{
        bookObj.author = authors.find((author)=>author.id === bookObj.authorId);
        return bookObj;
      })
    }
  },[])
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
