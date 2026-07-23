import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowUpLeft, BatteryCharging, BookOpen, Building2, Check,
  ChevronDown, CircleUserRound, DraftingCompass, Factory, Gauge, GraduationCap,
  Headphones, House, Leaf, MapPin, Menu, MessageCircle, Microscope, PackageCheck,
  Phone, Play, Search, ShieldCheck, ShoppingBag, Sparkles, Sun, X, Zap
} from 'lucide-react';
import '@fontsource-variable/vazirmatn';
import './styles.css';
import robotSun from './assets/robot/robot-pose-0.webp';
import robotGuide from './assets/robot/robot-pose-3.webp';
import storeScience from './assets/store/science.webp';
import solarBanner from './assets/banners/solar-banner.webp';
import nanoBanner from './assets/banners/nano-banner.webp';
import plasmaBanner from './assets/banners/plasma-banner.webp';
import storageBanner from './assets/banners/storage-banner.webp';
import academyWorkshop from './assets/banners/academy-workshop.webp';
import heroEnergyCampus from './assets/banners/hero-energy-campus.webp';
import panelProduct from './assets/products/panel-hi-mo.webp';
import inverterProduct from './assets/products/inverter-50kw.webp';
import batteryProduct from './assets/products/battery-us5000.webp';
import multiplusProduct from './assets/products/multiplus-5000.webp';
import upsProduct from './assets/products/ups-5kva.webp';
import campaignHomePackage from './assets/campaigns/home-package.webp';
import campaignHomeBusiness from './assets/campaigns/home-business.webp';
import campaignIndustrial from './assets/campaigns/industrial.webp';
import campaignSolarLighting from './assets/campaigns/solar-lighting.webp';
import campaignBatteryInverter from './assets/campaigns/battery-inverter.webp';
import aronageLogo from './assets/brand/aronage-logo.svg';
import solarEngineering from './assets/about/solar-engineering.js';
import cleanDataCenter from './assets/about/clean-data-center.js';
import energyRdTeam from './assets/about/energy-rd-team.js';

const companyActivities = [
  [Sun,'نیروگاه خورشیدی','طراحی، تأمین تجهیزات و اجرای پروژه در مقیاس‌های مختلف'],
  [Gauge,'امکان‌سنجی سرمایه‌گذاری','مشاوره فنی و اقتصادی پروژه‌های انرژی سبز'],
  [Building2,'فارم رمز ارز پاک','راه‌اندازی مراکز پردازش داده با انرژی تجدیدپذیر'],
  [Factory,'مدیریت و بهره‌برداری','راه‌اندازی، پایش و مدیریت پروژه‌های انرژی پاک'],
  [Microscope,'تحقیق و توسعه','توسعه راهکارهای نوین تولید و بهره‌وری انرژی'],
];

const homeCampaigns = [
  {image:campaignHomePackage,alt:'پکیج کامل برق خورشیدی خانگی',action:'shop'},
  {image:campaignHomeBusiness,alt:'انرژی خورشیدی برای خانه و کسب‌وکار',action:'shop'},
  {image:campaignIndustrial,alt:'راهکارهای خورشیدی صنعتی و تجاری',action:'consult'},
  {image:campaignSolarLighting,alt:'روشنایی خورشیدی برای فضای باز',action:'shop'},
  {image:campaignBatteryInverter,alt:'باتری و اینورترهای حرفه‌ای خورشیدی',action:'shop'},
];

const storeProducts = [
  {id:'longi-hi-mo-7',brand:'LONGi',name:'پنل خورشیدی Hi-MO 7',category:'panel',categoryLabel:'پنل خورشیدی',image:panelProduct,badge:'نیروگاهی',short:'ماژول دوطرفه نسل جدید برای نیروگاه‌های مقیاس بزرگ و پروژه‌های صنعتی.',description:'Hi-MO 7 یک ماژول خورشیدی پربازده برای پروژه‌های نیروگاهی است که با توان نامی تا ۶۱۰ وات، راندمان ماژول تا ۲۲.۶٪ و ساختار دوطرفه طراحی شده است. ضریب دمای توان مناسب و گارانتی خطی بلندمدت، آن را برای اقلیم‌های گرم و پروژه‌های سرمایه‌گذاری مناسب می‌کند.',specs:[['توان نامی','تا ۶۱۰ وات'],['راندمان ماژول','تا ۲۲.۶٪'],['نسبت دوطرفه','حدود ۸۰٪'],['ابعاد','۲۲۷۸ × ۱۱۳۴ × ۳۰ میلی‌متر'],['گارانتی توان','۳۰ سال'],['درجه حفاظت جعبه اتصال','IP68']],features:['مناسب نیروگاه‌های صنعتی و مقیاس بزرگ','ضریب دمای توان ‎-0.28%/°C','کاهش هزینه BOS پروژه','تحمل بار جلویی تا ۵۴۰۰ پاسکال'],source:'https://www.longi.com/en/products/modules/hi-mo-7/'},
  {id:'sungrow-sg50cx-p2',brand:'Sungrow',name:'اینورتر SG50CX-P2',category:'inverter',categoryLabel:'اینورتر صنعتی',image:inverterProduct,badge:'۵۰ کیلووات',short:'اینورتر رشته‌ای سه‌فاز برای نیروگاه‌های تجاری و صنعتی.',description:'SG50CX-P2 یک اینورتر رشته‌ای سه‌فاز برای پروژه‌های تجاری و صنعتی است. پشتیبانی از ماژول‌های توان‌بالا، بهینه‌سازی سایه، تشخیص هوشمند منحنی IV و حفاظت‌های کامل، نگهداری نیروگاه را ساده‌تر می‌کند.',specs:[['توان خروجی نامی','۳۶ تا ۵۰ کیلووات'],['حداکثر ولتاژ ورودی PV','۱۱۰۰ ولت'],['حداکثر راندمان','۹۸.۵٪'],['ولتاژ AC نامی','۴۰۰ ولت'],['درجه حفاظت','IP66'],['حفاظت خوردگی','C5']],features:['سازگار با ماژول‌های بالاتر از ۵۰۰ وات','بهینه‌سازی پویا در سایه','بازیابی داخلی PID','پشتیبانی از AFCI 2.0'],source:'https://www.sungrowpower.com/en/products/string-inverter/b-sg36-40-50cx-p2'},
  {id:'pylontech-us5000',brand:'Pylontech',name:'باتری لیتیومی US5000',category:'battery',categoryLabel:'ذخیره‌ساز انرژی',image:batteryProduct,badge:'۴.۸ kWh',short:'باتری ۴۸ ولت LiFePO₄ با معماری ماژولار برای سیستم‌های خورشیدی.',description:'US5000 یک باتری لیتیوم‌آهن‌فسفات ۴۸ ولت با ظرفیت ۴.۸ کیلووات‌ساعت است. طراحی ماژولار امکان افزایش ظرفیت را فراهم می‌کند و برای سیستم‌های خانگی، تجاری، هیبریدی و برق پشتیبان مناسب است.',specs:[['فناوری سلول','LiFePO₄'],['ولتاژ نامی','۴۸ ولت'],['ظرفیت انرژی','۴.۸ کیلووات‌ساعت'],['ساختار','ماژولار و قابل توسعه'],['مدیریت باتری','BMS داخلی'],['کاربری','خانگی و تجاری']],features:['عمر چرخه‌ای بالا','قابلیت اتصال موازی چند ماژول','حفاظت در برابر شارژ و دشارژ بیش‌ازحد','مناسب سیستم‌های هیبریدی و آف‌گرید'],source:'https://en.pylontech.com.cn/products/us5000'},
  {id:'victron-multiplus-ii-5000',brand:'Victron Energy',name:'MultiPlus-II 48/5000',category:'inverter',categoryLabel:'اینورتر/شارژر',image:multiplusProduct,badge:'۵۰۰۰ VA',short:'اینورتر و شارژر چندمنظوره برای ESS، آف‌گرید و برق پشتیبان.',description:'MultiPlus-II یک اینورتر/شارژر چندمنظوره با دو خروجی AC است. فناوری PowerAssist در زمان اوج مصرف توان باتری را به شبکه یا ژنراتور اضافه می‌کند و در قطع برق، بارهای حساس را در کمتر از ۲۰ میلی‌ثانیه تحویل می‌گیرد.',specs:[['ولتاژ باتری','۴۸ ولت'],['توان نامی','۵۰۰۰ ولت‌آمپر'],['خروجی AC','دو خروجی'],['زمان انتقال UPS','کمتر از ۲۰ میلی‌ثانیه'],['توسعه سیستم','موازی و سه‌فاز'],['کاربری','ESS و آف‌گرید']],features:['PowerControl و PowerAssist','شارژ تطبیقی باتری','پشتیبانی از مانیتورینگ VRM','قابلیت کار موازی و سه‌فاز'],source:'https://www.victronenergy.com/inverters-chargers/multiplus-ii'},
  {id:'apc-srv5kl-in',brand:'APC by Schneider',name:'Easy UPS SRV5KL-IN',category:'ups',categoryLabel:'یوپی‌اس آنلاین',image:upsProduct,badge:'۵ kVA / ۵ kW',short:'یوپی‌اس آنلاین دابل‌کانورژن برای سرور، شبکه و بارهای حساس.',description:'Easy UPS SRV5KL-IN یک UPS آنلاین با موج سینوسی خالص و توان ۵ کیلوولت‌آمپر/۵ کیلووات است. نمایشگر LCD، حالت ECO و امکان اتصال باتری خارجی، آن را برای تجهیزات حساس و زمان پشتیبانی طولانی مناسب می‌کند.',specs:[['توان ظاهری','۵ کیلوولت‌آمپر'],['توان واقعی','۵ کیلووات'],['ولتاژ خروجی','۲۳۰ ولت'],['توپولوژی','آنلاین دابل‌کانورژن'],['شکل موج','سینوسی خالص'],['نصب','Tower']],features:['نمایشگر LCD وضعیت UPS','حالت کم‌مصرف ECO','امکان اتصال تا ۴ پک باتری خارجی','درگاه کارت مدیریت هوشمند'],source:'https://www.apc.com/in/en/product/SRV5KL-IN/'},
  {id:'graphene-799084',brand:'Sigma-Aldrich',name:'پودر Graphene Nanoplatelets 799084',category:'nano',categoryLabel:'نانومواد',image:nanoBanner,badge:'۵–۷ لایه',short:'نانوصفحات گرافن برای کامپوزیت، پوشش رسانا و ذخیره‌سازی انرژی.',description:'محصول 799084 یک پودر نانوصفحات گرافن با میانگین ۵ تا ۷ لایه اتمی است. این ماده برای توسعه نانوکامپوزیت‌ها، پوشش‌ها و جوهرهای رسانا و پژوهش‌های ذخیره‌سازی انرژی عرضه می‌شود.',specs:[['فرم','پودر'],['میانگین تعداد لایه','۵ تا ۷ لایه'],['فرمول تجربی','C'],['شماره CAS','7782-42-5'],['مقاومت ورقه‌ای','۱۰ ± ۵ اهم بر مربع'],['کد محصول','799084']],features:['مناسب نانوکامپوزیت‌ها','کاربرد در پوشش رسانا','قابل استفاده در جوهر رسانا','مناسب پژوهش ذخیره‌سازی انرژی'],source:'https://www.sigmaaldrich.com/US/en/product/aldrich/799084'},
  {id:'tergeo-pro',brand:'PIE Scientific',name:'سیستم پلاسما Tergeo-Pro',category:'plasma',categoryLabel:'دستگاه پلاسما',image:plasmaBanner,badge:'Tabletop',short:'سامانه رومیزی تمیزکاری، اچینگ و فعال‌سازی سطح با پلاسما.',description:'Tergeo-Pro یک سامانه پلاسما رومیزی برای تحقیق‌وتوسعه و تولید کم‌تیراژ است. کنترل خودکار گاز و خلأ، حالت مستقیم و downstream و تنظیم دقیق توان، امکان فرایندهای تمیزکاری، فعال‌سازی سطح و اچینگ را فراهم می‌کند.',specs:[['نوع سیستم','پلاسمای رومیزی'],['فرایندها','Cleaning / Etching / Ashing'],['کنترل فرایند','خودکار و Recipe-based'],['منابع پلاسما','Direct و Downstream'],['حالت توان','پیوسته و پالسی'],['گازهای فرایندی','O₂، Ar، N₂ و سایر گازها']],features:['کنترل جریان گاز با MFC','سنسور شدت پلاسما','مناسب مواد حساس و گرافن','کاربرد در میکروفابریکیشن و علوم مواد'],source:'https://piescientific.com/product-tabletop-plasma-cleaner/'},
  {id:'sigma-plasma-z561673',brand:'Sigma-Aldrich',name:'پلاسما کلینر رومیزی Z561673',category:'plasma',categoryLabel:'تجهیزات آزمایشگاهی',image:storeScience,badge:'آزمایشگاهی',short:'دستگاه پایه رومیزی برای تمیزکاری، آماده‌سازی و اصلاح سطح.',description:'پلاسما کلینر Z561673 یک دستگاه رومیزی آزمایشگاهی برای تمیزکاری، آماده‌سازی و اصلاح سطح نمونه‌هاست. این مدل برای آزمایشگاه‌های مواد، پوشش و آماده‌سازی سطح گزینه‌ای جمع‌وجور محسوب می‌شود.',specs:[['نوع','Tabletop Plasma Cleaner'],['کاربری','تمیزکاری و آماده‌سازی سطح'],['ورودی برق','۱۱۰ ولت AC'],['ساختار محفظه','Pyrex'],['کد محصول','Z561673'],['تأمین‌کننده','Sigma-Aldrich']],features:['ابعاد مناسب آزمایشگاه','قابل استفاده برای اصلاح سطح','کاربری پژوهشی و توسعه مواد','راهکار پایه برای فرایند پلاسما'],source:'https://www.sigmaaldrich.com/US/en/product/aldrich/z561673'},
];

const storeCategories=[['all','همه محصولات'],['panel','پنل خورشیدی'],['inverter','اینورتر'],['battery','باتری'],['ups','یوپی‌اس'],['nano','نانومواد'],['plasma','پلاسما']];
const navigateTo=path=>{window.location.hash=path;window.scrollTo({top:0,behavior:'smooth'})};
const phoneHref='tel:+989126193984';
const whatsappHref='https://wa.me/989126193984';
const onCardKey=(event,action)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();action()}};

function BrandLogo({light=false}){
  return <span className={`brand-logo ${light?'light':''}`} style={{'--brand-logo':`url(${aronageLogo})`}} role="img" aria-label="آروناژ انرژی"/>
}

function Button({children, secondary=false, onClick, className='', type='button'}) {
  return <button type={type} onClick={onClick} className={`btn ${secondary?'btn-secondary':''} ${className}`}>{children}</button>
}

function SceneRobot({image, className='', alt='رایا، راهنمای هوشمند انرژی', children, priority=false}){
  const ref=useRef(null);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    const observer=new IntersectionObserver(([entry])=>entry.isIntersecting&&node.classList.add('in-view'),{threshold:.28});
    observer.observe(node);
    return()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`scene-robot ${className}`}>
    <div className="scene-robot-glow"/>
    <img src={image} alt={alt} loading={priority?'eager':'lazy'} decoding="async"/>
    {children&&<div className="scene-robot-copy">{children}</div>}
  </div>
}

function StoreHeader(){const[open,setOpen]=useState(false);return <header className="store-header scrolled"><button className="brand brand-with-logo" onClick={()=>navigateTo('/')} aria-label="بازگشت به صفحه اصلی آروناژ"><BrandLogo/></button><nav className={open?'open':''} aria-label="منوی فروشگاه"><button onClick={()=>navigateTo('/')}>صفحه اصلی</button><button onClick={()=>navigateTo('/shop')}>محصولات</button><a href={phoneHref}>مشاوره خرید</a></nav><div className="head-actions"><a className="btn" href={phoneHref}>تماس بگیرید <ArrowUpLeft size={18}/></a><button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="منوی فروشگاه" aria-expanded={open}>{open?<X/>:<Menu/>}</button></div></header>}

function StoreFooter(){return <footer className="store-footer"><div className="footer-main"><button className="brand brand-with-logo" onClick={()=>navigateTo('/')} aria-label="صفحه اصلی آروناژ"><BrandLogo light/></button><p>تأمین تخصصی تجهیزات انرژی خورشیدی و ذخیره‌سازی همراه با مشاوره مهندسی آروناژ انرژی.</p><div className="footer-links"><span>فروشگاه</span><button onClick={()=>navigateTo('/shop')}>همه محصولات</button><a href={phoneHref}>استعلام قیمت</a></div></div><div className="copyright"><span>© ۱۴۰۵ آروناژ انرژی</span><span>قیمت محصولات پس از استعلام موجودی اعلام می‌شود.</span></div></footer>}

function ProductArtwork({product,compact=false}){return <div className={`store-artwork ${product.category} ${compact?'compact':''}`}><span className="art-orbit"/><img src={product.image} alt={product.name} loading="lazy" decoding="async"/><small>{product.brand}</small></div>}

function ProductCard({product}){const open=()=>navigateTo(`/product/${product.id}`);return <article className="real-product-card" role="link" tabIndex="0" onKeyDown={e=>onCardKey(e,open)} onClick={open}><ProductArtwork product={product} compact/><div className="real-product-info"><div><span>{product.categoryLabel}</span><b>{product.badge}</b></div><small>{product.brand}</small><h3>{product.name}</h3><p>{product.short}</p><div className="card-price"><strong>تماس بگیرید</strong><span className="card-arrow" aria-hidden="true"><ArrowUpLeft/></span></div></div></article>}

function DealCard({product,index}){const open=()=>navigateTo(`/product/${product.id}`);return <article className="deal-card" role="link" tabIndex="0" onKeyDown={e=>onCardKey(e,open)} onClick={open}><span className="deal-badge">پیشنهاد {(index+1).toLocaleString('fa-IR',{minimumIntegerDigits:2})}</span><div className={`deal-image ${product.category}`}><img src={product.image} alt={product.name} loading="lazy" decoding="async"/></div><small>{product.brand}</small><h3>{product.name}</h3><div><strong>تماس بگیرید</strong><span>مشاهده <ArrowUpLeft/></span></div></article>}

function CampaignSlider({onConsult}){const[active,setActive]=useState(0);const[paused,setPaused]=useState(false);useEffect(()=>{if(paused)return;const timer=window.setInterval(()=>setActive(current=>(current+1)%homeCampaigns.length),5200);return()=>window.clearInterval(timer)},[paused]);const select=index=>setActive((index+homeCampaigns.length)%homeCampaigns.length);const openCampaign=()=>homeCampaigns[active].action==='consult'?onConsult():navigateTo('/shop');return <div className="campaign-slider" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={event=>!event.currentTarget.contains(event.relatedTarget)&&setPaused(false)}><button className="campaign-frame" onClick={openCampaign} aria-label={`باز کردن ${homeCampaigns[active].alt}`}><img key={homeCampaigns[active].image} src={homeCampaigns[active].image} alt={homeCampaigns[active].alt}/></button><button className="campaign-arrow previous" onClick={()=>select(active-1)} aria-label="بنر قبلی"><ArrowLeft/></button><button className="campaign-arrow next" onClick={()=>select(active+1)} aria-label="بنر بعدی"><ArrowLeft/></button><div className="campaign-dots" aria-label="انتخاب بنر">{homeCampaigns.map((campaign,index)=><button key={campaign.image} className={index===active?'active':''} onClick={()=>select(index)} aria-label={`بنر ${index+1}: ${campaign.alt}`}/>)}</div></div>}

function ShopPage(){const[category,setCategory]=useState('all');const[query,setQuery]=useState('');const chooseCategory=value=>{setCategory(value);document.querySelector('.store-catalog')?.scrollIntoView({behavior:'smooth'})};const filtered=storeProducts.filter(p=>(category==='all'||p.category===category)&&`${p.name} ${p.brand} ${p.categoryLabel}`.toLowerCase().includes(query.toLowerCase()));const Promo=({value,className,image,children})=>{const open=()=>chooseCategory(value);return <article className={`promo-card ${className}`} style={{'--promo-image':`url(${image})`}} role="button" tabIndex="0" onKeyDown={e=>onCardKey(e,open)} onClick={open}>{children}</article>};return <div className="store-page"><StoreHeader/><main><section className="store-hero" style={{'--store-hero-image':`url(${solarBanner})`}}><div className="store-hero-grid"/><div><small>فروشگاه تخصصی آروناژ</small><h1>تجهیزات معتبر،<br/><em>انتخاب مهندسی‌شده.</em></h1><p>مجموعه‌ای از محصولات واقعی و تخصصی برای انرژی خورشیدی، برق پشتیبان، نانومواد و فناوری پلاسما.</p><button className="store-hero-cta" onClick={()=>chooseCategory('panel')}>مشاهده تجهیزات خورشیدی <ArrowLeft/></button></div><div className="store-hero-numbers"><span><b>{storeProducts.length.toLocaleString('fa-IR')}</b><small>محصول منتخب</small></span><span><b>۷</b><small>دسته تخصصی</small></span></div></section><section className="store-promos" aria-label="دسته‌های ویژه فروشگاه"><Promo value="panel" className="solar" image={solarBanner}><span>راهکارهای پربازده</span><h2>پنل و تجهیزات<br/>خورشیدی</h2><span className="promo-link">مشاهده محصولات <ArrowUpLeft/></span></Promo><Promo value="battery" className="storage" image={storageBanner}><span>برق پایدار، شب و روز</span><h2>باتری، اینورتر<br/>و UPS</h2><span className="promo-link">مشاهده محصولات <ArrowUpLeft/></span></Promo><Promo value="plasma" className="science" image={plasmaBanner}><span>فناوری برای صنعت</span><h2>نانو و تجهیزات<br/>پلاسما</h2><span className="promo-link">مشاهده محصولات <ArrowUpLeft/></span></Promo></section><section className="store-catalog"><div className="catalog-tools"><label className="store-search"><Search/><span className="sr-only">جست‌وجوی محصولات</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="جست‌وجوی نام، برند یا دسته محصول..."/></label><div className="category-tabs">{storeCategories.map(([v,t])=><button key={v} className={category===v?'active':''} onClick={()=>setCategory(v)}>{t}</button>)}</div></div><div className="catalog-result"><span>{filtered.length.toLocaleString('fa-IR')} محصول</span><small>برای دریافت قیمت روز و موجودی تماس بگیرید.</small></div><div className="real-product-grid">{filtered.map(p=><ProductCard product={p} key={p.id}/>)}</div>{!filtered.length&&<div className="empty-products"><Search/><h3>محصولی پیدا نشد</h3><p>عبارت دیگری را جست‌وجو کنید.</p></div>}</section><section className="store-support"><div><ShieldCheck/><span><b>انتخاب تخصصی</b><small>بررسی سازگاری تجهیزات با پروژه</small></span></div><div><Headphones/><span><b>مشاوره قبل از خرید</b><small>پیشنهاد فنی متناسب با مصرف</small></span></div><div><PackageCheck/><span><b>استعلام موجودی</b><small>قیمت و زمان تحویل به‌روز</small></span></div></section></main><StoreFooter/></div>}

function ProductPage({product}){if(!product)return <ShopPage/>;return <div className="store-page product-detail-page"><StoreHeader/><main><div className="detail-breadcrumb"><button onClick={()=>navigateTo('/shop')}>فروشگاه</button><span>/</span><span>{product.categoryLabel}</span><span>/</span><b>{product.name}</b></div><section className="product-detail-hero"><ProductArtwork product={product}/><div className="detail-copy"><div className="detail-tags"><span>{product.categoryLabel}</span><span>{product.badge}</span></div><small>{product.brand}</small><h1>{product.name}</h1><p>{product.description}</p><div className="detail-price"><span><small>قیمت محصول</small><strong>تماس بگیرید</strong></span><a className="btn" href={phoneHref}>تماس برای استعلام <ArrowLeft/></a></div><div className="stock-note"><Check/> موجودی و زمان تحویل پس از استعلام تأیید می‌شود.</div></div></section><section className="product-information"><div><div className="section-label">مشخصات فنی</div><h2>اطلاعات کلیدی محصول</h2><div className="spec-table">{product.specs.map(([k,v])=><div key={k}><span>{k}</span><b>{v}</b></div>)}</div></div><aside><div className="section-label">ویژگی‌ها</div><h2>چرا این محصول؟</h2><ul>{product.features.map(x=><li key={x}><Check/>{x}</li>)}</ul><a href={product.source} target="_blank" rel="noreferrer" className="manufacturer-link">مشاهده صفحه رسمی سازنده <ArrowUpLeft/></a></aside></section><section className="related-products"><div className="section-head"><div><div className="section-label">پیشنهادهای مرتبط</div><h2>محصولات مشابه</h2></div><button onClick={()=>navigateTo('/shop')}>مشاهده همه محصولات <ArrowLeft/></button></div><div className="real-product-grid">{storeProducts.filter(p=>p.id!==product.id&&(p.category===product.category||p.categoryLabel===product.categoryLabel)).slice(0,3).map(p=><ProductCard product={p} key={p.id}/>)}</div></section></main><StoreFooter/></div>}

function App(){
  const [route,setRoute]=useState(()=>window.location.hash.slice(1)||'/');
  const [menuOpen,setMenuOpen]=useState(false);
  const [modal,setModal]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const modalRef=useRef(null);
  useEffect(()=>{const fn=()=>setRoute(window.location.hash.slice(1)||'/');addEventListener('hashchange',fn);return()=>removeEventListener('hashchange',fn)},[]);
  useEffect(()=>{ const fn=()=>setScrolled(scrollY>40); addEventListener('scroll',fn); return()=>removeEventListener('scroll',fn)},[]);
  useEffect(()=>{
    if(!modal)return;
    const previous=document.activeElement;
    const onKey=event=>event.key==='Escape'&&setModal(false);
    document.body.style.overflow='hidden';
    addEventListener('keydown',onKey);
    requestAnimationFrame(()=>modalRef.current?.focus());
    return()=>{document.body.style.overflow='';removeEventListener('keydown',onKey);previous?.focus?.()};
  },[modal]);
  const go=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenuOpen(false)};
  const submitConsultation=event=>{
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const message=`سلام، برای مشاوره آروناژ انرژی درخواست دارم.\nنام: ${data.get('name')}\nشماره تماس: ${data.get('phone')}\nموضوع: ${data.get('topic')}`;
    window.open(`${whatsappHref}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
    setSubmitted(true);
  };
  if(route==='/shop'||route.startsWith('/shop/'))return <ShopPage/>;
  if(route.startsWith('/product/'))return <ProductPage product={storeProducts.find(p=>p.id===route.split('/')[2])}/>;
  return <div className="site-shell">
    <header className={scrolled?'scrolled':''}>
      <a className="brand brand-with-logo" href="#top" aria-label="آروناژ انرژی"><BrandLogo/></a>
      <nav className={menuOpen?'open':''} aria-label="منوی اصلی">
        <button onClick={()=>go('about')}>معرفی و خدمات</button>
        <button onClick={()=>go('products')}>فروشگاه</button>
        <button onClick={()=>go('academy')}>آموزش</button>
        <button onClick={()=>go('contact')}>تماس با ما</button>
      </nav>
      <div className="head-actions"><button className="icon-btn" onClick={()=>navigateTo('/shop')} aria-label="جستجوی محصولات"><Search size={19}/></button><Button onClick={()=>setModal(true)}>مشاوره رایگان <ArrowUpLeft size={18}/></Button><button className="menu-btn" onClick={()=>setMenuOpen(!menuOpen)} aria-label="منو" aria-expanded={menuOpen}>{menuOpen?<X/>:<Menu/>}</button></div>
    </header>

    <main id="top">
      <section className="hero hero-campaign" data-robot-scene="intro" style={{'--hero-campaign-image':`url(${heroEnergyCampus})`}}>
        <div className="hero-grid"/><div className="noise"/>
        <div className="hero-energy-flow" aria-hidden="true"/>
        <div className="hero-copy reveal">
          <div className="eyebrow"><span/> آروناژ انرژی؛ زیرساخت آینده پاک</div>
          <h1>از خورشید،<br/><em>تا اقتصاد سبز.</em></h1>
          <p>طراحی، سرمایه‌گذاری و بهره‌برداری از نیروگاه‌های خورشیدی و مراکز پردازش داده؛ با تمرکز بر انرژی پاک، بهره‌وری و توسعه پایدار.</p>
          <div className="hero-actions"><Button onClick={()=>setModal(true)}>شروع یک پروژه <ArrowLeft size={19}/></Button><Button secondary onClick={()=>go('about')}><Play size={16} fill="currentColor"/> آشنایی با آروناژ</Button></div>
          <div className="trust-row"><span><b><DraftingCompass/></b> طراحی تا اجرا</span><i/><span><b><Leaf/></b> انرژی پاک</span><i/><span><b><Gauge/></b> بهره‌برداری هوشمند</span></div>
        </div>
        <div className="hero-campaign-visual" aria-label="رایا در پردیس هوشمند انرژی">
          <div className="robot-platform-glow"/>
          <SceneRobot image={robotSun} className="hero-campaign-robot" priority><span>رایا، راهنمای انرژی آروناژ</span><b>آینده را با هم روشن می‌کنیم.</b></SceneRobot>
          <div className="floating-stat stat-a"><span><Zap size={17}/></span><div><small>مسیر پروژه</small><b>مشاوره تا اجرا</b></div></div>
          <div className="floating-stat stat-b"><span><Leaf size={17}/></span><div><small>رویکرد آروناژ</small><b>پاک و پایدار</b></div></div>
          <div className="hero-scene-tag"><span>یک اکوسیستم کامل</span><b>انرژی · داده · فناوری</b></div>
        </div>
        <div className="scroll-hint"><span>کاوش کنید</span><i/></div>
      </section>

      <section className="company-intro" id="about" aria-labelledby="company-title">
        <div className="company-brand-panel"><BrandLogo/><p>انرژی پاک، زیرساخت پایدار و آینده‌ای روشن‌تر.</p><div className="company-contact"><a href={phoneHref}><Phone/> ۰۹۱۲۶۱۹۳۹۸۴</a><a href="tel:+989339609030"><Phone/> ۰۹۳۳۹۶۰۹۰۳۰</a><a href="tel:+989126910915"><Phone/> ۰۹۱۲۶۹۱۰۹۱۵</a></div></div>
        <div className="company-story">
          <div className="section-label">معرفی و خدمات آروناژ</div>
          <h2 id="company-title">انرژی پاک، از <em>ایده تا بهره‌برداری</em></h2>
          <div className="company-lead">
            <p>آروناژ انرژی با تکیه بر دانش فنی و تیم متخصص، پروژه‌های انرژی پاک را از امکان‌سنجی و طراحی تا تأمین تجهیزات، اجرا، راه‌اندازی و بهره‌برداری مدیریت می‌کند. راهکار هر پروژه بر اساس شرایط واقعی سایت، الگوی مصرف و توجیه اقتصادی آن طراحی می‌شود.</p>
            <p>حوزه فعالیت ما شامل نیروگاه‌های خورشیدی، مشاوره سرمایه‌گذاری سبز، مراکز پردازش داده با انرژی تجدیدپذیر و تحقیق‌وتوسعه راهکارهای افزایش بهره‌وری انرژی است.</p>
          </div>
          <div className="company-pillars">
            <article>
              <img src={solarEngineering} alt="مهندسان آروناژ در حال پایش یک نیروگاه خورشیدی" loading="lazy" decoding="async"/>
              <div><span>انرژی خورشیدی</span><h3>طراحی و اجرای نیروگاه</h3><p>از بررسی سایت و طراحی مهندسی تا اجرای EPC و بهره‌برداری.</p></div>
            </article>
            <article>
              <img src={cleanDataCenter} alt="مرکز پردازش داده مجهز به انرژی خورشیدی و ذخیره‌ساز" loading="lazy" decoding="async"/>
              <div><span>انرژی و داده</span><h3>مرکز پردازش داده پاک</h3><p>طراحی زیرساخت پایدار و بهینه برای فارم‌های رمز ارز و پردازش داده.</p></div>
            </article>
            <article>
              <img src={energyRdTeam} alt="تیم مهندسی آروناژ در حال بررسی طرح توسعه انرژی پاک" loading="lazy" decoding="async"/>
              <div><span>مهندسی و نوآوری</span><h3>امکان‌سنجی و تحقیق‌وتوسعه</h3><p>تحلیل فنی و اقتصادی برای کاهش ریسک و افزایش بازده سرمایه‌گذاری.</p></div>
            </article>
          </div>
          <div className="activity-heading"><span>خدمات آروناژ در یک نگاه</span><Button onClick={()=>setModal(true)}>درخواست مشاوره <ArrowLeft/></Button></div>
          <div className="activity-grid">{companyActivities.map(([Icon,title,text])=><article key={title}><Icon/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
          <div className="company-address"><MapPin/><span><b>دفتر آروناژ انرژی</b>تهران، احمدآباد مستوفی، خیابان احسانی‌راد، سازمان پژوهش‌های علمی و صنعتی ایران، پارک علم و فناوری</span></div>
        </div>
      </section>

      <section className="products" id="products" data-robot-scene="products">
        <div className="section-head"><div><div className="section-label">فروشگاه تخصصی</div><h2>تجهیزات مطمئن،<br/><em>بازده ماندگار.</em></h2></div><Button secondary onClick={()=>navigateTo('/shop')}>ورود به فروشگاه <ShoppingBag size={18}/></Button></div>
        <CampaignSlider onConsult={()=>setModal(true)}/>
        <div className="deal-strip"><div className="deal-intro"><SceneRobot image={robotGuide} className="deal-robot"/><small>انتخاب مهندسی‌شده</small><h3>پیشنهادهای<br/>ویژه آروناژ</h3><p>قیمت و موجودی روز با یک تماس</p><button onClick={()=>navigateTo('/shop')}>مشاهده همه <ArrowLeft/></button></div><div className="deal-track">{storeProducts.slice(0,5).map((product,index)=><DealCard product={product} index={index} key={product.id}/>)}</div></div>
        <div className="assurances"><span><ShieldCheck/> ضمانت اصالت کالا</span><span><PackageCheck/> ارسال امن سراسری</span><span><Headphones/> پشتیبانی تخصصی</span><span><BatteryCharging/> گارانتی معتبر</span></div>
      </section>

      <section className="academy academy-campaign" id="academy" data-robot-scene="learning" style={{'--academy-image':`url(${academyWorkshop})`}}>
        <div className="academy-copy"><div className="section-label">آکادمی آروناژ</div><h2>از کارگاه واقعی،<br/><em>تا تخصص قابل اجرا.</em></h2><p>آموزش عملی طراحی، نصب، تست و بهره‌برداری نیروگاه خورشیدی با مدرسین فعال صنعت و تجهیزات واقعی.</p><div className="academy-highlights"><span><b>پروژه‌محور</b><small>آموزش بر پایه تجربه اجرا</small></span><span><b>کاربردی</b><small>از طراحی تا راه‌اندازی</small></span><span><b>تخصصی</b><small>متناسب با نیاز صنعت</small></span></div><div className="academy-actions"><Button onClick={()=>setModal(true)}>اطلاعات و ثبت‌نام دوره‌ها <BookOpen/></Button><a className="profile-link" href={`${whatsappHref}?text=${encodeURIComponent('سلام، درباره دوره‌های آموزشی آروناژ انرژی اطلاعات می‌خواهم.')}`} target="_blank" rel="noreferrer"><MessageCircle/> گفت‌وگو با مشاور آموزش</a></div></div>
      </section>
    </main>

    <footer id="contact" data-robot-scene="contact">
      <div className="footer-cta"><SceneRobot image={robotSun} className="footer-robot"/><div><small>رایا تا اینجا مسیر را نشان داد؛ حالا نوبت شماست</small><h2>پروژه شما، نقطه شروع<br/>یک تغییر بزرگ است.</h2></div><Button onClick={()=>setModal(true)}>درخواست مشاوره رایگان <ArrowLeft/></Button></div>
      <div className="footer-main"><a className="brand brand-with-logo" href="#top" aria-label="آروناژ انرژی"><BrandLogo light/></a><p>راهکارهای یکپارچه نیروگاه خورشیدی، مراکز پردازش داده و مدیریت انرژی برای ساختن آینده‌ای پاک و پایدار.</p><div className="footer-links"><span>دسترسی سریع</span><a href="#about">معرفی و خدمات</a><a href="#products">فروشگاه</a><a href="#academy">آموزش</a></div><div className="footer-links"><span>ارتباط با ما</span><a href={phoneHref}>۰۹۱۲۶۱۹۳۹۸۴</a><a href="tel:+989339609030">۰۹۳۳۹۶۰۹۰۳۰</a><a href="tel:+989126910915">۰۹۱۲۶۹۱۰۹۱۵</a></div></div>
      <div className="copyright"><span>© ۱۴۰۵ آروناژ انرژی؛ تمامی حقوق محفوظ است.</span><span>انرژی پاک برای یک آینده روشن <Sun size={14}/></span></div>
    </footer>

    <a className="chat" href={`${whatsappHref}?text=${encodeURIComponent('سلام، برای مشاوره با آروناژ انرژی پیام می‌دهم.')}`} target="_blank" rel="noreferrer" aria-label="گفت‌وگو با آروناژ در واتساپ"><MessageCircle/></a>
    {modal&&<div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setModal(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="consultation-title" ref={modalRef} tabIndex="-1"><button className="modal-close" onClick={()=>setModal(false)} aria-label="بستن پنجره"><X/></button>{submitted?<div className="success"><span><Check/></span><h3 id="consultation-title">درخواست آماده شد</h3><p>پیام شما در واتساپ باز شد؛ برای ارسال نهایی، دکمه ارسال را بزنید.</p><Button onClick={()=>{setModal(false);setSubmitted(false)}}>متوجه شدم</Button></div>:<><div className="section-label">یک قدم تا شروع</div><h3 id="consultation-title">مشاوره رایگان پروژه</h3><p>اطلاعاتتان را وارد کنید تا درخواست شما مستقیم در واتساپ آروناژ آماده شود.</p><form onSubmit={submitConsultation}><label>نام و نام خانوادگی<input name="name" required autoComplete="name" placeholder="مثلاً مهدی احمدی"/></label><label>شماره تماس<input name="phone" required inputMode="tel" autoComplete="tel" placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"/></label><label>موضوع مشاوره<select name="topic"><option>نیروگاه خورشیدی</option><option>امکان‌سنجی سرمایه‌گذاری</option><option>فارم رمز ارز و مرکز پردازش داده</option><option>تجهیزات و فروشگاه</option><option>دوره‌های آموزشی</option></select></label><Button type="submit" className="full">ادامه در واتساپ <MessageCircle/></Button></form></>}</div></div>}
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
