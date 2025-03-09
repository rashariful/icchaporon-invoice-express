import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  courier: {
    api_key: process.env.RXCOURIER_API_KEY,
    url: process.env.RXCOURIER_BASE_URL,
    email: process.env.RXCOURIER_EMAIL,
    password: process.env.RXCOURIER_PASSWORD,
  },
};
