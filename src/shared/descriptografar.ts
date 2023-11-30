import * as crypto from 'crypto-js'
import { authCripto } from 'src/modules/auth/constants/jwt.constants';

export default function descriptografar(texto: string): string {
    try {
        if (texto && texto.trim() !== '') {            
            return crypto.AES.decrypt(texto, authCripto.secret).toString(crypto.enc.Utf8);
        }            
        else
            return '';
    } catch (err) {        
        return '';
    }
}