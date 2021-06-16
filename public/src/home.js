const books = require('../../test/fixtures/books.fixture');
const accounts = require('../../test/fixtures/accounts.fixture');
const authors = require('../../test/fixtures/authors.fixture');
const { keys } = require('../../test/fixtures/books.fixture');


// qty of books is reflective of array size
function getTotalBooksCount(books) {
  return books.length;
}

// qty of accounts reflective of array size
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// the first element of borrows is indicative of whether or not the book has been returned
function getBooksBorrowedCount(books) {
  return books.filter((book)=>!book.borrows[0].returned).length;
}

function getMostCommonGenres(books){
  const genres = [...new Set(books.map((book)=>book.genre))];
  return genres.map((genre)=>{
    return {name: genre, count: books.filter((book)=>book.genre===genre).length};
  }).sort((a, b)=>a.count < b.count ? 1 : -1).slice(0,5);
}

// each object in the array comprises of the name and the qty of times the book was borrowed
// the array is then sorted from largest to smallest and capped to 5 entries
function getMostPopularBooks(books) {
  return books.map((book)=>{
    return {name: book.title, count: book.borrows.length};
  }).sort((b1, b2)=>b1.count > b2.count ? -1 : 1).slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  return books.map((book)=>{
    const authorObj = authors.find((author)=>author.id === book.authorId)
    return {name: `${authorObj.name.first} ${authorObj.name.last}`, count: book.borrows.length}
  }).sort((r1, r2)=>r1.count > r2.count ? -1 : 1).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
