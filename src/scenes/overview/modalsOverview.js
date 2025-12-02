import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

// Reusable confirmation modal component
const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmText = "Confirm",
  cancelText = "Cancel",
  highlightedText = null,
  children,
}) => {
  return (
    <Dialog className="confirmation_modal" open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children ? (
          children
        ) : (
          <Typography variant="p">
            {content}
            {highlightedText && <span>{highlightedText}</span>}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button className="ns_secondary_btn_noborder" onClick={onClose}>
          {cancelText}
        </Button>
        <Button className="ns_primary_btn" onClick={onConfirm} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const RecurringEmailModal = ({ open, onClose, onProceed }) => {
  return (
    <ConfirmationModal
      open={open}
      onClose={onClose}
      onConfirm={onProceed}
      title="Invalid Launch Type For Campaign"
      confirmText="Proceed"
      cancelText="Cancel"
      className="email_recurring_modal"
    >
      <Typography variant="p">
        Recurring campaigns are only supported with the <span>Email</span>{" "}
        channel. If you proceed, the [SMS, Notification, Feed] channels and all
        their associated content will be removed from the current campaign.
        <br />
        <br />
        Do you wish to proceed?
      </Typography>
    </ConfirmationModal>
  );
};

const RemoveCampaignModal = ({ open, onClose, onConfirm, campaignTitle }) => {
  return (
    <ConfirmationModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Remove Campaign Type"
      confirmText="Remove"
      cancelText="Cancel"
      className="remove_campaign_modal"
    >
      <Typography variant="p">
        Are you sure you want to remove <span>"{campaignTitle} Campaign"</span>{" "}
        type. This action will discard all the details and recipients of it.
      </Typography>
    </ConfirmationModal>
  );
};

export { ConfirmationModal, RecurringEmailModal, RemoveCampaignModal };
