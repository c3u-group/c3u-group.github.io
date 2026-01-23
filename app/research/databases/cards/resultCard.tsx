"use client";

import type { AminoRecord } from "../types";

type ResultCardProps = {
	selectedItem: AminoRecord | null;
};

export default function ResultCard({ selectedItem }: ResultCardProps) {
	return (
		<div className="bg-linear-to-br from-slate-50 via-white to-slate-100 rounded-xl border border-slate-200 shadow-md p-8 h-full flex flex-col gap-8 my-2">
			{!selectedItem ? (
				<div className="flex h-full items-center justify-center text-slate-500">
					请查询数据库
				</div>
			) : (
				<div className="space-y-4">
					<div className="flex items-start justify-between gap-3">
						<h4 className="text-lg font-semibold text-slate-800">查询结果</h4>
						<div className="flex flex-wrap gap-2 text-xs">
							{selectedItem.category && (
								<span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
									{selectedItem.category}
								</span>
							)}
							{selectedItem.abbr && (
								<span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
									{selectedItem.abbr}
								</span>
							)}
							<span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
								ID {selectedItem.item_id}
							</span>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-3 text-base leading-7 text-slate-700">
						<p>
							<strong>名称:</strong> {selectedItem.name}
						</p>
						<p>
							<strong>CAS:</strong> {selectedItem.cas}
						</p>
						<p>
							<strong>缩写:</strong> {selectedItem.abbr || "-"}
						</p>
						<p>
							<strong>类别:</strong> {selectedItem.category || "-"}
						</p>
					</div>

					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<h5 className="text-sm font-semibold text-slate-700">实验条件</h5>
							<span className="text-xs text-slate-500">
								{selectedItem.conditions_details.length || 0} 条
							</span>
						</div>
						{selectedItem.conditions_details.length === 0 ? (
							<div className="rounded-lg border border-dashed border-slate-200 bg-white/70 p-3 text-sm text-slate-500">
								暂无条件数据
							</div>
						) : (
							<div className="space-y-2">
								{selectedItem.conditions_details.map((detail) => (
									<div
										key={detail.condition_id}
										className="rounded-lg border border-slate-200 bg-white/90 p-3 text-sm text-slate-700 shadow-sm"
									>
										<div className="font-semibold text-slate-800">
											{detail.condition || "-"}
										</div>
										<div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
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