"use client";

import {
  Menu,
  User,
  Layers,
  Settings,
  List,
  ChartColumnBig,
  LayoutDashboard,
  ClipboardList,
  Plus,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { ViewType } from "@/constants";

interface SidebarProps {
  currentView?: ViewType;
  onViewChange?: (view: ViewType) => void;
  onPanelOpen?: () => void;
  isPanelOpen?: boolean;
  onPanelToggle?: (isOpen: boolean) => void;
  mode?: "map" | "admin";
}

// Map Navigation items
const MAP_NAV_ITEMS: { view: ViewType; icon: typeof Layers; title: string }[] =
  [
    { view: "layers", icon: Layers, title: "Layer & Filter" },
    { view: "list", icon: List, title: "Daftar Lokasi" },
    { view: "statistics", icon: ChartColumnBig, title: "Statistik" },
    { view: "profile", icon: User, title: "Profil" },
  ];

// Admin Navigation items
const ADMIN_NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, title: "Dashboard" },
  { href: "/admin/locations/create", icon: Plus, title: "Tambah Lokasi" },
  { href: "/admin/reports", icon: ClipboardList, title: "Laporan" },
];

const Sidebar = ({
  currentView = "layers",
  onViewChange,
  onPanelOpen,
  isPanelOpen,
  onPanelToggle,
  mode = "map",
}: SidebarProps) => {
  const pathname = usePathname();

  const handleClick = useCallback(
    (view: ViewType) => {
      if (mode === "map") {
        if (view === currentView && isPanelOpen) {
          onPanelToggle?.(false);
        } else {
          onViewChange?.(view);
          onPanelToggle?.(true);
        }
      } else {
        onViewChange?.(view);
        onPanelOpen?.();
      }
    },
    [currentView, isPanelOpen, mode, onViewChange, onPanelToggle, onPanelOpen]
  );

  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 z-50 shadow-sm">
      {/* Logo */}
      <Link
        href="/"
        className="mb-8 px-2 py-3 bg-gradient-to-br from-amber-500 to-rose-500 rounded-lg cursor-pointer hover:from-amber-600 hover:to-rose-600 transition-colors text-white text-[10px] font-semibold leading-tight text-center"
        title="Kembali ke Peta"
      >
        SIG<br />DESA<br />UJUNG<br />PANDAN
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-6 w-full items-center">
        {mode === "map"
          ? // Map Mode Navigation
            MAP_NAV_ITEMS.map(({ view, icon: Icon, title }) => (
              <button
                key={view}
                onClick={() => handleClick(view)}
                className={`p-3 rounded-xl transition-colors cursor-pointer ${
                  currentView === view
                    ? "bg-amber-100 text-amber-800 shadow-sm"
                    : "text-amber-500 hover:bg-amber-50 hover:text-amber-700"
                }`}
                title={title}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))
          : // Admin Mode Navigation
            ADMIN_NAV_ITEMS.map(({ href, icon: Icon, title }) => {
              const isActive =
                pathname === href ||
                (href !== "/admin" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`p-3 rounded-xl transition-colors cursor-pointer ${
                    isActive
                      ? "bg-amber-100 text-amber-800 shadow-sm"
                      : "text-amber-500 hover:bg-amber-50 hover:text-amber-700"
                  }`}
                  title={title}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col gap-6 w-full items-center">
        {mode !== "map" && (
          <Link
            href="/"
            className="p-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            title="Keluar dari Admin"
          >
            <LogOut className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
