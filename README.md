# Random Password Generator Website

## **Description**

A basic random password generator website.<br>
Plain HTML, JS, CSS static website using custom Web Components.<br>
Please note that this is a learning project, the generated password is not guaranteed to be stong and secure. Use at your own discretion.

## **Features**
- Specify password length
- Include or exclude uppercase/lowercase letters, numbers and special characters
- Copy generated password to clipboard

## **Usage**

You can use the `generatePassword` function to generate a password:

```javascript
function generatePassword(length, includeUpper, includeLower, includeNumbers, includeSpecial)
```

This project uses custom Web Components like `custom-slider` and `custom-checkbox` for better user interface.
They are defined respectively in `customSlider.js` and `customCheckbox.js`. Here is how to use them along with there valid attributes:<br>
```html
<custom-slider min="8" max="50" value="12"></custom-slider>
```
- `min` (optional): The lowest value in the range permitted. The default is 8.
- `max` (optional): The greatest value in the range permitted. The default is 50.
- `value` (optional): The selected value in the range permitted. The default is 12.

```html
<custom-checkbox value="ABC"></custom-checkbox>
```
- `value` (required): The value assigned to the checkbox and its label.