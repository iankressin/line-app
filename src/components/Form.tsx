import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Form, Item, Input, Label, Text } from 'native-base';

interface FormProps {
  fields: any[];
  action: Function;
  actionName: string;
}

const FormComponent = ({ fields, actionName, action }: FormProps) => {
  const [state, setState] = useState({});

  return (
    <Form>
      {fields.map((field, index) => (
        <Item floatingLabel key={index}>
          <Label>{field.name}</Label>

          {field.type === 'password' ? (
            <Input
              onChangeText={(value) =>
                setState({ ...state, [field.field]: value })
              }
              secureTextEntry={true}
            />
          ) : (
            <Input
              onChangeText={(value) =>
                setState({ ...state, [field.field]: value })
              }
            />
          )}
        </Item>
      ))}
      <Button block style={styles.button} onPress={() => action(state)}>
        <Text>{actionName}</Text>
      </Button>
    </Form>
  );
};

const styles = StyleSheet.create({
  button: { marginTop: 25 },
});

export default FormComponent;
