import { baseURL } from './constants.js'
const userInput = document.getElementById('user-input');
const spinner = document.getElementById('spinner');
const tableResults = document.getElementById('table-results');

class SearchResult {
    constructor(baseURL, userInput, spinner, tableResults) {
    this.baseURL = baseURL;
    this.userInput = userInput;
    this.spinner = spinner;
    this.tableResults = tableResults;
    this.searchButton = document.getElementById('search-button');
    }
  
    async fetchResults() {
        try{
            const response = await fetch(this.baseURL + `/search?query=${this.userInput.value}&exchange=NASDAQ`)
            const data = await response.json()
            return data
        }
        catch (error) {
            console.error(error);
          }
    }
    
    async showResults(){
      const percentOfChanges = document.createElement('span');
        try{
            const data = await this.fetchResults();
            this.tableResults.innerHTML='';
            this.spinner.classList.remove('d-none');
            for(let value of data){
                const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${value.symbol}`)
                const details = await response.json()
                this.tableResults.innerHTML+= `<br>
               <img class="logo" src="${details.profile.image}" alt="no logo">
              <a href="/company.html?symbol=${value.symbol}" class="text-decoration-none font-weight-normal text-secondary fs-6 hover-overlay">
                ${value.name} (${value.symbol})
              </br>`
                if (details.profile.changesPercentage >= 0) 
                {
                  percentOfChanges.innerHTML = '(+' + Number.parseFloat(details.profile.changesPercentage).toFixed(2) + '%)';
                  percentOfChanges.style.color = '#50C878';
                } 
                else {
                  percentOfChanges.innerHTML = '(' + Number.parseFloat(details.profile.changesPercentage).toFixed(2) + '%)';
                  percentOfChanges.style.color = '#C70039';
                }
                this.tableResults.appendChild(percentOfChanges);
              }    
              this.spinner.classList.add('d-none');
        }
        catch (error) {
            console.error(error);
          }
    } 
}

const result = new SearchResult(baseURL, userInput, spinner, tableResults);
result.searchButton.addEventListener('click', () => result.showResults());