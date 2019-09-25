function getRickAndMortyData(num = 0) {
    event.preventDefault();
    clearData();
    const charName = document.querySelector(`#char-name`).value;

    let xhttp = new XMLHttpRequest;
    let url = `https://rickandmortyapi.com/api/character/?name=${charName}`

    xhttp.open('GET', url, true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            parseObj = JSON.parse(this.responseText);
            resultSize = parseObj.results.length;
            console.log(parseObj);

            if (resultSize > 1) {
                for (let i = 0; i < resultSize; i++) {
                    console.log([i]);
                    const newLink = document.createElement(`a`);
                    newLink.innerText = [i + 1];
                    newLink.classList.add(`results-p`);
                    newLink.onclick = changeResult;
                    document.querySelector(`#t-results`).appendChild(newLink);
                }
            }

            document.querySelector(`#main-right-image-area`).style.backgroundImage = `url(${parseObj.results[num].image})`;

            document.querySelector(`#t-name`).innerText = `Name: ${parseObj.results[num].name}`

            document.querySelector(`#t-gender`).innerText = `Gender: ${parseObj.results[num].gender}`;

            document.querySelector(`#t-species`).innerText = `Species: ${parseObj.results[num].species}`;

            document.querySelector(`#t-origin`).innerText = `Origin: ${parseObj.results[num].origin.name}`;

            document.querySelector(`#t-location`).innerText = `Current Location: ${parseObj.results[num].location.name}`;

            document.querySelector(`#t-status`).innerText = `Status: ${parseObj.results[num].status}`;
        }
    }
}

function changeResult(event) {
    clearData();
    const num = event.target.innerText;
    getRickAndMortyData(num);
}

function clearData() {
    document.querySelector(`#t-results`).innerHTML = ``;
}