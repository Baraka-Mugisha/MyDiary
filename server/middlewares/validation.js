import Joi from 'joi';
// import hapiJoi from '@hapi/joi';

export const schema = {
    user_sign_up: Joi.object().keys({
        firstName: Joi.string().regex(/^\S[A-Za-z]{1,}$/).min(3).max(30).required(),
        lastName: Joi.string().regex(/^\S[A-Za-z]{1,}$/).min(3).max(30).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
        token: [Joi.string(), Joi.number()],
        is_admin: Joi.string().valid('true', 'false')

    }),
    user_sign_in: Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        token: [Joi.string(), Joi.number()],

    }),
    entries: Joi.object().keys({
        id: Joi.string().regex(/^[0-9 ]*$/).min(1).max(30),
        title: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).min(1).max(30).required(),
        description: Joi.string().min(1).max(1000).required(),
        entry_id: Joi.number().min(1).max(10),
    }),
    entryDelete: Joi.object().keys({
        id: Joi.string().regex(/^[0-9 ]*$/).min(1).max(30)
    }),
};