import {
  Avatar,
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

function ProfileModal({ children, user }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <>
      <MenuItem
        className="pl-3 w-[100%] hover:bg-slate-100 cursor-pointer"
        onClick={onOpen}
      >
        {children}
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="flex flex-col justify-center items-center">
          <ModalHeader>
            <Avatar name={user.name} src={user.avatar} size={{ base: "sm", md: "xl" }}/>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <p className="text-[14px] sm:text-[16px]">
              <span className="font-semibold">Name: </span>
              {user.name}
            </p>
            <p className="text-[14px] sm:text-[16px]">
              <span className="font-semibold">Email: </span>
              {user.email}
            </p>
          </ModalBody>
          <ModalFooter className="flex self-end">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
