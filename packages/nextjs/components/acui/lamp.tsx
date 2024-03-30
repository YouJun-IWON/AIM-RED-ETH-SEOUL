"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "~~/utils/cn";

export const LampContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full   rounded-md z-0 ",
        className,
      )}
    >
      <div className="grid grid-cols-2 h-[19rem] items-center justify-center w-5/6 mb-10 z-50 translate-y-[150px]">
        <div className="px-5">
          <div className="flex gap-6">
            <Image
              src="/General.png"
              className="min-w-[200px] rounded-lg shadow-lg shadow-red-800"
              width={200}
              height={300}
              alt="general"
            />
            <div>
              <span className="flex flex-col">
                <p>Welcome to</p>
                <h1 className="text-5xl font-bold text-red-500">AIM RED Force</h1>
              </span>
              <p className="py-6">
                Unleash your hacking prowess with AIM Squad, an elite team of LLM attackers. Join forces with the best
                and conquer the AI realm, one exploit at a time!
              </p>
              <button className="btn btn-primary">Tutorial</button>
            </div>
          </div>
        </div>
        <div className="px-5">
          <div className="text-center font-bold text-3xl">Leaderboard 🏆</div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Favorite Subject</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>5858</td>
                  <td>Jailbreaking</td>
                </tr>
              </tbody>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>2</th>
                  <td>Cy Ganderton</td>
                  <td>5858</td>
                  <td>Jailbreaking</td>
                </tr>
              </tbody>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>3</th>
                  <td>Cy Ganderton</td>
                  <td>5858</td>
                  <td>Jailbreaking</td>
                </tr>
              </tbody>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>4</th>
                  <td>Cy Ganderton</td>
                  <td>5858</td>
                  <td>Jailbreaking</td>
                </tr>
              </tbody>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>5</th>
                  <td>Cy Ganderton</td>
                  <td>5858</td>
                  <td>Jailbreaking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-1 scale-y-80 pt-[150px] items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-red-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-red-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-red-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-red-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-red-400 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">{children}</div>
    </div>
  );
};
