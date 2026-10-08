
/* =========================================
   ELEMENTS
========================================= */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const startBtn = document.getElementById("startBtn");

const gameArea = document.getElementById("gameArea");
const progress = document.getElementById("progress");
const heartCount = document.getElementById("heartCount");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const finalResponse = document.getElementById("finalResponse");


/* =========================================
   VARIABLES
========================================= */

let heartsCollected = 0;
let gameStarted = false;


/* =========================================
   SCREEN NAVIGATION
========================================= */

function showScreen(number) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen) {
        screen.classList.remove("active");
    });

    const selectedScreen =
        document.getElementById("screen" + number);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (number === 2) {
        startGame();
    }
}


/* =========================================
   START EXPERIENCE
========================================= */

startBtn.addEventListener("click", function () {

    music.volume = 0.45;

    music.play()
        .then(function () {
            musicBtn.textContent = "🔊";
        })
        .catch(function () {
            musicBtn.textContent = "🔇";
        });

    showScreen(2);
});


/* =========================================
   MUSIC BUTTON
========================================= */

musicBtn.addEventListener("click", function () {

    if (music.paused) {

        music.play()
            .then(function () {
                musicBtn.textContent = "🔊";
            })
            .catch(function () {
                musicBtn.textContent = "🔇";
            });

    } else {

        music.pause();
        musicBtn.textContent = "🔇";
    }
});


/* =========================================
   START GAME
========================================= */

function startGame() {

    if (gameStarted) {
        return;
    }

    gameStarted = true;

    heartsCollected = 0;

    heartCount.textContent = "0";

    progress.style.width = "0%";

    gameArea.innerHTML = "";

    createHeart();
}


/* =========================================
   CREATE HEART
========================================= */

function createHeart() {

    if (heartsCollected >= 10) {
        finishGame();
        return;
    }

    const heart =
        document.createElement("div");

    heart.className = "game-heart";


    const heartTypes = [
        "❤️",
        "💗",
        "💖",
        "💕",
        "💓"
    ];


    const randomIndex =
        Math.floor(
            Math.random() * heartTypes.length
        );


    heart.textContent =
        heartTypes[randomIndex];


    const maxX =
        gameArea.clientWidth - 60;

    const maxY =
        gameArea.clientHeight - 60;


    const randomX =
        Math.random() *
        Math.max(maxX, 20);

    const randomY =
        Math.random() *
        Math.max(maxY, 20);


    heart.style.left =
        randomX + "px";

    heart.style.top =
        randomY + "px";


    heart.addEventListener("click", function () {

        heartsCollected++;


        heartCount.textContent =
            heartsCollected;


        progress.style.width =
            (heartsCollected * 10) + "%";


        createHeartBurst(heart);


        heart.remove();


        if (heartsCollected >= 10) {

            finishGame();

        } else {

            setTimeout(function () {
                createHeart();
            }, 250);

        }

    });


    gameArea.appendChild(heart);
}


/* =========================================
   HEART BURST
========================================= */

function createHeartBurst(heart) {

    const burst =
        document.createElement("div");


    burst.className =
        "heart-burst";


    burst.textContent =
        "✦";


    burst.style.left =
        heart.style.left;


    burst.style.top =
        heart.style.top;


    gameArea.appendChild(burst);


    setTimeout(function () {

        burst.remove();

    }, 600);
}


/* =========================================
   FINISH GAME
========================================= */

function finishGame() {

    gameStarted = false;

    gameArea.innerHTML = "";

    setTimeout(function () {

        showScreen(3);

    }, 700);
}


/* =========================================
   YES BUTTON
========================================= */

yesBtn.addEventListener("click", function () {

    finalResponse.textContent =
        "Maybe 8th-class me finally got the answer he was waiting for. ❤️";


    noBtn.style.display =
        "none";


    yesBtn.textContent =
        "You said YES ❤️";


    createHeartExplosion();
});


/* =========================================
   NO BUTTON
========================================= */

noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);

noBtn.addEventListener(
    "click",
    moveNoButton
);


function moveNoButton() {

    const maxX =
        window.innerWidth -
        noBtn.offsetWidth -
        20;


    const maxY =
        window.innerHeight -
        noBtn.offsetHeight -
        20;


    const x =
        Math.random() *
        Math.max(maxX, 20);


    const y =
        Math.random() *
        Math.max(maxY, 20);


    noBtn.style.position =
        "fixed";


    noBtn.style.left =
        x + "px";


    noBtn.style.top =
        y + "px";
}


/* =========================================
   HEART EXPLOSION
========================================= */

function createHeartExplosion() {

    const heartTypes = [
        "❤️",
        "💗",
        "💖",
        "💕",
        "💓",
        "✦"
    ];


    for (let i = 0; i < 35; i++) {

        const heart =
            document.createElement("div");


        const randomIndex =
            Math.floor(
                Math.random() *
                heartTypes.length
            );


        heart.textContent =
            heartTypes[randomIndex];


        heart.className =
            "explosion-heart";


        heart.style.left =
            "50%";


        heart.style.top =
            "50%";


        heart.style.fontSize =
            (15 + Math.random() * 20) +
            "px";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            100 +
            Math.random() *
            300;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        heart.style.setProperty(
            "--x",
            x + "px"
        );


        heart.style.setProperty(
            "--y",
            y + "px"
        );


        document.body.appendChild(
            heart
        );


        setTimeout(function () {

            heart.remove();

        }, 1700);
    }
}


