import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const override = {
  color: "#705848",
  loading: true,
};

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <PulseLoader
        className="pt-5"
        color={override.color}
        loading={override.loading}
        cssOverride={override}
        size={32}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
