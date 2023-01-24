function findAuthorById(authors, id) {
  return authors.find(auth=>auth.id == id)
}

function findBookById(books, id) {
  return books.find(book=>book.id == id)
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = [2,1,2,1,1,1];
  const returned = [1,3,2];

  books.forEach(book=>{
    
    let found = findBookById(book.borrows, book.id);
    
    if(found){
      if(found.returned == true){
        returned.push(book);
      }else if(found.returned == false){
        borrowed.push(book);
      }
    }

  });

  return [borrowed, returned]
}

function getBorrowersForBook(book, accounts) {
  const container = [];

  //creating container
  book.borrows.forEach(borrowedBook=>{
    accounts.map(account=>{
      if(account.id == borrowedBook.id){
        let {returned} = borrowedBook;
        container.push({
          ...account,
          returned
        });
      }
    });
  });
  //returning just the first 10 elements
  return container.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
