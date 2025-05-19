"use client";

interface TextureOverlayProps {
  textureUrl: string;
  opacity?: number;
  className?: string;
  blendMode?: string;
}

export default function TextureOverlay({
  textureUrl,
  opacity = 0.2,
  blendMode = "overlay",
  className = "",
}: TextureOverlayProps) {
  return (
    <>
      {/* Main texture layer */}
      <div
        className={`fixed inset-0 w-screen h-full pointer-events-none z-20 ${className}`}
        style={{
          backgroundImage: `url('${textureUrl}')`,
          backgroundRepeat: "repeat",
          backgroundSize: "1000px 1000px", // Large fixed size to ensure coverage
          opacity: opacity,
          mixBlendMode: blendMode as any,
        }}
      />
    </>
  );
}
