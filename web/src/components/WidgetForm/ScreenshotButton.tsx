import {Camera, Trash} from "phosphor-react";
import html2canvas from "html2canvas";
import {useState} from "react";
import {Loading} from "./Loading";

interface ScreenshotButtonProps{
    onScreenshotTook: (screenshot: string | null) => void;
    screenshot: string | null;
}

export function ScreenshotButton({
    screenshot,
    onScreenshotTook}:
    ScreenshotButtonProps){
        const [isTankingScreenshot, setIsTankingScreenshot] = useState(false);

        async function handleTakeScreenshot() {
            setIsTankingScreenshot(true);
            const canvas = await html2canvas(document.querySelector('html')!);
            const base64image = canvas.toDataURL('image/png');

            onScreenshotTook(base64image);
            setIsTankingScreenshot(false);
        }

        if(screenshot){
            return (
                <button
                type="button"
                onClick={()=> onScreenshotTook(null)}
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: '180px'
                }}
                >
                    <Trash
                        weight="fill"
                    />

                </button>
            )
        }

        return(
            <button
                type="button"
                onClick={handleTakeScreenshot}
                className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:outline-brand-500 focus:right-2 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                {!isTankingScreenshot ? <Camera className="w-6 h-6 text-zinc-100" /> : <Loading /> }

            </button>
        );
}
