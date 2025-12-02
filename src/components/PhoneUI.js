import React, { useState, useEffect } from "react";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { notificationbell } from "./media";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Component For Date and Time
const DateAndTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, []);

  // Format time as 12-hour format (HH:MM)
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes}`;
  };

  // Format date as Day, Month Date
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = currentTime.toLocaleDateString("en-US", options);

  return (
    <Box className="screen_time">
      <Box className="lock_screen_time">
        <Typography variant="h6">{formatTime(currentTime)}</Typography>
      </Box>
      <Box className="lock_screen_date">
        <Typography variant="body2">{formattedDate}</Typography>
      </Box>
    </Box>
  );
};

// No Preview Component for reuse
const NoPreviewMessage = () => {
  return (
    <Box className="no_preview_view">
      <DateAndTime />
      <Typography variant="p">No Preview Available</Typography>
    </Box>
  );
};

// Lock Screen View Component
const LockScreenView = ({ notificationText }) => {
  return (
    <>
      {notificationText ? (
        <Box className="lock_screen_view">
          <DateAndTime />
          <Box className="notification_container">
            <Box
              className={`notification_content ${
                notificationText.length ? "notification_content_active" : ""
              }`}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  mb: "8px",
                }}
              >
                <Box className="bellicon">
                  <img src={notificationbell} />
                </Box>
                <Typography variant="h4">North Star Golf Course</Typography>
              </Box>
              <Typography variant="h5">Champions Trophy</Typography>
              <Typography className="notification_text" variant="p">
                {notificationText}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <NoPreviewMessage />
      )}
    </>
  );
};

// Additional Details View Component
const AdditionalDetailsView = ({ additionalDetails }) => {
  return (
    <>
      {additionalDetails ? (
        <Box className="additional_details_view">
          <Box className="details_header">
            <Typography variant="heading">Notification Title</Typography>
            <HighlightOffIcon />
          </Box>
          <Box className="details_content">
            <Typography variant="body2">{additionalDetails}</Typography>
          </Box>
        </Box>
      ) : (
        <NoPreviewMessage />
      )}
    </>
  );
};

// Feed View Component
const FeedView = ({ feedText, previewUrls = [], fileType = "image" }) => {
  const hasContent = feedText || previewUrls.length > 0;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <ChevronLeftIcon />,
    nextArrow: <ChevronRightIcon />,
  };

  return (
    <>
      {hasContent ? (
        <Box className="feed_view">
          <Box className="feed_header">
            <Typography variant="h6">Northstar Club</Typography>
            <NotificationsNoneOutlinedIcon />
          </Box>
          <Box className="feed_content">
            <Box className="ns_club_area">
              <Box>
                <img src="https://placehold.co/30x30" alt="Club" />
              </Box>
              <Box>
                <Typography variant="h5">Northstar Club</Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Typography variant="span">Now</Typography>
                  <Chip label="New" />
                </Box>
              </Box>
            </Box>
            {feedText && (
              <Box sx={{ padding: "0px 12px 12px" }}>
                <Typography className="feed_text" variant="p">
                  {feedText}
                </Typography>
              </Box>
            )}
            {previewUrls.length > 0 && (
              <Box className="media_container">
                {fileType === "video" ? (
                  <video controls width="100%">
                    <source src={previewUrls[0]} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <Box className="image_carousel">
                    <Slider {...sliderSettings}>
                      {previewUrls.map((url, index) => (
                        <Box key={index} className="image_container">
                          <img src={url} alt={`Image ${index + 1}`} />
                        </Box>
                      ))}
                    </Slider>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <NoPreviewMessage />
      )}
    </>
  );
};

// SMS Lock Screen View Component
const SmsLockScreenView = ({ smsText }) => {
  return (
    <>
      {smsText ? (
        <Box className="lock_screen_view">
          <DateAndTime />
          <Box className="notification_container">
            <Box
              className={`notification_content ${
                smsText.length ? "notification_content_active" : ""
              }`}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  mb: "8px",
                }}
              >
                <Box className="bellicon">
                  <img src={notificationbell} />
                </Box>
                <Typography variant="h4">North Star Golf Course</Typography>
              </Box>
              <Typography variant="h5">Champions Trophy</Typography>
              <Typography className="notification_text" variant="p">
                {smsText}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <NoPreviewMessage />
      )}
    </>
  );
};

// SMS Full Message View Component
const SmsMessageView = ({ smsText, sender = "Champions Trophy" }) => {
  return (
    <>
      {smsText ? (
        <Box className="sms_message_preview">
          <Box className="sms_message_header">
            <ArrowBackIosIcon className="svg_back" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AccountCircleIcon className="svg_contact" />
              <Typography variant="p">{sender}</Typography>
            </Box>
            <InfoOutlinedIcon className="svg_info" />
          </Box>
          <Box className="sms_message_content">
            <Typography variant="p">Text Message</Typography>
            <Typography variant="p">16 June 2015, 7:18 am</Typography>
            <Box className="sms_message_text">
              <Typography variant="body1">{smsText}</Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <NoPreviewMessage />
      )}
    </>
  );
};

// Main PhoneUI Component
const PhoneUI = ({
  notificationText,
  feedText,
  smsText,
  additionalDetails,
  activeTab,
  componentType = "notification",
  previewUrls = [],
  fileType = "image",
}) => {
  const isNoPreview =
    (activeTab === 0 &&
      ((componentType === "feed" && !feedText && previewUrls.length === 0) ||
        (componentType === "notification" && !notificationText) ||
        (componentType === "sms" && !smsText))) ||
    (activeTab === 1 &&
      ((componentType === "notification" && !additionalDetails) ||
        (componentType === "sms" && !smsText)));

  const getScreenClass = () => {
    if (isNoPreview) {
      return "no_preview";
    } else if (activeTab === 0) {
      if (componentType === "feed") return "feed_preview";
      if (componentType === "sms") return "lockscreen_preview";
      return "lockscreen_preview";
    } else {
      if (componentType === "sms") return "sms_message_preview";
      return "additional_details_preview";
    }
  };

  const renderView = () => {
    if (componentType === "feed") {
      return (
        <FeedView
          feedText={feedText}
          previewUrls={previewUrls}
          fileType={fileType}
        />
      );
    } else if (componentType === "sms") {
      if (activeTab === 0) {
        return <SmsLockScreenView smsText={smsText} />;
      } else {
        return <SmsMessageView smsText={smsText} />;
      }
    } else {
      if (activeTab === 0) {
        return <LockScreenView notificationText={notificationText} />;
      } else {
        return <AdditionalDetailsView additionalDetails={additionalDetails} />;
      }
    }
  };

  return (
    <Box className="frame-phone">
      <Box className="side-button mute"></Box>
      <Box className="side-button volume-up"></Box>
      <Box className="side-button volume-down"></Box>
      <Box className="side-button hold"></Box>
      <Box className="stripe top"></Box>
      <Box className="stripe bottom"></Box>
      <Box className="port"></Box>
      <Box className="layer2">
        <Box className={`screen ${getScreenClass()}`}>
          <Box className="mask">
            <Box className="left-pie"></Box>
            <Box className="right-pie"></Box>
            <Box className="speaker"></Box>
            <Box className="camera">
              <Box className="lenz left"></Box>
              <Box className="lenz right"></Box>
            </Box>
          </Box>
          <Box className="mobile_screen_data">{renderView()}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PhoneUI;
