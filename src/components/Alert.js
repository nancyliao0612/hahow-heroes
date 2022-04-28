import React, { useEffect } from "react";
import styled from "styled-components";

const Alert = ({ msg, type, removeAlert, isSaveClicked }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isSaveClicked]);

  return (
    <>
      <p className={`alert alert-${type}`}>{msg}</p>
    </>
  );
};

export default Alert;
