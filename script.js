// Part 2: JavaScript Functions — Scope, Parameters & Return Values
// Global scope: Track animation state
let isContinuousAnimation = false;

// Function to generate random color (demonstrates return value)
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color; // Returns a hex color code
}

// Function to update status message (demonstrates parameters)
function updateStatus(message, isError = false) {
    const statusElement = document.getElementById('statusMessage');
    statusElement.textContent = message;
    statusElement.style.color = isError ? '#dc3545' : '#555';
    statusElement.classList.add('fade');
    setTimeout(() => {
        statusElement.classList.remove('fade');
    }, 500);
}

// Function to toggle card flip (demonstrates local scope)
function toggleCardFlip(cardId) {
    const card = document.querySelector(`.card[data-id="${cardId}"]`);
    if (!card) {
        updateStatus('Error: Card not found!', true);
        return false; // Early return on error
    }
    // Local scope variable
    const isFlipped = card.classList.contains('flipped');
    card.classList.toggle('flipped');
    updateStatus(`Card ${cardId} ${isFlipped ? 'reset' : 'flipped'}!`);
    return true; // Return success status
}

// Part 3: Combining CSS Animations with JavaScript
// Function to toggle continuous animation for all cards
function toggleContinuousAnimation() {
    isContinuousAnimation = !isContinuousAnimation;
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.classList.toggle('pulse', isContinuousAnimation);
        // Dynamically change card-back color using JS
        const back = card.querySelector('.card-back');
        back.style.backgroundColor = isContinuousAnimation ? getRandomColor() : '#28a745';
    });
    
    const button = document.getElementById('toggleAnimationBtn');
    button.textContent = isContinuousAnimation ? 'Stop Animation' : 'Toggle Continuous Animation';
    updateStatus(isContinuousAnimation ? 'Continuous animation started!' : 'Continuous animation stopped!');
}

// Event listeners for DOM interaction
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const cardId = card.getAttribute('data-id');
        toggleCardFlip(cardId);
    });
});

document.getElementById('toggleAnimationBtn').addEventListener('click', toggleContinuousAnimation);

// Initialize status message
updateStatus('Click a card to flip it or toggle animation!');