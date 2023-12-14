import {
  Box,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const tableStyle = {
  marginTop: "200px",
};

const initialValues = {
  employeeName: "",
  date: "",
  timeIn: "",
  timeOut: "",
  taskInformation: "",
};
const Content = () => {
  const [open, setopen] = useState(false);
  const functionopenpopup = () => {
    setopen(true);
  };
  const closepopup = () => {
    setopen(false);
  };
  const [values, setValues] = useState(initialValues);
  const [tableData, setTableData] = useState([]);
  const [tableView, setTableView] = useState(false);

  const tableDataView = () => {
    setTableView(true);
  };
  const handleinputchange = (e, label) => {
    console.log(e, "value");
    setValues({ ...values, [label]: e.target.value });
  };
  const handleDatechange = (e) => {
    const getDate = e.$d.toLocaleDateString("en-GB");
    setValues({ ...values, date: getDate });
    // console.log(e.$d.toLocaleDateString(), "event")
    // console.log(moment(values.date).format('DD-MM-YYYY'),"ak");
    // setValues({...values,date: e.$d })
  };

  const handleTimechange = (e, label) => {
    const getTime = e.$d.toLocaleTimeString([], {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
    setValues({ ...values, [label]: getTime });
  };
  const handleSubmit = () => {
    console.log(values);
    if (values.employeeName) {
      setTableData([...tableData, values]);
      setValues("");
      closepopup();
      tableDataView();
    } else {
      alert("Please fill the details");
      closepopup();
    }
  };
  const item = [
    {
      component: "DatePicker",
      lable: (
        <DatePicker
          label="Date"
          onChange={handleDatechange}
          format="DD-MM-YYYY"
        />
      ),
    },
    {
      component: "TimePicker",
      name: "timeIn",
      lable: (
        <TimePicker
          label="Time In"
          onChange={(e) => handleTimechange(e, "timeIn")}
        />
      ),
    },
    {
      component: "TimePicker",
      name: "timeOut",
      lable: (
        <TimePicker
          label="Time Out"
          onChange={(e) => handleTimechange(e, "timeOut")}
        />
      ),
    },
  ];
  return (
    <Box variant="form" flex={3} mt={2}>
      <Button
        onClick={functionopenpopup}
        variant="contained"
        startIcon={<PersonAddIcon />}
      >
        Add user
      </Button>
      <Dialog open={open}>
        <DialogTitle>Daily Activity Report</DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              id="outlined-basic"
              label="Employee Name"
              variant="outlined"
              name="employeeName"
              required
              defaultValue={values.employeeName}
              onChange={(e) => handleinputchange(e, "employeeName")}
            />{" "}
            {item.map((item, index) => (
              <LocalizationProvider dateAdapter={AdapterDayjs} key={index}>
                <DemoContainer components={[item.component]}>
                  {item.lable}
                </DemoContainer>
              </LocalizationProvider>
            ))}
            <TextField
              id="outlined-basic"
              label="Task"
              variant="outlined"
              defaultValue={values.employeeName}
              onChange={(e) => handleinputchange(e, "taskInformation")}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">
            Sumit
          </Button>
          <Button onClick={closepopup} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {tableView && (
        <TableContainer component={Paper} style={tableStyle}>
          <Table
            sx={{ minWidth: 1000 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time In</TableCell>
                <TableCell align="right">Time Out</TableCell>
                <TableCell align="right">Task Information</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.employeeName}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.timeIn}</TableCell>
                  <TableCell align="right">{row.timeOut}</TableCell>
                  <TableCell align="right">{row.taskInformation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Content;
