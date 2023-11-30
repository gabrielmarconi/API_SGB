import * as crypto from 'crypto-js'
import { authCripto } from 'src/modules/auth/constants/jwt.constants';

export default function criptografar(texto: string): string {
    try {        
        if (texto && texto.trim() !== '')
            return crypto.AES.encrypt(texto, authCripto.secret).toString();
        else
            return '';
    } catch (err) {
        return '';
    }
}
