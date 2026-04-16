import jwt from 'jsonwebtoken'

export const VerifyEmployeeToken = (req, res, next) => {
    console.log("[DEBUG] Cookies:", req.cookies);
    const token = req.cookies.EMtoken
    if (!token) {
        console.log("[DEBUG] No EMtoken cookie found");
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin : true })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("[DEBUG] Decoded JWT:", decoded);
        if (!decoded) {
            res.clearCookie("EMtoken")
            console.log("[DEBUG] JWT decode failed");
            return res.status(403).json({ success: false, message: "unauthenticated employee", gologin : true }) 
        }
        req.EMid = decoded.EMid
        req.EMrole = decoded.EMrole
        req.ORGID = decoded.ORGID
        next()
    } catch (error) {
        console.log("[DEBUG] JWT verification error:", error);
        return res.status(500).json({ success: false, message: "internal server error", error: error }) 
    }
}

export const VerifyhHRToken = (req, res, next) => {
    const token = req.cookies.HRtoken
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin : true }) 
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        if (!decoded) {
            res.clearCookie("HRtoken")
            return res.status(403).json({ success: false, message: "unauthenticated employee", gologin : true })
        }
        req.HRid = decoded.HRid
        req.ORGID = decoded.ORGID
        req.Role = decoded.HRrole
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error", error: error }) 
    }
}