import ratelimit from "../config/upstash.js"


const rateLimiter = async (req, res, next) => {

    try {
        const { success } = await ratelimit.limit("my-rate-limit");

        if(!success) {
            return res.status(429).json({
                message: "Beaucoup trop de requêtes, Réessayez plus tard!"
            });
        }

        next();
    } catch (error) {
        console.log("Erreur de Limite", error);
        next(error);
    }
}

export default rateLimiter