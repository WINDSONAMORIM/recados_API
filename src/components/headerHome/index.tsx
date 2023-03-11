import { Grid, styled, Switch, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useAppSelector } from "../../store/hoocks";
import { User } from "../../store/modules/typeStore";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

interface HeaderHomeProps {
  handleChange: () => void;
  arquivado: boolean;
}

export const HeaderHome = ({ handleChange, arquivado }: HeaderHomeProps) => {
  const userLogged = useAppSelector((state) => state.userLogged.data) as User;
  const navigate = useNavigate();

  const off = () => {
    localStorage.setItem("userLogged", JSON.stringify(""));
    navigate("/");
  };

  useEffect(() => {}, [navigate]);

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      sx={{ bgcolor: "#0f498344", mb: 1 }}
      alignItems="center"
    >
      <Grid item xs={2} alignItems="center">
        <Stack direction="row" spacing={1}>
          <PowerSettingsNewIcon
            sx={{ color: "white", fontSize: 30 }}
            onClick={off}
          />
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h3" color="white">
          Gerenciamento de Recados
        </Typography>
        <Typography variant="inherit" align="center" color="white">
          {userLogged && userLogged.name}
        </Typography>
      </Grid>
      <Grid item xs={2} alignItems="flex-start">
        <Stack direction="row" spacing={1}>
          <Typography sx={{ color: "white" }}>Arquivados</Typography>
          <AntSwitch
            defaultChecked={arquivado}
            inputProps={{ "aria-label": "ant design" }}
            onClick={handleChange}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
