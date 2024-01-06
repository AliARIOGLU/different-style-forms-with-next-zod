import React from "react";

type Props = {
  object: object;
};

export const Code: React.FC<Props> = ({ object }) => {
  return (
    <pre className="mt-2 w-[340px] rounded-md bg-neutral-800 p-4">
      <code className="text-white">{JSON.stringify(object, null, 2)}</code>
    </pre>
  );
};
