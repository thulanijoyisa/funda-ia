import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon('postgresql://neondb_owner:LBPubr1p4NVC@ep-old-sunset-a2mf2tvp.eu-central-1.aws.neon.tech/funda-ai-generator?sslmode=require');
export const db = drizzle(sql);
