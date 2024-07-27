import React from 'react';
import { Box } from '@mui/material';

interface LabelProps {
    color: keyof typeof colorScheme;
    name: string;
}

const colorScheme = {
    red: {
        color: "#b61d19",
        backgroundColor: "#ffe4de"
    },
    yellow: {
        color: "#bb750e",
        backgroundColor: "#fff1d6"
    },
    blue: {
        color: "#006d9d",
        backgroundColor: "#d5f4f9"
    },
}

const Label: React.FC<LabelProps> = ({ color, name }) => {
    return (
        <Box sx={{
            padding: "3px",
            px: "6px",
            fontSize: ".9rem",
            borderRadius: "8px",
            fontWeight: 700,
            textAlign: "center",
            backgroundColor: colorScheme[color].backgroundColor,
            color: colorScheme[color].color
        }}>
            {name}
        </Box>
    );
};

export default Label;
