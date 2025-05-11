'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useMemo } from 'react';

export const ConnectButton = () => {
  const { connected, disconnect, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const shortAddress = useMemo(() => {
    if (!publicKey) return '';
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 4)}...${base58.slice(-4)}`;
  }, [publicKey]);

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-r from-[#9945FF] via-[#8752F3] to-[#14F195] hover:bg-blue-700 text-white font-medium py-2 px-4 w-48 rounded-md transition-colors cursor-pointer min-w-[192px] text-center"
    >
      {connected ? shortAddress : 'Connect Wallet'}
    </button>
  );
};
