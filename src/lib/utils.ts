import { clsx, type ClassValue } from 'clsx';
import type { Priority } from '@/types';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function priorityColor(priority: Priority): string {
  switch (priority) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-amber-500';
    case 'low':
      return 'text-emerald-500';
  }
}

export function priorityBg(priority: Priority): string {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700';
    case 'medium':
      return 'bg-amber-100 text-amber-700';
    case 'low':
      return 'bg-emerald-100 text-emerald-700';
  }
}

export function priorityOrder(priority: Priority): number {
  switch (priority) {
    case 'high': return 0;
    case 'medium': return 1;
    case 'low': return 2;
  }
}
