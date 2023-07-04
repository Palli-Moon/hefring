import React, { useState, useEffect } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

let lastlat = 0;
let lastlon = 0;

const Map = ({ data }) => {
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState([]);

  useEffect(() => {
    const loadData = () => {
      let i = 0;
      const interval = setInterval(() => {
        if (markers.length < data.length) {
          const nextData = data.slice(i * 1000, i * 1000 + 1000);
          setMarkers((x) => [...x, ...nextData]);
        } else {
          clearInterval(interval);
        }
        i++;
      }, 50);

      return () => clearInterval(interval);
    };

    loadData();
    if (data[0]) {
      setCenter([data[0].lat, data[0].lon]);
    }
  }, [data]);

  return (
    <ComposableMap>
      <ZoomableGroup center={center} zoom={16}>
        <Geographies geography={geoUrl}>{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)}</Geographies>
        {markers.map(({ lat, lon, imp1, imp2 }, i) => {
          const imp = parseFloat(imp1) + parseFloat(imp2);
          if (imp > 0.2 || (lat !== lastlat && lon !== lastlon)) {
            lastlat = lat;
            lastlon = lon;
            const col = imp > 0.2 ? '#C00' : imp > 0.07 ? '#DD0' : '#0C0';

            return (
              <Marker coordinates={[lat, lon]} key={i}>
                <circle r={0.1} fill={col} />
              </Marker>
            );
          }
          return null;
        })}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default Map;
