//@ts-ignore
import { Schema } from "joi";

export const validate = (schema: Schema, request: any) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw result.error;
  } else {
    return result.value;
  }
};
