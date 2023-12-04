import React, { useCallback, useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { Input, ContainerInput, ContentInput, Error, InputIcon, Loading } from "./styles";
import Text from "../../Text"
import Icon from "../../Icon"

export default function Inputs(props) {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(props.name);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue || props.value;
  }, [defaultValue, props.value]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;

        return "";
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: "" });
          inputRef.current.value = "";
        }
      }
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback((text) => {
    if (inputRef.current) inputRef.current.value = text;
    if (props.onChangeText) onChangeText(text);
  }, [props.onChangeText, inputRef.current]);

  return (
    <ContainerInput error={error} {...props}>
      {props.label && <Text color="secondary" bold mb={5}>{props.label}</Text>}

      <ContentInput error={error} disabled={!!props.disabled || props.loading} {...props}>
        <Input
          ref={inputRef}
          error={error}
          icon={props.icon}
          onChangeText={handleChangeText}
          defaultValue={defaultValue || props.value}
          editable={!props.disabled && !props.loading}
          placeholder={props.loading ? "Carregando..." : props.placeholder}
          multiline={props.multiline}
          numberOfLines={props.multiline ? 5 : 1}
          {...props}
        />

        {!props.loading && error &&
          <InputIcon iconExists={props.icon}>
            <Icon
              pack="fontAwesome5"
              icon="info-circle"
              color="danger"
              size={16}
            />
          </InputIcon>
        }

        {!props.loading && props.icon &&
          <InputIcon onPress={props.icon.function} activeOpacity={0.8}>
            <Icon
              pack="fontAwesome5"
              icon={props.icon.name}
              color={error ? "danger" : props.icon.color || "primary"}
              size={17}
            />
          </InputIcon>
        }

        {props.loading && <Loading />}
      </ContentInput>
      {!!error && <Error>{error}</Error>}
      {!!props.message?.show && <Text bold color={"green"} size={11}>{props.message.text}</Text>}
    </ContainerInput>
  );
}
