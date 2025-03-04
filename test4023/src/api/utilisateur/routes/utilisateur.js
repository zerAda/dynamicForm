'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/utilisateurs/create-from-form',
      handler: 'utilisateur.createUtilisateur',
      config: {
        auth: false // Adapter selon vos besoins de sécurité
      },
    },
  ],
};
