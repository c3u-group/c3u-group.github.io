"use client";

import type { AminoRecord } from "../types";

type ResultCardProps = {
  selectedItem: AminoRecord | null;
};

export default function ResultCard({ selectedItem }: ResultCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 lg:p-8 lg:h-full flex flex-col gap-6">
      {!selectedItem ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800">
              <svg className="h-7 w-7 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 dark:text-gray-500">未选择条目</p>
              <p className="text-xs text-gray-300 dark:text-gray-600 mt-0.5">请搜索并选择一条数据查看详情</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 overflow-y-auto min-h-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 mb-0.5">
                查询结果
              </p>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedItem.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-0.5">
                CAS {selectedItem.cas}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedItem.category && (
                <span className="px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium text-xs border border-emerald-100 dark:border-emerald-900/50">
                  {selectedItem.category}
                </span>
              )}
              {selectedItem.abbr && (
                <span className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-xs border border-blue-100 dark:border-blue-900/50">
                  {selectedItem.abbr}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3.5 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              {[
                ["名称", selectedItem.name],
                ["CAS", selectedItem.cas],
                ["缩写", selectedItem.abbr || "—"],
                ["类别", selectedItem.category || "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <dt className="text-[11px] font-semibold tracking-[0.12em] uppercase text-gray-400 dark:text-gray-500">{label}</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="hidden md:flex rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 min-w-[180px] items-center justify-center">
              <div className="text-center px-4">
                <svg className="h-6 w-6 mx-auto text-gray-300 dark:text-gray-600 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">Molecular<br />structure</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500">
                实验条件
              </h3>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono tabular-nums">
                {selectedItem.conditions_details.length || 0} 条
              </span>
            </div>
            {selectedItem.conditions_details.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 p-5 text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500">暂无实验条件数据</p>
              </div>
            ) : (
              <div className="grid gap-2.5">
                {selectedItem.conditions_details.map((detail) => (
                  <div
                    key={detail.condition_id}
                    className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 p-4 transition-colors hover:border-emerald-200 dark:hover:border-emerald-800"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0" />
                      <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                        {detail.condition || "未命名条件"}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono ml-auto shrink-0">#{detail.condition_id}</span>
                    </div>
                    <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        ["反应热", detail.reac_heat, "kJ/mol"],
                        ["平衡溶解度", detail.eq_solubility, "mol/mol"],
                        ["峰值时间", detail.peak_time, "min"],
                        ["数据来源", detail.data_source, null],
                      ].map(([label, value, unit]) => (
                        <div key={label as string} className="flex flex-col gap-0.5">
                          <dt className="text-[10px] uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500 font-medium">{label}</dt>
                          <dd className="text-sm font-mono text-gray-800 dark:text-gray-200 tabular-nums">
                            {value != null ? value : "—"}
                            {unit && value != null && (
                              <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-0.5 font-sans">{unit}</span>
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
