// Access global variable exposed by IIFE build
const { validate, format } = window.UkVehicleReg;

const input = document.getElementById('plateInput');
const resultDiv = document.getElementById('result');
const statusTitle = document.getElementById('statusTitle');
const formattedDisplay = document.getElementById('formattedDisplay');
const metaInfo = document.getElementById('metaInfo');

input.addEventListener('input', () => {
  const value = input.value;
  if (!value.trim()) {
    resultDiv.style.display = 'none';
    return;
  }

  const validation = validate(value);
  const formatted = format(value);

  resultDiv.style.display = 'block';
  resultDiv.className = 'result ' + (validation.isValid ? 'valid' : 'invalid');

  if (validation.isValid) {
    statusTitle.textContent = '✅ Valid Registration';
    formattedDisplay.textContent = `Formatted: ${formatted}`;
    metaInfo.innerHTML = `
      <strong>Format Type:</strong> ${validation.format}<br>
    `;
  } else {
    statusTitle.textContent = '❌ Invalid Registration';
    formattedDisplay.textContent = `Input: ${value.toUpperCase()}`;
    metaInfo.innerHTML = `
      <strong>Errors:</strong>
      <ul>
        ${validation.errors.map(e => `<li>${e}</li>`).join('')}
      </ul>
    `;
  }
});
