import React from "react";
import { Avatar, Typography, Button, ListItem, Box, ListItemText, ListItemAvatar, Checkbox } from "@mui/material";

const EmployeeCard = ({ employee, isSelected, onCheckboxChange, onModifyClick }) => {
  return (
    <ListItem className="shadow p-3" sx={{ display: "flex", justifyContent: "space-between" }}>
      {/* Checkbox */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={isSelected}
          onChange={(event) => onCheckboxChange(event, employee)}
        />
      </Box>

      {/* Employee Info */}
      <ListItemAvatar>
        <Avatar alt={employee.first_name} src={employee.photograph_path} />
      </ListItemAvatar>
      <ListItemText
        primary={employee.fullName()}
        secondary={
          <Typography component="span" variant="body2" sx={{ color: "text.primary", display: "inline" }}>
            {employee.title} — {employee.email}
          </Typography>
        }
      />

      {/* Modify Button */}
      <Button variant="outlined" color="primary" sx={{ marginLeft: 2 }} onClick={() => onModifyClick(employee)}>
        Modify
      </Button>
    </ListItem>
  );
};

export default EmployeeCard;
