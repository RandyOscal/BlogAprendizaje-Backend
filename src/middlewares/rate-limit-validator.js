import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 20 * 60 * 1000,
    max: 100,
})

export default apiLimiter