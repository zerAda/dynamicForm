import React, { useState } from "react";
import { Button } from "@strapi/design-system/Button";
import DynamicForm from "../DynamicForm";
import zformsConfig from "../../zformsConfig";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";

const ZFormsButton = () => {
  // On récupère le content type courant depuis le Content Manager
  const { contentType, initialData } = useCMEditViewDataManager();
  const currentUid = contentType.uid;
  const config = zformsConfig[currentUid];
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!config) {
    return null;
  }

  const recordId = initialData.id;

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} variant="secondary">
        Exécuter Action ZForms
      </Button>
      {isModalOpen && (
        <DynamicForm
          formSchemaId={config.formSchemaId}
          endpoint={config.endpoint}
          recordId={recordId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ZFormsButton;
