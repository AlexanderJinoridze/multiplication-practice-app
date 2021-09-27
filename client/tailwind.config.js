module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class", // or "media" or "class"
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            current: "currentColor",
            white: "#fff",
            gray: {
                DEFAULT: "#707F8F",
                "50":    "#F9FAFB",
                "100":   "#E2E6E9",
                "200":   "#C6CCD2",
                "300":   "#A9B3BC",
                "400":   "#8D99A5",
                "500":   "#707F8F",
                "600":   "#5A6672",
                "700":   "#434C56",
                "800":   "#2D3339",
                "900":   "#16191D"
            },
            blue: {
                DEFAULT: "#006FEE",
                "50":    "#D4E8FF",
                "100":   "#BBDBFF",
                "200":   "#88BFFF",
                "300":   "#55A4FF",
                "400":   "#2289FF",
                "500":   "#006FEE",
                "600":   "#0057BB",
                "700":   "#003F88",
                "800":   "#002855",
                "900":   "#001A38"
            },
            yellow: {
                DEFAULT: "#FFBF00",
                "50":    "#FFE28A",
                "100":   "#FFDE7A",
                "200":   "#FFD65C",
                "300":   "#FFCE3D",
                "400":   "#FFC71F",
                "500":   "#FFBF00",
                "600":   "#F5A700",
                "700":   "#EB9000",
                "800":   "#D67600",
                "900":   "#C26700"
            },
            red: {
                DEFAULT: "#E00F0F",
                "50":    "#F34949",
                "100":   "#F23A3A",
                "200":   "#F01E1E",
                "300":   "#E00F0F",
                "400":   "#C40D0D",
                "500":   "#A70B0B",
                "600":   "#8A0909",
                "700":   "#6E0707",
                "800":   "#510505",
                "900":   "#340303"
            },
            green: {
                DEFAULT: "#009B00",
                "50":    "#00CE00",
                "100":   "#00C400",
                "200":   "#00AF00",
                "300":   "#009B00",
                "400":   "#008600",
                "500":   "#007200",
                "600":   "#006300",
                "700":   "#005300",
                "800":   "#004400",
                "900":   "#003500"
            }
        }
    },
    variants: {
        extend: {
            backgroundColor: ['dark'],
            textColor: ['dark']
        },
    },
    plugins: [],
}
