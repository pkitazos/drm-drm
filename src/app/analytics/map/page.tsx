"use client";

import Map, { Layer, MapRef, ScaleControl, Source } from "react-map-gl";
import { LngLatBoundsLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { SpinnerComponent } from "~/components/ui/spinner";
import { env } from "~/env.mjs";
import { Feature, FeatureCollection } from "geojson";
import { heatmapLayer } from "./map-style";
import { MapButtonBox } from "./map-box";

interface OrderWithAddresses {
  Id: number;
  DateCreated: Date;
  OrderTotal: number;
  OrderStatus: string;
  addressId: string;
  CustomerId: number;
  ShippingAddress: ShippingAddress;
}

interface ShippingAddress {
  lat: number;
  lon: number;
}

interface MapStyle {
  [key: string]: string;
}

const Page = () => {
  const mapRef = useRef<MapRef>(null);

  const defaultMapBounds: LngLatBoundsLike = [
    [-180, -75],
    [180, 90],
  ];

  const defaultMapStyle: MapStyle = {
    streets: "mapbox://styles/mapbox/dark-v9",
    global: "mapbox://styles/mapbox/dark-v11",
  };

  const [mapBounds] = useState<LngLatBoundsLike>(defaultMapBounds);
  const [mapStyle, setMapStyle] = useState("streets");

  const toggleMapStyle = () => {
    if (mapStyle === "streets") {
      setMapStyle("global");
    } else if (mapStyle === "global") {
      setMapStyle("streets");
    }
  };

  const updateBounds = () => {
    if (mapRef.current) {
      mapRef.current.fitBounds(mapBounds, {
        padding: 100,
        speed: 10,
        zoom:1
      });
      mapRef.current.resize();
    }
  };

  useEffect(() => {
    updateBounds();
  }, [mapBounds]);

  const { data: orders, isLoading } =
    api.analytics.getOrdersAndAddress.useQuery();

  function toGeoJSONFeature(order: OrderWithAddresses): Feature {
    return {
      type: "Feature",
      properties: {
        id: "ak16994521",
        mag: 2.3,
        time: 1507425650893,
        felt: null,
        tsunami: 0,
      },
      geometry: {
        type: "Point",
        coordinates: [order.ShippingAddress.lon, order.ShippingAddress.lat],
      },
    };
  }

  function toGeoJSON(orders: OrderWithAddresses[]): FeatureCollection {
    return {
      type: "FeatureCollection",
      features: orders.map((order) => toGeoJSONFeature(order)),
    };
  }

  return (
    <div className="h-[80dvh]">
      <div className="flex h-full rounded">
        {isLoading ? (
          <SpinnerComponent />
        ) : (
          <Map
            ref={mapRef}
            mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_SECRET}
            initialViewState={{
              bounds: mapBounds,
              fitBoundsOptions: {
                padding: 120,
              },
            }}
            onLoad={updateBounds}
            onResize={updateBounds}
            mapStyle={defaultMapStyle[mapStyle]}
            renderWorldCopies={false}
            maxBounds={defaultMapBounds}
          >
            <MapButtonBox mapStyle={mapStyle} toggleMapStyle={toggleMapStyle} />
            {orders && (
              <Source type="geojson" data={toGeoJSON(orders)}>
                <Layer {...heatmapLayer} />
              </Source>
            )}
            <ScaleControl unit="metric" />
          </Map>
        )}
      </div>
    </div>
  );
};

export default Page;
