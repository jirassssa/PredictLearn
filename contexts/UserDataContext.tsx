'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { UserProgress, Badge } from '@/types';

interface UserData {
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  addBadge: (badge: Badge) => void;
  resetProgress: () => void;
}

const UserDataContext = createContext<UserData | undefined>(undefined);

const DEFAULT_PROGRESS: UserProgress = {
  userId: 'guest',
  level: 1,
  xp: 0,
  xpToNextLevel: 1000,
  streak: 0,
  challengesCompleted: 0,
  accuracy: 0,
  badges: [],
  specialties: [],
};

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);

  // Load user data from localStorage when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      const storageKey = `predictlearn_user_${address}`;
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        try {
          const userData = JSON.parse(stored);
          setProgress({ ...userData, userId: address });
        } catch (error) {
          console.error('Failed to load user data:', error);
          setProgress({ ...DEFAULT_PROGRESS, userId: address });
        }
      } else {
        // New user
        setProgress({ ...DEFAULT_PROGRESS, userId: address });
      }
    } else {
      // Guest mode
      setProgress(DEFAULT_PROGRESS);
    }
  }, [address, isConnected]);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (isConnected && address && progress.userId === address) {
      const storageKey = `predictlearn_user_${address}`;
      localStorage.setItem(storageKey, JSON.stringify(progress));
    }
  }, [progress, address, isConnected]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress((prev) => ({ ...prev, ...updates }));
  };

  const addXP = (amount: number) => {
    setProgress((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / prev.xpToNextLevel) + prev.level;
      const remainingXP = newXP % prev.xpToNextLevel;

      return {
        ...prev,
        xp: remainingXP,
        level: newLevel,
        xpToNextLevel: 1000 + (newLevel - 1) * 500, // Progressive XP requirements
      };
    });
  };

  const incrementStreak = () => {
    setProgress((prev) => ({ ...prev, streak: prev.streak + 1 }));
  };

  const addBadge = (badge: Badge) => {
    setProgress((prev) => {
      // Check if badge already exists
      if (prev.badges.some((b) => b.id === badge.id)) {
        return prev;
      }
      return {
        ...prev,
        badges: [...prev.badges, { ...badge, unlockedAt: new Date().toISOString() }],
      };
    });
  };

  const resetProgress = () => {
    if (isConnected && address) {
      const storageKey = `predictlearn_user_${address}`;
      localStorage.removeItem(storageKey);
      setProgress({ ...DEFAULT_PROGRESS, userId: address });
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        progress,
        updateProgress,
        addXP,
        incrementStreak,
        addBadge,
        resetProgress,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within UserDataProvider');
  }
  return context;
}
