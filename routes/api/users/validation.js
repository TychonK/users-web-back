import Joi from "joi";

const idSchema = Joi.object({
    id: Joi.array().items(Joi.string().min(24).max(24)).required()
})

export const validateId = async (req, res, next) => {
    try {
        const value = await idSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({ message: err.message.replace(/"/g, '') })
    }
    next()
}