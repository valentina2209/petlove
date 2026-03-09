import { useEffect, useState } from "react";
import css from "./Loader.module.css"

function Loader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 1 : 100))
        }, 30)

        return () => clearInterval(interval);
    }, []);

    const radius = 65;
    const circumference = 2 * Math.PI * radius;
    const offset = progress >= 100
        ? -2
        : circumference - (progress / 100) * circumference;

    return (
        <div className={css.loaderOverlay}>
            <div className={css.loaderCounter}>
                <svg className={css.svgCircle} viewBox="0 0 200 200">
                    <defs>
                        <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" /> 
                        </filter>

                        <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="27.09%" stopColor="#FFFFFF" />
                            <stop offset="77.14%" stopColor="rgba(255, 255, 255, 0)" />
                        </linearGradient>
                    </defs>
                    <circle
                        className={css.circleProgress}
                        cx="100"
                        cy="100"
                        r={radius}
                        strokeDasharray={circumference}
                        style={{
                            strokeDashoffset: offset,
                            filter: "url(#blurFilter)"
                        }}
                        stroke="url(#loaderGradient)"
                    />
                </svg>
                <span className={css.percent}>{Math.round(progress)}%</span>   
            </div>
        </div>
    );
}

export default Loader;