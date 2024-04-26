import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react";
  
  function CreateTaskModal({ className,title,colorScheme,disclosure ,isLoading,children,onSubmit, ...props }) {
    const { isOpen, onOpen, onClose } = disclosure;
    return (
      <div className={"flex justify-center items-center "+className} {...props}>
        <Button onClick={onOpen} colorScheme={colorScheme?colorScheme:"green"}>{title}</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {children}
            </ModalBody>
  
            <ModalFooter>
              <Button isLoading={isLoading} onClick={onSubmit} colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }
  
  export default CreateTaskModal;
  