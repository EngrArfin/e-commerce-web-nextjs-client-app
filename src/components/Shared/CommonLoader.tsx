"use client";

import React from "react";

interface CommonLoaderProps {
    message?: string;
    subMessage?: string;
    size?: "sm" | "md" | "lg" | "fullscreen" | "table";
    variant?: "spinner" | "dots" | "pulse";
    className?: string;
}

export const CommonLoader: React.FC<CommonLoaderProps> = ({
    message = "Loading data...",
    subMessage,
    size = "md",
    variant = "spinner",
    className = "",
}) => {
    if (size === "fullscreen") {
        return (
            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center  backdrop-blur-md transition-all duration-300 ${className}`}>
                <div className="relative flex flex-col items-center p-8 rounded-3xl  max-w-sm w-full mx-4 text-center animate-fade-in">
                    {/* Animated Spinner with Gradient Glow */}
                    <div className="relative w-16 h-16 mb-5">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 blur-lg opacity-40 animate-pulse" />
                        <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-sky-600 border-r-indigo-600 animate-spin" />
                        <div className="absolute inset-2 rounded-full border-2 border-slate-100 border-b-sky-400 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
                    </div>

                    <h3 className="text-base font-bold text-slate-800 tracking-tight">{message}</h3>
                    {subMessage && (
                        <p className="text-xs text-slate-400 font-medium mt-1">{subMessage}</p>
                    )}
                </div>
            </div>
        );
    }

    if (size === "table") {
        return (
            <div className={`py-16 px-4 flex flex-col items-center justify-center w-full text-center ${className}`}>
                <div className="relative w-10 h-10 mb-3">
                    <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-md animate-pulse" />
                    <div className="w-10 h-10 rounded-full border-3 border-slate-200 border-t-sky-600 border-r-sky-400 animate-spin" />
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">{message}</p>
                {subMessage && <p className="text-[11px] text-slate-400 mt-0.5">{subMessage}</p>}
            </div>
        );
    }

    if (size === "sm") {
        return (
            <div className={`inline-flex items-center gap-2 text-slate-600 ${className}`}>
                <div className="w-4 h-4 rounded-full border-2 border-slate-200 border-t-sky-600 animate-spin flex-shrink-0" />
                {message && <span className="text-xs font-semibold">{message}</span>}
            </div>
        );
    }

    // Default "md" and "lg" inline / container loader
    const isLg = size === "lg";

    return (
        <div
            className={`flex flex-col items-center justify-center p-8 my-6 rounded-2xl bg-slate-50/70 border border-slate-100/80 shadow-sm w-full transition-all ${className}`}
        >
            {variant === "spinner" && (
                <div className={`relative ${isLg ? "w-14 h-14 mb-4" : "w-10 h-10 mb-3"}`}>
                    <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-md animate-pulse" />
                    <div
                        className={`rounded-full border-slate-200 border-t-sky-600 border-r-indigo-500 animate-spin ${isLg ? "w-14 h-14 border-4" : "w-10 h-10 border-3"
                            }`}
                    />
                </div>
            )}

            {variant === "dots" && (
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-bounce" />
                </div>
            )}

            {variant === "pulse" && (
                <div className="relative flex items-center justify-center w-12 h-12 mb-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-gradient-to-tr from-sky-600 to-indigo-600 shadow-md" />
                </div>
            )}

            <p className={`font-bold text-slate-700 tracking-tight ${isLg ? "text-base" : "text-sm"}`}>
                {message}
            </p>
            {subMessage && (
                <p className="text-xs text-slate-400 font-medium mt-1 text-center max-w-xs">
                    {subMessage}
                </p>
            )}
        </div>
    );
};

export default CommonLoader;
