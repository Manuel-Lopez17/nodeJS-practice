export const configLoader = () => {
  return {
    port: process.env.PORT,
    database: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
  }
}
