let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let searchResultsEl = document.getElementById("searchResults");


function createandappendresult(result) {
    let {
        title,
        link,
        description
    } = result;
    let resultEl = document.createElement("div");
    resultEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.classList.add("result-title");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = "_blank"
    resultEl.appendChild(titleEl);

    let breakEl1 = document.createElement("br");
    resultEl.appendChild(breakEl1);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    resultEl.appendChild(urlEl);

    let breakEl2 = document.createElement("br");
    resultEl.appendChild(breakEl2);

    let descEl = document.createElement("p");
    descEl.classList.add("link-description");
    descEl.textContent = description;
    resultEl.appendChild(descEl);

    searchResultsEl.appendChild(resultEl);
}

function displayresults(search_results) {
    spinnerEl.classList.add("d-none");
    for (let result of search_results) {
        createandappendresult(result);
    }
}


function requestdata() {
    let searchEl = searchInputEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchEl;
    let options = {
        method: "GET"
    }
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData)
            let {
                search_results
            } = jsonData;
            console.log(search_results)
            displayresults(search_results);
        })
}




searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none")
        searchResultsEl.textContent = ""
        requestdata();
    }
})