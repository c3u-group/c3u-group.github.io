"use client";

import type { AminoRecord } from "../types";

type ResultCardProps = {
  selectedItem: AminoRecord | null;
};

export default function ResultCard({ selectedItem }: ResultCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 lg:p-8 lg:h-full flex flex-col gap-6">
      {!selectedItem ? (
        <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-500">
          <div className="text-center space-y-3">
            <svg className="h-10 w-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm">请从左侧查询数据库</p>
          </div>
        </div>
      ) : (
        <div className="space-y-5 overflow-y-auto min-h-0">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">查询结果</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {selectedItem.category && (
                <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">
                  {selectedItem.category}
                </span>
              )}
              {selectedItem.abbr && (
                <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                  {selectedItem.abbr}
                </span>
              )}
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                ID {selectedItem.item_id}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 gap-3 text-sm leading-7 text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-white">名称:</strong> {selectedItem.name}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">CAS:</strong> {selectedItem.cas}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">缩写:</strong> {selectedItem.abbr || "-"}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">类别:</strong> {selectedItem.category || "-"}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 min-h-40 flex items-center justify-center text-gray-400 dark:text-gray-500">
              图像预留
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white">实验条件</h5>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {selectedItem.conditions_details.length || 0} 条
              </span>
            </div>
            {selectedItem.conditions_details.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-700/30 p-3 text-sm text-gray-500 dark:text-gray-400">
                暂无条件数据
              </div>
            ) : (
              <div className="space-y-2">
                {selectedItem.conditions_details.map((detail) => (
                  <div
                    key={detail.condition_id}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-700/30 p-3 text-sm text-gray-700 dark:text-gray-300 shadow-sm"
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {detail.condition || "-"}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>反应热(kJ/mol): {detail.reac_heat ?? "-"}</span>
                      <span>平衡溶解度(mol/mol): {detail.eq_solubility ?? "-"}</span>
                      <span>峰值时间(min): {detail.peak_time ?? "-"}</span>
                      <span>数据来源: {detail.data_source ?? "-"}</span>
                    </div>
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