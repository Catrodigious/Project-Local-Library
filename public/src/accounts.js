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
// embed the author object
function getBooksPossessedByAccount(account, books, authors){
  return books.reduce((acc, book)=>{
    let checkedOut = book.borrows.some((borrower)=> borrower.id === account.id && !borrower.returned);
    if (checkedOut){
      let author = authors.find((auth)=>auth.id === book.authorId);
      acc.push({...book, author});
    }
    return acc;
  }, [])
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
