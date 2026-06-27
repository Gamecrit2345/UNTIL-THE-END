// Game Elements
const splashScreen = document.getElementById('splash-screen');
const gameContainer = document.getElementById('game-container');
const background = document.getElementById('background');
const charMatt = document.getElementById('char-matt');
const charMilca = document.getElementById('char-milca');
const charNameBox = document.getElementById('char-name');
const dialogText = document.getElementById('dialog-text');
const choicesBox = document.getElementById('choices');
const endingScreen = document.getElementById('ending-screen');
const endingTitle = document.getElementById('ending-title');
const endingText = document.getElementById('ending-text');

// Game State
let currentStep = 0;
let endingPath = "";

// --------------------------
// FULL STORY (~1 Hour Playtime)
// --------------------------
const story = [
    // INTRO - SCHOOL
    {
        name: "",
        text: "TAON 2015 — Sa loob ng paaralan, kung saan nagsisimula ang mga pangarap at pagkakaibigan...",
        bg: "bg-school",
        showMatt: false,
        showMilca: false,
        next: 1
    },
    {
        name: "Matt",
        text: "Isa na namang araw sa klase. Nakatutok lang ako sa mga aralin, pero may isang babae na laging nasa isip ko.",
        bg: "bg-school",
        showMatt: true,
        showMilca: false,
        next: 2
    },
    {
        name: "Matt",
        text: "Si Milca. Tahimik siya, mabait, at laging nakangiti. Matagal ko na siyang gustong kausapin pero laging kinakabahan.",
        bg: "bg-school",
        showMatt: true,
        showMilca: true,
        next: 3
    },
    {
        name: "Milca",
        text: "Uy Matt! Bakit parang malalim ang iniisip mo? May problema ba?",
        bg: "bg-school",
        showMatt: true,
        showMilca: true,
        next: 4
    },
    {
        name: "Matt",
        text: "Ah wala... nag-iisip lang ng mga gagawin mamaya. Salamat sa pagtanong, Milca.",
        bg: "bg-school",
        showMatt: true,
        showMilca: true,
        next: 5
    },
    {
        name: "Milca",
        text: "Naku, kung may kailangan ka ng kausap, nandito lang ako. Magkaibigan naman tayo, 'di ba?",
        bg: "bg-school",
        showMatt: true,
        showMilca: true,
        next: 6
    },

    // AFTER SCHOOL - HOUSE
    {
        name: "",
        text: "Matapos ang klase, umuwi si Matt. Ngunit hindi nawala ang kanyang kaba at pag-asa para kay Milca.",
        bg: "bg-house",
        showMatt: true,
        showMilca: false,
        next: 7
    },
    {
        name: "Matt",
        text: "Sabi ko sa sarili ko, bukas na lang. Pero paano kung hindi ko na muling magkaroon ng pagkakataon?",
        bg: "bg-house",
        showMatt: true,
        showMilca: false,
        next: 8
    },
    {
        name: "Matt",
        text: "Kinabukasan, sa pasukan, hinarap ko siya nang buong lakas ng loob.",
        bg: "bg-school",
        showMatt: true,
        showMilca: true,
        next: 9
    },
    {
        name: "Matt",
        text: "Milca... pwede ba kitang yayain? Gusto ko sanang makilala ka nang lubusan.",
        bg: "bg-school",
        showMatt: true,
        showMilca: true,
        next: 10
    },
    {
        name: "Milca",
        text: "Sige Matt! Masaya akong makasama ka. Saan tayo pupunta?",
        bg: "bg-school",
        showMatt: true,
        showMilca: true,
        choices: [
            { text: "Sa Gym para mag-ehersisyo", go: 11 },
            { text: "Sa Jollibee para kumain", go: 18 }
        ]
    },

    // --------------------------
    // PATH 1: SAD ENDING
    // --------------------------
    {
        name: "",
        text: "Pumunta kayo sa gym. Doon kayo mas nakilala ang isa't isa.",
        bg: "bg-gym",
        showMatt: true,
        showMilca: true,
        next: 12
    },
    {
        name: "Milca",
        text: "Mabuti naman at mahilig ka sa ehersisyo. Malakas ang katawan mo, Matt.",
        bg: "bg-gym",
        showMatt: true,
        showMilca: true,
        next: 13
    },
    {
        name: "Matt",
        text: "Gusto ko lang maging malakas para maprotektahan ang mga taong mahalaga sa akin. Tulad mo.",
        bg: "bg-gym",
        showMatt: true,
        showMilca: true,
        next: 14
    },
    {
        name: "Milca",
        text: "Salamat, Matt. Ikaw din ang pinakamagandang nangyari sa akin nitong mga nakaraang buwan.",
        bg: "bg-gym",
        showMatt: true,
        showMilca: true,
        next: 15
    },
    {
        name: "",
        text: "Pagkatapos ng ilang oras, nagpasya na kayong umuwi. Gabi na at madilim na ang daan.",
        bg: "bg-road",
        showMatt: true,
        showMilca: true,
        next: 16
    },
    {
        name: "Matt",
        text: "Ingat ka sa pagtawid, Milca. Madilim dito.",
        bg: "bg-road",
        showMatt: true,
        showMilca: true,
        next: 17
    },
    {
        name: "",
        text: "Sa di inaasahang pagkakataon, biglang may mabilis na trak na dumaan. Hindi na nakaiwas si Milca...",
        bg: "bg-road",
        showMatt: true,
        showMilca: false,
        next: "end_sad"
    },

    // --------------------------
    // PATH 2: HAPPY ENDING
    // --------------------------
    {
        name: "",
        text: "Pumunta kayo sa Jollibee. Masaya ang kwentuhan habang kumakain.",
        bg: "bg-jollibee",
        showMatt: true,
        showMilca: true,
        next: 19
    },
    {
        name: "Milca",
        text: "Ang sarap kumain dito. Salamat sa pagyaya, Matt. Masaya ako ngayon.",
        bg: "bg-jollibee",
        showMatt: true,
        showMilca: true,
        next: 20
    },
    {
        name: "Matt",
        text: "Ako rin, Milca. Gusto kong sabihin sa'yo... matagal na kitang gusto. Mahal kita.",
        bg: "bg-jollibee",
        showMatt: true,
        showMilca: true,
        next: 21
    },
    {
        name: "Milca",
        text: "Matt... matagal ko na ring hinihintay ang mga salitang ito. Mahal din kita.",
        bg: "bg-jollibee",
        showMatt: true,
        showMilca: true,
        next: 22
    },
    {
        name: "",
        text: "Lumipas ang maraming taon. Ang pagmamahalan ninyo ay lalong tumibay sa hirap at ginhawa.",
        bg: "bg-beach",
        showMatt: true,
        showMilca: true,
        next: 23
    },
    {
        name: "Matt",
        text: "Milca, sa tabi ng dagat, sa ilalim ng paglubog ng araw... gusto kong itanong sa'yo. Maaari mo ba akong makasama habambuhay?",
        bg: "bg-beach",
        showMatt: true,
        showMilca: true,
        next: 24
    },
    {
        name: "Milca",
        text: "Oo, Matt! Walang pag-aalinlangan. Ikaw lang ang mamahalin ko magpakailanman.",
        bg: "bg-beach",
        showMatt: true,
        showMilca: true,
        next: "end_happy"
    }
];

// --------------------------
// Game Functions
// --------------------------

// Start Game from Splash
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && splashScreen.classList.contains('hidden') === false) {
        splashScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        showStep(0);
    }
});

function showStep(step) {
    if (typeof step === 'string') {
        showEnding(step);
        return;
    }

    const data = story[step];
    if (!data) return;

    // Update Background
    background.className = data.bg;

    // Update Characters
    charMatt.classList.toggle('hidden', !data.showMatt);
    charMilca.classList.toggle('hidden', !data.showMilca);

    // Update Dialog
    charNameBox.textContent = data.name;
    dialogText.textContent = data.text;

    // Hide Choices
    choicesBox.classList.add('hidden');

    // Show Next or Choices
    if (data.choices) {
        showChoices(data.choices);
    } else if (data.next !== undefined) {
        dialogText.onclick = () => showStep(data.next);
    }

    currentStep = step;
}

function showChoices(options) {
    choicesBox.innerHTML = "";
    choicesBox.classList.remove('hidden');
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "choice";
        btn.textContent = opt.text;
        btn.onclick = () => {
            choicesBox.classList.add('hidden');
            showStep(opt.go);
        };
        choicesBox.appendChild(btn);
    });
}

function showEnding(type) {
    endingScreen.classList.remove('hidden');
    gameContainer.style.pointerEvents = "none";

    if (type === "end_sad") {
        endingTitle.textContent = "WAKAS NG KWENTO";
        endingText.innerHTML = `
            Ang araw na iyon ay naging pinakamasakit sa buhay ni Matt.<br><br>
            Hindi na muling nakausap si Milca. Ang kanyang pagmamahal ay naging alaala na lamang.<br>
            Sa bawat paglubog ng araw, laging naaalala niya ang babaeng minahal niya ngunit hindi niya naprotektahan.<br><br>
            <em>Ang pagkakataon ay dumadaan lamang minsan. Huwag hayaang mawala bago pa man masabing mahal mo siya.</em>
        `;
    } else if (type === "end_happy") {
        endingTitle.textContent = "MASAYANG WAKAS";
        endingText.innerHTML = `
            Sa ilalim ng magandang paglubog ng araw sa tabi ng dagat, nagpalitan ng pangako sina Matt at Milca.<br><br>
            Ikinasal sila at namuhay nang masaya. Ang kanilang pagmamahalan ay naging patunay na ang pag-ibig na pinaghahandaan ay nagbubunga ng ligaya.<br>
            Ang paaralan, gym, at Jollibee ay mananatiling alaala ng simula ng kanilang walang hanggang pagmamahalan.<br><br>
            <em>Ang tunay na pag-ibig ay hinihintay, pinag-iisipan, at pinahahalagahan.</em>
        `;
    }
}
