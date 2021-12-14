// take in search
const searchButton = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#search-input");

// addEventListener
searchButton.addEventListener("click", function (event) {
  searchBook(searchInput.value);
  console.log("search btn working");
});
console.log(searchInput.value);

function searchBook(query) {
  // document.querySelector('#searchResultsList').innerHTML = ''
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  fetch(url)
    .then((res) => res.json())
    .then((jsonData) => {
      const results = jsonData;
      console.log(results)
      results.forEach((element) => {
        console.log(element.show.webChannel)
        // search list item
        const showListItem = document.createElement("li");
        showListItem.classList.add("list-group-item");
        showListItem.classList.add("d-flex");
        // select the ul list from html
        const list = document.querySelector("#searchResultsList");
        list.appendChild(showListItem);
        // prints show image cover
        if (element.show.image.medium != null) {
          const showPicUrl = element.show.image.medium;
          const showImg = document.createElement("img");
          showImg.setAttribute("src", showPicUrl);
          showListItem.appendChild(showImg);
        }
        // contains the summary an title
        const wordContainer = document.createElement("div");
        wordContainer.classList.add("ms-3");
        showListItem.appendChild(wordContainer);

        const showTitle = document.createElement("h3");
        showTitle.appendChild(document.createTextNode(`${element.show.name}`));
        wordContainer.appendChild(showTitle);

        // const summary = document.createElement('p')
        // summary.appendChild(document.createTextNode(`${element.show.summary}`))
        if (element.show.summary != null) {
          wordContainer.insertAdjacentHTML("beforeend", element.show.summary);
        }
        if (element.show.network.name != null) {
          const networkBadge = document.createElement('span');
          networkBadge.classList.add("badge");
          networkBadge.classList.add("bg-secondary");
          networkBadge.appendChild(document.createTextNode(`${element.show.network.name}`));
          wordContainer.appendChild(networkBadge);
        }

        // if (element.show.webChannel.name != null) {
        //   const networkBadge = document.createElement('span');
        //   networkBadge.classList.add("badge");
        //   networkBadge.classList.add("bg-secondary");
        //   networkBadge.appendChild(document.createTextNode(`${element.show.webChannel.name}`));
        //   wordContainer.appendChild(networkBadge);
        // }

      });
    });
}

// output search in listn
// photos shown
