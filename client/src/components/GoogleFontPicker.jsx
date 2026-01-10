import { useEffect, useState } from "react";
import { FONTS_API_URL } from "../utils/api.js";

// Hardcoded list of popular Google Fonts as fallback
const FALLBACK_FONTS = [
  "Open Sans", "Roboto", "Lato", "Montserrat", "Oswald", "Raleway",
  "Poppins", "Inter", "Nunito", "Ubuntu", "Playfair Display", "Merriweather",
  "PT Sans", "Bebas Neue", "Lobster", "Pacifico", "Dancing Script",
  "Satisfy", "Permanent Marker", "Bangers", "Righteous", "Anton",
  "Abril Fatface", "Courgette", "Sacramento", "Great Vibes"
];

const GoogleFontPicker = ({ activeFontFamily, onChange }) => {
  const [fonts, setFonts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(FONTS_API_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Fonts API not available');
        return response.json();
      })
      .then((data) => {
        setFonts(data.fonts.map(f => f.family));
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn("Using fallback fonts:", error.message);
        // Use fallback fonts if API fails
        setFonts(FALLBACK_FONTS);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!activeFontFamily) return;

    // Load the selected font
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${activeFontFamily.replace(/ /g, "+")}:wght@400;700&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [activeFontFamily]);

  if (isLoading) {
    return <div>Loading fonts...</div>;
  }

  if (!fonts.length) {
    return <div>No fonts available</div>;
  }

  return (
    <select
      value={activeFontFamily}
      onChange={(e) => onChange({ family: e.target.value })}
      style={{
        fontFamily: activeFontFamily,
        padding: "8px",
        fontSize: "14px",
        width: "100%",
        marginBottom: "10px",
      }}
    >
      {fonts.map((font) => (
        <option
          key={font}
          value={font}
          style={{ fontFamily: font }}
        >
          {font}
        </option>
      ))}
    </select>
  );
};

export default GoogleFontPicker;

