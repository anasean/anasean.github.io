function generateTicket() {                                            
  let selectedSeance = JSON.parse(localStorage.selectedSeance);           

  let places = "";                                                                                                                       
  let price = 0;                                                          

  for (let salePlace of selectedSeance.salesPlaces) {                  
      if (places !== "") {
          places += ", ";
      }
      places += salePlace.row + "/" + salePlace.place;                      
      price += salePlace.type === "standart" ? Number(selectedSeance.priceStandart) : Number(selectedSeance.priceVip);
  }

  document.querySelector(".ticket__title").innerHTML = selectedSeance.filmName;
  document.querySelector(".ticket__chairs").innerHTML = places;
  document.querySelector(".ticket__hall").innerHTML = selectedSeance.hallName;
  document.querySelector(".ticket__start").innerHTML = selectedSeance.seanceTime;

  let date = new Date(Number(selectedSeance.seanceTimeStamp * 1000));                                              
  let dateStr = date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });          
 
  let seanceInfo = `                                                                                                
Фильм: ${selectedSeance.filmName}
Зал: ${selectedSeance.hallName}
Ряд/Место ${places}
Дата: ${dateStr}
Начало сеанса: ${selectedSeance.seanceTime}`;


  let qrCode = QRCreator(seanceInfo, { image: "SVG" });                       
  qrCode.download();
  document.querySelector(".ticket__info-qr").append(qrCode.result);
}

document.addEventListener("DOMContentLoaded", generateTicket);  

