import React from 'react'
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({bgColor,children}) => {
  return (
    <Alert
      variant={variant}
      style={{
        fontSize: 18,
        backgroundColor: {bgColor},
        border: "1pd solid #f5c2c7",
        color: "#842029",
      }}
    >
      <strong>{children}</strong>
    </Alert>
  );
}

export default ErrorMessage;