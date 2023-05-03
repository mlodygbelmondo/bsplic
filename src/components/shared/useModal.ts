import { useState } from "react";

export const useModal = (isOpen = false): [boolean, () => void] => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return [isVisible, toggleVisibility];
};
