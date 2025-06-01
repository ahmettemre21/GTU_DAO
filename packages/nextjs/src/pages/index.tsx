import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  UserGroupIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Şeffaf Oylama',
    description: 'Blockchain tabanlı şeffaf ve güvenli oylama sistemi',
    icon: CheckBadgeIcon,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Teklifler',
    description: 'Topluluk önerilerini paylaş ve oylamaya sun',
    icon: DocumentTextIcon,
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Topluluk',
    description: 'Binlerce GTU öğrencisi ve mezunuyla bağlan',
    icon: UserGroupIcon,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Güvenlik',
    description: 'World ID ile kimlik doğrulama ve güvenlik',
    icon: ShieldCheckIcon,
    color: 'from-green-500 to-cyan-500'
  }
];

const stats = [
  { label: 'Toplam Üye', value: '1,247' },
  { label: 'Aktif Teklifler', value: '23' },
  { label: 'Toplam Oy', value: '8,942' },
  { label: 'STAT Token', value: '₹ 2.47' }
];

export default function Home() {
  return (
    <Layout title="GTU DAO - Ana Sayfa">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">GTU DAO</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Gebze Teknik Üniversitesi'nin merkezi olmayan özerk organizasyonu. 
              Blockchain teknolojisiyle demokratik karar alma.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/dashboard" className="btn-primary">
              <RocketLaunchIcon className="w-5 h-5 mr-2 inline" />
              Dashboard'a Git
            </Link>
            <Link href="/proposals" className="btn-secondary">
              <DocumentTextIcon className="w-5 h-5 mr-2 inline" />
              Teklifleri İncele
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="stats-card text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Neden GTU DAO?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Blockchain teknolojisiyle güçlendirilmiş demokratik yönetim sistemi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Basit 3 adımda DAO'ya katıl ve oy vermeye başla
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Cüzdan Bağla
              </h3>
              <p className="text-gray-400">
                MetaMask veya desteklenen herhangi bir cüzdan ile bağlan
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                KYC Tamamla
              </h3>
              <p className="text-gray-400">
                World ID ile kimliğini doğrula ve STAT token kazan
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Oy Ver
              </h3>
              <p className="text-gray-400">
                Teklifleri incele ve oy vererek DAO'nun geleceğini şekillendir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Geleceği Birlikte Şekillendirelim
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            GTU DAO'ya katıl ve üniversitemizin geleceğini etkileyen kararlarda söz sahibi ol. 
            Her oy, her teklif önemli.
          </p>
          <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
            <RocketLaunchIcon className="w-6 h-6 mr-2 inline" />
            Hemen Başla
          </Link>
        </div>
      </section>
    </Layout>
  );
} 