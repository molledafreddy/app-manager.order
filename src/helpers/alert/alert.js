import Alert from 'react-bootstrap/Alert';
import React from 'react';

function AlertComponent(props) {
  return (
    <>
      {/* {[
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          This is a {variant} alert—check it out!
        </Alert>
      ))} */}

      <Alert key={props.variant} variant={props.variant}>{props.text}</Alert>
      {/* <Alert key="danger" variant="danger">Usuario o contraseña incorrepto</Alert> */}
    </>
  );
}

export default AlertComponent;