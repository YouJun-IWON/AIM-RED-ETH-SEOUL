"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import { HoverBorderGradient } from "~~/components/acui/hover-border-gradient";
import { LampContainer } from "~~/components/acui/lamp";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <LampContainer>
        <div className="grid sm:grid-cols-3 gap-32 max-sm:mt-[500px]">
          <motion.h1
            initial={{ opacity: 0.5, y: 200 }}
            whileInView={{ opacity: 1, y: 120 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="max-sm:hidden bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent "
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black  text-black dark:text-white flex items-center space-x-2"
              onClick={() => router.push("/market")}
            >
              <span className='text-white'>NFT Market</span>
            </HoverBorderGradient>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0.5, y: 200 }}
            whileInView={{ opacity: 1, y: 120 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className=" bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent "
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black  text-black dark:text-white flex items-center space-x-2"
              onClick={() => router.push("/game")}
            >
              <span className='text-white'>Let&apos;s Hack</span>
            </HoverBorderGradient>
          </motion.h1>
          <span className="flex sm:hidden text-center">Optimized for desktop..😂</span>
          <motion.h1
            initial={{ opacity: 0.5, y: 200 }}
            whileInView={{ opacity: 1, y: 120 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            onClick={() => router.push("/community")}
            className=" bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent "
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-black dark:text-white flex items-center space-x-2"
            >
              <span className='text-white'>Community</span>
            </HoverBorderGradient>
          </motion.h1>
        </div>
      </LampContainer>
    </>
  );
};

export default Home;
