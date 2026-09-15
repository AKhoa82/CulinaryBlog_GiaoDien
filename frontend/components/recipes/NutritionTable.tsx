import React from 'react';
import { NutritionInfo } from '../../types';

export interface NutritionTableProps {
  nutrition: NutritionInfo;
  servings: number;
}

export const NutritionTable: React.FC<NutritionTableProps> = ({ nutrition, servings }) => {
  const items = [
    { label: 'Năng lượng', value: `${nutrition.calories} kcal`, highlight: true },
    { label: 'Chất đạm (Protein)', value: `${nutrition.protein} g` },
    { label: 'Carbohydrate', value: `${nutrition.carbohydrates} g` },
    { label: 'Chất béo (Fat)', value: `${nutrition.fat} g` },
    { label: 'Chất xơ', value: nutrition.fiber ? `${nutrition.fiber} g` : '1.5 g' },
    { label: 'Natri (Sodium)', value: nutrition.sodium ? `${nutrition.sodium} mg` : '540 mg' },
  ];

  return (
    <div className="bg-[#FBF8F1] rounded-2xl p-6 border border-[#E5DECE] shadow-2xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5DECE]">
        <h4 className="text-xs font-semibold text-[#1C2421] uppercase tracking-widest font-editorial">
          Giá trị dinh dưỡng (Cho 1 khẩu phần / {servings} phần)
        </h4>
        <span className="text-[11px] text-[#8D958F] italic">* Ước tính dinh dưỡng theo công thức</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-xl border transition-colors ${
              item.highlight
                ? 'bg-[#022C24]/5 border-[#C6A15B]/40'
                : 'bg-[#F5F0E6] border-[#E5DECE]'
            }`}
          >
            <div className="text-[11px] text-[#8D958F]">{item.label}</div>
            <div
              className={`text-base font-bold mt-0.5 font-editorial ${
                item.highlight ? 'text-[#063C2F]' : 'text-[#1C2421]'
              }`}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
