import { fontPixelify } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function ChanhDaiMark(props: React.ComponentProps<"div">) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        fontPixelify.className,
        "flex items-center justify-center font-bold text-xl tracking-wider select-none",
        className
      )}
      style={{ imageRendering: 'pixelated' }}
      {...rest}
    >
      MOHAMMED
    </div>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50"><text x="100" y="35" font-size="24" font-weight="700" text-anchor="middle" fill="${color}" font-family="Pixelify Sans, ui-monospace, monospace">MOHAMMED</text></svg>`;
}
