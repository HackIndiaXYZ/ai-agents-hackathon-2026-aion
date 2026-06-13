"use client";

import { useEffect,useState } from "react";

import { productionLines } from "./data/factoryTopology";

export default function Home() {

  const [simulationData, setSimulationData] = useState<any>(null);
   
  const severity = simulationData?.response?.severity ?? "NORMAL";

  const aiSeverity = simulationData?.ai_prediction?.severity ?? "--";

  const aiConfidence = simulationData?.ai_prediction?.confidence ?? "--";

  const aiAgreement = aiSeverity === severity ? "MATCH" : "MISMATCH";

  const thermalCritical = (simulationData?.factory_state?.thermal_load ?? 0) > 80;

  const powerCritical = (simulationData?.factory_state?.power_usage ?? 0) > 80;
  
  const networkColor =
    severity === "CRITICAL"
    ? "border-red-500 bg-red-500/20"
    : severity === "WARNING"
    ? "border-yellow-500 bg-yellow-500/20"
    : "border-cyan-500 bg-cyan-500/10";
  
  const lineColor =
   severity === "CRITICAL"
   ? "bg-red-500"
   : severity === "WARNING"
   ? "bg-yellow-500"
   : "bg-cyan-500";  
  
  const [powerMagnitude, setPowerMagnitude] =
    useState(50);

  const [coolingMagnitude, setCoolingMagnitude] =
    useState(50);

  const [materialMagnitude, setMaterialMagnitude] =
    useState(50);

  const [demandMagnitude, setDemandMagnitude] =
    useState(50);

  useEffect(() => {
    fetch("/simulation_output.json")
    .then((res) => res.json())
    .then((data) => {
      setSimulationData(data);
    });
  }, []);
 
  const runSimulation = async (event: string, magnitude: number = 50) => {

  if (event === "factory_reset") {
  setPowerMagnitude(50);
  setCoolingMagnitude(50);
  setMaterialMagnitude(50);
  setDemandMagnitude(50);
  }
  
  console.log("RUN SIMULATION:", event);

  try {

    const response = await fetch("/api/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event,
        magnitude
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-[#0B1120] p-5 rounded-2xl border border-cyan-500/20">
          <p className="text-gray-400">Operational Risk</p>
          <h2 className="text-3xl font-bold text-yellow-400">
            {simulationData?.response?.operational_risk ?? "--"}
          </h2>
        </div>

        <div className="bg-[#0B1120] p-5 rounded-2xl border border-red-500/20">
          <p className="text-gray-400">Infrastructure Risk</p>
          <h2 className="text-3xl font-bold text-red-400">
            {simulationData?.response?.infrastructure_risk ?? "--"}
          </h2>
        </div>

        <div className="bg-[#0B1120] p-5 rounded-2xl border border-green-500/20">
          <p className="text-gray-400">
            Overall Risk
          </p>
          <h2 className="text-3xl font-bold text-green-400">
            {simulationData?.response?.overall_risk ?? "--"}
          </h2>
        </div>

        <div className="bg-[#0B1120] p-5 rounded-2x1 border border-cyan-500/20">
         
         <p className="text-gray-400">
          AI Prediction
         </p>
        
          <h2 className="text-2x1 font-bold text-cyan-400">
            {aiSeverity}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Confidence: {aiConfidence}%
          </p>

          <p 
           className={`text-sm mt-1 ${
            aiAgreement === "MATCH"? "text-green-400": "text-red-400"
           }`}>
            {aiAgreement}
           </p>

        </div>

      </div>

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
      
      {/* This is where factory topology was */}
      {/* FACTORY DIGITAL TWIN */}

      <div className="bg-[#0B1120] rounded-2xl border border-white/10 p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-2">
          Factory Digital Twin
        </h2>

        <p className="text-gray-400 mb-6">
          Real-time industrial operations topology.
        </p>

        <div className="relative h-[850px] rounded-xl border border-cyan-500/20 bg-black overflow-hidden">

          {/* NETWORK CONNECTIONS */}

          <svg className="absolute inset-0 w-full h-full">

            {/* Utilities -> Hub */}

            <line
              x1="220"
              y1="90"
              x2="500"
              y2="220"
              stroke="cyan"
              strokeWidth="2"
              opacity="0.6"
            />

            <line
              x1="500"
              y1="90"
              x2="500"
              y2="220"
              stroke="cyan"
              strokeWidth="2"
              opacity="0.6"
            />

            <line
              x1="780"
              y1="90"
              x2="500"
              y2="220"
              stroke="cyan"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Hub -> Production */}

            <line x1="500" y1="260" x2="200" y2="430" stroke="cyan" strokeWidth="2"/>
            <line x1="500" y1="260" x2="350" y2="430" stroke="cyan" strokeWidth="2"/>
            <line x1="500" y1="260" x2="500" y2="430" stroke="cyan" strokeWidth="2"/>
            <line x1="500" y1="260" x2="650" y2="430" stroke="cyan" strokeWidth="2"/>
            <line x1="500" y1="260" x2="800" y2="430" stroke="cyan" strokeWidth="2"/>

            {/* Animated Packet */}

            <circle r="6" fill="white">

              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M500,220 L500,430"
              />

            </circle>

          </svg>

          {/* UTILITIES */}

          <div className="absolute left-[120px] top-[20px]">

            <div className={`w-48 h-20 rounded-xl border flex items-center justify-center font-semibold ${networkColor}`}>
              POWER GRID
            </div>

          </div>

          <div className="absolute left-[420px] top-[20px]">

            <div className={`w-48 h-20 rounded-xl border flex items-center justify-center font-semibold ${networkColor}`}>
              COOLING PLANT
            </div>

          </div>

          <div className="absolute left-[720px] top-[20px]">

            <div className={`w-48 h-20 rounded-xl border flex items-center justify-center font-semibold ${networkColor}`}>
              WAREHOUSE
            </div>

          </div>

          {/* CENTRAL HUB */}

          <div className="absolute left-[400px] top-[120px]">

            <div
              className={`
                w-52
                h-24
                rounded-xl
                border
                flex
                items-center
                justify-center
                font-bold
                text-lg
                shadow-xl
                ${networkColor}
              `}
            >
              AION ORCHESTRATION HUB
            </div>

          </div>

          {/* LINE A */}

          <div className="absolute left-[40px] top-[380px]">

            <div className="text-cyan-300 mb-2 font-semibold">
              Line A
            </div>

            <div className="flex items-center gap-6">

              {productionLines[0].nodes.map((node,index)=>(

                <div
                  key={node}
                  className="flex items-center"
                >

                  <div
                    className={`
                      w-32
                      h-16
                      rounded-lg
                      border
                      flex
                      items-center
                      justify-center
                      text-xs
                      ${networkColor}
                    `}
                  >
                    {node}
                  </div>

                  {index < productionLines[0].nodes.length - 1 && (

                    <div className="relative">

                      <div className={`w-8 h-[2px] ${lineColor}`} />

                      <div className="absolute left-0 top-[-3px] w-2 h-2 rounded-full bg-white animate-pulse" />

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

          {/* LINE B */}

          <div className="absolute left-[40px] top-[450px]">

            <div className="text-cyan-300 mb-2 font-semibold">
              Line B
            </div>

            <div className="flex items-center gap-6">

              {productionLines[1].nodes.map((node,index)=>(

                <div
                  key={node}
                  className="flex items-center"
                >

                  <div
                    className={`
                      w-32
                      h-16
                      rounded-lg
                      border
                      flex
                      items-center
                      justify-center
                      text-xs
                      ${networkColor}
                    `}
                  >
                    {node}
                  </div>

                  {index < productionLines[1].nodes.length - 1 && (

                    <div className="relative">

                      <div className={`w-8 h-[2px] ${lineColor}`} />

                      <div className="absolute left-0 top-[-3px] w-2 h-2 rounded-full bg-white animate-pulse" />

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

          {/* LINE C */}

          <div className="absolute left-[40px] top-[520px]">

            <div className="text-cyan-300 mb-2 font-semibold">
              Line C
            </div>

            <div className="flex items-center gap-6">

              {productionLines[2].nodes.map((node,index)=>(

                <div
                  key={node}
                  className="flex items-center"
                >

                  <div
                    className={`
                      w-32
                      h-16
                      rounded-lg
                      border
                      flex
                      items-center
                      justify-center
                      text-xs
                      ${networkColor}
                    `}
                  >
                    {node}
                  </div>

                  {index < productionLines[2].nodes.length - 1 && (

                    <div className="relative">

                      <div className={`w-8 h-[2px] ${lineColor}`} />

                      <div className="absolute left-0 top-[-3px] w-2 h-2 rounded-full bg-white animate-pulse" />

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

          {/* LINE D */}

          <div className="absolute left-[40px] top-[590px]">

            <div className="text-cyan-300 mb-2 font-semibold">
              Line D
            </div>

            <div className="flex items-center gap-6">

              {productionLines[3].nodes.map((node,index)=>(

                <div
                  key={node}
                  className="flex items-center"
                >

                  <div
                    className={`
                      w-32
                      h-16
                      rounded-lg
                      border
                      flex
                      items-center
                      justify-center
                      text-xs
                      ${networkColor}
                    `}
                  >
                    {node}
                  </div>

                  {index < productionLines[3].nodes.length - 1 && (

                    <div className="relative">

                      <div className={`w-8 h-[2px] ${lineColor}`} />

                      <div className="absolute left-0 top-[-3px] w-2 h-2 rounded-full bg-white animate-pulse" />

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

          {/* LINE E */}

          <div className="absolute left-[40px] top-[660px]">

            <div className="text-cyan-300 mb-2 font-semibold">
              Line E
            </div>

            <div className="flex items-center gap-6">

              {productionLines[4].nodes.map((node,index)=>(

                <div
                  key={node}
                  className="flex items-center"
                >

                  <div
                    className={`
                      w-32
                      h-16
                      rounded-lg
                      border
                      flex
                      items-center
                      justify-center
                      text-xs
                      ${networkColor}
                    `}
                  >
                    {node}
                  </div>

                  {index < productionLines[4].nodes.length - 1 && (

                    <div className="relative">

                      <div className={`w-8 h-[2px] ${lineColor}`} />

                      <div className="absolute left-0 top-[-3px] w-2 h-2 rounded-full bg-white animate-pulse" />

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

          {/* STATUS STRIP */}

          <div className="absolute bottom-4 left-4 right-4">

            <div className="grid grid-cols-4 gap-4">

              <div className={`rounded-lg p-3 ${networkColor}`}>
                Throughput:
                {" "}
                {simulationData?.factory_state?.throughput}
              </div>

              <div className={`rounded-lg p-3 ${networkColor}`}>
                Thermal:
                {" "}
                {simulationData?.factory_state?.thermal_load}
              </div>

              <div className={`rounded-lg p-3 ${networkColor}`}>
                Power:
                {" "}
                {simulationData?.factory_state?.power_usage}
              </div>

              <div className={`rounded-lg p-3 ${networkColor}`}>
                Status:
                {" "}
                {severity}
              </div>

            </div>

          </div>

        </div>

      </div>
      
      {/* This is where production lines was */}
      

      <div className="bg-[#0B1120] rounded-2xl border border-white/10 p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-4">
          Operating Limits
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <div>
            <p className="text-gray-400">
              Thermal Limit
            </p>

            <p className="text-xl font-bold">
              80%
            </p>
          </div>

          <div>
            <p className="text-gray-400">
              Power Limit
            </p>

            <p className="text-xl font-bold">
              80%
            </p>
          </div>

          <div>
            <p className="text-gray-400">
              Storage Health
            </p>

            <p className="text-xl font-bold">
              `{'>'}`40%
            </p>
          </div>

        </div>

      </div>

      {/* CONTROL PANEL */}

      <div className="bg-[#0B1120] rounded-2xl border border-white/10 p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-6">
          Disturbance Injection
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* POWER SURGE */}

          <div>

            <p className="text-cyan-300 mb-2">
              Power Surge
            </p>

            <input
              type="range"
              min="0"
              max="100"
              value={powerMagnitude}
              onChange={(e)=>
                setPowerMagnitude(
                  Number(e.target.value)
                )
              }
              className="w-full"
            />

            <p className="text-sm text-gray-400 mb-3">
              Magnitude: {powerMagnitude}
            </p>

            <button
              onClick={() =>
                runSimulation(
                  "power_surge",
                  powerMagnitude
                )
              }
              className="bg-cyan-500/20 border border-cyan-500/30 px-5 py-3 rounded-xl"
            >
              Trigger Power Surge
            </button>

          </div>

          {/* COOLING FAILURE */}

          <div>

            <p className="text-red-300 mb-2">
              Cooling Failure
            </p>

            <input
              type="range"
              min="0"
              max="100"
              value={coolingMagnitude}
              onChange={(e)=>
                setCoolingMagnitude(
                  Number(e.target.value)
                )
              }
              className="w-full"
            />

            <p className="text-sm text-gray-400 mb-3">
              Magnitude: {coolingMagnitude}
            </p>

            <button
              onClick={() =>
                runSimulation(
                  "cooling_failure",
                  coolingMagnitude
                )
              }
              className="bg-red-500/20 border border-red-500/30 px-5 py-3 rounded-xl"
            >
              Inject Cooling Failure
            </button>

          </div>

          {/* MATERIAL SHORTAGE */}

          <div>

            <p className="text-violet-300 mb-2">
              Material Shortage
            </p>

            <input
              type="range"
              min="0"
              max="100"
              value={materialMagnitude}
              onChange={(e)=>
                setMaterialMagnitude(
                  Number(e.target.value)
                )
              }
              className="w-full"
            />

            <p className="text-sm text-gray-400 mb-3">
              Magnitude: {materialMagnitude}
            </p>

            <button
              onClick={() =>
                runSimulation(
                  "material_shortage",
                  materialMagnitude
                )
              }
              className="bg-violet-500/20 border border-violet-500/30 px-5 py-3 rounded-xl"
            >
              Trigger Material Shortage
            </button>

          </div>

          {/* DEMAND */}

          <div>

            <p className="text-yellow-300 mb-2">
              Production Demand
            </p>

            <input
              type="range"
              min="0"
              max="100"
              value={demandMagnitude}
              onChange={(e)=>
                setDemandMagnitude(
                  Number(e.target.value)
                )
              }
              className="w-full"
            />

            <p className="text-sm text-gray-400 mb-3">
              Magnitude: {demandMagnitude}
            </p>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  runSimulation(
                    "high_demand",
                    demandMagnitude
                  )
                }
                className="bg-yellow-500/20 border border-yellow-500/30 px-5 py-3 rounded-xl"
              >
                Increase Demand
              </button>

              <button
                onClick={() =>
                  runSimulation(
                    "reduce_demand",
                    demandMagnitude
                  )
                }
                className="bg-blue-500/20 border border-blue-500/30 px-5 py-3 rounded-xl"
              >
                Reduce Demand
              </button>

            </div>

          </div>

        </div>

        <div className="mt-8">

          <button
            onClick={() =>
              runSimulation(
                "factory_reset",
                50
              )
            }
            className="bg-white/10 border border-white/20 px-5 py-3 rounded-xl"
          >
            Reset System
          </button>

        </div>

      </div>
     

      {/* ALERTS */}
      <div className="bg-[#0B1120] rounded-2xl border border-red-500/20 p-6">

        <h2 className="text-2xl font-semibold mb-4 text-red-400">
          AION Recommendations
        </h2>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
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
              Operational Risk: {simulationData?.response?.operational_risk}
            </div>

            <div className="text-yellow-300">
              Infrastructure Risk: {simulationData?.response?.infrastructure_risk}
            </div>

            <div className="text-green-300">
              Overall Risk: {simulationData?.response?.overall_risk}
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}