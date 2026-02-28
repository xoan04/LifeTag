'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        primary: {
            main: '#C62828', // Deep red
        },
        secondary: {
            main: '#1565C0', // Blue
        },
        background: {
            default: '#F5F5F5', // Light gray
        },
        error: {
            main: '#D32F2F', // Strong red for alerts
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1.1rem',
        },
    },
    shape: {
        borderRadius: 16, // Rounded cards
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '12px 24px', // Big tap-friendly buttons
                    borderRadius: '12px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // Subtle shadow
                },
            },
        },
    },
});

export default theme;
