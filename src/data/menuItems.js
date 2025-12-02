import MessageIcon from "@mui/icons-material/Message";
import SaveIcon from "@mui/icons-material/Save";
import CopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import EmailIcon from "@mui/icons-material/SendOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import DifferenceOutlinedIcon from "@mui/icons-material/DifferenceOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import email_icon from "../assets/icons/email_campaign_icon.svg";
import notification_icon from "../assets/icons/notification_campaign_icon.svg";
import feed_icon from "../assets/icons/feed_campaign_icon.svg";
import sms_icon from "../assets/icons/sms_campaign_icon.svg";

export { email_icon, notification_icon, feed_icon, sms_icon };

export const menuItems = [
  {
    icon: <RestoreOutlinedIcon />,
    label: "Audit Log",
    onClick: () => alert("Option 1 clicked"),
  },
  {
    icon: <EmailIcon />,
    label: "Send Test Email",
    onClick: () => alert("Option 2 clicked"),
  },
  {
    icon: <MessageOutlinedIcon />,
    label: "Send Test Message",
    onClick: () => alert("Option 3 clicked"),
  },
  {
    icon: <DifferenceOutlinedIcon />,
    label: "Save as Template",
    onClick: () => alert("Option 5 clicked"),
  },
  {
    icon: <ContentCopyOutlinedIcon />,
    label: "Copy Campaign",
    onClick: () => alert("Option 6 clicked"),
  },
  {
    icon: <DeleteOutlinedIcon />,
    label: "Delete Campaign",
    onClick: () => alert("Option 7 clicked"),
  },
];

export const menuItems2 = [
  {
    icon: <SettingsIcon />,
    label: "Settings",
    onClick: () => alert("Settings clicked"),
  },
  {
    icon: <HistoryIcon />,
    label: "View History",
    onClick: () => alert("History clicked"),
  },
  {
    icon: <EmailIcon />,
    label: "Resend Email",
    onClick: () => alert("Resend Email clicked"),
  },
  {
    icon: <MessageIcon />,
    label: "Send New Message",
    onClick: () => alert("New Message clicked"),
  },
  {
    icon: <SaveIcon />,
    label: "Save Draft",
    onClick: () => alert("Save Draft clicked"),
  },
  {
    icon: <CopyIcon />,
    label: "Duplicate Campaign",
    onClick: () => alert("Duplicate Campaign clicked"),
  },
  {
    icon: <DeleteIcon />,
    label: "Remove Campaign",
    onClick: () => alert("Remove Campaign clicked"),
  },
];

export const menuItems3 = [
  { value: "event", label: "Event Notification" },
  { value: "reminder", label: "Reminder Alert" },
  { value: "subscription", label: "Subscription Update" },
  { value: "promotion", label: "Promotional Offer" },
  { value: "feedback", label: "Feedback Request" },
];

export const fileTypeOptions = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
];

export const campaignSlots = [
  {
    id: 1,
    icon: email_icon,
    title: "Email Campaign",
    description:
      "Use email builder to launch an email campaign in minutes and share it with your audience.",
    colorClass: "blue",
    emailcount: "60",
    smscount: "0",
  },
  {
    id: 2,
    icon: notification_icon,
    title: "Notification Campaign",
    description:
      "Use notification builder to launch a notification campaign in minutes and share it with your target audience.",
    colorClass: "purple",
    emailcount: "0",
    smscount: "0",
  },
  {
    id: 3,
    icon: feed_icon,
    title: "Feed Campaign",
    description: "Use Feed builder to launch a campaign in minutes.",
    colorClass: "darkyellow",
    emailcount: "0",
    smscount: "0",
  },
  {
    id: 4,
    icon: sms_icon,
    title: "SMS Campaign",
    description: "Use SMS builder to launch a campaign in minutes.",
    colorClass: "green",
    emailcount: "0",
    smscount: "52",
  },
];

export const campaignType = [
  { title: "Email" },
  { title: "Notification" },
  { title: "SMS" },
  { title: "Feed" },
];

export const launchTypes = [
  { value: "finalize", label: "On Finalize" },
  { value: "datetime", label: "Select date & time" },
  { value: "recurring", label: "Recurring Emails" },
];

export const recipent = [
  { value: 10, label: "Member" },
  { value: 20, label: "Lead" },
  { value: 30, label: "Prospect" },
  { value: 40, label: "Contact" },
  { value: 50, label: "Banquet Contact" },
];

export const permissionOptionData = [
  { value: 10, label: "No Access" },
  { value: 20, label: "Read only" },
  { value: 30, label: "Editable" },
];

export const notificationTypeOption = [
  { value: 10, label: "Custom Notification" },
  { value: 20, label: "Event Notification" },
];

export const postTypeOptions = [
  { value: 10, label: "Golf" },
  { value: 20, label: "Tennis" },
  { value: 30, label: "Dining" },
];

export const feedFromOptions = [
  { value: 10, label: "Jason Julius" },
  { value: 20, label: "John Doe" },
  { value: 30, label: "Sheldon Nazreth" },
];

export const allowedSitesOptions = [
  { value: 10, label: "All" },
  { value: 20, label: "Northstar club" },
  { value: 30, label: "Pine club" },
];

export const actionTypes = [
  { value: 10, label: "Event" },
  { value: 20, label: "Menu Tab" },
  { value: 30, label: "Customized Link" },
];

export const durationOptions = [
  { value: 10, label: "Indefinitely" },
  { value: 20, label: "Expire Post" },
];

export const durationOptionsPin = [
  { value: 10, label: "Indefinitely" },
  { value: 20, label: "Unpin Post" },
];

export const eventNumbers = [101, 102, 103, 104];

export const searchFilterOption = [
  { value: "filter1", label: "Filter 1" },
  { value: "filter2", label: "Filter 2" },
];

export const memberTypeOptions = [
  { value: "employee", label: "Employee" },
  { value: "guest", label: "Guest" },
];

export const selfBilled = [
  { value: "all", label: "All" },
  { value: "option", label: "Option" },
];

export const memberGuest = [
  { value: "member", label: "Member" },
  { value: "guest", label: "Guest" },
];

export const memberCharge = [
  { value: "all", label: "All" },
  { value: "option", label: "Option" },
];

export const memberStatus = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "In Active" },
];

export const dependantType = [
  { value: "domesticemployee", label: "Domestic Employee" },
  { value: "employee", label: "Employee" },
];

export const memberGuestGroup = [
  { value: "winelovers", label: "AGIF Wine Lovers" },
  { value: "tealovers", label: "AGIF Tea Lovers" },
];

export const subSections = [
  { value: "guestpass", label: "Guest Pass" },
  { value: "memberpass", label: "Member Pass" },
];

export const ownerOptions = [
  { value: "John", label: "John" },
  { value: "Doe", label: "Doe" },
];

export const qualifiersOptions = [
  { value: "contains", label: "Contains" },
  { value: "notcontains", label: "Does not Contain" },
];
