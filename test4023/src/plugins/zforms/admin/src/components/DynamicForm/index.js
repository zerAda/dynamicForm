import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { Button } from "@strapi/design-system/Button";
import { ModalLayout, ModalHeader, ModalBody, ModalFooter } from "@strapi/design-system/ModalLayout";
import { Typography } from "@strapi/design-system/Typography";

const DynamicForm = ({ formSchemaId, endpoint, recordId, onClose }) => {
  const [schema, setSchema] = useState(null);
  const [uischema, setUiSchema] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormSchema = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/form-schemas/${formSchemaId}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du schéma");
        }
        const result = await response.json();
        setSchema(result.data.attributes.schema);
        setUiSchema(result.data.attributes.uischema);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    if (formSchemaId) {
      fetchFormSchema();
    }
  }, [formSchemaId]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId, formData }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'exécution de l'action");
      }
      const result = await response.json();
      setSuccessMessage("Action exécutée avec succès !");
      setTimeout(() => {
        onClose();
        setSuccessMessage("");
        setFormData({});
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (error) {
    return <Typography variant="pi" textColor="danger">{error}</Typography>;
  }

  if (!schema || !uischema) {
    return <Typography>Chargement du formulaire...</Typography>;
  }

  return (
    <ModalLayout onClose={onClose} labelledBy="zforms-modal-title">
      <ModalHeader>
        <Typography variant="alpha" as="h2" id="zforms-modal-title">
          Remplir le formulaire
        </Typography>
      </ModalHeader>
      <ModalBody>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={formData}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setFormData(data)}
        />
        {successMessage && (
          <Typography variant="epsilon" style={{ marginTop: "1rem", color: "green" }}>
            {successMessage}
          </Typography>
        )}
      </ModalBody>
      <ModalFooter
        endActions={
          <Button onClick={handleSubmit} variant="success">
            Valider et exécuter
          </Button>
        }
      />
    </ModalLayout>
  );
};

export default DynamicForm;
