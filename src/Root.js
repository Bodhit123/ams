import React, {useState, useCallback } from "react";

const Root = () => {
  const [checked, setChecked] = useState();
  const change = useCallback((e) => setChecked(e.target.checked), []);
  return <input type="checkbox" onChange={(e) => change(e)} />;
};

export default Root;
