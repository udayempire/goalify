'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useMemo, useCallback, useEffect } from 'react';

export const ConnectButton = () => {
  const { connected, disconnect, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const shortAddress = useMemo(() => {
    if (!publicKey) return '';
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 4)}...${base58.slice(-4)}`;
  }, [publicKey]);

  const createUser = useCallback(async (walletAddress: string) => {
    try {
      //Check if user exists
      const checkRes = await fetch(`/api/users?walletAddress=${walletAddress}`);
      const checkData = await checkRes.json();
      if (checkData.success && checkData.user) {
        // User exists, treat as login
        console.log('User exists, logging in:', checkData.user);
        return;
      }

      //If not, create new user
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: shortAddress,
          walletAddress,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Failed to create user:', data);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }, [shortAddress]);

  const handleClick = async () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  // Watch for wallet connection
  useEffect(() => {
    if (connected && publicKey) {
      createUser(publicKey.toBase58());
    }
  }, [connected, publicKey, createUser]);

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-r from-[#9945FF] via-[#8752F3] to-[#14F195] hover:bg-blue-700 text-white font-medium py-2 px-4 w-48 rounded-md transition-colors cursor-pointer min-w-[192px] text-center"
    >
      {connected ? shortAddress : 'Connect Wallet'}
    </button>
  );
};
