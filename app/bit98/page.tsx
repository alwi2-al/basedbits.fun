import {Header} from "@/app/lib/components/Header";

import {Footer} from "@/app/lib/components/Footer";
import {MintRules} from "@/app/bit98/components/MintRules";
import {getBit98CurrentMint} from "@/app/lib/api/getBit98CurrentMint";
import {getBit98MintById} from "@/app/lib/api/getBit98MintById";
import {MintComponent} from "@/app/bit98/components/MintComponent";
import {revalidatePath} from "next/cache";
import {getNFTRawMetadata} from "@/app/lib/api/getNFTRawMetadata";
import {Bit98ABI} from "@/app/lib/abi/Bit98.abi";

export default async function Page() {

    const id = await getBit98CurrentMint();
    const mint = await getBit98MintById({id});
    const meta = await getNFTRawMetadata({
            abi: Bit98ABI,
            address: process.env.NEXT_PUBLIC_BB_BIT98_ADDRESS as `0x${string}`,
            id: id
        }
    );

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-center items-center w-full bg-[#DDF5DD] px-10 lg:px-0 pb-8 sm:pb-0">
                <div className="container max-w-screen-lg">
                    <Header/>
                    <div className="flex flex-col gap-6 mb-8">
                        <div className="hidden md:inline">
                            A new Bit98 is born every 4 hours! Every minter has a chance of
                            winning 1:1 at the end of the mint.
                        </div>
                        <MintComponent meta={meta} mint={mint}
                                       revalidate={async () => {
                                           "use server";
                                           revalidatePath(`/bit98`, "layout");
                                       }}
                        />
                        <MintRules/>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center w-full px-10 lg:px-0 mt-16 mb-24">
                <Footer/>
            </div>
        </div>
    );
}
