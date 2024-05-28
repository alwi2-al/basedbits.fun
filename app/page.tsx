"use server";

import {Header} from "@/app/lib/components/Header";
import {CheckIn} from "@/app/lib/components/CheckIn";
import Link from "next/link";

export default async function Home() {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-center items-center w-full bg-[#DDF5DD] px-10 lg:px-0 pb-8 sm:pb-0">
                <div className="container max-w-screen-lg">
                    <Header/>
                    <CheckIn/>
                </div>
            </div>

            <div className="flex justify-center items-center w-full px-10 lg:px-0 mt-16 mb-24">
                <div className="container max-w-screen-lg">
                    <div className="text-5xl text-[#363E36] mb-4">Based Bits</div>
                    <div className="text-[#677467]">
                        8000 Based Bits causing byte-sized mischief on the BASE chain, a
                        nerdy collection by {" "}
                        <a
                            href="https://warpcast.com/andreitr"
                            target="_blank"
                            title="andreitr.eth on Farcaster"
                        >
                            andreitr.eth
                        </a>
                        {" "}and{" "}
                        <a
                            href="https://warpcast.com/gretagremplin"
                            target="_blank"
                            title="gretagremplin on Farcaster"
                        >
                            gretagremplin.eth
                        </a>
                        . All art is CC0.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-16 text-[#677467]">
                        <div>
                            <div className="text-xl text-[#363E36] mb-2">
                                NFT Marketplaces
                            </div>
                            <div>
                                <Link
                                    className="hover:underline text-sm"
                                    href="https://rarible.com/BasedBits/items"
                                    target="_blank"
                                >
                                    Rarible
                                </Link>
                            </div>
                            <div>
                                <Link
                                    className="hover:underline text-sm"
                                    href="https://opensea.io/collection/based-bits"
                                    target="_blank"
                                >
                                    OpenSea
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className="text-xl text-[#363E36] mb-2">Socials</div>
                            <div>
                                <Link
                                    className="hover:underline text-sm"
                                    href="https://warpcast.com/basedbits"
                                    target="_blank"
                                >
                                    @basedbits on warpcast
                                </Link>
                            </div>
                            <div>
                                <Link
                                    className="hover:underline text-sm"
                                    href="https://x.com/andreitr"
                                    target="_blank"
                                >
                                    @basedbits_fun on x
                                </Link>
                            </div>
                        </div>

                        <div>
                            <div className="text-xl text-[#363E36] mb-2">Code</div>
                            <div>
                                <Link
                                    className="hover:underline text-sm"
                                    href="https://basescan.org/address/0xe842537260634175891925f058498f9099c102eb"
                                    target="_blank"
                                >
                                    Check-in Contract
                                </Link>
                            </div>
                            <div>
                                <Link
                                    className="hover:underline text-sm"
                                    href="https://basescan.org/address/0x267704932f32875b28edd997050a5bbe8e036fc2"
                                    target="_blank"
                                >
                                    Check-in Badges Contract
                                </Link>
                            </div>
                            <div>
                                <Link
                                    className="hover:underline text-sm"
                                    href="https://basescan.org/address/0xe0e68930a8cc0c066bb96183870c9949f5396ea8"
                                    target="_blank"
                                >
                                    Social Contract
                                </Link>
                            </div>
                            <div>
                                <Link
                                    className="hover:underline text-sm"
                                    href="https://basescan.org/address/0x617978b8af11570c2dab7c39163a8bde1d282407"
                                    target="_blank"
                                >
                                    NFT Contract
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
