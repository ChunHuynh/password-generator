require('dotenv').config({ path: '../.env' });

/**
 * Validates the parameters for password generation.
 * @param {number} length - The length of the password.
 * @param {boolean} exclude_numbers - Whether to exclude numbers in the password.
 * @param {boolean} exclude_special_chars - Whether to exclude special characters in the password.
 * @throws Will throw an error if the length is not a number or not between 8 and 50.
 * @throws Will throw an error if exclude_numbers is not a boolean.
 * @throws Will throw an error if exclude_special_chars is not a boolean.
 */
function validateParams(length, exclude_numbers, exclude_special_chars) {
  if (typeof length !== 'number' || length < 8 || length > 50) {
    throw new Error('Length must be a number between 8 and 50');
  } 
  if (typeof exclude_numbers !== 'boolean') {
    throw new Error('exclude_numbers must be a boolean');
  } 
  if (typeof exclude_special_chars !== 'boolean') {
    throw new Error('exclude_special_chars must be a boolean');
  } 
}

/**
 * Generates a password.
 * @param {number} length - The length of the password.
 * @param {boolean} exclude_numbers - Whether to exclude numbers in the password.
 * @param {boolean} exclude_special_chars - Whether to exclude special characters in the password.
 * @returns {Promise<object>} A promise that resolves to the generated password.
 * @throws Will throw an error if unable to fetch data.
 */
async function getPassword(length, exclude_numbers, exclude_special_chars) {
  try {
    validateParams(length, exclude_numbers, exclude_special_chars);
    const response = await fetch('https://api.api-ninjas.com/v1/passwordgenerator?length=' + length + '&exclude_numbers=' + exclude_numbers + '&exclude_special_chars=' + exclude_special_chars, {
      method: 'GET',
      headers: {
        'X-Api-key': process.env.API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error('Unable to fetch data: ', error);
    throw error;
  }
}

module.exports = {
  getPassword,
  validateParams,
};
