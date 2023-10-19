export const
searchButton = document.getElementById('search-button'),
userInput = document.getElementById('user-input'),
spinner = document.getElementById('spinner'),
tableResults = document.getElementById('table-results'),
baseURL= `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`,
serverURL = ('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com'),
queryURL = `/api/v3/search?query=`,
nasdaqURL = `&limit=10&exchange=NASDAQ`,
companyURL = `/api/v3/company/profile/`,
compSearchURL = `company.html?symbol=`,
historicalURL = `/api/v3/historical-price-full/`,
searchParams = new URLSearchParams(window.location.search),
symbol = searchParams.get('symbol'),
chart = document.getElementById('myChart'),
loaderHTML = `<div class="spinner-border" role="status"><span class="visually-hidden"></span></div>`,
loader = document.querySelector('.loader'),
companyImg = document.querySelector('.company-img'),
companyName = document.querySelector('.company-name'),
description = document.querySelector('.description'),
stockDetails = document.querySelector('.stock-details'),
loaderChart = document.querySelector('.loader-chart'),
marquee = document.querySelector('.marquee')