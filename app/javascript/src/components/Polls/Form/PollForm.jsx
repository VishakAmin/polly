import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type = "create",
  title,
  setTitle,
  loading,
  setOptions,
  options,
  handleSubmit,
}) => {
  const handleOptionsChange = (e, index) => {
    const option = [...options];
    option[index].content = e.target.value;
    setOptions(option);
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        value={title}
        placeholder="Enter the title"
        onChange={e => setTitle(e.target.value)}
      />

      <div className="border-black">
        <label
          className="block text-sm font-medium
              leading-5 text-bb-gray-700 mt-12"
        >
          Options:
        </label>
        <Input
          label="Option 1"
          value={options[0].content}
          placeholder="Enter the option 1"
          onChange={e => handleOptionsChange(e, 0)}
        />
        <Input
          label="Option 2"
          value={options[1].content}
          placeholder="Enter the option 2"
          onChange={e => handleOptionsChange(e, 1)}
        />
        <Input
          value={options[2].content}
          label="Option 3"
          placeholder="Enter the option 3"
          onChange={e => handleOptionsChange(e, 2)}
        />
        <Input
          label="Option 4"
          value={options[3].content}
          placeholder="Enter the option 4"
          onChange={e => handleOptionsChange(e, 3)}
        />
      </div>

      <Button
        type="submit"
        buttonText={type === "create" ? "Create Poll" : "Update Poll"}
        loading={loading}
      />
    </form>
  );
};

export default PollForm;
