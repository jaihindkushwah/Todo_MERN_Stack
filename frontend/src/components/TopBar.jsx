import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { UserState } from "../context/AuthProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import {SearchIcon} from '@chakra-ui/icons'

function TopBar({setSearchInput,searchHandler,searchInput}) {
  const navigation = useNavigate();
  const { user, setUser } = UserState();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigation("/login");
  };
  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };
  return (
    <div className="z-50 flex w-screen fixed top-0 justify-between items-center bg-slate-500 shadow-lg shadow-600 p-2 pr-7">
      <div className="flex items-center gap-1 bg-white rounded p-1 pl-2 ml-3 sm:ml-20">
        {/* search bar */}
        <SearchIcon onClick={searchHandler} mr={1} cursor={"pointer"}/>
        <input value={searchInput} placeholder="Search ...." onKeyDown={onKeyDownHandler} onChange={(e)=>setSearchInput(e.target.value)} className="outline-none focus:outline-none"/>
      </div>
      {/* user profile */}
      <Menu>
        <MenuButton>
          <Avatar
            src={user.avatar}
            name={user.name}
            size={{ base: "sm", md: "md" }}
          />
        </MenuButton>
        <MenuList>
          <ProfileModal user={user}>My Profile</ProfileModal>

          {/* logout button */}
          <MenuItem
            onClick={logoutHandler}
            className="text-center text-[12px] sm:text-[16px]"
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default TopBar;
