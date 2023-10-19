class SearchForm {

 Form() {
      let formContainer = 
      `<div class="col-md-12">
        <div class="d-flex">
            <input type="text" id="user-input" class="form-control text-info" placeholder="Type a company's name or ticker..."/>
            <button type="button" id="search-button" class="btn btn-outline-info"><span class="material-symbols-outlined">
                search
                </span></button>
        </div>
          <div id="spinner" class="spinner-border text-info d-none" role="status">
              <span class="sr-only"></span></div>
       
      </div>`

      document.getElementById('searchform').innerHTML = formContainer;
  }
}
let addForm = new SearchForm();
addForm.Form();


