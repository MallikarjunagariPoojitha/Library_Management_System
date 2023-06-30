function fetchBooks(searchTerm) {
  //const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
  //const apiUrl = `https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${searchTerm}`;
  //const apiUrl = `https://www.goodreads.com/api/overview`;
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40&orderBy=relevance`;
  
 
   fetch(apiUrl)
     .then(response => response.json())
     .then(data => {
       
       displayResults(data);
     })
     .catch(error => {
       console.log('Error fetching book data:', error);
     });
 }
 
 
 function displayResults(data) {
   
   const outputList = document.getElementById('list-output');
   outputList.innerHTML = '';
 
   
   data.items.forEach(item => {
     const book = item.volumeInfo;
     const title = book.title;
     const authors = book.authors ? book.authors.join(', ') : 'Unknown Author';
     const publisher = book.publisher ? book.publisher : 'Unknown Publisher';
     const bookLink = book.previewLink;
     const bookImg = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/150';
 
    
     const bookCard = document.createElement('div');
     bookCard.classList.add('book-card');
 
     const bookImage = document.createElement('img');
     bookImage.src = bookImg;
     bookImage.alt = title;
     bookCard.appendChild(bookImage);
 
     const bookDetails = document.createElement('div');
     bookDetails.classList.add('book-details');
 
     const bookTitle = document.createElement('h2');
     bookTitle.textContent = title;
     bookDetails.appendChild(bookTitle);
 
     const bookAuthor = document.createElement('p');
     bookAuthor.textContent = `Author: ${authors}`;
     bookDetails.appendChild(bookAuthor);
 
     const bookPublisher = document.createElement('p');
     bookPublisher.textContent = `Publisher: ${publisher}`;
     bookDetails.appendChild(bookPublisher);
 
     const bookReadLink = document.createElement('a');
     bookReadLink.href = bookLink;
     bookReadLink.textContent = 'Read Book';
     bookReadLink.target = '_blank';
     bookDetails.appendChild(bookReadLink);
 
     bookCard.appendChild(bookDetails);
 
     outputList.appendChild(bookCard);
   });
 }
 
 
 const searchForm = document.getElementById('search-form');
 searchForm.addEventListener('submit', function(event) {
   event.preventDefault();
   const searchTerm = document.getElementById('search-input').value.trim();
 
   if (searchTerm !== '') {
     fetchBooks(searchTerm);
   }
 });
 function displayResults(data) {
   const outputList = document.getElementById('list-output');
   outputList.innerHTML = '';
 
   if (data.totalItems === 0) {
     outputList.innerHTML = '<p>No results found! Please try again.</p>';
     return;
   }
   
   let count = 0;
 
   data.items.forEach(item => {
     const book = item.volumeInfo;
     const title = book.title;
     const authors = book.authors ? book.authors.join(', ') : 'Unknown Author';
     const publisher = book.publisher ? book.publisher : 'Unknown Publisher';
     const bookLink = book.previewLink;
     const bookImg = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/150';
 
     const bookCard = document.createElement('div');
     bookCard.classList.add('book-card');
 
     const bookImage = document.createElement('img');
     bookImage.src = bookImg;
     bookImage.alt = title;
     bookCard.appendChild(bookImage);
 
     const bookDetails = document.createElement('div');
     bookDetails.classList.add('book-details');
 
     const bookTitle = document.createElement('h2');
     bookTitle.textContent = title;
     bookDetails.appendChild(bookTitle);
 
     const bookAuthor = document.createElement('p');
     bookAuthor.textContent = `Author: ${authors}`;
     bookDetails.appendChild(bookAuthor);
 
     const bookPublisher = document.createElement('p');
     bookPublisher.textContent = `Publisher: ${publisher}`;
     bookDetails.appendChild(bookPublisher);
 
     const bookReadLink = document.createElement('a');
     bookReadLink.href = bookLink;
     bookReadLink.textContent = 'Read Book';
     bookReadLink.target = '_blank';
     bookDetails.appendChild(bookReadLink);
     
     const addToCartButton = document.createElement('button');
     addToCartButton.textContent = 'Add to Cart';
     addToCartButton.classList.add('add-to-cart-button'); 
     addToCartButton.addEventListener('click', function() {
      
       addToCart(book);
     });
     bookDetails.appendChild(addToCartButton);
 
     bookCard.appendChild(bookDetails);
 
     outputList.appendChild(bookCard);
 
     setTimeout(() => {
       bookCard.style.opacity = '1';
       bookCard.classList.add('fade-in');
     }, 1000 * count);
 
 
     count++;
   });
 
   const countOutput = document.getElementById('count-output');
   countOutput.textContent = count;
 
   const searchCount = document.getElementById('search-count');
   searchCount.style.display = 'block';
   count = 0;
 }
 
 const cartItems = []; 
 
 
 function addToCart(book) {
 cartItems.push(book); 
 displayCartItems();
 alert("added scuccesfully") 
 }
 
 
function addToCart(book) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const { title, imageLinks } = book;
  const image = imageLinks ? imageLinks.thumbnail : 'https://via.placeholder.com/150';
  cartItems.push({ title, image });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert('Added successfully!');
  
}

function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  if (cartItems.length === 0) {
    cartItemsContainer.textContent = 'Your cart is empty.';
    return;
  }

  cartItems.forEach(book => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const bookImage = document.createElement('img');
    bookImage.src = book.image;
    bookImage.alt = book.title;
    cartItem.appendChild(bookImage);

    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    cartItem.appendChild(bookTitle);

    cartItemsContainer.appendChild(cartItem);
  });
}




