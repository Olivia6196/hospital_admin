const fontVariable = (name: string, fallback: string) => ({
    variable: name,
    className: fallback,
});

export const inter = fontVariable('--font-inter', 'font-sans');
export const dancingScript = fontVariable('--font-dancing', 'font-cursive');

