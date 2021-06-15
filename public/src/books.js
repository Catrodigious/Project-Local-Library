// get matching id by using find
function findAuthorById(authors, id) {
  return authors.find((author)=>author.id===id) || null;
}

// get matching id by using find
function findBookById(books, id) {
  return books.find((book)=>book.id===id || null);
}

// first element of array indicates whether or not the book is checked out
// returned array (bookStatus) comprises of two arrays:
// bookStatus[0] === books checked out
// bookStatus[1] === books returned (not checked out)
function partitionBooksByBorrowedStatus(books) {
  return books.reduce((bookStatus, book)=>{
    if (!book.borrows[0].returned) 
      bookStatus[0].push(book)
    else 
      bookStatus[1].push(book);
    
    return bookStatus;
  }, [[],[]])
}

// the tests want at most 10 accounts/*
function getBorrowersForBook(book, accounts) {
  return book.borrows.reduce((borrowers, borrowed)=>{
    let borrower = accounts.find((account)=> borrowed.id === account.id);
    if (borrower && borrowers.length < 10){
      borrower.returned = borrowed.returned;
      borrowers.push(borrower);
    }
    return borrowers;
  }, [])
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
