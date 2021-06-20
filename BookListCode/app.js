//Book Constructor
function Book(title,author,isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;
}



//UI Constructor
function UI() {
  
}

//Add book to List
UI.prototype.addBookToList=function(book){
  const list=document.getElementById('book-list');

  //Create tr element
  const row=document.createElement('tr');
  //Insert column
  row.innerHTML=`
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert=function(message,className){
  //Create a div
  const div=document.createElement('div');
  //Add classes
  div.className=`alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //Get parent container to append div
  const container=document.querySelector('.container');
  const form=document.getElementById('book-form');

  //Insert the div before form and below container
  container.insertBefore(div,form);

  //Time out after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);
}

//Delete book
UI.prototype.deleteBook()=function(target){
   if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
   }
}

//Clear Fields
UI.prototype.clearFields=function(){
   document.getElementById('title').value='';
   document.getElementById('author').value='';
   document.getElementById('isbn').value='';
}

//Event Listeners
document.getElementById('book-form').addEventListener('submit',
function(e){

  //Get form values
  const title=document.getElementById('title').value,
        author=document.getElementById('author').value,
        isbn=document.getElementById('isbn').value;

  //Instantiate a book
  const book = new Book(title,author,isbn);

  //Instantiate UI
  const ui = new UI();

  console.log(ui);

  //Validate
  if(title === '' || author === '' || isbn === ''){
    //Show alert
    ui.showAlert('Please add all fields!','error');
  }else{
    //Add book to list
    ui.addBookToList(book);

    //Show success
    ui.showAlert('Book Added!!','success');

    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();  
});

//Event Listener for Delete
document.getElementById('book-list').addEventListener('click',
function(e){

  //Instantiate the book
  const ui = new UI();
  //Delete book
  ui.deleteBook(e.target);

  //Show Alert
  ui.showAlert('Book deleted!!','success');

  e.preventDefault();
});
