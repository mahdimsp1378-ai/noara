import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowUpLeft, BatteryCharging, BookOpen, Building2, Check,
  ChevronDown, CircleUserRound, DraftingCompass, Factory, Gauge, GraduationCap,
  Headphones, House, Leaf, Menu, MessageCircle, Microscope, PackageCheck,
  Play, Search, ShieldCheck, ShoppingBag, Sparkles, Sun, X, Zap
} from 'lucide-react';
import '@fontsource-variable/vazirmatn';
import './styles.css';
import robotSun from './assets/robot/robot-pose-0.webp';
import robotEngineer from './assets/robot/robot-pose-1.webp';
import robotGuide from './assets/robot/robot-pose-3.webp';
import storeScience from './assets/store/science.webp';
import solarBanner from './assets/banners/solar-banner.webp';
import nanoBanner from './assets/banners/nano-banner.webp';
import plasmaBanner from './assets/banners/plasma-banner.webp';
import storageBanner from './assets/banners/storage-banner.webp';
import projectCampaign from './assets/banners/project-campaign.webp';
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

const robotScenes = [
  { id:'top', image:robotSun, side:'left', kicker:'آغاز سفر', title:'سلام، من «رایا» هستم!', text:'راهنمای انرژی شما. بیا ببینیم نور خورشید چطور به یک سرمایه‌گذاری ماندگار تبدیل می‌شود.' },
  { id:'about', image:robotSun, side:'right', kicker:'سه فناوری، یک مقصد', title:'همه‌چیز از یک هسته شروع می‌شود', text:'خورشید، نانو و پلاسما سه مسیر متفاوت‌اند؛ اما هر سه برای ساختن آینده‌ای پاک‌تر کنار هم قرار می‌گیرند.' },
  { id:'services', image:robotEngineer, side:'left', kicker:'ایستگاه مهندسی', title:'اینجا ایده تبدیل به نقشه می‌شود', text:'من داده‌های زمین، مصرف و تابش را بررسی می‌کنم؛ تیم ما طراحی، مجوز و اجرای EPC را کامل می‌کند.' },
  { id:'calculator', image:robotEngineer, side:'right', kicker:'محاسبه هوشمند', title:'ظرفیت مناسب را با هم پیدا کنیم', text:'نوع پروژه و ظرفیت را تغییر بده؛ من همان لحظه یک برآورد اولیه و شفاف برایت آماده می‌کنم.' },
  { id:'projects', image:robotGuide, side:'left', kicker:'نتیجه در دنیای واقعی', title:'این اعداد فقط عدد نیستند', text:'هر مگاوات یعنی هزینه کمتر، هوای پاک‌تر و بازگشت سرمایه‌ای که قابل اندازه‌گیری است.' },
  { id:'products', image:robotGuide, side:'right', kicker:'انتخاب مطمئن', title:'هر قطعه، بخشی از یک سیستم است', text:'پنل، باتری و اینورتر باید دقیقاً با هم هماهنگ باشند؛ فقط تجهیزات تأییدشده وارد این مسیر می‌شوند.' },
  { id:'academy', image:robotGuide, side:'left', kicker:'انتقال تجربه', title:'حالا نوبت ساختن تخصص است', text:'در آکادمی، تجربه واقعی پروژه را قدم‌به‌قدم یاد می‌گیری؛ از طراحی PVsyst تا اجرای نیروگاه.' },
  { id:'contact', image:robotSun, side:'right', kicker:'پایان مسیر، آغاز پروژه', title:'حالا داستان انرژی شما شروع می‌شود', text:'اگر آماده‌ای، مشخصات پروژه را بفرست تا من و تیم مهندسی نوآرا مسیر اختصاصی شما را طراحی کنیم.' },
];

const services = [
  { n:'01', icon: DraftingCompass, title:'طراحی مهندسی نیروگاه', text:'طراحی حرفه‌ای مطابق استاندارد اروپا، تهیه سایت‌پلن و مستندات اخذ مجوز.', tag:'طراحی و مجوز' },
  { n:'02', icon: Factory, title:'اجرای EPC نیروگاه', text:'از مهندسی و تأمین تجهیزات تا اجرا، تست و تحویل کامل نیروگاه خورشیدی.', tag:'صفر تا صد اجرا' },
  { n:'03', icon: Gauge, title:'مدیریت و بهره‌برداری', text:'مدیریت راه‌اندازی، مانیتورینگ و نگهداری برای بالاترین بازده سرمایه.', tag:'پایش هوشمند' },
  { n:'04', icon: BatteryCharging, title:'تجهیزات و پکیج‌ها', text:'پنل، باتری، اینورتر، UPS و پکیج‌های اختصاصی خانگی و صنعتی.', tag:'تأمین تجهیزات' },
];

const technologies = [
  {n:'01',icon:Sun,title:'انرژی خورشیدی',text:'موتور اصلی تحول؛ پاک، پایدار و اقتصادی.',image:solarBanner,tone:'solar'},
  {n:'02',icon:Microscope,title:'فناوری نانو',text:'مواد پیشرفته برای عملکردی فراتر از امروز.',image:nanoBanner,tone:'nano'},
  {n:'03',icon:Sparkles,title:'فناوری پلاسما',text:'راهکارهای نوین برای صنعت، سلامت و محیط زیست.',image:plasmaBanner,tone:'plasma'},
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

function Button({children, secondary=false, onClick, className=''}) {
  return <button onClick={onClick} className={`btn ${secondary?'btn-secondary':''} ${className}`}>{children}</button>
}

function SceneRobot({image, className='', alt='رایا، راهنمای هوشمند انرژی', children}){
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
    <img src={image} alt={alt}/>
    {children&&<div className="scene-robot-copy">{children}</div>}
  </div>
}

function StoreHeader(){return <header className="store-header scrolled"><button className="brand" onClick={()=>navigateTo('/')}><span className="brand-mark"><Sun size={25}/><i/></span><span><b>نوآرا</b><small>NOVARA ENERGY</small></span></button><nav><button onClick={()=>navigateTo('/')}>صفحه اصلی</button><button onClick={()=>navigateTo('/shop')}>محصولات</button><a href="tel:+982100000000">مشاوره خرید</a></nav><div className="head-actions"><a className="btn" href="tel:+982100000000">تماس بگیرید <ArrowUpLeft size={18}/></a></div></header>}

function StoreFooter(){return <footer className="store-footer"><div className="footer-main"><button className="brand light" onClick={()=>navigateTo('/')}><span className="brand-mark"><Sun/></span><span><b>نوآرا</b><small>NOVARA ENERGY</small></span></button><p>تأمین تخصصی تجهیزات انرژی خورشیدی، ذخیره‌سازی، نانو و پلاسما همراه با مشاوره مهندسی.</p><div className="footer-links"><span>فروشگاه</span><button onClick={()=>navigateTo('/shop')}>همه محصولات</button><a href="tel:+982100000000">استعلام قیمت</a></div></div><div className="copyright"><span>© ۱۴۰۵ نوآرا انرژی</span><span>قیمت محصولات پس از استعلام موجودی اعلام می‌شود.</span></div></footer>}

function ProductArtwork({product,compact=false}){return <div className={`store-artwork ${product.category} ${compact?'compact':''}`}><span className="art-orbit"/><img src={product.image} alt={product.name}/><small>{product.brand}</small></div>}

function ProductCard({product}){return <article className="real-product-card" onClick={()=>navigateTo(`/product/${product.id}`)}><ProductArtwork product={product} compact/><div className="real-product-info"><div><span>{product.categoryLabel}</span><b>{product.badge}</b></div><small>{product.brand}</small><h3>{product.name}</h3><p>{product.short}</p><div className="card-price"><strong>تماس بگیرید</strong><button aria-label={`جزئیات ${product.name}`}><ArrowUpLeft/></button></div></div></article>}

function DealCard({product,index}){return <article className="deal-card" onClick={()=>navigateTo(`/product/${product.id}`)}><span className="deal-badge">پیشنهاد {(index+1).toLocaleString('fa-IR',{minimumIntegerDigits:2})}</span><div className={`deal-image ${product.category}`}><img src={product.image} alt={product.name}/></div><small>{product.brand}</small><h3>{product.name}</h3><div><strong>تماس بگیرید</strong><span>مشاهده <ArrowUpLeft/></span></div></article>}

function CampaignSlider({onConsult}){const[active,setActive]=useState(0);const[paused,setPaused]=useState(false);useEffect(()=>{if(paused)return;const timer=window.setInterval(()=>setActive(current=>(current+1)%homeCampaigns.length),5200);return()=>window.clearInterval(timer)},[paused]);const select=index=>setActive((index+homeCampaigns.length)%homeCampaigns.length);const openCampaign=()=>homeCampaigns[active].action==='consult'?onConsult():navigateTo('/shop');return <div className="campaign-slider" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={event=>!event.currentTarget.contains(event.relatedTarget)&&setPaused(false)}><button className="campaign-frame" onClick={openCampaign} aria-label={`باز کردن ${homeCampaigns[active].alt}`}><img key={homeCampaigns[active].image} src={homeCampaigns[active].image} alt={homeCampaigns[active].alt}/></button><button className="campaign-arrow previous" onClick={()=>select(active-1)} aria-label="بنر قبلی"><ArrowLeft/></button><button className="campaign-arrow next" onClick={()=>select(active+1)} aria-label="بنر بعدی"><ArrowLeft/></button><div className="campaign-dots" aria-label="انتخاب بنر">{homeCampaigns.map((campaign,index)=><button key={campaign.image} className={index===active?'active':''} onClick={()=>select(index)} aria-label={`بنر ${index+1}: ${campaign.alt}`}/>)}</div></div>}

function ShopPage(){const[category,setCategory]=useState('all');const[query,setQuery]=useState('');const chooseCategory=value=>{setCategory(value);document.querySelector('.store-catalog')?.scrollIntoView({behavior:'smooth'})};const filtered=storeProducts.filter(p=>(category==='all'||p.category===category)&&`${p.name} ${p.brand} ${p.categoryLabel}`.toLowerCase().includes(query.toLowerCase()));return <div className="store-page"><StoreHeader/><main><section className="store-hero" style={{'--store-hero-image':`url(${solarBanner})`}}><div className="store-hero-grid"/><div><small>فروشگاه تخصصی نوآرا</small><h1>تجهیزات معتبر،<br/><em>انتخاب مهندسی‌شده.</em></h1><p>مجموعه‌ای از محصولات واقعی و تخصصی برای انرژی خورشیدی، برق پشتیبان، نانومواد و فناوری پلاسما.</p><button className="store-hero-cta" onClick={()=>chooseCategory('panel')}>مشاهده تجهیزات خورشیدی <ArrowLeft/></button></div><div className="store-hero-numbers"><span><b>{storeProducts.length.toLocaleString('fa-IR')}</b><small>محصول منتخب</small></span><span><b>۷</b><small>دسته تخصصی</small></span></div></section><section className="store-promos" aria-label="دسته‌های ویژه فروشگاه"><article className="promo-card solar" style={{'--promo-image':`url(${solarBanner})`}} onClick={()=>chooseCategory('panel')}><span>راهکارهای پربازده</span><h2>پنل و تجهیزات<br/>خورشیدی</h2><button>مشاهده محصولات <ArrowUpLeft/></button></article><article className="promo-card storage" style={{'--promo-image':`url(${storageBanner})`}} onClick={()=>chooseCategory('battery')}><span>برق پایدار، شب و روز</span><h2>باتری، اینورتر<br/>و UPS</h2><button>مشاهده محصولات <ArrowUpLeft/></button></article><article className="promo-card science" style={{'--promo-image':`url(${plasmaBanner})`}} onClick={()=>chooseCategory('plasma')}><span>فناوری برای صنعت</span><h2>نانو و تجهیزات<br/>پلاسما</h2><button>مشاهده محصولات <ArrowUpLeft/></button></article></section><section className="store-catalog"><div className="catalog-tools"><div className="store-search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="جست‌وجوی نام، برند یا دسته محصول..."/></div><div className="category-tabs">{storeCategories.map(([v,t])=><button key={v} className={category===v?'active':''} onClick={()=>setCategory(v)}>{t}</button>)}</div></div><div className="catalog-result"><span>{filtered.length.toLocaleString('fa-IR')} محصول</span><small>برای دریافت قیمت روز و موجودی تماس بگیرید.</small></div><div className="real-product-grid">{filtered.map(p=><ProductCard product={p} key={p.id}/>)}</div>{!filtered.length&&<div className="empty-products"><Search/><h3>محصولی پیدا نشد</h3><p>عبارت دیگری را جست‌وجو کنید.</p></div>}</section><section className="store-support"><div><ShieldCheck/><span><b>انتخاب تخصصی</b><small>بررسی سازگاری تجهیزات با پروژه</small></span></div><div><Headphones/><span><b>مشاوره قبل از خرید</b><small>پیشنهاد فنی متناسب با مصرف</small></span></div><div><PackageCheck/><span><b>استعلام موجودی</b><small>قیمت و زمان تحویل به‌روز</small></span></div></section></main><StoreFooter/></div>}

function ProductPage({product}){if(!product)return <ShopPage/>;return <div className="store-page product-detail-page"><StoreHeader/><main><div className="detail-breadcrumb"><button onClick={()=>navigateTo('/shop')}>فروشگاه</button><span>/</span><span>{product.categoryLabel}</span><span>/</span><b>{product.name}</b></div><section className="product-detail-hero"><ProductArtwork product={product}/><div className="detail-copy"><div className="detail-tags"><span>{product.categoryLabel}</span><span>{product.badge}</span></div><small>{product.brand}</small><h1>{product.name}</h1><p>{product.description}</p><div className="detail-price"><span><small>قیمت محصول</small><strong>تماس بگیرید</strong></span><a className="btn" href="tel:+982100000000">تماس برای استعلام <ArrowLeft/></a></div><div className="stock-note"><Check/> موجودی و زمان تحویل پس از استعلام تأیید می‌شود.</div></div></section><section className="product-information"><div><div className="section-label">مشخصات فنی</div><h2>اطلاعات کلیدی محصول</h2><div className="spec-table">{product.specs.map(([k,v])=><div key={k}><span>{k}</span><b>{v}</b></div>)}</div></div><aside><div className="section-label">ویژگی‌ها</div><h2>چرا این محصول؟</h2><ul>{product.features.map(x=><li key={x}><Check/>{x}</li>)}</ul><a href={product.source} target="_blank" rel="noreferrer" className="manufacturer-link">مشاهده صفحه رسمی سازنده <ArrowUpLeft/></a></aside></section><section className="related-products"><div className="section-head"><div><div className="section-label">پیشنهادهای مرتبط</div><h2>محصولات مشابه</h2></div><button onClick={()=>navigateTo('/shop')}>مشاهده همه محصولات <ArrowLeft/></button></div><div className="real-product-grid">{storeProducts.filter(p=>p.id!==product.id&&(p.category===product.category||p.categoryLabel===product.categoryLabel)).slice(0,3).map(p=><ProductCard product={p} key={p.id}/>)}</div></section></main><StoreFooter/></div>}

function App(){
  const [route,setRoute]=useState(()=>window.location.hash.slice(1)||'/');
  const [menuOpen,setMenuOpen]=useState(false);
  const [modal,setModal]=useState(false);
  const [capacity,setCapacity]=useState(100);
  const [usage,setUsage]=useState('industrial');
  const [submitted,setSubmitted]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setRoute(window.location.hash.slice(1)||'/');addEventListener('hashchange',fn);return()=>removeEventListener('hashchange',fn)},[]);
  useEffect(()=>{ const fn=()=>setScrolled(scrollY>40); addEventListener('scroll',fn); return()=>removeEventListener('scroll',fn)},[]);
  const price=useMemo(()=>{
    const base = usage==='industrial'? 34 : usage==='villa'? 42 : 38;
    return Math.round(capacity*base/100)*100;
  },[capacity,usage]);
  const go=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenuOpen(false)};
  if(route==='/shop'||route.startsWith('/shop/'))return <ShopPage/>;
  if(route.startsWith('/product/'))return <ProductPage product={storeProducts.find(p=>p.id===route.split('/')[2])}/>;
  return <div className="site-shell">
    <header className={scrolled?'scrolled':''}>
      <a className="brand" href="#top" aria-label="نوآرا انرژی">
        <span className="brand-mark"><Sun size={25}/><i/></span>
        <span><b>نوآرا</b><small>NOVARA ENERGY</small></span>
      </a>
      <nav className={menuOpen?'open':''} aria-label="منوی اصلی">
        <button onClick={()=>go('services')}>خدمات</button><button onClick={()=>go('projects')}>پروژه‌ها</button>
        <button onClick={()=>go('products')}>محصولات</button><button onClick={()=>go('academy')}>آکادمی</button>
        <button onClick={()=>go('about')}>درباره ما</button>
      </nav>
      <div className="head-actions"><button className="lang">EN</button><button className="icon-btn" aria-label="جستجو"><Search size={19}/></button><Button onClick={()=>setModal(true)}>مشاوره رایگان <ArrowUpLeft size={18}/></Button><button className="menu-btn" onClick={()=>setMenuOpen(!menuOpen)} aria-label="منو">{menuOpen?<X/>:<Menu/>}</button></div>
    </header>

    <main id="top">
      <section className="hero hero-campaign" data-robot-scene="intro" style={{'--hero-campaign-image':`url(${heroEnergyCampus})`}}>
        <div className="hero-grid"/><div className="noise"/>
        <div className="hero-energy-flow" aria-hidden="true"/>
        <div className="hero-copy reveal">
          <div className="eyebrow"><span/> انرژی پاک، مهندسی‌شده برای آینده</div>
          <h1>قدرت خورشید،<br/><em>در خدمت فردا.</em></h1>
          <p>راهکارهای یکپارچه طراحی، اجرا و سرمایه‌گذاری در نیروگاه‌های خورشیدی؛ از یک خانه هوشمند تا بزرگ‌ترین مجموعه‌های صنعتی.</p>
          <div className="hero-actions"><Button onClick={()=>go('calculator')}>شروع یک پروژه <ArrowLeft size={19}/></Button><Button secondary onClick={()=>go('projects')}><Play size={16} fill="currentColor"/> تماشای پروژه‌ها</Button></div>
          <div className="trust-row"><span><b>+۱۲</b> سال تجربه</span><i/><span><b>+۸۵</b> پروژه موفق</span><i/><span><b>۲۴ MW</b> ظرفیت اجرا</span></div>
        </div>
        <div className="hero-campaign-visual" aria-label="رایا در پردیس هوشمند انرژی">
          <div className="robot-platform-glow"/>
          <SceneRobot image={robotSun} className="hero-campaign-robot"><span>رایا، راهنمای انرژی شما</span><b>آینده را با هم روشن می‌کنیم.</b></SceneRobot>
          <div className="floating-stat stat-a"><span><Zap size={17}/></span><div><small>تولید لحظه‌ای</small><b>۸۴.۲ کیلووات</b></div></div>
          <div className="floating-stat stat-b"><span><Leaf size={17}/></span><div><small>کاهش CO₂ سالانه</small><b>۱۲۸ تن</b></div></div>
          <div className="hero-scene-tag"><span>یک اکوسیستم کامل</span><b>خانه · صنعت · فناوری</b></div>
        </div>
        <div className="scroll-hint"><span>کاوش کنید</span><i/></div>
      </section>

      <section className="intro" id="about" data-robot-scene="technology">
        <div className="section-label">فراتر از انرژی</div>
        <h2>سه فناوری، یک چشم‌انداز:<br/><em>ساختن جهانی هوشمندتر.</em></h2>
        <div className="narrative-line"><span>خورشید</span><i/><span>مواد پیشرفته</span><i/><span>پلاسما</span></div>
        <div className="tech-triad">
          {technologies.map(({icon:Icon,...tech})=><article key={tech.n} className={`tech-card photo-card ${tech.tone}`} style={{'--card-image':`url(${tech.image})`}} onClick={()=>navigateTo('/shop')}><span>{tech.n}</span><div className="tech-icon"><Icon/></div><div><small>راهکار تخصصی نوآرا</small><h3>{tech.title}</h3><p>{tech.text}</p></div><button aria-label={`ورود به ${tech.title}`}><ArrowUpLeft/></button></article>)}
        </div>
      </section>

      <section className="services" id="services" data-robot-scene="engineering">
        <div className="section-head"><div><div className="section-label">خدمات تخصصی</div><h2>از ایده تا <em>انرژی.</em></h2></div><p>یک تیم متخصص در تمام مسیر کنار شماست؛ از امکان‌سنجی و طراحی تا تأمین، اجرا و بهره‌برداری.</p></div>
        <div className="service-photo-banner" style={{'--service-image':`url(${solarBanner})`}}><div><span>مهندسی بر پایه داده</span><h3>هر پروژه، یک طراحی اختصاصی</h3><p>از بازدید و امکان‌سنجی تا نقشه‌های اجرایی و تحویل نیروگاه.</p><Button onClick={()=>setModal(true)}>درخواست بازدید فنی <ArrowLeft/></Button></div><span className="service-banner-stat"><b>+۸۵</b><small>پروژه موفق</small></span></div>
        <div className="services-scene">
          <SceneRobot image={robotEngineer} className="engineer-robot"><small>رایا در ایستگاه مهندسی</small><b>اول داده‌ها را می‌سنجم،<br/>بعد مسیر اجرا را می‌سازیم.</b><span className="scan-line"/></SceneRobot>
          <div className="service-grid">{services.map(({icon:Icon,...s})=><article className="service-card" key={s.n}><div className="service-top"><span>{s.n}</span><Icon/></div><div><small>{s.tag}</small><h3>{s.title}</h3><p>{s.text}</p></div><button aria-label={`اطلاعات ${s.title}`}><ArrowUpLeft/></button></article>)}</div>
        </div>
      </section>

      <section className="calculator" id="calculator" data-robot-scene="calculator">
        <div className="calc-copy"><div className="section-label">برآورد هوشمند پروژه</div><h2>سرمایه‌گذاری‌تان را<br/><em>شفاف آغاز کنید.</em></h2><p>با چند انتخاب ساده، برآورد اولیه هزینه طراحی و اجرای پروژه را دریافت کنید. نتیجه نهایی پس از بازدید فنی اعلام می‌شود.</p><ul><li><Check/> محاسبه سریع و رایگان</li><li><Check/> امکان پرداخت مرحله‌ای</li><li><Check/> مشاوره تخصصی با مهندس پروژه</li></ul></div>
        <div className="calc-panel">
          <SceneRobot image={robotEngineer} className="calc-robot"><span>ظرفیت را تغییر بده</span><b>محاسبه‌اش با من!</b></SceneRobot>
          <div className="calc-step"><span>۱</span><div><label>نوع پروژه</label><div className="segmented">{[['industrial','صنعتی',Building2],['villa','ویلا و منزل',House],['invest','سرمایه‌گذاری',Factory]].map(([v,t,I])=><button key={v} onClick={()=>setUsage(v)} className={usage===v?'active':''}><I size={18}/>{t}</button>)}</div></div></div>
          <div className="calc-step"><span>۲</span><div className="range-wrap"><label>ظرفیت مورد نظر <b>{capacity.toLocaleString('fa-IR')} کیلووات</b></label><input type="range" min="5" max="1000" step="5" value={capacity} onChange={e=>setCapacity(+e.target.value)}/><div className="range-label"><span>۵ kW</span><span>۱ MW</span></div></div></div>
          <div className="estimate"><div><small>برآورد اولیه پروژه</small><strong>{price.toLocaleString('fa-IR')} <i>میلیون تومان</i></strong><p>این مبلغ تقریبی است و شامل طراحی، تجهیزات و اجراست.</p></div><Button onClick={()=>setModal(true)}>دریافت پیش‌فاکتور <ArrowLeft/></Button></div>
        </div>
      </section>

      <section className="projects retail-projects" id="projects" data-robot-scene="results">
        <div className="project-campaign-banner" style={{'--project-image':`url(${projectCampaign})`}}>
          <div className="project-campaign-copy"><span>پروژه منتخب نوآرا</span><h2>هزینه برق کارخانه را<br/><em>به سرمایه تبدیل کنید.</em></h2><p>طراحی و اجرای نیروگاه صنعتی ۳.۲ مگاواتی؛ از مطالعات فنی تا اتصال موفق به شبکه.</p><div className="campaign-metrics"><span><b>٪۳۸</b><small>کاهش هزینه انرژی</small></span><span><b>۴.۵ سال</b><small>بازگشت سرمایه</small></span><span><b>۳.۲ MW</b><small>ظرفیت نیروگاه</small></span></div><Button onClick={()=>setModal(true)}>مشاهده راهکار پروژه <ArrowLeft/></Button></div>
          <SceneRobot image={robotGuide} className="project-campaign-robot"/>
          <span className="campaign-location"><b>نیروگاه صنعتی کرمان</b><small>طراحی، تأمین و اجرای EPC</small></span>
        </div>
      </section>

      <section className="products" id="products" data-robot-scene="products">
        <div className="section-head"><div><div className="section-label">فروشگاه تخصصی</div><h2>تجهیزات مطمئن،<br/><em>بازده ماندگار.</em></h2></div><Button secondary onClick={()=>navigateTo('/shop')}>ورود به فروشگاه <ShoppingBag size={18}/></Button></div>
        <CampaignSlider onConsult={()=>setModal(true)}/>
        <div className="deal-strip"><div className="deal-intro"><SceneRobot image={robotGuide} className="deal-robot"/><small>انتخاب مهندسی‌شده</small><h3>پیشنهادهای<br/>ویژه نوآرا</h3><p>قیمت و موجودی روز با یک تماس</p><button onClick={()=>navigateTo('/shop')}>مشاهده همه <ArrowLeft/></button></div><div className="deal-track">{storeProducts.slice(0,5).map((product,index)=><DealCard product={product} index={index} key={product.id}/>)}</div></div>
        <div className="assurances"><span><ShieldCheck/> ضمانت اصالت کالا</span><span><PackageCheck/> ارسال امن سراسری</span><span><Headphones/> پشتیبانی تخصصی</span><span><BatteryCharging/> گارانتی معتبر</span></div>
      </section>

      <section className="academy academy-campaign" id="academy" data-robot-scene="learning" style={{'--academy-image':`url(${academyWorkshop})`}}>
        <div className="academy-copy"><div className="section-label">آکادمی نوآرا</div><h2>از کارگاه واقعی،<br/><em>تا تخصص قابل اجرا.</em></h2><p>آموزش عملی طراحی، نصب، تست و بهره‌برداری نیروگاه خورشیدی با مدرسین فعال صنعت و تجهیزات واقعی.</p><div className="academy-highlights"><span><b>+۲۴ ساعت</b><small>آموزش پروژه‌محور</small></span><span><b>پرداخت اقساطی</b><small>ثبت‌نام آسان دوره</small></span><span><b>پنل دائمی</b><small>دسترسی به محتوای دوره</small></span></div><div className="academy-actions"><Button>ثبت‌نام و مشاهده دوره‌ها <BookOpen/></Button><button className="profile-link"><CircleUserRound/> ورود به پنل دانشجو</button></div></div>
      </section>
    </main>

    <footer id="contact" data-robot-scene="contact">
      <div className="footer-cta"><SceneRobot image={robotSun} className="footer-robot"/><div><small>رایا تا اینجا مسیر را نشان داد؛ حالا نوبت شماست</small><h2>پروژه شما، نقطه شروع<br/>یک تغییر بزرگ است.</h2></div><Button onClick={()=>setModal(true)}>درخواست مشاوره رایگان <ArrowLeft/></Button></div>
      <div className="footer-main"><a className="brand light" href="#top"><span className="brand-mark"><Sun/></span><span><b>نوآرا</b><small>NOVARA ENERGY</small></span></a><p>راهکارهای یکپارچه انرژی خورشیدی، نانو و پلاسما برای ساختن آینده‌ای پاک و هوشمند.</p><div className="footer-links"><span>دسترسی سریع</span><a href="#services">خدمات</a><a href="#projects">پروژه‌ها</a><a href="#academy">آموزش</a></div><div className="footer-links"><span>ارتباط با ما</span><a href="tel:+982100000000">۰۲۱-۰۰۰۰۰۰۰۰</a><a href="mailto:hello@novara.energy">hello@novara.energy</a></div></div>
      <div className="copyright"><span>© ۱۴۰۵ نوآرا انرژی؛ تمامی حقوق محفوظ است.</span><span>طراحی برای یک آینده روشن <Sun size={14}/></span></div>
    </footer>

    <button className="chat" aria-label="گفت‌وگوی آنلاین"><MessageCircle/></button>
    {modal&&<div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setModal(false)}><div className="modal"><button className="modal-close" onClick={()=>setModal(false)}><X/></button>{submitted?<div className="success"><span><Check/></span><h3>درخواست شما ثبت شد</h3><p>کارشناس ما در اولین فرصت با شما تماس می‌گیرد.</p><Button onClick={()=>{setModal(false);setSubmitted(false)}}>متوجه شدم</Button></div>:<><div className="section-label">یک قدم تا شروع</div><h3>مشاوره رایگان پروژه</h3><p>اطلاعاتتان را وارد کنید تا مناسب‌ترین راهکار را پیشنهاد دهیم.</p><form onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><label>نام و نام خانوادگی<input required placeholder="مثلاً مهدی احمدی"/></label><label>شماره تماس<input required inputMode="tel" placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"/></label><label>موضوع مشاوره<select><option>نیروگاه خورشیدی</option><option>تجهیزات و فروشگاه</option><option>دوره‌های آموزشی</option><option>فناوری نانو و پلاسما</option></select></label><Button className="full">ثبت درخواست <ArrowLeft/></Button></form></>}</div></div>}
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
