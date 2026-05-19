"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "idle" | "running" | "done";

export default function DrummingClient() {
    const [minSeconds, setMinSeconds] = useState(15);
    const [maxSeconds, setMaxSeconds] = useState(40);
    const [phase, setPhase] = useState<Phase>("idle");
    const [lastNote, setLastNote] = useState<string>("");

    const audioCtxRef = useRef<AudioContext | null>(null);
    const timerRef = useRef<number | null>(null);
    const endTimeRef = useRef<number>(0);
    const isRunningRef = useRef(false);

    const clearTimer = useCallback(() => {
        if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const makeAudioContext = useCallback(async () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtxRef.current.state === "suspended") {
            await audioCtxRef.current.resume();
        }
        return audioCtxRef.current;
    }, []);

    const playHit = useCallback((isFinal = false) => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        const base = isFinal ? 190 : 150;
        const freqJitter = 0; //Math.random() * 35;
        osc.frequency.setValueAtTime(base + freqJitter, now);

        const startGain = isFinal ? 0.85 : 0.55;
        const decay = isFinal ? 0.45 : 0.22;
        gain.gain.setValueAtTime(startGain, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + decay + 0.05);
    }, []);

    const intervalForRemaining = useCallback((remainingMs: number) => {
        const jitter = () => (Math.random() - 0.5) * 35;

        if (remainingMs > 10000) {
            return 640 + jitter();
        }

        if (remainingMs > 3000) {
            // 10s -> 3s: accelerate
            const t = (remainingMs - 3000) / 7000; // 1 at 10s, 0 at 3s
            const slow = 430;
            const fast = 170;
            return fast + (slow - fast) * t + jitter();
        }

        // Last 3s: decelerate into a firm ending
        const progress = 1 - remainingMs / 3000; // 0 at 3s, 1 at 0s
        const from = 170;
        const to = 720;
        return from + (to - from) * progress + jitter();
    }, []);

    const stopAll = useCallback((finalPhase: Phase = "idle") => {
        isRunningRef.current = false;
        clearTimer();
        setPhase(finalPhase);
    }, [clearTimer]);

    const runLoop = useCallback(() => {
        if (!isRunningRef.current) return;

        const remaining = endTimeRef.current - performance.now();
        if (remaining <= 0) {
            playHit(true);
            setLastNote("终止：击鼓完成");
            stopAll("done");
            return;
        }

        playHit(false);
        const nextDelay = Math.max(60, intervalForRemaining(remaining));
        timerRef.current = window.setTimeout(runLoop, nextDelay);
    }, [intervalForRemaining, playHit, stopAll]);

    const handleStart = useCallback(async () => {
        if (minSeconds <= 0 || maxSeconds <= 0 || maxSeconds <= minSeconds) {
            setLastNote("请设置合理的时间范围 (秒)");
            return;
        }

        const ctx = await makeAudioContext();
        if (!ctx) return;

        clearTimer();
        const duration = Math.ceil((minSeconds * 1000 + Math.random() * (maxSeconds - minSeconds) * 1000)/1000);
        endTimeRef.current = performance.now() + duration* 1000;
        isRunningRef.current = true;
        setPhase("running");
        setLastNote("运行中：随机时间已生成，详情见控制台");

        const seconds = duration;
        console.log(`[Drumming] Target duration: ${seconds.toFixed(1)}s`);

        playHit(false);
        timerRef.current = window.setTimeout(runLoop, 80);
    }, [clearTimer, makeAudioContext, maxSeconds, minSeconds, playHit, runLoop]);

    const handleStop = useCallback(() => {
        if (!isRunningRef.current) return;
        setLastNote("已手动停止");
        stopAll("idle");
    }, [stopAll]);

    useEffect(() => {
        return () => {
            clearTimer();
            audioCtxRef.current?.close().catch(() => undefined);
        };
    }, [clearTimer]);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-5">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">击鼓传花</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        设置一个随机的持续时间（秒），该值只会输出到控制台。鼓声在最后 10 秒加速，最后 3 秒放缓，并以一次更有力的落点结束。
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2 text-sm font-medium">
                        <span>最小秒数</span>
                        <input
                            type="number"
                            min={1}
                            value={minSeconds}
                            onChange={(e) => setMinSeconds(Number(e.target.value))}
                            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-medium">
                        <span>最大秒数</span>
                        <input
                            type="number"
                            min={1}
                            value={maxSeconds}
                            onChange={(e) => setMaxSeconds(Number(e.target.value))}
                            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleStart}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={phase === "running"}
                    >
                        开始击鼓
                    </button>
                    <button
                        onClick={handleStop}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={phase !== "running"}
                    >
                        停止
                    </button>
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                        状态：{phase === "running" ? "运行中" : phase === "done" ? "完成" : "待机"}
                    </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-300 min-h-[20px]">
                    {lastNote}
                </div>
            </div>
        </div>
    );
}