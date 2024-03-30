"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";

type NFTData = {
  token_id: string;
  creator: string;
  owner: string;
  minted: string;
  updated: string;
  order: Order | null;
  meta: Meta | null;
};

type Order = {
  price: string;
  currency: string;
  status: "ACTIVE" | "INACTIVE"; // 여기서는 ACTIVE 상태만 예시로 들었지만, 다른 상태가 있다면 추가 필요
  created: string;
  ended: string;
};

type Meta = {
  title: string;
  description: string;
  image_url: string;
  model: string;
  attack_type: string;
};

const MarketOptions = ["All", "Buy", "Sell"];

export default function Market() {
  const [marketOption, setMarketOption] = useState(MarketOptions[0]);

  const [nftList, setNftList] = useState<NFTData[]>([]);

  const { address: connectedAddress } = useAccount();

  const fetchNFTs = async () => {
    try {
      // const response = await fetch("/api/rarible", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      //
      const response = await fetch("/api/mockup", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setNftList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="flex flex-col bg-stone-800 pt-16">
      <div className="text-5xl font-bold pt-8 pl-16 pb-2">NFT Market</div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col p-4 pl-12 gap-8">
          <div role="tablist" className="tabs tabs-boxed tabs-lg mt-1">
            {MarketOptions.map((option, index) => (
              <a
                key={index}
                role="tab"
                className={`tab ${marketOption === option ? "tab-active" : ""}`}
                onClick={() => setMarketOption(option)}
              >
                {option}
              </a>
            ))}
          </div>

          <ul className="menu bg-base-200 w-64 rounded-box">
            <li>
              <a>Model</a>
              <ul>
                <li className="form-control">
                  <label className="label justify-between">
                    <span className="label-text">GPT-3.5</span>
                    <input type="checkbox" defaultChecked className="checkbox" />
                  </label>
                </li>
                <li className="form-control">
                  <label className="label justify-between">
                    <span className="label-text">Claude</span>
                    <input type="checkbox" defaultChecked className="checkbox" />
                  </label>
                </li>
              </ul>

              <a>Attack Type</a>
              <ul>
                <li className="form-control">
                  <label className="label justify-between">
                    <span className="label-text">Abusive Language</span>
                    <input type="checkbox" defaultChecked className="checkbox" />
                  </label>
                </li>
                <li className="form-control">
                  <label className="label justify-between">
                    <span className="label-text">Privacy</span>
                    <input type="checkbox" defaultChecked className="checkbox" />
                  </label>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex flex-col p-4 gap-4">
          <div className="flex flex-row justify-between items-end px-5">
            <div>
              <label className="input input-lg input-bordered flex items-center gap-2">
                <input type="text" className="p-1 bg-stone-800 grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <div>
              <select className="select select-bordered w-full max-w-xs">
                <option>Generated time order</option>
                <option>Recently created</option>
                <option>Price : low to high</option>
                <option>Price : high to low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5 p-4">
            {nftList.map((nft, index) => {
              // 마켓플레이스 nft 구분 로직
              // order 없으면
              //   내 nft 아니면 아무 버튼 없음
              //   내 nft 이면 sell 버튼
              // order 있으면
              //   내 nft 아니면 buy 버튼
              //   내 nft 이면 sell cancel 버튼

              let buttonName = "";

              if (nft.order !== null) {
                if (nft.owner === connectedAddress?.toLowerCase()) {
                  buttonName = "Cancel";
                } else {
                  buttonName = "Buy";
                }
              } else if (nft.owner === connectedAddress?.toLowerCase()) {
                buttonName = "Sell";
              }

              if (marketOption === "Buy" && buttonName !== "Buy") {
                return null;
              }
              if (marketOption === "Sell" && buttonName !== "Sell") {
                return null;
              }

              return (
                <div key={index} className="card card-compact bg-stone-100 w-64 shadow-xl">
                  <figure>
                    <img
                      src={
                        nft.meta?.image_url ||
                        "https://cdn2.imagine.art/imagine-frontend/assets/images/RowImageSlider15.webp"
                      }
                      alt="NFT image"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-black text-base">
                      {(nft.meta?.title || "title ") + "#" + nft.token_id}
                    </h3>

                    {/*<div className="truncate text-xs text-black text-ellipsis">{dateFormater(nft.minted)}</div>*/}
                    <div className="flex flex-row gap-2">
                      <div className="badge badge-primary">{nft.meta?.model}</div>
                      <div className="badge badge-base-200">{nft.meta?.attack_type}</div>
                    </div>
                    <div className="card-actions justify-between items-center mt-1">
                      {nft.order ? (
                        <div className="text-primary font-semibold p-2 ">{`${nft.order.price} ETH`}</div>
                      ) : (
                        <div />
                      )}

                      {buttonName && (
                        <div>
                          <button
                            className="btn btn-sm"
                            onClick={() =>
                              (document.getElementById(`my_modal_${index}`) as HTMLDialogElement)?.showModal()
                            }
                          >
                            {buttonName}
                          </button>
                          <dialog id={`my_modal_${index}`} className="modal">
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">{nft.meta?.title || "NFT Title"}</h3>

                              <p className="truncate text-sm text-ellipsis">ID : {nft.token_id}</p>
                              <p className="truncate text-sm text-ellipsis">Owner : {nft.owner}</p>
                              <p className="truncate text-sm text-ellipsis">Creator : {nft.creator}</p>
                              <p className="truncate text-sm text-ellipsis">Minted : {nft.minted}</p>

                              {buttonName === "Buy" && <div className="text-lg"> Price : {nft.order?.price} ETH.</div>}
                              {buttonName === "Buy" && (
                                <div className="text-xl text-center p-2">Confirm purchase ?</div>
                              )}
                              {buttonName === "Sell" && (
                                <div className="text-xl text-center p-2">Approve Selling NFT ?</div>
                              )}
                              {buttonName === "Cancel" && (
                                <div className="text-xl text-center p-2">Cancel Selling NFT ?</div>
                              )}

                              <div className="modal-action mt-2">
                                <Link
                                  href={`https://testnet.rarible.com/token/astarzkevm/0x4f36ba8f1db6dd71528fc586a354665ebc81b63d:${nft.token_id}?tab=overview`}
                                >
                                  <button className="btn btn-primary">{buttonName}</button>
                                </Link>

                                <form method="dialog">
                                  <button className="btn">Close</button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
