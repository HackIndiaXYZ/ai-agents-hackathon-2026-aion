"use client";

import { useEffect,useState } from "react";

export default function Home() {

  const [simulationData, setSimulationData] = useState<any>(null);
   
  const severity = simulationData?.response?.severity ?? "NORMAL";

  const thermalCritical = (simulationData?.factory_state?.thermal_load ?? 0) > 80;

  const powerCritical = (simulationData?.factory_state?.power_usage ?? 0) > 80;
  
  useEffect(() => {
    fetch("/simulation_output.json")
    .then((res) => res.json())
    .then((data) => {
      setSimulationData(data);
    });
  }, []);
 
  const runSimulation = async (event: string) => {

  console.log("RUN SIMULATION:", event);

  try {

    const response = await fetch("/api/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event
      })
    });

    console.log("API STATUS:", response.status);

    const updated = await fetch(
      "/simulation_output.json?t=" + Date.now()
    );

    const data = await updated.json();

    console.log("NEW DATA:", data);

    setSimulationData(data);

  } catch (error) {

    console.error("SIMULATION ERROR:", error);

  }
};


  return (
    <main className="min-h-screen bg-[#050816] text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-5xl font-bold tracking-wider">
            AION
          </h1>

          <p className="text-gray-400 mt-2">
            Autonomous Industrial Operations Network
          </p>
        </div>

        <div className={`px-4 py-2 rounded-xl border animate-pulse
          ${
            severity === "CRITICAL"
              ? "bg-red-500/20 text-red-400 border-red-500/30"
              : severity === "WARNING"
              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
              : "bg-green-500/20 text-green-400 border-green-500/30"
          }`}>
          Factory Status: {severity}
        </div>

      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-[#0B1120] p-5 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:scale-105 transition-all duration-300">
          <p className="text-gray-400">Throughput</p>
          <h2 className="text-3xl font-bold mt-2">
            {simulationData?.factory_state?.throughput ?? 84}%
          </h2>
        </div>

        <div className="bg-[#0B1120] p-5 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:scale-105 transition-all duration-300">
          <p className="text-gray-400">Thermal Load</p>
          <h2 className="text-3xl font-bold mt-2">
            {simulationData?.factory_state?.thermal_load ?? 72}%
          </h2>
        </div>

        <div className="bg-[#0B1120] p-5 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:scale-105 transition-all duration-300">
          <p className="text-gray-400">Power Usage</p>
          <h2 className="text-3xl font-bold mt-2">
            {simulationData?.factory_state?.power_usage ?? 68}%
          </h2>
        </div>

        <div className="bg-[#0B1120] p-5 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:scale-105 transition-all duration-300">
          <p className="text-gray-400">System Health</p>
          <h2 className={`text-3xl font-bold mt-2 ${
            thermalCritical ? "text-red-400" : "text-green-400"
          }`}>
            {simulationData?.response?.severity ?? "NORMAL"}
          </h2>
        </div>

      </div>

      {/* FACTORY TOPOLOGY */}
      <div className="bg-[#0B1120] rounded-2xl border border-white/10 p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-2">
          Factory Topology
        </h2>

        <p className="text-gray-400 mb-6">
          Autonomous material routing and thermal balancing network.
        </p>

        <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-cyan-500/10 bg-black">

          {/* SVG NETWORK */}
          <svg className="absolute inset-0 w-full h-full">

            {/* CONNECTION PATHS */}
            <line
              x1="120"
              y1="100"
              x2="320"
              y2="100"
              stroke="#06b6d4"
              strokeWidth="3"
              opacity="0.6"
            />

            <line
              x1="320"
              y1="100"
              x2="520"
              y2="180"
              stroke={thermalCritical ? "#ef4444" : "#8b5cf6"}
              strokeWidth="3"
              opacity="0.8"
            />

            <line
              x1="320"
              y1="100"
              x2="320"
              y2="300"
              stroke={powerCritical ? "#ef4444" : "#22c55e"}
              strokeWidth="3"
              opacity="0.8"
            />

            {/* MOVING PACKET 1 */}
            <circle r="8" fill="#22d3ee">
              <animateMotion
                dur={(simulationData?.factory_state?.deadline_pressure?? 0) > 80 ? "2s" : "4s"}
                repeatCount="indefinite"
                path="M120,100 L320,100"
              />
            </circle>

            {/* MOVING PACKET 2 */}
            <circle r="8" fill={thermalCritical ? "#ef4444" : "#a855f7"}>
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path="M320,100 L520,180"
              />
            </circle>

            {/* MOVING PACKET 3 */}
            <circle r="8" fill={powerCritical ? "#ef4444" : "#22c55e"}>
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M320,100 L320,300"
              />
            </circle>

          </svg>

          {/* MIXING NODE */}
          <div className="absolute left-[80px] top-[70px]">
            <div className="w-20 h-20 rounded-full border border-cyan-400 bg-cyan-500/10 flex items-center justify-center text-sm animate-pulse shadow-lg shadow-cyan-500/20">
              Mixing
            </div>
          </div>

          {/* ASSEMBLY NODE */}
          <div className="absolute left-[280px] top-[70px]">
            <div className="w-20 h-20 rounded-full border border-purple-400 bg-purple-500/10 flex items-center justify-center text-sm animate-pulse shadow-lg shadow-purple-500/20">
              Assembly
            </div>
          </div>

          {/* THERMAL NODE */}
          <div className="absolute left-[480px] top-[150px]">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-sm animate-pulse shadow-lg
              ${
                thermalCritical
                  ? "border border-red-500 bg-red-500/20 shadow-red-500/30"
                  : "border border-orange-400 bg-orange-500/10 shadow-orange-500/20"
              }`}
            >
              Thermal
            </div>
          </div>

          {/* STORAGE NODE */}
          <div className="absolute left-[280px] top-[260px]">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-sm animate-pulse shadow-lg
              ${
                powerCritical
                  ? "border border-red-500 bg-red-500/20 shadow-red-500/30"
                  : "border border-green-400 bg-green-500/10 shadow-green-500/20"
              }`}
            >
              Storage
            </div>
          </div>

        </div>
      </div>

      {/* CONTROL PANEL */}
      <div className="bg-[#0B1120] rounded-2xl border border-white/10 p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-6">
          Disturbance Injection
        </h2>

        <div className="flex gap-4 flex-wrap">

          {/* COOLING FAILURE */}
          <button
            onClick={() => {
              runSimulation("cooling_failure");
            }}
            className="bg-red-500/20 border border-red-500/30 px-5 py-3 rounded-xl hover:bg-red-500/30 transition-all duration-300"
          >
            Inject Cooling Failure
          </button>
          
          {/* STABILIZE COOLING */}
          <button
            onClick={() => {
              runSimulation("stabilize_cooling")
            }}
            className="bg-green-500/20 border border-green-500/30 px-5 py-3 rounded-xl hover:bg-green-500/30 transition-all duration-300"
          >
            Stabilize Cooling
          </button>

          {/* HIGH DEMAND */}
          <button
            onClick={() => {
              runSimulation("high_demand")
            }}
            className="bg-yellow-500/20 border border-yellow-500/30 px-5 py-3 rounded-xl hover:bg-yellow-500/30 transition-all duration-300"
          >
            Increase Production Demand
          </button>
          
          {/* REDUCE DEMAND */}
          <button
            onClick={() => {
              runSimulation("reduce_demand")
            }}
            className="bg-blue-500/20 border border-blue-500/30 px-5 py-3 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
          >
            Reduce Production Demand
          </button>

          {/* POWER SURGE */}
          <button
            onClick={() => {
              runSimulation("power_surge")
            }}
            className="bg-cyan-500/20 border border-cyan-500/30 px-5 py-3 rounded-xl hover:bg-cyan-500/30 transition-all duration-300"
          >
            Trigger Power Surge
          </button>
          
          {/*MATERIAL SHORTAGE*/}
          <button
            onClick={() =>{
              runSimulation("material_shortage")
            }}
            className="bg-violet-500/20 border border-violet-500/30 px-5 py-3 rounded-xl hover:bg-violet-500/30 transition-all duration-300"
            >
             Trigger Material Shortage
            </button> 


          {/* SYSTEM RESET */}
          <button
            onClick={() => {
              runSimulation("factory_reset")
            }}
            className="bg-white/10 border border-white/20 px-5 py-3 rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            Reset System
          </button>

        </div>
      </div>

      {/* ALERTS */}
      <div className="bg-[#0B1120] rounded-2xl border border-red-500/20 p-6">

        <h2 className="text-2xl font-semibold mb-4 text-red-400">
          Active Alerts
        </h2>

        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          {simulationData?.response?.decisions?.join(" | ")
                   ?? "Awaiting simulation data"}
        </div>

      </div>

      {/* AI OPERATIONS LOG */}
      <div className="bg-[#0B1120] rounded-2xl border border-cyan-500/20 p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          Autonomous Operations Log
        </h2>

        <div className="space-y-4 text-sm">

          <div className="border-l-2 border-cyan-400 pl-4 text-gray-300">
          {simulationData?.response?.decisions?.map(
            (decision: string, index: number) => (
              <div key = {index}>{decision}</div>
            )
          )}
          </div>
             
          <div className = "text-sm tracking-widest text-red-400">
            Severity: {simulationData?.response?.severity}
            <div className="text-cyan-300">
              Risk Score: {simulationData?.response?.risk_score}
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}