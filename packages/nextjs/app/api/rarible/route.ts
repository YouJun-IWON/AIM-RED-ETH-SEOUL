import { NextResponse } from 'next/server';

export async function GET() {
  const collection = process.env.CONTRACT_ID as string;
  const blockchains = "ASTARZKEVM"

  try {
    const response = await fetch(`https://testnet-api.rarible.org/v0.1/items/byCollection?collection=${blockchains}:${collection}`, {
      headers: {
        'X-API-KEY': process.env.RARIBLE_TESTNET_API_KEY as string,
        'accept': 'application/json'
      }
    });
    const data = await response.json();
    const result = data.items.map((item: any) => {
        let orderData = null;
        let contents = null;
        let meta = null;
        if (item.bestSellOrder) {
            orderData = {
                price: item.bestSellOrder.makePrice,
                currency: item.bestSellOrder.makePriceUsd,
                status: item.bestSellOrder.status,
                created: item.bestSellOrder.createdAt,
                ended: item.bestSellOrder.endedAt,
            };
        }

        if (item.meta) {
           meta = item.meta.map((meta: any) => { 
                return {
                    title: meta.name,
                    description: meta.description ? meta.description : "No description",
                };
              });
        }

        return {
            token_id: item.id.split(":")[2],
            creator: item.creators[0].account.split(":")[1],
            owner: item.lastSale ? item.lastSale.buyer.split(":")[1] : item.creators[0].account.split(":")[1],
            minted: item.mintedAt,
            updated: item.lastUpdatedAt,
            order: orderData,
            // contents: contents,
            meta: meta,
        }
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' });
  }
}

export async function POST(req: Request) {
    try {
        const { position } = await req.json();
        if (position === 'buy') {
            // 구매 로직
        } else if (position === 'sell') {
            // 판매 로직
        } else if (position === 'cancel') {
            // 취소 로직
        } else {
            return NextResponse.json({ error: 'Invalid position' });
        }
    } catch (error) {
        console.error('Error posting data:', error);
        return NextResponse.json({ error: 'Failed to posting data' });
    }
}
