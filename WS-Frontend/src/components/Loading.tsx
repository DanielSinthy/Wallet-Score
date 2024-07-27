import CircularProgress from "@mui/material/CircularProgress";

export const Loading = ({ sx = {}, size = 30, thickness = 4 }) => {
    return <CircularProgress color="inherit" thickness={thickness} size={size} sx={{
        color: "rgba(0, 0, 0, 0.54)",
        ...sx
    }} />;
};