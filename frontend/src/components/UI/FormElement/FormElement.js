import React from 'react';
import {Col, FormFeedback, FormGroup, Input, Label} from 'reactstrap';

const FormElement = props => {
  return (
    <FormGroup row>
      <Label sm={2} for={props.propertyName}><b>{props.propertyName.toUpperCase()}</b></Label>
      <Col sm={10}>
        <Input
          invalid={!!props.error}
          id={props.propertyName}
          name={props.propertyName}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          placeholder={"Please enter your " + props.propertyName}
        />
        <FormFeedback>{props.error}</FormFeedback>
      </Col>
    </FormGroup>
  );
};

export default FormElement;