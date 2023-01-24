function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let counter = 0;
  books.forEach(element => {
    if(element.borrows[0].returned == false){
      counter += 1;
    }
  });

  return counter;
}

function getMostCommonGenres(books) {
  //loop the books array and returning an [] with genres obj
  //the acumulator has the count per genre
  const genreFound = books.reduce((acumulator, currentBook)=>{
    //First element of acumulator
    if(acumulator.length == 0){
      return [{ name: currentBook.genre, count: 1 }]
    }
  
    //search if it exist already to add to counter
    let itemIndex = acumulator.findIndex(item=>item.name==currentBook.genre);
    if(itemIndex >= 0){
      acumulator[itemIndex].count += 1;
    }else{
      acumulator.push({name: currentBook.genre, count: 1})
    }

    return acumulator
  },[]);

  // sorting by count
  genreFound.sort((a,b)=>{
    if(a.count<b.count){
      return 1;
    }else if(a.count>b.count){
      return -1;
    }else{
      return 0;
    }
  });
  //returning 5 elements only
  return getFive(genreFound);
}


function getMostPopularBooks(books) {
  //iterating books and getting count
  const booksFound = books.reduce((acumulator, currentBook)=>{
    
    acumulator.push({name: currentBook.title, 
        count:currentBook.borrows.length});
    return acumulator
  },[])
  // sorting by count
  booksFound.sort((a,b)=>{
    if(a.count<b.count){
      return 1;
    }else if(a.count>b.count){
      return -1;
    }else{
      return 0;
    }
  });

  return getFive(booksFound);
}

function getMostPopularAuthors(books, authors) {

  const auths = authors.reduce((acum,currentAuth)=>{
    let counter = 0;
    books.forEach(book=>{//find each book per each auth
      if(book.authorId == currentAuth.id){
        counter = counter + book.borrows.length;
      }
    })//foreach ends;//counter for each author
    acum.push({name: currentAuth.name.first +" "+currentAuth.name.last,
      count: counter
    });//push ends

    return acum;
  },[]);//authors reduce() ends
  
  auths.sort((a,b)=>{
    if(a.count<b.count){
      return 1;
    }else if(a.count>b.count){
      return -1;
    }else{
      return 0;
    }
  });
  //returning 5 elements only
  return getFive(auths);
}

function getFive(array){
  return array.slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
