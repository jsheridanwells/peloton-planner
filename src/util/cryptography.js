import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import dayjs from 'dayjs';

dotenv.config();

const algorithm = 'aes-256-cbc';

export function createDeleteRequest(uid) {
    const key = crypto.randomBytes(16).toString('base64');
    const keyHash = hashKey(key);
    const iv = getIv();
    const expires = dayjs().add(10*60*1000).format(); // expires in 10 minutes
    const deleteRequestObj = { uid, expires };
    const cipher = crypto.createCipheriv('aes256', keyHash, iv);
    let encrypted = cipher.update(JSON.stringify(deleteRequestObj), 'binary', 'hex');
    encrypted = [encrypted, cipher.final('hex')].join('');
    return { encrypted, key: key.toString('hex') };
}

export function verifyDeleteRequest(uid, encryption, key) {
    return decryptUserObject(encryption, key);
}

function hashKey(key) {
    return crypto
        .createHash('sha256')
        .update(key)
        .digest();
}

function getIv() {
    const secret = process.env.APP_NONCE_SECRET;
    const resizedIv = Buffer.allocUnsafe(16);
    const iv = crypto
        .createHash('sha256')
        .update(secret)
        .digest();
    iv.copy(resizedIv);
    return resizedIv;
}

function decryptUserObject(encrypted, key) {
    try {
        const keyHash = hashKey(key);
        const iv = getIv();
        const decipher = crypto.createDecipheriv('aes256', keyHash, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'binary');
        decrypted = [decrypted, decipher.final('binary')].join('');
        return JSON.parse(decrypted);
    }
    catch(err) {
        console.error('Error::: ', err);
        return null;
    }
}
