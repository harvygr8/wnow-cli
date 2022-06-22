const { isValidCoords } = require('../utils');


test('Check if string co-ordinates are numeric', () => {
  expect(isValidCoords('1', '2')).toBeTruthy();
  expect(isValidCoords('-56', '-40')).toBeTruthy();
});

test('Character and regular strings should not be accepted',()=>{
    expect(isValidCoords('a', 'b')).toBeFalsy();
    expect(isValidCoords('12a', '3b')).toBeFalsy();
});

test('Special characters should not be accepted',()=>{
    expect(isValidCoords('%!', '//*')).toBeFalsy();
});

test('Check if string co-ordinates are within acceptable boundaries', () => {
  expect(isValidCoords('12.4112', '422.1223')).toBeFalsy();
  expect(isValidCoords('-90.4112', '12')).toBeFalsy();
  expect(isValidCoords('-90.4112', '180.222')).toBeFalsy();
  expect(isValidCoords('-90', '180')).toBeTruthy();
});
