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
  document.querySelector('#searchResultsList').innerHTML = ''
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  fetch(url)
    .then((res) => res.json())
    .then((jsonData) => {
      const results = jsonData;
      console.log(results);
      results.forEach((element) => {
        console.log(element.score);
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
        wordContainer.classList.add("word-container");
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
        if (element.show.network != null) {
          const networkBadge = document.createElement("span");
          networkBadge.classList.add("badge");
          networkBadge.classList.add("bg-secondary");
          networkBadge.appendChild(
            document.createTextNode(`${element.show.network.name}`)
          );
          wordContainer.appendChild(networkBadge);
        }

        if (element.show.webChannel != null) {
          const streamBadge = document.createElement("span");
          streamBadge.classList.add("badge");
          streamBadge.classList.add("bg-secondary");
          streamBadge.appendChild(
            document.createTextNode(`${element.show.webChannel.name}`)
          );
          wordContainer.appendChild(streamBadge);
        }

        const btnContainer = document.createElement("div");

        btnContainer.classList.add("pt-5");
        btnContainer.classList.add("mx-auto");

        showListItem.appendChild(btnContainer);

        const wantWatchButton = document.createElement("button");
        wantWatchButton.appendChild(document.createTextNode("Watch List"));
        wantWatchButton.classList.add("me-1");
        wantWatchButton.classList.add("btn");
        wantWatchButton.classList.add("btn-primary");
        btnContainer.appendChild(wantWatchButton);

        const favoriteButton = document.createElement("button");
        favoriteButton.appendChild(document.createTextNode("Fave List"));
        favoriteButton.classList.add("btn");
        favoriteButton.classList.add("btn-primary");
        btnContainer.appendChild(favoriteButton);

        if (element.show.webChannel === null) {
          var webChannelNetwork = null;
        }
        if (element.show.webChannel !== null) {
          var webChannelNetwork = element.show.webChannel.name;
        }

        if (element.show.network === null) {
          var networkVar = null;
        }
        if (element.show.network !== null) {
          var networkVar = element.show.network.name;
        }

        wantWatchButton.addEventListener("click", function (event) {
          fetch("/wantWatch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: element.show.name,
              key: element.show.id,
              summary: element.show.summary,
              network: networkVar,
              imgUrl: element.show.image.medium,
              genere: element.show.genres,
              score: element.score,
              webChannel: webChannelNetwork,
              faveList: false,
              wantWatch: true,
            }),
          })
            .then((result) => {
              return result.json();
            })
            .then((data) => {
              console.log(data);
            });
        });

        favoriteButton.addEventListener("click", function (event) {
          fetch("/favorite", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: element.show.name,
              key: element.show.id,
              summary: element.show.summary,
              network: networkVar,
              imgUrl: element.show.image.medium,
              genere: element.show.genres,
              score: element.score,
              webChannel: webChannelNetwork,
              faveList: true,
              wantWatch: false,
            }),
          })
            .then((result) => {
              return result.json();
            })
            .then((data) => {
              console.log(data);
            });
        });


      });
    });
}

// output search in listn
// photos shown
