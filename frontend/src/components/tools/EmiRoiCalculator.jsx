import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, ShieldCheck, ArrowRight, Sparkles, Building, Landmark, ChevronRight } from 'lucide-react';

export const EmiRoiCalculator = ({ onOpenEnquiry, onOpenSiteVisit, compact = false }) => {
  const [activeTab, setActiveTab] = useState('roi'); // 'roi' | 'emi'

  // ==========================================
  // 1. EMI CALCULATOR STATE
  // ==========================================
  const [loanAmount, setLoanAmount] = useState(7500000); // 75 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const emiCalculation = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenureYears * 12;
    if (monthlyRate === 0) {
      const monthlyEmi = loanAmount / months;
      return {
        monthlyEmi: Math.round(monthlyEmi),
        totalInterest: 0,
        totalPayable: loanAmount,
        principalPercent: 100,
        interestPercent: 0,
      };
    }
    const factor = Math.pow(1 + monthlyRate, months);
    const monthlyEmi = (loanAmount * monthlyRate * factor) / (factor - 1);
    const totalPayable = monthlyEmi * months;
    const totalInterest = totalPayable - loanAmount;
    const principalPercent = Math.round((loanAmount / totalPayable) * 100);
    const interestPercent = 100 - principalPercent;

    return {
      monthlyEmi: Math.round(monthlyEmi),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
      principalPercent,
      interestPercent,
    };
  }, [loanAmount, interestRate, tenureYears]);

  // ==========================================
  // 2. ROI & LAND APPRECIATION STATE (FOURTH CITY)
  // ==========================================
  const [investAmount, setInvestAmount] = useState(3500000); // 35 Lakhs initial plot investment
  const [holdingYears, setHoldingYears] = useState(5); // 5 years
  const [fourthCityCagr, setFourthCityCagr] = useState(24.5); // 24.5% projected Fourth City growth

  // Comparison Benchmarks
  const fdRate = 7.0; // 7% Bank FD
  const mfRate = 12.5; // 12.5% Mutual Funds / Nifty

  const roiCalculations = useMemo(() => {
    // Compound interest: A = P * (1 + r)^t
    const calcFuture = (p, r, t) => Math.round(p * Math.pow(1 + r / 100, t));

    const futureFourthCity = calcFuture(investAmount, fourthCityCagr, holdingYears);
    const gainFourthCity = futureFourthCity - investAmount;
    const multiplierFourthCity = (futureFourthCity / investAmount).toFixed(1);

    const futureFd = calcFuture(investAmount, fdRate, holdingYears);
    const gainFd = futureFd - investAmount;

    const futureMf = calcFuture(investAmount, mfRate, holdingYears);
    const gainMf = futureMf - investAmount;

    const extraOverFd = futureFourthCity - futureFd;

    return {
      futureFourthCity,
      gainFourthCity,
      multiplierFourthCity,
      futureFd,
      gainFd,
      futureMf,
      gainMf,
      extraOverFd,
    };
  }, [investAmount, holdingYears, fourthCityCagr]);

  const formatCurrency = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investment Decision Tools</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Financial & ROI Calculator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Model your returns in Telangana’s high-growth Fourth City or calculate your customized home loan EMI with verified institutional benchmarks.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-obsidian-950 border border-gold-500/30 shadow-inner mt-4">
            <button
              onClick={() => setActiveTab('roi')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'roi'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow-luxury font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Fourth City Land ROI</span>
            </button>

            <button
              onClick={() => setActiveTab('emi')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'emi'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow-luxury font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Home Loan EMI</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: FOURTH CITY LAND ROI & CAPITAL APPRECIATION COMPACT/FULL */}
        {/* ============================================================== */}
        {activeTab === 'roi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Input Sliders Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-obsidian-900/90 border border-gold-500/30 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gold-400" />
                    Capital Growth Parameters
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded bg-gold-500/10 text-gold-300 border border-gold-500/20 font-medium">
                    Mirkhanpet & Maheshwaram
                  </span>
                </div>

                <div className="space-y-6 mt-6">
                  {/* Investment Amount */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="text-slate-300 font-medium uppercase tracking-wider">Initial Investment</label>
                      <span className="text-gold-400 font-bold text-base sm:text-lg">
                        {formatCurrency(investAmount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1000000"
                      max="20000000"
                      step="250000"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(Number(e.target.value))}
                      className="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>₹10 Lakhs (Plot 150 Sq.Yd)</span>
                      <span>₹50 Lakhs</span>
                      <span>₹1 Crore</span>
                      <span>₹2 Crores</span>
                    </div>

                    {/* Quick Budget Chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[1500000, 2500000, 3500000, 5000000, 10000000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setInvestAmount(amt)}
                          className={`text-[10px] px-2.5 py-1 rounded-md border transition-all ${
                            investAmount === amt
                              ? 'bg-gold-500 text-obsidian-950 font-bold border-gold-500'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:border-gold-500/40'
                          }`}
                        >
                          {formatCurrency(amt)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Holding Period */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="text-slate-300 font-medium uppercase tracking-wider">Investment Horizon</label>
                      <span className="text-gold-400 font-bold text-base sm:text-lg">{holdingYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={holdingYears}
                      onChange={(e) => setHoldingYears(Number(e.target.value))}
                      className="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>1 Year</span>
                      <span>3 Yrs (Skill Univ)</span>
                      <span>5 Yrs (Metro/RRR)</span>
                      <span>10 Yrs (Full City)</span>
                    </div>
                  </div>

                  {/* Projected Annual CAGR */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="text-slate-300 font-medium uppercase tracking-wider">
                        Projected Annual Growth (CAGR)
                      </label>
                      <span className="text-emerald-400 font-bold text-base sm:text-lg">{fourthCityCagr}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="40"
                      step="0.5"
                      value={fourthCityCagr}
                      onChange={(e) => setFourthCityCagr(Number(e.target.value))}
                      className="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <p className="text-[11px] text-slate-400 italic">
                      * Historical Shamshabad & Kokapet ORR land appreciation averaged 22-28% during initial infrastructure buildouts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Infrastructure Catalyst Note */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs space-y-1.5">
                <span className="font-bold text-gold-400 uppercase tracking-wider text-[10px] block">Key Catalysts:</span>
                <p className="text-slate-300">
                  • <strong>Amazon Data Center</strong> (₹5,809 Cr investment over 48+ acres)
                </p>
                <p className="text-slate-300">
                  • <strong>Young India Skill University</strong> (Operational phase)
                </p>
                <p className="text-slate-300">
                  • <strong>200ft & 330ft Connectivity</strong> directly linking to Rajiv Gandhi International Airport
                </p>
              </div>

            </div>

            {/* Results & Comparison Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-850 to-obsidian-950 border-2 border-gold-500/40 shadow-luxury flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold font-serif block">
                  Projected Valuation ({holdingYears} Years Horizon)
                </span>
                
                {/* Hero Total Return */}
                <div className="mt-3 p-6 rounded-2xl bg-gradient-to-r from-gold-500/20 via-gold-500/10 to-transparent border border-gold-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-slate-300 font-medium">Estimated Future Value</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      {roiCalculations.multiplierFourthCity}x Capital Multiplier
                    </span>
                  </div>
                  <div className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                    {formatCurrency(roiCalculations.futureFourthCity)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Estimated Capital Gain: <strong>+{formatCurrency(roiCalculations.gainFourthCity)}</strong></span>
                  </div>
                </div>

                {/* Benchmark Asset Class Comparison */}
                <div className="mt-6 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Comparison With Traditional Assets:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Fixed Deposit */}
                    <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/10 space-y-1">
                      <div className="flex justify-between items-center text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Landmark className="w-3.5 h-3.5 text-slate-400" />
                          Bank FD ({fdRate}%)
                        </span>
                        <span className="text-slate-300">{formatCurrency(roiCalculations.futureFd)}</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-slate-400 h-full rounded-full"
                          style={{ width: `${Math.min(100, (roiCalculations.futureFd / roiCalculations.futureFourthCity) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 block">Gain: +{formatCurrency(roiCalculations.gainFd)}</span>
                    </div>

                    {/* Mutual Funds */}
                    <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/10 space-y-1">
                      <div className="flex justify-between items-center text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                          Equity / MF ({mfRate}%)
                        </span>
                        <span className="text-slate-200">{formatCurrency(roiCalculations.futureMf)}</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-sky-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, (roiCalculations.futureMf / roiCalculations.futureFourthCity) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 block">Gain: +{formatCurrency(roiCalculations.gainMf)}</span>
                    </div>
                  </div>

                  {/* Alpha callout */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                    <span>Alpha Advantage Over Fixed Deposit:</span>
                    <strong className="text-sm font-bold text-white">+{formatCurrency(roiCalculations.extraOverFd)}</strong>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry({
                    notes: `Requested allocation analysis for Fourth City: Investment ${formatCurrency(investAmount)} for ${holdingYears} yrs at ${fourthCityCagr}% CAGR`
                  })}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Custom Investor Deck</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenSiteVisit && onOpenSiteVisit()}
                  className="py-3.5 px-5 rounded-xl border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Book Site Visit
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: HOME LOAN EMI CALCULATOR                                */}
        {/* ============================================================== */}
        {activeTab === 'emi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Input Sliders Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-obsidian-900/90 border border-gold-500/30 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-gold-400" />
                    Loan Repayment Parameters
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10 font-medium">
                    Standard Reducing Balance
                  </span>
                </div>

                <div className="space-y-6 mt-6">
                  {/* Loan Amount */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="text-slate-300 font-medium uppercase tracking-wider">Loan Principal</label>
                      <span className="text-gold-400 font-bold text-base sm:text-lg">
                        {formatCurrency(loanAmount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1000000"
                      max="50000000"
                      step="500000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>₹10 Lakhs</span>
                      <span>₹1 Crore</span>
                      <span>₹2.5 Crores</span>
                      <span>₹5 Crores</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {[3000000, 5000000, 7500000, 10000000, 20000000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setLoanAmount(amt)}
                          className={`text-[10px] px-2.5 py-1 rounded-md border transition-all ${
                            loanAmount === amt
                              ? 'bg-gold-500 text-obsidian-950 font-bold border-gold-500'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:border-gold-500/40'
                          }`}
                        >
                          {formatCurrency(amt)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="text-slate-300 font-medium uppercase tracking-wider">Annual Interest Rate</label>
                      <span className="text-gold-400 font-bold text-base sm:text-lg">{interestRate}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min="6.5"
                      max="15.0"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>6.5% (Prime)</span>
                      <span>8.5% (Current SBI/HDFC avg)</span>
                      <span>12.0%</span>
                      <span>15.0%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="text-slate-300 font-medium uppercase tracking-wider">Loan Tenure</label>
                      <span className="text-gold-400 font-bold text-base sm:text-lg">{tenureYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>5 Yrs</span>
                      <span>15 Yrs</span>
                      <span>20 Yrs</span>
                      <span>30 Yrs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Partnerships Badge */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-slate-300">
                  Pre-approved lending affiliations with <strong>SBI, HDFC Bank, ICICI Bank, and Axis Bank</strong> for Rajan Castle ventures.
                </p>
              </div>

            </div>

            {/* Results Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-850 to-obsidian-950 border-2 border-gold-500/40 shadow-luxury flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold font-serif block">
                  Loan Repayment Schedule
                </span>

                {/* Monthly EMI Hero */}
                <div className="mt-3 p-6 rounded-2xl bg-gradient-to-r from-gold-500/20 via-gold-500/10 to-transparent border border-gold-500/40 space-y-2">
                  <span className="text-xs uppercase tracking-wider text-slate-300 font-medium">Monthly Installment (EMI)</span>
                  <div className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                    ₹{emiCalculation.monthlyEmi.toLocaleString('en-IN')}<span className="text-sm font-sans font-normal text-slate-400">/mo</span>
                  </div>
                  <p className="text-xs text-slate-400 pt-1">
                    Applicable for a {tenureYears}-year tenure at {interestRate}% rate.
                  </p>
                </div>

                {/* Breakdown Progress Bar */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-gold-500 inline-block" />
                      Principal: {emiCalculation.principalPercent}%
                    </span>
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-slate-600 inline-block" />
                      Total Interest: {emiCalculation.interestPercent}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                    <div
                      className="bg-gold-500 h-full transition-all duration-500"
                      style={{ width: `${emiCalculation.principalPercent}%` }}
                    />
                    <div
                      className="bg-slate-600 h-full transition-all duration-500"
                      style={{ width: `${emiCalculation.interestPercent}%` }}
                    />
                  </div>

                  {/* Detailed Metric Cards */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/10 space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Interest Amount</span>
                      <span className="text-base sm:text-lg font-bold text-white">
                        {formatCurrency(emiCalculation.totalInterest)}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/10 space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Payment (P + I)</span>
                      <span className="text-base sm:text-lg font-bold text-gold-400">
                        {formatCurrency(emiCalculation.totalPayable)}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry({
                    notes: `Inquiring about home loan assistance: Loan Amount ${formatCurrency(loanAmount)} for ${tenureYears} yrs at ${interestRate}% (Estimated EMI: ₹${emiCalculation.monthlyEmi.toLocaleString('en-IN')})`
                  })}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply For Pre-Approved Loan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:+919090104949"
                  className="py-3.5 px-5 rounded-xl border border-white/20 text-white hover:text-gold-400 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center"
                >
                  Consult Banker
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
