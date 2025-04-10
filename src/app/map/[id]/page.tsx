'use client';

import { useEffect } from 'react';

export default function MapId() {
  useEffect(() => {
    console.log(window.Tmapv3);
  }, []);

  return <section></section>;
}
