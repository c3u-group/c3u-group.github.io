"use client";
import { useEffect, useMemo, useState } from "react";
import membersData from "@/data/members.json";

type Player = {
    name: string;
};

type LeaderboardEntry = {
    name: string;
    measured: number;
    error: number; // relative error (0..1)
    rank: number;
};

export default function WeighClient() {
    const players: Player[] = useMemo(() => {
        const list = [
            {name: "----老师----"},
            ...(membersData?.teacher ?? []),
            {name: "----博士生----"},
            ...(membersData?.doctor ?? []),
            {name: "----硕士生----"},
            ...(membersData?.master ?? []),
            {name: "----其他----"},
            {name: "甲"},
            {name: "乙"},
            {name: "丙"},
            {name: "丁"},
            {name: "戊"},
            {name: "己"},
            {name: "庚"},
            {name: "辛"},
            {name: "壬"},
            {name: "癸"},
            // ...(membersData?.alumni ?? []),
        ];
        return list.map((m) => ({ name: m.name }));
    }, []);

    const [target, setTarget] = useState<number | null>(null);
    const [targetInput, setTargetInput] = useState<string>("");

    const [measurements, setMeasurements] = useState<Record<string, number>>({});
    const [selectedPlayer, setSelectedPlayer] = useState<string>("");
    const [valueInput, setValueInput] = useState<string>("");

    // Load persisted state (optional persistence)
    useEffect(() => {
        const t = localStorage.getItem("weigh_game_target");
        const m = localStorage.getItem("weigh_game_measurements");
        if (t) {
            const parsed = parseFloat(t);
            if (!Number.isNaN(parsed) && parsed > 0) setTarget(parsed);
        }
        if (m) {
            try {
                const obj = JSON.parse(m) as Record<string, number>;
                setMeasurements(obj || {});
            } catch {}
        }
    }, []);

    useEffect(() => {
        if (target && target > 0) {
            localStorage.setItem("weigh_game_target", String(target));
        } else {
            localStorage.removeItem("weigh_game_target");
        }
    }, [target]);

    useEffect(() => {
        localStorage.setItem("weigh_game_measurements", JSON.stringify(measurements));
    }, [measurements]);

    useEffect(() => {
        if (players.length && !selectedPlayer) {
            setSelectedPlayer(players[0].name);
        }
    }, [players, selectedPlayer]);

    const startGame = () => {
        const val = parseFloat(targetInput);
        if (Number.isNaN(val) || val <= 0) {
            alert("请输入一个有效且大于 0 的目标质量");
            return;
        }
        setTarget(val);
        setMeasurements({}); // new round
    };

    const resetGame = () => {
        setTarget(null);
        setTargetInput("");
        setMeasurements({});
        setSelectedPlayer(players.length ? players[0].name : "");
        setValueInput("");
    };

    const submitMeasurement = () => {
        if (!target || target <= 0) {
            alert("请先设置目标质量以开始游戏");
            return;
        }
        if (!selectedPlayer || selectedPlayer.trim().startsWith("----")) {
            alert("请选择一位玩家");
            return;
        }
        const val = parseFloat(valueInput);
        if (Number.isNaN(val)) {
            alert("请输入有效的称量数值");
            return;
        }
        setMeasurements((prev) => ({ ...prev, [selectedPlayer]: val }));
        setValueInput("");
    };

    const leaderboard: LeaderboardEntry[] = useMemo(() => {
        if (!target || target <= 0) return [];
        const epsilon = 1e-9;
        const entries = Object.entries(measurements)
            .map(([name, measured]) => ({
                name,
                measured,
                error: Math.abs(measured - target) / target,
            }))
            .sort((a, b) => a.error - b.error);

        // Assign ranks with ties
        let currentRank = 0;
        let lastError: number | null = null;
        const withRanks: LeaderboardEntry[] = entries.map((e, idx) => {
            if (lastError === null || Math.abs(e.error - lastError) > epsilon) {
                currentRank = idx + 1;
                lastError = e.error;
            }
            return { ...e, rank: currentRank };
        });
        return withRanks;
    }, [measurements, target]);

    const winners = useMemo(() => {
        if (!leaderboard.length) return [] as LeaderboardEntry[];
        const minError = leaderboard[0].error;
        const epsilon = 1e-9;
        return leaderboard.filter((e) => Math.abs(e.error - minError) <= epsilon);
    }, [leaderboard]);

    const losers = useMemo(() => {
        if (!leaderboard.length) return [] as LeaderboardEntry[];
        const maxError = leaderboard[leaderboard.length - 1].error;
        const epsilon = 1e-9;
        return leaderboard.filter((e) => Math.abs(e.error - maxError) <= epsilon);
    }, [leaderboard]);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <h2 className="text-xl font-semibold mb-3">称量药品小游戏</h2>
                {!target ? (
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-1">目标质量</label>
                            <input
                                type="number"
                                inputMode="decimal"
                                placeholder="例如 10"
                                className="border rounded-md px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none"
                                value={targetInput}
                                onChange={(e) => setTargetInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        startGame();
                                    }
                                }}
                            />
                        </div>
                        <button
                            onClick={startGame}
                            className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            开始游戏
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between gap-3">
                        <div className="text-base">
                            当前目标质量：<span className="font-bold text-emerald-600">{target}</span>
                        </div>
                        <button
                            onClick={resetGame}
                            className="px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            重新开始
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <h3 className="text-lg font-semibold mb-3">录入称量值</h3>
                <div className="flex flex-col md:flex-row gap-3 items-start md:items-end">
                      <div className="flex-1 min-w-50">
                        <label className="text-sm text-gray-600 mb-1 block">玩家</label>
                        <select
                            className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none"
                            value={selectedPlayer}
                            onChange={(e) => setSelectedPlayer(e.target.value)}
                        >
                            {players.map((p) => (
                                <option key={p.name} value={p.name}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>
                      <div className="flex-1 min-w-50">
                        <label className="text-sm text-gray-600 mb-1 block">称量结果</label>
                        <input
                            type="number"
                            inputMode="decimal"
                            placeholder="输入电子秤数值"
                            className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none"
                            value={valueInput}
                            onChange={(e) => setValueInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    submitMeasurement();
                                }
                            }}
                        />
                    </div>
                    <button
                        onClick={submitMeasurement}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                        提交
                    </button>
                </div>

                <div className="text-sm text-gray-600 mt-3">
                    已录入：<span className="font-medium">{Object.keys(measurements).length}</span> 人
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <h3 className="text-lg font-semibold mb-3">排行榜</h3>
                {!leaderboard.length ? (
                    <div className="text-sm text-gray-600">尚无录入，录入后自动统计。</div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm">赢家：</span>
                            {winners.map((w) => (
                                <span
                                    key={w.name}
                                    className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700"
                                >
                                    {w.name}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm">输家：</span>
                            {losers.map((l) => (
                                <span
                                    key={l.name}
                                    className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700"
                                >
                                    {l.name}
                                </span>
                            ))}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                                        <th className="py-2 pr-4">排名</th>
                                        <th className="py-2 pr-4">玩家</th>
                                        <th className="py-2 pr-4">称量值</th>
                                        <th className="py-2 pr-4">相对误差</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((e) => (
                                        <tr
                                            key={e.name}
                                            className={`border-b border-gray-100 dark:border-gray-700 ${
                                                winners.find((w) => w.name === e.name)
                                                    ? "bg-emerald-50 dark:bg-emerald-900/10"
                                                    : losers.find((l) => l.name === e.name)
                                                    ? "bg-red-50 dark:bg-red-900/10"
                                                    : ""
                                            }`}
                                        >
                                            <td className="py-2 pr-4">{e.rank}</td>
                                            <td className="py-2 pr-4 font-medium">{e.name}</td>
                                            <td className="py-2 pr-4">{e.measured}</td>
                                            <td className="py-2 pr-4">{(e.error * 100).toFixed(2)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                    说明：相对误差 = |称量值 − 目标质量| / 目标质量。
                </div>
            </div>
        </div>
    );
}