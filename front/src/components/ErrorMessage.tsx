import React from "react";

/**
 * Aim to display an error message in the center of the page.
 *
 * @param props : message : the error message
 * @constructor
 */
export default function ErrorMessage(props: {
  message: string;
}){
  const reason = () => {
    if (props.message === "Network Error"){
      return "Make sure your server is running"
    }
  }
  return (
    <>
      <div className="text-center m-auto mt-14 text-gray-700">
        <h1 className="uppercase text-xl text-red-800">Error !</h1>
        <p className="my-6">{props.message}</p>
        <p>{reason()}</p>
      </div>
  </>)
}