import React from 'react';
import {Col, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import PropTypes from 'prop-types';

const FormElement = props => {
  let inputChildren = null;

  if(props.type === 'select'){
    const options = [
      {id: '', title: 'Please select ' + props.title + ' from the list!'},
      ...props.options
    ];

    inputChildren = options.map(option => <option key={option.id} value={option.id}>{option.title}</option>)
  }

  return (
    <FormGroup row>
      <Label sm={2} for={props.propertyName}><b>{props.title}</b></Label>
      <Col sm={10}>
        <Input
          invalid={!!props.error}
          id={props.propertyName}
          name={props.propertyName}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          // placeholder={"Please enter your " + props.propertyName}
          children={inputChildren}
        />
        <FormFeedback>{props.error}</FormFeedback>
      </Col>
    </FormGroup>
  );
};

FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default FormElement;