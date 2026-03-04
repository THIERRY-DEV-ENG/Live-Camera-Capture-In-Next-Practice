"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { printTreeView } from "next/dist/build/utils";


export default function GPSLocation() {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const router = useRouter();


    useEffect(() => {
        if (!navigator.geolocation){
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                console.error("Error occurred while fetching location:", error);
            }
        );
    }, []);

    const handleBack = () => {
        router.back();
    };

    return (<div>
        <h1>GPS Location</h1>
        {location ? (       
            <div>
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
            </div>
        ) : (
            <p>Fetching location...</p>
        )}
        <button onClick={handleBack}>Back</button>
    </div>);
}


let 