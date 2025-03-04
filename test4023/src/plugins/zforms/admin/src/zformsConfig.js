// zformsConfig.js
const zformsConfig = {
    "plugin::users-permissions.user": {
      formSchemaId: "2", // ID du formulaire pour "Ajouter Utilisateur"
      endpoint: "/api/users/create-from-form"
    },
    "api::test-record.test-record": {
      formSchemaId: "3", // ID du formulaire pour Test Record
      endpoint: "/api/test-records/execute-action"
    }
    // Ajoute d'autres mappings si nécessaire…
  };
  
  export default zformsConfig;
  