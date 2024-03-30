"use client";
import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";

// connectedAddress가 undefined일 수 있으므로 로그인 하지 않았을 시 option에서 내것만 보기 체크 못하게 막아야 함
// buy 버튼 조건: order가 존재 / 내가 소유하지 않아야 함 / order.status가 active여야 함
// sell 버튼 조건: 내가 소유해야 함 / order가 존재 X
// cancel 버튼 조건: 내가 소유해야 함 / order가 존재 / order.status가 active여야 함

const Page = () => {
  const [list, setList] = useState([]);
  const [option, setOption] = useState(false);
  const { address: connectedAddress } = useAccount();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/rarible", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkMine = (owner: string) => {
    return owner === connectedAddress?.toLowerCase();
  }

  const checkSelling = (order: any) => {
    return order !== null;
  };

  const handleOption = () => {
    try {
      if (option) {
        setOption(false);
        fetchData();
      } else {
        setOption(true);
        const renewList = list.filter((item: any) => item.owner === connectedAddress?.toLowerCase());
        setList(renewList);
      }
    } catch (error) {
      console.error("Error change option", error);
    }
  };

  const buyAction = async () => {
    try {
      const response = await fetch("/api/rarible", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: "buy",
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="border border-gray-600 rounded-2xl p-6">
        <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(list, null, 2)}</pre>
        <div className="card-actions justify-between">
          <button className="btn btn-primary" onClick={() => handleOption()}>
            {option ? "Show All" : "Hide Without Mine"}
          </button>
        </div>
        <div className="card-actions justify-between">
          <button className="btn btn-primary" onClick={() => buyAction()}>
            buy test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
