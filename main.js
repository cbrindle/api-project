// Function that runs when "Find Target" button is clicked
function getRickAndMortyData(num = 0) {
    event.preventDefault();
    
    // Clears any DOM data in #t-results-area
    clearData();

    // Get the value of what the user input in the #char-name box
    const charName = document.querySelector(`#char-name`).value;
    if (charName === ``) {
        document.querySelector(`#target-search-name`).innerText = `Please enter target's name`;
        return
    }
    document.querySelector(`#char-name`).disabled = true;

    // Create new XHTML request targeting the API's URL
    let xhttp = new XMLHttpRequest;
    let url = `https://rickandmortyapi.com/api/character/?name=${charName}`

    xhttp.open('GET', url, true);
    xhttp.send();

    // Get data from API
    xhttp.onreadystatechange = function() {
        let resultSize = 0;
        let parseObj = ``;
        if (this.readyState == 4 && this.status == 200) {
            parseObj = JSON.parse(this.responseText);
            resultSize = parseObj.results.length;
            console.log(resultSize);
        } else if (this.status === 404) {
            document.querySelector(`#target-search-name`).innerText = `No targets found search '${charName}'`;
            return
        }

        // Display numbers to click for additional results
        if (resultSize > 1 && resultSize <= 20) {
            for (let i = 0; i < resultSize; i++) {
                console.log([i]);
                const newLink = document.createElement(`a`);
                newLink.innerText = [i + 1];
                newLink.classList.add(`results-p`);
                newLink.onclick = changeResult;
                document.querySelector(`#t-results`).appendChild(newLink);
            }
        }

        // Display information from parsed JSON object
        document.querySelector(`#target-search-name`).innerText = `Search Results For: '${charName}'`

        document.querySelector(`#main-right-image-area`).style.backgroundImage = `url(${parseObj.results[num].image})`;

        document.querySelector(`#t-name`).innerText = `Name: ${parseObj.results[num].name}`

        document.querySelector(`#t-gender`).innerText = `Gender: ${parseObj.results[num].gender}`;

        document.querySelector(`#t-species`).innerText = `Species: ${parseObj.results[num].species}`;

        document.querySelector(`#t-origin`).innerText = `Origin: ${parseObj.results[num].origin.name}`;

        document.querySelector(`#t-location`).innerText = `Current Location: ${parseObj.results[num].location.name}`;

        document.querySelector(`#t-status`).innerText = `Status: ${parseObj.results[num].status}`;
    }
}


// Function to run when a result number is clicked
function changeResult(event) {
    const num = Number(event.target.innerText) - 1;
    clearData();
    getRickAndMortyData(num);
}

// Clears DOM data in #target-result-area
function clearData() {
    document.querySelector(`#t-results`).innerHTML = ``;
}

// Enables #char-name input box
function newSearch() {
    clearData();
    document.querySelector(`#char-name`).disabled = false;
    document.querySelector(`#char-name`).value = ``;
    document.querySelector(`#char-name`).focus();
}

function enterRun(event) {
    if (event.code == `Enter`) {
        event.preventDefault();
        document.querySelector(`#find-button`).click();
    }
}