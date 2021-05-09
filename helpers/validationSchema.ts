import joi from "joi";
export const registerSchema: joi.Schema = joi.object({
    username: joi.string().min(4).lowercase().required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).lowercase().required()
})

export const loginSchema: joi.Schema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).lowercase().required()
})

export const notesSchema: joi.Schema = joi.object({
    title: joi.string().required(),
    description: joi.string().lowercase()
})
