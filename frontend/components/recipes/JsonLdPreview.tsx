import React, { useState } from 'react';
import { Code, Check, Copy } from 'lucide-react';
import { generateRecipeJsonLd } from '../../lib/utils';
import { Recipe } from '../../types';

export const JsonLdPreview: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const jsonLdData = generateRecipeJsonLd(recipe);
  const jsonString = JSON.stringify(jsonLdData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 border border-[#063C2F] rounded-xl overflow-hidden bg-[#022C24] text-[#F5F0E6] shadow-xs">
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#063C2F]/80 border-b border-[#063C2F]">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-[#C6A15B]" />
          <span className="text-xs font-semibold text-[#FBF8F1] tracking-wider uppercase font-editorial">
            Dữ liệu có cấu trúc chuẩn SEO (JSON-LD Recipe Schema)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs text-[#F5F0E6]/80 hover:text-[#FBF8F1] px-3 py-1 rounded-md bg-[#022C24] border border-[#063C2F] hover:border-[#C6A15B]/40 transition-colors cursor-pointer"
          >
            {isOpen ? 'Thu gọn' : 'Xem mã JSON-LD'}
          </button>
          {isOpen && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-[#C6A15B] hover:text-[#FBF8F1] px-3 py-1 rounded-md bg-[#022C24] border border-[#C6A15B]/40 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Đã sao chép' : 'Sao chép'}
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <pre className="p-5 text-xs font-mono overflow-x-auto text-[#C6A15B] leading-relaxed max-h-96 bg-[#02241D]">
          <code>{jsonString}</code>
        </pre>
      )}
    </div>
  );
};
