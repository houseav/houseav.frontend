export default class SecurityEnDe {
  static ALGORITHM = import.meta.env.VITE_SEC_ALGORITHM;
  static HASH = import.meta.env.VITE_SEC_HASH;
  static KEY_SIZE = import.meta.env.VITE_SEC_KEY_SIZE;
  static ITERATION_COUNT = import.meta.env.VITE_SEC_ITERATION_COUNT;

  constructor() {
    this.textEncoder = new TextEncoder();
    this.textDecoder = new TextDecoder();
  }

  async generateKeyMaterial(password) {
    return crypto.subtle.importKey(
      "raw",
      this.textEncoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
  }

  async generateKey(keyMaterial, salt) {
    const algorithm = SecurityEnDe.ALGORITHM;
    const hash = SecurityEnDe.HASH;
    const iterationCount = 100000;
    const keySize = SecurityEnDe.KEY_SIZE;
    // prod
    // generateKey::: algorithm "AES-GCM", hash "SHA-256", iterationCount 100000, keySize "256"
    // dev
    // generateKey::: algorithm AES-GCM, hash SHA-256, iterationCount 100000, keySize 256

    console.log(
      `generateKey::: algorithm ${algorithm}, hash ${hash}, iterationCount ${iterationCount}, keySize ${keySize}`
    );

    if (!crypto.subtle || !crypto.subtle.deriveKey) {
      console.error("Web Crypto API is not supported in this browser.");
    }

    if (window.crypto && crypto.subtle) {
      console.log("SubtleCrypto is supported");
    } else {
      console.error("SubtleCrypto is not supported in this environment");
    }

    try {
      return crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: iterationCount,
          hash: hash,
        },
        keyMaterial,
        {
          name: algorithm,
          length: keySize,
        },
        true,
        ["encrypt", "decrypt"]
      );
    } catch (error) {
      console.error("Error occured:" + error);
    }
  }

  async encrypt(plaintext, password) {
    const data = this.textEncoder.encode(plaintext);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const keyMaterial = await this.generateKeyMaterial(password);
    console.log(
      `firstStep, keyMaterial: ${keyMaterial}, salt: ${salt}, data: ${data}`
    );
    const key = await this.generateKey(keyMaterial, salt);
    const algorithm = SecurityEnDe.ALGORITHM;
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: algorithm,
        iv,
      },
      key,
      data
    );

    const ciphertextBase64 = btoa(
      String.fromCharCode.apply(null, new Uint8Array(encryptedData))
    );
    const ivBase64 = btoa(String.fromCharCode.apply(null, iv));
    const saltBase64 = btoa(String.fromCharCode.apply(null, salt));

    return ciphertextBase64 + ":" + ivBase64 + ":" + saltBase64;
  }

  async decrypt(encryptedData, password) {
    const [ciphertextStr, ivStr, saltStr] = encryptedData.split(":");
    const ciphertext = Uint8Array.from(atob(ciphertextStr), (c) =>
      c.charCodeAt(0)
    );
    const iv = Uint8Array.from(atob(ivStr), (c) => c.charCodeAt(0));
    const salt = Uint8Array.from(atob(saltStr), (c) => c.charCodeAt(0));
    const algorithm = SecurityEnDe.ALGORITHM;
    const keyMaterial = await this.generateKeyMaterial(password);
    const key = await this.generateKey(keyMaterial, salt);

    const decryptedData = await crypto.subtle.decrypt(
      {
        name: algorithm,
        iv,
      },
      key,
      ciphertext
    );

    return this.textDecoder.decode(decryptedData);
  }

  async token() {
    const plaintext = import.meta.env.VITE_USER_QUEUE_REGISTRATION;
    const password = import.meta.env.VITE_USER_QUEUE_REGISTRATION_KEY;
    const encryptedData = await this.encrypt(plaintext, password);
    return { data: encryptedData };
  }

  async decryptToken(token) {
    const password = import.meta.env.VITE_USER_QUEUE_REGISTRATION_KEY;
    return await this.decrypt(token, password);
  }
}
