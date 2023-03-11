import React, { useState, useEffect } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { InputDefault, InputName } from "../inputDefault";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hoocks";
import {
  addUser,
  buscarUsuarios,
  getUserAll,
} from "../../store/modules/users/userSlice";

interface FormProps {
  mode: "login" | "signup";
}

export const Form = ({ mode }: FormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const usersRedux = useAppSelector(buscarUsuarios);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAll());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleValidateInput = (value: string, key: InputName) => {
    switch (key) {
      case "name":
        if (value.length < 3) {
          setErrorName(true);
        } else {
          setErrorName(false);
        }
        break;

      case "email":
        // eslint-disable-next-line no-useless-escape
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!value.match(regexEmail)) {
          setErrorEmail(true);
        } else {
          setErrorEmail(false);
        }
        break;

      case "password":
        if (mode === "signup") {
          if (!value || value.length < 6) {
            setErrorPassword(true);
          } else {
            setErrorPassword(false);
          }
        }

        if (mode === "login") {
          if (!value) {
            setErrorPassword(true);
          } else {
            setErrorPassword(false);
          }
        }
        break;

      case "repassword":
        if (value !== password) {
          setErrorPassword(true);
        } else {
          setErrorPassword(false);
        }
        break;

      default:
    }
  };

  const handleChange = (value: string, key: InputName) => {
    switch (key) {
      case "name":
        setName(value);
        handleValidateInput(value, key);
        break;
      case "email":
        setEmail(value);
        handleValidateInput(value, key);
        break;
      case "password":
        setPassword(value);
        handleValidateInput(value, key);
        break;
      case "repassword":
        setRepassword(value);
        handleValidateInput(value, key);
        break;

      default:
    }
  };

  const createAccount = () => {
    const newUser = {
      name,
      email,
      password,
      recados: [],
    };

    const userExist = usersRedux.some((user) => user.email === newUser.email);

    if (!userExist) {
      dispatch(addUser(newUser));
      clearInputs();
      navigate("/");
    } else {
      alert("E-mail já em uso!");
    }
  };

  const login = () => {
    const userExist = usersRedux.find((u) => u.email === email);
    if (!userExist) {
      const confirma = window.confirm(
        "Usuário não cadastrado. Deseja cadastrar uma conta? "
      );
      if (confirma) {
        navigate("/signup");
      }
    }

    if (userExist?.password !== password) {
      alert("Dados incorretos favor verifique os dados e tente novamente");
      return;
    }

    localStorage.setItem("userLogged", JSON.stringify(userExist.id));

    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRepassword("");
  };

  return (
    <React.Fragment>
      <Stack spacing={2}>
        {mode === "login" && (
          <>
            <InputDefault
              type="text"
              color={errorEmail ? "error" : "primary"}
              label="E-mail"
              name="email"
              value={email}
              handleChange={handleChange}
            />
            <InputDefault
              type="password"
              color={errorPassword ? "error" : "primary"}
              label="Senha"
              name="password"
              value={password}
              handleChange={handleChange}
            />
            <Button
              disabled={errorEmail || errorPassword}
              variant="outlined"
              color="primary"
              onClick={login}
            >
              Login
            </Button>
          </>
        )}
      </Stack>
      <Stack spacing={1} direction="row">
        {mode === "login" && (
          <>
            <Typography variant="h6">Não tem conta </Typography>
            <Typography
              variant="h6"
              color="primary"
              onClick={() => navigate("/signup")}
            >
              Cadastre-se
            </Typography>
          </>
        )}
      </Stack>

      <Stack spacing={2}>
        {mode === "signup" && (
          <>
            <InputDefault
              type="text"
              color={errorName ? "error" : "primary"}
              label="Nome"
              name="name"
              value={name}
              handleChange={handleChange}
            />
            <InputDefault
              type="text"
              color={errorEmail ? "error" : "primary"}
              label="E-mail"
              name="email"
              value={email}
              handleChange={handleChange}
            />
            <InputDefault
              type="password"
              color={errorPassword ? "error" : "primary"}
              label="Senha"
              name="password"
              value={password}
              handleChange={handleChange}
            />
            <InputDefault
              type="password"
              color={errorPassword ? "error" : "primary"}
              label="Confirme sua Senha"
              name="repassword"
              value={repassword}
              handleChange={handleChange}
            />
            <Button
              disabled={errorName || errorEmail || errorPassword}
              variant="outlined"
              color="primary"
              onClick={createAccount}
            >
              Cadastre-se
            </Button>
          </>
        )}
      </Stack>
      <Stack spacing={1} direction="row">
        {mode === "signup" && (
          <>
            <Typography variant="h6">Já tem conta? </Typography>
            <Typography
              variant="h6"
              color="primary"
              onClick={() => navigate("/")}
            >
              Login
            </Typography>
          </>
        )}
      </Stack>
    </React.Fragment>
  );
};
