import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from './config/db.js';
import VeterinarioRoutes from "./routes/VeterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions={
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origen del request es permitido
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors( {origin: '*'}));

app.use("/api/veterinarios", VeterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;  

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});