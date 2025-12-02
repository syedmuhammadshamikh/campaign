import React, { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { contenticon, overviewicon, recipientsicon } from "./media";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const steps = [
  {
    label: "Overview",
    description: `Fill in the campaign details.`,
    icon: overviewicon,
  },
  {
    label: "Content",
    description: "Choose the best template.",
    icon: contenticon,
  },
  {
    label: "Recipients",
    description: `Imports leads or add manually.`,
    icon: recipientsicon,
  },
];

const LeftSidebarSection = ({
  activeStep,
  handleStepClick,
  showRightSide,
  setExpanded,
  expanded,
}) => {
  const theme = useTheme();
  const isLaptopScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (isLaptopScreen) {
      setExpanded(!showRightSide);
    }
  }, [showRightSide, isLaptopScreen]);

  return (
    <Box className={`left_section ${!expanded ? "collapsed" : ""}`}>
      <Stepper
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        activeStep={activeStep}
      >
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;

          return (
            <Step
              key={step.label}
              className={isCompleted ? "step-completed" : ""}
            >
              <StepLabel
                onClick={() => handleStepClick(index)}
                style={{ cursor: "pointer" }}
                icon={
                  <>
                    <img src={step.icon} alt={step.label} />
                    {isCompleted && (
                      <Box className="check-completed-icon">
                        <CheckCircleIcon fontSize="small" />
                      </Box>
                    )}
                  </>
                }
              >
                {expanded && <>{step.label}</>}
              </StepLabel>
              {expanded && (
                <div
                  className={`step-description ${!expanded ? "collapsed" : ""}`}
                >
                  <Typography sx={{ ml: 3 }}>{step.description}</Typography>
                </div>
              )}
            </Step>
          );
        })}
      </Stepper>

      {!isSmallScreen && (
        <Box textAlign="right">
          <IconButton
            onClick={toggleExpand}
            sx={{
              boxShadow: 1,
            }}
          >
            {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default LeftSidebarSection;
