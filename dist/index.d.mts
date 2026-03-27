import * as React from 'react';

type Area = {
    x: number;
    y: number;
    width: number;
    height: number;
};
interface CropperContextValue {
    containerRef: React.RefObject<HTMLDivElement | null>;
    image: string | null;
    imgWidth: number | null;
    imgHeight: number | null;
    cropAreaWidth: number;
    cropAreaHeight: number;
    imageWrapperWidth: number;
    imageWrapperHeight: number;
    offsetX: number;
    offsetY: number;
    effectiveZoom: number;
    minZoom: number;
    maxZoom: number;
    getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
    getImageProps: () => React.ImgHTMLAttributes<HTMLImageElement>;
    getImageWrapperStyle: () => React.CSSProperties;
    getCropAreaProps: () => React.HTMLAttributes<HTMLDivElement>;
    getCropAreaStyle: () => React.CSSProperties;
    handleReset: () => void;
    descriptionId: string;
}
interface CropperRootProps extends React.HTMLAttributes<HTMLDivElement> {
    image: string;
    initialCropArea: (Area & {
        scale: number;
    }) | null;
    cropPadding?: number;
    aspectRatio?: number;
    minZoom?: number;
    maxZoom?: number;
    zoomSensitivity?: number;
    keyboardStep?: number;
    zoom?: number;
    onCropChange?: (pixels: Area | null) => void;
    onZoomChange?: (zoom: number) => void;
    children: React.ReactNode;
}
declare const Cropper: {
    Root: React.FC<CropperRootProps>;
    Image: React.FC<Omit<React.ImgHTMLAttributes<HTMLImageElement>, "style" | "draggable" | "src" | "alt">>;
    CropArea: React.FC<React.HTMLAttributes<HTMLDivElement>>;
    Description: React.FC<React.HTMLAttributes<HTMLDivElement>>;
    context: () => CropperContextValue;
};

export { Cropper };
