"use client"

import React, { useState } from "react";
import { CarItem } from "@/app/data/cars";

export default function Tabs({ car }: { car: CarItem }) {
  const [activeTab, setActiveTab] = useState<"description" | "features" | "specifications">("description");

  return (
    <div className="mb-12">
      <div className="flex overflow-x-auto border-b border-gray-300 scrollbar-hide">
        {["description", "features", "specifications"].map((tab) => (
          <button
            key={tab}
            className={`tab-button px-6 py-4 whitespace-nowrap ${
              activeTab === tab ? "text-gray-900 font-semibold border-b-2 border-indigo-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab as "description" | "features" | "specifications")}
          >
            {tab === "description"
              ? "Descripción"
              : tab === "features"
              ? "Características"
              : "Especificaciones"}
          </button>
        ))}
      </div>
      <div className="p-6 bg-white rounded shadow mt-4">
        {activeTab === "description" && <p className="text-gray-700">{car.description}</p>}
        {activeTab === "features" && (
          <ul className="list-disc list-inside">
            {car.features?.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}
        {activeTab === "specifications" && (
          <ul className="list-inside">
            {Object.entries(car.specifications ?? {}).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
