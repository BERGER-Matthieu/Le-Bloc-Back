import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const jwtKey = process.env.JWT_KEY;

export function checkPassword(password, confirm_password) {
    const rgNumber = new RegExp('[0-9]{1,}');
    const rgSpecial = new RegExp('[\.\\\-\$\/]{1,}');
    const rgCapital = new RegExp('[A-Z]{1,}');
    
    if (password != confirm_password) {
        throw "Passwords aren't matching";
    }

    if (password.length < 8 || password.length > 30){
        throw "Password must be at leats 8 characters long and at most 30";
    }

    if (!rgNumber.test(password)) {
        throw "Password must contain at least one number";
    }

    if (!rgSpecial.test(password)) {
        throw "Password must contain at least one special char (. \ / - or $)";
    }

    if (!rgCapital.test(password)) {
        throw "Password must contain at least one capital letter";
    }

    return "Everything seems to be ok";
}

export function createAccessToken(payload) {
    try {
        const token = jwt.sign(payload, jwtKey);
        return token
    }
    catch (error) {
        throw error
    }
}

export function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, jwtKey);
        return decoded;
    }
    catch (error) {
        throw error;
    }
}

// 48.88872639023972, 2.2809662147560688
export function getLoc(loc) {
    try{
        // check if the string is a geographical data
        const geoRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6},?\s*-?((1[0-7]|[1-9])?\d{1}|180)\.{1}\d{1,6}$/;
        
        if (geoRegex.test(loc)) {
            locTab = loc.split(",");
            for (var i = 0; i < locTab.length; i++) {
                locTab[i] = locTab[i].trim();
            }
            return locTab
        }else{
            throw "not a valid position"
        }
    }
    catch(error){
        throw error
    }
}