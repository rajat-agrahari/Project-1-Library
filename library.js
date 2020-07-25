function Book(bookName, authorName, type) {
    this.bookName = bookName;
    this.author = authorName;
    this.type = type;
}

//Display constructor with Empty Property i.e. here NO Property
function Display() {

}


//Event listener Fired on click Submit
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(event) {
    let bookName = document.getElementById('bookName').value;      //To Grab the value of Enter Input i.e. bookname,author,type
    let authorName = document.getElementById('authorName').value;
    let programming = document.getElementById('programming');
    let Cooking = document.getElementById('Cooking');
    let Novels = document.getElementById('Novels');

    if (programming.checked) {
        type = programming.value;
    }
    else if (Cooking.checked) {
        type = Cooking.value;
    }
    else if (Novels.checked) {
        type = Novels.value;
    }

    let book = new Book(bookName, authorName, type);
    var display = new Display(book);     //Display Object
    localCall();           //To get booklist data from Local Storage

    if (book.bookName.length > 2 && book.author.length > 2) {
        bookList.push(book);    //To add new books in booklist 
        localStorage.setItem('bookLs', JSON.stringify(bookList))     //To update local storage 
        showBook(display);                          //show function to display books
        display.clear();                     //its use to resetthe form after submition
        display.msg('success', ' You have successfully submitted your books information');
    }
    else {
        showBook(display);
        if (book.bookName.length == 0 && book.author.length == 0) { }
        else {
            display.msg('warning', 'Please enter the correct books informations');
        }
    }
    event.preventDefault();
}


//To search books
let search = document.getElementById('searchInput');     //To grab input search Text
search.addEventListener('input', function () {          //Input Event Fire
    let searchInput = search.value.toLowerCase();      //Input Value
    let rowSearch = document.getElementsByClassName('rowSearch');

    Array.from(rowSearch).forEach(function (element) {
        let txtSearch1 = element.getElementsByTagName('td')[1].innerText.toLowerCase();
        let txtSearch2 = element.getElementsByTagName('td')[2].innerText.toLowerCase();
        if (txtSearch1.includes(searchInput) || txtSearch2.includes(searchInput)) {
        }
        else {
            element.style.display = "none";
        }
    })
})


//Prototype function to clear form after submition
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}


//display success or Error
Display.prototype.msg = function (msgType, msgShow) {
    let message = document.getElementById('message');
    let alertString = `<div class="alert alert-${msgType} alert-dismissible fade show" role="alert">
                       <strong>${msgType}!</strong> ${msgShow}
                     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                 </div>`;
    message.innerHTML = alertString;
    // console.log("Alert fire");
    setTimeout(function () {
        message.innerHTML = "";       //set time to display error or success msg
    }, 5000);

}


//function for Display Books in DOM
function showBook(display) {
    localCall();
    let tableBody = document.getElementById('tableBody');
    let html = ``;
    bookList.forEach(function (element, index) {
        html += `<tr id="${index}" class="rowSearch ">
                <td class="font-oxygen">${index + 1}</td>
                 <td class="font-text">${element.bookName}</td>
                 <td class="font-text">${element.author}</td>
                 <td class="font-text">${element.type}</td>
                 <td><button type="submit" onclick='deleteBook(${index})' id="deleteBook" class="btn btn-danger">Delete
                 </button></td>
                </tr>`;
    });
    tableBody.innerHTML = html;
}

//Delete function
function deleteBook(index) {
    console.log('delete');
    let trDelete = document.getElementById(index);         //To grab row of particular index
    trDelete.style.display = "none";
    localCall();
    bookList.splice(index, 1);
    localStorage.setItem('bookLs', JSON.stringify(bookList))     //To update local storage 
}


//function for get data from local storage
function localCall() {
    let bookLs = localStorage.getItem('bookLs');    //to get previous notes from localStorage
    if (bookLs == null) {                           //to cheack notes are empty are No?
        bookList = [];
    }
    else {
        bookList = JSON.parse(bookLs);            //to change string into  Array Object 
    }
}