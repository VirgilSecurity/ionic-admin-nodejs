export const removeWhitespace = (xml: string): string =>
  xml
    .replace(/[\n|\r\n]/g, '')
    .replace(/>(\s*)</g, '><')
    .trim();
