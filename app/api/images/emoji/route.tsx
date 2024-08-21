import {ImageResponse} from "next/og";
import {getEmojiCurrentMint} from "@/app/lib/api/getEmojiCurrentMint";
import {getEmojiMintById} from "@/app/lib/api/getEmojiMintById";
import {AlchemyToken} from "@/app/lib/types/alchemy";
import {getNFTMetadata} from "@/app/lib/api/getNFTMetadata";
import {ALCHEMY_API_PATH} from "@/app/lib/constants";

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url);
        let preview = searchParams?.get("preview");

        if (!preview) {
            const id = await getEmojiCurrentMint();
            const mint = await getEmojiMintById({id});
            const token: AlchemyToken = await getNFTMetadata({
                contract: process.env.NEXT_PUBLIC_BB_EMOJI_BITS_ADDRESS as string,
                path: ALCHEMY_API_PATH.TESTNET,
                tokenId: mint.tokenId.toString(),
            });
            preview = token.image.pngUrl;
        }

        const interBoldFont = await fetch(
            new URL("../assets/Inter-Bold.ttf", import.meta.url),
        ).then((res) => res.arrayBuffer());

        const interRegularFont = await fetch(
            new URL("../assets/Inter-Regular.ttf", import.meta.url),
        ).then((res) => res.arrayBuffer());

        return new ImageResponse(
            (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        fontFamily: '"Inter"',
                        justifyContent: "flex-start",
                        backgroundColor: "#DDF5DD",
                    }}
                >
                    <div tw="flex flex-row justify-between">
                        {preview && <img src={preview} width={840} height={840}/>}
                    </div>
                </div>
            ),
            {
                width: 840,
                height: 840,
                fonts: [
                    {
                        data: interBoldFont,
                        name: "Inter",
                        style: "normal",
                        weight: 700,
                    },
                    {
                        data: interRegularFont,
                        name: "Inter",
                        style: "normal",
                        weight: 400,
                    },
                ],
                headers: {
                    "cache-control": "public, immutable, no-transform, max-age=600",
                    "content-type": "image/png",
                },
            },
        );
    } catch (e: any) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
