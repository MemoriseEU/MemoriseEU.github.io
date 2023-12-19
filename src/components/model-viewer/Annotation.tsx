import React from "react";

export const Annotation = (props) => {
  const { description, camPos, lookAt, title } = props;
  return (
    <div
      className="Hotspot"
      description={description}
      camPos={camPos}
      lookAt={lookAt}
      title={title}
    ></div>
  );
};
