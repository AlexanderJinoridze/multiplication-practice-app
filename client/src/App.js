import React from "react";

export default function App() {
    return (
        <div className="mx-4 container">
            <h1 className="text-4xl text-gray block m-5">Hello</h1>
            <h1 className="text-4xl text-red block m-5">Hello</h1>
            <h1 className="text-4xl text-blue block m-5">Hello</h1>
            <h1 className="text-4xl text-green block m-5">Hello</h1>
            <h1 className="text-4xl text-yellow block m-5">Hello</h1>

            <label htmlFor="name">
                <span>Name:<b className="text-red">*</b></span>
                <input type="text" className="border-gray-200 py-3 px-6 w-96 my-1 shadow-sm block rounded-lg border" />
            </label>
        </div>
    );
}
