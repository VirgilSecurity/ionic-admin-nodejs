/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { removeWhitespace } from '../../src/saml/xml-utils';

describe('removeWhitespace', () => {
  test('removes whitespace at the beginning', () => {
    const xml = `
    <library><book><title>Harry Potter</title></book></library>`;
    const actual = removeWhitespace(xml);
    const expected = '<library><book><title>Harry Potter</title></book></library>';

    expect(actual).toEqual(expected);
  });

  test('removes whitespace at the end', () => {
    const xml = `<library><book><title>Harry Potter</title></book></library>
    `;
    const actual = removeWhitespace(xml);
    const expected = '<library><book><title>Harry Potter</title></book></library>';

    expect(actual).toEqual(expected);
  });

  test('removes whitespace between tags', () => {
    const xml = `
    <library>
      <book>

        <title>Harry Potter</title>

      </book>
    </library>
    `;

    const actual = removeWhitespace(xml);
    const expected = '<library><book><title>Harry Potter</title></book></library>';

    expect(actual).toEqual(expected);
  });
});
