'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::test.test', ({ strapi }) => ({
    // Ajout d'un nouvel enregistrement
    async addRecord(ctx) {
        try {
            const { title, data } = ctx.request.body;
            if (!title || !data) {
                return ctx.throw(400, "Les champs 'title' et 'data' sont obligatoires.");
            }
            const newRecord = await strapi.entityService.create('api::test.test', {
                data: { title, data, isActive: false },
            });
            return ctx.send(newRecord);
        }
        catch (error) {
            ctx.throw(500, error);
        }
    },
    // Activation d'un enregistrement
    async activateRecord(ctx) {
        try {
            const { id } = ctx.params;
            const updatedRecord = await strapi.entityService.update('api::test.test', id, {
                data: { isActive: true },
            });
            return ctx.send(updatedRecord);
        }
        catch (error) {
            ctx.throw(500, error);
        }
    },
    // Désactivation d'un enregistrement
    async deactivateRecord(ctx) {
        try {
            const { id } = ctx.params;
            const updatedRecord = await strapi.entityService.update('api::test.test', id, {
                data: { isActive: false },
            });
            return ctx.send(updatedRecord);
        }
        catch (error) {
            ctx.throw(500, error);
        }
    },
}));
