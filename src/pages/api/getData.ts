import type { NextApiRequest, NextApiResponse } from "next";
import { Data } from "../utils/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const allData = await fetch("https://dev.test.sega.co.uk/api/list", {
      headers: {
        "x-secret-api-key": process.env.SECRET_API_KEY!,
      },
    }).then((res) => res.json());
    res.status(200).json(allData);
  } catch (error) {
    console.log("fetched data error", error);
  }
}
