import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const event = body.event;

    const magnitude = body.magnitude ?? 50;

    const command = `"..\\.venv\\Scripts\\python.exe" ..\\aion-core\\run_simulation.py ${event} ${magnitude}`;
    //const command = `python ../aion-core/run_simulation.py ${event} ${magnitude}`;

    //await execAsync(command);
    const result = await execAsync(command);
    
    console.log("STDOUT:");
    console.log(result.stdout);

    console.log("STDERR:");
    console.log(result.stderr);

    return Response.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return Response.json({
      success: false,
      error: String(error)
    });
  }
}