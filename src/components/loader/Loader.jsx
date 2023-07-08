import React from "react";
import { ClipLoader } from "react-spinners";

export const Loader = ({ color, loading, override }) => {
  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
