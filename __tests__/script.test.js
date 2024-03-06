const {getPassword, validateParams} = require('../src/script.js');

const PASSWORD = 'password';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ password: PASSWORD }),
  })
);

const paramValidationTests = [
  ['notANumber', false, false, 'Length must be a number between 8 and 50'],
  [7, false, false, 'Length must be a number between 8 and 50'],
  [51, false, false, 'Length must be a number between 8 and 50'],
  [10, 'notABoolean', false, 'exclude_numbers must be a boolean'],
  [10, false, 'notABoolean', 'exclude_special_chars must be a boolean'],
];

describe('validateParams', () => {
  paramValidationTests.forEach(([length, excludeNumbers, excludeSpecialChars, expectedError]) => {
    it(`should throw "${expectedError}" for params (${length}, ${excludeNumbers}, ${excludeSpecialChars})`, () => {
      expect(() => validateParams(length, excludeNumbers, excludeSpecialChars)).toThrow(expectedError);
    });
  });

  it('should not throw an error if all parameters are valid', () => {
    expect(() => validateParams(10, true, true)).not.toThrow();
  });
});

let result;
describe('getPassword', () => {
  beforeEach(async () => {
    fetch.mockClear();
    result = await getPassword(8, true, true);
  });

  it('should fetch with correct parameters and return the response', async () => {
    expect(fetch).toHaveBeenCalledWith(
      'https://api.api-ninjas.com/v1/passwordgenerator?length=8&exclude_numbers=true&exclude_special_chars=true', {
      method: 'GET',
      headers: {
        'X-Api-key': process.env.API_KEY,
      },
    });
    expect(result).toEqual({ password: PASSWORD });
  });

  describe('when promise is rejected or failed', () => {
    beforeEach(async () => {
      fetch.mockClear();
    });
    it('should throw an error if the fetch response is not ok', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({}),
        }));
        await expect(getPassword(8,true,true)).rejects.toThrow('HTTP error! status: 500');
      });

      it('should throw an error if parameters are invalid', async () => {
        try {
          await getPassword(5,true,true);
        } catch (error) {
          expect(error).toEqual(new Error('Length must be a number between 8 and 50'));
        }
      });
  });

});