import React from 'react'
import { FormNummus, ContainerInput } from './styles'
import _ from 'lodash'

import Input from './input'
import Select from './select'
import Button from './button'
import InputToken from './input-token'
import InputPeriod from './period'
import Checkbox from './checkbox'

export default function Form(props) {
  return (
    <FormNummus ref={props.formRef} onSubmit={props.onSubmit}>
      <ContainerInput m={props.margin} flexRow={props.flexRow}>
        {_.map(props.inputs, (input, key) => !input.hide && (
          input.type === 'token' ? <InputToken key={key} {...input} />
          : input.type === 'select' ? <Select key={key} labelOut {...input} />
          : input.type === 'period' ? <InputPeriod key={key} {...input} />
          : input.type === 'checkbox' ? <Checkbox key={key} {...input} />
          : <Input key={key} secureTextEntry={input.type === 'password'} {...input} />
        ))}
      </ContainerInput>
      {_.map(props.buttons, (button, key) => !button.hide && 
        <Button 
          key={key} 
          analytics={{
            content: props.formRef?.current?.getData ? props.formRef.current.getData() : {}
          }}
          {...button} 
        /> 
      )}
    </FormNummus>
  );
}
