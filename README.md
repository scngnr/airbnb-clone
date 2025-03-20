# Airbnb Clone

[🇹🇷 Türkçe](#türkçe) | [🇬🇧 English](#english)

# English

A modern web application that replicates core Airbnb functionality, built with Next.js 15 and TypeScript.

## 🚀 Features

- Modern and responsive UI using Tailwind CSS
- Server-side rendering with Next.js
- TypeScript for type safety
- Component-based architecture
- Responsive navigation system
- User authentication with NextAuth (GitHub & Google OAuth)
- Interactive search functionality with filters
- Mobile-first design approach
- Multi-language support (English & Turkish)
- Property listing management
- Interactive map integration with location search
- Favorite listings system
- Image upload with Cloudinary
- Reservation system
- Category-based filtering
- Toast notifications for user feedback

## 🛠️ Tech Stack

- **Framework:** Next.js 15.1.7
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Form Handling:** React Hook Form
- **HTTP Client:** Axios
- **Icons:** React Icons
- **UI Components:** Custom-built components
- **Font:** Nunito (Google Fonts)
- **Toast Notifications:** React Hot Toast

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```env
# Database Configuration
DATABASE_URL="your-database-connection-string"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"

# GitHub OAuth
GITHUB_ID="your-github-oauth-app-id"
GITHUB_SECRET="your-github-oauth-app-secret"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-cloudinary-api-key"
NEXT_PUBLIC_CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Next Auth Configuration
NEXTAUTH_URL="http://localhost:3000"
```

To set up OAuth and Cloudinary:
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth application
3. Set Homepage URL to `http://localhost:3000`
4. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
5. Copy the Client ID and Client Secret to your `.env` file

6. Go to Google Cloud Console
7. Create a new project or select an existing one
8. Enable Google OAuth API
9. Configure OAuth consent screen
10. Create OAuth 2.0 credentials
11. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
12. Copy the Client ID and Client Secret to your `.env` file

13. Create a Cloudinary account at https://cloudinary.com
14. Go to your Cloudinary Dashboard
15. Copy your Cloud Name, API Key, and API Secret to your `.env` file

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
/
├── pages/               # Pages directory for API routes
│   └── api/             # API endpoints
├── prisma/              # Prisma ORM configuration
│   └── schema.prisma    # Database schema
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # Reusable UI components
│   │   ├── Inputs/    # Form input components
│   │   ├── Navbar/    # Navigation components
│   │   ├── modals/    # Modal components
│   │   └── ui/        # Basic UI components
│   ├── hooks/         # Custom React hooks
│   └── libs/          # Utility libraries
├── public/            # Static files
│   └── images/        # Image assets
└── package.json       # Project dependencies
```

## 🔧 Development

- The application uses the Next.js App Router for routing
- Styling is done using Tailwind CSS utility classes
- State management is handled with Zustand
- Form validation and handling with React Hook Form
- Toast notifications using React Hot Toast

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Hook Form Documentation](https://react-hook-form.com/)

---

# Türkçe

Next.js 15 ve TypeScript ile geliştirilmiş, Airbnb'nin temel işlevselliğini yeniden oluşturan modern bir web uygulaması.

## 🚀 Özellikler

- Tailwind CSS kullanarak modern ve duyarlı kullanıcı arayüzü
- Next.js ile sunucu tarafında işleme
- TypeScript ile tip güvenliği
- Bileşen tabanlı mimari
- Duyarlı gezinme sistemi
- NextAuth ile kullanıcı kimlik doğrulama (GitHub ve Google OAuth)
- Filtreli etkileşimli arama işlevselliği
- Önce mobil tasarım yaklaşımı
- Çoklu dil desteği (İngilizce ve Türkçe)
- İlan yönetim sistemi
- Konum aramalı etkileşimli harita entegrasyonu
- Favori ilanlar sistemi
- Cloudinary ile resim yükleme
- Rezervasyon sistemi
- Kategori bazlı filtreleme
- Kullanıcı bildirimleri için toast mesajları

## 🛠️ Teknoloji Stack

- **Framework:** Next.js 15.1.7
- **Programlama Dili:** TypeScript
- **Stil:** Tailwind CSS
- **Durum Yönetimi:** Zustand
- **Form İşleme:** React Hook Form
- **HTTP İstemcisi:** Axios
- **İkonlar:** React Icons
- **UI Bileşenleri:** Özel yapılmış bileşenler
- **Yazı Tipi:** Nunito (Google Fonts)
- **Bildirimler:** React Hot Toast

## 🏃‍♂️ Başlangıç

### Ön Koşullar

- Node.js (En son LTS sürümü önerilir)
- npm veya yarn paket yöneticisi
- Git

### Kurulum

1. Depoyu klonlayın:
```bash
git clone [depo-url'niz]
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Kök dizinde bir `.env` dosyası oluşturun ve gerekli ortam değişkenlerini ekleyin:
```env
# Veritabanı Yapılandırması
DATABASE_URL="veritabanı-bağlantı-dizginiz"

# Kimlik Doğrulama
NEXTAUTH_SECRET="nextauth-gizli-anahtarınız"

# GitHub OAuth
GITHUB_ID="github-oauth-uygulama-id'niz"
GITHUB_SECRET="github-oauth-uygulama-gizli-anahtarınız"

# Google OAuth
GOOGLE_CLIENT_ID="google-oauth-istemci-id'niz"
GOOGLE_CLIENT_SECRET="google-oauth-istemci-gizli-anahtarınız"

# Cloudinary Yapılandırması
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="cloudinary-bulut-adınız"
NEXT_PUBLIC_CLOUDINARY_API_KEY="cloudinary-api-anahtarınız"
NEXT_PUBLIC_CLOUDINARY_API_SECRET="cloudinary-api-gizli-anahtarınız"

# Next Auth Yapılandırması
NEXTAUTH_URL="http://localhost:3000"
```

GitHub OAuth kurulumu için:
1. GitHub Ayarlar > Geliştirici ayarları > OAuth Uygulamaları'na gidin
2. Yeni bir OAuth uygulaması oluşturun
3. Ana sayfa URL'sini `http://localhost:3000` olarak ayarlayın
4. Yetkilendirme callback URL'sini `http://localhost:3000/api/auth/callback/github` olarak ayarlayın
5. İstemci ID ve İstemci Gizli Anahtarını `.env` dosyanıza kopyalayın

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak sonucu görebilirsiniz.

## 📁 Proje Yapısı

```
/
├── pages/               # API rotaları için sayfalar dizini
│   └── api/             # API uç noktaları
├── prisma/              # Prisma ORM yapılandırması
│   └── schema.prisma    # Veritabanı şeması
├── src/
│   ├── app/            # Next.js uygulama dizini
│   ├── components/     # Yeniden kullanılabilir UI bileşenleri
│   │   ├── Inputs/    # Form giriş bileşenleri
│   │   ├── Navbar/    # Gezinme bileşenleri
│   │   ├── modals/    # Modal bileşenleri
│   │   └── ui/        # Temel UI bileşenleri
│   ├── hooks/         # Özel React hooks
│   └── providers/       # Context sağlayıcıları
├── public/              # Statik dosyalar
│   └── images/          # Görsel varlıklar
└── package.json         # Proje bağımlılıkları
```

## 🔧 Geliştirme

- Uygulama, yönlendirme için Next.js App Router kullanır
- Stillendirme Tailwind CSS utility sınıfları ile yapılır
- Durum yönetimi Zustand ile sağlanır
- Form doğrulama ve işleme React Hook Form ile yapılır
- Bildirimler React Hot Toast kullanılarak gösterilir

## 🚀 Dağıtım

Next.js uygulamanızı dağıtmanın en kolay yolu, Next.js'in yaratıcıları tarafından geliştirilen [Vercel Platform](https://vercel.com/new)'u kullanmaktır.

Daha fazla detay için [Next.js dağıtım dokümantasyonu](https://nextjs.org/docs/app/building-your-application/deploying)'nu inceleyebilirsiniz.

## 📚 Daha Fazla Bilgi

Projede kullanılan teknolojiler hakkında daha fazla bilgi edinmek için:

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [TypeScript Dokümantasyonu](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Dokümantasyonu](https://tailwindcss.com/docs)
- [Zustand Dokümantasyonu](https://github.com/pmndrs/zustand)
- [React Hook Form Dokümantasyonu](https://react-hook-form.com/)
