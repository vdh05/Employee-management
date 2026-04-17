import jwt from 'jsonwebtoken'

export const GenerateJwtTokenAndSetCookiesEmployee = (res, EMid, EMrole, ORGID) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Should print your secret
    const token = jwt.sign({ EMid, EMrole, ORGID }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("EMtoken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    })

    return token
}

export const GenerateJwtTokenAndSetCookiesHR = (res, HRid, HRrole, ORGID) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Should print your secret
    const token = jwt.sign({ HRid, HRrole, ORGID }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("HRtoken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    })

    return token
}