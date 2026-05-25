import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  BatteryCharging,
  Bot,
  BrainCircuit,
  Camera,
  CalendarClock,
  ChartSpline,
  Cpu,
  Fan,
  Gauge,
  Home,
  Lamp,
  Layers3,
  Leaf,
  Lightbulb,
  Lock,
  Mic,
  MonitorCheck,
  PlugZap,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Siren,
  SlidersHorizontal,
  Sparkles,
  Thermometer,
  UserCog,
  UserRoundCheck,
  Wifi,
  Zap,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../lib/api';

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const deviceIcons = [
  { Icon: Thermometer, label: 'Thermostat', className: 'left-[4%] top-[18%]', delay: 0 },
  { Icon: Fan, label: 'Fan', className: 'right-[8%] top-[20%]', delay: 0.3 },
  { Icon: Lamp, label: 'Lamp', className: 'left-[9%] bottom-[22%]', delay: 0.6 },
  { Icon: Lock, label: 'Smart lock', className: 'right-[13%] bottom-[23%]', delay: 0.9 },
  { Icon: Camera, label: 'Camera', className: 'left-[24%] top-[9%]', delay: 1.2 },
  { Icon: Wifi, label: 'WiFi', className: 'right-[27%] top-[8%]', delay: 1.5 },
  { Icon: BrainCircuit, label: 'AI', className: 'left-[25%] bottom-[12%]', delay: 1.8 },
  { Icon: BatteryCharging, label: 'Energy', className: 'right-[28%] bottom-[10%]', delay: 2.1 },
];

// stats are loaded from the API via SectionStats

const coreFeatures = [
  {
    icon: UserRoundCheck,
    title: 'User Authentication & Household Setup',
    points: ['Register/Login system', 'Multiple rooms creation', 'Assign devices to rooms'],
  },
  {
    icon: MonitorCheck,
    title: 'Smart Device Dashboard',
    points: ['Control all devices', 'View live device states', 'Interactive device toggles'],
  },
  {
    icon: CalendarClock,
    title: 'Routine Scheduling System',
    points: ['Create automation schedules', 'Daily and weekly routines', 'Auto device management'],
  },
  {
    icon: ChartSpline,
    title: 'Simulated Energy Tracking',
    points: ['Track device usage', 'Show kWh consumption reports', 'Weekly energy analytics'],
  },
  {
    icon: ShieldAlert,
    title: 'Device Malfunction Alerts',
    points: ['Detect abnormal usage', 'Show warnings and notifications', 'Simulate device failures'],
  },
  {
    icon: PlugZap,
    title: 'Device Creation System',
    points: ['Users can create custom devices', 'Configure attributes dynamically'],
  },
  {
    icon: Radio,
    title: 'Device Connection Simulation',
    points: ['Connect/disconnect virtual devices', 'Real-time dashboard updates'],
  },
  {
    icon: Activity,
    title: 'Device Status Monitoring',
    points: ['Online / Offline / Standby / Malfunction states'],
  },
];

const advancedFeatures = [
  {
    icon: Bot,
    title: 'Usage Prediction AI',
    desc: 'The system analyzes simulated user behavior patterns and recommends automation routines based on repeated activities.',
  },
  {
    icon: Siren,
    title: 'Emergency Mode Simulation',
    desc: 'One-click emergency mode disables appliances, locks doors, and secures the virtual house.',
  },
  {
    icon: Mic,
    title: 'Voice Command Simulation',
    desc: 'Users can type commands like "Turn off all lights" to simulate AI voice-controlled automation.',
  },
  {
    icon: UserCog,
    title: 'Role-Based Device Management',
    desc: 'Different access levels for Admin, Guest, and Child users.',
  },
  {
    icon: Layers3,
    title: 'Device Group Automation',
    desc: 'Create smart groups like Morning Routine or Night Mode for collective actions.',
  },
  {
    icon: Leaf,
    title: 'Energy Efficiency Recommendations',
    desc: 'AI-generated suggestions to reduce unnecessary energy consumption.',
  },
];

const workflowSteps = [
  'Create Household',
  'Add Rooms',
  'Create Devices',
  'Connect Devices',
  'Configure Settings',
  'Automate Routines',
  'Monitor Usage',
  'Optimize Energy',
];

const techStack = [
  { name: 'React.js', icon: Cpu },
  { name: 'Tailwind CSS', icon: SlidersHorizontal },
  { name: 'Framer Motion', icon: Sparkles },
  { name: 'Vite', icon: Zap },
  { name: 'Node.js', icon: Gauge },
  { name: 'Express.js', icon: Radio },
  { name: 'MongoDB', icon: Layers3 },
  { name: 'JWT Authentication', icon: ShieldCheck },
];

const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-90px' }}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ eyebrow, title, highlight, children }) => (
  <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-blue/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-neon-blue shadow-[0_0_22px_rgba(0,243,255,0.12)] backdrop-blur-xl">
      <Sparkles className="h-4 w-4" />
      {eyebrow}
    </div>
    <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
      {title} <span className="neon-text-blue">{highlight}</span>
    </h2>
    {children && <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{children}</p>}
  </Reveal>
);

const SectionStats = () => {
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const s = await api.getStats();
        setStatsData(s);
      } catch (e) {
        console.warn('failed to load stats', e);
        setStatsData([]);
      }
    })();
  }, []);

  if (!statsData) {
    return (
      <motion.div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="group rounded-2xl border border-white/10 bg-black/20 p-5 text-center">Loading...</div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4"
    >
      {statsData.map((stat) => (
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -7, scale: 1.03 }}
          key={stat.label}
          className="group rounded-2xl border border-white/10 bg-black/20 p-5 text-center transition-all duration-300 hover:border-neon-blue/60 hover:shadow-[0_0_30px_rgba(0,243,255,0.22)]"
        >
          <div className="mb-2 text-3xl font-black text-white drop-shadow-[0_0_14px_rgba(0,243,255,0.5)] sm:text-4xl">{stat.value}</div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 transition-colors group-hover:text-cyan-100">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const GlowButton = ({ children, to, variant = 'primary' }) => {
  const shared =
    'group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 sm:px-8';
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-cyan-400 via-blue-600 to-fuchsia-600 text-white shadow-[0_0_28px_rgba(0,243,255,0.34)] hover:shadow-[0_0_42px_rgba(176,38,255,0.48)]'
      : 'border border-neon-blue/60 bg-black/20 text-neon-blue shadow-[inset_0_0_24px_rgba(0,243,255,0.08),0_0_18px_rgba(0,243,255,0.16)] hover:bg-neon-blue/10 hover:text-white';

  return (
    <Link to={to} className={`${shared} ${styles}`}>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
  );
};

const ParticleField = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: 34 }).map((_, index) => (
      <span
        key={index}
        className="about-particle absolute h-1 w-1 rounded-full bg-cyan-200/70 shadow-[0_0_14px_rgba(0,243,255,0.95)]"
        style={{
          left: `${(index * 29) % 100}%`,
          top: `${(index * 47) % 100}%`,
          animationDelay: `${index * 0.23}s`,
          animationDuration: `${7 + (index % 6)}s`,
        }}
      />
    ))}
  </div>
);

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -10, scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group relative min-h-[290px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-[1px] shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
    >
      <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(0,243,255,0.45),transparent_30%,rgba(176,38,255,0.4)_62%,transparent_82%)] opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"></div>
      <div className="relative h-full rounded-2xl bg-[#071225]/88 p-6">
        <motion.div
          className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, 22, 0], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 7 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative z-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-neon-blue/30 bg-neon-blue/10 text-neon-blue shadow-[0_0_26px_rgba(0,243,255,0.28)] transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:text-white">
            <Icon className="h-7 w-7" />
          </div>
          <h3 className="mb-4 text-xl font-bold leading-snug text-white">{feature.title}</h3>
          <ul className="space-y-3 text-sm leading-6 text-slate-300">
            {feature.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-blue shadow-[0_0_12px_rgba(0,243,255,0.9)]"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050b1e] text-white selection:bg-neon-blue/30">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(0,243,255,0.18),transparent_27%),radial-gradient(circle_at_88%_8%,rgba(176,38,255,0.18),transparent_28%),linear-gradient(180deg,#06112a_0%,#050817_45%,#08142b_100%)]"></div>
      <div className="fixed inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(0,243,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]"></div>
      <div className="fixed inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-cyan-400/10 to-transparent blur-3xl"></div>
      <ParticleField />

      <Navbar />

      <main>
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-20 pt-36 sm:px-6 lg:px-8">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[420px] w-[min(92vw,780px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_90deg,rgba(0,243,255,0.24),rgba(176,38,255,0.24),rgba(37,99,235,0.26),rgba(0,243,255,0.24))] blur-[90px]"
            animate={{ rotate: 360, scale: [1, 1.08, 1] }}
            transition={{ rotate: { duration: 22, repeat: Infinity, ease: 'linear' }, scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
          />

          <div className="absolute inset-x-0 top-24 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-neon-blue/70 to-transparent"></div>

          <div className="relative z-10 mx-auto max-w-6xl text-center">
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div
                variants={fadeUp}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-200 shadow-[0_0_34px_rgba(0,243,255,0.16)] backdrop-blur-xl"
              >
                <Home className="h-4 w-4 text-neon-blue" />
                SmartHome_Manager
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="mx-auto max-w-4xl text-4xl font-black leading-[1.05] tracking-normal text-white sm:text-5xl lg:text-7xl"
              >
                <span className="block">Redefining</span>
                <motion.span
                  animate={{ textShadow: ['0 0 18px rgba(0,243,255,.68)', '0 0 38px rgba(176,38,255,.52)', '0 0 18px rgba(0,243,255,.68)'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="neon-text-blue block"
                >
                  Smart Living
                </motion.span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg md:text-xl"
              >
                SmartHome_Manager is an intelligent home automation simulation platform that allows users to control,
                monitor, automate, and optimize virtual smart devices from a single dashboard.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <GlowButton to="/features">
                  Explore Features
                  <Sparkles className="h-5 w-5" />
                </GlowButton>
                <GlowButton to="/dashboard" variant="outline">
                  Launch Dashboard
                  <MonitorCheck className="h-5 w-5" />
                </GlowButton>
              </motion.div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {deviceIcons.map(({ Icon, label, className, delay }) => (
              <motion.div
                key={label}
                className={`absolute ${className}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, y: [0, -18, 0] }}
                transition={{
                  opacity: { duration: 0.7, delay },
                  scale: { duration: 0.7, delay },
                  y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay },
                }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-white/[0.055] text-neon-blue shadow-[0_0_34px_rgba(0,243,255,0.22)] backdrop-blur-xl">
                  <Icon className="h-8 w-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:p-8 lg:p-12">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
                <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-neon-purple/15 blur-[90px]"></div>
                <div className="absolute -bottom-36 -left-28 h-80 w-80 rounded-full bg-neon-blue/15 blur-[90px]"></div>
                <div className="relative z-10">
                  <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-neon-blue">About the project</p>
                      <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">About SmartHome_Manager</h2>
                    </div>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neon-blue/30 bg-cyan-400/10 text-neon-blue shadow-[0_0_35px_rgba(0,243,255,0.28)]">
                      <BrainCircuit className="h-8 w-8" />
                    </div>
                  </div>

                  <div className="grid gap-6 text-base leading-8 text-slate-300 lg:grid-cols-3">
                    <p>
                      SmartHome_Manager is a next-generation smart home simulation platform designed to provide users
                      with a realistic experience of managing and automating connected devices inside a virtual household
                      environment.
                    </p>
                    <p>
                      The platform allows users to create rooms, connect devices, configure automation routines, monitor
                      simulated energy usage, and interact with appliances through a centralized intelligent dashboard.
                    </p>
                    <p>
                      This project demonstrates how modern IoT ecosystems work by simulating device communication,
                      automation logic, monitoring systems, predictive behavior, and energy optimization.
                    </p>
                  </div>

                  <SectionStats />
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Core features" title="Built for a complete" highlight="smart-home simulation">
              Control, automate, monitor, and stress-test a connected household from one futuristic SaaS interface.
            </SectionHeader>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
            >
              {coreFeatures.map((feature, index) => (
                <FeatureCard feature={feature} index={index} key={feature.title} />
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="absolute inset-x-0 top-1/2 -z-10 h-80 bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent blur-3xl"></div>
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="Advanced intelligence" title="Automation that feels" highlight="predictive">
              A premium simulation layer for AI recommendations, emergency controls, roles, groups, and efficiency guidance.
            </SectionHeader>

            <div className="relative">
              <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-neon-blue/60 to-transparent md:left-1/2 md:block"></div>
              <div className="space-y-8">
                {advancedFeatures.map((item, index) => {
                  const Icon = item.icon;
                  const isRight = index % 2 === 1;

                  return (
                    <Reveal key={item.title}>
                      <div className={`relative grid gap-6 md:grid-cols-[1fr_72px_1fr] ${isRight ? '' : ''}`}>
                        <div className={`${isRight ? 'md:col-start-3' : 'md:col-start-1'} ${isRight ? '' : 'md:text-right'}`}>
                          <motion.article
                            whileHover={{ scale: 1.02 }}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition-all duration-300 hover:border-neon-blue/50 hover:shadow-[0_0_34px_rgba(0,243,255,0.18)]"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                            <div className="relative">
                              <h3 className="mb-3 text-2xl font-bold text-white">{item.title}</h3>
                              <p className="text-sm leading-7 text-slate-300 sm:text-base">{item.desc}</p>
                            </div>
                          </motion.article>
                        </div>
                        <div className="absolute left-0 top-2 hidden -translate-x-1/2 md:left-1/2 md:block">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-neon-blue/50 bg-[#071225] text-neon-blue shadow-[0_0_28px_rgba(0,243,255,0.32)]">
                            <Icon className="h-7 w-7" />
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="How it works" title="From empty house to" highlight="autonomous living">
              A smooth simulation flow that mirrors the way real smart-home ecosystems are assembled and optimized.
            </SectionHeader>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent lg:block"></div>
              {workflowSteps.map((step, index) => (
                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  key={step}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl transition-all duration-300 hover:border-neon-blue/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.18)]"
                >
                  <div className="relative z-10">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-neon-blue/40 bg-neon-blue/10 text-sm font-black text-neon-blue shadow-[0_0_22px_rgba(0,243,255,0.22)]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg font-bold text-white">{step}</h3>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute right-[-18px] top-1/2 z-20 hidden h-2 w-9 -translate-y-1/2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_16px_rgba(0,243,255,0.45)] lg:block"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Technology stack" title="Engineered with a" highlight="modern toolchain">
              Glowing, fast, modular technologies for a responsive simulation dashboard experience.
            </SectionHeader>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {techStack.map((tech, index) => {
                const Icon = tech.icon;

                return (
                  <motion.div
                    variants={fadeUp}
                    whileHover={{ rotate: index % 2 ? -1.8 : 1.8, y: -8, scale: 1.025 }}
                    key={tech.name}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-[1px] backdrop-blur-2xl"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(0,243,255,0.45),transparent,rgba(176,38,255,0.35),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    <div className="relative flex items-center gap-4 rounded-2xl bg-[#071225]/90 p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neon-blue/30 bg-neon-blue/10 text-neon-blue shadow-[0_0_22px_rgba(0,243,255,0.2)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-bold text-white">{tech.name}</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="relative px-4 py-24 sm:px-6 lg:px-8">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[min(94vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,243,255,0.16),rgba(176,38,255,0.12)_45%,transparent_70%)] blur-[70px]"></div>
          <Reveal className="mx-auto max-w-5xl text-center">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.052] p-8 shadow-[0_25px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-10 lg:p-14">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-neon-blue">Our Vision</p>
              <h2 className="mb-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">Our Vision</h2>
              <p className="mx-auto max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                We envision a future where intelligent homes anticipate user needs through automation, predictive
                intelligence, and seamless device communication.
              </p>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                SmartHome_Manager is designed to simulate the future of connected living by combining user-centric design,
                energy awareness, automation systems, and smart interaction experiences into one powerful platform.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-2xl border border-neon-blue/30 bg-gradient-to-br from-white/[0.08] via-cyan-400/[0.045] to-fuchsia-500/[0.08] p-8 text-center shadow-[0_0_60px_rgba(0,243,255,0.18),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:p-12 lg:p-16">
              <motion.div
                className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(0,243,255,0.16),transparent,rgba(176,38,255,0.16),transparent)]"
                animate={{ x: ['-45%', '45%', '-45%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-neon-blue/40 bg-neon-blue/10 text-neon-blue shadow-[0_0_38px_rgba(0,243,255,0.34)]"
                >
                  <Lightbulb className="h-8 w-8" />
                </motion.div>
                <h2 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-6xl">
                  Experience the Future of <span className="neon-text-blue">Smart Living</span>
                </h2>
                <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                  <GlowButton to="/">
                    Get Started
                    <Sparkles className="h-5 w-5" />
                  </GlowButton>
                  <GlowButton to="/dashboard" variant="outline">
                    View Dashboard
                    <MonitorCheck className="h-5 w-5" />
                  </GlowButton>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
