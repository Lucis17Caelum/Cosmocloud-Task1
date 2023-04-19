import React, { useState } from "react";

const Field = ({ name, type, children, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [fieldName, setFieldName] = useState(name);

  // eslint-disable-next-line
  const handleUpdate = () => {
    onUpdate(fieldName, type, children);
    setEditing(false);
  };

  return (
    <div>
      <input
        type="text"
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
        disabled={!editing}
      />
      <select value={type} disabled={!editing}>
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
        <option value="object">Object</option>
      </select>
      {type === "object" && (
        <FieldList fields={children} onUpdate={onUpdate} onDelete={onDelete} />
      )}
      <button onClick={() => setEditing(!editing)}>
        {editing ? "Save" : "Edit"}
      </button>
      <button onClick={() => onDelete(name)}>Delete</button>
    </div>
  );
};

const FieldList = ({ fields, onUpdate, onDelete }) => {
  const handleUpdate = (name, type, children) => {
    const index = fields.findIndex((field) => field.name === name);
    fields[index] = { name, type, children };
    onUpdate([...fields]);
  };

  const handleDelete = (name) => {
    const index = fields.findIndex((field) => field.name === name);
    fields.splice(index, 1);
    onUpdate([...fields]);
  };

  return (
    <div>
      {fields.map((field) => (
        <Field
          key={field.name}
          {...field}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
      <button
        onClick={() =>
          onUpdate([...fields, { name: "", type: "string", children: [] }])
        }
      >
        Add Field
      </button>
    </div>
  );
};

const App = () => {
  const [fields, setFields] = useState([
    { name: "name", type: "string", children: [] },
    { name: "age", type: "number", children: [] },
    { name: "isMarried", type: "boolean", children: [] },
    {
      name: "address",
      type: "object",
      children: [
        { name: "street", type: "string", children: [] },
        { name: "city", type: "string", children: [] },
      ],
    },
  ]);

  const handleUpdate = (updatedFields) => {
    setFields(updatedFields);
  };

  const handleSave = () => {
    console.log(fields);
  };

  return (
    <div>
      <FieldList fields={fields} onUpdate={handleUpdate} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default App;
