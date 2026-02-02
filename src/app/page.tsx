"use client";
import React, { useState } from 'react';
import { Terminal, Code2, Rocket, ExternalLink, CheckCircle2, Copy, Zap, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JFUF() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00EF8B] selection:text-black font-sans">
      {/* Hero Section */}
      <nav className="border-b border-white/10 py-4 px-6 flex justify-between items-center sticky top-0 bg-[#050505]/80 backdrop-blur-md z-50">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00EF8B] rounded-full flex items-center justify-center text-black">
            <Zap size={18} fill="black" />
          </div>
          JUSTF*CKINGUSEFLOW
        </div>
        <div className="flex gap-6 text-sm font-medium text-white/60">
          <a href="#speedrun" className="hover:text-[#00EF8B] transition-colors">Speedrun</a>
          <a href="#recipes" className="hover:text-[#00EF8B] transition-colors">Recipes</a>
          <a href="https://developers.flow.com" target="_blank" className="hover:text-[#00EF8B] transition-colors flex items-center gap-1">Docs <ExternalLink size={14} /></a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-none">
            JUST F*CKING <br/>
            <span className="text-[#00EF8B]">USE FLOW.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            The only L1 built for consumer apps. <br/>
            Gasless UX, Resource-oriented security, and 1-second finality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#speedrun" className="bg-[#00EF8B] text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Deploy in 5 Minutes
            </a>
            <a href="https://developers.flow.com/build/tools" className="bg-[#00EF8B]/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#00EF8B]/10 transition-colors" target="_blank" rel="noopener noreferrer">
              View Starter Kit
            </a>
          </div>
        </motion.div>

        {/* Speedrun Section */}
        <section id="speedrun" className="mb-32 scroll-mt-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-[#00EF8B]/10 p-3 rounded-2xl">
              <Rocket className="text-[#00EF8B]" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold italic tracking-tight underline decoration-[#00EF8B]">THE ONBOARDING SPEEDRUN</h2>
              <p className="text-white/40">From zero to Testnet deployment.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <SpeedrunStep 
              number="01" 
              title="Install Flow CLI" 
              cmd='sh -ci "$(curl -fsSL https://raw.githubusercontent.com/onflow/flow-cli/master/install.sh)"'
              copyFn={copyToClipboard}
              copied={copied}
            />
            <SpeedrunStep 
              number="02" 
              title="Initialize Project" 
              cmd='flow init'
              copyFn={copyToClipboard}
              copied={copied}
            />
            <SpeedrunStep 
              number="03" 
              title="Generate Testnet Key" 
              cmd='flow keys generate --network=testnet'
              copyFn={copyToClipboard}
              copied={copied}
            />
            <SpeedrunStep 
              number="04" 
              title="Deploy Your Contract" 
              cmd='flow project deploy --network=testnet'
              copyFn={copyToClipboard}
              copied={copied}
            />
          </div>
        </section>

        {/* Recipes Section */}
        <section id="recipes" className="mb-32 scroll-mt-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-[#00EF8B]/10 p-3 rounded-2xl">
              <Code2 className="text-[#00EF8B]" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">CADENCE 1.0 RECIPES</h2>
              <p className="text-white/40">Battle-tested snippets for modern Flow.</p>
            </div>
          </div>

          <div className="space-y-6">
            <RecipeCard 
              title="Minimal NFT Contract" 
              desc="The core logic for a Flow Resource-based NFT."
              code={`access(all) contract MinimalNFT {
    access(all) resource NFT {
        access(all) let id: UInt64
        init(id: UInt64) { self.id = id }
    }

    access(all) fun createNFT(id: UInt64): @NFT {
        return <- create NFT(id: id)
    }
}`}
              copyFn={copyToClipboard}
              copied={copied}
            />
            
            <RecipeCard 
              title="Send a Transaction" 
              desc="How to move resources (assets) between accounts."
              code={`import NonFungibleToken from 0xNFTADDRESS

transaction(recipient: Address, withdrawID: UInt64) {
    prepare(signer: auth(Withdraw) &Account) {
        let col = signer.storage.borrow<&Collection>(from: /storage/NFTCol)
        let nft <- col.withdraw(withdrawID: withdrawID)
        getAccount(recipient).capabilities.get(/public/NFTReceiver).borrow()!.deposit(token: <-nft)
    }
}`}
              copyFn={copyToClipboard}
              copied={copied}
            />
          </div>
        </section>

        {/* Comparison Section */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-12 mb-32">
          <h2 className="text-4xl font-black mb-12 text-center tracking-tighter italic">WHY NOT JUST USE ETHEREUM?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <Feature icon={<Cpu />} title="Resource Oriented" desc="Assets are real objects in storage, not just a line in a mapping. It's impossible to 'double spend' logic." />
            <Feature icon={<Globe />} title="Native UX" desc="Multi-sig, account recovery, and gasless transactions are built into the protocol, not hacked on top." />
            <Feature icon={<Zap />} title="Scalability" desc="Separation of collection and consensus allows high throughput without sharding headaches." />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 px-6 text-center text-white/30 text-sm">
        <p>Built for the Flow Community. This site is open source. Don't be a laggard. Just build.</p>
      </footer>
    </div>
  );
}

function SpeedrunStep({ number, title, cmd, copyFn, copied }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl group hover:border-[#00EF8B]/50 transition-colors">
      <div className="text-[#00EF8B] font-mono text-sm mb-2 font-bold">{number}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="bg-black p-4 rounded-xl flex items-center justify-between font-mono text-sm group-hover:bg-black/50 transition-colors">
        <code className="text-white/70 overflow-x-hidden truncate mr-2">$ {cmd}</code>
        <button onClick={() => copyFn(cmd, title)} className="text-white/40 hover:text-[#00EF8B]">
          {copied === title ? <CheckCircle2 size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  );
}

function RecipeCard({ title, desc, code, copyFn, copied }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-white/40">{desc}</p>
        </div>
        <button onClick={() => copyFn(code, title)} className="bg-white/10 hover:bg-[#00EF8B] hover:text-black p-2 rounded-lg transition-all">
          {copied === title ? <CheckCircle2 size={20} /> : <Copy size={20} />}
        </button>
      </div>
      <pre className="p-6 overflow-x-auto font-mono text-sm text-[#00EF8B]/80 leading-relaxed bg-black/30">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Feature({ icon, title, desc }: any) {
  return (
    <div className="text-center">
      <div className="inline-block p-4 bg-[#00EF8B] text-black rounded-2xl mb-6">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-white/50 leading-relaxed">{desc}</p>
    </div>
  );
}