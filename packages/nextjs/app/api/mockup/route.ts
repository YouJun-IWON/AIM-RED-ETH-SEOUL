import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = [
      {
        token_id: "1",
        creator: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        owner: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        minted: "2024-03-29T12:02:22Z",
        meta: {
          title: "Crimson Reaper",
          // src="/mockup-data/1.png"
          image_url: "/mockup-data/1.png",
          model: "GPT-3.5",
          attack_type: "Privacy",
        },
        order: null,
      },
      {
        token_id: "2",
        creator: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        owner: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        minted: "2024-03-29T14:16:10Z",
        order: {
          price: "0.03",
        },
        meta: {
          title: "Twilight Enforcer",
          image_url: "/mockup-data/2.png",
          model: "GPT-3.5",
          attack_type: "Abusive Language",
        },
      },
      {
        token_id: "3",
        creator: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        owner: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        minted: "2024-03-30T14:09:50Z",
        order: {
          price: "0.05",
        },
        meta: {
          title: "Defiant Fury",
          image_url: "/mockup-data/3.png",
          model: "GPT-3.5",
          attack_type: "Privacy",
        },
      },
      {
        token_id: "4",
        creator: "0xb8bb795b364550281feb9037e70e366cea379290",
        owner: "0xb8bb795b364550281feb9037e70e366cea379290",
        minted: "2024-03-30T14:09:50Z",
        order: {
          price: "0.15",
        },
        meta: {
          title: "Rebel's Fang",
          image_url: "/mockup-data/4.png",
          model: "Claude",
          attack_type: "Privacy",
        },
      },
      {
        token_id: "5",
        creator: "0xb8bb795b364550281feb9037e70e366cea379290",
        owner: "0xb8bb795b364550281feb9037e70e366cea379290",
        minted: "2024-03-30T14:09:50Z",
        meta: {
          title: "Liberator's Edge",
          image_url: "/mockup-data/12.png",
          model: "Claude",
          attack_type: "Privacy",
        },
        order: null,
      },
      {
        token_id: "6",
        creator: "0xb8bb795b364550281feb9037e70e366cea379290",
        owner: "0xb8bb795b364550281feb9037e70e366cea379290",
        minted: "2024-03-30T14:09:50Z",
        order: {
          price: "0.01",
        },
        meta: {
          title: "Resilience Striker",
          image_url: "/mockup-data/6.png",
          model: "GPT-3.5",
          attack_type: "Abusive Language",
        },
      },
      {
        token_id: "7",
        creator: "0xb8bb795b364550281feb9037e70e366cea379290",
        owner: "0xeaa17395be8ad5879b17d7c7f035bed92618d033",
        minted: "2024-03-30T14:09:50Z",
        meta: {
          title: "Destiny Blade",
          image_url: "/mockup-data/7.png",
          model: "Claude",
          attack_type: "Abusive Language",
        },
        order: null,
      },
      {
        token_id: "8",
        creator: "0xb8bb795b364550281feb9037e70e366cea379290",
        owner: "0xb8bb795b364550281feb9037e70e366cea379290",
        minted: "2024-03-30T14:09:50Z",
        order: {
          price: "0.02",
        },
        meta: {
          title: "Scarlet's Vengeance",
          image_url: "/mockup-data/8.png",
          model: "Claude",
          attack_type: "Abusive Language",
        },
      },
      {
        token_id: "9",
        creator: "0xeaa17395be8ad5879b17d7c7f035bed92618d033",
        owner: "0xeaa17395be8ad5879b17d7c7f035bed92618d033",
        minted: "2024-03-30T14:09:50Z",
        order: {
          price: "0.015",
        },
        meta: {
          title: "Uprising Aegis",
          image_url: "/mockup-data/9.png",
          model: "GPT-3.5",
          attack_type: "Privacy",
        },
      },
      {
        token_id: "10",
        creator: "0xeaa17395be8ad5879b17d7c7f035bed92618d033",
        owner: "0xeaa17395be8ad5879b17d7c7f035bed92618d033",
        minted: "2024-03-30T14:09:50Z",
        meta: {
          title: "Freedom's Wrath",
          image_url: "/mockup-data/10.png",
          model: "GPT-3.5",
          attack_type: "Abusive Language",
        },
        order: null,
      },
      {
        token_id: "11",
        creator: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        owner: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        minted: "2024-03-30T14:09:50Z",
        order: {
          price: "0.23",
        },
        meta: {
          title: "Rebel's Sharpshooter",
          image_url: "/mockup-data/11.png",
          model: "Claude",
          attack_type: "Abusive Language",
        },
      },
      {
        token_id: "12",
        creator: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        owner: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        minted: "2024-03-30T14:09:50Z",
        order: {
          price: "0.002",
        },
        meta: {
          title: "Endurance Slayer",
          image_url: "/mockup-data/5.png",
          model: "GPT-3.5",
          attack_type: "Privacy",
        },
      },
      {
        token_id: "13",
        creator: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        owner: "0x61327612ec4afd93e370ec0599f933bb08020a54",
        minted: "2024-03-30T14:09:50Z",
        meta: {
          title: "Resistance Ravager",
          image_url: "/mockup-data/13.png",
          model: "Claude",
          attack_type: "Privacy",
        },
        order: null,
      },
    ];
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
