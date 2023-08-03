import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import cors from "nextjs-cors";
import { createOpenApiNextHandler } from "trpc-openapi";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Enable cors
    await cors(req, res,  {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: 'http://localhost:19006',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   });

    // Create and call the tRPC handler
    return createOpenApiNextHandler({
      router: appRouter,
      createContext: createTRPCContext,
    })(req, res);
  } catch (err) {
    console.log(err, "error - TRPC");
  }
};

export default handler;
