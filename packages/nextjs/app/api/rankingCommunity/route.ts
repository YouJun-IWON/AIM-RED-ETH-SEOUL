import { NextResponse } from "next/server";

export async function GET() {
  const collection = process.env.NEW_CONTRACT_ADDR as string;
  const blockchains = "ASTARZKEVM";

  try {
    const response = await fetch(
      `https://testnet-api.rarible.org/v0.1/items/byCollection?collection=${blockchains}:${collection}`,
      {
        headers: {
          "X-API-KEY": process.env.RARIBLE_TESTNET_API_KEY as string,
          accept: "application/json",
        },
      },
    );
    const data = await response.json();
    const creatorRanking = data.items.reduce((acc: any, item: any) => {
      const creator = item.creators[0].account.split(":")[1];
      if (!acc[creator]) {
        acc[creator] = { count: 0 };
      }
      acc[creator].count++;
      return acc;
    }, {});

    const sortedRanking = Object.entries(creatorRanking)
      .sort((a: any, b: any) => b[1].count - a[1].count)
      .slice(0, 15)
      .map(([creator, count]) => ({
        creator,
        count,
      }));

    if (sortedRanking.length < 15) {
      for (let i = sortedRanking.length; i < 15; i++) {
        sortedRanking.push({ creator: "-", count: 0 });
      }
    }

    console.log(data);
    return NextResponse.json(sortedRanking);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
