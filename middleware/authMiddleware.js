import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extraer el token del encabezado
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.veterinario = await Veterinario.findById(decoded.id).select(
        '-password -token -confirmado');

      
      return next();
    } catch (error) {
      console.error("Error al verificar el token: ", error);
      return res.status(403).json({ msg: 'Token no válido o inexistente' });
    }
  }

  if(!token){
    const error = new Error('Token no valido o inexistente');
    return res.status(403).json({msg: error.message});
  } 
  next();


};

export default checkAuth;
