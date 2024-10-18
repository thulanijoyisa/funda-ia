/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
     // url: process.env.URL,
      url: 'postgresql://neondb_owner:LBPubr1p4NVC@ep-old-sunset-a2mf2tvp.eu-central-1.aws.neon.tech/funda-ai-generator?sslmode=require'
    }
  };