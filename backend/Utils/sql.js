import sql from "mssql/msnodesqlv8.js"
import 'dotenv/config';


const sqlConfig = {
  server: "127.0.0.1",
  database: "API_DB",
  options: {
    trustedConnection: true, // Set to true if using Windows Authentication
    trustServerCertificate: true, // Set to true if using self-signed certificates
  },
  driver: "msnodesqlv8", // Required if using Windows Authentication
};

  const sqlConnect = async () => {
    try {
      return await sql.connect(sqlConfig); 
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
      throw error; 
    } 
  };
export {sqlConnect, sql};