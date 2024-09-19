import z from "zod";

const envSchema = z.object({
  BACKEND_BASE_URL: z.string(),
});

export default envSchema.parse({
  BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
});
