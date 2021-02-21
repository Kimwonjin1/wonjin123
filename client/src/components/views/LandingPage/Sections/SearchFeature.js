import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState("");

  const searchHandler = (event) => {
    setSearchTerm(event.currentTarget.value);
    props.refreshFucntion(event.currentTarget.value);
  };

  return (
    <div>
      <Search
        onChange={searchHandler}
        placeholder="input search text"
        style={{
          width: 200,
        }}
        value={SearchTerm}
      />
    </div>
  );
}

export default SearchFeature;
