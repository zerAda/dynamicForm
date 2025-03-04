import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";

const DynamicForm = () => {
  // Schéma JSON pour l'ajout d'un enregistrement
  const schema = {
    type: "object",
    properties: {
      title: { type: "string", title: "Titre" },
      data: { type: "object", title: "Contenu" }
    },
    required: ["title", "data"]
  };

  // UI Schema pour structurer le formulaire
  const uischema = {
    type: "VerticalLayout",
    elements: [
      { type: "Control", scope: "#/properties/title" },
      { type: "Control", scope: "#/properties/data" }
    ]
  };

  const [formData, setFormData] = useState({});

  // Fonction pour ajouter l'enregistrement
  const handleAdd = async () => {
    const response = await fetch("http://localhost:1337/api/test-records/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const result = await response.json();
    console.log("Enregistrement ajouté :", result);
  };

  // Exemple de fonctions pour activer/désactiver (vous récupèrerez l'ID via une liste par la suite)
  const handleActivate = async (id) => {
    const response = await fetch(`http://localhost:1337/api/test-records/${id}/activate`, {
      method: "PUT"
    });
    const result = await response.json();
    console.log("Enregistrement activé :", result);
  };

  const handleDeactivate = async (id) => {
    const response = await fetch(`http://localhost:1337/api/test-records/${id}/deactivate`, {
      method: "PUT"
    });
    const result = await response.json();
    console.log("Enregistrement désactivé :", result);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Ajouter un enregistrement</h2>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={formData}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setFormData(data)}
      />
      <button onClick={handleAdd}>Ajouter</button>

      <hr style={{ margin: "2rem 0" }} />

      <h3>Actions sur l'enregistrement (exemple avec ID = 1)</h3>
      <button onClick={() => handleActivate(1)}>Activer</button>
      <button onClick={() => handleDeactivate(1)}>Désactiver</button>
    </div>
  );
};

export default DynamicForm;
