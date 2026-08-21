"use client";

import { useEffect, useRef, useState } from "react";
import {
  Viewer,
  Ion,
  Cartesian3,
  Cartesian2,
  Color,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  SceneTransforms,
  defined,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

import FirePopup from "@/components/map/fire-popup";
import type { WildfireDetection } from "@/types/wildfire";

declare global {
  interface Window {
    CESIUM_BASE_URL?: string;
  }
}

interface GlobeProps {
  fireData: WildfireDetection[];
}

function confidenceColor(confidence?: string): Color {
  switch (confidence?.toLowerCase()) {
    case "h":
      return Color.fromCssColorString("#ef233c");
    case "l":
      return Color.fromCssColorString("#ffb703");
    default:
      return Color.fromCssColorString("#fb8500");
  }
}

function markerSize(frp?: number): number {
  if (frp == null) return 10;
  return Math.min(18, Math.max(8, 8 + frp / 10));
}

export default function Globe({ fireData }: GlobeProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const handlerRef = useRef<ScreenSpaceEventHandler | null>(null);
  const hasFlownRef = useRef(false);
  const fireDataRef = useRef(fireData);

  const [selectedFire, setSelectedFire] = useState<WildfireDetection | null>(
    null,
  );
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  fireDataRef.current = fireData;

  useEffect(() => {
    if (!mapRef.current || viewerRef.current) return;

    window.CESIUM_BASE_URL = "/_next/static/cesium";
    Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjk0YzRkYy0zOTZkLTQwYzMtOTJkOC00OWJhMTc5OGRiZDUiLCJpZCI6NDU5Njk0LCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODQ4MTAyNDF9._xuCT-cZKHp_EksgznCQn2CE6uKCruIkjswMjJX3KdQ";

    const viewer = new Viewer(mapRef.current, {
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      infoBox: false,
      selectionIndicator: true,
    });

    viewerRef.current = viewer;

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handlerRef.current = handler;

    handler.setInputAction((movement: { position: Cartesian2 }) => {
      const picked = viewer.scene.pick(movement.position);

      if (defined(picked) && picked.id?.id != null) {
        const fire = fireDataRef.current.find(
          (item) => item.id === String(picked.id.id),
        );

        if (fire) {
          setSelectedFire(fire);
          return;
        }
      }

      setSelectedFire(null);
    }, ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction((movement: { endPosition: Cartesian2 }) => {
      const picked = viewer.scene.pick(movement.endPosition);
      viewer.canvas.style.cursor =
        defined(picked) && picked.id?.id != null ? "pointer" : "default";
    }, ScreenSpaceEventType.MOUSE_MOVE);

    return () => {
      handler.destroy();
      handlerRef.current = null;
      viewer.destroy();
      viewerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.entities.removeAll();

    fireData.forEach((fire) => {
      if (!Number.isFinite(fire.latitude) || !Number.isFinite(fire.longitude)) {
        return;
      }

      viewer.entities.add({
        id: fire.id,
        position: Cartesian3.fromDegrees(fire.longitude, fire.latitude),
        point: {
          pixelSize: markerSize(fire.frp),
          color: confidenceColor(fire.confidence),
          outlineColor: Color.WHITE,
          outlineWidth: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });
    });

    if (fireData.length > 0 && !hasFlownRef.current) {
      hasFlownRef.current = true;
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(
          fireData[0]!.longitude,
          fireData[0]!.latitude,
          8_000_000,
        ),
        duration: 1.5,
      });
    }
  }, [fireData]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !selectedFire) {
      setPopupPosition(null);
      return;
    }

    const updatePopupPosition = () => {
      const entity = viewer.entities.getById(selectedFire.id);
      const position = entity?.position?.getValue(viewer.clock.currentTime);

      if (!position) {
        setPopupPosition(null);
        return;
      }

      const screenPosition = SceneTransforms.worldToWindowCoordinates(
        viewer.scene,
        position,
      );

      if (!screenPosition) {
        setPopupPosition(null);
        return;
      }

      setPopupPosition({
        x: screenPosition.x,
        y: screenPosition.y,
      });
    };

    updatePopupPosition();
    viewer.scene.postRender.addEventListener(updatePopupPosition);

    return () => {
      viewer.scene.postRender.removeEventListener(updatePopupPosition);
    };
  }, [selectedFire, fireData]);

  return (
    <div className="relative h-dvh w-full">
      <div ref={mapRef} className="h-full w-full" />

      {selectedFire && popupPosition ? (
        <div
          className="pointer-events-auto absolute z-10"
          style={{
            left: popupPosition.x,
            top: popupPosition.y - 16,
            transform: "translate(-50%, -100%)",
          }}
        >
          <FirePopup
            fire={selectedFire}
            onClose={() => setSelectedFire(null)}
          />
        </div>
      ) : null}
    </div>
  );
}
