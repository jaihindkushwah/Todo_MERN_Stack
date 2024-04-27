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
  Text,
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
      <Modal size={"sm"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height={"360px"}>
          <ModalHeader
          fontSize={"36px"}
          fontFamily={"Work sans"}
          display={"flex"}
          justifyContent={"center"}
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-between"}>
            <Avatar borderRadius={"full"} boxSize={"120px"} src={user.pic} alt={user.name}></Avatar>
            <Text fontSize={"22px"} fontFamily={"Work sans"}>{user.email}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
