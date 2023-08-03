import { Input, Textarea } from "@chakra-ui/react";
import { type ChangeEvent } from "react";
type InputType = {
  type?: "number" | "textarea";
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  size?: string;
  height?: string;
  disabled?: boolean;
};

export default function InputType({
  type,
  value = "",
  size = "md",
  height = "auto",
  onChange,
  placeholder = "",
  disabled = false,
}: InputType) {
  const handleName = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  switch (type) {
    case "textarea":
      return (
        <Textarea
          disabled={disabled}
          size={size}
          minHeight={height}
          placeholder={placeholder}
          value={value ? value : ''}
          onChange={handleName}
        />
      );
    case "number":
      return (
        <Input
          disabled={disabled}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={handleName}
        />
      );
    default:
      return (
        <Input
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={handleName}
        />
      );
  }
}
