// Function to calculate perceived brightness of a color
function getPerceivedBrightness(hexColor) {
  // Remove the # if it's there
  hexColor = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  
  // Calculate perceived brightness using the formula:
  // (R * 299 + G * 587 + B * 114) / 1000
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// Function to determine text color based on background brightness
function getTextColor(bgColor) {
  const brightness = getPerceivedBrightness(bgColor);
  return brightness > 128 ? '#222222' : '#FFFFFF';
}

function updateColors() {
  const colors = {
    primary: document.getElementById('primary-text').value,
    accent: document.getElementById('accent-text').value,
    base: document.getElementById('base-text').value,
    tint1: document.getElementById('tint1-text').value,
    tint2: document.getElementById('tint2-text').value,
    text: document.getElementById('text-text').value
  };

  // Update color pickers
  Object.keys(colors).forEach(key => {
    document.getElementById(key).value = colors[key];
  });

  // Update preview
  document.querySelector('h1').style.color = colors.text;
  document.querySelector('p').style.color = colors.text;
  
  const getStartedBtn = document.getElementById('getStartedBtn');
  getStartedBtn.style.backgroundColor = colors.primary;
  // Dynamically set text color based on background color
  getStartedBtn.style.color = getTextColor(colors.primary);

  const learnMoreBtn = document.getElementById('learnMoreBtn');
  learnMoreBtn.style.color = colors.accent;
  learnMoreBtn.style.borderColor = colors.accent;

  // Update color squares
  document.querySelector('.primary-color').style.backgroundColor = colors.primary;
  document.querySelector('.accent-color').style.backgroundColor = colors.accent;
  document.querySelector('.tint1-color').style.backgroundColor = colors.tint1;
  document.querySelector('.tint2-color').style.backgroundColor = colors.tint2;
  document.querySelector('.text-color').style.backgroundColor = colors.text;
}

// Add event listeners
document.querySelectorAll('input[type="color"], input[type="text"]').forEach(input => {
  input.addEventListener('input', function() {
    if (this.type === 'text') {
      document.getElementById(this.id.replace('-text', '')).value = this.value;
    } else {
      document.getElementById(`${this.id}-text`).value = this.value.toUpperCase();
    }
    updateColors();
  });
});

// Initial update
updateColors();