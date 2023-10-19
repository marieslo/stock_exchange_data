import {spinner,serverURL,companyURL,historicalURL,symbol,chart,loaderHTML,loader,companyImg,companyName,description,stockDetails,loaderChart} from './constants.js'

async function getAPI(fetchURL) {
  try {
    let response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

async function CompanyProfile(symbol, getAPI, appendCompanyDetails) {
  spinner.classList.remove('d-none');
  try {
    let fetchURL = serverURL + companyURL + `${symbol}`;
    let data = await getAPI(fetchURL);
    loader.innerHTML = '';
    appendCompanyDetails(data);
  } catch (error) {
    loader.classList.add('loader-chart-error');
    spinner.classList.add('d-none');

  }
}

function appendCompanyDetails(data) {
  const logo = document.createElement('img');
  const hyperLinktoSite = document.createElement('a');
  const percentOfChanges = document.createElement('span');
  hyperLinktoSite.classList.add('link');
  logo.src = data.profile.image;
  logo.alt = data.profile.name;
  logo.style.height = '100px';
  logo.style.width = '100px';
  companyImg.appendChild(logo);
    if (data.profile.industry !== '') {
      hyperLinktoSite.innerHTML = `${data.profile.companyName} (${data.profile.industry})`;
    } else {
      hyperLinktoSite.innerHTML = `${data.profile.companyName}`;
    }
    hyperLinktoSite.href = data.profile.website;
    hyperLinktoSite.target = 'blank';
    companyName.appendChild(hyperLinktoSite);
    description.innerHTML = data.profile.description;
    stockDetails.innerHTML = '$' + Number.parseFloat(data.profile.price).toFixed(2) + ' ';
        if (data.profile.changesPercentage >= 0) 
        {
          percentOfChanges.innerHTML = '(+' + Number.parseFloat(data.profile.changesPercentage).toFixed(2) + '%)';
          percentOfChanges.style.color = '#50C878';
        } 
        else {
          percentOfChanges.innerHTML = '(' + Number.parseFloat(data.profile.changesPercentage).toFixed(2) + '%)';
          percentOfChanges.style.color = '#C70039';
        }
        stockDetails.appendChild(percentOfChanges);
}

function filterData(data) {
  let filteredData = data.historical.filter((item) => {
    const currentDate = new Date(item.date);
    const notEarlier = new Date('01/01/1980');
    if (currentDate >= notEarlier) {
      return true;
    }
    return false;
  });
  return filteredData;
}
function Sorting(filteredData) {
  let sortedFilteredData = filteredData.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return sortedFilteredData;
}

function showChart(sortedFilteredData) {
  const displayData = {
    labels: sortedFilteredData.map((item) => item.date),
    datasets: [
      {
        label: `${symbol}`,
        fill: false,
        pointStyle: false,
        borderWidth: 1,
        borderColor: 'rgb(75, 192, 192)',
        lineTension: 0.01,
        data: sortedFilteredData.map((item) => item.close),
      },
    ],
  };
  const config = {
    type: 'line',
    data: displayData,
    options: {
      elements: {
        line: {
          tension: 0.1,
        },},
  }}
  const myChart = new Chart(chart, config);
}
Chart.defaults.font.size = 8;
Chart.defaults.font.family= 'Zilla Slab';

async function HistoricalData(symbol,getAPI,filterData,Sorting,showChart) {
  loaderChart.innerHTML = loaderHTML;
    let fetchHistoricalURL =
    serverURL + historicalURL + `${symbol}?serietype=line`;
    let data = await getAPI(fetchHistoricalURL);
    spinner.classList.add('d-none');
    loaderChart.innerHTML = '';
    let filteredData = filterData(data);
    let sortedFilteredData = Sorting(filteredData);
    showChart(sortedFilteredData);
  }

CompanyProfile(symbol, getAPI, appendCompanyDetails);
HistoricalData(symbol, getAPI, filterData, Sorting, showChart);