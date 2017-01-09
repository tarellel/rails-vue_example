var books = new Vue({
  el: '#book-list',
  data: {
    //books: <%== @books ? @books.to_json(only: [:id, :title, :pages, :reference]) : "[]" %>,
    books: [],
    showForm: false,
    csrf_token: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    hasErrors: {
      title: false,
      pages: false,
      reference: false
    }
  },

  created: function(){
    this.getBooks();
  },

  methods: {
    getBooks(){
      axios.get('/books.json')
      .then((response) =>
        //console.log(response.data)
        this.books = response.data
      )
      .catch((error) => {
        this.books = [];
      });
    },

    // verify if field[x] has an error
    hasError(input){
      if (this.hasErrors[input]){ return true; }
    },

    // Remove the specified book from the Vue: data when deleted
    dropBook(book){
      let index = this.books.indexOf(book);
      this.books.splice(index, 1);
    },

    // Attempt to remove the book via AJAX
    // if successful, remove the element fromt he page as well
    remove(book){
      // console.log(book);
      book_url = ('/books/' + book.id + '.json');

      var instance = axios.create();
      instance.delete(book_url, {
          headers: {
            'X-CSRF-Token': this.csrf_token,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        this.dropBook(book)
      })
      .catch( function(error){
        console.log(error.response);
      });
    },

    // This allows the user to toggle the new book form
    toggleForm(){
      this.showForm == false ? (this.showForm = true) : (this.showForm = false);
    },

    // retrieve input values before submitting the form
    submitForm(){
      // Set default values to validate against
      let newBook = {
        'title': document.querySelector('input[name=title]').value.trim(),
        'pages': document.querySelector('input[name=pages]').value.trim(),
        'reference': document.querySelector('input[name=reference]').value.trim()
      };
      this.submitBook(newBook)
    },

    // When form is submitted, validate values
    // If validate process request, otherwise generate field specific errors
    submitBook(book){
      let formError = false;
      // validate inputs aren't blank
      inputs = document.querySelectorAll('input:not([type=submit])');

      // Add to list of fields with errors
      for(var i = 0, len = inputs.length; i < len; i++ ){
        if(inputs[i].value.trim() == ''){
          this.hasErrors[inputs[i].name] = true;
          formError = true;
        }else{
          // This is required in order to clear errors, after a form validates
          this.hasErrors[inputs[i].name] = false;
        }
      }

      // if fields are blank, highlight their fields
      // otherwise add the book
      if (formError == true){
        return false;
      }else{
        newBook_url = '/books.json'
        axios.post(newBook_url, {
            title: book.title,
            pages: book.pages,
            reference: book.reference
          },
          {
            headers: {
              'X-CSRF-Token': this.csrf_token,
              'Content-Type': 'application/json'
            }
          })
        .then((response) => {
          // console.log(response);
          if(response.status == '201'){
            // clear all form values
            // except the submit button
            let inputs = document.querySelectorAll('input:not([type=submit])');
            inputs.forEach((field) => {
              field.value = ''
            });
            // Add the book to the datalist
            this.addBook(response.data);
          }
        })
        .catch((error) => {
          console.log(error)
        });
      }
    },

    addBook(book){
      this.books.push({
        'title': book.title,
        'id': book.id,
        'pages': book.pages,
        'reference': book.reference
      });
    }
  },

  computed: {
    orderedBooks(){
      // return _.orderBy(this.books, ['title']);
      return _.orderBy(this.books, (book) => { return book.title.toLowerCase(); });
    }
  }
});
