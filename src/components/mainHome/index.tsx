import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

import { useAppSelector } from "../../store/hoocks";
import { ModalRecado } from "../modalRecado";

export const MainHome = () => {
  const userLogged = useAppSelector((state) => state.userLogged);

  const [mode, setMode] = useState<"edit" | "delete" | "create">("create");

  const styleFAB = {
    margin: 0,
    right: 20,
    bottom: 20,
    position: "fixed",
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setMode("create");
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={styleFAB}>
        <Fab onClick={handleOpen} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
      <ModalRecado open={open} handleClose={handleClose} mode={mode} id="" />
    </>
  );
};
