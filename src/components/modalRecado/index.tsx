import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { InputDefault, InputName } from "../inputDefault";
import { v4 as uuid } from "uuid";
import {
  buscarRecadoPorId,
  postRecado,
  putModeRecado,
} from "../../store/modules/recados/recadosSlice";
import { useAppDispatch, useAppSelector } from "../../store/hoocks";
import { User } from "../../store/modules/typeStore";

interface ModalRecadoProps {
  open: boolean;
  handleClose: () => void;
  id: string;
  mode: string;
}

function ModalRecado({ open, handleClose, id, mode }: ModalRecadoProps) {
  const styleModal = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const userLogged = useAppSelector((state) => state.userLogged.data) as User;

  const [detail, setDetail] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();
  const recado = useAppSelector((state) => buscarRecadoPorId(state, id));

  useEffect(() => {
    if (recado) {
      setDescription(recado.description);
      setDetail(recado.detail);
    }
  }, [recado]);

  const handleChange = (value: string, key: InputName) => {
    switch (key) {
      case "detail":
        setDetail(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
    }
  };

  const createRecado = () => {
    const newRecado = {
      id: uuid(),
      description,
      detail,
    };
    const dados = {
      id: userLogged.id,
      recado: newRecado,
    };
    dispatch(postRecado(dados));
    setDetail("");
    setDescription("");
  };

  const idUserLoggedLocalSotage = () => {
    return JSON.parse(localStorage.getItem("userLogged") || "");
  };

  const editRecado = () => {
    dispatch(
      putModeRecado({
        id: idUserLoggedLocalSotage(),
        idRecado: id,
        data: { description: description, detail: detail },
      })
    );
    handleClose();
  };

  return (
    <Modal sx={styleModal} open={open}>
      <Box
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          padding: "20px",
        }}
      >
        {mode === "create" && (
          <>
            <Typography variant="h6">ADICIONAR NOVO RECADO</Typography>
            <Typography>Preencha todos os campos</Typography>
          </>
        )}
        {mode === "edit" && (
          <>
            <Typography variant="h6">ALTERAR RECADO</Typography>
            <Typography>Preencha os campos que deseja alterar</Typography>
          </>
        )}
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Grid item xs={12}>
            <InputDefault
              type="text"
              label="Digite o motivo"
              name="detail"
              value={detail}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <InputDefault
              type="text"
              label="Digite a descrição"
              name="description"
              value={description}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              {mode === "edit" && (
                <>
                  <Button variant="outlined" onClick={editRecado}>
                    Alterar
                  </Button>
                </>
              )}
              {mode === "create" && (
                <>
                  <Button variant="outlined" onClick={createRecado}>
                    Inserir
                  </Button>
                </>
              )}
              <Button variant="outlined" onClick={handleClose}>
                Fechar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export { ModalRecado };
