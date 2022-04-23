
interface IDarkMode {
    darkPrimary: string,
    darkSecondary: string,
    darkTertiary: string,
    elevation: string,
    darkModeBtn: string,
    darkModeBtnGray: string,
    darkModeLink: string,
}

export const darkMode:IDarkMode = {
    darkPrimary: "",
    darkSecondary: "",
    darkTertiary: "",
    elevation: "",
    darkModeBtn: "",
    darkModeBtnGray: "",
    darkModeLink: "",
}

export const applyCurrentTheme = () => {
    const toggle = localStorage.getItem("darkmode");
    if (toggle === "darkmode") {
        darkMode.darkPrimary= " darkmode-primary"; // Space before the name for clear html (avoid multiple spaces in htmls)
        darkMode.darkSecondary = " darkmode-secondary"; 
        darkMode.darkTertiary = " darkmode-tertiary";
        darkMode.elevation = " elevation-1dp";
        darkMode.darkModeBtn = " darkmode-btn";
        darkMode.darkModeBtnGray = " darkmode-btn-gray";
        darkMode.darkModeLink = " darkmode-link";
      } else {
        darkMode.darkPrimary= "";
        darkMode.darkSecondary = "";
        darkMode.darkTertiary = "";
        darkMode.elevation = "";
        darkMode.darkModeBtnGray = "";
        darkMode.darkModeBtn = "";
        darkMode.darkModeLink = "";
      }
    return darkMode;
}


