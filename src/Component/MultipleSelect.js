import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { callApi } from "../Utitlies/callAPI";

const MultipleSelect = (props) => {
  const [tags, setTagsList] = useState([]);
  const [selected, setSelected] = useState([]);
  const { handleChange } = props;
  const getTags = async () => {
    const { metalist } = await callApi("/tag", "get");
    setTagsList(metalist);
    let options = [];
    metalist.forEach((item) => {
      options.push({ label: item.name, value: item._id });
    });
    setTagsList(options);
    console.log(metalist);
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    handleChange(selected);
  }, [selected]);

  return (
    <div>
      <label className="form-label">Tags</label>
      <MultiSelect
        options={tags}
        value={selected}
        onChange={setSelected}
        labelledBy="Select Tags"
      />
    </div>
  );
};

export default MultipleSelect;
