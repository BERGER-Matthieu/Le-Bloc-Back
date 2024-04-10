import jwt from 'jsonwebtoken'

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

export function createAccessToken(payload, key) {
    try {
        const token = jwt.sign(payload, key);
        return token
    }
    catch (error) {
        throw error
    }
}