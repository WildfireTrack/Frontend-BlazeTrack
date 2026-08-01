"use client";

import { useEffect, useRef } from "react";

import {
    Viewer,
    Ion
} from "cesium";

import "cesium/Build/Cesium/Widgets/widgets.css";

interface GlobeProps {
    fireData: any[];
}

export default function Globe({ fireData }: GlobeProps) {

    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (!mapRef.current) return;

        window.CESIUM_BASE_URL = "/_next/static/cesium";

        Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjk0YzRkYy0zOTZkLTQwYzMtOTJkOC00OWJhMTc5OGRiZDUiLCJpZCI6NDU5Njk0LCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODQ4MTAyNDF9._xuCT-cZKHp_EksgznCQn2CE6uKCruIkjswMjJX3KdQ";

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

        });

        return () => viewer.destroy();

    }, []);

    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                height: "100vh",
            }}
        />
    );
}