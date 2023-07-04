import { Input } from "@chakra-ui/react";
import { type ChangeEvent } from "react";
type InputType = {
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export default function InputType({
  type,
  value = "",
  onChange,
  placeholder = "",
}: InputType) {
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  switch (type) {
    case "name":
      return (
        <Input placeholder={placeholder} value={value} onChange={handleName} />
      );

    default:
      return  <Input placeholder={placeholder} value={value} onChange={handleName} />;
  }
}
