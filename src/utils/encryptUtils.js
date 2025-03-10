import JSEncrypt from 'jsencrypt';

const publicKey =
    `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5q3woy8E+mfX7zlyX7XL
W4RlHF6RIcjJJyTayqhQfn5G1uA4HOsUlWeNpFk+0d8Id8J8HiWuCYP/AGf0y0bF
zU2q2IlME/BtT6qPPHhEx9Kiddu5wU54qFdxIYBKrjFi/VjNRAgDVJ1+AE36z4nI
SDvbXOlP7Ynhq1OHxVMRfTn+xcQPoXRWVJMX1DG1XUcLMJ+wAR/SfL4TfKm42o5u
B0xTkEKSxcZH63/pcasNtyyLlwfy3SNq/BWmiR59MyE1m54wHDVnR84FusDpUg3K
4LDX24u8nMF0/5/J0FEonbw+es6fXi8FPsG+q4ZoXLrPdJf5PHqzVgF9ChUsCQuB
cQIDAQAB
-----END PUBLIC KEY-----`;

const encryptor = new JSEncrypt();
encryptor.setPublicKey(publicKey);

export const encrypt = (plainText) => {
    try {
        return encryptor.encrypt(plainText);
    } catch (e) {
        console.error("Encrypt Error:", e);
        alert("요청이 유효하지 않습니다. 다시 시도해주세요.");
    }
}
