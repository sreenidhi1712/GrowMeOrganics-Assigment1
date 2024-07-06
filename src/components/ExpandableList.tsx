import React, { useState, ChangeEvent } from 'react';
import { Checkbox, Accordion, AccordionSummary, AccordionDetails, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SubDepartmentData {
  department: string;
  sub_departments: string[];
}

interface ExpandableListProps {
  data: SubDepartmentData[];
}

interface SelectedDepartments {
  [key: string]: {
    selected: boolean;
    subDepartments: string[];
  };
}

const ExpandableList: React.FC<ExpandableListProps> = ({ data }) => {
  const [selectedDepartments, setSelectedDepartments] = useState<SelectedDepartments>({});

  const handleDepartmentChange = (department: string) => {
    const isSelected = selectedDepartments[department]?.selected;
    const newSelectedDepartments = {
      ...selectedDepartments,
      [department]: {
        selected: !isSelected,
        subDepartments: selectedDepartments[department]?.subDepartments || []
      }
    };

    if (!isSelected) {
      newSelectedDepartments[department].subDepartments = data.find(d => d.department === department)?.sub_departments || [];
    } else {
      newSelectedDepartments[department].subDepartments = [];
    }

    setSelectedDepartments(newSelectedDepartments);
  };

  const handleSubDepartmentChange = (department: string, subDepartment: string) => {
    const isSelected = selectedDepartments[department]?.subDepartments.includes(subDepartment);
    const newSelectedDepartments = {
      ...selectedDepartments,
      [department]: {
        selected: selectedDepartments[department]?.selected || false,
        subDepartments: isSelected
          ? selectedDepartments[department].subDepartments.filter(sd => sd !== subDepartment)
          : [...(selectedDepartments[department]?.subDepartments || []), subDepartment]
      }
    };

    if (newSelectedDepartments[department].subDepartments.length === data.find(d => d.department === department)?.sub_departments.length) {
      newSelectedDepartments[department].selected = true;
    } else {
      newSelectedDepartments[department].selected = false;
    }

    setSelectedDepartments(newSelectedDepartments);
  };

  return (
    <div>
      {data.map(dept => (
        <Accordion key={dept.department} sx={{ marginTop: "2rem" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDepartments[dept.department]?.selected || false}
                  onChange={() => handleDepartmentChange(dept.department)}
                />
              }
              label={dept.department}
            />
          </AccordionSummary>
          <AccordionDetails sx={{ marginBottom: "5rem" }}>
            {dept.sub_departments.map(subDept => (
              <FormControlLabel
                key={subDept}
                control={
                  <Checkbox
                    checked={selectedDepartments[dept.department]?.subDepartments.includes(subDept) || false}
                    onChange={() => handleSubDepartmentChange(dept.department, subDept)}
                  />
                }
                label={subDept}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ExpandableList;
