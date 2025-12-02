import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import PhoneUI from "../../../components/PhoneUI";
import DropdownSelect from "../../../components/dropDownselect";
import { fileTypeOptions } from "../../../data/menuItems";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ShakingTextField = styled(TextField)(({ shake }) => ({
  transition: "transform 0.1s ease-in-out",
  ...(shake && {
    animation: "shake 0.3s ease-in-out",
  }),
  "@keyframes shake": {
    "0%, 100%": { transform: "translateX(0)" },
    "25%": { transform: "translateX(-4px)" },
    "50%": { transform: "translateX(4px)" },
    "75%": { transform: "translateX(-4px)" },
  },
}));

const FeedTab = () => {
  // For Feed Text
  const [feedText, setFeedText] = useState("");
  const [shake, setShake] = useState(false);
  const [value, setValue] = useState(0);
  const [error, setError] = useState("");
  const [errorTimeout, setErrorTimeout] = useState(null);

  const [fileType, setFileType] = useState("image");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [processedFiles, setProcessedFiles] = useState(new Set());

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fileInputRef = useRef(null);
  const addMoreFileInputRef = useRef(null);
  const replaceFileInputRef = useRef(null);

  useEffect(() => {
    // Clean up any object URLs when component unmounts
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Handle auto-dismiss of error messages
  useEffect(() => {
    if (error) {
      // Clear previous timeout if it exists
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }

      // Set new timeout to clear error after 3 seconds
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      setErrorTimeout(timeout);

      // Clean up timeout when component unmounts or error changes
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error]);

  const handleFeedTextChange = (event) => {
    const text = event.target.value;

    if (text.length <= 200) {
      setFeedText(text);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleFileChange = (event) => {
    const selectedValue = event.target.value;
    setFileType(selectedValue);

    // Clean up existing preview URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    setSelectedFiles([]);
    setPreviewUrls([]);
    setProcessedFiles(new Set());
    setError("");
  };

  const getFileIdentifier = (file) => {
    return `${file.name}_${file.size}_${file.lastModified}`;
  };

  const isFileDuplicate = (file) => {
    const fileId = getFileIdentifier(file);
    return processedFiles.has(fileId);
  };

  const processFiles = (
    files,
    isReplacement = false,
    replacementIndex = -1
  ) => {
    const validFiles = Array.from(files).filter((file) => {
      if (fileType === "image") {
        return file.type.startsWith("image/");
      } else if (fileType === "video") {
        return file.type.startsWith("video/");
      }
      return false;
    });

    if (validFiles.length === 0) {
      setError(`Please select ${fileType} files only.`);
      return;
    }

    if (fileType === "video") {
      // Video handling - only one video at a time
      const newVideo = validFiles[0];
      const videoId = getFileIdentifier(newVideo);

      if (isReplacement) {
        // Clean up the old video URL and ID
        if (previewUrls.length > 0) {
          URL.revokeObjectURL(previewUrls[0]);
        }

        if (selectedFiles.length > 0) {
          const oldVideoId = getFileIdentifier(selectedFiles[0]);
          setProcessedFiles((prev) => {
            const updated = new Set(prev);
            updated.delete(oldVideoId);
            return updated;
          });
        }
      } else if (isFileDuplicate(newVideo)) {
        setError(`This video already exists. Please select a different video.`);
        return;
      }

      if (validFiles.length > 1 && !isReplacement) {
        setError(
          "Only one video can be selected at a time. First video selected."
        );
      }

      const newPreviewUrl = URL.createObjectURL(newVideo);

      setProcessedFiles((prev) => {
        const updated = new Set(prev);
        updated.add(videoId);
        return updated;
      });

      setSelectedFiles([newVideo]);
      setPreviewUrls([newPreviewUrl]);
      return;
    }

    if (fileType === "image") {
      if (isReplacement && replacementIndex !== -1) {
        // Image replacement logic
        const newImage = validFiles[0];
        const newImageId = getFileIdentifier(newImage);

        if (
          isFileDuplicate(newImage) &&
          getFileIdentifier(selectedFiles[replacementIndex]) !== newImageId
        ) {
          setError(
            `Image '${newImage.name}' already exists. Please select a different image.`
          );
          return;
        }

        // Clean up old URL
        if (previewUrls[replacementIndex]) {
          URL.revokeObjectURL(previewUrls[replacementIndex]);
        }

        // Remove old file from processed set
        if (selectedFiles[replacementIndex]) {
          const oldImageId = getFileIdentifier(selectedFiles[replacementIndex]);
          setProcessedFiles((prev) => {
            const updated = new Set(prev);
            updated.delete(oldImageId);
            return updated;
          });
        }

        const newPreviewUrl = URL.createObjectURL(newImage);

        // Add new file ID to processed set
        setProcessedFiles((prev) => {
          const updated = new Set(prev);
          updated.add(newImageId);
          return updated;
        });

        // Update files and previews
        setSelectedFiles((prev) => {
          const updated = [...prev];
          updated[replacementIndex] = newImage;
          return updated;
        });

        setPreviewUrls((prev) => {
          const updated = [...prev];
          updated[replacementIndex] = newPreviewUrl;
          return updated;
        });
      } else {
        // Add new images logic
        const uniqueFiles = [];
        const duplicateFiles = [];

        validFiles.forEach((file) => {
          if (isFileDuplicate(file)) {
            duplicateFiles.push(file.name);
          } else {
            uniqueFiles.push(file);
          }
        });

        if (duplicateFiles.length > 0) {
          setError(
            `Duplicate image(s) found: ${duplicateFiles.join(
              ", "
            )}. These were not added.`
          );
          if (uniqueFiles.length === 0) return;
        }

        const newPreviewUrls = uniqueFiles.map((file) =>
          URL.createObjectURL(file)
        );

        // Add new file IDs to processed set
        setProcessedFiles((prev) => {
          const updated = new Set(prev);
          uniqueFiles.forEach((file) => {
            updated.add(getFileIdentifier(file));
          });
          return updated;
        });

        // Add new files and previews
        setSelectedFiles((prev) => [...prev, ...uniqueFiles]);
        setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
      }
    }
  };

  const handleFileUpload = (event) => {
    if (!event.target.files || event.target.files.length === 0) return;
    processFiles(event.target.files);
  };

  const handleReplaceFileUpload = (event) => {
    if (!event.target.files || event.target.files.length === 0) return;
    processFiles(event.target.files, true, selectedIndex);
    setSelectedIndex(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-over");

    if (!event.dataTransfer.files || event.dataTransfer.files.length === 0)
      return;
    processFiles(event.dataTransfer.files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleAddMoreClick = () => {
    addMoreFileInputRef.current.click();
  };

  const handleMenuOpen = (event, index) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleReplaceFile = () => {
    replaceFileInputRef.current.click();
    handleMenuClose();
  };

  const handleRemoveFileMenu = () => {
    handleRemoveFile(selectedIndex);
    handleMenuClose();
  };

  const handleRemoveFile = (index) => {
    // For video, we just need to clear everything
    if (fileType === "video") {
      if (previewUrls.length > 0) {
        URL.revokeObjectURL(previewUrls[0]);
      }

      if (selectedFiles.length > 0) {
        const fileId = getFileIdentifier(selectedFiles[0]);
        setProcessedFiles((prev) => {
          const updated = new Set(prev);
          updated.delete(fileId);
          return updated;
        });
      }

      setSelectedFiles([]);
      setPreviewUrls([]);
    } else {
      // For images, remove the specific one
      if (index >= 0 && index < previewUrls.length) {
        URL.revokeObjectURL(previewUrls[index]);
      }

      if (index >= 0 && index < selectedFiles.length) {
        const fileId = getFileIdentifier(selectedFiles[index]);
        setProcessedFiles((prev) => {
          const updated = new Set(prev);
          updated.delete(fileId);
          return updated;
        });
      }

      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const getAcceptedFileTypes = () => {
    return fileType === "image" ? "image/*" : "video/*";
  };

  return (
    <Box className="content_main_body">
      <Box className="responsive_content_view">
        <Box className="content_area">
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 5 }}
          >
            <Grid
              size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
              className="ns_field_style"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography variant="h6" className="campaign_subheading">
                  Feed Text <span style={{ color: "red" }}>*</span>
                </Typography>
              </Box>
              <ShakingTextField
                multiline
                placeholder="Enter Feed Text"
                size="small"
                rows={9}
                variant="outlined"
                fullWidth
                shake={shake ? 1 : 0}
                value={feedText}
                onChange={handleFeedTextChange}
              />
              <Box className="hint_area">
                <Typography className="hint_text" variant="body2">
                  Hint: Maximum 200 characters allowed.
                </Typography>
                <span className="count_words">{feedText.length}/200</span>
              </Box>
            </Grid>
            <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <Typography variant="h3">
                  Upload Images or Video Files
                </Typography>
                <Tooltip
                  title={
                    <>
                      <Typography variant="body1">
                        You can either upload 1 video or up to 5 images for
                        notification post.
                      </Typography>
                      <br />
                      <Typography variant="h6">Image</Typography>
                      <Typography variant="body1">
                        The image should be either jpeg or png of 800 x 800 px
                        and should be under 2MB.
                      </Typography>
                      <br />
                      <Typography variant="h6">Video</Typography>
                      <Typography variant="body1">
                        The file should be either mp4 or mkv format and the file
                        should be under 2MB.
                      </Typography>
                    </>
                  }
                  arrow
                >
                  <InfoOutlinedIcon />
                </Tooltip>
              </Box>
              <DropdownSelect
                label="Files Type"
                value={fileType}
                onChange={handleFileChange}
                options={fileTypeOptions}
              />
              {error && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <Box
                className={`media_box ${
                  fileType === "video" && previewUrls.length > 0
                    ? "video-uploaded-box"
                    : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {previewUrls.length > 0 ? (
                  <Box className="media_uploaded">
                    {fileType === "video" ? (
                      <Box className="video_uploaded">
                        <video controls>
                          <source
                            src={previewUrls[0]}
                            type={selectedFiles[0]?.type}
                          />
                          Your browser does not support video playback.
                        </video>
                        <Box
                          className="menu_option_icon"
                          onClick={(e) => handleMenuOpen(e, 0)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </Box>
                      </Box>
                    ) : (
                      <Box className="image_grid_area">
                        {previewUrls.map((url, index) => (
                          <Box key={index} className="image_uploaded">
                            <img src={url} alt={`Preview ${index}`} />
                            <Box
                              className="menu_option_icon"
                              onClick={(e) => handleMenuOpen(e, index)}
                            >
                              <MoreVertIcon fontSize="small" />
                            </Box>
                          </Box>
                        ))}
                        {fileType === "image" && (
                          <Box
                            className="more_item_add"
                            onClick={handleAddMoreClick}
                          >
                            <Box className="upload_icon">
                              <UploadFileIcon />
                            </Box>
                            <Button className="ns_primary_btn">
                              Browse File
                            </Button>
                            <input
                              type="file"
                              ref={addMoreFileInputRef}
                              style={{ display: "none" }}
                              accept="image/*"
                              onChange={handleFileUpload}
                              multiple
                            />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    className="media_select_button"
                    onClick={handleBrowseClick}
                  >
                    <Box className="upload_icon">
                      <UploadFileIcon />
                    </Box>
                    <Typography variant="p">Drag and drop file here</Typography>
                    <Typography variant="h6">OR</Typography>
                    <Button className="ns_primary_btn">Browse File</Button>
                    {/* Initial file input for first upload */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      accept={getAcceptedFileTypes()}
                      onChange={handleFileUpload}
                      multiple={fileType === "image"}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
          <input
            type="file"
            ref={replaceFileInputRef}
            style={{ display: "none" }}
            accept={getAcceptedFileTypes()}
            onChange={handleReplaceFileUpload}
            multiple={false}
          />

          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleReplaceFile}>
              <ListItemIcon>
                <UploadFileIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Replace {fileType}</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleRemoveFileMenu}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove {fileType}</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
        <Box className="content_preview">
          <Box mb={3}>
            <Typography variant="h6" className="campaign_subheading">
              Preview
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneUI
              activeTab={value}
              feedText={feedText}
              fileType={fileType}
              componentType="feed"
              previewUrls={previewUrls}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedTab;
