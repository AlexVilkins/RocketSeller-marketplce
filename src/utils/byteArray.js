function hexToByte(hex) {
  return parseInt(hex, 16);
}

export function stringToByteArray(str) {
  const byteArray = [];
  let i = 0;

  while (i < str.length) {
    if (str[i] === '\\' && str[i + 1] === 'x') {
      const hex = str.substr(i + 2, 2);
      byteArray.push(hexToByte(hex));
      i += 4;
    } else {
      byteArray.push(str.charCodeAt(i));
      i += 1;
    }
  }

  return new Uint8Array(byteArray);
}
