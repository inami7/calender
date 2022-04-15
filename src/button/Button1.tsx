import { ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isFullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
};

export const Button1: VFC<Props> = (props) => {
  const {
    children,
    isFullWidth = false,
    disabled = false,
    isLoading = false,
    onClick
  } = props;

  return (
    <Button
      bg="teal.400"
      color="red"
      borderRadius="10px"
      isFullWidth={isFullWidth}
      backgroundColor=""
      disabled={disabled || isLoading}
      isLoading={isLoading}
      onClick={onClick}
      padding="0px 20px"
      width="auto"
      fontWeight="1000"
      border="none"
    >
      {children}
    </Button>
  );
};
