"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Tabs({ tabs }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTab = searchParams.get("tab") || tabs[0].value;

  const handleTabChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-2 flex gap-4 border-b border-gray-200 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          className={`min-w-[170px] px-4 py-2 text-sm transition-colors ${
            currentTab === tab.value
              ? "border-b-2 border-blue-600 text-blue-500 bg-white rounded-t-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}