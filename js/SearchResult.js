import {searchButton, userInput, spinner, tableResults, baseURL} from './constants.js'


class SearchResult {
    constructor(baseURL, userInput, spinner, tableResults) {
    this.baseURL = baseURL;
    this.userInput = userInput;
    this.spinner = spinner;
    this.tableResults = tableResults;
    }
  
    async fetchResults() {
        try{
            const response = await fetch(baseURL + `/search?query=${userInput.value}&exchange=NASDAQ`)
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
            const data = await fetchResults();
            tableResults.innerHTML='';
            spinner.classList.remove('d-none');
            for(let value of data){
                const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${value.symbol}`)
                const details = await response.json()
                tableResults.innerHTML+= `<br>
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
                tableResults.appendChild(percentOfChanges);
              }    
              spinner.classList.add('d-none');
        }
        catch (error) {
            console.error(error);
          }
    } 
}

const result = new SearchResult();
searchButton.addEventListener('click', result.showResults());