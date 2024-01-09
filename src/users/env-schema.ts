import * as Joi from 'joi'

export const envSchema = Joi.object({
  PORT: Joi.string().required().default(3000),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
})
