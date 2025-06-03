import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { useEffect } from 'react';

// Import syntax highlighting library
import 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-solidity';
import 'prismjs/themes/prism-tomorrow.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Apply syntax highlighting when content changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load Prism.js if it exists
      const Prism = (window as any).Prism;
      if (Prism) {
        Prism.highlightAll();
      }
    }
  }, [router.asPath]);

  return (
    <AnimatePresence mode="wait">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimatePresence>
  );
}

export default MyApp;