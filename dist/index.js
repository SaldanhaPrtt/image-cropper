"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Cropper: () => Cropper
});
module.exports = __toCommonJS(index_exports);

// src/Cropper.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
var CropperContext = (0, import_react.createContext)(null);
var useCropperContext = () => {
  const context = (0, import_react.useContext)(CropperContext);
  if (!context) {
    throw new Error("useCropperContext must be used within a Cropper.Root");
  }
  return context;
};
var CropperRoot = (_a) => {
  var _b = _a, {
    image,
    cropPadding = 25,
    aspectRatio = 1,
    minZoom = 1,
    maxZoom = 3,
    zoomSensitivity = 5e-3,
    keyboardStep = 10,
    className,
    initialCropArea,
    style,
    zoom: zoomProp,
    onCropChange,
    onZoomChange,
    children
  } = _b, restProps = __objRest(_b, [
    "image",
    "cropPadding",
    "aspectRatio",
    "minZoom",
    "maxZoom",
    "zoomSensitivity",
    "keyboardStep",
    "className",
    "initialCropArea",
    "style",
    "zoom",
    "onCropChange",
    "onZoomChange",
    "children"
  ]);
  const descriptionId = (0, import_react.useId)();
  const [imgWidth, setImgWidth] = (0, import_react.useState)(null);
  const [imgHeight, setImgHeight] = (0, import_react.useState)(null);
  const containerRef = (0, import_react.useRef)(null);
  const [cropAreaWidth, setCropAreaWidth] = (0, import_react.useState)(0);
  const [cropAreaHeight, setCropAreaHeight] = (0, import_react.useState)(0);
  const [imageWrapperWidth, setImageWrapperWidth] = (0, import_react.useState)(0);
  const [imageWrapperHeight, setImageWrapperHeight] = (0, import_react.useState)(0);
  const [offsetX, setOffsetX] = (0, import_react.useState)(0);
  const [offsetY, setOffsetY] = (0, import_react.useState)(0);
  const [internalZoom, setInternalZoom] = (0, import_react.useState)(minZoom);
  const [isDragging, setIsDragging] = (0, import_react.useState)(false);
  const dragStartPointRef = (0, import_react.useRef)({ x: 0, y: 0 });
  const dragStartOffsetRef = (0, import_react.useRef)({ x: 0, y: 0 });
  const latestRestrictedOffsetRef = (0, import_react.useRef)({
    x: offsetX,
    y: offsetY
  });
  const latestZoomRef = (0, import_react.useRef)(internalZoom);
  const isInitialSetupDoneRef = (0, import_react.useRef)(false);
  const initialPinchDistanceRef = (0, import_react.useRef)(0);
  const initialPinchZoomRef = (0, import_react.useRef)(1);
  const isPinchingRef = (0, import_react.useRef)(false);
  const calculateTransformFromArea = (area, zoom) => {
    if (!area) return null;
    if (!imgWidth || !imgHeight || imageWrapperWidth <= 0 || imageWrapperHeight <= 0 || cropAreaWidth <= 0 || cropAreaHeight <= 0 || zoom <= 0)
      return null;
    const baseScale = imgWidth / imageWrapperWidth;
    if (!baseScale || isNaN(baseScale)) return null;
    const sx = area.x;
    const sy = area.y;
    const topLeftOffsetX = -sx * zoom / baseScale;
    const topLeftOffsetY = -sy * zoom / baseScale;
    const scaledWrapperWidth = imageWrapperWidth * zoom;
    const scaledWrapperHeight = imageWrapperHeight * zoom;
    const offsetX2 = topLeftOffsetX - (cropAreaWidth - scaledWrapperWidth) / 2;
    const offsetY2 = topLeftOffsetY - (cropAreaHeight - scaledWrapperHeight) / 2;
    return {
      offsetX: offsetX2,
      offsetY: offsetY2,
      zoom
    };
  };
  const hasWarnedRef = (0, import_react.useRef)(false);
  const isZoomControlled = zoomProp !== void 0;
  const effectiveZoom = isZoomControlled ? zoomProp : internalZoom;
  const updateZoom = (0, import_react.useCallback)(
    (newZoomValue) => {
      const clampedZoom = clamp(newZoomValue, minZoom, maxZoom);
      if (onZoomChange) {
        onZoomChange(clampedZoom);
      } else if (!isZoomControlled) {
        setInternalZoom(clampedZoom);
      }
      return clampedZoom;
    },
    [minZoom, maxZoom, onZoomChange, isZoomControlled]
  );
  (0, import_react.useEffect)(() => {
    latestZoomRef.current = effectiveZoom;
  }, [effectiveZoom]);
  (0, import_react.useEffect)(() => {
    setOffsetX(0);
    setOffsetY(0);
    if (!isZoomControlled) {
      setInternalZoom(minZoom);
    }
    isInitialSetupDoneRef.current = false;
    if (!image) {
      setImgWidth(null);
      setImgHeight(null);
      return;
    }
    let isMounted = true;
    const img = new Image();
    img.onload = () => {
      if (isMounted) {
        setImgWidth(img.naturalWidth);
        setImgHeight(img.naturalHeight);
      }
    };
    img.onerror = () => {
      if (isMounted) {
        setImgWidth(null);
        setImgHeight(null);
      }
    };
    img.src = image;
    return () => {
      isMounted = false;
    };
  }, [image, minZoom, isZoomControlled]);
  const updateCropAreaDimensions = (0, import_react.useCallback)(
    (containerWidth, containerHeight) => {
      if (containerWidth <= 0 || containerHeight <= 0) {
        setCropAreaWidth(0);
        setCropAreaHeight(0);
        return;
      }
      const maxPossibleWidth = Math.max(0, containerWidth - cropPadding * 2);
      const maxPossibleHeight = Math.max(0, containerHeight - cropPadding * 2);
      let targetCropW = 0, targetCropH = 0;
      if (maxPossibleWidth / aspectRatio >= maxPossibleHeight) {
        targetCropH = maxPossibleHeight;
        targetCropW = targetCropH * aspectRatio;
      } else {
        targetCropW = maxPossibleWidth;
        targetCropH = targetCropW / aspectRatio;
      }
      setCropAreaWidth(targetCropW);
      setCropAreaHeight(targetCropH);
    },
    [aspectRatio, cropPadding]
  );
  (0, import_react.useEffect)(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) updateCropAreaDimensions(width, height);
      }
    });
    observer.observe(element);
    const initialWidth = element.clientWidth;
    const initialHeight = element.clientHeight;
    if (initialWidth > 0 && initialHeight > 0)
      updateCropAreaDimensions(initialWidth, initialHeight);
    return () => observer.disconnect();
  }, [updateCropAreaDimensions]);
  (0, import_react.useEffect)(() => {
    if (cropAreaWidth <= 0 || cropAreaHeight <= 0 || !imgWidth || !imgHeight) {
      setImageWrapperWidth(0);
      setImageWrapperHeight(0);
      return;
    }
    const naturalAspect = imgWidth / imgHeight;
    const cropAspect = cropAreaWidth / cropAreaHeight;
    let targetWrapperWidth = 0, targetWrapperHeight = 0;
    if (naturalAspect >= cropAspect) {
      targetWrapperHeight = cropAreaHeight;
      targetWrapperWidth = targetWrapperHeight * naturalAspect;
    } else {
      targetWrapperWidth = cropAreaWidth;
      targetWrapperHeight = targetWrapperWidth / naturalAspect;
    }
    setImageWrapperWidth(targetWrapperWidth);
    setImageWrapperHeight(targetWrapperHeight);
  }, [cropAreaWidth, cropAreaHeight, imgWidth, imgHeight]);
  const restrictOffset = (0, import_react.useCallback)(
    (dragOffsetX, dragOffsetY, currentZoom) => {
      if (imageWrapperWidth <= 0 || imageWrapperHeight <= 0 || cropAreaWidth <= 0 || cropAreaHeight <= 0)
        return { x: 0, y: 0 };
      const effectiveWrapperWidth = imageWrapperWidth * currentZoom;
      const effectiveWrapperHeight = imageWrapperHeight * currentZoom;
      const maxDragX = Math.max(0, (effectiveWrapperWidth - cropAreaWidth) / 2);
      const maxDragY = Math.max(
        0,
        (effectiveWrapperHeight - cropAreaHeight) / 2
      );
      return {
        x: clamp(dragOffsetX, -maxDragX, maxDragX),
        y: clamp(dragOffsetY, -maxDragY, maxDragY)
      };
    },
    [imageWrapperWidth, imageWrapperHeight, cropAreaWidth, cropAreaHeight]
  );
  const calculateCropData = (0, import_react.useCallback)(
    (finalOffsetX, finalOffsetY, finalZoom) => {
      const currentOffsetX = finalOffsetX !== void 0 ? finalOffsetX : latestRestrictedOffsetRef.current.x;
      const currentOffsetY = finalOffsetY !== void 0 ? finalOffsetY : latestRestrictedOffsetRef.current.y;
      const currentZoom = finalZoom !== void 0 ? finalZoom : effectiveZoom;
      if (!imgWidth || !imgHeight || imageWrapperWidth <= 0 || imageWrapperHeight <= 0 || cropAreaWidth <= 0 || cropAreaHeight <= 0)
        return null;
      const scaledWrapperWidth = imageWrapperWidth * currentZoom;
      const scaledWrapperHeight = imageWrapperHeight * currentZoom;
      const topLeftOffsetX = currentOffsetX + (cropAreaWidth - scaledWrapperWidth) / 2;
      const topLeftOffsetY = currentOffsetY + (cropAreaHeight - scaledWrapperHeight) / 2;
      const baseScale = imgWidth / imageWrapperWidth;
      if (isNaN(baseScale) || baseScale === 0) return null;
      const sx = -topLeftOffsetX * baseScale / currentZoom;
      const sy = -topLeftOffsetY * baseScale / currentZoom;
      const sWidth = cropAreaWidth * baseScale / currentZoom;
      const sHeight = cropAreaHeight * baseScale / currentZoom;
      const finalX = clamp(Math.round(sx), 0, imgWidth);
      const finalY = clamp(Math.round(sy), 0, imgHeight);
      const finalWidth = clamp(Math.round(sWidth), 0, imgWidth - finalX);
      const finalHeight = clamp(Math.round(sHeight), 0, imgHeight - finalY);
      if (finalWidth <= 0 || finalHeight <= 0) return null;
      return { x: finalX, y: finalY, width: finalWidth, height: finalHeight };
    },
    [
      imgWidth,
      imgHeight,
      imageWrapperWidth,
      imageWrapperHeight,
      cropAreaWidth,
      cropAreaHeight,
      effectiveZoom
    ]
  );
  (0, import_react.useEffect)(() => {
    if (imageWrapperWidth > 0 && imageWrapperHeight > 0 && cropAreaWidth > 0 && cropAreaHeight > 0) {
      const currentZoomForSetup = effectiveZoom;
      if (!isInitialSetupDoneRef.current) {
        const initialX = 0, initialY = 0;
        const restrictedInitial = restrictOffset(
          initialX,
          initialY,
          currentZoomForSetup
        );
        setOffsetX(restrictedInitial.x);
        setOffsetY(restrictedInitial.y);
        if (!isZoomControlled) setInternalZoom(currentZoomForSetup);
        dragStartOffsetRef.current = restrictedInitial;
        latestRestrictedOffsetRef.current = restrictedInitial;
        latestZoomRef.current = currentZoomForSetup;
        if (onCropChange)
          onCropChange(
            calculateCropData(
              restrictedInitial.x,
              restrictedInitial.y,
              currentZoomForSetup
            )
          );
        isInitialSetupDoneRef.current = true;
      } else {
        const restrictedCurrent = restrictOffset(
          latestRestrictedOffsetRef.current.x,
          latestRestrictedOffsetRef.current.y,
          currentZoomForSetup
        );
        if (restrictedCurrent.x !== latestRestrictedOffsetRef.current.x || restrictedCurrent.y !== latestRestrictedOffsetRef.current.y) {
          setOffsetX(restrictedCurrent.x);
          setOffsetY(restrictedCurrent.y);
          latestRestrictedOffsetRef.current = restrictedCurrent;
          dragStartOffsetRef.current = restrictedCurrent;
        }
        if (onCropChange)
          onCropChange(
            calculateCropData(
              restrictedCurrent.x,
              restrictedCurrent.y,
              currentZoomForSetup
            )
          );
      }
    } else {
      isInitialSetupDoneRef.current = false;
      setOffsetX(0);
      setOffsetY(0);
      if (!isZoomControlled) setInternalZoom(minZoom);
      dragStartOffsetRef.current = { x: 0, y: 0 };
      latestRestrictedOffsetRef.current = { x: 0, y: 0 };
      latestZoomRef.current = effectiveZoom;
      if (onCropChange) onCropChange(null);
    }
  }, [
    imageWrapperWidth,
    imgHeight,
    cropAreaWidth,
    cropAreaHeight,
    restrictOffset,
    onCropChange,
    calculateCropData,
    minZoom,
    effectiveZoom,
    isZoomControlled,
    updateZoom
  ]);
  (0, import_react.useEffect)(() => {
    const checkTimeout = setTimeout(() => {
      if (containerRef.current && !hasWarnedRef.current) {
        const hasDescription = document.getElementById(descriptionId);
        if (!hasDescription) {
          hasWarnedRef.current = true;
        }
      }
    }, 100);
    return () => clearTimeout(checkTimeout);
  }, [descriptionId]);
  const handleInteractionEnd = (0, import_react.useCallback)(() => {
    if (onCropChange) {
      const finalData = calculateCropData(
        latestRestrictedOffsetRef.current.x,
        latestRestrictedOffsetRef.current.y,
        effectiveZoom
      );
      onCropChange(finalData);
    }
  }, [onCropChange, calculateCropData, effectiveZoom]);
  const handleMouseDown = (0, import_react.useCallback)(
    (e) => {
      if (e.button !== 0 || !containerRef.current) return;
      e.preventDefault();
      setIsDragging(true);
      isPinchingRef.current = false;
      dragStartPointRef.current = { x: e.clientX, y: e.clientY };
      dragStartOffsetRef.current = {
        x: latestRestrictedOffsetRef.current.x,
        y: latestRestrictedOffsetRef.current.y
      };
      const handleMouseMove = (ev) => {
        const deltaX = ev.clientX - dragStartPointRef.current.x;
        const deltaY = ev.clientY - dragStartPointRef.current.y;
        const targetOffsetX = dragStartOffsetRef.current.x + deltaX;
        const targetOffsetY = dragStartOffsetRef.current.y + deltaY;
        const restricted = restrictOffset(
          targetOffsetX,
          targetOffsetY,
          effectiveZoom
        );
        latestRestrictedOffsetRef.current = restricted;
        setOffsetX(restricted.x);
        setOffsetY(restricted.y);
      };
      const handleMouseUp = () => {
        setIsDragging(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        handleInteractionEnd();
      };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [restrictOffset, effectiveZoom, handleInteractionEnd]
  );
  const handleWheel = (0, import_react.useCallback)(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!containerRef.current || imageWrapperWidth <= 0 || imageWrapperHeight <= 0)
        return;
      const currentZoom = latestZoomRef.current;
      const currentOffsetX = latestRestrictedOffsetRef.current.x;
      const currentOffsetY = latestRestrictedOffsetRef.current.y;
      const delta = e.deltaY * -zoomSensitivity;
      const targetZoom = currentZoom + delta;
      if (clamp(targetZoom, minZoom, maxZoom) === currentZoom) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pointerX = e.clientX - rect.left - rect.width / 2;
      const pointerY = e.clientY - rect.top - rect.height / 2;
      const imagePointX = (pointerX - currentOffsetX) / currentZoom;
      const imagePointY = (pointerY - currentOffsetY) / currentZoom;
      const finalNewZoom = updateZoom(targetZoom);
      const newOffsetX = pointerX - imagePointX * finalNewZoom;
      const newOffsetY = pointerY - imagePointY * finalNewZoom;
      const restrictedNewOffset = restrictOffset(
        newOffsetX,
        newOffsetY,
        finalNewZoom
      );
      setOffsetX(restrictedNewOffset.x);
      setOffsetY(restrictedNewOffset.y);
      latestRestrictedOffsetRef.current = restrictedNewOffset;
      if (onCropChange) {
        const finalData = calculateCropData(
          restrictedNewOffset.x,
          restrictedNewOffset.y,
          finalNewZoom
        );
        onCropChange(finalData);
      }
    },
    [
      restrictOffset,
      calculateCropData,
      imageWrapperWidth,
      imageWrapperHeight,
      onCropChange,
      minZoom,
      maxZoom,
      zoomSensitivity,
      updateZoom
    ]
  );
  const getPinchDistance = (touches) => Math.sqrt(
    Math.pow(touches[1].clientX - touches[0].clientX, 2) + Math.pow(touches[1].clientY - touches[0].clientY, 2)
  );
  const getPinchCenter = (touches) => ({
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2
  });
  const handleTouchStart = (0, import_react.useCallback)(
    (e) => {
      if (!containerRef.current || imageWrapperWidth <= 0 || imageWrapperHeight <= 0)
        return;
      e.preventDefault();
      const touches = e.touches;
      if (touches.length === 1) {
        setIsDragging(true);
        isPinchingRef.current = false;
        dragStartPointRef.current = {
          x: touches[0].clientX,
          y: touches[0].clientY
        };
        dragStartOffsetRef.current = {
          x: latestRestrictedOffsetRef.current.x,
          y: latestRestrictedOffsetRef.current.y
        };
      } else if (touches.length === 2) {
        setIsDragging(false);
        isPinchingRef.current = true;
        initialPinchDistanceRef.current = getPinchDistance(touches);
        initialPinchZoomRef.current = latestZoomRef.current;
        dragStartOffsetRef.current = {
          x: latestRestrictedOffsetRef.current.x,
          y: latestRestrictedOffsetRef.current.y
        };
      }
    },
    [imageWrapperWidth, imageWrapperHeight]
  );
  const handleTouchMove = (0, import_react.useCallback)(
    (e) => {
      if (!containerRef.current || imageWrapperWidth <= 0 || imageWrapperHeight <= 0)
        return;
      e.preventDefault();
      const touches = e.touches;
      if (touches.length === 1 && isDragging && !isPinchingRef.current) {
        const deltaX = touches[0].clientX - dragStartPointRef.current.x;
        const deltaY = touches[0].clientY - dragStartPointRef.current.y;
        const targetOffsetX = dragStartOffsetRef.current.x + deltaX;
        const targetOffsetY = dragStartOffsetRef.current.y + deltaY;
        const restricted = restrictOffset(
          targetOffsetX,
          targetOffsetY,
          effectiveZoom
        );
        latestRestrictedOffsetRef.current = restricted;
        setOffsetX(restricted.x);
        setOffsetY(restricted.y);
      } else if (touches.length === 2 && isPinchingRef.current) {
        const currentPinchDistance = getPinchDistance(touches);
        const scale = currentPinchDistance / initialPinchDistanceRef.current;
        const currentZoom = initialPinchZoomRef.current;
        const targetZoom = currentZoom * scale;
        if (clamp(targetZoom, minZoom, maxZoom) === latestZoomRef.current)
          return;
        const pinchCenter = getPinchCenter(touches);
        const rect = containerRef.current.getBoundingClientRect();
        const pinchCenterX = pinchCenter.x - rect.left - rect.width / 2;
        const pinchCenterY = pinchCenter.y - rect.top - rect.height / 2;
        const currentOffsetX = dragStartOffsetRef.current.x;
        const currentOffsetY = dragStartOffsetRef.current.y;
        const imagePointX = (pinchCenterX - currentOffsetX) / currentZoom;
        const imagePointY = (pinchCenterY - currentOffsetY) / currentZoom;
        const finalNewZoom = updateZoom(targetZoom);
        const newOffsetX = pinchCenterX - imagePointX * finalNewZoom;
        const newOffsetY = pinchCenterY - imagePointY * finalNewZoom;
        const restrictedNewOffset = restrictOffset(
          newOffsetX,
          newOffsetY,
          finalNewZoom
        );
        setOffsetX(restrictedNewOffset.x);
        setOffsetY(restrictedNewOffset.y);
        latestRestrictedOffsetRef.current = restrictedNewOffset;
        if (onCropChange) {
          const finalData = calculateCropData(
            restrictedNewOffset.x,
            restrictedNewOffset.y,
            finalNewZoom
          );
          onCropChange(finalData);
        }
      }
    },
    [
      isDragging,
      restrictOffset,
      minZoom,
      maxZoom,
      imageWrapperWidth,
      imageWrapperHeight,
      effectiveZoom,
      updateZoom,
      onCropChange,
      calculateCropData
    ]
  );
  const handleTouchEnd = (0, import_react.useCallback)(
    (e) => {
      e.preventDefault();
      const touches = e.touches;
      if (isPinchingRef.current && touches.length < 2) {
        isPinchingRef.current = false;
        if (touches.length === 1) {
          setIsDragging(true);
          dragStartPointRef.current = {
            x: touches[0].clientX,
            y: touches[0].clientY
          };
          dragStartOffsetRef.current = {
            x: latestRestrictedOffsetRef.current.x,
            y: latestRestrictedOffsetRef.current.y
          };
        } else {
          setIsDragging(false);
          handleInteractionEnd();
        }
      } else if (isDragging && touches.length === 0) {
        setIsDragging(false);
        handleInteractionEnd();
      }
    },
    [isDragging, handleInteractionEnd]
  );
  const handleKeyDown = (0, import_react.useCallback)(
    (e) => {
      if (imageWrapperWidth <= 0) return;
      let targetOffsetX = latestRestrictedOffsetRef.current.x;
      let targetOffsetY = latestRestrictedOffsetRef.current.y;
      let moved = false;
      switch (e.key) {
        case "ArrowUp":
          targetOffsetY += keyboardStep;
          moved = true;
          break;
        case "ArrowDown":
          targetOffsetY -= keyboardStep;
          moved = true;
          break;
        case "ArrowLeft":
          targetOffsetX += keyboardStep;
          moved = true;
          break;
        case "ArrowRight":
          targetOffsetX -= keyboardStep;
          moved = true;
          break;
        default:
          return;
      }
      if (moved) {
        e.preventDefault();
        const restricted = restrictOffset(
          targetOffsetX,
          targetOffsetY,
          effectiveZoom
        );
        if (restricted.x !== latestRestrictedOffsetRef.current.x || restricted.y !== latestRestrictedOffsetRef.current.y) {
          latestRestrictedOffsetRef.current = restricted;
          setOffsetX(restricted.x);
          setOffsetY(restricted.y);
        }
      }
    },
    [keyboardStep, imageWrapperWidth, restrictOffset, effectiveZoom]
  );
  const handleKeyUp = (0, import_react.useCallback)(
    (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        handleInteractionEnd();
      }
    },
    [handleInteractionEnd]
  );
  (0, import_react.useEffect)(() => {
    const node = containerRef.current;
    if (!node) return;
    const options = { passive: false };
    node.addEventListener("wheel", handleWheel, options);
    node.addEventListener("touchstart", handleTouchStart, options);
    node.addEventListener("touchmove", handleTouchMove, options);
    node.addEventListener("touchend", handleTouchEnd, options);
    node.addEventListener("touchcancel", handleTouchEnd, options);
    return () => {
      node.removeEventListener("wheel", handleWheel, options);
      node.removeEventListener("touchstart", handleTouchStart, options);
      node.removeEventListener("touchmove", handleTouchMove, options);
      node.removeEventListener("touchend", handleTouchEnd, options);
      node.removeEventListener("touchcancel", handleTouchEnd, options);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);
  const getRootProps = (0, import_react.useCallback)(
    () => ({
      className,
      style,
      onMouseDown: handleMouseDown,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      tabIndex: 0,
      role: "application",
      "aria-label": "Interactive image cropper",
      "aria-describedby": descriptionId,
      "aria-valuemin": minZoom,
      "aria-valuemax": maxZoom,
      "aria-valuenow": effectiveZoom,
      "aria-valuetext": `Zoom: ${Math.round(effectiveZoom * 100)}%`
    }),
    [
      className,
      style,
      handleMouseDown,
      handleKeyDown,
      handleKeyUp,
      descriptionId,
      minZoom,
      maxZoom,
      effectiveZoom
    ]
  );
  const getImageWrapperStyle = (0, import_react.useCallback)(
    () => ({
      width: imageWrapperWidth,
      height: imageWrapperHeight,
      transform: `translate3d(${offsetX}px, ${offsetY}px, 0px) scale(${effectiveZoom})`,
      position: "absolute",
      left: `calc(50% - ${imageWrapperWidth / 2}px)`,
      top: `calc(50% - ${imageWrapperHeight / 2}px)`,
      willChange: "transform"
    }),
    [imageWrapperWidth, imageWrapperHeight, offsetX, offsetY, effectiveZoom]
  );
  const getImageProps = (0, import_react.useCallback)(
    () => ({
      src: image,
      alt: "Image being cropped",
      draggable: false,
      "aria-hidden": true
    }),
    [image]
  );
  const getCropAreaStyle = (0, import_react.useCallback)(
    () => ({
      width: cropAreaWidth,
      height: cropAreaHeight
    }),
    [cropAreaWidth, cropAreaHeight]
  );
  const getCropAreaProps = (0, import_react.useCallback)(
    () => ({
      style: getCropAreaStyle(),
      "aria-hidden": true
    }),
    [getCropAreaStyle]
  );
  const handleReset = (0, import_react.useCallback)(() => {
    var _a2, _b2, _c;
    if (initialCropArea) {
      const transform = calculateTransformFromArea(
        initialCropArea,
        initialCropArea.scale
      );
      if (transform) {
        setOffsetX(transform.offsetX);
        setOffsetY(transform.offsetY);
        setInternalZoom(transform.zoom);
      }
      updateZoom(initialCropArea.scale);
      calculateCropData(
        transform == null ? void 0 : transform.offsetX,
        transform == null ? void 0 : transform.offsetY,
        transform == null ? void 0 : transform.zoom
      );
      latestRestrictedOffsetRef.current = {
        x: (_a2 = transform == null ? void 0 : transform.offsetX) != null ? _a2 : 0,
        y: (_b2 = transform == null ? void 0 : transform.offsetY) != null ? _b2 : 0
      };
      latestZoomRef.current = (_c = transform == null ? void 0 : transform.zoom) != null ? _c : minZoom;
    }
  }, [initialCropArea, calculateTransformFromArea]);
  (0, import_react.useEffect)(() => {
    handleReset();
  }, [
    initialCropArea,
    imgWidth,
    imgHeight,
    imageWrapperWidth,
    imageWrapperHeight,
    cropAreaWidth,
    cropAreaHeight
  ]);
  const contextValue = {
    containerRef,
    image,
    imgWidth,
    imgHeight,
    cropAreaWidth,
    cropAreaHeight,
    imageWrapperWidth,
    imageWrapperHeight,
    offsetX,
    offsetY,
    effectiveZoom,
    minZoom,
    maxZoom,
    getRootProps,
    getImageProps,
    getImageWrapperStyle,
    getCropAreaProps,
    getCropAreaStyle,
    handleReset,
    descriptionId
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CropperContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", __spreadProps(__spreadValues(__spreadValues({ ref: containerRef }, getRootProps()), restProps), { children })) });
};
var CropperImage = (_a) => {
  var _b = _a, { className } = _b, restProps = __objRest(_b, ["className"]);
  const { image, getImageProps, getImageWrapperStyle } = useCropperContext();
  if (!image) return null;
  const imageProps = getImageProps();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: getImageWrapperStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", __spreadValues(__spreadProps(__spreadValues({}, imageProps), { className }), restProps)) });
};
var CropperCropArea = (_a) => {
  var _b = _a, {
    className,
    style
  } = _b, restProps = __objRest(_b, [
    "className",
    "style"
  ]);
  const { cropAreaWidth, cropAreaHeight, getCropAreaProps, getCropAreaStyle } = useCropperContext();
  if (cropAreaWidth <= 0 || cropAreaHeight <= 0) return null;
  const areaProps = getCropAreaProps();
  const areaStyle = getCropAreaStyle();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    __spreadValues(__spreadProps(__spreadValues({}, areaProps), {
      style: __spreadValues(__spreadValues(__spreadValues({}, areaProps.style), style), areaStyle),
      className
    }), restProps)
  );
};
var CropperDescription = (_a) => {
  var _b = _a, {
    children,
    className
  } = _b, restProps = __objRest(_b, [
    "children",
    "className"
  ]);
  const { descriptionId } = useCropperContext();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", __spreadProps(__spreadValues({ id: descriptionId, className }, restProps), { children: children != null ? children : (
    // Default description if none provided by user
    "Use mouse wheel or pinch gesture to zoom. Drag with mouse or touch, or use arrow keys to pan the image within the crop area."
  ) }));
};
var Cropper = {
  Root: CropperRoot,
  Image: CropperImage,
  CropArea: CropperCropArea,
  Description: CropperDescription,
  context: useCropperContext
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Cropper
});
