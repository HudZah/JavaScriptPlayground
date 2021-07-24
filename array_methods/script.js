const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000000)
    };

    addData(newUser);
}

// function addData
function addData(obj) {
    data.push(obj);
''
    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // clear the main div
    main.innerHTML = "            <h2><strong>Person<strong> Wealth</h2>";

    providedData.forEach((item) => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}
// Format number as currency string
function formatMoney(number) {
    return `$ ${number.toLocaleString()}`;
}

function doubleMoney() {
    data = data.map(item => {
        return {...item, money: item.money * 2}
    });

    updateDOM();
}

function sortByRichest() {
    data = data.sort(function (a, b) {
        return b.money - a.money; 
    });
    updateDOM();
}

function showMillionaires() {
    data = data.filter((item) => {
        return item.money >= 1000000;
    });
    updateDOM();
}

function calculateWealth() {
    wealth = data.reduce((acc, user) => (acc += user.money), 0);

    console.log(formatMoney(wealth));
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// Add listener to add user button
addUserBtn.addEventListener("click", () => {
    getRandomUser();
}
);

doubleBtn.addEventListener("click", () => doubleMoney());

sortBtn.addEventListener("click", () => sortByRichest());

showMillionairesBtn.addEventListener("click", () => showMillionaires());

calculateWealthBtn.addEventListener("click", () => {
    calculateWealth();
});

