import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const event = body.event;

    const magnitude = body.magnitude ?? 50;

    const command = `python ../aion-core/run_simulation.py ${event} ${magnitude}`;

    await execAsync(command);

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