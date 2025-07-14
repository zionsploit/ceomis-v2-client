import { SessionData } from "@/types/utils";
import { createCipheriv, createDecipheriv, scryptSync } from 'node:crypto'


const password = "300ZPKM2R0STXN1PIS397PL6RXZH3BJG"
const algorithm = 'aes-192-cbc'
const salt = "DFPV7ZAKY17XV7Q6"
const iv = Buffer.alloc(16, 0);

export function cipher_session_data (session_data: SessionData): string {
    const json_data = JSON.stringify(session_data, null, 0);

     // Derive key from password
     // 24 came from 'aes192 which is 24 bytes (24 x 8 = 129 or 129 / 8 = 24 )
    const key = scryptSync(password, salt, 24);

    // Create cipher
    const cipher = createCipheriv(algorithm, key, iv)


    // Encrypt synchronously
    let encrypted = cipher.update(json_data, 'utf8', 'hex')
    encrypted += cipher.final("hex")

    return encrypted
}

export function decipher_session_data (cipher: string): string {

    const key = scryptSync(password, salt, 24)

    const decipher = createDecipheriv(algorithm, key, iv)

    let decrypted = ""
    decipher.on("readable", () => {
        let chunk;

        while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString('utf8')
        }
    }) 

    decipher.write(cipher, 'hex')
    decipher.end()
    
    return decrypted
}