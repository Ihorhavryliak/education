import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from "@chakra-ui/react";

interface ModalWindowType {
  isOpen: boolean;
  setIsOpen: (num: number) => void;
  children: JSX.Element;
  onSubmit: (id: number) => void;
  id: number;
}
export default function ModalWindow({
  isOpen,
  setIsOpen,
  children,
  onSubmit,
  id,
}: ModalWindowType) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(0)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(0)}>
              Close
            </Button>
            <Button onClick={() => onSubmit(id)} variant="outline">
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
