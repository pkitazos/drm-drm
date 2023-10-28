"use client";

import Map, { Layer, MapRef, ScaleControl, Source } from "react-map-gl";
import { LngLatBoundsLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { SpinnerComponent } from "~/components/ui/spinner";
import { env } from "~/env.mjs";
import { Feature, FeatureCollection } from "geojson";
import { heatmapLayer } from "../map-style";

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

const Page = () => {
  const mapRef = useRef<MapRef>(null);

  const defaultMapBounds: LngLatBoundsLike = [
    [-180, -75],
    [180, 90],
  ];

  const [mapBounds] = useState<LngLatBoundsLike>(defaultMapBounds);

  const updateBounds = () => {
    if (mapRef.current) {
      mapRef.current.resize();
      mapRef.current.fitBounds(mapBounds, {
        padding: 100,
        speed: 10,
      });
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
    <div className="h-[86dvh] p-10">
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
            mapStyle="mapbox://styles/mapbox/dark-v9"
            renderWorldCopies={false}
            maxBounds={defaultMapBounds}
          >
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
