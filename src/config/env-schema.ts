import * as Joi from 'joi'

export const envSchema = Joi.object({
  PORT: Joi.string().required().default(3000),
  API_KEY: Joi.string().required(),
})
