
// take in search
const searchButton = document.querySelector('#searchBtn')
const searchInput = document.querySelector('#search-input')

// addEventListener
searchButton.addEventListener('click', function (event) {
  searchBook(searchInput.value)
  console.log('search btn working')
})
console.log(searchInput.value)

function searchBook (query) {
  // document.querySelector('#searchResultsList').innerHTML = ''
  const url = `https://api.tvmaze.com/search/shows?q=${query}`
  fetch(url)
    .then(res => res.json())
    .then((jsonData) => {
      const results = jsonData
      results.forEach((element) => {
        console.log(element.show.image)

        const showListItem = document.createElement('li')
        showListItem.classList.add('list-group-item')

        const list = document.querySelector('#searchResultsList')
        list.appendChild(showListItem)

        const showTitle = document.createElement('h3')
        showTitle.appendChild(document.createTextNode(`${element.show.name}`))
        showListItem.appendChild(showTitle)
        
        if (element.show.image.medium != null) {
          const showPic = element.show.image.medium
          const showImg = document.createElement('img')
          showImg.setAttribute('src', showPic)
          showListItem.appendChild(showImg)
        }
      })
    })
}

// output search in listn
// photos shown
