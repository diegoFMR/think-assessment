function findAccountById(accounts, id) {
  return accounts.find(acc=>acc.id == id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a,b)=>{
    if(a.name.last>b.name.last){
      return 1;
    }else if(a.name.last<b.name.last){
      return -1;
    }

    return 0;
  })
}

function getTotalNumberOfBorrows(account, books) {
  let counter = 0;
  let {id} = account;

  return books.reduce((acumulator,book)=>{
    book.borrows.forEach(borrowed=>{
      if(borrowed.id == id) acumulator+=1;
    });
    return acumulator;
  }, counter);
}

function getBooksPossessedByAccount(account, books, authors) {
  // It returns an array of book objects, including author information,
  //  that represents all books _currently checked out_ by the given account. 
  //  _Look carefully at the object below,_ as it's not 
  //  just the book object; the author object is nested inside of it.
  const newArray = [];

  let {id} = account;
  books.forEach(book=>{

    book.borrows.forEach(borrowed=>{
      if(id == borrowed.id && !borrowed.returned){
        let objInsertion = {
          ...book, 
          author: {
            ...getAuthorById(authors, book.authorId)
          }
        }
        newArray.push(objInsertion);
      } 
    });//borrows foreach ends
  });//books foreach ends

  return newArray;
}

function getAuthorById(authors, id){
  return authors.find(auth=>auth.id == id);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
