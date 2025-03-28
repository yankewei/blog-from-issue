"use client";

import { Button } from "@nextui-org/button";
import { useState } from "react";

interface ShareButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function ShareButton({ className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      size="sm"
      variant="light"
      className={`text-gray-600 dark:text-gray-400 ${className}`}
      onClick={handleShare}
    >
      <i className={`icon-[tabler--${copied ? 'check' : 'share'}] mr-1`}></i>
      {copied ? '已复制链接' : '分享'}
    </Button>
  );
}