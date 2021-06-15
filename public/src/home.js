// helper function
function sliceFiveCases(obj){
  return obj.slice(0,5);
}

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

// create genre object with genre name as key and qty times referenced as value
// reformat and sort data into object array to reflect requested format 
function getMostCommonGenres(books) {
  const commmonGenres = [];
  
  const genres = books.reduce((genres, book)=>{
    Object.keys(genres).includes(book.genre) ? genres[book.genre]++ : genres[book.genre] = 1;
    return genres;
  }, {});
  
  for (const genre in genres){
    if (commmonGenres.length < 5)
      commmonGenres.push({name: genre, count: genres[genre]});
  }
  return commmonGenres.sort((g1, g2) => g2.count - g1.count);
}

// each object in the array comprises of the name and the qty of times the book was borrowed
// the array is then sorted from largest to smallest and capped to 5 entries
function getMostPopularBooks(books) {
  let booksByCheckout = books.reduce((booksByBorrowed, book)=>{
    booksByBorrowed.push({name: book.title, count: book.borrows.length})
    return booksByBorrowed;
  }, []);

  booksByCheckout.sort((b1, b2)=>b1.count > b2.count ? -1 : 1);
  return sliceFiveCases(booksByCheckout);
}

// populate booksByAuthor with the author's full name for key and an empty count property
// get count of books written by author by checking for matching ids
// set count of books written by author
// populate a new array with objects with properties 'name' and 'count' to reflect requested format
// sort array items by count (largest to smallest) and return the array with no more than 5 array elements
function getMostPopularAuthors(books, authors) {
  const authorsToCheck = authors.reduce((booksByAuthor, author)=>{
    // example of object destructuring
    const firstName = author.name.first;
    const lastName = author.name.last;
    let fullname = `${firstName} ${lastName}`;

    if (!booksByAuthor[fullname]) booksByAuthor[fullname]={count: 0};

    let count = books.reduce((count, book)=>{
      if (book.authorId === author.id){
        count += book.borrows.length;
      }
      return count;
    }, 0)

    booksByAuthor[fullname].count += count;
    return booksByAuthor;
  }, {})
 
    let authorLog = [];
    for (const author in authorsToCheck){
      // both an example of spread and object shorthand
      authorLog.push({name: author, ...authorsToCheck[author]}); 
    }
   
    authorLog.sort((a1, a2)=>{
return a1.count > a2.count ? -1: 1
    })

    return sliceFiveCases(authorLog);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
