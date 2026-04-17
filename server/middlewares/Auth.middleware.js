import jwt from 'jsonwebtoken'

export const VerifyEmployeeToken = (req, res, next) => {
    console.log("[DEBUG] Cookies:", req.cookies);
    console.log("[DEBUG] Authorization Header:", req.headers.authorization);
    
    // Try to get token from cookies first, then from Authorization header
    let token = req.cookies.EMtoken
    
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7)
        }
    }
    
    if (!token) {
        console.log("[DEBUG] No EMtoken cookie or Authorization header found");
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
        console.log("[DEBUG] Auth successful - EMid:", req.EMid, "ORGID:", req.ORGID);
        next()
    } catch (error) {
        console.log("[DEBUG] JWT verification error:", error.message);
        res.clearCookie("EMtoken")
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin: true })
    }
}

export const VerifyhHRToken = (req, res, next) => {
    console.log("[DEBUG] Cookies:", req.cookies);
    console.log("[DEBUG] Authorization Header:", req.headers.authorization);
    
    // Try to get token from cookies first, then from Authorization header
    let token = req.cookies.HRtoken
    
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7)
        }
    }
    
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
        res.clearCookie("HRtoken")
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin: true })
    }
}