"use client";

import { motion } from "framer-motion";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <div className={`w-full ${className || ''}`}>
      {children}
    </div>
  );
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={`relative flex space-x-8 border-b border-gray-200 ${className || ''}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className, isActive = false }: TabsTriggerProps) {
  return (
    <button
      className={`relative pb-4 px-1 text-sm font-medium transition-colors ${
        isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
      } ${className || ''}`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-textDark"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  return (
    <div className={`mt-8 ${className || ''}`}>
      {children}
    </div>
  );
}
