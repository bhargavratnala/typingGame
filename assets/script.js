var level = 1;
var score = 0;

var words = [
    ["apple", "orange", "banana", "grape", "mango"],
    ["car", "bike", "bus", "train", "plane", "ship", "boat"],
    ["cat", "dog", "cow", "horse", "sheep", "goat", "pig", "hen", "duck", "rabbit"],
    ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "zero", "eleven", "twelve"],
    ["red", "blue", "green", "yellow", "black", "white", "pink", "purple", "brown", "orange", "grey", "violet", "indigo"],
    ["sun", "moon", "star", "sky", "cloud", "rain", "snow", "wind", "storm", "thunder", "lightning", "rainbow", "hail", "fog", "mist"],
    ["tree", "flower", "grass", "leaf", "root", "branch", "stem", "seed", "fruit", "trunk", "bark", "wood", "wooden", "leafy", "greenery", "garden", "forest", "jungle"]
]

var enime = [];
var height = [];
var word = words[level - 1];

let speed = 1;

let enimies = document.getElementById("enimies");
let scoreBoard = document.getElementById("score");
let levelBoard = document.getElementById("level");
let player = document.getElementById("player");
let gametext = document.getElementById("gametext");

function setEnimies() {
    for (let i = 0; i < word.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = `<span class="enimeText">${word[i]}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path d="M373 138.6c-25.2 0-46.3-17.5-51.9-41l0 0c-30.6 4.3-54.2 30.7-54.2 62.4l0 .2c47.4 1.8 90.6 15.1 124.9 36.3c12.6-9.7 28.4-15.5 45.5-15.5c41.3 0 74.7 33.4 74.7 74.7c0 29.8-17.4 55.5-42.7 67.5c-2.4 86.8-97 156.6-213.2 156.6S45.5 410.1 43 323.4C17.6 311.5 0 285.7 0 255.7c0-41.3 33.4-74.7 74.7-74.7c17.2 0 33 5.8 45.7 15.6c34-21.1 76.8-34.4 123.7-36.4l0-.3c0-44.3 33.7-80.9 76.8-85.5C325.8 50.2 347.2 32 373 32c29.4 0 53.3 23.9 53.3 53.3s-23.9 53.3-53.3 53.3zM157.5 255.3c-20.9 0-38.9 20.8-40.2 47.9s17.1 38.1 38 38.1s36.6-9.8 37.8-36.9s-14.7-49.1-35.7-49.1zM395 303.1c-1.2-27.1-19.2-47.9-40.2-47.9s-36.9 22-35.7 49.1c1.2 27.1 16.9 36.9 37.8 36.9s39.3-11 38-38.1zm-60.1 70.8c1.5-3.6-1-7.7-4.9-8.1c-23-2.3-47.9-3.6-73.8-3.6s-50.8 1.3-73.8 3.6c-3.9 .4-6.4 4.5-4.9 8.1c12.9 30.8 43.3 52.4 78.7 52.4s65.8-21.6 78.7-52.4z"/>
                        </svg>`;
        div.classList.add("enime");
        let temp = Math.random() * 50;
        div.style.top = `${temp}px`;
        height.push(temp);
        div.style.left = `${Math.random() * 80}%`;
        enimies.appendChild(div);
        enime.push(div);
    }
}

let selectedword = null;
let selectedIndex = null;
let totalshoots = 0;
let totalhits = 0;

window.addEventListener("keydown", (e) => {
    if(gameend){
        return;
    }
    if (selectedword){
        if (e.key == selectedword[0]) {
            totalhits++;
            selectedword = selectedword.slice(1);
            enime[selectedIndex].children[0].innerHTML = selectedword;
            if (selectedword.length == 0) {
                word.splice(selectedIndex, 1);
                enime[selectedIndex].remove();
                enime.splice(selectedIndex, 1);
                selectedword = null;
                selectedIndex = null;
            }
            if(word.length == 0){
                level++;
                score += Math.floor((level * 10) * (totalhits / totalshoots));
                scoreBoard.innerHTML = `${score}`;
                levelBoard.innerHTML = `${level}`;
                word = words[level - 1];
                height = [];
                speed *= 1.3;
                gametext.classList.remove("closetext");
                setTimeout(() => {
                    gametext.classList.add("closetext");
                    setEnimies();
                }, 2000);
            }
        }
    }
    else {
        for (let i = 0; i < word.length; i++) {
            if (e.key == word[i][0]) {
                totalhits++;
                selectedword = word[i].slice(1);
                selectedIndex = i;
                enime[i].style.zIndex = "100";
                enime[i].children[0].style.color = "red";
                enime[i].children[0].innerHTML = selectedword;
                break;
            }
        }
    }
    totalshoots++;
});

let gameend = false;
let endHeight = window.innerHeight - 100;
console.log(endHeight);

let endline = document.getElementById("endline");
endline.style.top = `${endHeight}px`;

function moveEnimies() {
    for (let i = 0; i < enime.length; i++) {
        enime[i].style.top = `${height[i] + speed}px`;
        height[i] += speed;
        if(height[i] > endHeight - 50){
            clearInterval(intervel);
            gameend = true;
            gametext.innerHTML += `<br>Game Over<br>Accuracy: ${Math.floor((totalhits / totalshoots) * 100)}%`;
            gametext.classList.remove("closetext");
        }
    }
}

var intervel;

setTimeout(() => {
    gametext.classList.add("closetext");
    setEnimies();
    intervel = setInterval(moveEnimies, 100);
}, 3000);