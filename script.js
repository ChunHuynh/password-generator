
String.prototype.shuffle = function () {
  let array = this.split('');
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

// Function that generate a random password given parameters
function generatePassword(length, includeUpper, includeLower, includeNumbers, includeSpecial) {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special_chars = '!@#$%^&*()_-+=<>?/{}~|';

  const charset = ((includeUpper ? uppercase : '') +
    (includeLower ? lowercase : '') +
    (includeNumbers ? numbers : '') +
    (includeSpecial ? special_chars : '')).shuffle();

  let password = '';
  const values = new Uint32Array(length);
  window.crypto.getRandomValues(values);

  // Ensure at least one character of each type is included
  let i = 0;
  password += (includeUpper) ? uppercase[values[i++] % uppercase.length] : '';
  password += (includeLower) ? lowercase[values[i++] % lowercase.length] : '';
  password += (includeNumbers) ? numbers[values[i++] % numbers.length] : '';
  password += (includeSpecial) ? special_chars[values[i++] % special_chars.length] : '';

  for (; i < length; i++) {
    password += charset[values[i] % charset.length];
  }

  return password;
}


// Function to handle the generation of the password
function handleGeneratePassword() {
  // Get only checked checkbox values
  const characterTypes = checkboxList
    .filter(checkbox => checkbox && checkbox.checked)
    .map(checkbox => checkbox.value);

  // Determine whether to include upper, lower, numbers and special characters
  const includeUpper = characterTypes.includes('ABC');
  const includeLower = characterTypes.includes('abc');
  const includeNumbers = characterTypes.includes('123');
  const includeSpecial = characterTypes.includes('#$&');

  const password = generatePassword(Number(slider.value), includeUpper, includeLower, includeNumbers, includeSpecial);

  // Display the password in the output element
  output.value = password;
}

// Function to copy password to clipboard
async function copyPassword() {
  try {
    if (window.isSecureContext && navigator.clipboard) {
      await navigator.clipboard.writeText(output.value);
    } else {
      unsecuredCopyToClipboard(output.value);
    }
    copy.textContent = 'Copied!';
    setTimeout(() => {
      copy.textContent = 'Copy';
    }, 500);
  } catch(error) {
    copy.textContent = 'Try again';
    setTimeout(() => {
      copy.textContent = 'Copy';
    }, 500);
    throw new Error(error);
  }  
}

// document.execCommand() is deprecated in favor of clipboard.writeText()
// clipboard only works in https environment (workaround in dev environment)
const unsecuredCopyToClipboard = (text) => { const input = document.createElement("input");  input.value=text; document.body.appendChild(input); input.select();  try{document.execCommand('copy')}catch(err){console.error('Unable to copy to clipboard',err)}document.body.removeChild(input)};

copy.addEventListener('click', copyPassword);

let slider, checkboxList,
    output = document.getElementById('passwordDisplay'),
    copyButton = document.getElementById('copy');

// Wait for all customElements to be defined
const elements = ['custom-slider', 'custom-checkbox'];
Promise.all(elements.map(e => customElements.whenDefined(e)))
  .then(() => {
    // Add event to slider
    slider = document.querySelector('custom-slider').shadowRoot.querySelector('input');
    slider.addEventListener('input', handleGeneratePassword);
    
    // Add event to all checkboxes
    const hostCheckboxes = document.querySelectorAll('custom-checkbox');
    checkboxList = Array.from(hostCheckboxes).map(host => host.shadowRoot.querySelector('input[type=checkbox]'));
    checkboxList.forEach((checkbox) => {
      checkbox.addEventListener('input', handleGeneratePassword);
    });

    window.onload = handleGeneratePassword();

  })
  .catch((error) => {
    console.error('Some customElements failed to define: ', error);
  });
