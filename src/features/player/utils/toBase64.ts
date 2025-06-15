/**
 * Base64 encoding/decoding implementation without btoa/atob or Buffer
 * Handles Unicode characters properly by converting to UTF-8 bytes first
 */

// Base64 character set
const BASE64_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * Convert a string to UTF-8 byte array
 * @param str - Input string
 * @returns Array of UTF-8 bytes
 */
function stringToUtf8Bytes(str: string): number[] {
  const bytes: number[] = [];

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);

    if (charCode < 0x80) {
      // 1-byte character (ASCII)
      bytes.push(charCode);
    } else if (charCode < 0x800) {
      // 2-byte character
      bytes.push(0xc0 | (charCode >> 6));
      bytes.push(0x80 | (charCode & 0x3f));
    } else if (charCode < 0xd800 || charCode >= 0xe000) {
      // 3-byte character (not surrogate)
      bytes.push(0xe0 | (charCode >> 12));
      bytes.push(0x80 | ((charCode >> 6) & 0x3f));
      bytes.push(0x80 | (charCode & 0x3f));
    } else {
      // 4-byte character (surrogate pair)
      if (i + 1 < str.length) {
        const highSurrogate = charCode;
        const lowSurrogate = str.charCodeAt(++i);
        const codePoint =
          0x10000 + ((highSurrogate & 0x3ff) << 10) + (lowSurrogate & 0x3ff);

        bytes.push(0xf0 | (codePoint >> 18));
        bytes.push(0x80 | ((codePoint >> 12) & 0x3f));
        bytes.push(0x80 | ((codePoint >> 6) & 0x3f));
        bytes.push(0x80 | (codePoint & 0x3f));
      }
    }
  }

  return bytes;
}

/**
 * Convert UTF-8 byte array back to string
 * @param bytes - Array of UTF-8 bytes
 * @returns Decoded string
 */
export function utf8BytesToString(bytes: number[]): string {
  let result = '';
  let i = 0;

  while (i < bytes.length) {
    const byte1 = bytes[i++];

    if (byte1 < 0x80) {
      // 1-byte character
      result += String.fromCharCode(byte1);
    } else if ((byte1 & 0xe0) === 0xc0) {
      // 2-byte character
      const byte2 = bytes[i++];
      result += String.fromCharCode(((byte1 & 0x1f) << 6) | (byte2 & 0x3f));
    } else if ((byte1 & 0xf0) === 0xe0) {
      // 3-byte character
      const byte2 = bytes[i++];
      const byte3 = bytes[i++];
      result += String.fromCharCode(
        ((byte1 & 0x0f) << 12) | ((byte2 & 0x3f) << 6) | (byte3 & 0x3f),
      );
    } else if ((byte1 & 0xf8) === 0xf0) {
      // 4-byte character
      const byte2 = bytes[i++];
      const byte3 = bytes[i++];
      const byte4 = bytes[i++];
      const codePoint =
        ((byte1 & 0x07) << 18) |
        ((byte2 & 0x3f) << 12) |
        ((byte3 & 0x3f) << 6) |
        (byte4 & 0x3f);

      // Convert to surrogate pair
      const adjusted = codePoint - 0x10000;
      result += String.fromCharCode(0xd800 + (adjusted >> 10));
      result += String.fromCharCode(0xdc00 + (adjusted & 0x3ff));
    }
  }

  return result;
}

/**
 * Encode a string to base64
 * @param text - The text to encode
 * @returns Base64 encoded string
 */
export function encodeToBase64(text: string): string {
  const bytes = stringToUtf8Bytes(text);
  let result = '';

  // Process bytes in groups of 3
  for (let i = 0; i < bytes.length; i += 3) {
    const byte1 = bytes[i];
    const byte2 = bytes[i + 1] || 0;
    const byte3 = bytes[i + 2] || 0;

    // Combine 3 bytes into 24-bit number
    const combined = (byte1 << 16) | (byte2 << 8) | byte3;

    // Extract 4 6-bit values
    const char1 = BASE64_CHARS[(combined >> 18) & 0x3f];
    const char2 = BASE64_CHARS[(combined >> 12) & 0x3f];
    const char3 =
      i + 1 < bytes.length ? BASE64_CHARS[(combined >> 6) & 0x3f] : '=';
    const char4 = i + 2 < bytes.length ? BASE64_CHARS[combined & 0x3f] : '=';

    result += char1 + char2 + char3 + char4;
  }

  return result;
}