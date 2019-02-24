let images = ['Afghanistan', 'African Union', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua & Barbuda', 'Arab League', 'Argentina', 'Armenia', 'Aruba', 'ASEAN', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodja', 'Cameroon', 'Canada', 'Cape Verde', 'CARICOM', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'CIS', 'Colombia', 'Commonwealth', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa(Zaire)', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'England', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'European Union', 'Faroes', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guatemala', 'Guam', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Iran', 'Iraq', 'Ireland', 'Islamic Conference', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar(Burma)', 'Namibia', 'NATO', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Northern Cyprus', 'Northern Ireland', 'North Korea', 'Norway', 'Olimpic Movement', 'Oman', 'OPEC', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Red Cross', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Lucia', 'Samoa', 'San Marino', 'Sao Tome & Principe', 'Saudi Arabia', 'Scotland', 'Senegal', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'Somaliland', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts & Nevis', 'St Vincent & the Grenadines', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Tahiti(French Polinesia)', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad & Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom(Great Britain)', 'United Nations', 'Uruguay', 'Uzbekistan', 'Vanutau', 'Vatican City', 'Venezuela', 'Viet Nam', 'Virgin Islands British', 'Virgin Islands US', 'Wales', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'],
    Card = "media/card.jpg",
    countries = [],
    usedCountries = [],
    tries = parseInt(document.querySelector("#tries").innerHTML),
    guesses = parseInt(document.querySelector("#right").innerHTML),
    score = document.querySelector("#score"),
    number;

shuffle = (array) => array.sort(() => Math.random() - 0.5);

generateCountryObjects = () => images.map(image => countries.push({flag: image, card: Card}));

generateCountryObjects();

function pushCountries(num) {
    number = num;
    for (let i = 0; i < num; i++) {
        let random = Math.floor(Math.random() * images.length);
        usedCountries.push(countries[random]);
        usedCountries.push(countries[random]);
        countries.splice(random, 1);
    }
    return usedCountries;
}

function addCountryImg(usedCountries) {
    let output = '';
    usedCountries.map(country => output += "<div class='img'><img class='imgs' onclick='chooseImage(this)' name='" + country.flag + "' src='media/flags/flags/48/" + country.flag + ".png'/></div>");
    document.querySelector('#images').innerHTML = output;
}


function display(num) {
    usedCountries = pushCountries(num);
    shuffle(usedCountries);
    addCountryImg(usedCountries);
    document.querySelector("#images").className = "images";
    document.querySelector(".button-farm").innerHTML = "";
}

let chosenImage = {
    numberOfChosen: 0,
    imageOne: null,
    imageTwo: null
};

function flip() {
    let images = document.querySelectorAll(".imgs");
    images.forEach(image => image.src = Card)
}

let elements = [];

function nullEverything(chosenImage) {
    chosenImage.numberOfChosen = 0;
    chosenImage.imageOne = null;
    chosenImage.imageTwo = null;
}

function guessChosen(chosenImage, image) {
    if (chosenImage.imageOne === chosenImage.imageTwo) {
        document.querySelector("#right").innerHTML = ++guesses;
        document.querySelector("#tries").innerHTML = ++tries;
        nullEverything(chosenImage);
        score.innerHTML = "Right Guess";
        elements.map(image => image.enabled = false);
        elements = [];
    } else {
        document.querySelector("#tries").innerHTML = ++tries;
        score.innerHTML = "Wrong Guess";
        nullEverything(chosenImage);
        elements.map(image => image.src = Card);
        elements = [];
    }
}

cleanBoard = () => {
    document.querySelector('#images').innerHTML = '';
    document.querySelector(".button-farm").innerHTML = "<p>Wanna Play Again?</p>" +
        "<button onclick=\"display(6),setTimeout(flip, 3000)\">12 Flags</button>" +
        "<button onclick=\"display(8),setTimeout(flip, 4000)\">16 Flags</button>" +
        "<button onclick=\"display(10),setTimeout(flip, 5000)\">20 Flags</button>";
    guesses = tries = 0;
    document.querySelector("#right").innerHTML = guesses;
    document.querySelector("#tries").innerHTML = tries;
    usedCountries = [];
};

rightAnswer = () => {
    score.innerHTML = "You Guessed All The Flags, Your Percentage is " + Math.floor((guesses / tries) * 100) + "%";
    setTimeout(cleanBoard, 3000);
};

function chooseImage(element) {
    element.src = "media/flags/flags/48/" + element.name + ".png";
    elements.push(element);
    if (chosenImage.numberOfChosen === 0) {
        chosenImage.numberOfChosen++;
        chosenImage.imageOne = element.name;
    } else if (chosenImage.numberOfChosen === 1) {
        chosenImage.numberOfChosen++;
        chosenImage.imageTwo = element.name;
        guessChosen(chosenImage, element);
        if (guesses === number) {
            rightAnswer();
        }
    }
}