
//take in search
const searchButton = document.querySelector('#searchBtn')
const searchInput = document.querySelector('#search-input')

//addEventListener
searchButton.addEventListener('click', function (event) {
    searchBook(searchInput.value)
    console.log("search btn working")
})
console.log(searchInput.value)

function searchBook(query) {
    // document.querySelector('#searchResultsList').innerHTML = ''
    const url = `https://api.tvmaze.com/search/shows?q=${query}`
    fetch(url)
        .then(res => res.json())
        .then((jsonData) => {
            const results = jsonData
            console.log(results)
        })
    }


//output search in listn
// photos shown