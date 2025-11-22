// Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const loader = document.getElementById('loader');
const resultCard = document.getElementById('resultCard');
const historyList = document.getElementById('historyList');

let currentFile = null;

// --- 1. Drag & Drop Logic ---
dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFile(e.dataTransfer.files[0]);
});

function handleFile(file) {
    if (file) {
        currentFile = file;
        dropZone.querySelector('h3').innerText = file.name;
        analyzeBtn.innerText = "Analyze Document";
        analyzeBtn.disabled = false;
        // Hide previous result
        resultCard.classList.add('hidden');
    }
}

// --- 2. Simulation Logic ---
function startAnalysis() {
    if (!currentFile) return;

    // UI Loading State
    analyzeBtn.disabled = true;
    analyzeBtn.innerText = "Processing AI Model...";
    loader.classList.remove('hidden');
    resultCard.classList.add('hidden');

    // SIMULATE Server Delay (2 seconds)
    setTimeout(() => {
        loader.classList.add('hidden');
        analyzeBtn.disabled = false;
        analyzeBtn.innerText = "Analyze Another File";

        // Randomly generate result (Replace this with Fetch API later)
        const isCrisis = Math.random() < 0.5;
        const confidence = (Math.random() * (98 - 70) + 70).toFixed(1);

        showResult(isCrisis, confidence);
        addToHistory(currentFile.name, isCrisis);
        
    }, 2000);
}

// --- 3. UI Updates ---
function showResult(isCrisis, confidence) {
    resultCard.classList.remove('hidden');
    resultCard.className = 'result-card'; // Reset classes

    const mainLabel = document.getElementById('mainLabel');
    const confLabel = document.getElementById('confLabel');

    if (isCrisis) {
        resultCard.classList.add('crisis');
        mainLabel.innerText = "CRISIS DETECTED";
        mainLabel.style.color = "#991b1b";
    } else {
        resultCard.classList.add('safe');
        mainLabel.innerText = "NON-CRISIS (SAFE)";
        mainLabel.style.color = "#065f46";
    }
    
    confLabel.innerText = `Confidence Score: ${confidence}%`;
}

function addToHistory(filename, isCrisis) {
    // Remove "empty state" text if it exists
    const emptyState = document.querySelector('.empty-state');
    if(emptyState) emptyState.remove();

    const li = document.createElement('li');
    const tag = isCrisis ? '<span class="tag c">[CRISIS]</span>' : '<span class="tag s">[SAFE]</span>';
    
    // Truncate filename if too long
    const shortName = filename.length > 15 ? filename.substring(0, 12) + "..." : filename;
    
    li.innerHTML = `${tag} ${shortName}`;
    historyList.prepend(li); // Add to top of list
}