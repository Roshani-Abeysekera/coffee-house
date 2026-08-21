import React from "react";
import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
            <Coffee size={40} className="text-coffee/25 mb-5" />
            <p className="eyebrow mb-3">404</p>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-espresso mb-3">
                This cup's empty.
            </h1>
            <p className="text-muted max-w-sm mb-8">
                We couldn't find the page you were looking for. It may have moved, or never existed.
            </p>
            <Link to="/" className="btn-primary">Back to home</Link>
        </div>
    );
}
