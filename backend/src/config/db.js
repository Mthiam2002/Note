import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MONGODB Connecté avec succès")
    } catch (error) {
        console.error("Erreur lors de de la connexion à MONGOD", error);
        process.exit(1) // quitter avec erreur
    }
}