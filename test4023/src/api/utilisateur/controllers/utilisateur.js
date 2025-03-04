'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::utilisateur.utilisateur', ({ strapi }) => ({
  async createUtilisateur(ctx) {
    const { formData } = ctx.request.body;

    // Validation minimale – adapter selon vos besoins
    if (!formData.nom || !formData.prenom || !formData.email || !formData.password) {
      return ctx.throw(400, "Les champs nom, prénom, email et mot de passe sont requis.");
    }

    try {
      const newUser = await strapi.entityService.create('api::utilisateur.utilisateur', {
        data: {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          password: formData.password
        },
      });
      return ctx.send(newUser);
    } catch (error) {
      ctx.throw(500, error);
    }
  }
}));
