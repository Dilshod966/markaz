import rasm2 from "../images/logo.png"
import { useState, useEffect } from "react";
import { BsDownload } from "react-icons/bs";
import { BsShare } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

import domtoimage from "dom-to-image";
import { useRef } from "react";
import { BsForward } from "react-icons/bs";
export default function ModalRuxsatnoma({ isOpen, onClose, data }) {
    const [active, setActive] = useState(null);
    const divRef = useRef();




    const handleDownload = () => {
      setActive(null);
    domtoimage.toPng(divRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${data.ismFam.split(" ")[0]}_${data.yonalish}_Ruxsatnoma.png`;
      link.click();
    });
  };

  // Ulashish (agar browser share API qo‘llasa)
  const handleShare = async () => {
    domtoimage.toBlob(divRef.current).then(async (blob) => {
      if (navigator.share) {
        const file = new File([blob], `${data.ismFam.split(" ")[0]}_Ruxsatnoma.png`, { type: blob.type });
        await navigator.share({
          files: [file],
          title: "Mening containerim",
          text: "Mana rasm!",
        });
      } else {
        alert("Ulashish bu qurilmada qo‘llab-quvvatlanmaydi");
      }
    });
  }





  // tashqariga bosilganda yopilish uchun
  useEffect(() => {
    
    const handleClickOutside = (e) => {
      if (!e.target.closest(".icon-wrapper")) {
        setActive(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const icons = [
    { 
      id: 1, 
      label: "Yuklash", 
      icon: <BsDownload size={22} />, 
      onClick: handleDownload 
    },
    { 
      id: 2, 
      label: "Ulashish", 
      icon: <BsShare size={22} />, 
      onClick: handleShare 
    },
    { 
      id: 3, 
      label: "Yopish", 
      icon: <BsXLg size={22} />, 
      onClick: onClose 
    },
  ];
  if (!isOpen || !data) return null;




  return (
    <div className="tumanka">
      <div className="rux">
      <div className="ruxsatnoma" ref={divRef}>
        <span style={{display: "grid", gridTemplateColumns: "6fr 1.5fr", alignItems: "center"}}>
          <span style={{ textAlign: "center"}}>
            <h4>{data.yonalish} diagnostik test sinovlari uchun</h4>
            <h1 className="">RUXSATNOMA</h1>
          </span>
          <span>
            <img src={rasm2} alt="logo" className="rasm22"/>
          </span>
        </span>
        <h3>TALABGOR MA'LUMOTLARI:</h3>
        <p><b>Ism va Familiya:</b> {data.ismFam}</p>
        <p><b>Telefon raqami:</b> {data.tel}</p>
        <p><b>To‘lov turi:</b> {data.tolov}</p>

        <h3>TEST SINOVI MA'LUMOTLARI:</h3>

        <p>
          <b>Asosiy fanlar:</b> 1-Fan {data.fan1}
          {data.fan2 && `  | 2-Fan ${data.fan2}`}
        </p>
        <p><b>Test kuni:</b> {data.vaqt}</p>
        
        <h3>TALABGORGA ESLATMA!</h3>
        <ul style={{listStyleType: "none"}}>
          <li><BsForward className="korsatkich"/>
                Test sinovlariga ruxsatnoma bilan belgilangan vaqtdan 30 min oldin yetib kelish.</li>
          <li><BsForward className="korsatkich"/>
                Talabgorning o’zi uchun belgilangan guruh va joyda o’tirish.</li>
          <li><BsForward className="korsatkich"/>
                Test sinovi vaqtida guruh nazarotchisining ko’rsatmalariga amal qilish.</li>
          <li><BsForward className="korsatkich"/>
                Javoblar varaqasini belgilanmagan joylariga yozish taqiqlanadi.</li>
          <li><BsForward className="korsatkich"/>
                Test sinovlari yakunlangach javoblar varaqasini o’z vaqtida guruh nazoratchisiga topshirish.</li>
          <li><BsForward className="korsatkich"/>
                Test sinovlari uchun belgilangan to’lovlarni o’z vaqtida to’lash.</li>
          <li><BsForward className="korsatkich"/>
                Test sinovi uchun ro’yxatdan o’tib uzurli sabablarga ko’ra test sinovida qatnasha olmasangiz. Test sinovidan 1 kun oldin tashkilotchini ogohlantirish.</li>
        </ul>
        <h4 style={{fontSize: "28px", textAlign: "center", width: "100%"}}>Ma'lumot uchun: +998-93-284-10-05</h4>
        
        


    </div>
    
        <div className="icon-container">
      {icons.map((item) => (
        <div key={item.id} className="icon-wrapper">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActive(active === item.id ? null : item.id);
            }}
            className="icon-btn"
          >
            {item.icon}
          </button>

          {active === item.id && (
            <div className="popover">
              <button className="popover-action" onClick={item.onClick}>
                {item.label}
              </button>
            </div>
          )}
        </div>
        
      ))}
    </div>
        </div>
      </div>
    
  );
}