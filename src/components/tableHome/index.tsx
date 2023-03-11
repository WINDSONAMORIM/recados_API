import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hoocks";

import {
  buscarRecados,
  deleteRecado,
  getRecados,
  putModeRecado,
} from "../../store/modules/recados/recadosSlice";
import { ModalRecado } from "../modalRecado";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@mui/material/colors";
import { HeaderHome } from "../headerHome";

export default function CustomizedTables() {
  const dispatch = useAppDispatch();

  const listaRecados = useAppSelector(buscarRecados);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"edit" | "delete">("edit");
  const [idSelecionado, setIdSelecionado] = useState("");

  const [arquivado, setArquivado] = useState(false);

  const idUserLoggedLocalSotage = () => {
    return JSON.parse(localStorage.getItem("userLogged") || "");
  };

  useEffect(() => {
    dispatch(
      getRecados({
        id: idUserLoggedLocalSotage(),
        query: { archive: arquivado },
      })
    );
  }, [dispatch, arquivado]);

  const handleChange = () => {
    setArquivado(!arquivado);
  };

  const handleEdit = (id: string) => {
    setMode("edit");
    setIdSelecionado(id);
    setOpenModal(true);
  };

  const handleDelete = (id: string) => {
    if (idUserLoggedLocalSotage()) {
      dispatch(deleteRecado({ id: idUserLoggedLocalSotage(), idRecado: id }));
    }
  };

  const handleArchive = (id: string, archive: boolean) => {
    dispatch(
      putModeRecado({
        id: idUserLoggedLocalSotage(),
        idRecado: id,
        data: { archive: !archive },
      })
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <HeaderHome handleChange={handleChange} arquivado={arquivado} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: " #040d5e6e " }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Motivo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="center">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaRecados &&
              listaRecados.map((recado, index) => {
                if (recado.archive === arquivado) {
                  return (
                    <TableRow
                      key={recado.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{recado.detail}</TableCell>
                      <TableCell>{recado.description}</TableCell>
                      <TableCell align="center">
                        <EditIcon
                          sx={{ color: blue[900], marginRight: 2 }}
                          onClick={() => handleEdit(recado.id)}
                        />
                        <DeleteIcon
                          sx={{ color: blue[900], marginRight: 2 }}
                          onClick={() => handleDelete(recado.id)}
                        />
                        <ArchiveIcon
                          sx={{ color: blue[900] }}
                          onClick={() =>
                            handleArchive(recado.id, recado.archive)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
                return <></>;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalRecado
        open={openModal}
        handleClose={handleCloseModal}
        id={idSelecionado}
        mode={mode}
      />
    </>
  );
}
