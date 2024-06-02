// InputType Enum
export enum InputType {
  TEXT = "text",
  NUMBER = "number",
  CHECKBOX = "checkbox",
  SELECT = "select",
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface Input {
  type: InputType;
  label: string;
  labelAsHTML?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  defaultValue?: string;
  id: string;
}

export interface InputGroup {
  groupName: string;
  groupDescription: string;
  separateWithLine?: boolean;
  width?: string;
  inputs: Input[];
}

export interface SettingsPageOptions {
  title: string;
  description: string;
  shouldStoreData?: boolean;
  inputGroups: InputGroup[];
}
