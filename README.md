# Random Password Generator Website

## **Description**

A basic random password generator website.<br>
It uses the API from [api-ninjas.com](https://api.api-ninjas.com) to generate the passwords.<br>
You can specify the length of the password and whether to exclude numbers or special characters. 

## **Installation**

1. Clone this repository: `git clone https://github.com/ChunHuynh/password-generator.git`
2. Install the dependencies: `npm install`
3. Create a `.env` file in the root directory of the project and add your own api-ninjas.com api key like so: `API_KEY=your-api-key-here`

## **Usage**

You can use the `getPassword` function to generate a password:

```javascript
getPassword(length, exclude_numbers, exclude_special_chars)
```
- `length` is the length of the password. It must be a number between 8 and 50.
- `exclude_numbers` is a boolean that determines whether to exclude numbers from the password.
- `exclude_special_chars` is a boolean that determines whether to exclude special characters `!@#$%^&*()` from the password.

## **Testing**

The tests are written with Jest. You can run them with the `npm test` command.