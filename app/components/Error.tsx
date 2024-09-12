import React from "react";
interface Props {
  err: string;
}

const ErrorPage: React.FC<Props> = ({ err }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-red-500 text-[30px]">{err}</div>
    </div>
  );
};

export default ErrorPage;
