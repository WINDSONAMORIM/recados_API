import React, { useEffect } from "react";
import CustomizedTables from "../../components/tableHome";
import { HomeContent } from "../../components/wrapperContent";
import { MainHome } from "../../components/mainHome";
import { useAppDispatch } from "../../store/hoocks";
import { getUserById } from "../../store/modules/userLogged/userLoggedSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const idUserLoggedLocalSotage = () => {
    return JSON.parse(localStorage.getItem("userLogged") || "");
  };

  // AQUI POPULA O TEU USER LOGGED
  useEffect(() => {
    if (!idUserLoggedLocalSotage()) {
      navigate("/");
    }

    dispatch(getUserById(idUserLoggedLocalSotage()));
  }, [dispatch, navigate]);

  return (
    <HomeContent>
      <MainHome />
      <CustomizedTables />
    </HomeContent>
  );
};
