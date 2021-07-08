import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type = "create",
  title,
  setTitle,
  loading,
  handleSubmit,
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Enter the title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Poll" : "Update Poll"}
        loading={loading}
      />
    </form>
  );
};

export default PollForm;
