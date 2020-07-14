
const getBooks = () => {
  fetch("https://foaas.com/bag/capu")
  .then(response => {
    return response.json()
  })
  .then((data) => {
    console.log('data :>> ', data.message);
    const books = data;

    // books.forEach(book => {
    //   let bookParagraph = document.createElement('p');
    //   let title = book.volumeInfo.title;
    //   console.log('title :>> ', title);
    //   bookParagraph.innerHTML = title;
    //   randomTitle.insertAdjacentElement('afterend', bookParagraph);
    // });
  })
}


document.body.onload = getBooks;
