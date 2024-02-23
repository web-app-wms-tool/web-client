export type _SRS = "EPSG:6991" | "EPSG:2039" | "EPSG:4326";

export const SRS = [
  {
    label: "EPSG:6991",
    value: "EPSG:6991",
  },
  {
    label: "EPSG:2039",
    value: "EPSG:2039",
  },
  {
    label: "EPSG:4326",
    value: "EPSG:4326",
  },
];

export type _OBJECT_SELECTION =
  | "POINT"
  | "LINE"
  | "POLYGON"
  | "GEOMETRYCOLLECTION";

export const OBJECT_SELECTION = [
  { label: "POINT", value: "POINT" },
  { label: "LINESTRING", value: "LINESTRING" },
  { label: "MULTILINESTRING", value: "MULTILINESTRING" },
  { label: "POLYGON", value: "POLYGON" },
  { label: "GEOMETRYCOLLECTION", value: "GEOMETRYCOLLECTION" },
];

export type _OUTPUT_TYPE = "shp" | "kml" | "geojson";

export const OUTPUT_TYPE = [
  {
    label: "Shapefile",
    value: "shp",
  },
  {
    label: "KML",
    value: "kml",
  },
  {
    label: "GeoJSON",
    value: "geojson",
  },
];
