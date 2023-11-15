import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UsersContext } from "../context/users_context";
import { getCategories, updateUser } from "../login/backend-api";
import { useEffect, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: dayjs.Dayjs | null;
  interests: { id: number; name: string }[];
}

export default function Profie() {
  const today = dayjs();

  const usersContext = React.useContext(UsersContext);
  const user: User | undefined = usersContext?.user;

  const [editedUser, setEditedUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: today,
    interests: [],
  });

  useEffect(() => {
    if (user) {
      const dateOfBirth = user.birthDate ? dayjs(user.birthDate) : null;

      setEditedUser({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        birthDate: dateOfBirth,
        interests: user.interests,
      });
    }
  }, [user]);

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  const handleInterestsChange = (
    event: React.SyntheticEvent,
    newValue: { id: number; name: string }[]
  ) => {
    setEditedUser({ ...editedUser, interests: newValue });
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const birthDateToSend = editedUser.birthDate || null;
    updateUser(
      editedUser.firstName,
      editedUser.lastName,
      birthDateToSend,
      editedUser.interests.map((interest) => interest.id)
    );
  }
  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Mis datos
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  First name
                </Typography>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  value={editedUser.firstName}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, firstName: e.target.value })
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Last name
                </Typography>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  value={editedUser.lastName}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, lastName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={user?.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Birth date">
                    <DatePicker
                      value={editedUser.birthDate}
                      format="DD / MM / YYYY"
                      onChange={(date) => {
                        setEditedUser({ ...editedUser, birthDate: date });
                      }}
                      disableFuture
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Intereses
                </Typography>
                <Autocomplete
                  multiple
                  options={categories}
                  value={editedUser.interests}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  onChange={handleInterestsChange}
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      {...params}
                      onChange={(interest) => {
                        setEditedUser({ ...editedUser, interests: interest });
                      }}
                      label="Intereses"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, marginLeft: "auto", display: "block" }}
            >
              Guardar
            </Button>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
