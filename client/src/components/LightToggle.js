import React, { useEffect, useState } from "react";

export default function LightToggle(props) {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));
    const [content, setContent] = useState("");

    useEffect(()=>{
        if(isDark) {
            setContent(props.content.dark);
            localStorage.theme = "dark";
            document.documentElement.classList.add("dark");
        } else {
            setContent(props.content.light);
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark");
        }
    },[isDark]);

    const changeMode = () => {
        if(isDark){
            setIsDark(false);
        } else {
            setIsDark(true);
        }
    }

    return(
        content && <button { ...props.attribute } onClick={ changeMode }>{ content }</button>
    );
}